// node validate2.js lib_1.js read_1.js ...
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = { window: {} }; vm.createContext(ctx);
for (const f of process.argv.slice(2)) vm.runInContext(fs.readFileSync(path.resolve(f), 'utf8'), ctx, { filename: f });
const W = ctx.window; let e = 0; const err = m => { e++; console.log('HATA: ' + m); };
const bad = t => /[";:()\[\]{}…]/.test(t);
const existing = new Set(fs.readFileSync(path.join(__dirname, 'existing_words.txt'), 'utf8').split('\n'));
const seen = new Set(); let nw = 0, dupE = 0;
(W.LIBRARY || []).forEach(d => {
  if (!d.id || !d.title || !d.icon || !/^(B2|C1)$/.test(d.cefr) || !d.desc) err(d.id + ' deste alanları');
  if (!Array.isArray(d.words) || d.words.length !== 110) err(d.id + ' tam 110 kelime olmalı (' + (d.words || []).length + ')');
  (d.words || []).forEach((w, i) => {
    if (!Array.isArray(w) || w.length !== 5 || w.some((x, j) => typeof x !== 'string' || (j !== 2 && !x))) return err(d.id + ' kelime ' + i + ' biçimi');
    const k = w[0].toLowerCase().trim();
    if (seen.has(k)) err(d.id + ' tekrar: ' + w[0]); seen.add(k);
    if (existing.has(k)) dupE++;
    if (bad(w[3]) || bad(w[4])) err(d.id + ' yasak karakter: ' + w[3]);
    if (!w[3].toLowerCase().includes(k.split(' ')[0])) err(d.id + ' örnek cümlede kelime yok: ' + w[0] + ' / ' + w[3]);
    nw++;
  });
});
(W.READINGS || []).forEach(r => {
  if (!r.id || !r.title || !r.trTitle || !r.cefr || !r.icon || !r.kind) err(r.id + ' okuma alanları');
  if (!Array.isArray(r.paragraphs) || r.paragraphs.length < 4) err(r.id + ' en az 4 paragraf');
  (r.paragraphs || []).forEach((p, i) => { if (!Array.isArray(p) || p.length !== 2 || !p[0] || !p[1]) err(r.id + ' paragraf ' + i); else if (bad(p[0]) || bad(p[1])) err(r.id + ' paragraf ' + i + ' yasak karakter'); });
  if (!Array.isArray(r.glossary) || r.glossary.length < 6) err(r.id + ' glossary en az 6');
  if (!Array.isArray(r.questions) || r.questions.length < 3) err(r.id + ' en az 3 soru');
  (r.questions || []).forEach((q, i) => { if (!q.q || !Array.isArray(q.options) || q.options.length < 3 || !(q.answer >= 0 && q.answer < q.options.length)) err(r.id + ' soru ' + i); });
  const words = (r.paragraphs || []).map(p => p[0]).join(' ').split(/\s+/).length;
  console.log('  ' + r.id + ' ' + r.cefr + ' ' + words + ' kelime');
});
(W.PODCASTS || []).forEach(p => {
  if (!p.id || !p.title || !p.cefr || !p.icon) err(p.id + ' podcast alanları');
  if (!Array.isArray(p.lines) || p.lines.length < 14) err(p.id + ' en az 14 satır');
  (p.lines || []).forEach((l, i) => { if (!Array.isArray(l) || l.length !== 3 || l.some(x => !x)) err(p.id + ' satır ' + i); else if (bad(l[1]) || bad(l[2])) err(p.id + ' satır ' + i + ' yasak karakter'); });
  (p.questions || []).forEach((q, i) => { if (!q.q || !Array.isArray(q.options) || q.options.length < 3 || !(q.answer >= 0 && q.answer < q.options.length) || !(q.after >= 0 && q.after < p.lines.length)) err(p.id + ' soru ' + i); });
  if (!p.questions || p.questions.length < 3) err(p.id + ' en az 3 soru');
});
(W.ROLEPLAYS || []).forEach(s => {
  if (!s.id || !s.title || !s.cefr || !s.icon || !s.situation || !s.partner) err(s.id + ' senaryo alanları');
  if (!Array.isArray(s.turns) || s.turns.length < 5) err(s.id + ' en az 5 tur');
  (s.turns || []).forEach((t, i) => { if (!t.them || !t.themTr || !t.hint || !Array.isArray(t.answers) || t.answers.length < 2 || !Array.isArray(t.keywords) || t.keywords.length < 1) err(s.id + ' tur ' + i); else if ([t.them, t.themTr].concat(t.answers).some(bad)) err(s.id + ' tur ' + i + ' yasak karakter'); });
});
console.log(`\nkütüphane ${nw} kelime (${dupE} ana kursla çakışan), okuma ${(W.READINGS || []).length}, podcast ${(W.PODCASTS || []).length}, konuşma ${(W.ROLEPLAYS || []).length} → ${e} hata`);
process.exit(e ? 1 : 0);
