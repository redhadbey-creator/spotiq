/* ASİ Dil — ders motoru */
(function () {
  'use strict';
  const { $, $$, esc, shuffle, sample, pick, ALL_WORDS, ALL_SENTS, NODES, C, wordByEn, sentById, wordById } = Q;
  const PROPER = new Set(['I', 'Ali', 'Monday', 'English', 'Turkey', 'New', 'Year', 'İngilizce', 'Türkiye', 'Türkiyeliyim', "Türkiye'denim"]);

  /* ---------- Yardımcılar ---------- */
  function tokens(sentence, lang) {
    const t = sentence.replace(/[.,!?;:"]/g, ' ').split(/\s+/).filter(Boolean);
    if (t.length && !PROPER.has(t[0])) t[0] = lang === 'tr' ? t[0].toLocaleLowerCase('tr') : t[0].toLowerCase();
    return t;
  }
  function distractors(answerToks, lang, pool, n) {
    const have = new Set(answerToks.map(x => Q.norm(x, lang)));
    const cand = [];
    pool.forEach(s => tokens(lang === 'en' ? s.en : s.tr, lang).forEach(tk => { const k = Q.norm(tk, lang); if (k && !have.has(k)) { have.add(k); cand.push(tk); } }));
    return sample(cand, n);
  }
  const TR_HINT = {};
  ALL_WORDS.forEach(w => { TR_HINT[Q.norm(w.tr, 'tr')] = w.en; });
  function hintFor(tok, lang) {
    if (lang === 'en') { const k = Q.norm(tok, 'en'); const w = wordByEn[k]; return w ? w.tr : (HINTS.en[k] || HINTS.en[tok.toLowerCase().replace(/[.,!?]/g, '')] || ''); }
    const k = Q.norm(tok, 'tr'); return TR_HINT[k] || HINTS.tr[k] || '';
  }
  function hinted(sentence, lang) {
    return sentence.split(/\s+/).map(w => { const h = hintFor(w, lang); return h ? `<span class="hw" tabindex="0" data-h="${esc(h)}">${esc(w)}</span>` : esc(w); }).join(' ');
  }
  function sentWordIds(s) {
    const toks = new Set(tokens(s.en, 'en').map(t => Q.norm(t, 'en')));
    return ALL_WORDS.filter(w => toks.has(w.en.toLowerCase())).map(w => w.id);
  }

  /* ---------- Soru üretimi ---------- */
  function mk(type, data) { return Object.assign({ type, tries: 0 }, data); }
  function exPick(w, pool) {
    const cand = pool.filter(x => x.id !== w.id && x.tr !== w.tr && x.en !== w.en && (!w.em || x.em));
    return mk('pick', { word: w, options: shuffle([w].concat(sample(uniqBy(cand, 'en'), 3))), key: 'w:' + w.id });
  }
  function uniqBy(arr, k) { const seen = new Set(); return arr.filter(x => !seen.has(x[k]) && seen.add(x[k])); }
  function exPickTr(w, pool) { return mk('pickTr', { word: w, options: shuffle([w].concat(sample(uniqBy(pool.filter(x => x.id !== w.id && x.tr !== w.tr && x.en !== w.en), 'tr'), 3))), key: 'w:' + w.id }); }
  function exMatch(words) { return mk('match', { words: sample(uniqBy(uniqBy(words, 'en'), 'tr'), Math.min(5, words.length)) }); }
  function exBank(s, dir, spool) {
    const lang = dir === 'en' ? 'en' : 'tr';
    const ans = tokens(lang === 'en' ? s.en : s.tr, lang);
    const tiles = shuffle(ans.concat(distractors(ans, lang, spool.filter(x => x.id !== s.id), Math.max(2, Math.min(5, Math.ceil(ans.length * 0.7))))));
    return mk(dir === 'en' ? 'bankEn' : 'bankTr', { sent: s, tiles, lang, key: 's:' + s.id });
  }
  function exListen(s, spool) { const e = exBank(s, 'en', spool); e.type = 'listen'; return e; }
  function exType(s) { return mk('type', { sent: s, key: 's:' + s.id }); }
  function exListenType(s) { return mk('listenType', { sent: s, key: 's:' + s.id }); }
  function exSpeak(s) { return mk('speak', { sent: s, key: 's:' + s.id }); }
  function exFill(s, wpool) {
    const toks = tokens(s.en, 'en');
    const idxs = toks.map((t, i) => wordByEn[Q.norm(t, 'en')] ? i : -1).filter(i => i >= 0);
    if (!idxs.length) return null;
    const i = pick(idxs);
    const w = wordByEn[Q.norm(toks[i], 'en')];
    const opts = shuffle([w.en].concat(sample(wpool.filter(x => x.en !== w.en && !x.en.includes(' ')).map(x => x.en), 2)));
    const raw = s.en.split(/\s+/);
    return mk('fill', { sent: s, blank: i, parts: raw, answer: w.en, options: opts, word: w, key: 's:' + s.id });
  }
  /* Kütüphane kelimesi için örnek cümlede boşluk doldurma */
  function exDeckFill(w, pool) {
    if (!w.ex) return null;
    const i = w.ex.toLowerCase().indexOf(w.en.toLowerCase());
    if (i < 0) return null;
    const before = w.ex.slice(0, i).trim(), after = w.ex.slice(i + w.en.length).trim();
    const parts = [before, w.en, after].filter((p, k) => k === 1 || p);
    const blank = before ? 1 : 0;
    const opts = shuffle([w.en].concat(sample(uniqBy(pool.filter(x => x.en !== w.en), 'en'), 3).map(x => x.en)));
    return mk('fill', { sent: { en: w.ex, tr: w.exTr, id: w.id }, blank, parts, answer: w.en, options: opts, word: w, key: 'w:' + w.id });
  }
  function adapt(list, spool) {
    return list.filter(Boolean).map(e => {
      if ((e.type === 'listen' || e.type === 'listenType') && !Q.canListen()) return e.type === 'listen' ? exBank(e.sent, 'en', spool) : exType(e.sent);
      if (e.type === 'speak' && !Q.canSpeak()) return exBank(e.sent, 'tr', spool);
      return e;
    });
  }

  function build(opts) {
    const unlocked = Q.unlockedSentences();
    const spool = unlocked.length > 6 ? unlocked : ALL_SENTS.slice(0, 24);
    const wpool = ALL_WORDS.filter(w => unlocked.some(s => s.lesson === w.lesson));
    const wp = wpool.length >= 8 ? wpool : ALL_WORDS.slice(0, 24);
    let out = [];
    if (opts.mode === 'lesson') {
      const W = ALL_WORDS.filter(w => w.lesson === opts.node.id);
      const S = shuffle(ALL_SENTS.filter(s => s.lesson === opts.node.id));
      const lvl = opts.level;
      if (lvl === 0) {
        W.slice(0, 4).forEach(w => { const e = exPick(w, W.concat(wp)); e.isNew = true; out.push(e); });
        out.push(exMatch(W));
        out.push(exBank(S[0], 'en', spool), exBank(S[1], 'tr', spool), exFill(S[2], wp) || exBank(S[2], 'en', spool), exListen(S[3], spool), exBank(S[4], 'en', spool));
      } else if (lvl === 1) {
        sample(W, 2).forEach(w => out.push(exPickTr(w, W.concat(wp))));
        out.push(exMatch(W));
        out.push(exBank(S[0], 'en', spool), exBank(S[1], 'tr', spool), exListen(S[2], spool), exFill(S[3], wp) || exBank(S[3], 'tr', spool), exBank(S[4], 'en', spool), exSpeak(S[5]), exBank(S[5], 'tr', spool));
      } else {
        out.push(exType(S[0]), exType(S[1]), exListenType(S[2]), exBank(S[3], 'en', spool), exBank(S[4], 'tr', spool), exFill(S[5], wp) || exBank(S[5], 'en', spool), exMatch(W), exSpeak(S[1]), exListen(S[4], spool), exPickTr(pick(W), W.concat(wp)));
      }
      out = shuffleSoft(out, lvl === 0);
    } else if (opts.mode === 'test') {
      const unit = opts.node.unit;
      const W = ALL_WORDS.filter(w => w.unit === unit);
      const S = shuffle(ALL_SENTS.filter(s => s.unit === unit));
      out = [exType(S[0]), exType(S[1]), exType(S[2]), exBank(S[3], 'en', spool), exBank(S[4], 'en', spool), exBank(S[5], 'tr', spool), exBank(S[6], 'tr', spool), exListen(S[7], spool), exListenType(S[8]), exFill(S[9], W) || exType(S[9]), exFill(S[10], W) || exBank(S[10], 'en', spool), exMatch(W), exSpeak(S[11]), exPickTr(pick(W), W)];
      out = shuffle(out);
    } else if (opts.mode === 'vocab') {
      const W = shuffle(ALL_WORDS.filter(w => w.lesson === opts.node.id));
      const pool = W.concat(wp);
      W.slice(0, 4).forEach(w => { const e = exPick(w, pool); e.isNew = true; out.push(e); });
      out.push(exMatch(W.slice(0, 5)), exMatch(W.slice(5, 10)));
      W.slice(10, 14).forEach(w => out.push(exPickTr(w, pool)));
      out.push(exMatch(W.slice(14, 19)), exMatch(W.slice(19, 24)));
      W.slice(24, 27).forEach(w => out.push(exPick(w, pool)));
      out.push(exMatch(W.slice(25, 30).length >= 3 ? W.slice(25, 30) : W.slice(0, 5)));
    } else if (opts.mode === 'deck') {
      const W = shuffle(opts.words);
      const pool = (Q.LIB.find(d => d.id === opts.deck) || { items: W }).items;
      W.slice(0, 4).forEach(w => { const e = exPick(w, pool); e.isNew = true; out.push(e); });
      out.push(exMatch(W.slice(0, 5)));
      W.slice(4).forEach(w => out.push(exDeckFill(w, pool) || exPickTr(w, pool)));
      out.push(exMatch(W.slice(5, 10).length >= 3 ? W.slice(5, 10) : W.slice(0, 5)));
      W.slice(0, 4).forEach(w => out.push(exDeckFill(w, pool) || exPickTr(w, pool)));
      return out.filter(Boolean);
    } else if (opts.mode === 'jump') {
      const sec = opts.section;
      const SS = shuffle(ALL_SENTS.filter(s => C.units[s.unit].section === sec));
      const WW = ALL_WORDS.filter(w => C.units[w.unit].section === sec);
      const jp = SS.slice(0, 40);
      out = [exBank(SS[0], 'en', jp), exBank(SS[1], 'tr', jp), exType(SS[2]), exFill(SS[3], WW) || exType(SS[3]), exPickTr(pick(WW), WW), exBank(SS[4], 'en', jp), exListen(SS[5], jp), exType(SS[6]), exBank(SS[7], 'tr', jp), exFill(SS[8], WW) || exBank(SS[8], 'en', jp), exMatch(sample(WW, 5)), exType(SS[9]), exBank(SS[10], 'en', jp), exPickTr(pick(WW), WW), exType(SS[11])];
      return adapt(out, jp);
    } else if (opts.mode === 'mistakes') {
      const keys = Object.entries(Q.S.mistakes).sort((a, b) => b[1] - a[1]).slice(0, 10).map(x => x[0]);
      keys.forEach(k => {
        const [t, id] = k.split(':');
        if (t === 's' && sentById[id]) out.push(pick([exBank(sentById[id], 'en', spool), exBank(sentById[id], 'tr', spool), exType(sentById[id])]));
        if (t === 'w' && wordById[id]) out.push(pick([exPick(wordById[id], wp), exPickTr(wordById[id], wp)]));
      });
    } else if (opts.mode === 'listen') {
      sample(spool, 8).forEach((s, i) => out.push(i % 2 ? exListenType(s) : exListen(s, spool)));
    } else if (opts.mode === 'speak') {
      sample(spool, 6).forEach(s => out.push(exSpeak(s)));
    } else if (opts.mode === 'words') {
      const weak = wp.slice().sort((a, b) => strength(a) - strength(b)).slice(0, 10);
      out.push(exMatch(weak.slice(0, 5)));
      weak.slice(0, 6).forEach((w, i) => out.push(i % 2 ? exPickTr(w, wp) : exPick(w, wp)));
      out.push(exMatch(weak.slice(5, 10).length >= 3 ? weak.slice(5, 10) : weak.slice(0, 5)));
    } else { /* genel pratik: zayıf içerik ağırlıklı */
      const ss = spool.slice().sort((a, b) => (Q.S.mistakes['s:' + b.id] || 0) - (Q.S.mistakes['s:' + a.id] || 0) || Math.random() - .5).slice(0, 8);
      out = [exBank(ss[0], 'en', spool), exBank(ss[1], 'tr', spool), exType(ss[2]), exListen(ss[3], spool), exFill(ss[4], wp) || exBank(ss[4], 'en', spool), exMatch(sample(wp, 5)), exSpeak(ss[5]), exBank(ss[6], 'en', spool), exPickTr(pick(wp), wp), exBank(ss[7], 'tr', spool)];
      out = shuffle(out);
    }
    return adapt(out, spool);
  }
  function strength(w) { const r = Q.S.words[w.id]; return r ? r.box : -1; }
  function shuffleSoft(arr, keepFirst) { if (!keepFirst) return shuffle(arr); const head = arr.slice(0, 4), rest = shuffle(arr.slice(4)); return head.concat(rest); }

  /* ---------- Oturum ---------- */
  let st = null;
  const HEART_MODES = new Set(['lesson', 'test']);

  function start(opts) {
    if (HEART_MODES.has(opts.mode) && Q.S.hearts <= 0 && !Q.heartsUnlimited()) { App.noHearts(); return; }
    const queue = build(opts);
    if (!queue.length) { Q.toast('Burada çalışacak bir şey yok, harika!'); return; }
    st = { opts, queue, i: 0, lives: opts.mode === 'jump' ? 3 : 0, total: queue.length, resolved: 0, combo: 0, maxCombo: 0, wrong: 0, firstTry: 0, startT: Date.now(), xpBonus: 0 };
    const ov = $('#overlay'); ov.hidden = false; document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    show();
  }
  function close(silent) {
    const ov = $('#overlay'); ov.hidden = true; ov.innerHTML = ''; ov.onclick = null; document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (Q.ttsOK) speechSynthesis.cancel();
    if (st && st.rec) try { st.rec.abort(); } catch (e) { }
    st = null;
    if (!silent) App.render();
  }
  function quitAsk() {
    Q.modal(`${Q.mascot('sad', 110)}<h2>Gitme, az kaldı!</h2><p>Şimdi çıkarsan bu dersteki ilerlemeni kaybedeceksin.</p>
      <button class="btn block" data-a="stay">Öğrenmeye devam et</button><button class="btn ghost block" data-a="quit">Dersi bitir</button>`, (m, c) => {
      m.querySelector('[data-a=stay]').onclick = c;
      m.querySelector('[data-a=quit]').onclick = () => { c(); close(); };
    });
  }

  function heartsHTML() {
    if (st.opts.mode === 'jump') return `<span class="hearts" title="Atlama testi hakkı">${'💙'.repeat(st.lives)}${'🤍'.repeat(3 - st.lives)}</span>`;
    if (!HEART_MODES.has(st.opts.mode)) return '<span class="hearts" title="Pratikte can kaybetmezsin">♾️</span>';
    return `<span class="hearts">💙 ${Q.heartsUnlimited() ? '∞' : Q.S.hearts}</span>`;
  }
  function topHTML() {
    const pct = Math.min(100, Math.round(st.resolved / st.total * 100));
    const combo = st.combo >= 3 ? `<span class="combo">🔥 ${st.combo} üst üste</span>` : '';
    return `<div class="les-top"><button class="x" data-act="quit" aria-label="Kapat">✕</button><div class="bar" style="position:relative">${combo}<i style="width:${pct}%"></i></div>${heartsHTML()}</div>`;
  }

  function show() {
    st.ex = st.queue[st.i];
    st.sel = null; st.picked = []; st.state = 'idle'; st.result = null;
    const ex = st.ex;
    const ov = $('#overlay');
    ov.innerHTML = topHTML() + `<div class="les-body" id="lb">${bodyHTML(ex)}</div><div class="les-foot" id="lf"></div>`;
    bindBody(ex);
    foot();
    if (ex.type === 'listen' || ex.type === 'listenType') setTimeout(() => Q.speak(ex.sent.en), 350);
    if (ex.type === 'pickTr') setTimeout(() => Q.speak(ex.word.en), 300);
    const ta = $('.typebox'); if (ta) setTimeout(() => ta.focus(), 50);
  }

  function bodyHTML(ex) {
    const keys = i => `<span class="kn">${i + 1}</span>`;
    switch (ex.type) {
      case 'pick':
        if (!ex.options.every(o => o.em)) return `${ex.isNew ? '<div class="new-word">✨ Yeni kelime</div>' : ''}<h2>“${esc(ex.word.tr)}” İngilizcede hangisi?</h2>
          <div class="choices list">${ex.options.map((o, i) => `<button class="choice" data-i="${i}">${keys(i)}${esc(o.en)}</button>`).join('')}</div>`;
        return `${ex.isNew ? '<div class="new-word">✨ Yeni kelime</div>' : ''}<h2>“${esc(ex.word.tr)}” hangisi?</h2>
          <div class="choices">${ex.options.map((o, i) => `<button class="choice" data-i="${i}">${keys(i)}<span class="em">${o.em}</span>${esc(o.en)}</button>`).join('')}</div>`;
      case 'pickTr':
        return `<h2>Doğru çeviriyi seç</h2><div class="speaker-row">${Q.mascot('wink', 96)}<div class="bubble">${Q.canListen() ? '<button class="play" data-act="say" aria-label="Dinle">🔊</button>' : ''}<b>${esc(ex.word.en)}</b></div></div>
          <div class="choices list">${ex.options.map((o, i) => `<button class="choice" data-i="${i}">${keys(i)}${esc(o.tr)}</button>`).join('')}</div>`;
      case 'match': {
        const L = shuffle(ex.words), Rr = shuffle(ex.words);
        ex.L = L; ex.Rr = Rr; ex.done = 0;
        return `<h2>Eşleşen çiftlere dokun</h2><div class="match"><div class="col">${L.map((w, i) => `<button class="choice" data-side="L" data-id="${w.id}">${keys(i)}${esc(w.en)}</button>`).join('')}</div>
          <div class="col">${Rr.map((w, i) => `<button class="choice" data-side="R" data-id="${w.id}"><span class="kn">${i + 1 + L.length}</span>${esc(w.tr)}</button>`).join('')}</div></div>`;
      }
      case 'bankEn': case 'bankTr': case 'listen': {
        let head;
        if (ex.type === 'listen') head = `<h2>Duyduğunu yaz</h2><div class="listen-row"><button class="play big" data-act="say" aria-label="Dinle">🔊</button><button class="play slow" data-act="slow" aria-label="Yavaş dinle">🐢</button></div>`;
        else if (ex.type === 'bankEn') head = `<h2>Bu cümleyi çevir</h2><div class="speaker-row">${Q.mascot('happy', 96)}<div class="bubble">${hinted(ex.sent.tr, 'tr')}</div></div>`;
        else head = `<h2>Bu cümleyi çevir</h2><div class="speaker-row">${Q.mascot('think', 96)}<div class="bubble">${Q.canListen() ? '<button class="play" data-act="say" aria-label="Dinle">🔊</button>' : ''}<span>${hinted(ex.sent.en, 'en')}</span></div></div>`;
        return head + `<div class="answer-zone" id="az"></div><div class="bank" id="bank">${ex.tiles.map((t, i) => `<button class="wt" data-t="${i}">${esc(t)}</button>`).join('')}</div>`;
      }
      case 'type':
        return `<h2>İngilizce yaz</h2><div class="speaker-row">${Q.mascot('think', 96)}<div class="bubble">${hinted(ex.sent.tr, 'tr')}</div></div>
          <textarea class="typebox" id="tb" placeholder="İngilizce yaz" autocapitalize="off" autocomplete="off" spellcheck="false"></textarea>`;
      case 'listenType':
        return `<h2>Duyduğunu yaz</h2><div class="listen-row"><button class="play big" data-act="say" aria-label="Dinle">🔊</button><button class="play slow" data-act="slow" aria-label="Yavaş dinle">🐢</button></div>
          <textarea class="typebox" id="tb" placeholder="İngilizce yaz" autocapitalize="off" autocomplete="off" spellcheck="false"></textarea>`;
      case 'fill':
        return `<h2>Boşluğu doldur</h2><div class="fill-sent">${ex.parts.map((p, i) => i === ex.blank ? `<span class="gap" id="gap">&nbsp;</span>${esc((p.match(/[.,!?]+$/) || [''])[0])}` : esc(p)).join(' ')}</div>
          <p class="fill-tr">${esc(ex.sent.tr)}</p><div class="choices list">${ex.options.map((o, i) => `<button class="choice" data-i="${i}">${keys(i)}${esc(o)}</button>`).join('')}</div>`;
      case 'speak':
        return `<h2>Bu cümleyi sesli oku</h2><div class="speaker-row">${Q.mascot('wow', 96)}<div class="bubble">${Q.canListen() ? '<button class="play" data-act="say" aria-label="Dinle">🔊</button>' : ''}<span>${hinted(ex.sent.en, 'en')}</span></div></div>
          <button class="mic" id="mic" aria-label="Konuşmaya başla">🎙️</button><p class="heard" id="heard">Mikrofona dokun ve konuş</p>`;
    }
    return '';
  }

  function bindBody(ex) {
    const lb = $('#lb');
    lb.onclick = e => {
      const b = e.target.closest('button'); if (!b || st.state !== 'idle') { if (b && b.dataset.act) act(b.dataset.act); return; }
      if (b.dataset.act) return act(b.dataset.act);
      if (ex.type === 'pick' || ex.type === 'pickTr' || ex.type === 'fill') choose(+b.dataset.i);
      else if (b.classList.contains('wt')) tile(b);
      else if (b.dataset.side) matchTap(b);
      else if (b.id === 'mic') listenMic();
    };
    lb.addEventListener('mouseover', tipOn); lb.addEventListener('focusin', tipOn);
    lb.addEventListener('mouseout', tipOff); lb.addEventListener('focusout', tipOff);
    const tb = $('#tb'); if (tb) tb.oninput = () => foot();
    if (tb) tb.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); primary(); } };
    $('.les-top [data-act=quit]').onclick = quitAsk;
  }
  function tipOn(e) { const h = e.target.closest('.hw'); if (!h || h.querySelector('.tip')) return; const t = document.createElement('span'); t.className = 'tip'; t.textContent = h.dataset.h; h.appendChild(t); }
  function tipOff(e) { const h = e.target.closest('.hw'); if (h) { const t = h.querySelector('.tip'); if (t) t.remove(); } }

  function act(a) {
    const ex = st.ex;
    if (a === 'say') Q.speak(ex.sent ? ex.sent.en : ex.word.en);
    if (a === 'slow') Q.speak(ex.sent.en, true);
  }
  function choose(i) {
    const ex = st.ex; st.sel = i; Q.sfx('tap');
    $$('#lb .choice').forEach((c, j) => c.classList.toggle('sel', j === i));
    if (ex.type === 'pick') Q.speak(ex.options[i].en);
    if (ex.type === 'fill') $('#gap').textContent = ex.options[i];
    foot();
  }
  function tile(b) {
    Q.sfx('pop');
    const az = $('#az');
    if (b.parentElement.id === 'bank') {
      if (b.classList.contains('used')) return;
      b.classList.add('used');
      const c = document.createElement('button'); c.className = 'wt'; c.textContent = b.textContent; c.dataset.src = b.dataset.t;
      az.appendChild(c); st.picked.push(+b.dataset.t);
      if (st.ex.lang === 'en' && st.ex.type !== 'listen') Q.speak(b.textContent);
    } else {
      const src = b.dataset.src; b.remove();
      const orig = $(`#bank [data-t="${src}"]`); if (orig) orig.classList.remove('used');
      st.picked = st.picked.filter(x => String(x) !== src);
    }
    foot();
  }
  function matchTap(b) {
    const ex = st.ex;
    if (b.classList.contains('gone')) return;
    const side = b.dataset.side;
    const prev = $(`#lb .choice.sel`);
    if (side === 'L') { const w = Q.wordById[b.dataset.id]; if (w) Q.speak(w.en); }
    if (!prev || prev === b) { $$('#lb .choice.sel').forEach(x => x.classList.remove('sel')); if (prev !== b) b.classList.add('sel'); Q.sfx('tap'); return; }
    if (prev.dataset.side === side) { prev.classList.remove('sel'); b.classList.add('sel'); Q.sfx('tap'); return; }
    if (prev.dataset.id === b.dataset.id) {
      [prev, b].forEach(x => { x.classList.remove('sel'); x.classList.add('right'); });
      Q.sfx('ok');
      setTimeout(() => [prev, b].forEach(x => { x.classList.remove('right'); x.classList.add('gone'); }), 350);
      ex.done++;
      wordSeen(prev.dataset.id, true);
      if (ex.done === ex.words.length) setTimeout(() => { st.result = { ok: true, msg: '' }; resolve(true); }, 450);
    } else {
      [prev, b].forEach(x => { x.classList.remove('sel'); x.classList.add('wrong', 'shake'); });
      Q.sfx('bad'); ex.miss = (ex.miss || 0) + 1;
      setTimeout(() => [prev, b].forEach(x => x.classList.remove('wrong', 'shake')), 450);
    }
  }
  function listenMic() {
    const ex = st.ex; const mic = $('#mic'); const heard = $('#heard');
    if (st.rec) { try { st.rec.stop(); } catch (e) { } return; }
    let rec; try { rec = new Q.SR(); } catch (e) { heard.textContent = 'Mikrofon kullanılamıyor.'; return; }
    rec.lang = 'en-US'; rec.interimResults = true; rec.maxAlternatives = 3;
    st.rec = rec; mic.classList.add('rec'); heard.textContent = 'Dinliyorum…';
    let best = '';
    rec.onresult = e => { if (!st) return; const r = e.results[e.results.length - 1]; best = Array.from(e.results).map(x => x[0].transcript).join(' '); heard.textContent = '“' + best + '”'; if (r.isFinal) { st.heard = Array.from(r).map(a => a.transcript); } };
    rec.onerror = e => { heard.textContent = e.error === 'not-allowed' ? 'Mikrofon izni verilmedi.' : 'Duyamadım, tekrar dene.'; };
    rec.onend = () => { if (!st) return; mic.classList.remove('rec'); st.rec = null; if (best) { st.spoken = st.heard && st.heard.length ? st.heard.concat([best]) : [best]; foot(); primary(); } };
    try { rec.start(); } catch (e) { mic.classList.remove('rec'); st.rec = null; }
  }

  /* ---------- Alt çubuk ---------- */
  function ready() {
    const ex = st.ex;
    if (['pick', 'pickTr', 'fill'].includes(ex.type)) return st.sel !== null;
    if (['bankEn', 'bankTr', 'listen'].includes(ex.type)) return st.picked.length > 0;
    if (ex.type === 'type' || ex.type === 'listenType') { const tb = $('#tb'); return !!(tb && tb.value.trim()); }
    if (ex.type === 'speak') return !!st.spoken;
    return false;
  }
  function foot() {
    const f = $('#lf'); if (!f) return;
    const ex = st.ex;
    if (st.state === 'idle') {
      f.className = 'les-foot';
      let skip = '<button class="btn ghost" data-f="skip">Atla</button>';
      if (ex.type === 'listen' || ex.type === 'listenType') skip = '<button class="btn ghost" data-f="nolisten">Şimdi dinleyemem</button>';
      if (ex.type === 'speak') skip = '<button class="btn ghost" data-f="nospeak">Şimdi konuşamam</button>';
      if (ex.type === 'match') skip = '<span></span>';
      const check = ex.type === 'match' ? '' : `<button class="btn" data-f="check" ${ready() ? '' : 'disabled'}>Kontrol et</button>`;
      f.innerHTML = `<div class="in idle">${skip}${check}</div>`;
    } else {
      const r = st.result;
      const ok = r.ok;
      const praise = pick(['Harika!', 'Mükemmel!', 'Süper!', 'Aynen böyle!', 'Bravo!', 'Çok iyi!']);
      f.className = 'les-foot ' + (ok ? 'ok' : 'bad');
      f.innerHTML = `<div class="in"><div class="fb"><div class="fi">${ok ? '✔️' : '✖️'}</div><div><h3>${ok ? praise : 'Doğru cevap:'}</h3>${r.msg ? `<p>${r.msg}</p>` : ''}</div></div>
        <button class="btn ${ok ? 'ok' : 'bad'}" data-f="next">Devam</button></div>`;
    }
    f.onclick = e => { const b = e.target.closest('[data-f]'); if (!b) return; handleFoot(b.dataset.f); };
    if (st.state !== 'idle') { const n = f.querySelector('[data-f=next]'); if (n) n.focus(); }
  }
  function handleFoot(k) {
    if (k === 'check') check();
    else if (k === 'next') next();
    else if (k === 'skip') { st.result = { ok: false, msg: esc(answerText(st.ex)) }; resolve(false); }
    else if (k === 'nolisten' || k === 'nospeak') {
      if (k === 'nolisten') Q.S.settings.tts = false; else Q.S.settings.speak = false;
      Q.save();
      Q.toast(k === 'nolisten' ? 'Dinleme soruları kapatıldı (Profil › Ayarlar).' : 'Konuşma soruları kapatıldı (Profil › Ayarlar).');
      st.resolved++; st.i++;
      if (st.i >= st.queue.length) return finish();
      show();
    }
  }
  function primary() { if (st.state === 'idle') { if (ready()) check(); } else next(); }
  function onKey(e) {
    if (!st || !$('#modal').hidden) return;
    const typing = e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT';
    if (e.key === 'Enter' && !typing) { e.preventDefault(); primary(); return; }
    if (typing || st.state !== 'idle') return;
    const ex = st.ex;
    if (/^[1-9]$/.test(e.key)) {
      const n = +e.key - 1;
      if (['pick', 'pickTr', 'fill'].includes(ex.type) && n < ex.options.length) choose(n);
      else if (ex.type === 'match') { const b = $$('#lb .choice')[n]; if (b) matchTap(b); }
      else if (ex.tiles) { const b = $$('#bank .wt:not(.used)')[n]; if (b) tile(b); }
    } else if (e.key === 'Backspace' && ex.tiles) { const last = $('#az .wt:last-child'); if (last) tile(last); }
  }

  function answerText(ex) {
    switch (ex.type) {
      case 'pick': return ex.word.en;
      case 'pickTr': return ex.word.tr;
      case 'bankTr': return ex.sent.tr;
      case 'fill': return ex.answer;
      default: return ex.sent ? ex.sent.en : '';
    }
  }
  function check() {
    const ex = st.ex; let ok = false, msg = '';
    if (ex.type === 'pick' || ex.type === 'pickTr') {
      ok = ex.options[st.sel].id === ex.word.id;
      if (!ok) msg = esc(answerText(ex));
      $$('#lb .choice').forEach((c, j) => { c.disabled = true; if (j === st.sel) c.classList.add(ok ? 'right' : 'wrong'); });
      wordSeen(ex.word.id, ok);
    } else if (ex.type === 'fill') {
      ok = ex.options[st.sel] === ex.answer;
      if (!ok) msg = esc(ex.sent.en);
      wordSeen(ex.word.id, ok);
    } else if (['bankEn', 'bankTr', 'listen'].includes(ex.type)) {
      const said = st.picked.map(i => ex.tiles[i]).join(' ');
      const answers = ex.lang === 'en' ? [ex.sent.en].concat(ex.sent.enAlt) : [ex.sent.tr].concat(ex.sent.trAlt);
      ok = Q.judge(said, answers, ex.lang, false).ok;
      if (!ok) msg = esc(ex.lang === 'en' ? ex.sent.en : ex.sent.tr);
      else if (ex.type !== 'listen') msg = 'Anlamı: ' + esc(ex.lang === 'en' ? ex.sent.tr : ex.sent.en);
    } else if (ex.type === 'type' || ex.type === 'listenType') {
      const val = $('#tb').value; $('#tb').disabled = true;
      const answers = ex.type === 'type' ? [ex.sent.en].concat(ex.sent.enAlt) : [ex.sent.en];
      const r = Q.judge(val, answers, 'en', true);
      ok = r.ok;
      if (!ok) msg = esc(ex.sent.en);
      else if (r.typo) msg = 'Küçük bir yazım hatası var: <b>' + esc(r.typo) + '</b>';
    } else if (ex.type === 'speak') {
      const target = Q.norm(ex.sent.en, 'en').split(' ');
      let best = 0;
      (st.spoken || []).forEach(s => {
        const got = Q.norm(s, 'en').split(' ');
        const hit = target.filter(w => got.includes(w)).length / target.length;
        best = Math.max(best, hit);
      });
      ok = best >= 0.7;
      msg = ok ? 'Telaffuzun çok iyi! (%' + Math.round(best * 100) + ')' : esc(ex.sent.en) + ' <span class="small">(%' + Math.round(best * 100) + ' eşleşti)</span>';
    }
    if (ok && (ex.type === 'listen' || ex.type === 'listenType')) Q.bump('listen');
    st.result = { ok, msg };
    resolve(ok);
  }
  function wordSeen(id, ok) {
    const w = Q.S.words[id]; if (!w) return;
    w.seen++; if (ok) w.ok++;
  }
  function resolve(ok) {
    const ex = st.ex;
    st.state = 'done';
    ex.tries++;
    if (ok) {
      Q.sfx('ok'); st.combo++; st.maxCombo = Math.max(st.maxCombo, st.combo); st.resolved++;
      if (ex.tries === 1) st.firstTry++;
      if (ex.key && st.opts.mode === 'mistakes') { const m = Q.S.mistakes; if (m[ex.key]) { m[ex.key]--; if (m[ex.key] <= 0) delete m[ex.key]; } }
    } else {
      Q.sfx('bad'); st.combo = 0; st.wrong++;
      if (ex.key) Q.S.mistakes[ex.key] = (Q.S.mistakes[ex.key] || 0) + 1;
      if (HEART_MODES.has(st.opts.mode)) Q.loseHeart();
      if (st.opts.mode === 'jump') st.lives--;
      const max = HEART_MODES.has(st.opts.mode) ? 3 : 2;
      if (ex.tries < max) st.queue.push(rebuild(ex)); else st.resolved++;
    }
    Q.bump('combo', st.combo);
    Q.save();
    $('.les-top').outerHTML = topHTML();
    $('.les-top [data-act=quit]').onclick = quitAsk;
    foot();
    if (ok && st.combo > 0 && st.combo % 5 === 0) { const el = $('.combo'); if (el) el.textContent = '🔥 ' + st.combo + ' üst üste! Harikasın'; }
  }
  function rebuild(ex) {
    const copy = Object.assign({}, ex);
    if (copy.tiles) copy.tiles = shuffle(copy.tiles);
    if (copy.options) copy.options = shuffle(copy.options);
    return copy;
  }
  function next() {
    if (st.opts.mode === 'jump' && st.lives <= 0) return failJump();
    if (HEART_MODES.has(st.opts.mode) && Q.S.hearts <= 0 && !Q.heartsUnlimited()) return outOfHearts();
    st.i++;
    if (st.i >= st.queue.length) return finish();
    show();
  }
  function outOfHearts() {
    Q.sfx('fail');
    const canBuy = Q.S.gems >= 350;
    Q.modal(`${Q.mascot('sad', 120)}<h2>Canın kalmadı</h2><p>Canlar her 30 dakikada bir yenilenir. Beklemek istemiyorsan doldurabilir ya da pratik yaparak can kazanabilirsin.</p>
      <button class="btn plum block" data-a="buy" ${canBuy ? '' : 'disabled'}>Canları doldur · 💎 350</button>
      <button class="btn teal block" data-a="prac">Pratik yap, can kazan</button>
      <button class="btn ghost block" data-a="quit">Dersi bitir</button>`, (m, c) => {
      m.querySelector('[data-a=buy]').onclick = () => { Q.S.gems -= 350; Q.S.hearts = Q.MAX_HEARTS; Q.save(); Q.sfx('coin'); c(); $('.les-top').outerHTML = topHTML(); $('.les-top [data-act=quit]').onclick = quitAsk; next(); };
      m.querySelector('[data-a=prac]').onclick = () => { c(); close(true); start({ mode: 'practice' }); };
      m.querySelector('[data-a=quit]').onclick = () => { c(); if (st.opts.mode === 'test') failTest(); else close(); };
    });
  }
  function failJump() {
    Q.sfx('fail');
    const ov = $('#overlay'), sec = C.sections[st.opts.section];
    ov.innerHTML = `<div class="finish">${Q.mascot('sad', 150)}<h1 style="color:var(--bad)">Bu sefer olmadı</h1><p class="soft">${sec.id} atlama testi için 3 hakkın bitti. Sorun değil, ${sec.id} derslerinden başlamak sağlam bir temel kurar.</p><button class="btn block" data-a="ok">Tamam</button></div>`;
    ov.querySelector('[data-a=ok]').onclick = () => { const cb = st.opts.onFail; close(); if (cb) cb(); };
  }
  function failTest() {
    const ov = $('#overlay');
    ov.innerHTML = `<div class="finish">${Q.mascot('sad', 150)}<h1 style="color:var(--bad)">Bu sefer olmadı</h1><p class="soft">Ünite testini geçmek için canların bitmeden tamamlaman gerekiyor. Biraz pratik yapıp tekrar dene!</p><button class="btn block" data-a="ok">Tamam</button></div>`;
    ov.querySelector('[data-a=ok]').onclick = () => close();
  }

  /* ---------- Bitiş ---------- */
  function finish() {
    const o = st.opts, S = Q.S;
    const secs = Math.round((Date.now() - st.startT) / 1000);
    const answered = st.firstTry + st.wrong;
    const acc = answered ? Math.round(st.firstTry / answered * 100) : 100;
    const perfect = st.wrong === 0;
    let base = o.mode === 'test' ? 25 : o.mode === 'jump' ? 40 : o.mode === 'lesson' || o.mode === 'vocab' || o.mode === 'deck' ? 10 : 8;
    let bonus = Math.min(5, Math.floor(st.maxCombo / 5)) + (perfect && (o.mode === 'lesson' || o.mode === 'test') ? 5 : 0);
    const xp = Q.addXP(base + bonus);
    S.stats.lessons++; if (perfect) S.stats.perfect++; S.stats.maxCombo = Math.max(S.stats.maxCombo, st.maxCombo);
    Q.bump('lessons'); if (perfect) Q.bump('perfect');
    let reward = '';
    if (o.mode === 'lesson') { S.progress[o.node.id] = Math.min(Q.LEVELS, (S.progress[o.node.id] || 0) + (o.review ? 0 : 1)); Q.learnWords(o.node.id); }
    if (o.mode === 'deck') { Q.learnIds(o.words.map(w => w.id)); reward = `<p class="soft">📚 ${o.words.length} yeni kelime kelime kartlarına eklendi · Kelime hazinen: ${Q.vocab().n}</p>`; }
    if (o.mode === 'vocab') { S.progress[o.node.id] = 1; Q.learnWords(o.node.id); }
    if (o.mode === 'jump') { for (let k = 0; k <= o.section; k++) Q.completeSection(k); reward = `<p class="soft">🚀 ${C.sections[o.section].id} seviyesini atladın! Tüm kelimeleri kelime kartlarına eklendi.</p>`; }
    if (o.mode === 'test') { if (!S.progress[o.node.id]) { S.stats.tests++; S.gems += 50; reward = '<p class="soft">🏆 Ünite tamamlandı! +50 💎</p>'; } S.progress[o.node.id] = 1; C.units[o.node.unit].lessons.forEach(l => Q.learnWords(l.id)); Q.learnWords('u' + o.node.unit + 'x'); }
    if (!HEART_MODES.has(o.mode) && S.hearts < Q.MAX_HEARTS) { S.hearts++; reward += '<p class="soft">❤️ Pratik için +1 can kazandın</p>'; }
    const extended = Q.extendStreak();
    st.cert = Q.checkCerts();
    Q.checkAchievements(); Q.save();
    Q.sfx('done'); Q.confetti();
    const title = o.mode === 'test' ? 'Ünite testini geçtin!' : perfect ? 'Kusursuz ders!' : o.mode === 'lesson' ? 'Ders tamamlandı!' : 'Pratik tamamlandı!';
    const ov = $('#overlay');
    ov.innerHTML = `<div class="finish">${Q.mascot(perfect ? 'wow' : 'happy', 160)}<h1>${title}</h1>${S.doubleUntil > Date.now() ? '<p class="soft">⚡ Çift XP aktif!</p>' : ''}
      <div class="cards">
        <div class="fcard" style="--c:var(--gold)"><b>Toplam XP</b><div>⚡ ${xp}</div></div>
        <div class="fcard" style="--c:var(--ok)"><b>${acc >= 90 ? 'Harika' : acc >= 70 ? 'İyi' : 'Doğruluk'}</b><div>🎯 %${acc}</div></div>
        <div class="fcard" style="--c:var(--navy)"><b>Süre</b><div>⏱️ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</div></div>
      </div>${reward}
      <button class="btn block" data-a="go" style="margin-top:12px">Devam</button></div>`;
    ov.querySelector('[data-a=go]').onclick = () => extended ? streakScreen() : afterStreak();
  }
  function afterStreak() { if (st.cert) certScreen(st.cert); else done(); }
  function certScreen(id) {
    Q.sfx('fire'); Q.confetti(140);
    const sec = C.sections.find(x => x.id === id);
    $('#overlay').innerHTML = `<div class="finish">${App.certHTML(id)}<p class="soft">${sec.icon} ${esc(sec.name)} seviyesini tamamladın! Sertifikan Profil sayfanda duruyor.</p><button class="btn block" data-a="go">Harika!</button></div>`;
    $('#overlay [data-a=go]').onclick = done;
  }
  function streakScreen() {
    const S = Q.S, ov = $('#overlay');
    const today = Q.dayKey();
    const wd = (new Date().getDay() + 6) % 7;
    const dots = Q.DAYS_TR.map((d, i) => {
      const k = Q.addDays(today, i - wd);
      const on = (S.history[k] || 0) > 0 && i <= wd, fz = S.frozen.includes(k);
      return `<div><i class="${on ? 'on' : fz ? 'fz' : ''}">${on ? '✓' : fz ? '❄' : ''}</i>${d}</div>`;
    }).join('');
    Q.sfx('fire');
    ov.innerHTML = `<div class="finish"><div class="streak-big">🔥</div><div class="streak-num">${S.streak}</div><h1 style="color:var(--brand)">günlük seri!</h1>
      <div class="week-dots">${dots}</div><p class="soft">${S.streak === 1 ? 'Harika bir başlangıç! Yarın da gel, serini büyüt.' : 'Her gün biraz pratik, büyük fark yaratır. Böyle devam!'}</p>
      <button class="btn block" data-a="go">Devam</button></div>`;
    ov.querySelector('[data-a=go]').onclick = afterStreak;
  }
  function done() { const cb = st && st.opts.onDone; close(); if (cb) cb(); Q.flushNotices(); }

  /* ---------- Hikâye oynatıcı ---------- */
  const CAST = { 'Maya': '🎙️', 'Tom': '🎧', 'Deniz': '🧑‍💻', 'Lina': '👩‍🍳', 'Emma': '👩‍💼', 'Mr. Walker': '👨‍💼', 'Can': '🧔', 'Priya': '👩🏽‍💼', 'Anlatıcı': '📖', 'Narrator': '📖' };
  function story(node) {
    const u = node.custom ? null : C.units[node.unit], sto = node.custom ? node.sto : u.story;
    const sub = node.custom ? node.sub : esc(u.title) + ' · ' + esc(u.cefr);
    let hideText = !!node.hideText;
    const ov = $('#overlay'); ov.hidden = false; document.body.style.overflow = 'hidden';
    let i = 0, qi = 0, right = 0, wrongs = 0, showTr = false;
    const qs = sto.questions.slice().sort((a, b) => a.after - b.after);
    const t0 = Date.now();
    ov.innerHTML = `<div class="les-top"><button class="x" data-s="x" aria-label="Kapat">✕</button><div class="bar"><i id="sbar" style="width:0%"></i></div><button class="btn ghost sm" data-s="tr">TR</button></div>
      <div class="les-body story"><div class="story-head"><span class="sicon">${sto.icon || '📖'}</span><h2>${esc(sto.title)}</h2><p class="muted">${sub}</p>${node.hideText ? '<p class="small muted">🎧 Önce dinle: metin bulanık. Görmek için yazıya dokun.</p>' : ''}</div><div id="sl"></div></div>
      <div class="les-foot" id="sf"><div class="in"><span></span><button class="btn" data-s="next">Devam</button></div></div>`;
    const sl = $('#sl');
    const total = sto.lines.length + qs.length;
    function bar() { $('#sbar').style.width = Math.round((i + qi) / total * 100) + '%'; }
    function line() {
      const [who, en, tr] = sto.lines[i];
      const av = CAST[who] || '🙂';
      const narr = /Anlatıcı|Narrator/.test(who);
      sl.insertAdjacentHTML('beforeend', `<div class="sline ${narr ? 'narr' : ''}"><span class="sav" title="${esc(who)}">${av}</span><div class="sbub">${narr ? '' : `<b>${esc(who)}</b>`}<p class="${hideText ? 'blurred' : ''}">${hinted(en, 'en')}</p><p class="str-tr" ${showTr ? '' : 'hidden'}>${esc(tr)}</p></div>${Q.canListen() ? `<button class="play sm-play" data-say="${esc(en)}" aria-label="Dinle">🔊</button>` : ''}</div>`);
      Q.speak(en);
      i++; bar();
      sl.lastElementChild.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
    function question() {
      const q = qs[qi];
      const id = 'sq' + qi;
      sl.insertAdjacentHTML('beforeend', `<div class="squest" id="${id}"><b>❓ ${esc(q.q)}</b><div class="choices list">${q.options.map((o, j) => `<button class="choice" data-j="${j}"><span class="kn">${j + 1}</span>${esc(o)}</button>`).join('')}</div></div>`);
      $('#sf').innerHTML = '<div class="in"><span class="muted">Doğru cevabı seç</span><span></span></div>';
      const box = $('#' + id); box.scrollIntoView({ block: 'end', behavior: 'smooth' });
      let tries = 0;
      box.onclick = e => {
        const b = e.target.closest('.choice'); if (!b || b.disabled) return;
        const j = +b.dataset.j; tries++;
        if (j === q.answer) {
          Q.sfx('ok'); b.classList.add('right'); box.querySelectorAll('.choice').forEach(c => c.disabled = true);
          if (tries === 1) right++; qi++; bar();
          $('#sf').innerHTML = '<div class="in"><span></span><button class="btn ok" data-s="next">Devam</button></div>';
        } else { Q.sfx('bad'); wrongs++; b.classList.add('wrong', 'shake'); b.disabled = true; }
      };
    }
    function step() {
      if (qi < qs.length && qs[qi].after < i && !$('#sq' + qi)) return question();
      if (qi < qs.length && $('#sq' + qi)) return;
      if (i < sto.lines.length) return line();
      finishStory();
    }
    function finishStory() {
      const S = Q.S;
      let xp;
      if (node.custom) xp = node.onFinish(right, qs.length);
      else {
        const first = !S.progress[node.id];
        S.progress[node.id] = 1; S.stats.stories++;
        xp = Q.addXP(first ? 15 : 8);
      }
      const extended = Q.extendStreak();
      Q.bump('lessons'); Q.checkAchievements(); const cert = Q.checkCerts(); Q.save();
      Q.sfx('done'); Q.confetti();
      st = { opts: {}, cert };
      const secs = Math.round((Date.now() - t0) / 1000);
      ov.innerHTML = `<div class="finish">${Q.mascot('wow', 150)}<h1>Hikâye bitti!</h1><div class="cards">
        <div class="fcard" style="--c:var(--gold)"><b>XP</b><div>⚡ ${xp}</div></div>
        <div class="fcard" style="--c:var(--ok)"><b>Anlama</b><div>🎯 ${right}/${qs.length}</div></div>
        <div class="fcard" style="--c:var(--navy)"><b>Süre</b><div>⏱️ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</div></div></div>
        <button class="btn block" data-a="go">Devam</button></div>`;
      ov.querySelector('[data-a=go]').onclick = () => extended ? streakScreen() : afterStreak();
    }
    ov.onclick = e => {
      const bl = e.target.closest('.blurred'); if (bl) { bl.classList.remove('blurred'); return; }
      const b = e.target.closest('[data-s],[data-say]'); if (!b) return;
      if (b.dataset.say) return Q.speak(b.dataset.say);
      const k = b.dataset.s;
      if (k === 'x') { ov.onclick = null; st = null; return close(); }
      if (k === 'tr') { showTr = !showTr; b.classList.toggle('on', showTr); ov.querySelectorAll('.str-tr').forEach(x => x.hidden = !showTr); return; }
      if (k === 'next') step();
    };
    sl.addEventListener('mouseover', tipOn); sl.addEventListener('mouseout', tipOff);
    st = { opts: {}, story: true };
    document.addEventListener('keydown', onStoryKey);
    function onStoryKey(e) {
      if ($('#overlay').hidden) return document.removeEventListener('keydown', onStoryKey);
      if (e.key === 'Enter') { const n = $('#sf [data-s=next]'); if (n) { e.preventDefault(); n.click(); } }
      if (/^[1-4]$/.test(e.key)) { const q = $('#sq' + qi); if (q) { const c = q.querySelectorAll('.choice')[+e.key - 1]; if (c) c.click(); } }
    }
    step();
  }

  window.Lesson = { start, close, tokens, story };
})();
