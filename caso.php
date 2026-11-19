<?php
/* Caso UX/UI · plantilla nueva (feedback 150, rama rediseno-baraja-2026-11, ATELIER conv. 1330).
   La misma ficha que proyecto.php, adaptada a caso de producto: barra → titular + datos → portada → el reto / mi papel →
   el proyecto → decisiones y pantallas (imágenes, citas y texto en el orden original) → el resultado → siguiente caso.
   Contenido REAL de las páginas antiguas (php-pages/projects/<slug>.php + lang/es/projects/<slug>.json), pasado a
   content/casos.json con tools/extrae_casos.py. Aquí no se escribe copy nuevo. Estilos: css/ficha.css (bloque «caso»). ?c=<slug>. */
$casosData = json_decode((string) file_get_contents(__DIR__ . '/content/casos.json'), true);
$lista = $casosData['casos'] ?? [];
$slug = isset($_GET['c']) ? (string) $_GET['c'] : '';
$idx = -1;
foreach ($lista as $k => $x) { if ($x['slug'] === $slug) { $idx = $k; } }
/* v9 (QA H-11): un caso que no existe da la 404 de la web */
if ($idx < 0) { http_response_code(404); include __DIR__ . '/404.php'; exit; }
$total = count($lista);
$C = $lista[$idx];
$sig = $lista[($idx + 1) % $total];
$bodyClass = 'sitio-baraja pagina-proyecto pagina-ficha pagina-caso';
$pageTitle = $C['nombre'] . ' · Alex Dasi';
/* v9 (QA H-03/H-04): miniatura JPG propia, descripción = subtítulo + entrada, URL propia */
$ogImage = is_file(__DIR__ . '/content/og/caso-' . $C['slug'] . '.jpg') ? 'https://www.alexdasi.com/content/og/caso-' . $C['slug'] . '.jpg' : '';
$casoDesc = static function (string $l) use ($C): string { $i = $C['intro'][$l] ?? []; return trim(strip_tags(($C['subtitulo'][$l] ?? '') . '. ' . (is_array($i) ? ($i[0] ?? '') : $i))); };
$metaDescription = ['es' => $casoDesc('es'), 'en' => $casoDesc('en')];
$canonParams = ['c' => $C['slug']];
include 'php-elements/header-baraja.php';
$es = $lang === 'es';
$L = $es ? 'es' : 'en';
$e = static function ($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); };
/* el texto de los casos ya trae sus enlaces (<a>) de la página original: se deja pasar solo eso */
$rico = static function ($s) { return strip_tags((string) $s, '<a><em><strong><br>'); };
$T = $es
    ? ['volver' => 'UX/UI', 'proyecto' => 'El proyecto', 'pantallas' => 'Decisiones y pantallas', 'sig' => 'Siguiente caso', 'anio' => 'Año', 'caso' => 'Caso UX/UI', 'video' => 'Vídeo']
    : ['volver' => 'UX/UI', 'proyecto' => 'The project', 'pantallas' => 'Decisions and screens', 'sig' => 'Next case', 'anio' => 'Year', 'caso' => 'UX/UI case', 'video' => 'Video'];
