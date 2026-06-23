// Gooey metaball: pin the arrow target blob to the arrow circle's real,
// magnet-moved centre so the cursor blob can fuse into it under the #gooey
// filter. Desktop / fine-pointer only; runs the rAF loop only while engaged.
(function () {
  var mm = window.matchMedia;
  if (!(mm && mm('(hover: hover) and (pointer: fine)').matches)) return;

  function init() {
    var circle = document.querySelector('.MainSwiper .circle.magnet')
      || document.querySelector('.circle.magnet');
    var blob = document.querySelector('.gooey-blob--arrow');
    if (!circle || !blob) return;

    var raf = null;

    function place() {
      var r = circle.getBoundingClientRect();
      blob.style.left = (r.left + r.width / 2) + 'px';
      blob.style.top = (r.top + r.height / 2) + 'px';
    }

    function loop() {
      place();
      raf = requestAnimationFrame(loop);
    }

    new MutationObserver(function () {
      if (circle.classList.contains('magnet-mouse-active')) {
        if (!raf) loop();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }).observe(circle, { attributes: true, attributeFilter: ['class'] });

    place(); // initial resting position
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
