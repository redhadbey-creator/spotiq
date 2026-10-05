/* ASİ Dil — isteğe bağlı hesap (KVKK uyumlu akış)
 *
 * Ekranlar, onaylar, veri indirme ve hesap silme burada hazırdır. Gerçek sunucuya bağlamak için
 * sayfada bu dosyadan ÖNCE window.ASI_AUTH_BACKEND tanımlanır; aynı yöntemleri sağlaması yeterlidir:
 *   signUp({email, password, consents}) → {email, created}
 *   signIn({email, password})           → {email, created}
 *   signOut()
 *   resetPassword(email)
 *   deleteAccount()                     → sunucudaki hesap ve ilerleme verisini siler
 *   exportData()                        → sunucuda tutulan bütün veriler (KVKK md. 11)
 *   saveProgress(state)                 → ilerlemeyi hesaba kaydeder (eşitleme)
 *   loadProgress()                      → hesaptaki ilerleme (yoksa null)
 *   session()                           → açık oturum {email, created} ya da null
 * İsteğe bağlı alanlar: ready (Promise, oturum hazır olunca çözülür), idField ('email' | 'name'),
 *   minPassword (sayı), noReset (true ise "şifremi unuttum" gizlenir), resetHint (metin),
 *   deleteNeedsPassword (true ise silmeden önce şifre sorulur), signOutNote (metin).
 * Tanımlı değilse DEMO bağlantı kullanılır: hiçbir şey sunucuya gitmez, hesap yalnızca bu cihazda tutulur.
 */
