/* thesis.js — Masterthesis page interactions */
(function () {
  'use strict';

  /* ── Dark Mode Toggle ─────────────────────────────────────── */
  const html       = document.documentElement;
  const toggleBtn  = document.getElementById('themeToggle');
  const themeIcon  = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  const saved = localStorage.getItem('thesis-theme') || 'light';
  applyTheme(saved);

  toggleBtn.addEventListener('click', function () {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('thesis-theme', next);
  });

  function applyTheme(t) {
    html.dataset.theme    = t;
    themeIcon.textContent  = t === 'dark' ? '☀' : '☽';
    themeLabel.textContent = t === 'dark' ? 'Light' : 'Dark';
  }

  /* ── Before / After Sliders ──────────────────────────────── */
  document.querySelectorAll('[data-slider]').forEach(initSlider);

  function initSlider(wrap) {
    const beforeImg = wrap.querySelector('.slider-before');
    const handle    = wrap.querySelector('.slider-handle');
    let active = false;

    function setRatio(clientX) {
      const rect  = wrap.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0.02), 0.98);
      const right = (100 - ratio * 100).toFixed(2);
      beforeImg.style.clipPath = 'inset(0 ' + right + '% 0 0)';
      handle.style.left        = (ratio * 100).toFixed(2) + '%';
    }

    /* Mouse */
    wrap.addEventListener('mousedown', function (e) {
      active = true;
      setRatio(e.clientX);
    });
    window.addEventListener('mousemove', function (e) {
      if (active) setRatio(e.clientX);
    });
    window.addEventListener('mouseup', function () { active = false; });

    /* Touch */
    wrap.addEventListener('touchstart', function (e) {
      active = true;
      setRatio(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      if (active) setRatio(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', function () { active = false; });
  }

})();