$navActual = 'uxui';
$num = static function ($n) { return str_pad((string) $n, 2, '0', STR_PAD_LEFT); };
$fd = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
$assetV = static function (string $rel): string { $f = __DIR__ . '/' . $rel; return is_file($f) ? (string) filemtime($f) : '1'; };
$res = $C['resumen'] ?? [];
/* Bloques en grupos: tiras de 4 o más imágenes seguidas = galería; conceptos seguidos = fila de conceptos */
$grupos = [];
$bl = $C['bloques'] ?? [];
for ($i = 0, $nb = count($bl); $i < $nb; $i++) {
    $t = $bl[$i]['tipo'];
    if ($t === 'img' || $t === 'concepto') {
        $j = $i; while ($j + 1 < $nb && $bl[$j + 1]['tipo'] === $t) { $j++; }
        $run = array_slice($bl, $i, $j - $i + 1);
        if ($t === 'concepto') { $grupos[] = ['tipo' => 'conceptos', 'items' => $run]; }
        elseif (count($run) >= 4) { $grupos[] = ['tipo' => 'galeria', 'items' => $run]; }
        else { foreach ($run as $r) { $grupos[] = $r; } }
        $i = $j;
    } else { $grupos[] = $bl[$i]; }
}
$img = static function (array $b, string $alt, bool $pronto = false) use ($e): string {
    if (!empty($b['video'])) {
        return '<video muted loop playsinline preload="none" disablepictureinpicture aria-label="' . $alt . '" data-video="' . $e($b['video']) . '" data-poster-m="' . $e($b['poster']) . '" data-poster-d="' . $e($b['poster']) . '" data-wc="9999"></video>';
    }
    if ($pronto) {
        return '<img src="' . $e($b['grande']) . '" width="' . (int) $b['w'] . '" height="' . (int) $b['h'] . '" decoding="async" fetchpriority="high" alt="' . $alt . '">';
    }
    return '<img data-poster-m="' . $e($b['chica']) . '" data-poster-d="' . $e($b['grande']) . '" data-wc="' . (int) $b['wc'] . '" width="' . (int) $b['w'] . '" height="' . (int) $b['h'] . '" decoding="async" alt="' . $alt . '">'
        . '<noscript><img src="' . $e($b['grande']) . '" width="' . (int) $b['w'] . '" height="' . (int) $b['h'] . '" alt="' . $alt . '"></noscript>';
};
$enlaceConcepto = static function (string $href): string {
    $s = preg_replace('~\.php$~', '', $href);
    return $s === 'casa-albar' ? 'proyecto.php?p=casa-albar' : 'php-pages/projects/' . $s . '.php';
};
?>

<body class="<?php echo $bodyClass; ?>">
    <link rel="stylesheet" href="/css/ficha.css?v=<?php echo $assetV('css/ficha.css'); ?>">
    <script>document.documentElement.classList.add('fp-js');</script>

    <?php include 'php-elements/nav-baraja.php'?>

