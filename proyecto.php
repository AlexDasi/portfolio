<?php
/* Ficha de proyecto · rediseño v6 (feedback 116, rama rediseno-baraja-2026-11, ATELIER conv. 1330).
   Plantilla común de todas las cartas de la baraja. Datos en content/baraja.json; ?p=<slug>.
   Orden: barra (volver + nº/total) → cabecera con ficha técnica en columnas → portada (vídeo de escritorio grande + vídeo
   de móvil montado encima) → el problema / qué hice → momentos numerados a distintas escalas → la web en vivo →
   siguiente proyecto (la baraja sigue: carta de pie que se abre hacia ti).
   Procedencia (ATELIER, sites/propuestas/public/2026-11-19_alexdasi-fichas-procedencia/): registro n.º 256 Gil Huybrecht
   (ficha en columnas, pantallas numeradas), n.º 240 Maria Vasilyeva (pantallas reales a distintas escalas), n.º 183
   Jesper Landberg + pieza `jl-lookback-fila-domino` (cierre que encadena la baraja).
   Estilos: scss/ficha.scss → css/ficha.css (hoja propia, no toca style.css) · js/ficha.js.
   Momentos: content/baraja/<slug>_momento-<d1|d2|d3|m1>-<ancho>.webp (se pintan los que existan). Sin URL pública, sin botón. */
$barajaData = json_decode((string) file_get_contents(__DIR__ . '/content/baraja.json'), true);
$lista = array_values(array_filter($barajaData['proyectos'] ?? [], static function ($x) { return empty($x['oculta']) && empty($x['neutra']); }));
$slug = isset($_GET['p']) ? (string) $_GET['p'] : '';
$idx = 0;
foreach ($lista as $k => $x) { if ($x['slug'] === $slug) { $idx = $k; } }
$total = count($lista);
$P = $lista[$idx];
$sig = $lista[($idx + 1) % $total];
$tras = [$lista[($idx + 2) % $total], $lista[($idx + 3) % $total]];
$bodyClass = 'sitio-baraja pagina-proyecto pagina-ficha';
$pageTitle = $P['nombre'] . ' · Alex Dasi';
$ogImage = 'https://alexdasi.com/content/baraja/' . $P['slug'] . '_scroll-desktop_poster.jpg';
include 'php-elements/header-baraja.php';
$es = $lang === 'es';
$L = $es ? 'es' : 'en';
$e = static function ($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); };
$T = $es
    ? ['volver' => 'Proyectos', 'problema' => 'El problema', 'hice' => 'Qué hice', 'visitar' => 'Visitar la web', 'sig' => 'Siguiente proyecto', 'concepto' => 'Concepto', 'cliente' => 'Cliente', 'sinweb' => 'Sin web pública todavía', 'lugar' => 'Lugar', 'anio' => 'Año', 'tipo' => 'Tipo', 'sector' => 'Sector', 'rol' => 'Rol', 'momentos' => 'Momentos', 'vivo' => 'En vivo', 'escritorio' => 'Escritorio', 'movil' => 'Móvil', 'nota_concepto' => 'Marca inventada: proyecto propio, sin cliente.', 'captura' => 'Captura de', 'ver' => 'Ver', 'propio' => 'Concepto propio']
    : ['volver' => 'Projects', 'problema' => 'The problem', 'hice' => 'What I did', 'visitar' => 'Visit the site', 'sig' => 'Next project', 'concepto' => 'Concept', 'cliente' => 'Client', 'sinweb' => 'No public site yet', 'lugar' => 'Place', 'anio' => 'Year', 'tipo' => 'Type', 'sector' => 'Sector', 'rol' => 'Role', 'momentos' => 'Moments', 'vivo' => 'Live', 'escritorio' => 'Desktop', 'movil' => 'Mobile', 'nota_concepto' => 'Invented brand: a self-initiated project, no client.', 'captura' => 'Screenshot of', 'ver' => 'View', 'propio' => 'Self-initiated concept'];
$base = 'content/baraja/' . $P['slug'];
$media = $base . '_scroll-';
$navActual = 'home';
$esConcepto = ($P['tipo'] ?? '') === 'concepto';
$num = static function ($n) { return str_pad((string) $n, 2, '0', STR_PAD_LEFT); };
$host = !empty($P['url']) ? preg_replace('~^https?://(www\.)?~', '', rtrim((string) $P['url'], '/')) : '';
$rol = $P['rol'][$L] ?? [];

