<?php
/* Ficha de proyecto (feedback 94, rama rediseno-baraja-2026-11, ATELIER conv. 1330).
   Plantilla común para todas las cartas de la baraja: vídeo, qué problema, qué hice y enlace a la web.
   Datos en content/baraja.json. ?p=<slug>. Si la web no tiene URL pública, va sin botón externo. */
$barajaData = json_decode((string) file_get_contents(__DIR__ . '/content/baraja.json'), true);
$lista = array_values(array_filter($barajaData['proyectos'] ?? [], static function ($x) { return empty($x['oculta']) && empty($x['neutra']); }));
$slug = isset($_GET['p']) ? (string) $_GET['p'] : '';
$idx = 0;
foreach ($lista as $k => $x) { if ($x['slug'] === $slug) { $idx = $k; } }
$P = $lista[$idx];
$sig = $lista[($idx + 1) % count($lista)];
$bodyClass = 'sitio-baraja pagina-proyecto';
$pageTitle = $P['nombre'] . ' · Alex Dasi';
$ogImage = 'https://alexdasi.com/content/baraja/' . $P['slug'] . '_scroll-desktop_poster.jpg';
include 'php-elements/header-baraja.php';
$es = $lang === 'es';
$L = $es ? 'es' : 'en';
$e = static function ($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); };
$T = $es
    ? ['volver' => 'Proyectos', 'problema' => 'El problema', 'hice' => 'Qué hice', 'visitar' => 'Visitar la web', 'sig' => 'Siguiente', 'concepto' => 'Concepto', 'cliente' => 'Cliente', 'sinweb' => 'Sin web pública todavía', 'lugar' => 'Lugar', 'anio' => 'Año', 'tipo' => 'Tipo']
    : ['volver' => 'Projects', 'problema' => 'The problem', 'hice' => 'What I did', 'visitar' => 'Visit the site', 'sig' => 'Next', 'concepto' => 'Concept', 'cliente' => 'Client', 'sinweb' => 'No public site yet', 'lugar' => 'Place', 'anio' => 'Year', 'tipo' => 'Type'];
$media = 'content/baraja/' . $P['slug'] . '_scroll-';
$navActual = 'home';
$fl = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
?>

<body class="<?php echo $bodyClass; ?>">

    <?php include 'php-elements/nav-baraja.php'?>

<main class="pf">
    <a class="pf__volver" href="index.php#works"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 6H2M5 3 2 6l3 3" fill="none" stroke="currentColor" stroke-width="1"/></svg><?php echo $e($T['volver']); ?></a>

    <header class="pf__cab">
        <p class="pf__tipo"><?php echo $e(($P['tipo'] ?? '') === 'concepto' ? $T['concepto'] : $T['cliente']); ?></p>
        <h1 class="pf__titulo"><?php echo $e($P['nombre']); ?><span class="pf__punto" aria-hidden="true"></span></h1>
        <p class="pf__sector"><?php echo $e($P['sector'][$L]); ?></p>
    </header>

    <figure class="pf__video">
        <video muted loop playsinline autoplay preload="metadata" disablepictureinpicture
 
            data-video-d="<?php echo $e($media . 'desktop-hd.mp4'); ?>" data-video-m="<?php echo $e($media . 'movil.mp4'); ?>"
            data-poster-d="<?php echo $e($media . 'desktop-hd_poster.jpg'); ?>" data-poster-m="<?php echo $e($media . 'movil_poster.jpg'); ?>"></video>
    </figure>

    <div class="pf__cuerpo">
        <dl class="pf__datos">
            <div><dt><?php echo $e($T['tipo']); ?></dt><dd><?php echo $e(($P['tipo'] ?? '') === 'concepto' ? $T['concepto'] : $T['cliente']); ?></dd></div>
            <div><dt><?php echo $e($T['lugar']); ?></dt><dd><?php echo $e($P['lugar'] ?? ''); ?></dd></div>
            <div><dt><?php echo $e($T['anio']); ?></dt><dd><?php echo $e($P['anio'] ?? ''); ?></dd></div>
        </dl>
        <div class="pf__textos">
            <section><h2 class="pf__h2"><?php echo $e($T['problema']); ?></h2><p class="pf__p"><?php echo $e($P['problema'][$L]); ?></p></section>
            <section><h2 class="pf__h2"><?php echo $e($T['hice']); ?></h2><p class="pf__p"><?php echo $e($P['que_hice'][$L] ?? ''); ?></p></section>
            <div class="pf__acciones">
                <?php if (!empty($P['url'])): ?>
                <a class="sm__boton sm__boton--lleno" href="<?php echo $e($P['url']); ?>" target="_blank" rel="noopener"><?php echo $e($T['visitar']); ?>&nbsp;<?php echo $fl; ?></a>
                <?php else: ?>
                <p class="pf__sinweb"><?php echo $e($T['sinweb']); ?></p>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <a class="pf__sig" href="proyecto.php?p=<?php echo $e($sig['slug']); ?>">
        <span class="pf__sig-k"><?php echo $e($T['sig']); ?></span>
        <span class="pf__sig-n"><?php echo $e($sig['nombre']); ?></span>
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1"/></svg>
    </a>
</main>

    <?php $sinBaraja = true; include 'php-elements/js-baraja.php'?>
    <script>
        /* vídeo y póster según el ancho (escritorio 16:10 · móvil 4:5) */
        (function () {
            var v = document.querySelector('.pf__video video');
            if (!v) return;
            var m = window.innerWidth < 900;
            v.poster = m ? v.dataset.posterM : v.dataset.posterD;
            v.src = m ? v.dataset.videoM : v.dataset.videoD;
            v.parentNode.classList.toggle('is-movil', m);
            var p = v.play(); if (p && p.catch) p.catch(function () {});
        })();
    </script>

</body>
</html>
