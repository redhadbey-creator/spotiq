/* SPOTIQ Dil — ana uygulama: menü, ekranlar, karşılama */
(function () {
  'use strict';
  const { $, $$, esc, NODES, C, UNIT_COLORS } = Q;
  let S = Q.load();
  let view = 'learn';
  let openNode = null;

  const NAV = [
    { id: 'learn', ic: '🏠', t: 'Öğren' },
    { id: 'practice', ic: '🏋️', t: 'Pratik' },
    { id: 'puzzles', ic: '🧩', t: 'Bulmaca' },
    { id: 'league', ic: '🏆', t: 'Lig' },
    { id: 'quests', ic: '🎯', t: 'Görevler' },
    { id: 'shop', ic: '🛍️', t: 'Mağaza' },
    { id: 'profile', ic: '👤', t: 'Profil' }
  ];

  function applyTheme() {
    const t = S.settings.theme;
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }

  /* ---------- Üst bilgi ---------- */
  function statsHTML() {
    const fire = Q.streakActiveToday();
    const hearts = Q.heartsUnlimited() ? '∞' : S.hearts;
    const lvl = C.sections[Q.currentSection()];
    return `<button class="chip flag" data-go="learn" title="${esc(C.name)} · ${lvl.id}">${C.flag}<small class="lvl">${lvl.id}</small></button>
      <button class="chip fire ${fire ? '' : 'cold'}" data-pop="streak" title="Seri">🔥 ${S.streak}</button>
      <button class="chip gem" data-go="shop" title="Mücevher">💎 ${S.gems}</button>
      <button class="chip heart" data-pop="hearts" title="Can">💙 ${hearts}</button>`;
  }
  function renderNav() {
    const ready = Q.questsReady();
    $('#nav').innerHTML = `<a class="logo" href="../" title="SPOTIQ Uygulamalar">${Q.mascot('happy', 40)}<span>spotiq<small>DİL</small></span></a>` +
      NAV.map(n => `<button class="nav-btn ${view === n.id ? 'on' : ''}" data-go="${n.id}" aria-label="${n.t}"><span class="ic">${n.ic}</span><span>${n.t}</span>${n.id === 'quests' && ready ? '<i class="dot"></i>' : ''}</button>`).join('');
    $('#topbar').innerHTML = `<div class="stats-row" style="width:100%">${statsHTML()}</div>`;
  }
  function goalRing(size = 64) {
    const p = Math.min(1, Q.todayXP() / S.dailyGoal), r = size / 2 - 6, c = 2 * Math.PI * r;
    return `<div class="goal-ring" style="width:${size}px;height:${size}px"><svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke="var(--line)" stroke-width="8" fill="none"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke="var(--gold)" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p)}"/></svg><span>${p >= 1 ? '✅' : '⚡'}</span></div>`;
  }
  function questsHTML(limit) {
    return S.quests.items.slice(0, limit || 9).map((it, i) => {
      const q = Q.questInfo(it), pct = Math.min(100, it.p / it.n * 100);
      const right = it.claimed ? '<span class="chest">✅</span>' : it.p >= it.n ? `<button class="btn gold sm" data-claim="${i}">Al · ${it.r}💎</button>` : '<span class="chest">🎁</span>';
      return `<div class="quest"><span class="qi">${q.ic}</span><div class="qb"><b>${esc(q.t)}</b><div class="bar"><i style="width:${pct}%"></i><span>${Math.min(it.p, it.n)} / ${it.n}</span></div></div>${right}</div>`;
    }).join('');
  }
  function renderRail() {
    const rows = Q.leagueBoard(), me = rows.findIndex(r => r.me) + 1, tier = Q.TIERS[S.league.tier];
    const dbl = S.doubleUntil > Date.now();
    $('#rail').innerHTML = `<div class="stats-row">${statsHTML()}</div>
      ${dbl ? `<div class="box" style="border-color:var(--gold)"><b>⚡ Çift XP aktif</b><p class="soft small">${Q.fmtTime(S.doubleUntil - Date.now())} kaldı</p></div>` : ''}
      <div class="box"><h3>Seviye yolculuğun <a data-go="learn">Yol</a></h3><div class="journey sm">${C.sections.map((sec, si) => `<span class="${S.cert[sec.id] ? 'done' : si === Q.currentSection() ? 'cur' : ''}">${sec.id}</span>`).join('<i></i>')}</div><p class="soft small">${Object.keys(S.words).length} / ${Q.ALL_WORDS.length} kelime öğrenildi</p><div class="bar ok" style="margin-top:6px"><i style="width:${Object.keys(S.words).length / Q.ALL_WORDS.length * 100}%"></i></div></div>
      <div class="box"><h3>${tier.i} ${tier.n} Ligi <a data-go="league">Ligi gör</a></h3><p class="soft">${S.league.xp ? `Bu hafta <b>${me}.</b> sıradasın · ${S.league.xp} XP` : 'Bu hafta yarışmaya katılmak için bir ders bitir!'}</p></div>
      <div class="box"><h3>Günlük hedef <a data-pop="goal">Düzenle</a></h3><div style="display:flex;gap:14px;align-items:center">${goalRing()}<div style="flex:1"><b>${Math.min(Q.todayXP(), S.dailyGoal)} / ${S.dailyGoal} XP</b><div class="bar" style="margin-top:8px"><i style="width:${Math.min(100, Q.todayXP() / S.dailyGoal * 100)}%"></i></div></div></div></div>
      <div class="box"><h3>Günlük görevler <a data-go="quests">Tümü</a></h3>${questsHTML(3)}</div>
      <div class="box" style="background:var(--brand-l);border-color:var(--brand)"><h3>🧩 Günün bulmacası</h3><p class="soft small" style="margin-bottom:10px">${S.puzzle.day === Q.dayKey() && S.puzzle.solved ? 'Bugünkünü çözdün! Yarın yenisi gelecek.' : 'SPOTIQ\'e özel 3 soruluk günlük beyin turu. Ödül: 💎 + XP'}</p><button class="btn sm block" data-game="daily">${S.puzzle.day === Q.dayKey() && S.puzzle.solved ? 'Tekrar çöz' : 'Hemen çöz'}</button></div>
      <p class="footer-note"><a href="../">← SPOTIQ Uygulamalar</a> · <a href="../../gizlilik.html">Gizlilik</a></p>`;
  }

  /* ---------- Öğren (yol) ---------- */
  const OFFS = [0, 52, 78, 52, 0, -52, -78, -52];
  const NODE_ICON = { chest: '🎁', story: '📖', vocab: '🔤', test: '🏆' };
  let expanded = null;
  function nodeState(n, i, ci) { if (Q.nodeDone(n)) return 'done'; if (i === ci) return 'current'; return i < ci ? 'done' : 'locked'; }
  function sectionPct(si) { const ns = NODES.filter(n => n.section === si); return Math.round(ns.filter(Q.nodeDone).length / ns.length * 100); }
  function sectionCard(sec, si, cs) {
    const pct = sectionPct(si), done = !!S.cert[sec.id];
    const ahead = si > cs;
    const open = si === cs ? expanded !== -1 - si : expanded === si;
    const words = Q.ALL_WORDS.filter(w => C.units[w.unit].section === si).length;
    return `<div class="sec-card ${done ? 'done' : ''} ${ahead ? 'ahead' : ''}">
      <div class="sec-top"><span class="sec-ic">${sec.icon}</span><div style="flex:1;min-width:0"><span class="cefr">${sec.id}</span><h2>${esc(sec.name)}</h2><p>${esc(sec.desc)}</p><p class="small muted">${sec.units.length} ünite · ${words} kelime ve ifade</p></div></div>
      <div class="bar ok" style="margin:12px 0"><i style="width:${pct}%"></i></div>
      <div class="sec-btns">${done ? `<button class="btn ok sm" data-cert="${sec.id}">🎓 Sertifikayı gör</button>` : ''}
        ${!ahead ? `<button class="btn ghost sm" data-expand="${si}">${open ? 'Üniteleri gizle' : (done ? 'Üniteleri göster' : 'Üniteleri göster')}</button>` : ''}
        ${ahead && !done ? `<button class="btn sm" data-jump="${si}">⏩ ${sec.id}'e atla</button>` : ''}</div></div>`;
  }
  function renderLearn() {
    const ci = Q.currentIndex(), cs = Q.currentSection();
    let html = '';
    if (S.lostStreak && S.lostStreak.value > 1) html += `<div class="daily-hero" style="background:linear-gradient(135deg,#4a5878,#26324d)"><div style="font-size:3rem">💔</div><div><h2>${S.lostStreak.value} günlük serin bitti</h2><p>Bugün onarırsan kaldığın yerden devam edersin.</p><button class="btn sm" data-act="repair">Seriyi onar · 💎 400</button></div></div>`;
    if (S.leagueResult) html += leagueResultBanner();
    html += `<div class="journey">${C.sections.map((sec, si) => `<span class="${S.cert[sec.id] ? 'done' : si === cs ? 'cur' : ''}">${sec.id}</span>`).join('<i></i>')}</div>`;
    C.sections.forEach((sec, si) => {
      const open = si === cs ? expanded !== -1 - si : expanded === si;
      html += sectionCard(sec, si, cs);
      if (!open) return;
      sec.units.forEach((ui, uIdx) => html += unitHTML(ui, ci));
      if (si < C.sections.length - 1) html += `<div class="unit-gap">Sıradaki seviye: ${esc(C.sections[si + 1].id)} · ${esc(C.sections[si + 1].name)}</div>`;
    });
    html += `<p class="footer-note">Seviyeler Avrupa Ortak Dil Çerçevesi'ne (CEFR) göre düzenlendi.</p>`;
    return html;
  }
  function unitHTML(ui, ci) {
    const u = C.units[ui], col = UNIT_COLORS[u.color];
    const unitNodes = NODES.map((n, i) => ({ n, i })).filter(x => x.n.unit === ui);
    let html = `<section class="unit" style="--uc:${col[0]};--ucd:${col[1]}"><div class="unit-head c-${u.color}"><div><p>${esc(u.cefr)} · ÜNİTE ${ui + 1}</p><h2>${esc(u.title)}</h2><p>${esc(u.desc)}</p></div><button class="btn sm" data-guide="${ui}">📖 Rehber</button></div><div class="path">`;
    unitNodes.forEach(({ n, i }, k) => {
      const s = nodeState(n, i, ci);
      const off = OFFS[k % OFFS.length];
      const lv = S.progress[n.id] || 0;
      const special = n.type === 'chest' || n.type === 'test';
      let inner = n.type === 'chest' ? (s === 'done' ? '📭' : '🎁') : n.type === 'lesson' ? (s === 'done' ? '⭐' : n.icon) : NODE_ICON[n.type];
      let ring = '';
      if (n.type === 'lesson' && s === 'current' && lv > 0) {
        const r = 44, c = 2 * Math.PI * r;
        ring = `<svg class="ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="${r}" stroke="var(--line)"/><circle cx="50" cy="50" r="${r}" stroke="var(--uc)" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - lv / Q.LEVELS)}" transform="rotate(-90 50 50)"/></svg>`;
      }
      const cls = ['node', special ? n.type : '', n.type === 'story' || n.type === 'vocab' ? 'alt' : '', s === 'locked' ? 'locked' : '', s === 'done' && !special ? 'done' : ''].join(' ');
      html += `<div class="node-wrap ${openNode === i ? 'open' : ''}" style="transform:translateX(${off}px)">${s === 'current' ? `<div class="start-bubble">${lv ? 'DEVAM' : 'BAŞLA'}</div>` : ''}
        <button class="${cls}" data-node="${i}" aria-label="${esc(n.title || 'Sandık')}">${ring}${inner}</button>
        ${openNode === i ? popHTML(n, s) : ''}</div>`;
      if (k === 2) html += `<div style="position:relative;align-self:stretch;height:0"><div class="path-mascot" style="left:2%;top:-200px">${Q.mascot(ui % 2 ? 'wink' : 'happy', 110)}</div></div>`;
    });
    return html + '</div></section>';
  }
  function popHTML(n, s) {
    if (s === 'locked') return `<div class="pop locked"><h3>${esc(n.title || 'Sandık')}</h3><p>Bunu açmak için önceki tüm adımları tamamla!</p><button class="btn" disabled style="background:var(--lock);color:var(--muted)">Kilitli</button></div>`;
    if (n.type === 'chest') return `<div class="pop"><h3>Hazine sandığı</h3><p>${s === 'done' ? 'Bu sandığı zaten açtın.' : 'İçinde mücevherler ve sürprizler var!'}</p>${s === 'done' ? '' : '<button class="btn" data-act="chest">Aç</button>'}</div>`;
    if (n.type === 'test') return `<div class="pop"><h3>${esc(n.title)}</h3><p>${s === 'done' ? 'Testi geçtin! İstersen tekrar çöz.' : 'Ünitedeki her şeyi kanıtla. Canların bitmeden tamamla!'}</p><button class="btn" data-act="test">${s === 'done' ? 'Tekrar · +25 XP' : 'Teste başla · +25 XP'}</button></div>`;
    if (n.type === 'story') return `<div class="pop"><h3>📖 Hikâye: ${esc(n.title)}</h3><p>${s === 'done' ? 'Okudun! Tekrar okuyabilirsin.' : 'Deniz\'in Londra maceraları devam ediyor. Oku, dinle, soruları cevapla.'}</p><button class="btn" data-act="story">${s === 'done' ? 'Tekrar oku · +8 XP' : 'Oku · +15 XP'}</button></div>`;
    if (n.type === 'vocab') return `<div class="pop"><h3>${esc(n.title)}</h3><p>${s === 'done' ? 'Bu kelimeleri öğrendin. Tekrar etmek ister misin?' : 'Ünitenin ek kelimelerini eşleştirme ve seçme ile öğren.'}</p><button class="btn" data-act="vocab">${s === 'done' ? 'Tekrar · +10 XP' : 'Başla · +10 XP'}</button></div>`;
    const lv = S.progress[n.id] || 0;
    if (s === 'done') return `<div class="pop"><h3>${esc(n.title)}</h3><p>Tamamlandı! Tekrar ederek pekiştir.</p><div class="row"><button class="btn" data-act="review">Tekrar · +10 XP</button></div></div>`;
    return `<div class="pop"><h3>${esc(n.title)}</h3><p>Ders ${lv + 1} / ${Q.LEVELS}</p><button class="btn" data-act="lesson">Başla · +10 XP</button></div>`;
  }
  function guide(ui) {
    const u = C.units[ui];
    const words = Q.ALL_WORDS.filter(w => w.unit === ui && !w.extra);
    const extra = Q.ALL_WORDS.filter(w => w.unit === ui && w.extra);
    const sents = Q.ALL_SENTS.filter(s => s.unit === ui);
    const say = t => Q.ttsOK ? `<button class="play" style="width:36px;height:36px;font-size:1rem;flex:none" data-say="${esc(t)}" aria-label="Dinle">🔊</button>` : '';
    const wl = list => `<div class="wordlist">${list.map(w => `<div class="wl"><span class="em">${w.em || '•'}</span><div class="w"><b>${esc(w.en)}</b><small>${esc(w.tr)}</small></div>${say(w.en)}</div>`).join('')}</div>`;
    Q.modal(`<h2>📖 ${esc(u.title)}</h2><p>${esc(u.cefr)} · ${esc(u.desc)}</p>
      <div style="text-align:left">${(u.guide || []).map(g => `<div class="gtip"><h3>💡 ${esc(g.h)}</h3><p>${esc(g.p)}</p>${g.ex.map(e => `<div class="gex"><div><b>${esc(e[0])}</b><small>${esc(e[1])}</small></div>${say(e[0])}</div>`).join('')}</div>`).join('')}
      <h3 class="section-h" style="margin-top:6px">Ders kelimeleri (${words.length})</h3>${wl(words)}
      ${extra.length ? `<h3 class="section-h">Kelime paketi (${extra.length})</h3>${wl(extra)}` : ''}
      <h3 class="section-h">Örnek cümleler</h3><div class="wordlist">${sents.slice(0, 10).map(s => `<div class="wl"><div class="w"><b>${esc(s.en)}</b><small>${esc(s.tr)}</small></div>${say(s.en)}</div>`).join('')}</div></div>
      <button class="btn block" data-a="ok">Anladım</button>`, (m, c) => {
      m.onclick = e => { const b = e.target.closest('[data-say]'); if (b) Q.speak(b.dataset.say); };
      m.querySelector('[data-a=ok]').onclick = c;
    });
  }
  function certHTML(id) {
    const sec = C.sections.find(x => x.id === id);
    const d = S.cert[id] ? Q.parseDay(S.cert[id]).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    return `<div class="cert"><div class="cert-in"><div class="cert-logo">${Q.mascot('happy', 56)}<b>SPOTIQ Dil</b></div><p class="cert-k">BAŞARI SERTİFİKASI</p><h2>${esc(S.name || 'Öğrenci')}</h2><p>İngilizce <b>${sec.id} · ${esc(sec.name)}</b> seviyesinin tüm ünitelerini başarıyla tamamlamıştır.</p><div class="cert-big">${sec.id}</div><p class="small muted">${d}</p></div></div>`;
  }
  function showCert(id) {
    Q.modal(`${certHTML(id)}<button class="btn block" data-a="print">🖨️ Yazdır / PDF</button><button class="btn ghost block" data-a="ok">Kapat</button>`, (m, c) => {
      m.querySelector('[data-a=ok]').onclick = c;
      m.querySelector('[data-a=print]').onclick = () => { document.body.classList.add('printing'); window.print(); setTimeout(() => document.body.classList.remove('printing'), 500); };
    });
  }
  function jumpAsk(si) {
    const sec = C.sections[si];
    Q.modal(`<div class="em">${sec.icon}</div><h2>${sec.id} seviyesine atla</h2><p>${C.sections[si - 1].id} seviyesinden 15 soruluk bir testle ${sec.id} öncesindeki her şeyi bildiğini kanıtla. 3 hata hakkın var. Geçersen önceki seviyeler tamamlanmış sayılır ve sertifikaları açılır.</p>
      <button class="btn block" data-a="go">Teste başla</button><button class="btn ghost block" data-a="no">Vazgeç</button>`, (m, c) => {
      m.querySelector('[data-a=no]').onclick = c;
      m.querySelector('[data-a=go]').onclick = () => { c(); runJump(si - 1, si, false); };
    });
  }
  /* Bir bölümün testini çözer; geçerse o bölümü tamamlar. chain=true ise seviye tespitinde bir sonrakine sorar */
  function runJump(si, target, chain) {
    const sec = C.sections[si];
    Lesson.start({ mode: 'jump', section: si, onDone: () => {
      if (chain && si + 1 < C.sections.length - 1) {
        const nx = C.sections[si + 1];
        Q.modal(`<div class="em">🎉</div><h2>${sec.id} geçildi!</h2><p>Seviyen en az ${nx.id}. ${nx.id} testini de denemek ister misin?</p><button class="btn block" data-a="go">${nx.id} testine geç</button><button class="btn ghost block" data-a="no">Burada başlayayım</button>`, (m, c) => {
          m.querySelector('[data-a=no]').onclick = () => { c(); render(); };
          m.querySelector('[data-a=go]').onclick = () => { c(); runJump(si + 1, si + 2, true); };
        });
      }
    } });
  }
  function openChest(n) {
    const f = Q.rng(n.id + S.created);
    const gems = 20 + Math.floor(f() * 31);
    S.gems += gems; S.progress[n.id] = 1;
    let extra = '';
    if (f() < 0.4) { S.doubleUntil = Math.max(Date.now(), S.doubleUntil) + 15 * 60000; extra = '<p>⚡ Bonus: 15 dakika Çift XP!</p>'; }
    Q.save(); Q.sfx('coin'); Q.confetti(60);
    Q.modal(`<div class="em">🎁</div><h2>Sandık açıldı!</h2><p style="font-size:1.6rem;color:var(--plum);font-weight:900">+${gems} 💎</p>${extra}<button class="btn block" data-a="ok">Harika!</button>`, (m, c) => { m.querySelector('[data-a=ok]').onclick = () => { c(); openNode = null; render(); }; });
  }
  function leagueResultBanner() {
    const r = S.leagueResult, t = Q.TIERS[r.to];
    const txt = r.msg === 'up' ? `Tebrikler! ${r.rank}. oldun ve <b>${t.n}</b> ligine yükseldin!` : r.msg === 'down' ? `${r.rank}. oldun ve <b>${t.n}</b> ligine düştün. Bu hafta geri dön!` : `Geçen hafta ${r.rank}. oldun, <b>${t.n}</b> liginde kaldın.`;
    return `<div class="daily-hero" style="background:linear-gradient(135deg,var(--plum),#a48bff)"><div style="font-size:3rem">${t.i}</div><div><h2>Haftalık lig sonucu</h2><p>${txt}</p><button class="btn sm" data-act="lgok">Tamam</button></div></div>`;
  }
  /* ---------- Pratik ---------- */
  function renderPractice() {
    const mist = Object.keys(S.mistakes).length, due = Games.dueWords().length, wc = Object.keys(S.words).length;
    const tiles = [
      { a: 'practice', ic: '💪', bg: 'coral', t: 'Kişisel pratik', d: 'Zayıf olduğun konulara göre karışık tekrar. Can kazandırır!', tag: '+1 ❤️' },
      { a: 'mistakes', ic: '🩹', bg: 'plum', t: 'Hatalarım', d: mist ? `${mist} hatalı soruyu yeniden çöz` : 'Şu an hatalı sorun yok, harika!', tag: mist ? mist + ' soru' : '', dis: !mist },
      { a: 'cards', ic: '🃏', bg: 'gold', t: 'Kelime kartları', d: 'Aralıklı tekrar ile kelimeleri kalıcı hale getir', tag: due ? due + ' tekrar' : '' },
      { a: 'words', ic: '🔤', bg: 'teal', t: 'Kelime pratiği', d: 'En zayıf kelimelerinle eşleştirme ve seçme', tag: '' },
      { a: 'listen', ic: '🎧', bg: 'navy', t: 'Dinleme', d: Q.ttsOK ? 'Sadece dinleme soruları ile kulağını eğit' : 'Tarayıcın seslendirmeyi desteklemiyor', dis: !Q.ttsOK },
      { a: 'speak', ic: '🎙️', bg: 'coral', t: 'Konuşma', d: Q.SR ? 'Cümleleri sesli oku, telaffuzunu ölç' : 'Tarayıcın ses tanımayı desteklemiyor (Chrome deneyin)', dis: !Q.SR },
      { a: 'wordlist', ic: '📚', bg: 'teal', t: 'Kelimelerim', d: `${wc} kelime öğrendin. Güç seviyelerini gör`, tag: '' }
    ];
    return `<h1 class="page-title">Pratik merkezi</h1><p class="page-sub">Öğrendiklerini pekiştir. Pratikte can kaybetmezsin.</p>
      <div class="grid two">${tiles.map(t => `<button class="tile" data-prac="${t.a}" ${t.dis ? 'disabled style="opacity:.55"' : ''}><span class="big bg-${t.bg}">${t.ic}</span><div><h3>${t.t}</h3><p>${t.d}</p></div>${t.tag ? `<span class="tag">${t.tag}</span>` : ''}</button>`).join('')}</div>`;
  }

  /* ---------- Bulmaca ---------- */
  function renderPuzzles() {
    const solved = S.puzzle.day === Q.dayKey() && S.puzzle.solved;
    return `<h1 class="page-title">SPOTIQ Bulmaca</h1><p class="page-sub">Yalnızca SPOTIQ'te: beynini çalıştıran mini oyunlar. Hepsi XP ve görev ilerlemesi kazandırır.</p>
      <div class="daily-hero">${Q.mascot('wink', 90)}<div><h2>Günün Bulmacası</h2><p>${solved ? `Bugün ${S.puzzle.score || 0}/3 yaptın · Bulmaca serisi: 🧩 ${S.puzzle.streak}` : 'Görsel matematik, sayı dizisi ve kelime bulmacası. Her gün yeni!'}</p><button class="btn sm" data-game="daily">${solved ? 'Tekrar çöz' : 'Çözmeye başla'}</button></div></div>
      <div class="grid two">
        <button class="tile" data-game="diff"><span class="big bg-coral">👁️</span><div><h3>Farkı Bul</h3><p>İki resim arasındaki farkları süre bitmeden bul. SPOTIQ klasiği!</p></div><span class="tag">Sv. ${S.stats.diffBest || 0}</span></button>
        <button class="tile" data-game="math"><span class="big bg-gold">🧮</span><div><h3>Hızlı Matematik</h3><p>60 saniyede kafadan işlem yarışı</p></div><span class="tag">🏅 ${S.stats.mathBest}</span></button>
        <button class="tile" data-game="rush"><span class="big bg-plum">⚡</span><div><h3>Kelime Hız Turu</h3><p>İngilizce kelimelerin anlamını hızlıca bul, kombo yap</p></div><span class="tag">🏅 ${S.stats.rushBest}</span></button>
        <a class="tile" href="https://www.youtube.com/@spotiq_bulmaca" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><span class="big bg-navy">▶️</span><div><h3>Video bulmacalar</h3><p>Daha fazlası için SPOTIQ YouTube kanalı</p></div></a>
      </div>`;
  }

  /* ---------- Lig ---------- */
  function renderLeague() {
    const rows = Q.leagueBoard(), tier = S.league.tier;
    const now = new Date(), end = Q.parseDay(S.league.week); end.setDate(end.getDate() + 7);
    const left = end - now, days = Math.floor(left / 864e5), hrs = Math.floor(left % 864e5 / 36e5);
    let list = '';
    rows.forEach((r, i) => {
      if (i === 5 && tier < Q.TIERS.length - 1) list += '<div class="zone up">▲ YÜKSELME BÖLGESİ</div>';
      if (i === 15 && tier > 0) list += '<div class="zone down">▼ DÜŞME BÖLGESİ</div>';
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1;
      list += `<div class="rank-row ${r.me ? 'me' : ''}"><span class="rn">${medal}</span><span class="av">${r.av}</span><span class="nm">${esc(r.name)}${r.me ? ' (sen)' : ''}</span><span class="xp">${r.xp} XP</span></div>`;
    });
    return `<div style="text-align:center"><div class="league-badges">${Q.TIERS.map((t, i) => `<span class="lb ${i === tier ? 'on' : ''}" title="${t.n}">${t.i}</span>`).join('')}</div>
      <h1 class="page-title">${Q.TIERS[tier].n} Ligi</h1><p class="page-sub">İlk 5 bir üst lige yükselir · ${days} gün ${hrs} saat kaldı<br><span class="small">İlk 3'e girenler 💎 ödül kazanır</span></p></div>
      ${S.league.xp ? '' : `<div class="box" style="text-align:center;margin-bottom:16px">${Q.mascot('think', 80)}<p class="soft">Sıralamaya girmek için bu hafta bir ders tamamla!</p></div>`}
      <div class="box" style="padding:8px">${list}</div>`;
  }

  /* ---------- Görevler ---------- */
  function renderQuests() {
    const midnight = new Date(); midnight.setHours(24, 0, 0, 0);
    return `<div class="daily-hero" style="background:linear-gradient(135deg,var(--gold),#f7c75a);color:#3a2600">${Q.mascot('happy', 90)}<div><h2>Günlük görevler</h2><p>Görevleri tamamla, mücevher kazan! Yeni görevlere ${Q.fmtTime(midnight - Date.now())} kaldı.</p></div></div>
      <div class="box">${questsHTML()}</div>
      <h2 class="section-h">Günlük hedef</h2><div class="box" style="display:flex;gap:16px;align-items:center">${goalRing(72)}<div style="flex:1"><b>Bugün ${Q.todayXP()} / ${S.dailyGoal} XP</b><p class="soft small">Hedefe ulaşınca +5 💎</p></div><button class="btn ghost sm" data-pop="goal">Değiştir</button></div>`;
  }

  /* ---------- Mağaza ---------- */
  const SHOP = [
    { id: 'refill', ic: '❤️', t: 'Canları doldur', d: 'Tüm canlarını hemen yenile', p: 350 },
    { id: 'freeze', ic: '🧊', t: 'Seri dondurucu', d: 'Bir gün ders yapmazsan serin bozulmaz. En fazla 2 tane taşıyabilirsin.', p: 200 },
    { id: 'double', ic: '⚡', t: 'Çift XP (15 dk)', d: '15 dakika boyunca kazandığın tüm XP iki katı', p: 100 },
    { id: 'unlimited', ic: '♾️', t: 'Sınırsız can (1 saat)', d: '1 saat boyunca hata yapsan da can kaybetmezsin', p: 450 }
  ];
  function renderShop() {
    const owned = { freeze: `Sahip olunan: ${S.freezes} / 2`, refill: `Şu an: ${S.hearts} / ${Q.MAX_HEARTS}`, double: S.doubleUntil > Date.now() ? 'Aktif · ' + Q.fmtTime(S.doubleUntil - Date.now()) : '', unlimited: Q.heartsUnlimited() ? 'Aktif · ' + Q.fmtTime(S.unlimitedUntil - Date.now()) : '' };
    return `<h1 class="page-title">Mağaza</h1><p class="page-sub">Mücevherlerini harca. Mücevherler ders, görev, sandık ve bulmacalardan gelir.</p>
      <div class="box"><h3>💎 ${S.gems} mücevherin var</h3>${SHOP.map(it => {
      const dis = S.gems < it.p || (it.id === 'freeze' && S.freezes >= 2) || (it.id === 'refill' && S.hearts >= Q.MAX_HEARTS);
      return `<div class="shop-item"><span class="ii">${it.ic}</span><div class="ib"><h3 style="margin:0">${it.t}</h3><p>${it.d}</p>${owned[it.id] ? `<p class="small" style="color:var(--plum)">${owned[it.id]}</p>` : ''}</div><button class="btn ghost sm" data-buy="${it.id}" ${dis ? 'disabled' : ''}><span class="price">💎 ${it.p}</span></button></div>`;
    }).join('')}</div>`;
  }
  function buy(id) {
    const it = SHOP.find(x => x.id === id); if (!it || S.gems < it.p) return;
    if (id === 'refill') { if (S.hearts >= Q.MAX_HEARTS) return; S.hearts = Q.MAX_HEARTS; }
    if (id === 'freeze') { if (S.freezes >= 2) return; S.freezes++; }
    if (id === 'double') S.doubleUntil = Math.max(Date.now(), S.doubleUntil) + 15 * 60000;
    if (id === 'unlimited') S.unlimitedUntil = Math.max(Date.now(), S.unlimitedUntil) + 60 * 60000;
    S.gems -= it.p; Q.save(); Q.sfx('coin'); Q.toast(it.ic + ' ' + it.t + ' satın alındı!'); render();
  }

  /* ---------- Profil ---------- */
  const AVATARS = ['🦊', '🐱', '🐼', '🐸', '🦁', '🐧', '🦄', '🐙', '🐢', '🐝', '🦋', '🐳'];
  function renderProfile() {
    const lessonsDone = NODES.filter(n => n.type === 'lesson' && Q.nodeDone(n)).length;
    const total = NODES.filter(n => n.type === 'lesson').length;
    // Isı haritası: son 16 hafta
    const today = Q.dayKey(), wd = (new Date().getDay() + 6) % 7;
    const start = Q.addDays(today, -wd - 7 * 15);
    let heat = '';
    for (let i = 0; i < 16 * 7; i++) {
      const k = Q.addDays(start, i), x = S.history[k] || 0;
      const future = Q.diffDays(k, today) > 0;
      const l = x === 0 ? (S.frozen.includes(k) ? 'fz' : '') : x < 15 ? 'l1' : x < 30 ? 'l2' : x < 60 ? 'l3' : 'l4';
      heat += `<i class="${l}" title="${k}: ${x} XP" style="${future ? 'opacity:.25' : ''}"></i>`;
    }
    let bars = '';
    const max = Math.max(S.dailyGoal, ...[0, 1, 2, 3, 4, 5, 6].map(i => S.history[Q.addDays(today, i - 6)] || 0));
    for (let i = 6; i >= 0; i--) {
      const k = Q.addDays(today, -i), x = S.history[k] || 0, d = Q.parseDay(k);
      bars += `<div><span>${x}</span><i class="${i === 0 ? 'today' : ''}" style="height:${Math.max(4, x / max * 80)}px"></i><span>${Q.DAYS_TR[(d.getDay() + 6) % 7]}</span></div>`;
    }
    const joined = Q.parseDay(S.created).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
    return `<div class="prof-head"><button class="avatar" data-pop="avatar" title="Avatarı değiştir">${S.avatar}</button><div><h1 class="page-title" style="margin:0">${esc(S.name || 'Öğrenci')}</h1><p class="muted">${joined} tarihinden beri öğreniyor · ${C.flag} ${C.name}</p><button class="link" data-pop="name">İsmi düzenle</button></div></div>
      <h2 class="section-h">İstatistikler</h2>
      <div class="stat-grid">
        <div class="stat"><span class="si">🔥</span><div><b>${S.streak}</b><span>Günlük seri (en iyi ${S.bestStreak})</span></div></div>
        <div class="stat"><span class="si">⚡</span><div><b>${S.xp}</b><span>Toplam XP</span></div></div>
        <div class="stat"><span class="si">${Q.TIERS[S.league.tier].i}</span><div><b>${Q.TIERS[S.league.tier].n}</b><span>Mevcut lig</span></div></div>
        <div class="stat"><span class="si">📘</span><div><b>${lessonsDone} / ${total}</b><span>Tamamlanan ders</span></div></div>
        <div class="stat"><span class="si">🔤</span><div><b>${Object.keys(S.words).length}</b><span>Öğrenilen kelime</span></div></div>
        <div class="stat"><span class="si">💯</span><div><b>${S.stats.perfect}</b><span>Hatasız ders</span></div></div>
      </div>
      <h2 class="section-h">Bu hafta</h2><div class="box"><div class="week-bars">${bars}</div></div>
      <h2 class="section-h">Çalışma takvimi</h2><div class="box"><div class="heat">${heat}</div><p class="small muted" style="margin-top:8px">Her kare bir gün. Koyu renk = daha çok XP. ❄ mavi = seri dondurucu kullanılan gün.</p></div>
      <h2 class="section-h">Sertifikalar</h2><div class="badges">${C.sections.map(sec => `<button class="badge ${S.cert[sec.id] ? '' : 'off'}" ${S.cert[sec.id] ? `data-cert="${sec.id}"` : 'disabled'}><span class="bi">${sec.icon}</span><b>${sec.id}</b><small>${esc(sec.name)}</small></button>`).join('')}</div>
      <h2 class="section-h">Başarımlar</h2><div class="badges">${Q.ACH.map(a => { const v = a.v(), on = !!S.ach[a.id]; return `<div class="badge ${on ? '' : 'off'}"><span class="bi">${a.ic}</span><b>${a.n}</b><small>${a.d}</small>${on ? '' : `<div class="bar" style="height:8px;margin-top:6px"><i style="width:${Math.min(100, v / a.g * 100)}%"></i></div>`}</div>`; }).join('')}</div>
      <h2 class="section-h">Ayarlar</h2><div class="box settings">
        ${sw('sound', 'Ses efektleri', 'Doğru/yanlış sesleri')}
        ${sw('tts', 'Dinleme ve seslendirme', Q.ttsOK ? 'Kelimeleri sesli okut, dinleme soruları' : 'Tarayıcın desteklemiyor')}
        ${Q.ttsOK ? voiceSettings() : ''}
        ${sw('speak', 'Konuşma soruları', Q.SR ? 'Mikrofonla telaffuz alıştırması' : 'Tarayıcın desteklemiyor')}
        ${sw('hearts', 'Can sistemi', 'Kapalıyken hata yapsan da sınırsız devam edersin')}
        <div class="set"><div><b>Tema</b></div><div class="seg">${[['auto', 'Otomatik'], ['light', 'Açık'], ['dark', 'Koyu']].map(([k, t]) => `<button class="${S.settings.theme === k ? 'on' : ''}" data-theme="${k}">${t}</button>`).join('')}</div></div>
        <div class="set"><div><b>Günlük hedef</b><p class="small muted">${S.dailyGoal} XP / gün</p></div><button class="btn ghost sm" data-pop="goal">Değiştir</button></div>
        <div class="set"><div><b>İlerlemeni yedekle</b><p class="small muted">Başka bir cihaza taşımak için dosya olarak indir</p></div><div class="seg"><button data-data="export">İndir</button><button data-data="import">Yükle</button></div></div>
        <div class="set"><div><b>Sıfırla</b><p class="small muted">Tüm ilerlemeyi siler</p></div><button class="btn bad sm" data-data="reset">Sıfırla</button></div>
      </div>
      <h2 class="section-h">Neden bu renkler?</h2><div class="box"><p class="soft small" style="line-height:1.6">SPOTIQ Dil'in renkleri öğrenme araştırmalarına göre seçildi: <b style="color:var(--brand)">Mavi</b> odaklanmayı ve "yaklaşma" motivasyonunu destekler (Mehta ve Zhu, 2009, <i>Science</i>). <b style="color:var(--ok)">Yeşil</b> gelişme ve ustalaşma isteğini çağrıştırır (Lichtenfeld ve ark., 2012); bu yüzden doğru cevaplar ve ilerleme yeşil. Test öncesi görülen <b>kırmızının</b> performansı düşürdüğü gösterildiği için (Elliot ve ark., 2007) hatalarda kırmızı yerine yumuşak <b style="color:var(--bad)">turuncu</b> kullanıyoruz. Ödüller için dikkat çeken <b style="color:var(--gold-d)">sarı</b>. Her renk her yerde aynı anlamı taşır; tutarlı renk kodlaması hatırlamayı kolaylaştırır.</p></div>
      <p class="footer-note">SPOTIQ Dil · İlerlemen yalnızca bu cihazda saklanır. <a href="../../gizlilik.html">Gizlilik</a></p>`;
  }
  function voiceSettings() {
    const vs = Q.englishVoices(), cur = Q.currentVoice();
    const opts = `<option value="">Otomatik · en iyi kadın sesi${cur && !S.settings.voice ? ' (' + esc(cur.name) + ')' : ''}</option>` + vs.map(v => `<option value="${esc(v.name)}" ${S.settings.voice === v.name ? 'selected' : ''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('');
    return `<div class="set"><div style="min-width:0;flex:1"><b>Seslendirme sesi</b><p class="small muted">${vs.length ? 'Cihazındaki İngilizce sesler, en doğal kadın sesleri üstte' : 'Sesler yükleniyor…'}</p><select id="voice-sel" class="sel">${opts}</select></div><button class="btn ghost sm" data-voicetest="1">🔊 Dene</button></div>
      <div class="set"><div><b>Konuşma hızı</b></div><div class="seg">${[[0.8, 'Yavaş'], [0.95, 'Normal'], [1.1, 'Hızlı']].map(([r, t]) => `<button class="${Math.abs((S.settings.rate || 0.95) - r) < 0.01 ? 'on' : ''}" data-rate="${r}">${t}</button>`).join('')}</div></div>`;
  }
  function sw(k, t, d) { return `<div class="set"><div><b>${t}</b><p class="small muted">${d}</p></div><button class="switch ${S.settings[k] ? 'on' : ''}" data-sw="${k}" role="switch" aria-checked="${S.settings[k]}" aria-label="${t}"></button></div>`; }

  /* ---------- Açılır pencereler ---------- */
  function pop(k) {
    if (k === 'streak') {
      Q.modal(`<div class="streak-big">🔥</div><h2>${S.streak} günlük seri</h2><p>${Q.streakActiveToday() ? 'Bugünkü dersini yaptın, serin güvende! 🎉' : 'Serini uzatmak için bugün bir ders tamamla.'}</p><p>🧊 Seri dondurucu: ${S.freezes} / 2 · En uzun seri: ${S.bestStreak}</p><button class="btn block" data-a="ok">Tamam</button>`, (m, c) => m.querySelector('[data-a=ok]').onclick = c);
    } else if (k === 'hearts') {
      const unl = Q.heartsUnlimited();
      Q.modal(`<div class="em">❤️</div><h2>${unl ? 'Sınırsız can aktif' : S.hearts + ' / ' + Q.MAX_HEARTS + ' can'}</h2><p>${unl ? Q.fmtTime(S.unlimitedUntil - Date.now()) + ' kaldı.' : S.hearts < Q.MAX_HEARTS ? 'Sonraki can ' + Q.fmtTime(Q.nextHeartIn()) + ' içinde gelecek.' : 'Canların dolu! Hata yaptıkça azalır.'}</p>
        ${!unl && S.hearts < Q.MAX_HEARTS ? `<button class="btn plum block" data-a="buy" ${S.gems < 350 ? 'disabled' : ''}>Doldur · 💎 350</button><button class="btn teal block" data-a="prac">Pratik yap, can kazan</button>` : ''}<button class="btn ghost block" data-a="ok">Kapat</button>`, (m, c) => {
        m.querySelector('[data-a=ok]').onclick = c;
        const b = m.querySelector('[data-a=buy]'); if (b) b.onclick = () => { c(); buy('refill'); };
        const p = m.querySelector('[data-a=prac]'); if (p) p.onclick = () => { c(); Lesson.start({ mode: 'practice' }); };
      });
    } else if (k === 'goal') {
      const G = [[10, 'Rahat'], [20, 'Normal'], [30, 'Ciddi'], [50, 'Yoğun']];
      Q.modal(`<h2>Günlük hedefin</h2><p>Her gün ne kadar çalışmak istersin?</p><div class="onb" style="min-height:0;padding:0"><div class="opts">${G.map(([x, t]) => `<button class="opt ${S.dailyGoal === x ? 'on' : ''}" data-g="${x}"><span>${t}</span><span>${x} XP / gün</span></button>`).join('')}</div></div>`, (m, c) => {
        m.onclick = e => { const b = e.target.closest('[data-g]'); if (b) { S.dailyGoal = +b.dataset.g; Q.save(); c(); render(); } };
      });
    } else if (k === 'name') {
      Q.modal(`<h2>İsmin</h2><input id="nm" maxlength="24" value="${esc(S.name)}" style="border:2px solid var(--line);border-radius:14px;padding:12px;background:var(--card);font-weight:800"><button class="btn block" data-a="ok">Kaydet</button>`, (m, c) => {
        const i = m.querySelector('#nm'); i.focus(); i.select();
        const sv = () => { S.name = i.value.trim().slice(0, 24); Q.save(); c(); render(); };
        m.querySelector('[data-a=ok]').onclick = sv; i.onkeydown = e => { if (e.key === 'Enter') sv(); };
      });
    } else if (k === 'avatar') {
      Q.modal(`<h2>Avatarını seç</h2><div class="badges">${AVATARS.map(a => `<button class="badge" data-av="${a}" style="font-size:2rem;${a === S.avatar ? 'border-color:var(--brand)' : ''}">${a}</button>`).join('')}</div>`, (m, c) => {
        m.onclick = e => { const b = e.target.closest('[data-av]'); if (b) { S.avatar = b.dataset.av; Q.save(); c(); render(); } };
      });
    }
  }

  /* ---------- Veri ---------- */
  function dataAction(k) {
    if (k === 'export') {
      const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'spotiq-dil-yedek-' + Q.dayKey() + '.json'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } else if (k === 'import') {
      const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'application/json,.json';
      inp.onchange = () => {
        const f = inp.files[0]; if (!f) return;
        f.text().then(t => { const d = JSON.parse(t); if (!d || d.v !== 1) throw new Error(); localStorage.setItem('spotiq-dil-v1', t); S = Q.load(); Q.tick(); applyTheme(); render(); Q.toast('İlerleme yüklendi!'); })
          .catch(() => Q.toast('Bu dosya geçerli bir yedek değil.'));
      };
      inp.click();
    } else if (k === 'reset') {
      Q.modal(`${Q.mascot('sad', 100)}<h2>Emin misin?</h2><p>Tüm XP, seri, kelime ve ilerlemen silinecek. Bu geri alınamaz.</p><button class="btn bad block" data-a="yes">Evet, sıfırla</button><button class="btn ghost block" data-a="no">Vazgeç</button>`, (m, c) => {
        m.querySelector('[data-a=no]').onclick = c;
        m.querySelector('[data-a=yes]').onclick = () => { c(); Q.reset(); S = Q.S; view = 'learn'; applyTheme(); boot(); };
      });
    }
  }

  /* ---------- Ders başlatma ---------- */
  function noHearts() {
    Q.modal(`${Q.mascot('sad', 110)}<h2>Canın kalmadı</h2><p>Sonraki can ${Q.fmtTime(Q.nextHeartIn())} içinde. Pratik yaparak can kazanabilir ya da mağazadan doldurabilirsin.</p>
      <button class="btn plum block" data-a="buy" ${S.gems < 350 ? 'disabled' : ''}>Doldur · 💎 350</button><button class="btn teal block" data-a="prac">Pratik yap, can kazan</button><button class="btn ghost block" data-a="ok">Daha sonra</button>`, (m, c) => {
      m.querySelector('[data-a=ok]').onclick = c;
      m.querySelector('[data-a=buy]').onclick = () => { c(); buy('refill'); };
      m.querySelector('[data-a=prac]').onclick = () => { c(); Lesson.start({ mode: 'practice' }); };
    });
  }
  function nodeAction(a) {
    const n = NODES[openNode]; if (!n) return;
    const lv = S.progress[n.id] || 0;
    openNode = null;
    if (a === 'lesson') Lesson.start({ mode: 'lesson', node: n, level: Math.min(lv, Q.LEVELS - 1) });
    else if (a === 'review') Lesson.start({ mode: 'lesson', node: n, level: Math.floor(Math.random() * Q.LEVELS), review: true });
    else if (a === 'test') Lesson.start({ mode: 'test', node: n });
    else if (a === 'chest') { openNode = NODES.indexOf(n); openChest(n); }
    else if (a === 'story') Lesson.story(n);
    else if (a === 'vocab') Lesson.start({ mode: 'vocab', node: n });
  }

  /* ---------- Render ---------- */
  function render() {
    S = Q.S;
    Q.tick();
    renderNav(); renderRail();
    const v = $('#view');
    v.innerHTML = { learn: renderLearn, practice: renderPractice, puzzles: renderPuzzles, league: renderLeague, quests: renderQuests, shop: renderShop, profile: renderProfile }[view]();
    if (view === 'learn' && openNode === null && !render.scrolled) {
      render.scrolled = true;
      const cur = $('.start-bubble');
      if (cur) setTimeout(() => cur.scrollIntoView({ block: 'center', inline: 'nearest' }), 30);
    }
  }
  function go(v) { view = v; openNode = null; render(); window.scrollTo(0, 0); try { history.replaceState(null, '', '#' + v); } catch (e) { } }

  document.addEventListener('click', e => {
    if (!$('#overlay').hidden) return;
    const t = e.target.closest('[data-voicetest],[data-rate],[data-expand],[data-jump],[data-cert],[data-go],[data-pop],[data-node],[data-act],[data-claim],[data-buy],[data-prac],[data-game],[data-sw],[data-theme],[data-data],[data-guide]');
    if (!t) { if (openNode !== null && !e.target.closest('.pop')) { openNode = null; render(); } return; }
    const d = t.dataset;
    if (d.voicetest) return Q.speak('Hello! Nice to meet you. Let\'s learn English together.');
    if (d.rate) { S.settings.rate = +d.rate; Q.save(); Q.speak('This is my speaking speed.'); return render(); }
    if (d.expand !== undefined) { const si = +d.expand, cs = Q.currentSection(); if (si === cs) expanded = expanded === -1 - si ? null : -1 - si; else expanded = expanded === si ? null : si; openNode = null; return render(); }
    if (d.jump !== undefined) return jumpAsk(+d.jump);
    if (d.cert) return showCert(d.cert);
    if (d.go) return go(d.go);
    if (d.pop) return pop(d.pop);
    if (d.guide !== undefined) return guide(+d.guide);
    if (d.node !== undefined) { const i = +d.node; openNode = openNode === i ? null : i; Q.sfx('tap'); render(); return; }
    if (d.act) {
      if (['lesson', 'review', 'test', 'chest', 'story', 'vocab'].includes(d.act)) return nodeAction(d.act);
      if (d.act === 'lgok') { S.leagueResult = null; Q.save(); return render(); }
      if (d.act === 'repair') {
        if (S.gems < 400) return Q.toast('Yeterli mücevherin yok (400 💎 gerekli)');
        S.gems -= 400; S.streak = S.lostStreak.value; S.lastDay = Q.addDays(Q.dayKey(), -1); S.lostStreak = null; Q.save(); Q.sfx('fire'); Q.toast('🔥 Serin geri geldi! Bugün bir ders yapmayı unutma.'); return render();
      }
    }
    if (d.claim !== undefined) {
      const it = S.quests.items[+d.claim]; if (!it || it.claimed || it.p < it.n) return;
      it.claimed = true; S.gems += it.r; Q.save(); Q.sfx('coin'); Q.confetti(40); Q.toast('🎁 +' + it.r + ' 💎'); return render();
    }
    if (d.buy) return buy(d.buy);
    if (d.prac) {
      if (d.prac === 'cards') return Games.cards();
      if (d.prac === 'wordlist') return Games.wordList();
      if (d.prac === 'mistakes' && !Object.keys(S.mistakes).length) return;
      return Lesson.start({ mode: d.prac });
    }
    if (d.game) { if (d.game === 'daily') return Games.daily(); if (d.game === 'diff') return Games.spotDiff(); return Games.speedGame(d.game === 'math' ? 'math' : 'rush'); }
    if (d.sw) { S.settings[d.sw] = !S.settings[d.sw]; Q.save(); return render(); }
    if (d.theme) { S.settings.theme = d.theme; Q.save(); applyTheme(); return render(); }
    if (d.data) return dataAction(d.data);
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'voice-sel') { S.settings.voice = e.target.value; Q.save(); Q.pickVoice(); Q.speak('Hello! This is my voice.'); }
  });
  if (Q.ttsOK) speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', () => { if (view === 'profile' && $('#overlay').hidden) render(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').hidden) { $('#modal').hidden = true; $('#modal').innerHTML = ''; } });

  /* ---------- Karşılama ---------- */
  function onboarding() {
    $('#app').hidden = true;
    const ov = $('#overlay'); ov.hidden = false;
    let step = 0; const data = { goal: 20, name: '' };
    function draw() {
      const steps = `<div class="steps">${[0, 1, 2, 3].map(i => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>`;
      if (step === 0) ov.innerHTML = `<div class="onb">${Q.mascot('happy', 170)}<h1>spotiq<span>.</span>dil</h1><p class="soft" style="font-size:1.1rem">Ücretsiz, eğlenceli ve etkili İngilizce. Günde 5 dakika ile başla!</p>
        <ul style="text-align:left;color:var(--soft);line-height:1.9;padding-left:20px;margin:0"><li>🔥 Seri, XP, lig ve günlük görevler</li><li>🎧 Dinleme, 🎙️ konuşma ve yazma alıştırmaları</li><li>🧩 SPOTIQ'e özel: günün bulmacası & farkı bul</li><li>🃏 Aralıklı tekrar ile kelime kartları</li></ul>
        <button class="btn block" data-n="1">Başlayalım</button></div>`;
      if (step === 1) ov.innerHTML = `<div class="onb">${steps}${Q.mascot('think', 120)}<h1>Günlük hedefin ne olsun?</h1><div class="opts">${[[10, 'Rahat', '5 dk'], [20, 'Normal', '10 dk'], [30, 'Ciddi', '15 dk'], [50, 'Yoğun', '20 dk']].map(([x, t, m]) => `<button class="opt ${data.goal === x ? 'on' : ''}" data-g="${x}"><span>${t}</span><span class="muted">${m} / gün</span></button>`).join('')}</div><button class="btn block" data-n="2">Devam</button></div>`;
      if (step === 2) ov.innerHTML = `<div class="onb">${steps}${Q.mascot('wink', 120)}<h1>Sana nasıl seslenelim?</h1><input id="onm" maxlength="24" placeholder="Adın (sertifikanda yazacak)" value="${esc(data.name)}"><button class="btn block" data-n="3">Devam</button></div>`;
      if (step === 3) ov.innerHTML = `<div class="onb">${steps}${Q.mascot('think', 120)}<h1>İngilizcen ne durumda?</h1><div class="opts">
        <button class="opt" data-lv="zero"><span>🌱 Sıfırdan başlıyorum</span><span class="muted">A1</span></button>
        <button class="opt" data-lv="test"><span>🧭 Biraz biliyorum, seviyemi bul</span><span class="muted">Test</span></button></div>
        <p class="small muted">Seviye testi her seviyeden 15 soru sorar. Geçtiğin seviyeler tamamlanmış sayılır.</p><button class="btn text" data-lv="skip">Önce etrafa bakayım</button></div>`;
      const i = $('#onm'); if (i) { i.focus(); i.onkeydown = e => { if (e.key === 'Enter') ov.querySelector('[data-n="3"]').click(); }; }
    }
    ov.onclick = e => {
      const g = e.target.closest('[data-g]'); if (g) { data.goal = +g.dataset.g; Q.sfx('tap'); draw(); return; }
      const lv = e.target.closest('[data-lv]');
      if (lv) {
        S.name = data.name; S.dailyGoal = data.goal; S.onboarded = true; Q.save();
        ov.onclick = null; ov.hidden = true; ov.innerHTML = ''; $('#app').hidden = false;
        render();
        if (lv.dataset.lv === 'zero') Lesson.start({ mode: 'lesson', node: NODES[0], level: 0 });
        if (lv.dataset.lv === 'test') runJump(0, 1, true);
        return;
      }
      const n = e.target.closest('[data-n]'); if (!n) return;
      if (step === 2) { const i = $('#onm'); data.name = i ? i.value.trim() : ''; }
      step = +n.dataset.n; Q.sfx('tap'); draw();
    };
    draw();
  }

  function boot() {
    applyTheme();
    const h = location.hash.slice(1); if (NAV.some(n => n.id === h)) view = h;
    if (!S.onboarded) return onboarding();
    $('#app').hidden = false;
    render();
    Q.flushNotices();
  }
  setInterval(() => { if ($('#overlay').hidden && $('#modal').hidden) { Q.tick(); renderNav(); renderRail(); } }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && $('#overlay').hidden && S.onboarded) render(); });

  window.App = { render, noHearts, certHTML };
  Q.tick();
  boot();
})();
