/* SPOTIQ Dil — kurs derleyici (Türkçe konuşanlar için İngilizce, A1 → C1)
   İçerik content/*.js dosyalarında: window.COURSE_PARTS[anahtar] = [ünite, ...]
   Ünite: { title, desc, cefr, guide:[{h,p,ex}], story:{title,icon,lines,questions}, extra:[[en,tr,emoji]], lessons:[{title,icon,words,sentences}] } */
(function () {
  const ORDER = ['a1_1', 'a1_2', 'a2_1', 'a2_2', 'b1_1', 'b1_2', 'b2_1', 'b2_2', 'c1_1', 'c1_2'];
  const P = window.COURSE_PARTS || {};
  const COLORS = ['blue', 'green', 'teal', 'indigo', 'amber'];
  const units = [];
  ORDER.forEach(k => (P[k] || []).forEach(u => units.push(u)));
  units.forEach((u, i) => { u.color = COLORS[i % COLORS.length]; });
  const LEVELS = [
    { id: 'A1', name: 'Başlangıç', desc: 'Kendini tanıt, günlük ihtiyaçlarını karşıla', icon: '🌱' },
    { id: 'A2', name: 'Temel', desc: 'Geçmişi anlat, seyahat et, iş hayatına adım at', icon: '🌿' },
    { id: 'B1', name: 'Orta', desc: 'Deneyimlerini, fikirlerini ve planlarını anlat', icon: '🌳' },
    { id: 'B2', name: 'Orta Üstü', desc: 'Toplantı yönet, tartış, deyimleri kullan', icon: '🏔️' },
    { id: 'C1', name: 'İleri', desc: 'Akademik, profesyonel ve nüanslı İngilizce', icon: '🚀' }
  ];
  const sections = LEVELS.map(l => Object.assign({}, l, { units: [] }));
  units.forEach((u, i) => { const s = sections.find(x => x.id === u.cefr) || sections[0]; s.units.push(i); u.section = sections.indexOf(s); });
  window.COURSE = { id: 'en', name: 'İngilizce', flag: '🇬🇧', units, sections: sections.filter(s => s.units.length) };
  window.COURSE.sections.forEach((s, i) => s.units.forEach(ui => { units[ui].section = i; }));
})();

/* Kelime ipuçları için ek sözlük (cümlelerdeki küçük kelimeler) */
window.HINTS = {
  en: { i:'ben', you:'sen / siz', he:'o (erkek)', she:'o (kadın)', it:'o', we:'biz', they:'onlar', my:'benim', your:'senin', the:'(belirli tanımlık)', a:'bir', an:'bir', is:'-dir / -dır', am:'-ım', are:'-sın / -iz', and:'ve', this:'bu', very:'çok', too:'çok / fazla', in:'içinde / -de', on:'üstünde', to:'-e / -a', by:'ile', at:'-de', of:'-in', for:'için', with:'ile', what:'ne', where:'nerede', how:'nasıl', do:'(yardımcı fiil)', not:'değil', have:'sahip olmak', has:'sahip', big:'büyük', small:'küçük', happy:'mutlu', fine:'iyi', book:'kitap', cat:'kedi', cats:'kediler', tall:'uzun boylu', open:'açık / aç', every:'her', old:'yaşında / eski', years:'yıllar', like:'sevmek', love:'sevmek', go:'gitmek', new:'yeni', fast:'hızlı', want:'istemek', can:'-ebilmek', pay:'ödemek', card:'kart', turn:'dön', wait:'bekle', see:'görmek', good:'iyi', tired:'yorgun', was:'idi', seven:'yedi', days:'günler', season:'mevsim', favorite:'en sevilen', twelve:'on iki', months:'aylar', outside:'dışarıda', strong:'güçlü', sunny:'güneşli', raining:'yağmur yağıyor', get:'almak', up:'yukarı', leaves:'yapraklar', fall:'düşmek', flowers:'çiçekler', grow:'büyümek', heavy:'ağır', reservation:'rezervasyon', here:'burada', beautiful:'güzel', high:'yüksek', nine:'dokuz', take:'almak / çekmek', need:'ihtiyaç', call:'aramak', broken:'bozuk', feel:'hissetmek', me:'beni / bana', from:'-den', nice:'güzel', meet:'tanışmak', english:'İngilizce', empty:'boş', ready:'hazır', kind:'nazik', two:'iki', no:'hayır / yok', food:'yemek', chocolate:'çikolata', lemons:'limonlar', shirt:'gömlek', station:'istasyon', bank:'banka', sky:'gökyüzü', color:'renk', chairs:'sandalyeler', books:'kitaplar', there:'orada', over:'öte', closed:'kapalı', long:'uzun', walk:'yürümek', school:'okul', mom:'anne', eggs:'yumurtalar', apples:'elmalar', minutes:'dakikalar', "o'clock":'saat', "let's":'hadi ...elim', monday:'pazartesi', ali:'Ali', glass:'bardak', fresh:'taze', delicious:'lezzetli', salty:'tuzlu', how_much:'ne kadar' },
  tr: { ben:'I', sen:'you', o:'he / she / it', biz:'we', onlar:'they', bir:'a / one', ve:'and', bu:'this', çok:'very / a lot', lütfen:'please', benim:'my', senin:'your', var:'there is / have', yok:'there is no', nerede:'where', ne:'what', mi:'(soru eki)', mı:'(soru eki)', mu:'(soru eki)', mü:'(soru eki)', her:'every', hadi:'let\'s', işte:'here is', şurada:'over there', hava:'weather / air', saat:'hour / o\'clock', kaç:'how many', kedi:'cat', kitap:'book', mutlu:'happy', büyük:'big', küçük:'small', uzun:'long / tall', boylu:'tall', yeni:'new', hızlı:'fast', açık:'open', kapalı:'closed', gömlek:'shirt', istiyorum:'I want', almak:'to buy / take', güzel:'beautiful', yüksek:'high', ağır:'heavy', boş:'empty', nazik:'kind', hazır:'ready', taze:'fresh', tatlı:'sweet', sıcak:'hot', soğuk:'cold', iki:'two', üç:'three', beş:'five', on:'ten', dört:'four', yedi:'seven', gün:'day', mevsim:'season', yaz:'summer', kış:'winter', ay:'month', yıl:'year' }
};
