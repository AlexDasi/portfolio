<?php
/* UX/UI · página propia (v11, Alex 21/11: «UX/UI y sobre mí deberían ser dos páginas distintas; UX/UI más profundo y que
   se vea Tulong, Idrica, ATELIER… con su parte visual, no exactamente igual que los proyectos de la home»).
   Página con scroll normal en todos los tamaños: titular + texto + CV → casos con su portada → pie de contacto.
   v15 (Alex, 21/11): fuera el zigzag (foto izquierda / derecha) y los tamaños distintos: índice de cinco filas IGUALES
   (número + nombre + reto y papel a la izquierda, portada 16:10 a la derecha), una línea fina entre caso y caso. Datos: content/casos.json (los mismos de caso.php)
   + textos de php-pages/sobre-mi.php. Aquí no se escribe copy nuevo salvo las etiquetas. */
/* v18 · PROPUESTA A (Alex, 21/11: «en UX/UI perdemos la gracia de navegar con las flechas que tenemos en el resto»):
   ?vista=pisos → en escritorio, UX/UI en pisos como Sobre mí: portada · un caso por pantalla · Hablamos. Móvil, igual que hoy. */
/* v19 (Alex, 21/11: «la propuesta está bien; tres pisos y todos los proyectos en un mismo slider horizontal, como en mi web
   antigua»): ya es la de por defecto en escritorio (?vista=lista enseña la lista de antes) */
$vistaPisos = (($_GET['vista'] ?? '') !== 'lista');
$bodyClass = $vistaPisos ? 'sitio-baraja pagina-uxui pagina-uxui--pisos' : 'sitio-baraja pagina-proyecto pagina-uxui';
$sinSwiper = !$vistaPisos;
$pageTitle = ['es' => 'UX/UI · Alex Dasi', 'en' => 'UX/UI · Alex Dasi'];
$metaDescription = ['es' => 'Casos de producto digital y UX/UI de Alex Dasi: Tulong, Idrica, ATELIER, Clustag y Knowadays.', 'en' => 'Digital product and UX/UI case studies by Alex Dasi: Tulong, Idrica, ATELIER, Clustag and Knowadays.'];
include 'php-elements/header-baraja.php';
include 'php-pages/sobre-mi.php'; // $T, $e, $cv, $cvOtro, $es
$L = $es ? 'es' : 'en';
$navActual = 'uxui';
$conPie = true;
$casos = json_decode((string) file_get_contents(__DIR__ . '/content/casos.json'), true)['casos'] ?? [];
$porSlug = [];
foreach ($casos as $c) { $porSlug[$c['slug']] = $c; }
$U = $es
    ? ['ver' => 'Ver el caso', 'reto' => 'El reto', 'papel' => 'Mi papel', 'casos' => 'Casos']
    : ['ver' => 'View the case', 'reto' => 'The challenge', 'papel' => 'My role', 'casos' => 'Case studies'];
$fd = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
$resumen = static function (array $C, int $k) use ($L) { $r = $C['resumen'][$k] ?? null; return $r ? ($r['d'][$L] ?? '') : ''; };
?>

<body class="<?php echo $bodyClass; ?>">

    <?php include 'php-elements/nav-baraja.php'?>

<?php if ($vistaPisos):
    $nombres = []; foreach ($T['casos'] as $t) { $C = $porSlug[$t[0]] ?? null; if ($C) $nombres[] = mb_strtoupper($C['nombre']); }
    $pisosU = 'UX/UI|' . ($es ? 'CASOS' : 'CASE STUDIES') . '|' . ($es ? 'HABLAMOS' : 'LET’S TALK');
    $total = count($nombres);