<main class="fp fp--caso" data-ficha>

    <div class="fp__barra">
        <a class="ficha__link fp__volver" href="about.php?s=uxui"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 6H2M5 3 2 6l3 3" fill="none" stroke="currentColor" stroke-width="1"/></svg><?php echo $e($T['volver']); ?></a>
        <p class="fp__cuenta" aria-label="<?php echo $e(($idx + 1) . ' / ' . $total); ?>"><b><?php echo $num($idx + 1); ?></b><span>/</span><?php echo $num($total); ?></p>
    </div>

    <header class="fp__cab">
        <p class="fp__tipo"><?php echo $e($T['caso']); ?></p>
        <h1 class="fp__titulo"><?php echo $e($C['nombre']); ?><span class="fp__punto" aria-hidden="true"></span></h1>
        <p class="fp__sub"><?php echo $rico($C['subtitulo'][$L]); ?></p>
        <dl class="fp__datos fp__datos--caso">
            <?php foreach ($C['columnas'] as $col): ?>
            <div><dt><?php echo $e($col['t'][$L]); ?></dt><dd><?php foreach ($col['d'][$L] as $ln): ?><span><?php echo $e($ln); ?></span><?php endforeach; ?></dd></div>
            <?php endforeach; ?>
        </dl>
    </header>

    <section class="fp__portada fp__portada--caso" aria-label="<?php echo $e($C['nombre']); ?>">
        <figure class="fp__m-pantalla" style="aspect-ratio: <?php echo (int) $C['portada']['w']; ?> / <?php echo (int) $C['portada']['h']; ?>">
            <?php echo $img($C['portada'], $e($C['portada']['alt'][$L]), true); ?>
        </figure>
    </section>

    <?php $n = 1; if (count($res) >= 2): ?>
    <section class="fp__relato">
        <div class="fp__bloque" data-fp-entra>
            <h2 class="fp__h2"><span><?php echo $num($n++); ?></span><?php echo $e($res[0]['t'][$L]); ?></h2>
            <p class="fp__p fp__p--grande"><?php echo $rico($res[0]['d'][$L]); ?></p>
        </div>
        <div class="fp__bloque" data-fp-entra>
            <h2 class="fp__h2"><span><?php echo $num($n++); ?></span><?php echo $e($res[1]['t'][$L]); ?></h2>
            <p class="fp__p"><?php echo $rico($res[1]['d'][$L]); ?></p>
        </div>
    </section>
    <?php endif; ?>

    <section class="fp__claves fp__intro" data-fp-entra>
        <h2 class="fp__h2"><span><?php echo $num($n++); ?></span><?php echo $e($T['proyecto']); ?></h2>
        <div class="fp__intro-txt">
            <?php foreach ($C['intro'][$L] as $p): ?><p class="fp__p"><?php echo $rico($p); ?></p><?php endforeach; ?>
        </div>
    </section>

    <section class="fp__momentos" aria-label="<?php echo $e($T['pantallas']); ?>">
        <div class="fp__momentos-cab">
            <h2 class="fp__h2"><span><?php echo $num($n++); ?></span><?php echo $e($T['pantallas']); ?></h2>
        </div>
        <div class="fp__caso">
            <?php $ki = 0; foreach ($grupos as $g): ?>
            <?php if ($g['tipo'] === 'img'): $vert = ($g['h'] ?? 1) > ($g['w'] ?? 1) * 1.1; $ki++; ?>
            <figure class="fp__c fp__c--img <?php echo $vert ? 'fp__c--vert' : 'fp__c--a' . ($ki % 3); ?><?php echo !empty($g['video']) ? ' fp__m--vid' : ''; ?>" data-fp-entra>
                <div class="fp__m-marco"><div class="fp__m-pantalla" style="aspect-ratio: <?php echo (int) $g['w']; ?> / <?php echo (int) $g['h']; ?>"><?php echo $img($g, $e($g['alt'][$L])); ?></div></div>
            </figure>
            <?php elseif ($g['tipo'] === 'cita'): ?>
            <p class="fp__c fp__c--cita fp__p fp__p--grande" data-fp-entra><?php echo $rico($g['txt'][$L]); ?></p>
            <?php elseif ($g['tipo'] === 'texto'): ?>
            <div class="fp__c fp__c--texto" data-fp-entra><?php foreach ($g['p'][$L] as $p): ?><p class="fp__p"><?php echo $rico($p); ?></p><?php endforeach; ?></div>
            <?php elseif ($g['tipo'] === 'galeria'): ?>
            <div class="fp__c fp__c--galeria" data-fp-entra>
                <?php foreach ($g['items'] as $it): ?>
                <figure class="fp__m-marco"><div class="fp__m-pantalla"><?php echo $img($it, $e($it['alt'][$L])); ?></div></figure>
                <?php endforeach; ?>
            </div>
            <?php elseif ($g['tipo'] === 'conceptos'): ?>
            <div class="fp__c fp__c--conceptos" data-fp-entra>
                <?php foreach ($g['items'] as $it): ?>
                <a class="fp__concepto" href="<?php echo $e($enlaceConcepto($it['href'])); ?>">
                    <span class="fp__m-pantalla" style="aspect-ratio: 16 / 10"><?php echo $img($it, $e($it['alt'][$L])); ?></span>
                    <b><?php echo $e($it['nombre']); ?></b><span class="fp__concepto-l"><?php echo $e($it['linea'][$L]); ?></span>
                </a>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </section>

    <?php if (!empty($res[2])): ?>
    <section class="fp__visita fp__resultado" data-fp-entra>
        <h2 class="fp__h2"><span><?php echo $num($n++); ?></span><?php echo $e($res[2]['t'][$L]); ?></h2>
        <p class="fp__p fp__p--grande"><?php echo $rico($res[2]['d'][$L]); ?></p>
    </section>
    <?php endif; ?>

    <a class="fp__sig" href="caso.php?c=<?php echo $e($sig['slug']); ?>" aria-label="<?php echo $e($T['sig'] . ': ' . $sig['nombre']); ?>">
        <span class="fp__sig-texto">
            <span class="fp__sig-k"><?php echo $e($T['sig']); ?><i><?php echo $num((($idx + 1) % $total) + 1); ?> / <?php echo $num($total); ?></i></span>
            <span class="fp__sig-n"><?php echo $e($sig['nombre']); ?></span>
            <span class="fp__sig-s"><?php echo $rico(strip_tags($sig['subtitulo'][$L])); ?><?php echo $fd; ?></span>
        </span>
        <span class="fp__mazo" aria-hidden="true">
            <span class="fp__naipe fp__naipe--1"><img src="<?php echo $e($sig['portada']['chica']); ?>" width="1000" height="625" loading="lazy" decoding="async" alt=""></span>
        </span>
    </a>
</main>

    <?php $sinBaraja = true; include 'php-elements/js-baraja.php'?>
    <script src="/js/ficha.js?v=<?php echo $assetV('js/ficha.js'); ?>"></script>

</body>
</html>