/* Momentos: los que existan en disco, en este orden de composición */
$momentos = [];
foreach ([['d1', 'd', 1600, 1000], ['m1', 'm', 780, 1688], ['d2', 'd', 1600, 1000], ['d3', 'd', 1600, 1000]] as $m) {
    $grande = $m[1] === 'd' ? 1600 : 780;
    $chica = $m[1] === 'd' ? 900 : 480;
    if (is_file(__DIR__ . '/' . $base . '_momento-' . $m[0] . '-' . $grande . '.webp')) {
        $momentos[] = ['id' => $m[0], 'tipo' => $m[1], 'w' => $m[2], 'h' => $m[3],
            'grande' => $base . '_momento-' . $m[0] . '-' . $grande . '.webp', 'wg' => $grande,
            'chica' => $base . '_momento-' . $m[0] . '-' . $chica . '.webp', 'wc' => $chica];
    }
}
$fl = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
$fd = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
$assetV = static function (string $rel): string { $f = __DIR__ . '/' . $rel; return is_file($f) ? (string) filemtime($f) : '1'; };
?>

<body class="<?php echo $bodyClass; ?>">
    <link rel="stylesheet" href="/css/ficha.css?v=<?php echo $assetV('css/ficha.css'); ?>">
    <script>document.documentElement.classList.add('fp-js');</script>

    <?php include 'php-elements/nav-baraja.php'?>

