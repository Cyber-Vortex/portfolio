(function () {
  'use strict';

  /* ---------- Navbar: active section highlight ---------- */
  var ids = ['home', 'about', 'skills', 'projects', 'contact'];
  var ACTIVE = ['text-cyan-400', 'bg-cyan-400/10'];
  var INACTIVE_D = ['text-slate-300', 'hover:text-cyan-400', 'hover:bg-slate-800/50'];
  var INACTIVE_M = ['text-slate-300', 'hover:text-cyan-400', 'hover:bg-slate-700/50'];
  var links = document.querySelectorAll('[data-nav]');

  function setActive(id) {
    links.forEach(function (a) {
      var mobile = a.classList.contains('nav-link-m');
      var inactive = mobile ? INACTIVE_M : INACTIVE_D;
      if (a.getAttribute('data-nav') === id) {
        inactive.forEach(function (c) { a.classList.remove(c); });
        ACTIVE.forEach(function (c) { a.classList.add(c); });
      } else {
        ACTIVE.forEach(function (c) { a.classList.remove(c); });
        inactive.forEach(function (c) { a.classList.add(c); });
      }
    });
  }

  function onScroll() {
    var pos = window.scrollY + 100;
    for (var i = ids.length - 1; i >= 0; i--) {
      var el = document.getElementById(ids[i]);
      if (el && el.offsetTop <= pos) { setActive(ids[i]); break; }
    }
    var top = document.getElementById('scroll-top');
    if (top) top.classList.toggle('show', window.pageYOffset > 300);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  setActive('home');
  onScroll();

  /* ---------- Mobile menu ---------- */
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  var iconMenu = document.getElementById('icon-menu');
  var iconClose = document.getElementById('icon-close');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    iconMenu.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  document.querySelectorAll('.nav-link-m').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  /* ---------- Scroll to top ---------- */
  document.getElementById('scroll-top').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Reveal on scroll (once) ---------- */
  var targets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  /* ---------- Binary rain (hero) ---------- */
  var rain = document.querySelector('.binary-rain');
  if (rain) {
    setInterval(function () {
      var d = document.createElement('div');
      d.className = 'binary-digit';
      d.textContent = Math.random() > 0.5 ? '1' : '0';
      d.style.left = Math.random() * 100 + '%';
      d.style.animationDuration = (Math.random() * 3 + 2) + 's';
      d.style.animationDelay = Math.random() * 2 + 's';
      rain.appendChild(d);
      setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 5000);
    }, 200);
  }
})();
