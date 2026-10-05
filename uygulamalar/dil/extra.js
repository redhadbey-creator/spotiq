/* ASİ Dil — Kütüphane: kelime desteleri, okuma, podcast, konuşma kulübü, gerçek dünya */
(function () {
  'use strict';
  const { $, $$, esc, shuffle, sample, pick } = Q;
  let tab = 'words';
  const LV = ['A1', 'A2', 'B1', 'B2', 'C1'];

  /* ---------- Gerçek dünya: öneriler ve haftalık görevler ---------- */
  const RESOURCES = [
    { lv: 'A1–A2', items: [
      ['🎬', 'Peppa Pig', 'Çok yavaş ve net İngiliz İngilizcesi. Kısa bölümler, günlük kalıplar.'],
      ['🎬', 'Extr@ English', 'Dil öğrenenler için çekilmiş komedi dizisi. Basit diyaloglar.'],
      ['🎧', 'BBC Learning English · 6 Minute English', '6 dakikalık, yavaş anlatılan konular ve kelime listesi.'],
      ['🎧', 'Easy English (YouTube)', 'Sokakta gerçek insanlarla röportajlar, altyazılı.'],
      ['📚', 'Oxford Bookworms · Starter ve Level 1', 'Seviyeye göre sadeleştirilmiş kısa kitaplar.'],
      ['📚', 'Penguin Readers · Level 1–2', 'Kolaylaştırılmış romanlar ve hikâyeler.']
    ] },
    { lv: 'B1', items: [
      ['🎬', 'Friends', 'Günlük konuşma dili ve espriler. İngilizce altyazıyla izle.'],
      ['🎬', 'Modern Family', 'Aile hayatı, kısa sahneler, net konuşma.'],
      ['🎬', 'Ted Lasso', 'Amerikan ve İngiliz aksanı bir arada, sıcak bir dizi.'],
      ['🎧', 'All Ears English', 'Gerçek hayattan konuşma kalıpları üzerine podcast.'],
      ['🎧', 'TED-Ed (YouTube)', 'Animasyonlu, 5 dakikalık bilgi videoları.'],
      ['📚', 'Holes · Louis Sachar', 'Akıcı, sade dilli bir macera romanı.'],
      ['📚', 'Harry Potter and the Philosopher\'s Stone', 'Türkçesini bildiğin bir kitabı İngilizce okumak çok kolaylaştırır.']
    ] },
    { lv: 'B2', items: [
      ['🎬', 'The Office (US)', 'İş yeri dili ve ironi. Ofis hayatının İngilizcesi.'],
      ['🎬', 'Brooklyn Nine-Nine', 'Hızlı esprili diyaloglar, günlük argo.'],
      ['🎬', 'Sherlock', 'Zengin İngiliz İngilizcesi ve hızlı konuşma.'],
      ['🎧', 'Freakonomics Radio', 'Ekonomi ve insan davranışı üzerine sohbet.'],
      ['🎧', 'TED Talks Daily', 'Her gün kısa bir konuşma; farklı aksanlar.'],
      ['📚', 'Animal Farm · George Orwell', 'Kısa, sade ama derin bir klasik.'],
      ['📚', 'The Martian · Andy Weir', 'Esprili, sürükleyici bilim kurgu.']
    ] },
    { lv: 'C1', items: [
      ['🎬', 'The Crown', 'Resmi İngiliz İngilizcesi, siyaset ve tarih dili.'],
      ['🎬', 'Succession', 'İş dünyası, güç ve hızlı, keskin diyaloglar.'],
      ['🎬', 'Black Mirror', 'Teknoloji, etik ve soyut kavramlar.'],
      ['🎧', 'BBC Radio 4 · In Our Time', 'Akademik konularda uzman tartışmaları.'],
      ['🎧', 'Hidden Brain', 'Psikoloji ve davranış bilimi üzerine anlatılar.'],
      ['📚', '1984 · George Orwell', 'Siyasi kavramlar ve zengin kelime hazinesi.'],
      ['📚', 'Never Let Me Go · Kazuo Ishiguro', 'İnce duygular ve edebi üslup.']
    ] }
  ];
  const TIPS = [
    'Altyazıyı Türkçe değil İngilizce aç. Önce altyazılı, sonra altyazısız izle.',
    'Gölge okuma: Bir cümleyi dinle, durdur, aynı tonla tekrar et. Günde 5 dakika telaffuzu hızla düzeltir.',
    'Bilmediğin her kelimeye bakma. Bir sahnede yalnızca 3-5 kelimeyi not al.',
    'Gerçek konuşma için dil değişim uygulamaları (Tandem, HelloTalk) ya da online öğretmen platformları (italki, Preply) kullanabilirsin.',
    'Telefonunun ve sosyal medyanın dilini İngilizce yap. Her gün bedava pratik.'
  ];
  const TASKS = [
    { id: 'watch', ic: '🎬', t: 'En az 30 dakika İngilizce altyazılı dizi ya da film izle' },
    { id: 'pod', ic: '🎧', t: 'Bir İngilizce podcast bölümü dinle' },
    { id: 'read', ic: '📖', t: 'İngilizce bir makale ya da kitaptan 10 sayfa oku' },
    { id: 'talk', ic: '🗣️', t: 'Biriyle 15 dakika İngilizce konuş' },
    { id: 'write', ic: '✍️', t: 'İngilizce 150 kelimelik bir günlük ya da e-posta yaz' },
    { id: 'shadow', ic: '🔁', t: '5 dakika gölge okuma yap' }
  ];
  function rw() { const S = Q.S, wk = Q.weekKey(); if (S.rw.week !== wk) S.rw = { week: wk, done: {} }; return S.rw; }

  /* ---------- Görünüm ---------- */
  function lvlBadge(c) { return `<span class="cefr">${esc(c)}</span>`; }
  function vocabMeter() {
    const v = Q.vocab(), S = Q.S;
    const marks = Q.VOCAB_STEPS.map(([t, l]) => `<span style="left:${Math.min(100, t / v.goal * 100)}%">${l}</span>`).join('');
    const c1Need = !S.cert.C1 && v.n < Q.C1_WORDS ? `<p class="small muted">C1 sertifikası için ${Q.C1_WORDS.toLocaleString('tr-TR')} kelime gerekiyor. ${(Q.C1_WORDS - v.n).toLocaleString('tr-TR')} kaldı.</p>` : '';
    return `<div class="box vmeter"><div class="vm-top"><div><b>Kelime hazinen</b><p class="soft small">CEFR araştırmalarına göre tahmini seviyen</p></div><div class="vm-n"><b>${v.n.toLocaleString('tr-TR')}</b><span>${esc(v.lvl)}</span></div></div>
      <div class="bar ok vm-bar"><i style="width:${Math.min(100, v.n / v.goal * 100)}%"></i></div><div class="vm-marks">${marks}</div>${c1Need}</div>`;
  }
  function render() {
    const tabs = [['words', '🗂️', 'Kelime'], ['read', '📖', 'Okuma'], ['listen', '🎧', 'Podcast'], ['speak', '🗣️', 'Konuşma'], ['world', '🌍', 'Gerçek Dünya']];
    const body = { words: renderWords, read: renderRead, listen: renderListen, speak: renderSpeak, world: renderWorld }[tab]();
    return `<h1 class="page-title">Kütüphane</h1><p class="page-sub">Ders dışında da gelişmen için: binlerce ileri kelime, okuma metinleri, podcast, konuşma pratiği ve gerçek dünya görevleri.</p>
      ${vocabMeter()}<div class="ltabs" role="tablist">${tabs.map(([k, i, t]) => `<button role="tab" aria-selected="${tab === k}" class="${tab === k ? 'on' : ''}" data-lib="tab:${k}"><span>${i}</span>${t}</button>`).join('')}</div>${body}`;
  }
  function renderWords() {
    const S = Q.S;
    if (!Q.LIB.length) return empty('Kelime desteleri yükleniyor.');
    const byLv = {};
    Q.LIB.forEach(d => (byLv[d.cefr] = byLv[d.cefr] || []).push(d));
    return Object.keys(byLv).sort().map(lv => `<h2 class="section-h">${lvlBadge(lv)} ${lv === 'B2' ? 'Orta üstü desteler' : 'İleri desteler'}</h2><div class="grid two">${byLv[lv].map(d => {
      const known = d.items.filter(w => S.words[w.id]).length, tot = d.items.length;
      return `<button class="tile deck" data-lib="deck:${esc(d.id)}"><span class="big bg-blue">${d.icon}</span><div style="min-width:0;flex:1"><h3>${esc(d.title)}</h3><p>${esc(d.desc || '')}</p><div class="bar ok" style="height:10px;margin-top:8px"><i style="width:${tot ? known / tot * 100 : 0}%"></i></div><p class="small muted" style="margin-top:4px">${known} / ${tot} kelime</p></div></button>`;
    }).join('')}</div>`).join('') + '<p class="footer-note">Her oturum 10 yeni kelime öğretir; öğrendiklerin aralıklı tekrar ile Kelime Kartları\'na eklenir.</p>';
  }
  function listByLevel(arr, store, item) {
    if (!arr.length) return empty('İçerik yükleniyor.');
    return LV.filter(l => arr.some(x => x.cefr === l)).map(l => `<h2 class="section-h">${lvlBadge(l)}</h2><div class="grid two">${arr.filter(x => x.cefr === l).map(x => item(x, store[x.id])).join('')}</div>`).join('');
  }
  function doneTag(r, total) { return r !== undefined ? `<span class="tag okk">✓ ${r}/${total}</span>` : ''; }
  function renderRead() {
    return listByLevel(window.READINGS || [], Q.S.reads, (r, done) => `<button class="tile" data-lib="read:${esc(r.id)}"><span class="big bg-gold">${r.icon}</span><div style="min-width:0"><h3>${esc(r.title)}</h3><p>${esc(r.trTitle)} · ${esc(r.kind)} · ~${Math.round(r.paragraphs.map(p => p[0]).join(' ').split(/\s+/).length / 10) * 10} kelime</p></div>${doneTag(done, r.questions.length)}</button>`);
  }
  function renderListen() {
    return `<div class="box" style="margin-bottom:6px"><p class="soft small">🎧 <b>ASİ Dil Radyo</b>: Maya ve Tom'un doğal konuşmaları. Metin önce bulanık gelir; önce dinle, anlamadığın yere dokun.</p></div>` +
      listByLevel(window.PODCASTS || [], Q.S.pods, (p, done) => `<button class="tile" data-lib="pod:${esc(p.id)}"><span class="big bg-plum">${p.icon}</span><div style="min-width:0"><h3>${esc(p.title)}</h3><p>${esc(p.desc || '')}</p></div>${doneTag(done, p.questions.length)}</button>`);
  }
  function renderSpeak() {
    return `<div class="box" style="margin-bottom:6px"><p class="soft small">🗣️ Gerçek hayattaki durumları canlandır. ${Q.SR ? 'Mikrofonla konuşabilir ya da yazabilirsin.' : 'Cevabını yaz; Chrome kullanırsan mikrofonla da konuşabilirsin.'} Her turdan sonra doğal örnek cevapları görürsün.</p></div>` +
      listByLevel(window.ROLEPLAYS || [], Q.S.roles, (s, done) => `<button class="tile" data-lib="role:${esc(s.id)}"><span class="big bg-teal">${s.icon}</span><div style="min-width:0"><h3>${esc(s.title)}</h3><p>${esc(s.situation)}</p></div>${done !== undefined ? `<span class="tag okk">✓ %${done}</span>` : ''}</button>`);
  }
  function renderWorld() {
    const r = rw();
    const cs = Q.C.sections[Q.currentSection()].id;
    const recIdx = cs === 'A1' || cs === 'A2' ? 0 : cs === 'B1' ? 1 : cs === 'B2' ? 2 : 3;
    return `<h2 class="section-h">Bu haftanın gerçek dünya görevleri</h2><div class="box">${TASKS.map(t => `<label class="rw-task"><input type="checkbox" data-lib="task:${t.id}" ${r.done[t.id] ? 'checked disabled' : ''}><span class="qi">${t.ic}</span><span style="flex:1">${esc(t.t)}</span><span class="small muted">${r.done[t.id] ? '✓ +10 XP' : '+10 XP · 5 💎'}</span></label>`).join('')}<p class="small muted" style="margin-top:8px">Dürüstlük sende: yaptığında işaretle. Görevler her pazartesi yenilenir.</p></div>
      <h2 class="section-h">Nasıl çalışmalı?</h2><div class="box"><ul class="tips">${TIPS.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>
      ${RESOURCES.map((g, i) => `<h2 class="section-h">${esc(g.lv)} için öneriler ${i === recIdx ? '<span class="tag okk" style="margin-left:6px">Seviyene uygun</span>' : ''}</h2><div class="box">${g.items.map(([ic, n, d]) => `<div class="res"><span class="qi">${ic}</span><div><b>${esc(n)}</b><p class="small soft">${esc(d)}</p></div></div>`).join('')}</div>`).join('')}
      <p class="footer-note">Öneriler yalnızca isim ve tavsiyedir; içeriklere kendi aboneliklerin ya da kütüphanen üzerinden ulaşabilirsin.</p>`;
  }
  function empty(t) { return `<div class="box" style="text-align:center">${Q.mascot('think', 80)}<p class="soft">${esc(t)}</p></div>`; }

  /* ---------- Etkileşim ---------- */
  function click(el) {
    const [k, v] = el.dataset.lib.split(':');
    if (k === 'tab') { tab = v; return App.render(); }
    if (k === 'deck') return startDeck(v);
    if (k === 'read') return reader(v);
    if (k === 'pod') return podcast(v);
    if (k === 'role') return roleplay(v);
    if (k === 'task') {
      const r = rw(); if (r.done[v]) return;
      r.done[v] = true; Q.S.gems += 5; Q.addXP(10); Q.extendStreak(); Q.save(); Q.sfx('coin'); Q.toast('✅ Harika! +10 XP · +5 💎'); Q.flushNotices(); return App.render();
    }
  }
  function startDeck(id) {
    const d = Q.LIB.find(x => x.id === id); if (!d) return;
    const fresh = d.items.filter(w => !Q.S.words[w.id]);
    const words = fresh.length >= 4 ? fresh.slice(0, 10) : sample(d.items, Math.min(10, d.items.length));
    if (!fresh.length) Q.toast('Bu destenin tamamını öğrendin! Tekrar turu başlıyor.');
    Lesson.start({ mode: 'deck', deck: id, words });
  }

  /* ---------- Okuma odası ---------- */
  function reader(id) {
    const r = (window.READINGS || []).find(x => x.id === id); if (!r) return;
    const S = Q.S, ov = $('#overlay');
    ov.hidden = false; ov.onclick = null; document.body.style.overflow = 'hidden';
    const gl = {}; r.glossary.forEach(([en, tr]) => { gl[en.toLowerCase()] = tr; });
    const tipFor = w => { const k = w.toLowerCase().replace(/[.,!?'’]+$/g, '').replace(/^['’]+/, ''); if (gl[k]) return gl[k]; const x = Q.wordByEn[k]; return x ? x.tr : ''; };
    const markup = txt => txt.split(/\s+/).map(w => { const h = tipFor(w); const k = w.toLowerCase().replace(/[.,!?'’]+$/g, ''); return h ? `<span class="hw ${gl[k] ? 'gl' : ''}" tabindex="0" data-h="${esc(h)}">${esc(w)}</span>` : esc(w); }).join(' ');
    let showTr = false, qi = 0, right = 0;
    const t0 = Date.now();
    ov.innerHTML = `<div class="les-top"><button class="x" data-r="x" aria-label="Kapat">✕</button><div class="bar"><i id="rbar" style="width:0%"></i></div><button class="btn ghost sm" data-r="tr">TR</button></div>
      <div class="les-body reader"><div class="story-head"><span class="sicon">${r.icon}</span><p class="muted">${esc(r.kind)} · ${esc(r.cefr)}</p><h2>${esc(r.title)}</h2><p class="muted">${esc(r.trTitle)}</p>
      ${Q.canListen() ? '<button class="btn ghost sm" data-r="all">🔊 Tümünü sesli oku</button>' : ''}</div>
      <div class="gloss"><b>Önemli kelimeler</b><div>${r.glossary.map(([en, tr]) => `<span class="gchip"><b>${esc(en)}</b> ${esc(tr)}</span>`).join('')}</div></div>
      ${r.paragraphs.map(([en, tr], i) => `<div class="para"><p>${markup(en)}</p><p class="str-tr" hidden>${esc(tr)}</p>${Q.canListen() ? `<button class="play sm-play" data-r="p${i}" aria-label="Paragrafı dinle">🔊</button>` : ''}</div>`).join('')}
      <div id="rq"><button class="btn block" data-r="q">Anlama sorularına geç</button></div></div>`;
    const body = ov.querySelector('.reader');
    ov.addEventListener('scroll', () => { const p = ov.scrollTop / Math.max(1, ov.scrollHeight - ov.clientHeight); const b = $('#rbar'); if (b) b.style.width = Math.round(p * 100) + '%'; });
    body.addEventListener('mouseover', tip); body.addEventListener('focusin', tip); body.addEventListener('mouseout', untip); body.addEventListener('focusout', untip);
    function question() {
      const q = r.questions[qi], box = $('#rq');
      box.innerHTML = `<div class="squest"><b>❓ ${qi + 1}/${r.questions.length} · ${esc(q.q)}</b><div class="choices list">${q.options.map((o, j) => `<button class="choice" data-j="${j}"><span class="kn">${j + 1}</span>${esc(o)}</button>`).join('')}</div></div>`;
      box.scrollIntoView({ block: 'center', behavior: 'smooth' });
      let tries = 0;
      box.onclick = e => {
        const b = e.target.closest('.choice'); if (!b || b.disabled) return;
        tries++;
        if (+b.dataset.j === q.answer) {
          Q.sfx('ok'); b.classList.add('right'); box.querySelectorAll('.choice').forEach(c => c.disabled = true);
          if (tries === 1) right++;
          box.insertAdjacentHTML('beforeend', `<button class="btn ok block" style="margin-top:12px" data-r="${qi + 1 < r.questions.length ? 'next' : 'end'}">${qi + 1 < r.questions.length ? 'Sonraki soru' : 'Bitir'}</button>`);
        } else { Q.sfx('bad'); b.classList.add('wrong', 'shake'); b.disabled = true; }
      };
    }
    function finish() {
      const first = S.reads[r.id] === undefined;
      S.reads[r.id] = Math.max(right, S.reads[r.id] || 0); S.stats.reads++;
      const xp = Q.addXP(first ? 20 : 5);
      const ext = Q.extendStreak(); Q.bump('lessons'); Q.checkAchievements(); Q.save();
      Q.sfx('done'); Q.confetti();
      const secs = Math.round((Date.now() - t0) / 1000);
      ov.innerHTML = `<div class="finish">${Q.mascot('wow', 140)}<h1>Okuma bitti!</h1><div class="cards">
        <div class="fcard" style="--c:var(--gold)"><b>XP</b><div>⚡ ${xp}</div></div><div class="fcard" style="--c:var(--ok)"><b>Anlama</b><div>🎯 ${right}/${r.questions.length}</div></div><div class="fcard" style="--c:var(--navy)"><b>Süre</b><div>⏱️ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</div></div></div>
        ${ext ? `<p class="soft">🔥 Serin ${S.streak} gün oldu!</p>` : ''}<button class="btn block" data-r="close">Devam</button></div>`;
    }
    ov.onclick = e => {
      const b = e.target.closest('[data-r]'); if (!b) return;
      const k = b.dataset.r;
      if (k === 'x' || k === 'close') return closeOv();
      if (k === 'tr') { showTr = !showTr; b.classList.toggle('on', showTr); ov.querySelectorAll('.str-tr').forEach(x => x.hidden = !showTr); return; }
      if (k === 'all') return Q.speak(r.paragraphs.map(p => p[0]).join(' '));
      if (k[0] === 'p') return Q.speak(r.paragraphs[+k.slice(1)][0]);
      if (k === 'q') return question();
      if (k === 'next') { qi++; return question(); }
      if (k === 'end') return finish();
    };
  }
  function tip(e) { const h = e.target.closest('.hw'); if (!h || h.querySelector('.tip')) return; const t = document.createElement('span'); t.className = 'tip'; t.textContent = h.dataset.h; h.appendChild(t); }
  function untip(e) { const h = e.target.closest('.hw'); if (h) { const t = h.querySelector('.tip'); if (t) t.remove(); } }
  function closeOv() {
    const ov = $('#overlay'); ov.hidden = true; ov.innerHTML = ''; ov.onclick = null; document.body.style.overflow = '';
    if (Q.ttsOK) speechSynthesis.cancel();
    App.render(); Q.flushNotices();
  }

  /* ---------- Podcast ---------- */
  function podcast(id) {
    const p = (window.PODCASTS || []).find(x => x.id === id); if (!p) return;
    const S = Q.S;
    Lesson.story({
      custom: true, hideText: true, id: p.id,
      sto: { title: p.title, icon: p.icon, lines: p.lines, questions: p.questions },
      sub: 'ASİ Dil Radyo · ' + esc(p.cefr),
      onFinish: (right, total) => { const first = S.pods[p.id] === undefined; S.pods[p.id] = Math.max(right, S.pods[p.id] || 0); S.stats.pods++; return Q.addXP(first ? 20 : 5); }
    });
  }

  /* ---------- Konuşma kulübü ---------- */
  function roleplay(id) {
    const sc = (window.ROLEPLAYS || []).find(x => x.id === id); if (!sc) return;
    const S = Q.S, ov = $('#overlay');
    ov.hidden = false; ov.onclick = null; document.body.style.overflow = 'hidden';
    let ti = 0, total = 0, rec = null;
    ov.innerHTML = `<div class="les-top"><button class="x" data-p="x" aria-label="Kapat">✕</button><div class="bar"><i id="pbar" style="width:0%"></i></div><span class="hearts">🗣️</span></div>
      <div class="les-body"><div class="story-head"><span class="sicon">${sc.icon}</span><h2>${esc(sc.title)}</h2><p class="muted">${esc(sc.cefr)} · Karşındaki: ${esc(sc.partner)}</p></div>
      <div class="box sit"><b>Durum</b><p class="soft">${esc(sc.situation)}</p></div><div id="chat"></div><div id="ans"></div></div>`;
    const chat = $('#chat'), ans = $('#ans');
    function turn() {
      const t = sc.turns[ti];
      $('#pbar').style.width = Math.round(ti / sc.turns.length * 100) + '%';
      chat.insertAdjacentHTML('beforeend', `<div class="sline"><span class="sav">💬</span><div class="sbub"><b>${esc(sc.partner)}</b><p>${esc(t.them)}</p><p class="str-tr" hidden>${esc(t.themTr)}</p></div>${Q.canListen() ? `<button class="play sm-play" data-say="${esc(t.them)}" aria-label="Dinle">🔊</button>` : ''}</div>`);
      Q.speak(t.them);
      ans.innerHTML = `<div class="hint-box">💡 <b>Ne demelisin?</b> ${esc(t.hint)} <button class="link" data-p="tr">Çeviriyi gör</button></div>
        <div class="speak-row">${Q.canSpeak() ? '<button class="mic small-mic" data-p="mic" aria-label="Konuş">🎙️</button>' : ''}<textarea class="typebox" id="rp-in" placeholder="İngilizce cevabını yaz ya da mikrofonla söyle" autocapitalize="off" spellcheck="false" style="min-height:90px"></textarea></div>
        <div style="display:flex;gap:10px;margin-top:12px"><button class="btn ghost" style="flex:1" data-p="show">Örnek cevap</button><button class="btn" style="flex:1" data-p="send">Gönder</button></div>`;
      const inp = $('#rp-in'); inp.focus();
      inp.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(false); } };
      ans.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
    function score(txt, t) {
      const n = Q.norm(txt, 'en'); if (!n) return 0;
      const words = new Set(n.split(' '));
      const kw = t.keywords.filter(k => n.includes(Q.norm(k, 'en'))).length / t.keywords.length;
      let best = 0;
      t.answers.forEach(a => { const aw = Q.norm(a, 'en').split(' '); best = Math.max(best, aw.filter(w => words.has(w)).length / aw.length); });
      return Math.round(Math.max(kw, best) * 100);
    }
    function send(gaveUp) {
      const t = sc.turns[ti], txt = gaveUp ? '' : ($('#rp-in').value || '').trim();
      if (!gaveUp && !txt) return Q.toast('Önce bir cevap yaz ya da söyle.');
      const sc0 = gaveUp ? 0 : score(txt, t); total += sc0;
      const ok = sc0 >= 60;
      if (txt) chat.insertAdjacentHTML('beforeend', `<div class="sline me"><div class="sbub"><b>Sen</b><p>${esc(txt)}</p></div><span class="sav">${S.avatar}</span></div>`);
      Q.sfx(ok ? 'ok' : gaveUp ? 'tap' : 'bad');
      ans.innerHTML = `<div class="rp-fb ${ok ? 'ok' : 'try'}"><b>${ok ? '✔️ Çok iyi! (%' + sc0 + ')' : gaveUp ? '📝 Şöyle diyebilirsin:' : '🙂 Anlaşılır ama şöyle daha doğal olur (%' + sc0 + '):'}</b>
        ${t.answers.map(a => `<div class="gex"><div><b>${esc(a)}</b></div>${Q.canListen() ? `<button class="play sm-play" data-say="${esc(a)}" aria-label="Dinle">🔊</button>` : ''}</div>`).join('')}</div>
        <button class="btn ${ok ? 'ok' : ''} block" style="margin-top:12px" data-p="next">${ti + 1 < sc.turns.length ? 'Devam' : 'Bitir'}</button>`;
      ans.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
    function mic(btn) {
      if (rec) { try { rec.stop(); } catch (e) { } return; }
      try { rec = new Q.SR(); } catch (e) { return Q.toast('Mikrofon kullanılamıyor.'); }
      rec.lang = 'en-US'; rec.interimResults = true;
      btn.classList.add('rec');
      rec.onresult = e => { $('#rp-in').value = Array.from(e.results).map(x => x[0].transcript).join(' '); };
      rec.onerror = e => Q.toast(e.error === 'not-allowed' ? 'Mikrofon izni verilmedi.' : 'Duyamadım, tekrar dene.');
      rec.onend = () => { btn.classList.remove('rec'); rec = null; };
      try { rec.start(); } catch (e) { btn.classList.remove('rec'); rec = null; }
    }
    function finish() {
      const pct = Math.round(total / sc.turns.length);
      const first = S.roles[sc.id] === undefined;
      S.roles[sc.id] = Math.max(pct, S.roles[sc.id] || 0); S.stats.roles++;
      const xp = Q.addXP(first ? 15 : 5); const ext = Q.extendStreak(); Q.bump('lessons'); Q.checkAchievements(); Q.save();
      Q.sfx('done'); Q.confetti();
      ov.innerHTML = `<div class="finish">${Q.mascot(pct >= 60 ? 'wow' : 'happy', 140)}<h1>Konuşma tamamlandı!</h1><div class="cards"><div class="fcard" style="--c:var(--gold)"><b>XP</b><div>⚡ ${xp}</div></div><div class="fcard" style="--c:var(--ok)"><b>Uyum</b><div>🎯 %${pct}</div></div></div>
        <p class="soft">İpucu: Örnek cevapları sesli tekrar et. Gerçek bir konuşmada aynı kalıplar ağzından kendiliğinden çıkar.</p>${ext ? `<p class="soft">🔥 Serin ${S.streak} gün oldu!</p>` : ''}<button class="btn block" data-p="close">Devam</button></div>`;
    }
    ov.onclick = e => {
      const s = e.target.closest('[data-say]'); if (s) return Q.speak(s.dataset.say);
      const b = e.target.closest('[data-p]'); if (!b) return;
      const k = b.dataset.p;
      if (k === 'x' || k === 'close') { if (rec) try { rec.abort(); } catch (er) { } return closeOv(); }
      if (k === 'tr') { const last = chat.querySelectorAll('.str-tr'); if (last.length) last[last.length - 1].hidden = false; return; }
      if (k === 'mic') return mic(b);
      if (k === 'send') return send(false);
      if (k === 'show') return send(true);
      if (k === 'next') { ti++; if (ti < sc.turns.length) turn(); else finish(); }
    };
    turn();
  }

  window.Extra = { render, click };
})();