(function () {
  'use strict';
  const { $, esc } = Q;
  const LEGAL = window.ASI_LEGAL_PATH || 'yasal/';

  /* ---------- DEMO bağlantı (sunucusuz) ---------- */
  const DKEY = 'asi-dil-demo-accounts', SKEY = 'asi-dil-demo-session';
  const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };
  async function digest(s) {
    try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join(''); }
    catch (e) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return 'x' + h; }
  }
  const Demo = {
    demo: true,
    async signUp({ email, password, consents }) {
      const acc = read(DKEY, {});
      if (acc[email]) throw new Error('Bu e-posta ile zaten bir hesap var. Giriş yapmayı dene.');
      acc[email] = { email, created: new Date().toISOString(), pw: await digest(email + ':' + password), consents, progress: null };
      write(DKEY, acc); write(SKEY, { email });
      return { email, uid: email, created: acc[email].created };
    },
    async signIn({ email, password }) {
      const a = read(DKEY, {})[email];
      if (!a || a.pw !== await digest(email + ':' + password)) throw new Error('E-posta veya şifre hatalı.');
      write(SKEY, { email }); return { email, uid: email, created: a.created };
    },
    async signOut() { try { localStorage.removeItem(SKEY); } catch (e) { } },
    async resetPassword() { return { demo: true }; },
    async changePassword(old, nw) { const s = read(SKEY, null); const acc = read(DKEY, {}); const a = s && acc[s.email]; if (!a) throw new Error('Oturum bulunamadı.'); if (a.pw !== await digest(s.email + ':' + old)) throw new Error('Mevcut şifre yanlış.'); a.pw = await digest(s.email + ':' + nw); write(DKEY, acc); },
    async deleteAccount() { const s = read(SKEY, null); const acc = read(DKEY, {}); if (s) delete acc[s.email]; write(DKEY, acc); await this.signOut(); },
    async exportData() { const s = read(SKEY, null); const a = s && read(DKEY, {})[s.email]; if (!a) return null; const { pw, ...rest } = a; return rest; },
    async saveProgress(state) { const s = read(SKEY, null); if (!s) return; const acc = read(DKEY, {}); if (acc[s.email]) { acc[s.email].progress = state; write(DKEY, acc); } },
    async loadProgress() { const s = read(SKEY, null); const a = s && read(DKEY, {})[s.email]; return a ? a.progress : null; },
    session() { const s = read(SKEY, null); const a = s && read(DKEY, {})[s.email]; return a ? { email: a.email, uid: a.email, created: a.created } : null; }
  };
  const B = window.ASI_AUTH_BACKEND || Demo;

  const byName = B.idField === 'name';
  const MINPW = Math.max(8, B.minPassword || 8);
  const REQUIRE = !!window.ASI_REQUIRE_LOGIN;                                 // true: misafir yok, giriş zorunlu
  /* Klasik şifre kuralları */
  const PW_RULES = [
    [p => p.length >= MINPW, 'En az ' + MINPW + ' karakter'],
    [p => /[A-ZÇĞİÖŞÜ]/.test(p), 'En az bir büyük harf'],
    [p => /[a-zçğıöşü]/.test(p), 'En az bir küçük harf'],
    [p => /\d/.test(p), 'En az bir rakam']
  ];
  const pwMissing = p => PW_RULES.filter(r => !r[0](p)).map(r => r[1]);
  const pwList = () => `<ul class="pw-rules">${PW_RULES.map((r, i) => `<li data-r="${i}">${r[1]}</li>`).join('')}</ul>`;
  function pwLive(input, list) { const up = () => PW_RULES.forEach((r, i) => list.querySelector(`[data-r="${i}"]`).classList.toggle('ok', r[0](input.value))); input.addEventListener('input', up); up(); }
  function lock(on) { const w = $('#modal'); if (on) { w.onclick = null; w.dataset.lock = '1'; } else delete w.dataset.lock; }
  let current = null;
  try { current = B.ready ? null : B.session(); } catch (e) { current = null; }
  /* Cihazdaki ilerleme hangi hesaba ait? (S.owner) Ortak cihazda hesaplar birbirine karışmasın. */
  const idOf = c => c ? (c.uid || c.email) : null;
  function adopt(remote, owner) {
    const base = remote && remote.v ? remote : null;
    if (base) { try { localStorage.setItem('spotiq-dil-v1', JSON.stringify(Object.assign({}, base, { owner }))); } catch (e) { } Q.load(); }
    else { Q.reset(); Q.S.owner = owner; Q.save(); }
  }
  /* Giriş yapılınca: hesaptaki ilerlemeyle cihazdakini birleştir */
  async function syncFor(c) {
    const id = idOf(c), local = Q.S;
    let remote = null; try { remote = await B.loadProgress(); } catch (e) { }
    if (local.owner && local.owner !== id) return adopt(remote, id);          // başka hesabın verisi: karıştırma
    if (remote && remote.v && (!local.onboarded || (remote.xp || 0) > (local.xp || 0))) return adopt(remote, id);
    local.owner = id; Q.save();                                              // misafir ilerlemesi hesaba taşınır
    try { await B.saveProgress(local); } catch (e) { }
  }
  /* Çıkışta: ilerleme hesapta güvende, cihazda başkası görmesin diye cihazdaki kopya temizlenir */
  function clearLocal() { Q.reset(); }
  if (B.ready) Promise.resolve(B.ready).then(async () => {
    try { current = await B.session(); } catch (e) { current = null; }
    if (current) await syncFor(current);
    else if (Q.S.owner) clearLocal();                                         // hesaptan başka yerde çıkılmış
    if (window.App) App.afterAuth();
    if (!current && REQUIRE) open('login');
  });
  else {
    const s0 = Q.S || Q.load();                                                 // uygulama verisi henüz yüklenmediyse yükle
    if (current) { if (s0.owner && s0.owner !== idOf(current)) adopt(null, idOf(current)); }
    else if (s0.owner) clearLocal();
    if (!current && REQUIRE) setTimeout(() => open('login'), 0);
  }
  /* Sayfa kapanırken bekleyen kaydı hemen gönder */
  window.addEventListener('pagehide', () => { if (current && saveT) { clearTimeout(saveT); saveT = null; Promise.resolve(B.saveProgress(Q.S)).catch(() => { }); } });

  /* İlerleme değiştikçe hesaba kaydet (yalnızca giriş yapılmışsa) */
  let saveT = null;
  function onSave(state) {
    if (!current) return;
    clearTimeout(saveT);
    if (state.owner && state.owner !== idOf(current)) return;
    saveT = setTimeout(() => { saveT = null; Promise.resolve(B.saveProgress(state)).catch(() => { }); }, 1500);
  }

  /* ---------- Ekranlar ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const validId = v => byName ? v.replace(/[^a-z0-9]/gi, '').length >= 2 : EMAIL_RE.test(v);
  const ID_LABEL = byName ? 'Kullanıcı adı' : 'E-posta';
  function legalLinks() {
    return `<a href="${LEGAL}aydinlatma.html" target="_blank" rel="noopener">Aydınlatma Metni</a>`;
  }
  function open(mode) {
    const signup = mode !== 'login';
    Q.modal(`<div class="em">${signup ? '🗝️' : '👋'}</div><h2>${signup ? 'Hesap oluştur' : 'Giriş yap'}</h2>
      <p class="small">${signup ? (REQUIRE ? 'Devam etmek için bir hesap oluştur. İlerlemen hesabına kaydedilir, her cihazda kaldığın yerden devam edersin.' : 'Hesap isteğe bağlıdır. İlerlemen hesabına kaydedilir ve başka cihazlarda da devam edebilirsin.') : 'Hesabına giriş yap, kaldığın yerden devam et.'}</p>
      ${B.demo ? '<p class="demo-note">Önizleme modu: Hesap henüz bir sunucuya bağlı değil, yalnızca bu cihazda tutulur.</p>' : ''}
      <form id="auth-f" class="auth-f" novalidate>
        <label for="auth-email">${ID_LABEL}</label><input id="auth-email" type="${byName ? 'text' : 'email'}" autocomplete="${byName ? 'username' : 'email'}" required>
        ${byName && signup ? '<p class="small muted" style="text-align:left;margin:-4px 0 6px">Gerçek adını yazmak zorunda değilsin; bir takma ad yeterli. Adın ve puanın sıralamada diğer kullanıcılara görünür.</p>' : ''}
        <label for="auth-pw">Şifre</label><input id="auth-pw" type="password" autocomplete="${signup ? 'new-password' : 'current-password'}" minlength="${MINPW}" required>
        ${signup ? `${pwList()}
        <label class="chk"><input type="checkbox" id="c-kvkk"> <span>${legalLinks()}'ni okudum, kişisel verilerimin nasıl işleneceği hakkında bilgilendirildim.</span></label>
        <label class="chk"><input type="checkbox" id="c-terms"> <span><a href="${LEGAL}kosullar.html" target="_blank" rel="noopener">Kullanım Koşulları</a>'nı kabul ediyorum.</span></label>
        <label class="chk"><input type="checkbox" id="c-age"> <span>18 yaşından büyüğüm ya da velimin/vasimin onayı var.</span></label>` : ''}
        <p class="auth-err" id="auth-err" role="alert" hidden></p>
        <button class="btn block" type="submit">${signup ? 'Hesabı oluştur' : 'Giriş yap'}</button>
      </form>
      ${signup ? '<button class="btn text" data-a="swap">Zaten hesabım var, giriş yap</button>' : `${B.noReset ? (B.resetHint ? `<p class="small muted">${esc(B.resetHint)}</p>` : '') : '<button class="btn text" data-a="forgot">Şifremi unuttum</button>'}<button class="btn text" data-a="swap">Hesabım yok, oluştur</button>`}
      ${REQUIRE ? '' : '<button class="btn ghost block" data-a="guest">Misafir olarak devam et</button>'}`, (m, close) => {
      lock(REQUIRE);
      const f = m.querySelector('#auth-f'), err = m.querySelector('#auth-err');
      const fail = t => { err.textContent = t; err.hidden = false; };
      m.querySelector('#auth-email').focus();
      const gb = m.querySelector('[data-a=guest]'); if (gb) gb.onclick = close;
      if (signup) pwLive(m.querySelector('#auth-pw'), m.querySelector('.pw-rules'));
      m.querySelector('[data-a=swap]').onclick = () => { close(); open(signup ? 'login' : 'signup'); };
      const fg = m.querySelector('[data-a=forgot]');
      if (fg) fg.onclick = async () => {
        const email = m.querySelector('#auth-email').value.trim().toLowerCase();
        if (!EMAIL_RE.test(email)) return fail('Şifre sıfırlama bağlantısı için önce e-posta adresini yaz.');
        const r = await Promise.resolve(B.resetPassword(email)).catch(() => null);
        Q.toast(r && r.demo ? 'Önizleme modunda e-posta gönderilmez.' : 'Hesap varsa sıfırlama bağlantısı e-postana gönderildi.');
      };
      f.onsubmit = async e => {
        e.preventDefault(); err.hidden = true;
        const raw = m.querySelector('#auth-email').value.trim();
        const email = byName ? raw : raw.toLowerCase();
        const password = m.querySelector('#auth-pw').value;
        if (!validId(email)) return fail(byName ? 'Kullanıcı adı en az 2 harf veya rakam içermeli.' : 'Geçerli bir e-posta adresi yaz.');
        if (signup) {
          const miss = pwMissing(password); if (miss.length) return fail('Şifre kuralları: ' + miss.join(', ').toLocaleLowerCase('tr') + '.');
          if (!m.querySelector('#c-kvkk').checked) return fail('Devam etmek için Aydınlatma Metni\'ni okuduğunu onayla.');
          if (!m.querySelector('#c-terms').checked) return fail('Devam etmek için Kullanım Koşulları\'nı kabul et.');
          if (!m.querySelector('#c-age').checked) return fail('Hesap açmak için 18 yaşından büyük olmalı ya da velinin onayını almalısın. Dilersen misafir olarak devam edebilirsin.');
        } else if (!password) return fail('Şifreni yaz.');
        const btn = f.querySelector('[type=submit]'); btn.disabled = true;
        try {
          const now = new Date().toISOString();
          const consents = { aydinlatma: now, kosullar: now, yas: now, metinSurumu: (window.ASI_LEGAL || {}).updated || '' };
          current = signup ? await B.signUp({ email, password, consents }) : await B.signIn({ email, password });
          await syncFor(current);
          lock(false); close(); Q.sfx('coin'); Q.toast(signup ? '🎉 Hesabın oluşturuldu!' : '👋 Tekrar hoş geldin!'); App.afterAuth();
        } catch (ex) { btn.disabled = false; fail(ex && ex.message ? ex.message : 'Bir sorun oldu, tekrar dene.'); }
      };
    });
  }

  function exportData() {
    Promise.resolve(B.exportData()).then(server => {
      const data = { aciklama: 'ASİ Dil hesabında ve bu cihazda tutulan verilerin kopyası (KVKK md. 11).', olusturma: new Date().toISOString(), hesap: server, cihazdakiIlerleme: Q.S };
      const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'asi-dil-verilerim-' + Q.dayKey() + '.json'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }).catch(() => Q.toast('Veriler alınamadı, tekrar dene.'));
  }
  function signOut() {
    const flush = current ? Promise.resolve(B.saveProgress(Q.S)).catch(() => { }) : Promise.resolve();
    flush.then(() => B.signOut()).finally(() => { current = null; clearLocal(); Q.toast(B.signOutNote || 'Çıkış yaptın. İlerlemen hesabında güvende; tekrar giriş yapınca geri gelir.'); App.afterAuth(); if (REQUIRE) open('login'); });
  }
  function deleteAsk() {
    Q.modal(`<div class="em">⚠️</div><h2>Hesabını sil</h2><p>Hesabın ve hesabına kayıtlı bütün ilerleme verilerin kalıcı olarak silinir. Bu işlem geri alınamaz.</p>
      <label class="chk" style="justify-content:center"><input type="checkbox" id="del-local"> <span>Bu cihazdaki ilerlemeyi de sil</span></label>
      ${B.deleteNeedsPassword ? '<label for="del-pw" class="small">Güvenlik için şifren</label><input id="del-pw" type="password" class="auth-in" autocomplete="current-password">' : ''}
      <label for="del-confirm" class="small">Onaylamak için <b>SİL</b> yaz</label><input id="del-confirm" class="auth-in" autocomplete="off">
      <button class="btn bad block" data-a="del" disabled>Hesabımı kalıcı olarak sil</button><button class="btn ghost block" data-a="no">Vazgeç</button>`, (m, close) => {
      const inp = m.querySelector('#del-confirm'), del = m.querySelector('[data-a=del]');
      inp.oninput = () => { del.disabled = inp.value.trim().toLocaleUpperCase('tr') !== 'SİL'; };
      m.querySelector('[data-a=no]').onclick = close;
      del.onclick = async () => {
        del.disabled = true;
        try {
          const pwEl = m.querySelector('#del-pw');
          await B.deleteAccount(pwEl ? pwEl.value : undefined);
          current = null;
          if (m.querySelector('#del-local').checked) { Q.reset(); } else { Q.S.owner = null; Q.save(); }
          close(); Q.toast('Hesabın silindi.'); App.render(); if (REQUIRE) open('signup');
        } catch (e) { del.disabled = false; Q.toast(e && e.message ? e.message : 'Hesap silinemedi, tekrar dene ya da bize yaz.'); }
      };
    });
  }

  function changePassword() {
    Q.modal(`<div class="em">🔑</div><h2>Şifreni değiştir</h2>
      <form id="pw-f" class="auth-f" novalidate>
        <label for="pw-old">Mevcut şifre</label><input id="pw-old" type="password" autocomplete="current-password" required>
        <label for="pw-new">Yeni şifre</label><input id="pw-new" type="password" autocomplete="new-password" required>
        ${pwList()}
        <label for="pw-new2">Yeni şifre (tekrar)</label><input id="pw-new2" type="password" autocomplete="new-password" required>
        <p class="auth-err" id="pw-err" role="alert" hidden></p>
        <button class="btn block" type="submit">Şifreyi değiştir</button>
      </form><button class="btn ghost block" data-a="no">Vazgeç</button>`, (m, close) => {
      const err = m.querySelector('#pw-err'), fail = t => { err.textContent = t; err.hidden = false; };
      pwLive(m.querySelector('#pw-new'), m.querySelector('.pw-rules'));
      m.querySelector('#pw-old').focus();
      m.querySelector('[data-a=no]').onclick = close;
      m.querySelector('#pw-f').onsubmit = async e => {
        e.preventDefault(); err.hidden = true;
        const old = m.querySelector('#pw-old').value, nw = m.querySelector('#pw-new').value, nw2 = m.querySelector('#pw-new2').value;
        if (!old) return fail('Mevcut şifreni yaz.');
        const miss = pwMissing(nw); if (miss.length) return fail('Yeni şifre kuralları: ' + miss.join(', ').toLocaleLowerCase('tr') + '.');
        if (nw !== nw2) return fail('Yeni şifreler eşleşmiyor.');
        if (nw === old) return fail('Yeni şifre eskisinden farklı olmalı.');
        const btn = m.querySelector('[type=submit]'); btn.disabled = true;
        try { await B.changePassword(old, nw); close(); Q.sfx('coin'); Q.toast('🔑 Şifren değiştirildi.'); }
        catch (ex) { btn.disabled = false; fail(ex && ex.message ? ex.message : 'Şifre değiştirilemedi.'); }
      };
    });
  }

  /* Profil sayfasındaki hesap kutusu */
  function box() {
    if (!current) return `<div class="box acct"><div class="acct-top"><span class="acct-ic">👤</span><div><b>Misafir olarak kullanıyorsun</b><p class="small soft">İlerlemen yalnızca bu cihazda. Hesap açarsan telefon ve bilgisayar arasında devam edebilirsin. Hesap isteğe bağlıdır.</p></div></div>
      <div class="acct-btns"><button class="btn sm" data-acct="signup">Hesap oluştur</button><button class="btn ghost sm" data-acct="login">Giriş yap</button></div></div>`;
    const d = current.created ? new Date(current.created).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    return `<div class="box acct"><div class="acct-top"><span class="acct-ic">✅</span><div style="min-width:0"><b class="acct-mail">${esc(current.email)}</b>${B.signOutNote ? `<p class="small muted">${esc(B.accountNote || '')}</p>` : ''}<p class="small soft">${d ? d + ' tarihinde oluşturuldu · ' : ''}İlerlemen hesabına kaydediliyor.${B.demo ? ' (Önizleme modu)' : ''}</p></div></div>
      <div class="acct-btns"><button class="btn ghost sm" data-acct="password">🔑 Şifreni değiştir</button><button class="btn ghost sm" data-acct="logout">🚪 Çıkış yap</button></div>
      <div class="acct-btns"><button class="btn ghost sm" data-acct="export">📥 Verilerimi indir</button><button class="btn bad sm" data-acct="delete">Hesabımı sil</button></div>
      <p class="small muted" style="margin-top:10px">KVKK kapsamındaki hakların için <a href="${LEGAL}aydinlatma.html" target="_blank" rel="noopener">Aydınlatma Metni</a>'ne bakabilirsin.</p></div>`;
  }
  function click(k) {
    if (k === 'signup' || k === 'login') return open(k);
    if (k === 'export') return exportData();
    if (k === 'password') return changePassword();
    if (k === 'logout') return signOut();
    if (k === 'delete') return deleteAsk();
  }

  window.Account = { open, box, click, onSave, get current() { return current; }, get demo() { return !!B.demo; } };
})();
