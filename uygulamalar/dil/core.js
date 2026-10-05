/* ASİ Dil — çekirdek: durum, yardımcılar, ses, konuşma, maskot, ödüller */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Tarih ---------- */
  const pad = n => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const parseDay = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
  const dayNum = k => { const [y, m, d] = k.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 864e5); };
  const diffDays = (a, b) => dayNum(a) - dayNum(b);
  const addDays = (k, n) => { const d = parseDay(k); d.setDate(d.getDate() + n); return dayKey(d); };
  const weekKey = (d = new Date()) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); const wd = (x.getDay() + 6) % 7; x.setDate(x.getDate() - wd); return dayKey(x); };
  const DAYS_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  /* ---------- Rastgelelik ---------- */
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = typeof seed === 'string' ? hash(seed) : seed >>> 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const R = { f: Math.random };
  const rand = (n, f = R.f) => Math.floor(f() * n);
  const pick = (arr, f = R.f) => arr[rand(arr.length, f)];
  function shuffle(arr, f = R.f) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(f() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const sample = (arr, n, f) => shuffle(arr, f).slice(0, n);

  /* ---------- Kurs dizini ---------- */
  const C = window.COURSE;
  const LEVELS = 3;
  const UNIT_COLORS = { blue: ['var(--brand)', 'var(--brand-d)'], green: ['var(--ok)', 'var(--ok-d)'], teal: ['var(--teal)', 'var(--teal-d)'], indigo: ['var(--navy)', 'var(--navy-d)'], amber: ['var(--gold)', 'var(--gold-d)'] };
  const NODES = [];
  const ALL_WORDS = [];
  const ALL_SENTS = [];
  C.units.forEach((u, ui) => {
    u.lessons.forEach((l, li) => {
      const id = 'u' + ui + 'l' + li;
      l.id = id;
      l.words.forEach((w, wi) => ALL_WORDS.push({ en: w[0], tr: w[1], em: w[2] || '', lesson: id, unit: ui, id: id + 'w' + wi }));
      l.sentences.forEach((s, si) => ALL_SENTS.push({ en: s[0], tr: s[1], enAlt: s[2] || [], trAlt: s[3] || [], lesson: id, unit: ui, id: id + 's' + si }));
      NODES.push({ type: 'lesson', id, unit: ui, lesson: li, title: l.title, icon: l.icon });
      if (li === 1) NODES.push({ type: 'chest', id: 'u' + ui + 'c', unit: ui });
      if (li === 2 && u.story) NODES.push({ type: 'story', id: 'u' + ui + 's', unit: ui, title: u.story.title, icon: '📖' });
    });
    if (u.extra && u.extra.length) {
      const xid = 'u' + ui + 'x';
      u.extra.forEach((w, wi) => ALL_WORDS.push({ en: w[0], tr: w[1], em: w[2] || '', lesson: xid, unit: ui, id: xid + 'w' + wi, extra: true }));
      NODES.push({ type: 'vocab', id: xid, unit: ui, title: 'Kelime Paketi · ' + u.extra.length + ' kelime', icon: '🔤' });
    }
    NODES.push({ type: 'test', id: 'u' + ui + 't', unit: ui, title: u.title + ' · Ünite Testi', icon: '🏆' });
  });
  /* Kelime kütüphanesi (ileri seviye desteler): ana kursta olmayan kelimeler eklenir */
  const LIB = window.LIBRARY || [];
  const LIB_WORDS = [];
  const courseEn = new Set(ALL_WORDS.map(w => w.en.toLowerCase()));
  LIB.forEach(d => {
    d.items = [];
    (d.words || []).forEach((w, i) => {
      const k = w[0].toLowerCase();
      if (courseEn.has(k)) return;
      courseEn.add(k);
      const o = { en: w[0], tr: w[1], em: w[2] || '', ex: w[3], exTr: w[4], lesson: d.id, unit: -1, id: d.id + 'w' + i, lib: true, deck: d.id };
      LIB_WORDS.push(o); d.items.push(o);
    });
  });
  const wordById = Object.fromEntries(ALL_WORDS.concat(LIB_WORDS).map(w => [w.id, w]));
  const sentById = Object.fromEntries(ALL_SENTS.map(s => [s.id, s]));
  const wordByEn = {};
  ALL_WORDS.concat(LIB_WORDS).forEach(w => { const k = w.en.toLowerCase(); if (!wordByEn[k]) wordByEn[k] = w; });
  NODES.forEach(n => { n.section = C.units[n.unit].section || 0; });

  /* ---------- Durum ---------- */
  const KEY = 'spotiq-dil-v1';
  const HEART_MS = 30 * 60 * 1000;
  const MAX_HEARTS = 5;
  function defaults() {
    return {
      v: 1, onboarded: false, name: '', avatar: '🦊', created: dayKey(), dailyGoal: 20,
      xp: 0, gems: 500, hearts: MAX_HEARTS, heartAt: Date.now(),
      streak: 0, bestStreak: 0, lastDay: null, freezes: 1, frozen: [], lostStreak: null,
      doubleUntil: 0, unlimitedUntil: 0,
      progress: {}, history: {}, mistakes: {}, words: {},
      quests: null, ach: {}, goalDay: null,
      cert: {}, reads: {}, pods: {}, roles: {}, rw: { week: '', done: {} }, stats: { reads: 0, pods: 0, roles: 0, stories: 0, lessons: 0, perfect: 0, maxCombo: 0, puzzles: 0, games: 0, diffs: 0, cards: 0, tests: 0, mathBest: 0, rushBest: 0, diffBest: 0, night: 0, early: 0 },
      league: { tier: 0, week: weekKey(), xp: 0 }, leagueResult: null,
      puzzle: { day: null, solved: false, streak: 0, lastSolved: null },
      settings: { voice: '', rate: 0.95, sound: true, tts: true, speak: true, hearts: true, theme: 'auto', motivate: true }
    };
  }
  function merge(d, s) { for (const k in d) { if (s[k] === undefined) s[k] = d[k]; else if (d[k] && typeof d[k] === 'object' && !Array.isArray(d[k]) && s[k] && typeof s[k] === 'object') merge(d[k], s[k]); } return s; }
  let S;
  function load() {
    try { const raw = localStorage.getItem(KEY); S = raw ? merge(defaults(), JSON.parse(raw)) : defaults(); }
    catch (e) { S = defaults(); }
    return S;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* depolama kapalı olabilir */ } }
  function reset() { S = defaults(); save(); }

  /* Zamanla değişenler: canlar, seri, lig */
  function tick() {
    const now = Date.now();
    if (S.hearts < MAX_HEARTS) {
      const n = Math.floor((now - S.heartAt) / HEART_MS);
      if (n > 0) { S.hearts = Math.min(MAX_HEARTS, S.hearts + n); S.heartAt += n * HEART_MS; }
    } else S.heartAt = now;
    const today = dayKey();
    if (S.lastDay && S.streak > 0) {
      const gap = diffDays(today, S.lastDay);
      if (gap >= 2) {
        const missed = gap - 1;
        if (S.freezes >= missed) {
          S.freezes -= missed;
          for (let i = 1; i <= missed; i++) S.frozen.push(addDays(S.lastDay, i));
          S.lastDay = addDays(today, -1);
          notice('🧊 Seri dondurucu serini korudu!');
        } else {
          S.lostStreak = { value: S.streak, day: today };
          S.streak = 0;
        }
      }
    }
    if (S.lostStreak && S.lostStreak.day !== today) S.lostStreak = null;
    const wk = weekKey();
    if (S.league.week !== wk) settleLeague(wk);
    ensureQuests();
    save();
  }
  let pendingNotices = [];
  function notice(t) { pendingNotices.push(t); }

  function heartsUnlimited() { return !S.settings.hearts || S.unlimitedUntil > Date.now(); }
  function nextHeartIn() { return Math.max(0, S.heartAt + HEART_MS - Date.now()); }
  function loseHeart() {
    if (heartsUnlimited()) return;
    if (S.hearts === MAX_HEARTS) S.heartAt = Date.now();
    S.hearts = Math.max(0, S.hearts - 1);
    save();
  }

  /* ---------- XP, seri, hedef ---------- */
  function addXP(n) {
    const mult = S.doubleUntil > Date.now() ? 2 : 1;
    const a = Math.round(n * mult);
    const t = dayKey();
    const before = S.history[t] || 0;
    S.xp += a; S.history[t] = before + a; S.league.xp += a;
    bump('xp', a);
    if (before < S.dailyGoal && before + a >= S.dailyGoal && S.goalDay !== t) { S.goalDay = t; S.gems += 5; notice('🎯 Günlük hedefine ulaştın! +5 💎'); }
    checkAchievements();
    save();
    return a;
  }
  function todayXP() { return S.history[dayKey()] || 0; }
  /* Gün içinde ilk tamamlanan ders seriyi uzatır; uzadıysa true döner */
  function extendStreak() {
    const t = dayKey();
    if (S.lastDay === t) return false;
    S.streak = S.lastDay === addDays(t, -1) ? S.streak + 1 : 1;
    if (S.lostStreak) S.lostStreak = null;
    S.lastDay = t;
    S.bestStreak = Math.max(S.bestStreak, S.streak);
    const h = new Date().getHours();
    if (h >= 23 || h < 4) S.stats.night++;
    if (h >= 4 && h < 7) S.stats.early++;
    checkAchievements();
    save();
    return true;
  }
  function streakActiveToday() { return S.lastDay === dayKey(); }

  /* ---------- Lig ---------- */
  const TIERS = [
    { n: 'Çaylak', i: '🥚' }, { n: 'Kâşif', i: '🧭' }, { n: 'Gözlemci', i: '👁️' }, { n: 'Dedektif', i: '🔎' },
    { n: 'Usta', i: '🎓' }, { n: 'Bilge', i: '📜' }, { n: 'Efsane', i: '👑' }
  ];
  const BOT_NAMES = ['Elif', 'Mert', 'Zeynep', 'Kerem', 'Defne', 'Emir', 'Ece', 'Arda', 'Nehir', 'Kaan', 'Ada', 'Yusuf', 'Duru', 'Ömer', 'Selin', 'Baran', 'Irmak', 'Can', 'Asel', 'Deniz', 'Eylül', 'Berk', 'Lina', 'Efe', 'Mira', 'Alp', 'Nil', 'Tuna', 'Ela', 'Poyraz', 'Sude', 'Aras'];
  const BOT_AV = ['🐱', '🐶', '🦊', '🐼', '🐸', '🐯', '🐨', '🐰', '🦁', '🐵', '🐧', '🐙', '🦄', '🐻', '🐮', '🐷', '🦔', '🐳', '🐢', '🦋'];
  function weekFrac(wk, now = new Date()) { const s = parseDay(wk).getTime(); return Math.min(1, Math.max(0, (now.getTime() - s) / (7 * 864e5))); }
  function leagueBoard(wk = S.league.week, tier = S.league.tier, frac) {
    const f = rng('lg' + wk + tier);
    const names = shuffle(BOT_NAMES, f).slice(0, 19);
    const fr = frac === undefined ? weekFrac(wk) : frac;
    const rows = names.map((nm, i) => {
      const active = f() < 0.85;
      const base = active ? (40 + Math.pow(f(), 1.8) * 900) * (1 + tier * 0.22) : 0;
      const curve = 0.6 + f() * 0.9;
      return { name: nm, av: BOT_AV[i % BOT_AV.length], xp: Math.round(base * Math.pow(fr, curve)), me: false };
    });
    rows.push({ name: S.name || 'Sen', av: S.avatar, xp: S.league.xp, me: true });
    rows.sort((a, b) => b.xp - a.xp || (a.me ? -1 : 1));
    return rows;
  }
  function settleLeague(newWeek) {
    const rows = leagueBoard(S.league.week, S.league.tier, 1);
    const rank = rows.findIndex(r => r.me) + 1;
    const old = S.league.tier;
    let tier = old, msg;
    if (S.league.xp > 0 && rank <= 5 && tier < TIERS.length - 1) { tier++; msg = 'up'; }
    else if (rank > 15 && tier > 0) { tier--; msg = 'down'; }
    else msg = 'stay';
    if (S.league.xp > 0 || old > 0) S.leagueResult = { rank, from: old, to: tier, msg };
    if (rank <= 3 && S.league.xp > 0) S.gems += [0, 60, 40, 20][rank];
    S.league = { tier, week: newWeek, xp: 0 };
  }

  /* ---------- Günlük görevler ---------- */
  const QUEST_POOL = [
    { k: 'lessons', t: n => n + ' ders tamamla', n: [2, 3], ic: '📘', r: 15 },
    { k: 'perfect', t: () => 'Bir dersi hatasız bitir', n: [1], ic: '💯', r: 20 },
    { k: 'combo', t: n => 'Üst üste ' + n + ' doğru cevap ver', n: [8, 12], ic: '⚡', r: 15, max: true },
    { k: 'puzzle', t: () => 'Günün bulmacasını çöz', n: [1], ic: '🧩', r: 20 },
    { k: 'game', t: () => 'Bir mini oyun oyna', n: [1], ic: '🎮', r: 10 },
    { k: 'cards', t: n => n + ' kelime kartı çalış', n: [10], ic: '🃏', r: 10 },
    { k: 'listen', t: n => n + ' dinleme sorusunu doğru yap', n: [4, 6], ic: '🎧', r: 15 }
  ];
  function ensureQuests() {
    const t = dayKey();
    if (S.quests && S.quests.day === t) return;
    const f = rng('q' + t);
    const xpN = Math.max(20, S.dailyGoal) + (f() < 0.5 ? 0 : 10);
    const items = [{ k: 'xp', n: xpN, p: 0, claimed: false, r: 15 }];
    shuffle(QUEST_POOL, f).slice(0, 2).forEach(q => items.push({ k: q.k, n: pick(q.n, f), p: 0, claimed: false, r: q.r }));
    S.quests = { day: t, items };
  }
  function questInfo(it) {
    if (it.k === 'xp') return { t: it.n + ' XP kazan', ic: '⭐' };
    const q = QUEST_POOL.find(x => x.k === it.k);
    return { t: q.t(it.n), ic: q.ic };
  }
  function bump(k, amount = 1) {
    if (!S.quests) return;
    const def = QUEST_POOL.find(x => x.k === k);
    S.quests.items.forEach(it => {
      if (it.k !== k || it.claimed) return;
      const before = it.p;
      it.p = def && def.max ? Math.max(it.p, amount) : it.p + amount;
      if (before < it.n && it.p >= it.n) notice('✅ Görev tamamlandı: ' + questInfo(it).t);
    });
  }
  function questsReady() { return S.quests ? S.quests.items.filter(i => i.p >= i.n && !i.claimed).length : 0; }

  /* ---------- Başarımlar ---------- */
  const ACH = [
    { id: 'st3', ic: '🔥', n: 'Isınma', d: '3 günlük seri', v: () => S.bestStreak, g: 3 },
    { id: 'st7', ic: '🔥', n: 'Haftalık Ateş', d: '7 günlük seri', v: () => S.bestStreak, g: 7 },
    { id: 'st30', ic: '🌋', n: 'Yanardağ', d: '30 günlük seri', v: () => S.bestStreak, g: 30 },
    { id: 'xp100', ic: '⭐', n: 'İlk Adımlar', d: '100 XP topla', v: () => S.xp, g: 100 },
    { id: 'xp1k', ic: '🌟', n: 'Yıldız', d: '1000 XP topla', v: () => S.xp, g: 1000 },
    { id: 'xp5k', ic: '💫', n: 'Süpernova', d: '5000 XP topla', v: () => S.xp, g: 5000 },
    { id: 'pf1', ic: '💯', n: 'Kusursuz', d: 'Hatasız bir ders', v: () => S.stats.perfect, g: 1 },
    { id: 'pf10', ic: '🎯', n: 'Keskin Nişancı', d: '10 hatasız ders', v: () => S.stats.perfect, g: 10 },
    { id: 'cb15', ic: '⚡', n: 'Şimşek', d: 'Üst üste 15 doğru', v: () => S.stats.maxCombo, g: 15 },
    { id: 'wd30', ic: '📚', n: 'Kelime Avcısı', d: '30 kelime öğren', v: () => Object.keys(S.words).length, g: 30 },
    { id: 'wd100', ic: '🧠', n: 'Sözlük', d: '100 kelime öğren', v: () => Object.keys(S.words).length, g: 100 },
    { id: 'unit1', ic: '🏆', n: 'Ünite Fatihi', d: 'Bir ünite testini geç', v: () => S.stats.tests, g: 1 },
    { id: 'pz1', ic: '🧩', n: 'Bulmacacı', d: 'Günün bulmacasını çöz', v: () => S.stats.puzzles, g: 1 },
    { id: 'pz10', ic: '🔎', n: 'ASİ Dedektifi', d: '10 günlük bulmaca', v: () => S.stats.puzzles, g: 10 },
    { id: 'df', ic: '👁️', n: 'Keskin Göz', d: 'Farkı Bul\'da 25 fark', v: () => S.stats.diffs, g: 25 },
    { id: 'night', ic: '🌙', n: 'Gece Kuşu', d: 'Gece 23\'ten sonra ders', v: () => S.stats.night, g: 1 },
    { id: 'early', ic: '🌅', n: 'Erkenci', d: 'Sabah 7\'den önce ders', v: () => S.stats.early, g: 1 },
    { id: 'lg', ic: '👑', n: 'Yükselen', d: 'Dedektif ligine çık', v: () => S.league.tier, g: 3 },
    { id: 'story1', ic: '📖', n: 'Kitap Kurdu', d: 'İlk hikâyeni oku', v: () => S.stats.stories, g: 1 },
    { id: 'story10', ic: '📚', n: 'Hikâye Avcısı', d: '10 hikâye oku', v: () => S.stats.stories, g: 10 },
    { id: 'wd1k', ic: '🗝️', n: 'Kelime Ustası', d: '1000 kelime öğren', v: () => Object.keys(S.words).length, g: 1000 },,,,
  ];
  function checkAchievements() {
    ACH.forEach(a => { if (!S.ach[a.id] && a.v() >= a.g) { S.ach[a.id] = dayKey(); notice(a.ic + ' Başarım açıldı: ' + a.n); } });
  }

  /* ---------- İlerleme ---------- */
  function nodeDone(n) { const p = S.progress[n.id] || 0; return n.type === 'lesson' ? p >= LEVELS : p >= 1; }
  function sectionDone(si) { return NODES.every(n => n.section !== si || nodeDone(n)); }
  function currentSection() { const i = currentIndex(); return i >= NODES.length ? C.sections.length - 1 : NODES[i].section; }
  /* Bölüm tamamlandıysa seviye rozetini kaydeder; yeni rozet varsa seviye kimliğini döner */
  function checkCerts() {
    let fresh = null;
    C.sections.forEach((sec, si) => { if (!S.cert[sec.id] && sectionDone(si) && (sec.id !== 'C1' || Object.keys(S.words).length >= C1_WORDS)) { S.cert[sec.id] = dayKey(); fresh = sec.id; } });
    if (fresh) { checkAchievements(); save(); }
    return fresh;
  }
  function completeSection(si) {
    NODES.forEach(n => { if (n.section === si) { S.progress[n.id] = n.type === 'lesson' ? LEVELS : 1; if (n.type === 'lesson' || n.type === 'vocab') learnWords(n.id); } });
    save();
  }
  function currentIndex() { const i = NODES.findIndex(n => !nodeDone(n)); return i === -1 ? NODES.length : i; }
  function learnIds(ids) { ids.forEach(id => { if (!S.words[id]) S.words[id] = { box: 0, due: dayKey(), seen: 0, ok: 0 }; }); }
  /* Kelime hazinesi ve tahmini CEFR seviyesi (CEFR kelime araştırmalarındaki yaklaşık eşikler) */
  const C1_WORDS = 5000;
  const VOCAB_STEPS = [[0, 'A1'], [700, 'A2'], [1500, 'B1'], [2700, 'B2'], [4000, 'C1'], [5500, 'C1+']];
  function vocab() {
    const n = Object.keys(S.words).length;
    let lvl = 'A1'; VOCAB_STEPS.forEach(([t, l]) => { if (n >= t) lvl = l; });
    return { n, lvl, total: ALL_WORDS.length + LIB_WORDS.length, goal: 5500 };
  }
  function learnWords(lessonId) {
    ALL_WORDS.filter(w => w.lesson === lessonId).forEach(w => { if (!S.words[w.id]) S.words[w.id] = { box: 0, due: dayKey(), seen: 0, ok: 0 }; });
  }
  function unlockedSentences() { const ci = currentIndex(); const ids = new Set(NODES.slice(0, ci + 1).filter(n => n.type === 'lesson').map(n => n.id)); return ALL_SENTS.filter(s => ids.has(s.lesson)); }

  /* ---------- Metin karşılaştırma ---------- */
  const CONTR = { "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are', "they're": 'they are', "don't": 'do not', "doesn't": 'does not', "isn't": 'is not', "aren't": 'are not', "can't": 'can not', cannot: 'can not', "let's": 'let us', "what's": 'what is', "where's": 'where is', "i've": 'i have', "haven't": 'have not', "didn't": 'did not', "wasn't": 'was not', "that's": 'that is', "here's": 'here is', "there's": 'there is', colour: 'color', favourite: 'favorite', mum: 'mom' };
  function norm(s, lang) {
    let x = String(s).replace(/[’`´]/g, "'");
    x = lang === 'tr' ? x.toLocaleLowerCase('tr') : x.toLowerCase();
    if (lang === 'tr') x = x.replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u');
    x = x.replace(/[.,!?;:"“”«»()¡¿…\-–—]/g, ' ').replace(/\s+/g, ' ').trim();
    if (lang !== 'tr') x = x.split(' ').map(w => CONTR[w] || w).join(' ');
    return x.replace(/'/g, '').replace(/\s+/g, ' ').trim();
  }
  function lev(a, b) {
    const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
    return prev[n];
  }
  function judge(input, answers, lang, allowTypo) {
    const ni = norm(input, lang);
    if (!ni) return { ok: false };
    for (const a of answers) if (norm(a, lang) === ni) return { ok: true };
    if (allowTypo) {
      for (const a of answers) {
        const na = norm(a, lang);
        if (na.split(' ').length !== ni.split(' ').length) continue;
        const lim = Math.max(1, Math.floor(na.length / 10));
        if (lev(na, ni) <= lim) return { ok: true, typo: a };
      }
    }
    return { ok: false };
  }

  /* ---------- Ses efektleri ---------- */
  let AC = null;
  function ac() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } } if (AC.state === 'suspended') AC.resume(); return AC; }
  function tone(freq, start, dur, type = 'sine', vol = 0.18) {
    const a = ac(); if (!a) return;
    const o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, a.currentTime + start);
    g.gain.exponentialRampToValueAtTime(vol, a.currentTime + start + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + start + dur);
    o.connect(g); g.connect(a.destination);
    o.start(a.currentTime + start); o.stop(a.currentTime + start + dur + 0.05);
  }
  function sfx(kind) {
    if (!S || !S.settings.sound) return;
    switch (kind) {
      case 'ok': tone(660, 0, .12, 'triangle'); tone(990, .09, .22, 'triangle'); break;
      case 'bad': tone(220, 0, .18, 'sawtooth', .08); tone(170, .12, .28, 'sawtooth', .08); break;
      case 'tap': tone(520, 0, .05, 'sine', .07); break;
      case 'pop': tone(780, 0, .06, 'triangle', .1); break;
      case 'coin': tone(1040, 0, .08, 'square', .06); tone(1560, .07, .16, 'square', .06); break;
      case 'done': [523, 659, 784, 1046].forEach((f, i) => tone(f, i * .1, .3, 'triangle', .14)); break;
      case 'fire': [392, 523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, i * .07, .25, 'triangle', .12)); break;
      case 'fail': [392, 330, 262].forEach((f, i) => tone(f, i * .16, .3, 'triangle', .12)); break;
    }
  }

  /* ---------- Seslendirme ---------- */
  const ttsOK = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let voice = null;
  /* Ses seçimi: kaliteli (doğal/nöral) kadın seslerini öne alır, erkek ve "eğlence" seslerini geri iter */
  const FEMALE = /samantha|ava|allison|susan|victoria|karen|moira|tessa|serena|fiona|kate|zira|aria|jenny|michelle|emma|libby|sonia|natasha|sara|joanna|salli|kimberly|ivy|kendra|nicky|hazel|female|google us english|google uk english female|clara|ana\b|nora|sonia|jane|aurora|amy|olivia|ashley|cora|elizabeth|ella|evelyn/i;
  const MALE = /david|mark|guy|daniel|alex\b|fred|tom\b|oliver|arthur|ryan|eric|christopher|roger|steffan|brian|george|james|william|male|thomas|aaron|rishi|gordon|lee\b|liam|andrew|brandon|davis|jason|tony/i;
  const NOVELTY = /albert|bad news|bells|boing|bubbles|cellos|jester|organ|trinoids|whisper|zarvox|wobble|superstar|bahh|junior|ralph|good news|hysterical|deranged|pipe organ|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/i;
  function voiceScore(v) {
    let sc = 0;
    if (/natural|neural|online|premium|enhanced/i.test(v.name)) sc += 40;
    if (/google/i.test(v.name)) sc += 25;
    if (FEMALE.test(v.name)) sc += 30;
    if (MALE.test(v.name) && !/female/i.test(v.name)) sc -= 60;
    if (NOVELTY.test(v.name)) sc -= 200;
    if (/en[-_]US/i.test(v.lang)) sc += 6; else if (/en[-_]GB/i.test(v.lang)) sc += 4;
    if (!v.localService) sc += 5;
    return sc;
  }
  function englishVoices() {
    if (!ttsOK) return [];
    return speechSynthesis.getVoices().filter(v => /^en(-|_|$)/i.test(v.lang)).sort((a, b) => voiceScore(b) - voiceScore(a));
  }
  function pickVoice() {
    const vs = englishVoices();
    const want = S && S.settings && S.settings.voice;
    voice = (want && vs.find(v => v.name === want)) || vs[0] || null;
  }
  if (ttsOK) { speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text, slow) {
    if (!ttsOK || !S.settings.tts) return false;
    if (!voice || (S.settings.voice && voice.name !== S.settings.voice)) pickVoice();
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice ? voice.lang : 'en-US'; if (voice) u.voice = voice;
      const base = (S.settings.rate || 0.95);
      u.rate = slow ? base * 0.6 : base; u.pitch = 1.05;
      speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canListen = () => ttsOK && S.settings.tts;
  const canSpeak = () => !!SR && S.settings.speak;

  /* ---------- Maskot: Asi (büyüteç) ---------- */
  function mascot(mood = 'happy', size = 120, extra = '') {
    const eye = {
      happy: '<path d="M38 50 Q50 36 62 50" stroke="#1d1b16" stroke-width="6" fill="none" stroke-linecap="round"/>',
      wow: '<circle cx="50" cy="48" r="15" fill="#1d1b16"/><circle cx="55" cy="42" r="5" fill="#fff"/><circle cx="45" cy="53" r="2.5" fill="#fff"/>',
      think: '<circle cx="54" cy="46" r="11" fill="#1d1b16"/><circle cx="58" cy="42" r="4" fill="#fff"/><path d="M38 33 L60 30" stroke="#1d1b16" stroke-width="4" stroke-linecap="round"/>',
      sad: '<circle cx="50" cy="52" r="11" fill="#1d1b16"/><circle cx="54" cy="48" r="4" fill="#fff"/><path d="M36 38 L60 33" stroke="#1d1b16" stroke-width="4" stroke-linecap="round"/><path d="M66 58 q3 7 0 10 q-3-3 0-10z" fill="#5fb6ef"/>',
      wink: '<circle cx="50" cy="48" r="12" fill="#1d1b16"/><circle cx="54" cy="44" r="4" fill="#fff"/>'
    }[mood] || '';
    const mouth = mood === 'sad' ? '<path d="M42 72 Q50 66 58 72" stroke="#1d1b16" stroke-width="4" fill="none" stroke-linecap="round"/>'
      : mood === 'wow' ? '<ellipse cx="50" cy="72" rx="5" ry="6" fill="#1d1b16"/>'
        : '<path d="M40 66 Q50 78 60 66" stroke="#1d1b16" stroke-width="4" fill="#f59ab0" stroke-linecap="round"/>';
    return `<svg class="mascot ${extra}" width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
      <ellipse cx="60" cy="114" rx="34" ry="4" fill="rgba(0,0,0,.08)"/>
      <g transform="rotate(42 86 86)"><rect x="78" y="78" width="16" height="40" rx="8" fill="#1f4fae"/><rect x="78" y="78" width="16" height="10" rx="4" fill="#f5b100"/></g>
      <circle cx="50" cy="52" r="40" fill="#fff" stroke="#2f6fde" stroke-width="10"/>
      <path d="M22 40 A30 30 0 0 1 40 20" stroke="#cfe7ff" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${eye}
      <circle cx="30" cy="64" r="5" fill="#f9b4a6"/><circle cx="70" cy="64" r="5" fill="#f9b4a6"/>
      ${mouth}
      <path d="M12 70 q-10 6 -6 16" stroke="#2f6fde" stroke-width="6" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  /* ---------- Arayüz yardımcıları ---------- */
  let toastT;
  function toast(t, ms = 2400) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), ms); }
  function flushNotices() { if (!pendingNotices.length) return; const list = pendingNotices; pendingNotices = []; list.forEach((t, i) => setTimeout(() => toast(t), i * 2600)); }
  function modal(html, onBind) {
    const m = $('#modal');
    m.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' + html + '</div>';
    m.hidden = false;
    const close = () => { m.hidden = true; m.innerHTML = ''; };
    m.onclick = e => { if (e.target === m) close(); };
    if (onBind) onBind(m.firstChild, close);
    const f = m.querySelector('button'); if (f) f.focus();
    return close;
  }
  function confetti(n = 80) {
    const box = document.createElement('div'); box.className = 'confetti';
    const cols = ['#2f6fde', '#f5b100', '#1aa060', '#7c5ce0', '#0e9f9a', '#ff9f43'];
    for (let i = 0; i < n; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = cols[i % cols.length];
      p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
      p.style.setProperty('--rot', (Math.random() * 900 - 450) + 'deg');
      p.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
      p.style.animationDelay = Math.random() * .4 + 's';
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3800);
  }
  /* Mikrofon ilk kez kullanılmadan önce açık bilgilendirme ve onay */
  function micConsent(cb) {
    modal(`<div class="em">🎙️</div><h2>Mikrofon kullanımı</h2><p>Konuşma soruları için tarayıcının ses tanıma hizmeti kullanılır. Chrome'da sesin metne çevrilmek üzere Google'ın sunucularına gönderilir. ASİ Dil sesini kaydetmez ve saklamaz.</p><p class="small">İstemezsen mikrofonu kullanmadan yazarak devam edebilir ya da konuşma sorularını Ayarlar'dan kapatabilirsin.</p>
      <button class="btn block" data-a="yes">Anladım, mikrofonu kullan</button><button class="btn ghost block" data-a="no">Vazgeç</button>`, (m, c) => {
      m.querySelector('[data-a=no]').onclick = c;
      m.querySelector('[data-a=yes]').onclick = () => { S.settings.micOk = true; save(); c(); cb(); };
    });
  }
  function fmtTime(ms) { const s = Math.ceil(ms / 1000); const m = Math.floor(s / 60); return m >= 60 ? Math.floor(m / 60) + ' sa ' + (m % 60) + ' dk' : m + ':' + pad(s % 60); }

  window.Q = {
    $, $$, esc, dayKey, parseDay, diffDays, addDays, weekKey, DAYS_TR, hash, rng, rand, pick, shuffle, sample,
    C, LEVELS, UNIT_COLORS, NODES, ALL_WORDS, LIB, LIB_WORDS, learnIds, vocab, C1_WORDS, VOCAB_STEPS, ALL_SENTS, wordById, sentById, wordByEn,
    get S() { return S; }, load, save, reset, tick, notice, flushNotices, MAX_HEARTS, HEART_MS,
    heartsUnlimited, nextHeartIn, loseHeart, addXP, todayXP, extendStreak, streakActiveToday,
    TIERS, leagueBoard, weekFrac, ensureQuests, questInfo, bump, questsReady, ACH, checkAchievements,
    nodeDone, currentIndex, sectionDone, currentSection, checkCerts, completeSection, learnWords, unlockedSentences,
    norm, judge, lev, sfx, speak, englishVoices, pickVoice, currentVoice: () => voice, ttsOK, SR, canListen, canSpeak, mascot, toast, modal, confetti, fmtTime, micConsent
  };
})();
