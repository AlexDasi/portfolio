<?php
/* Scripts de la home y de about.php (rama rediseno-baraja-2026-11).
   Como js.php pero sin el panel FX (background-controls) ni los depuradores:
   fluido (cursor) + imán + pisos (swiperNew) + baraja + intro. */
$assetVersion = static function (string $relativePath): string {
    $fullPath = dirname(__DIR__) . '/' . ltrim($relativePath, '/');
    return is_file($fullPath) ? (string) filemtime($fullPath) : '1';
};
?>

<?php /* v9 (QA H-10): las fichas no tienen pisos, flecha, baraja ni esfera: $sinSwiper quita ~200 KB de JS que competían con la portada */ ?>
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
		/* Móvil y tablet: sin fluido (feedback 95); ahí manda la esfera */
		if (!useDesktopFluid) { document.documentElement.classList.add('no-fluid-mobile'); return; }
		fluidScript.src = useDesktopFluid
			? '/js/fluid.js?v=<?php echo $assetVersion('js/fluid.js'); ?>'
			: '/js/fluidMobile.js?v=<?php echo $assetVersion('js/fluidMobile.js'); ?>';
		document.head.appendChild(fluidScript);
		/* v11 (Alex, 21/11): panel FX temporal para que Alex ajuste el fluido: solo con ?fx en la URL (no lo ve nadie más) */
		if (/[?&]fx\b/.test(location.search)) { var fx = document.createElement('script'); fx.src = '/js/background-controls.js?v=<?php echo $assetVersion('js/background-controls.js'); ?>'; document.head.appendChild(fx); }
	})();
</script>

<?php if (empty($sinSwiper)): ?><script src="/js/vendor/magnet-mouse.min.js?v=<?php echo $assetVersion('js/vendor/magnet-mouse.min.js'); ?>"></script><?php endif; ?>
<?php if (empty($sinSwiper)): ?><script src="/js/magnet.js?v=<?php echo $assetVersion('js/magnet.js'); ?>"></script><?php endif; ?>
<?php if (empty($sinSwiper)): ?><script src="/js/active.js?v=<?php echo $assetVersion('js/active.js'); ?>"></script><?php endif; ?>

<?php if (empty($sinSwiper)): ?><script src="/js/swiper/swiper-bundle.min.js?v=<?php echo $assetVersion('js/swiper/swiper-bundle.min.js'); ?>"></script><?php endif; ?>
<?php if (empty($sinSwiper)): ?><script src="/js/swiper/swiperNew.js?v=<?php echo $assetVersion('js/swiper/swiperNew.js'); ?>"></script><?php endif; ?>

<script src="/js/tema.js?v=<?php echo $assetVersion('js/tema.js'); ?>"></script>
<script src="/js/menu-movil.js?v=<?php echo $assetVersion('js/menu-movil.js'); ?>"></script>
<script src="/js/cursor-color.js?v=<?php echo $assetVersion('js/cursor-color.js'); ?>"></script>
<script src="/js/cursor-fusion.js?v=<?php echo $assetVersion('js/cursor-fusion.js'); ?>"></script>
<?php if (empty($sinSwiper)): ?><script src="/js/intro.js?v=<?php echo $assetVersion('js/intro.js'); ?>"></script><?php endif; ?>
<?php if (empty($sinSwiper)): ?><script src="/js/baraja.js?v=<?php echo $assetVersion('js/baraja.js'); ?>"></script><?php endif; ?>
<?php if (empty($sinSwiper)): ?><script src="/js/esfera.js?v=<?php echo $assetVersion('js/esfera.js'); ?>"></script><?php endif; ?>
