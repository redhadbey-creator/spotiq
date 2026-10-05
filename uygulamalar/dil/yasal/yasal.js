/* Yasal sayfalarda [data-k] alanlarını ayarlar.js'ten doldurur */
(function () {
  var L = window.ASI_LEGAL || {};
  try { var t = JSON.parse(localStorage.getItem('spotiq-dil-v1') || '{}').settings; if (t && t.theme && t.theme !== 'auto') document.documentElement.setAttribute('data-theme', t.theme); } catch (e) { }
  document.querySelectorAll('[data-k]').forEach(function (el) {
    var v = L[el.getAttribute('data-k')];
    if (v === undefined || v === '') { el.textContent = '—'; return; }
    el.textContent = String(v);
    if (/^\[.*\]$/.test(String(v))) el.classList.add('todo');
  });
  document.querySelectorAll('[data-if="abroad"]').forEach(function (el) { el.hidden = !L.abroad; });
  document.querySelectorAll('[data-if="local"]').forEach(function (el) { el.hidden = !!L.abroad; });
  document.querySelectorAll('[data-if="kep"]').forEach(function (el) { el.hidden = !L.kep; });
})();
