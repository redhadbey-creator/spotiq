/* ASİ Dil — ASİ Dil'e özel oyunlar: günün bulmacası, farkı bul, hız turları, kelime kartları */
(function () {
  'use strict';
  const { $, $$, esc, rng, rand, pick, shuffle, sample, ALL_WORDS } = Q;
  let timers = [];
  let keyH = null;

  function open(title, hud, body) {
    const ov = $('#overlay'); ov.hidden = false; ov.onclick = null; document.body.style.overflow = 'hidden';
    ov.innerHTML = `<div class="les-top"><button class="x" data-g="x" aria-label="Kapat">✕</button><b style="flex:1">${title}</b><div class="game-hud" id="hud">${hud || ''}</div></div><div class="game-wrap" id="gw">${body || ''}</div>`;
    ov.querySelector('[data-g=x]').onclick = () => close();
  }
  function close(silent) {
    timers.forEach(clearInterval); timers = [];
    if (keyH) { document.removeEventListener('keydown', keyH); keyH = null; }
    const ov = $('#overlay'); ov.hidden = true; ov.innerHTML = ''; ov.onclick = null; document.body.style.overflow = '';
    if (!silent) { App.render(); Q.flushNotices(); }
  }
  function onKeys(fn) { if (keyH) document.removeEventListener('keydown', keyH); keyH = fn; document.addEventListener('keydown', fn); }
  function learnedWords() { const w = Object.keys(Q.S.words).map(id => Q.wordById[id]).filter(Boolean); return w.length >= 8 ? w : ALL_WORDS.slice(0, Math.max(12, w.length)); }
  function endScreen(icon, title, lines, onAgain) {
    const gw = $('#gw');
    Q.sfx('done'); Q.confetti(50);
    gw.innerHTML = `<div class="finish">${icon}<h1>${title}</h1>${lines}<div style="display:flex;gap:10px;width:100%">${onAgain ? '<button class="btn ghost" style="flex:1" data-e="again">Tekrar oyna</button>' : ''}<button class="btn" style="flex:1" data-e="ok">Devam</button></div></div>`;
    gw.querySelector('[data-e=ok]').onclick = () => close();
    if (onAgain) gw.querySelector('[data-e=again]').onclick = onAgain;
  }

  /* ================= Günün Bulmacası ================= */
  const FRUITS = ['🍎', '🍌', '🍒', '🍇', '🍋', '🍓', '🥝', '🍑', '🍐', '🥥'];
  function genEquation(f) {
    const [A, B, Cc] = sample(FRUITS, 3, f);
    const a = 2 + rand(8, f), b = 2 + rand(6, f), c = 1 + rand(Math.max(1, b - 1), f);
    const ans = c + a * b;
    const opts = shuffle(Array.from(new Set([ans, (c + a) * b, ans + a, ans - b, a + b + c, ans + 1].filter(x => x > 0))).slice(0, 4), f);
    if (!opts.includes(ans)) opts[0] = ans;
    return {
      kind: 'Görsel Matematik', q: 'Meyvelerin değerini bul, son satırı çöz!',
      html: `<div class="eq"><div>${A} + ${A} + ${A} = ${3 * a}</div><div>${A} + ${B} + ${B} = ${a + 2 * b}</div><div>${B} − ${Cc} = ${b - c}</div><div style="color:var(--brand)">${Cc} + ${A} × ${B} = ?</div></div>`,
      opts: shuffle(opts, f).map(String), ans: String(ans),
      why: `${A} = ${a}, ${B} = ${b}, ${Cc} = ${c}. Önce çarpma: ${a} × ${b} = ${a * b}, sonra ${c} + ${a * b} = ${ans}.`
    };
  }
  function genSequence(f) {
    const t = rand(5, f); let seq, nxt, rule;
    const s = 1 + rand(9, f), d = 2 + rand(7, f);
    if (t === 0) { seq = [0, 1, 2, 3, 4].map(i => s + d * i); nxt = s + d * 5; rule = `Her adımda +${d}.`; }
    else if (t === 1) { const st = 1 + rand(4, f); seq = [0, 1, 2, 3, 4].map(i => st * Math.pow(2, i)); nxt = st * 32; rule = 'Her sayı bir öncekinin 2 katı.'; }
    else if (t === 2) { seq = [s]; for (let i = 1; i < 5; i++) seq.push(seq[i - 1] + i); nxt = seq[4] + 5; rule = 'Fark her adımda 1 artıyor: +1, +2, +3, +4, +5.'; }
    else if (t === 3) { const o = 1 + rand(4, f); seq = [0, 1, 2, 3, 4].map(i => (i + o) * (i + o)); nxt = (5 + o) * (5 + o); rule = 'Ardışık sayıların kareleri.'; }
    else { const x = 1 + rand(3, f), y = 2 + rand(3, f); seq = [x, y]; for (let i = 2; i < 6; i++) seq.push(seq[i - 1] + seq[i - 2]); nxt = seq[5]; seq = seq.slice(0, 5); rule = 'Her sayı önceki iki sayının toplamı.'; }
    const opts = shuffle(Array.from(new Set([nxt, nxt + 1, nxt - 2, nxt + d, nxt * 2 - seq[4]])).slice(0, 4), f);
    if (!opts.includes(nxt)) opts[0] = nxt;
    return { kind: 'Sayı Dizisi', q: 'Dizideki bir sonraki sayı hangisi?', html: `<div class="big-q">${seq.join(', ')}, ?</div>`, opts: shuffle(opts, f).map(String), ans: String(nxt), why: rule };
  }
  const CATS = { 'renk': ['red', 'blue', 'green', 'yellow', 'black', 'white'], 'yiyecek': ['apple', 'bread', 'cheese', 'egg', 'soup', 'fish', 'rice', 'cake'], 'aile': ['mother', 'father', 'sister', 'brother', 'baby'], 'ulaşım': ['car', 'bus', 'train', 'bike', 'plane'], 'hava': ['sun', 'rain', 'snow', 'wind'], 'mevsim': ['spring', 'summer', 'autumn', 'winter'], 'ev': ['door', 'window', 'bed', 'kitchen', 'room'] };
  function genOdd(f) {
    const keys = Object.keys(CATS); const [k1, k2] = sample(keys, 2, f);
    const same = sample(CATS[k1], 3, f), odd = pick(CATS[k2], f);
    const opts = shuffle(same.concat(odd), f);
    const tr = w => (Q.wordByEn[w] || {}).tr || w;
    return { kind: 'Farklı Olanı Bul', q: 'Hangi İngilizce kelime diğerlerinden farklı?', html: '<div class="big-q" style="font-size:3.4rem">🔎</div>', opts, ans: odd, why: `${same.map(w => w + ' (' + tr(w) + ')').join(', ')} → ${k1}. ${odd} (${tr(odd)}) ise ${k2}.` };
  }
  function genAnagram(f) {
    const pool = ALL_WORDS.filter(w => /^[a-z]{4,7}$/.test(w.en));
    const w = pick(pool, f);
    let mix = w.en; let guard = 0;
    while (mix === w.en && guard++ < 10) mix = shuffle(w.en.split(''), f).join('');
    const opts = shuffle([w.en].concat(sample(pool.filter(x => x.en.length === w.en.length && x.en !== w.en), 3, f).map(x => x.en)), f);
    while (opts.length < 4) { const x = pick(pool, f).en; if (!opts.includes(x)) opts.push(x); }
    return { kind: 'Harf Karışık', q: 'Harfleri düzenle: hangi kelime gizli?', html: `<div class="big-q" style="letter-spacing:.3em">${mix.toUpperCase()}</div><p class="muted" style="text-align:center">İpucu: ${w.em} ${esc(w.tr)}</p>`, opts: shuffle(opts, f), ans: w.en, why: `${w.en.toUpperCase()} = ${w.tr}` };
  }
  function dailySet(day) {
    const f = rng('pz' + day);
    return [genEquation(f), genSequence(f), f() < 0.5 ? genOdd(f) : genAnagram(f)];
  }
  function daily() {
    const S = Q.S, today = Q.dayKey();
    const set = dailySet(today);
    let i = 0, score = 0;
    const replay = S.puzzle.day === today && S.puzzle.solved;
    open('🧩 Günün Bulmacası', `<span class="pill" id="pzp">1 / 3</span>`);
    function q() {
      const p = set[i];
      $('#pzp').textContent = (i + 1) + ' / 3';
      const gw = $('#gw');
      gw.innerHTML = `<div class="new-word">${esc(p.kind)}</div><h2 style="font-size:1.4rem">${esc(p.q)}</h2>${p.html}
        <div class="choices">${p.opts.map((o, j) => `<button class="choice" data-j="${j}"><span class="kn">${j + 1}</span>${esc(o)}</button>`).join('')}</div><div id="why"></div>`;
      let answered = false;
      const choose = j => {
        if (answered) return; answered = true;
        const ok = p.opts[j] === p.ans;
        if (ok) { score++; Q.sfx('ok'); } else Q.sfx('bad');
        $$('#gw .choice').forEach((c, k) => { c.disabled = true; if (p.opts[k] === p.ans) c.classList.add('right'); else if (k === j) c.classList.add('wrong'); });
        $('#why').innerHTML = `<div class="box" style="margin-top:16px"><b>${ok ? '✔️ Doğru!' : '✖️ Çözüm'}</b><p class="soft">${esc(p.why)}</p></div><button class="btn block" style="margin-top:14px" id="pzn">${i < 2 ? 'Sonraki' : 'Bitir'}</button>`;
        $('#pzn').onclick = () => { i++; if (i < 3) q(); else end(); };
        $('#pzn').focus();
      };
      gw.onclick = e => { const b = e.target.closest('.choice'); if (b) choose(+b.dataset.j); };
      onKeys(e => { if (/^[1-4]$/.test(e.key)) choose(+e.key - 1); });
    }
    function end() {
      let lines = `<p class="soft">${score} / 3 doğru</p>`;
      if (!replay) {
        const gems = 5 + score * 5;
        S.gems += gems; const xp = Q.addXP(5 + score * 5);
        const y = Q.addDays(today, -1);
        S.puzzle.streak = S.puzzle.lastSolved === y ? S.puzzle.streak + 1 : 1;
        S.puzzle.lastSolved = today; S.puzzle.day = today; S.puzzle.solved = true; S.puzzle.score = score;
        S.stats.puzzles++; Q.bump('puzzle'); Q.checkAchievements(); Q.save();
        lines += `<div class="cards"><div class="fcard" style="--c:var(--gold)"><b>XP</b><div>⚡ ${xp}</div></div><div class="fcard" style="--c:var(--plum)"><b>Mücevher</b><div>💎 ${gems}</div></div><div class="fcard" style="--c:var(--brand)"><b>Bulmaca serisi</b><div>🧩 ${S.puzzle.streak}</div></div></div><p class="soft">Yarın yeni bulmaca seni bekliyor!</p>`;
      } else lines += '<p class="soft">Bugünün ödülünü zaten aldın. Yarın yeni bulmaca!</p>';
      endScreen(Q.mascot(score === 3 ? 'wow' : 'happy', 140), score === 3 ? 'Bulmaca dedektifi!' : 'Bulmaca bitti!', lines);
    }
    q();
  }

  /* ================= Farkı Bul ================= */
  const OBJ_EMOJI = ['🌳', '🌲', '🏠', '🚗', '🐶', '🐱', '🌻', '🎈', '⚽', '🍄', '🐦', '🦋', '🚲', '⛺', '🪁', '🐞', '🌷', '🐌', '🍎', '🎁'];
  const SWAP = { '🌳': '🌲', '🌲': '🌳', '🏠': '🏡', '🚗': '🚙', '🐶': '🐕', '🐱': '🐈', '🌻': '🌼', '🎈': '🪁', '⚽': '🏀', '🍄': '🌰', '🐦': '🐤', '🦋': '🐝', '🚲': '🛴', '⛺': '🏕️', '🪁': '🎈', '🐞': '🐜', '🌷': '🌹', '🐌': '🐢', '🍎': '🍏', '🎁': '📦' };
  const SHAPE_COL = ['#e0482f', '#f2a516', '#119c84', '#7b4bc4', '#2d5b88', '#f27d4a'];
  function makeScene(level, f) {
    const cols = 5, rows = 4, cw = 80, rh = 52;
    const cells = shuffle(Array.from({ length: cols * rows }, (_, i) => i), f).slice(0, Math.min(18, 11 + level));
    const objs = cells.map((c, i) => {
      const cx = (c % cols) * cw + cw / 2 + (f() * 24 - 12), cy = 92 + Math.floor(c / cols) * rh + (f() * 14 - 7);
      if (f() < 0.3) return { k: 'shape', s: pick(['c', 'r', 't'], f), x: cx, y: cy, col: pick(SHAPE_COL, f), sz: 14 + f() * 8 };
      return { k: 'em', e: pick(OBJ_EMOJI, f), x: cx, y: cy, sz: 26 + f() * 12 };
    });
    const n = Math.min(7, 5 + Math.floor(level / 2));
    const idx = shuffle(objs.map((_, i) => i), f).slice(0, n);
    const right = objs.map(o => Object.assign({}, o));
    const diffs = idx.map(i => {
      const o = right[i]; let kinds = ['miss', 'size'];
      if (o.k === 'em' && SWAP[o.e]) kinds.push('swap', 'swap');
      if (o.k === 'shape') kinds.push('color', 'color');
      const k = pick(kinds, f);
      if (k === 'miss') o.hide = true;
      if (k === 'size') o.sz = o.sz * (f() < .5 ? 0.6 : 1.45);
      if (k === 'swap') o.e = SWAP[o.e];
      if (k === 'color') o.col = pick(SHAPE_COL.filter(c => c !== o.col), f);
      return { x: o.x, y: o.y, r: Math.max(26, objs[i].sz * 0.95), found: false };
    });
    // Gökyüzündeki ek fark: güneş/bulut
    const extra = f() < 0.5;
    return { left: objs, right, diffs, sky: { cloud: extra } };
  }
  function drawObj(o) {
    if (o.hide) return '';
    if (o.k === 'em') return `<text x="${o.x}" y="${o.y}" font-size="${o.sz}" text-anchor="middle" dominant-baseline="central">${o.e}</text>`;
    const s = o.sz;
    if (o.s === 'c') return `<circle cx="${o.x}" cy="${o.y}" r="${s / 1.3}" fill="${o.col}"/>`;
    if (o.s === 'r') return `<rect x="${o.x - s / 1.3}" y="${o.y - s / 1.3}" width="${s * 1.54}" height="${s * 1.54}" rx="4" fill="${o.col}"/>`;
    return `<polygon points="${o.x},${o.y - s} ${o.x - s},${o.y + s * .8} ${o.x + s},${o.y + s * .8}" fill="${o.col}"/>`;
  }
  function sceneSVG(objs, id) {
    return `<svg id="${id}" viewBox="0 0 400 300" role="img" aria-label="Bulmaca resmi">
      <defs><linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3ff"/><stop offset="1" stop-color="#eef8ff"/></linearGradient></defs>
      <rect width="400" height="300" fill="url(#sk${id})"/><circle cx="350" cy="38" r="22" fill="#ffd34d"/>
      <path d="M40 40 q10-16 26-8 q14-12 28 2 q14 0 12 12 h-70 q-6-6 4-6z" fill="#fff" opacity=".9"/>
      <rect y="70" width="400" height="230" fill="#bfe6a8"/><path d="M0 70 Q100 52 200 70 T400 70 V82 H0Z" fill="#a8db8c"/>
      ${objs.map(drawObj).join('')}<g class="marks"></g></svg>`;
  }
  function spotDiff() {
    const S = Q.S;
    let level = 1, total = 0;
    function round() {
      const f = rng(Date.now() + ':' + level);
      const sc = makeScene(level, f);
      let left = 90, found = 0;
      open('👁️ Farkı Bul', `<span class="pill">Sv. ${level}</span><span class="pill" id="dfc">0 / ${sc.diffs.length}</span><span class="pill" id="dft">⏱️ 90</span>`,
        `<div class="timer"><i id="dtb" style="width:100%"></i></div><p class="soft" style="text-align:center">İki resim arasındaki <b>${sc.diffs.length} farkı</b> bul. Resimlerden birine dokun!</p>
        <div class="diff-boards">${sceneSVG(sc.left, 'dA')}${sceneSVG(sc.right, 'dB')}</div>
        <div style="display:flex;gap:10px;justify-content:center"><button class="btn ghost sm" id="dhint">💡 İpucu · 💎 10</button></div>`);
      const svgs = [$('#dA'), $('#dB')];
      const mark = (d, cls) => svgs.forEach(s => s.querySelector('.marks').insertAdjacentHTML('beforeend', `<circle cx="${d.x}" cy="${d.y}" r="${d.r}" fill="none" stroke="${cls === 'hint' ? '#7c5ce0' : '#2f6fde'}" stroke-width="4" ${cls === 'hint' ? 'stroke-dasharray="6 6"' : ''}/>`));
      svgs.forEach(svg => svg.addEventListener('click', e => {
        const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        const p = pt.matrixTransform(svg.getScreenCTM().inverse());
        const d = sc.diffs.find(d => !d.found && Math.hypot(d.x - p.x, d.y - p.y) <= d.r + 6);
        if (d) {
          d.found = true; found++; total++; Q.sfx('ok'); mark(d);
          $('#dfc').textContent = found + ' / ' + sc.diffs.length;
          if (found === sc.diffs.length) win();
        } else {
          Q.sfx('bad'); left = Math.max(0, left - 5); svg.classList.add('miss', 'shake');
          setTimeout(() => svg.classList.remove('miss', 'shake'), 400);
        }
      }));
      $('#dhint').onclick = () => {
        if (S.gems < 10) return Q.toast('Yeterli mücevherin yok');
        const d = sc.diffs.find(d => !d.found); if (!d) return;
        S.gems -= 10; Q.save(); Q.sfx('coin'); mark(d, 'hint');
      };
      const t = setInterval(() => {
        left--; const el = $('#dft'); if (!el) return clearInterval(t);
        el.textContent = '⏱️ ' + left; $('#dtb').style.width = (left / 90 * 100) + '%';
        if (left <= 0) { clearInterval(t); lose(); }
      }, 1000);
      timers.push(t);
      function win() {
        clearInterval(t);
        const bonus = Math.ceil(left / 10);
        setTimeout(() => {
          endScreen(Q.mascot('wow', 130), 'Hepsini buldun!', `<p class="soft">Seviye ${level} tamamlandı · süre bonusu +${bonus} XP</p>`, null);
          const xp = Q.addXP(found * 2 + bonus);
          S.stats.diffs += found; S.stats.diffBest = Math.max(S.stats.diffBest, level); S.stats.games++; Q.bump('game'); Q.checkAchievements(); Q.save();
          $('#gw .finish p').insertAdjacentHTML('afterend', `<div class="cards"><div class="fcard" style="--c:var(--gold)"><b>XP</b><div>⚡ ${xp}</div></div><div class="fcard" style="--c:var(--brand)"><b>Bulunan</b><div>👁️ ${total}</div></div></div>`);
          const ok = $('#gw [data-e=ok]'); ok.textContent = 'Sonraki seviye'; ok.onclick = () => { level++; round(); };
          ok.insertAdjacentHTML('beforebegin', '<button class="btn ghost" style="flex:1" data-e="stop">Bitir</button>');
          $('#gw [data-e=stop]').onclick = () => close();
        }, 500);
      }
      function lose() {
        sc.diffs.filter(d => !d.found).forEach(d => mark(d, 'hint'));
        const xp = found ? Q.addXP(found * 2) : 0;
        S.stats.diffs += found; S.stats.games++; Q.bump('game'); Q.checkAchievements(); Q.save();
        setTimeout(() => endScreen(Q.mascot('sad', 130), 'Süre doldu!', `<p class="soft">${found} / ${sc.diffs.length} fark buldun${xp ? ' · +' + xp + ' XP' : ''}. Kaçırdıkların mor halkayla gösterildi.</p>`, () => { round(); }), 1600);
      }
    }
    round();
  }

  /* ================= Hız turları (matematik & kelime) ================= */
  function speedGame(kind) {
    const S = Q.S, DUR = 60;
    const isMath = kind === 'math';
    const words = isMath ? null : learnedWords();
    let score = 0, left = DUR, combo = 0, cur;
    open(isMath ? '🧮 Hızlı Matematik' : '⚡ Kelime Hız Turu', `<span class="pill" id="sc">⭐ 0</span><span class="pill" id="tm">⏱️ ${DUR}</span>`);
    const gw = $('#gw');
    gw.innerHTML = `<div class="finish">${Q.mascot('think', 130)}<h1 style="color:var(--ink)">${isMath ? 'Hızlı Matematik' : 'Kelime Hız Turu'}</h1>
      <p class="soft">${isMath ? '60 saniyede olabildiğince çok işlemi çöz. Yanlış cevap 3 saniye götürür.' : '60 saniyede İngilizce kelimelerin Türkçesini bul. Üst üste doğrular puanı katlar!'}</p>
      <p><b>En iyi skorun: ${isMath ? S.stats.mathBest : S.stats.rushBest}</b></p><button class="btn block" id="go">Başla</button></div>`;
    $('#go').onclick = begin; $('#go').focus();
    function gen() {
      if (isMath) {
        const lvl = Math.min(4, Math.floor(score / 5));
        const op = pick(lvl < 1 ? ['+', '−'] : ['+', '−', '×', lvl > 2 ? '÷' : '×']);
        let a, b, ans;
        const M = [10, 20, 50, 100, 200][lvl];
        if (op === '+') { a = 1 + rand(M); b = 1 + rand(M); ans = a + b; }
        else if (op === '−') { a = 1 + rand(M); b = 1 + rand(a); ans = a - b; }
        else if (op === '×') { a = 2 + rand(lvl > 2 ? 12 : 9); b = 2 + rand(9); ans = a * b; }
        else { b = 2 + rand(9); ans = 2 + rand(11); a = b * ans; }
        const opts = new Set([ans]); while (opts.size < 4) { const d = ans + (rand(2) ? 1 : -1) * (1 + rand(op === '×' ? 10 : 5)); if (d >= 0) opts.add(d); }
        return { q: `${a} ${op} ${b}`, opts: shuffle([...opts]).map(String), ans: String(ans) };
      }
      const w = pick(words);
      const opts = shuffle([w].concat(sample(words.filter(x => x.id !== w.id && x.tr !== w.tr), 3)));
      return { q: `${w.em} ${w.en}`, opts: opts.map(x => x.tr), ans: w.tr, en: w.en };
    }
    function show() {
      cur = gen();
      gw.innerHTML = `<div class="timer"><i id="tb" style="width:${left / DUR * 100}%"></i></div><div class="big-q">${esc(cur.q)}</div>
        <div class="choices">${cur.opts.map((o, j) => `<button class="choice" data-j="${j}"><span class="kn">${j + 1}</span>${esc(o)}</button>`).join('')}</div>
        <p class="muted" style="text-align:center;margin-top:12px">${combo >= 3 ? '🔥 ' + combo + ' üst üste · x' + mult() : '&nbsp;'}</p>`;
      if (!isMath) Q.speak(cur.en);
    }
    const mult = () => isMath ? 1 : (combo >= 10 ? 3 : combo >= 5 ? 2 : 1);
    function answer(j) {
      if (left <= 0 || !cur) return;
      const ok = cur.opts[j] === cur.ans;
      if (ok) { combo++; score += mult(); Q.sfx('pop'); }
      else { combo = 0; Q.sfx('bad'); if (isMath) left = Math.max(0, left - 3); }
      $('#sc').textContent = '⭐ ' + score;
      show();
    }
    function begin() {
      show();
      gw.onclick = e => { const b = e.target.closest('.choice'); if (b) answer(+b.dataset.j); };
      onKeys(e => { if (/^[1-4]$/.test(e.key)) answer(+e.key - 1); });
      const t = setInterval(() => {
        left--; const el = $('#tm'); if (!el) return clearInterval(t);
        el.textContent = '⏱️ ' + Math.max(0, left); const tb = $('#tb'); if (tb) tb.style.width = (left / DUR * 100) + '%';
        if (left <= 0) { clearInterval(t); finish(); }
      }, 1000);
      timers.push(t);
    }
    function finish() {
      gw.onclick = null;
      const key = isMath ? 'mathBest' : 'rushBest';
      const rec = score > S.stats[key];
      if (rec) S.stats[key] = score;
      const xp = score ? Q.addXP(Math.min(20, Math.max(2, Math.round(score * 0.7)))) : 0;
      S.stats.games++; Q.bump('game'); Q.checkAchievements(); Q.save();
      endScreen(Q.mascot(rec ? 'wow' : 'happy', 130), rec ? 'Yeni rekor!' : 'Süre bitti!',
        `<div class="cards"><div class="fcard" style="--c:var(--brand)"><b>Skor</b><div>⭐ ${score}</div></div><div class="fcard" style="--c:var(--gold)"><b>XP</b><div>⚡ ${xp}</div></div><div class="fcard" style="--c:var(--navy)"><b>En iyi</b><div>🏅 ${S.stats[key]}</div></div></div>`,
        () => speedGame(kind));
    }
  }

  /* ================= Kelime Kartları (aralıklı tekrar) ================= */
  const BOX_DAYS = [0, 1, 3, 7, 14, 30];
  function dueWords() { const t = Q.dayKey(); return Object.entries(Q.S.words).filter(([, r]) => r.due <= t).map(([id]) => Q.wordById[id]).filter(Boolean); }
  function cards() {
    const S = Q.S;
    let deck = shuffle(dueWords()).slice(0, 15);
    if (!deck.length) {
      const all = Object.keys(S.words).map(id => Q.wordById[id]).filter(Boolean);
      if (!all.length) { Q.toast('Önce birkaç ders tamamla, kelimelerin burada birikecek.'); return; }
      deck = shuffle(all).slice(0, 10);
    }
    let i = 0, known = 0, studied = 0;
    open('🃏 Kelime Kartları', `<span class="pill" id="cc">1 / ${deck.length}</span>`);
    function show() {
      const w = deck[i];
      $('#cc').textContent = Math.min(i + 1, deck.length) + ' / ' + deck.length;
      $('#gw').innerHTML = `<p class="soft" style="text-align:center">Karta dokun, anlamını gör. Sonra kendine dürüst ol 😉</p>
        <div class="flash" id="fc" tabindex="0"><div class="fl"><div class="face"><span class="em">${w.em}</span><b>${esc(w.en)}</b><span class="small muted">çevirmek için dokun</span></div><div class="face back"><span class="em">${w.em}</span><b>${esc(w.tr)}</b><span class="small muted">${esc(w.en)}</span></div></div></div>
        <div style="display:flex;gap:10px" id="cb" hidden><button class="btn bad" style="flex:1" data-c="0">Bilmiyordum</button><button class="btn gold" style="flex:1" data-c="1">Zordu</button><button class="btn ok" style="flex:1" data-c="2">Biliyordum</button></div>`;
      const fc = $('#fc');
      const flip = () => { fc.classList.add('flip'); $('#cb').hidden = false; };
      fc.onclick = flip;
      Q.speak(w.en);
      $('#cb').onclick = e => { const b = e.target.closest('[data-c]'); if (b) rate(+b.dataset.c); };
      onKeys(e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } else if (/^[1-3]$/.test(e.key) && !$('#cb').hidden) rate(+e.key - 1); });
    }
    function rate(c) {
      const w = deck[i], r = S.words[w.id];
      if (r) {
        r.seen++;
        if (c === 0) { r.box = 0; deck.push(w); }
        else { r.box = Math.min(5, r.box + (c === 2 ? 1 : 0)); if (c === 2) { r.ok++; known++; } }
        r.due = Q.addDays(Q.dayKey(), c === 0 ? 0 : BOX_DAYS[Math.max(1, r.box)]);
      }
      studied++; S.stats.cards++; Q.bump('cards'); Q.sfx(c === 0 ? 'tap' : 'pop'); Q.save();
      i++;
      if (i >= deck.length || studied >= 25) end(); else show();
    }
    function end() {
      const xp = studied >= 5 ? Q.addXP(5) : 0; Q.save();
      endScreen(Q.mascot('happy', 130), 'Kartlar bitti!', `<p class="soft">${studied} kart çalıştın, ${known} tanesini biliyordun.${xp ? ' +' + xp + ' XP' : ''}</p>`, null);
    }
    show();
  }

  /* ================= Kelime listem ================= */
  function wordList() {
    const S = Q.S;
    const ids = Object.keys(S.words);
    const list = ids.map(id => Q.wordById[id]).filter(Boolean);
    open('📚 Kelimelerim', `<span class="pill">${list.length} kelime</span>`);
    $('#gw').innerHTML = list.length ? `<div class="box wordlist">${list.map(w => {
      const b = S.words[w.id].box;
      return `<div class="wl"><span class="em">${w.em}</span><div class="w"><b>${esc(w.en)}</b><small>${esc(w.tr)}</small></div><div class="str" title="Güç">${[1, 2, 3, 4, 5].map(k => `<i class="${b >= k ? 'on' : ''}"></i>`).join('')}</div>${Q.ttsOK ? `<button class="play" style="width:38px;height:38px;font-size:1rem" data-say="${esc(w.en)}" aria-label="Dinle">🔊</button>` : ''}</div>`;
    }).join('')}</div>` : `<div class="finish">${Q.mascot('think', 120)}<p class="soft">Henüz kelime öğrenmedin. İlk dersini tamamla!</p></div>`;
    $('#gw').onclick = e => { const b = e.target.closest('[data-say]'); if (b) Q.speak(b.dataset.say); };
  }

  window.Games = { daily, spotDiff, speedGame, cards, wordList, dueWords, close };
})();
