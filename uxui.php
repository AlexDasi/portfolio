<?php
/* UX/UI · página propia (v11, Alex 21/11: «UX/UI y sobre mí deberían ser dos páginas distintas; UX/UI más profundo y que
   se vea Tulong, Idrica, ATELIER… con su parte visual, no exactamente igual que los proyectos de la home»).
   Página con scroll normal en todos los tamaños: titular + texto + CV → casos con su portada (los tres grandes a lo ancho,
   alternando lado en escritorio; los otros dos en pareja) → pie de contacto. Datos: content/casos.json (los mismos de caso.php)
   + textos de php-pages/sobre-mi.php. Aquí no se escribe copy nuevo salvo las etiquetas. */
$bodyClass = 'sitio-baraja pagina-proyecto pagina-uxui';
$sinSwiper = true;
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
            $grande = $i < 3; // Tulong, Idrica y ATELIER, a lo ancho; Clustag y Knowadays, en pareja
        ?>
        <li class="ux__caso<?php echo $grande ? ' ux__caso--grande' : ' ux__caso--par'; ?><?php echo $grande && $i % 2 ? ' ux__caso--der' : ''; ?>">
            <a href="caso.php?c=<?php echo $e($C['slug']); ?>" class="ux__enlace">
                <span class="ux__img">
                    <?php $p12 = preg_replace('~_portada-\d+\.webp$~', '_portada-1200.webp', $p['grande']); $set = $p['chica'] . ' ' . $p['wc'] . 'w, ' . (is_file(__DIR__ . '/' . $p12) ? $p12 . ' 1200w, ' : '') . $p['grande'] . ' ' . $p['wg'] . 'w'; ?>
                    <img src="<?php echo $e(is_file(__DIR__ . "/" . $p12) ? $p12 : $p["grande"]); ?>" srcset="<?php echo $e($set); ?>"
                        sizes="<?php echo $grande ? '(min-width: 900px) 58vw, 86vw' : '(min-width: 900px) 42vw, 86vw'; ?>" width="<?php echo (int) $p['wc']; ?>" height="<?php echo (int) round($p['wc'] * $p['h'] / $p['w']); ?>"
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

    <?php $sinBaraja = true; include 'php-elements/js-baraja.php'?>

</body>
</html>
