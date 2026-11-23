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
$bodyClass = $vistaPisos ? 'sitio-baraja pagina-uxui pagina-uxui--pisos pisos-movil' : 'sitio-baraja pagina-proyecto pagina-uxui'; /* v41: pisos-movil = pisos imantados en móvil */
$sinSwiper = !$vistaPisos;
$pageTitle = ['es' => 'Producto · Alex Dasi', 'en' => 'Product · Alex Dasi'];
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
    /* v24 (Alex, 21/11: «fusiona la portada y los casos: eliges a la derecha y se va mostrando a la izquierda, con la
       información abajo; el copy más grande y los enlaces del CV como Dios manda; UX/UI pasa a llamarse Producto»).
       Escritorio: UNA pantalla (portada + explorador) y Hablamos. */
    $pisosU = ($es ? 'PRODUCTO' : 'PRODUCT') . '|' . ($es ? 'HABLAMOS' : 'LET’S TALK');
    $lista = []; foreach ($T['casos'] as $t) { $C = $porSlug[$t[0]] ?? null; if ($C) $lista[] = [$t, $C]; }
    $total = count($lista);
?>
<div class="hiddenMobile swiper MainSwiper uxp" data-menu="<?php echo $e($pisosU); ?>" data-wheel="off" data-initial="<?php echo (($_GET['s'] ?? '') === 'contact') ? 1 : 0; ?>">
    <div class="swiper-wrapper">
        <div class="swiper-slide uxp__slide uxe">
            <div class="uxe__vista" aria-live="polite">
                <?php foreach ($lista as $n => [$t, $C]): $p = $C['portada'];
                    $p12 = preg_replace('~_portada-\d+\.webp$~', '_portada-1200.webp', $p['grande']); $set = $p['chica'] . ' ' . $p['wc'] . 'w, ' . (is_file(__DIR__ . '/' . $p12) ? $p12 . ' 1200w, ' : '') . $p['grande'] . ' ' . $p['wg'] . 'w'; ?>
                <a class="uxe__caso<?php echo $n === 0 ? ' is-on' : ''; ?>" data-uxe="<?php echo $n; ?>" href="caso.php?c=<?php echo $e($C['slug']); ?>"<?php echo $n === 0 ? '' : ' tabindex="-1" aria-hidden="true"'; ?>>
                    <span class="uxe__img"><img src="<?php echo $e($p['grande']); ?>" srcset="<?php echo $e($set); ?>" sizes="52vw" alt="<?php echo $e($p['alt'][$L] ?? $C['nombre']); ?>" loading="<?php echo $n < 2 ? 'eager' : 'lazy'; ?>" decoding="async"></span>
                    <span class="uxe__info">
                        <span class="uxe__fila"><span class="uxe__num"><?php echo str_pad((string) ($n + 1), 2, '0', STR_PAD_LEFT); ?> / <?php echo str_pad((string) $total, 2, '0', STR_PAD_LEFT); ?></span><span><?php echo $e($t[3] ?: ($C['anios'] ?? '')); ?></span></span>
                        <span class="uxe__nombre"><?php echo $e($C['nombre']); ?><i aria-hidden="true">.</i></span>
                        <span class="uxe__sub"><?php echo $e($t[2]); ?></span>
                        <span class="uxe__dato"><?php echo $e($resumen($C, 0)); ?></span>
                        <span class="ux__ver"><?php echo $e($U['ver']); ?><?php echo $fd; ?></span>
                    </span>
                </a>
                <?php endforeach; ?>
            </div>
            <div class="uxe__lado">
                <h1 class="uxe__titulo"><?php echo $es ? 'Producto' : 'Product'; ?><i aria-hidden="true">.</i></h1>
                <p class="uxe__lead"><?php echo $e($T['ux_p']); ?></p>
                <ol class="uxe__lista">
                    <?php foreach ($lista as $n => [$t, $C]): ?>
                    <li><a href="caso.php?c=<?php echo $e($C['slug']); ?>" data-uxe-ir="<?php echo $n; ?>"<?php echo $n === 0 ? ' class="is-on"' : ''; ?>><span><?php echo str_pad((string) ($n + 1), 2, '0', STR_PAD_LEFT); ?></span><?php echo $e($C['nombre']); ?></a></li>
                    <?php endforeach; ?>
                </ol>
                <?php /* v42 (Alex): el CV se va a Sobre mí */ ?>
            </div>
        </div>
        <div class="swiper-slide slide-sm slide-pie"><?php $pieEnPiso = true; include 'php-elements/pie-contacto.php'; $pieEnPiso = false; ?></div>
    </div>
    <div class="swiper-pagination"></div>
    <?php include 'php-elements/arrow.php'?>
</div>
<script>
/* v24: el explorador — pasar el ratón (o el foco) por un caso de la lista lo enseña a la izquierda; clic abre el caso */
(function () {
  var vista = document.querySelectorAll('.uxe__caso'), lista = document.querySelectorAll('[data-uxe-ir]');
  function ver(n) {
    vista.forEach(function (v, i) { var on = i === n; v.classList.toggle('is-on', on); if (on) { v.removeAttribute('aria-hidden'); v.removeAttribute('tabindex'); } else { v.setAttribute('aria-hidden', 'true'); v.setAttribute('tabindex', '-1'); } });
    lista.forEach(function (a, i) { a.classList.toggle('is-on', i === n); });
  }
  lista.forEach(function (a) {
    var n = +a.getAttribute('data-uxe-ir');
    a.addEventListener('mouseenter', function () { ver(n); });
    a.addEventListener('focus', function () { ver(n); });
  });
})();
</script>
<div class="hiddenDesktop">
<?php endif; ?>
<main class="ux">
    <header class="ux__cab">
        <h1 class="ux__titulo"><?php echo $es ? 'Producto' : 'Product'; ?><span class="ux__punto" aria-hidden="true"></span></h1>
        <div class="ux__intro">
            <p class="ux__lead"><?php echo $e($T['ux_t']); ?></p>
            <p class="ux__texto"><?php echo $e($T['ux_p']); ?></p>
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


</body>
</html>