?>
<div class="hiddenMobile swiper MainSwiper uxp" data-menu="<?php echo $e($pisosU); ?>" data-wheel="off" data-initial="0">
    <div class="swiper-wrapper">
        <div class="swiper-slide uxp__slide uxp__slide--portada">
            <div class="uxp__portada">
                <h1 class="ux__titulo">UX/UI<span class="ux__punto" aria-hidden="true"></span></h1>
                <div class="ux__intro">
                    <p class="ux__lead"><?php echo $e($T['ux_t']); ?></p>
                    <p class="ux__texto"><?php echo $e($T['ux_p']); ?></p>
                    <p class="sm__cvs ux__cvs"><a class="sm__cv" href="<?php echo $e($cv); ?>" target="_blank" rel="noopener"><?php echo $e($T['cv']); ?></a><a class="sm__cv sm__cv--otro" href="<?php echo $e($cvOtro); ?>" target="_blank" rel="noopener"><?php echo $e($T['cv_otro']); ?></a></p>
                </div>
                <ol class="uxp__indice">
                    <?php $n = 0; foreach ($T['casos'] as $t): $C = $porSlug[$t[0]] ?? null; if (!$C) continue; $n++; ?>
                    <li><a href="#" data-uxp-ir="<?php echo $n; ?>"><span><?php echo str_pad((string) $n, 2, '0', STR_PAD_LEFT); ?></span><?php echo $e($C['nombre']); ?></a></li>
                    <?php endforeach; ?>
                </ol>
            </div>
        </div>
        <div class="swiper-slide uxp__slide uxp__slide--casos">
            <div class="uxp__casos">
                <div class="uxp__barra">
                    <p class="uxp__titulo-casos"><?php echo $e($U['casos']); ?> <span><?php echo str_pad((string) $total, 2, '0', STR_PAD_LEFT); ?></span></p>
                    <div class="uxp__navh">
                        <span class="uxp__progreso"><i></i></span>
                        <button class="uxp__btn uxp__btn--prev" type="button" aria-label="<?php echo $es ? 'Caso anterior' : 'Previous case'; ?>"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button>
                        <button class="uxp__btn uxp__btn--next" type="button" aria-label="<?php echo $es ? 'Caso siguiente' : 'Next case'; ?>"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button>
                    </div>
                </div>
                <div class="swiper UxSwiper">
                    <div class="swiper-wrapper">
                    <?php $n = 0; foreach ($T['casos'] as $i => $t): $C = $porSlug[$t[0]] ?? null; if (!$C) continue; $n++; $p = $C['portada'];
                        $p12 = preg_replace('~_portada-\d+\.webp$~', '_portada-1200.webp', $p['grande']); $set = $p['chica'] . ' ' . $p['wc'] . 'w, ' . (is_file(__DIR__ . '/' . $p12) ? $p12 . ' 1200w, ' : '') . $p['grande'] . ' ' . $p['wg'] . 'w'; ?>
                        <a class="swiper-slide uxp__tarjeta" href="caso.php?c=<?php echo $e($C['slug']); ?>">
                            <span class="uxp__img"><img src="<?php echo $e($p['grande']); ?>" srcset="<?php echo $e($set); ?>" sizes="40vw" width="<?php echo (int) $p['wc']; ?>" height="<?php echo (int) round($p['wc'] * $p['h'] / $p['w']); ?>" alt="" loading="<?php echo $n <= 3 ? 'eager' : 'lazy'; ?>" decoding="async"></span>
                            <span class="uxp__info">
                                <span class="uxp__num"><?php echo str_pad((string) $n, 2, '0', STR_PAD_LEFT); ?> / <?php echo str_pad((string) $total, 2, '0', STR_PAD_LEFT); ?><span><?php echo $e($t[3] ?: ($C['anios'] ?? '')); ?></span></span>
                                <span class="uxp__nombre"><?php echo $e($C['nombre']); ?><i aria-hidden="true">.</i></span>
                                <span class="uxp__sub"><?php echo $e($t[2]); ?></span>
                                <span class="uxp__dato"><?php echo $e($resumen($C, 0)); ?></span>
                                <span class="ux__ver"><?php echo $e($U['ver']); ?><?php echo $fd; ?></span>
                            </span>
                        </a>
                    <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="swiper-slide slide-sm slide-pie"><?php $pieEnPiso = true; include 'php-elements/pie-contacto.php'; $pieEnPiso = false; ?></div>
    </div>
    <div class="swiper-pagination"></div>
    <?php include 'php-elements/arrow.php'?>
