<?php
/* Scripts de la home y de about.php (rama rediseno-baraja-2026-11).
   Como js.php pero sin el panel FX (background-controls) ni los depuradores:
   fluido (cursor) + imán + pisos (swiperNew) + baraja + intro. */
$assetVersion = static function (string $relativePath): string {
    $fullPath = dirname(__DIR__) . '/' . ltrim($relativePath, '/');
    return is_file($fullPath) ? (string) filemtime($fullPath) : '1';
};
?>

<canvas id="c--fluid"></canvas>

<script>
	(function () {
		var hasMatchMedia = typeof window.matchMedia === 'function';
		var hasFinePointer = hasMatchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false;
		var prefersReducedMotion = hasMatchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
		if (prefersReducedMotion) {
			document.documentElement.classList.add('no-fluid-mobile');
			return;
		}
		var fluidScript = document.createElement('script');
		var useDesktopFluid = hasFinePointer && window.innerWidth > 1280;
		fluidScript.src = useDesktopFluid
			? '/js/fluid.js?v=<?php echo $assetVersion('js/fluid.js'); ?>'
			: '/js/fluidMobile.js?v=<?php echo $assetVersion('js/fluidMobile.js'); ?>';
		document.head.appendChild(fluidScript);
	})();
</script>

<script src="/js/vendor/magnet-mouse.min.js?v=<?php echo $assetVersion('js/vendor/magnet-mouse.min.js'); ?>"></script>
<script src="/js/magnet.js?v=<?php echo $assetVersion('js/magnet.js'); ?>"></script>
<script src="/js/active.js?v=<?php echo $assetVersion('js/active.js'); ?>"></script>

<script src="/js/swiper/swiper-bundle.min.js?v=<?php echo $assetVersion('js/swiper/swiper-bundle.min.js'); ?>"></script>
<script src="/js/swiper/swiperNew.js?v=<?php echo $assetVersion('js/swiper/swiperNew.js'); ?>"></script>

<script src="/js/tema.js?v=<?php echo $assetVersion('js/tema.js'); ?>"></script>
<script src="/js/intro.js?v=<?php echo $assetVersion('js/intro.js'); ?>"></script>
<script src="/js/baraja.js?v=<?php echo $assetVersion('js/baraja.js'); ?>"></script>
