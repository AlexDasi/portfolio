<?php /* v17 (Alex, 21/11: «que aparezca una flecha arriba del contenido, debajo de Alex Dasi, igual que la de abajo: un slider en
   toda regla»): flecha de subir arriba (desde el 2.º piso) y la de bajar abajo (se va en el último). js/swiper/swiperNew.js */ ?>
<div class="hiddenMobile arrow-container arrow-container--arriba" data-pisos-subir>
    <a class="circle effect" data-iman-sutil href="#" aria-label="<?php echo (isset($lang) && $lang === 'en') ? 'Previous screen' : 'Pantalla anterior'; ?>">
        <div class="arrow down"></div>
    </a>
</div>
<div class="hiddenMobile arrow-container slide-arrow slide-arrow__next">
    <a class="circle effect slideNext-btn" data-iman-sutil>
        <div class="arrow down"></div>
    </a>
</div>

<div class="hiddenDesktop arrow-container slide-arrow slide-arrow__next">
    <a class="circle effect slideNext-btn">
        <div class="arrow down"></div>
    </a>
</div>



<?php /* v18 (Alex, 21/11: «las flechas más pequeñas y el imantado que no dure tanto ni se mueva tanto, mucho más sutil»):
   fuera magnet-mouse en las flechas; aquí un imán corto (como mucho 6 px, radio 70 px, vuelve en 0,25 s). */ ?>
<script>
(function () {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var els = [].slice.call(document.querySelectorAll('[data-iman-sutil]'));
  window.addEventListener('mousemove', function (e) {
    els.forEach(function (el) {
      var r = el.getBoundingClientRect(); if (!r.width) return;
      var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2), d = Math.hypot(dx, dy);
      var k = d < 110 ? (1 - d / 110) : 0; // v19 (Alex: «el magnetismo un poco más, intermedio»): radio 110 px, hasta 14 px
      el.style.translate = k ? (Math.max(-14, Math.min(14, dx * 0.34 * k)) + 'px ' + Math.max(-14, Math.min(14, dy * 0.34 * k)) + 'px') : '';
    });
  }, { passive: true });
})();
</script>