</div>
<script>document.addEventListener('click', function (e) { var a = e.target.closest('[data-uxp-ir]'); if (!a || !window.mainSwiper) return; e.preventDefault(); window.mainSwiper.slideTo(1); if (window.uxSwiper) window.uxSwiper.slideTo(+a.getAttribute('data-uxp-ir') - 1); });</script>
<div class="hiddenDesktop">
<?php endif; ?>
<main class="ux">
    <header class="ux__cab">
        <h1 class="ux__titulo">UX/UI<span class="ux__punto" aria-hidden="true"></span></h1>
        <div class="ux__intro">
            <p class="ux__lead"><?php echo $e($T['ux_t']); ?></p>
            <p class="ux__texto"><?php echo $e($T['ux_p']); ?></p>
            <p class="sm__cvs ux__cvs"><a class="sm__cv" href="<?php echo $e($cv); ?>" target="_blank" rel="noopener"><?php echo $e($T['cv']); ?></a><a class="sm__cv sm__cv--otro" href="<?php echo $e($cvOtro); ?>" target="_blank" rel="noopener"><?php echo $e($T['cv_otro']); ?></a></p>
        </div>
    </header>

    <h2 class="ux__seccion"><?php echo $e($U['casos']); ?> <span><?php echo str_pad((string) count($T['casos']), 2, '0', STR_PAD_LEFT); ?></span></h2>

    <ol class="ux__casos">
        <?php foreach ($T['casos'] as $i => $t):
            $C = $porSlug[$t[0]] ?? null; if (!$C) continue;
            $p = $C['portada'];
            $grande = true; // v15 (Alex, 21/11: «foto izquierda, foto derecha… descompensa; las fotos salen de tamaños distintos»): los cinco iguales
        ?>
        <li class="ux__caso ux__caso--fila">
            <a href="caso.php?c=<?php echo $e($C['slug']); ?>" class="ux__enlace">
                <span class="ux__img">
                    <?php $p12 = preg_replace('~_portada-\d+\.webp$~', '_portada-1200.webp', $p['grande']); $set = $p['chica'] . ' ' . $p['wc'] . 'w, ' . (is_file(__DIR__ . '/' . $p12) ? $p12 . ' 1200w, ' : '') . $p['grande'] . ' ' . $p['wg'] . 'w'; ?>
                    <img src="<?php echo $e(is_file(__DIR__ . "/" . $p12) ? $p12 : $p["grande"]); ?>" srcset="<?php echo $e($set); ?>"
                        sizes="(min-width: 900px) 52vw, 86vw" width="<?php echo (int) $p['wc']; ?>" height="<?php echo (int) round($p['wc'] * $p['h'] / $p['w']); ?>"
                        alt="<?php echo $e($p['alt'][$L] ?? $C['nombre']); ?>" loading="<?php echo $i === 0 ? 'eager' : 'lazy'; ?>" decoding="async">
                </span>
                <span class="ux__info">
                    <span class="ux__fila"><span class="ux__num"><?php echo str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT); ?></span><span class="ux__anios"><?php echo $e($t[3] ?: ($C['anios'] ?? '')); ?></span></span>
                    <span class="ux__nombre"><?php echo $e($C['nombre']); ?></span>
                    <span class="ux__sub"><?php echo $e($t[2]); ?></span>
                    <?php if ($grande): ?>
                    <span class="ux__dato"><b><?php echo $e($U['reto']); ?></b><?php echo $e($resumen($C, 0)); ?></span>
                    <span class="ux__dato ux__dato--papel"><b><?php echo $e($U['papel']); ?></b><?php echo $e($resumen($C, 1)); ?></span>
                    <?php endif; ?>
                    <span class="ux__ver"><?php echo $e($U['ver']); ?><?php echo $fd; ?></span>
                </span>
            </a>
        </li>
        <?php endforeach; ?>
    </ol>
</main>

<?php include 'php-elements/pie-contacto.php'?>
<?php if ($vistaPisos): ?></div><?php endif; ?>

    <?php $sinBaraja = true; include 'php-elements/js-baraja.php'?>
<?php if ($vistaPisos): ?>
<script>
/* v19: el slider horizontal de los casos (escritorio): arrastre, rueda horizontal y ← → del teclado; contador y progreso */
(function () {
  var raiz = document.querySelector('.UxSwiper'); if (!raiz || typeof Swiper === 'undefined' || innerWidth <= 1280) return;
  var barra = document.querySelector('.uxp__progreso i');
  window.uxSwiper = new Swiper(raiz, {
    slidesPerView: 'auto', spaceBetween: 0, speed: 620, grabCursor: false,
    freeMode: { enabled: true, sticky: true, momentumRatio: .5 },
    mousewheel: { enabled: true, forceToAxis: true, sensitivity: .9, releaseOnEdges: true },
    keyboard: { enabled: true, onlyInViewport: true },
    navigation: { prevEl: '.uxp__btn--prev', nextEl: '.uxp__btn--next' },
    on: { progress: function (sw, p) { if (barra) barra.style.transform = 'scaleX(' + Math.max(.08, Math.min(1, p)) + ')'; } }
  });
})();
</script>
<?php endif; ?>

</body>
</html>
