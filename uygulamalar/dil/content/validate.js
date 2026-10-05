// Kullanım: node validate.js a1_1.js [a1_2.js ...]  — içerik dosyalarını kontrol eder
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = { window: {} }; vm.createContext(ctx);
let errors = 0, words = 0, sents = 0, warns = 0;
const err = m => { errors++; console.log('HATA: ' + m); };
const seen = new Map();
for (const f of process.argv.slice(2)) {
  vm.runInContext(fs.readFileSync(path.resolve(f), 'utf8'), ctx, { filename: f });
}
const parts = ctx.window.COURSE_PARTS || {};
for (const [key, units] of Object.entries(parts)) {
  if (!Array.isArray(units)) { err(key + ' dizi değil'); continue; }
  units.forEach((u, ui) => {
    const at = `${key} ünite ${ui + 1} (${u.title})`;
    for (const k of ['title', 'desc', 'cefr']) if (typeof u[k] !== 'string' || !u[k]) err(at + ' eksik ' + k);
    if (!Array.isArray(u.guide) || u.guide.length < 2) err(at + ' guide en az 2 madde');
    (u.guide || []).forEach((g, i) => { if (!g.h || !g.p || !Array.isArray(g.ex) || g.ex.length < 2 || g.ex.some(e => !Array.isArray(e) || e.length !== 2)) err(at + ' guide[' + i + '] biçimi'); });
    const s = u.story;
    if (!s || !s.title || !Array.isArray(s.lines) || s.lines.length < 8) err(at + ' story en az 8 satır');
    else {
      s.lines.forEach((l, i) => { if (!Array.isArray(l) || l.length !== 3 || l.some(x => typeof x !== 'string' || !x)) err(at + ' story satır ' + i); });
      if (!Array.isArray(s.questions) || s.questions.length < 3) err(at + ' story en az 3 soru');
      (s.questions || []).forEach((q, i) => {
        if (typeof q.q !== 'string' || !Array.isArray(q.options) || q.options.length < 3 || !(q.answer >= 0 && q.answer < q.options.length) || !(q.after >= 0 && q.after < s.lines.length)) err(at + ' story soru ' + i + ' biçimi');
      });
    }
    if (!Array.isArray(u.extra) || u.extra.length < 25) err(at + ' extra en az 25 kelime (şu an ' + (u.extra || []).length + ')');
    const chkWord = (w, where) => {
      if (!Array.isArray(w) || w.length !== 3 || typeof w[0] !== 'string' || typeof w[1] !== 'string' || typeof w[2] !== 'string' || !w[0] || !w[1]) return err(where + ' kelime biçimi ' + JSON.stringify(w));
      const k = w[0].toLowerCase().trim();
      if (seen.has(k)) { const first = seen.get(k); if (first.startsWith(key + ' ')) err(where + ' tekrar eden kelime "' + w[0] + '" (ilk: ' + first + ')'); else warns++; } else seen.set(k, where);
      words++;
    };
    (u.extra || []).forEach(w => chkWord(w, at + ' extra'));
    if (!Array.isArray(u.lessons) || u.lessons.length !== 5) err(at + ' tam 5 ders olmalı');
    (u.lessons || []).forEach((l, li) => {
      const la = at + ' ders ' + (li + 1) + ' (' + l.title + ')';
      if (!l.title || !l.icon) err(la + ' title/icon');
      if (!Array.isArray(l.words) || l.words.length < 8) err(la + ' en az 8 kelime');
      (l.words || []).forEach(w => chkWord(w, la));
      if (!Array.isArray(l.sentences) || l.sentences.length < 6) err(la + ' en az 6 cümle');
      (l.sentences || []).forEach((x, si) => {
        const sa = la + ' cümle ' + si;
        if (!Array.isArray(x) || x.length < 2 || typeof x[0] !== 'string' || typeof x[1] !== 'string') return err(sa + ' biçim');
        if (x[2] !== undefined && !Array.isArray(x[2])) err(sa + ' en alternatifleri dizi olmalı');
        if (x[3] !== undefined && !Array.isArray(x[3])) err(sa + ' tr alternatifleri dizi olmalı');
        for (const t of [x[0], x[1]].concat(x[2] || [], x[3] || [])) if (/[;:"()\[\]{}…]/.test(t)) err(sa + ' yasak noktalama: ' + t);
        if (x[0].split(/\s+/).length > 18) err(sa + ' İngilizce cümle 18 kelimeden uzun');
        if (x[1].split(/\s+/).length > 14) err(sa + ' Türkçe cümle 14 kelimeden uzun');
        sents++;
      });
    });
  });
}
console.log(`\n${Object.keys(parts).join(', ')} → ${words} kelime, ${sents} cümle, ${errors} hata, ${warns} dosyalar arası tekrar (derleyicide ayıklanır)`);
process.exit(errors ? 1 : 0);