<main class="fp" data-ficha>

    <div class="fp__barra">
        <a class="ficha__link fp__volver" href="index.php#works"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 6H2M5 3 2 6l3 3" fill="none" stroke="currentColor" stroke-width="1"/></svg><?php echo $e($T['volver']); ?></a>
        <p class="fp__cuenta" aria-label="<?php echo $e(($idx + 1) . ' / ' . $total); ?>"><b><?php echo $num($idx + 1); ?></b><span>/</span><?php echo $num($total); ?></p>
    </div>

    <header class="fp__cab">
        <p class="fp__tipo"><?php echo $e($esConcepto ? $T['concepto'] : $T['cliente']); ?></p>
        <h1 class="fp__titulo"><?php echo $e($P['nombre']); ?><span class="fp__punto" aria-hidden="true"></span></h1>
        <dl class="fp__datos">
            <div><dt><?php echo $e($esConcepto ? $T['tipo'] : $T['cliente']); ?></dt><dd><?php echo $e($esConcepto ? $T['propio'] : ($P['cliente'] ?? $P['nombre'])); ?></dd></div>
            <div><dt><?php echo $e($T['sector']); ?></dt><dd><?php echo $e($P['sector'][$L]); ?></dd></div>
            <div><dt><?php echo $e($T['lugar']); ?></dt><dd><?php echo $e($P['lugar'] ?? ''); ?></dd></div>
            <div><dt><?php echo $e($T['anio']); ?></dt><dd><?php echo $e($P['anio'] ?? ''); ?></dd></div>
            <?php if ($rol): ?>
            <div class="fp__datos-rol"><dt><?php echo $e($T['rol']); ?></dt><dd><?php foreach ($rol as $r): ?><span><?php echo $e($r); ?></span><?php endforeach; ?></dd></div>
            <?php endif; ?>
        </dl>
    </header>

    <section class="fp__portada" aria-label="<?php echo $e($P['nombre']); ?>">
        <figure class="fp__video fp__video--d">
            <video muted loop playsinline preload="none" disablepictureinpicture
                data-video-d="<?php echo $e($media . 'desktop-hd.mp4'); ?>" data-poster-d="<?php echo $e($media . 'desktop-hd_poster.jpg'); ?>"></video>
        </figure>
        <figure class="fp__video fp__video--m">
            <video muted loop playsinline preload="none" disablepictureinpicture
                data-video-m="<?php echo $e($media . 'movil.mp4'); ?>" data-poster-m="<?php echo $e($media . 'movil_poster.jpg'); ?>"></video>
        </figure>
    </section>

    <section class="fp__relato">
        <div class="fp__bloque" data-fp-entra>
            <h2 class="fp__h2"><span>01</span><?php echo $e($T['problema']); ?></h2>
            <p class="fp__p fp__p--grande"><?php echo $e($P['problema'][$L]); ?></p>
        </div>
        <div class="fp__bloque" data-fp-entra>
            <h2 class="fp__h2"><span>02</span><?php echo $e($T['hice']); ?></h2>
            <p class="fp__p"><?php echo $e($P['que_hice'][$L] ?? ''); ?></p>
            <?php if ($esConcepto): ?><p class="fp__nota"><?php echo $e($T['nota_concepto']); ?></p><?php endif; ?>
        </div>
    </section>

    <?php if ($momentos): ?>
    <section class="fp__momentos" aria-label="<?php echo $e($T['momentos']); ?>">
        <div class="fp__momentos-cab">
            <h2 class="fp__h2"><span>03</span><?php echo $e($T['momentos']); ?></h2>
            <p class="fp__momentos-n"><?php echo $num(1); ?> — <?php echo $num(count($momentos)); ?></p>
        </div>
        <div class="fp__tira" data-fp-tira>
            <?php foreach ($momentos as $i => $m): ?>
            <figure class="fp__m fp__m--<?php echo $m['tipo']; ?> fp__m--p<?php echo $i + 1; ?>" data-fp-entra<?php echo $m['tipo'] === 'm' ? ' data-fp-par="-0.06"' : ($i === 2 ? ' data-fp-par="0.04"' : ''); ?>>
                <div class="fp__m-marco">
                    <?php $alt = $e($T['captura'] . ' ' . $P['nombre'] . ' · ' . ($m['tipo'] === 'd' ? $T['escritorio'] : $T['movil']) . ' ' . ($i + 1)); ?>
                    <?php /* dos versiones por captura; js/ficha.js pide la que toca según el hueco y la pantalla (así naturalWidth son píxeles reales) */ ?>
                    <img data-poster-m="<?php echo $e($m['chica']); ?>" data-poster-d="<?php echo $e($m['grande']); ?>" data-wc="<?php echo $m['wc']; ?>"
                        width="<?php echo $m['w']; ?>" height="<?php echo $m['h']; ?>" decoding="async" alt="<?php echo $alt; ?>">
                    <noscript><img src="<?php echo $e($m['grande']); ?>" width="<?php echo $m['w']; ?>" height="<?php echo $m['h']; ?>" alt="<?php echo $alt; ?>"></noscript>
                </div>
                <figcaption><b><?php echo $num($i + 1); ?></b><?php echo $e($m['tipo'] === 'd' ? $T['escritorio'] : $T['movil']); ?></figcaption>
            </figure>
            <?php endforeach; ?>
        </div>
    </section>
    <?php endif; ?>

    <section class="fp__visita" data-fp-entra>
        <p class="fp__h2"><span><?php echo $momentos ? '04' : '03'; ?></span><?php echo $e($T['vivo']); ?></p>
        <?php if (!empty($P['url'])): ?>
        <p class="fp__host"><?php echo str_replace(['-', '.'], ['&#8209;', '.<wbr>'], $e($host)); /* corta solo en los puntos */ ?></p>
        <a class="sm__boton sm__boton--lleno fp__boton" href="<?php echo $e($P['url']); ?>" target="_blank" rel="noopener"><?php echo $e($T['visitar']); ?>&nbsp;<?php echo $fl; ?></a>
        <?php else: ?>
        <p class="fp__host fp__host--sin"><?php echo $e($T['sinweb']); ?></p>
        <?php endif; ?>
    </section>

    <a class="fp__sig" href="proyecto.php?p=<?php echo $e($sig['slug']); ?>" aria-label="<?php echo $e($T['sig'] . ': ' . $sig['nombre']); ?>">
        <span class="fp__sig-texto">
            <span class="fp__sig-k"><?php echo $e($T['sig']); ?><i><?php echo $num((($idx + 1) % $total) + 1); ?> / <?php echo $num($total); ?></i></span>
            <span class="fp__sig-n"><?php echo $e($sig['nombre']); ?></span>
            <span class="fp__sig-s"><?php echo $e($sig['sector'][$L]); ?><?php echo $fd; ?></span>
        </span>
        <span class="fp__mazo" aria-hidden="true">
            <span class="fp__naipe fp__naipe--1"><img src="content/baraja/<?php echo $e($sig['slug']); ?>_scroll-desktop_poster-1000.webp" width="1000" height="625" loading="lazy" decoding="async" alt=""></span>
            <?php foreach ($tras as $k => $t): ?>
            <span class="fp__naipe fp__naipe--<?php echo $k + 2; ?>"><img src="content/baraja/<?php echo $e($t['slug']); ?>_scroll-desktop_poster-1000.webp" width="1000" height="625" loading="lazy" decoding="async" alt=""></span>
            <?php endforeach; ?>
        </span>
    </a>
</main>

    <?php $sinBaraja = true; include 'php-elements/js-baraja.php'?>
    <script src="/js/ficha.js?v=<?php echo $assetV('js/ficha.js'); ?>"></script>

</body>
</html>
