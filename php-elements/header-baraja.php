<?php /* Cabecera de la home y de about.php en la rama rediseno-baraja-2026-11: la de siempre sin dat.gui, con día/noche y el ajuste del fluido. Las páginas de proyecto siguen con header.php / header-works.php. */ ?>
<?php
require_once __DIR__ . '/i18n.php';
$siteName = 'Alex Dasi Portfolio';
$pageTitle = isset($pageTitle) && is_string($pageTitle) && trim($pageTitle) !== ''
    ? trim($pageTitle)
    : $siteName;
$metaDescription = isset($metaDescription) && is_string($metaDescription) && trim($metaDescription) !== ''
    ? trim($metaDescription)
    : 'Portfolio of Alex Dasi, product, web and systems designer. I take complex, ambiguous problems and make them clear: products, websites and the systems behind them.';

$assetVersion = static function (string $relativePath): string {
    $fullPath = dirname(__DIR__) . '/' . ltrim($relativePath, '/');
    return is_file($fullPath) ? (string) filemtime($fullPath) : '1';
};
?>

<!doctype html>

<html lang="en">

    <head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#f7ff99">
    <meta property="og:title" content="<?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:type" content="website">
    <?php $ogImage = isset($ogImage) && is_string($ogImage) && trim($ogImage) !== '' ? trim($ogImage) : 'https://alexdasi.com/images/og-alexdasi-portfolio.jpg'; $ogUrl = 'https://alexdasi.com' . strtok($_SERVER['REQUEST_URI'] ?? '/', '?'); ?>
    <meta property="og:url" content="<?php echo htmlspecialchars($ogUrl, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image" content="<?php echo htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image:secure_url" content="<?php echo htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Alex Dasi — product, web and systems designer">
    <meta name="twitter:image" content="<?php echo htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:site_name" content="Alex Dasi Portfolio">
    <meta name="twitter:card" content="summary_large_image">
    <title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
    <link rel="alternate" hreflang="en" href="https://alexdasi.com<?php echo htmlspecialchars(i18n_url('en'), ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="es" href="https://alexdasi.com<?php echo htmlspecialchars(i18n_url('es'), ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="x-default" href="https://alexdasi.com<?php echo htmlspecialchars(i18n_url('es'), ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="icon" type="image/svg+xml" href="/images/vectors/arrow.svg">
        
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">    

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HSXNYNQRKG"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HSXNYNQRKG');
    </script>

    <!-- cursor -->

    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../js/cursor.js"></script> -->



    <script>
        /* Rama rediseno-baraja-2026-11: todo se decide antes de pintar para que no parpadee.
           - Día / noche: día = blanco roto + tinta (lima solo de acento); noche = negro + lima. Se recuerda.
           - ?pisos=a|b: dos maneras de pintar «los pisos» en día (feedback 78).
           - Cursor: color al azar de una paleta corta al abrir; la tecla espacio pasa al siguiente (feedback 80).
             ?cursor=fijo = solo lima. */
        (function () {
            var html = document.documentElement;
            var q = new URLSearchParams(location.search);
            var tema = 'dia';
            try { tema = localStorage.getItem('alexdasi-tema') || 'dia'; } catch (e) {}
            <?php if (!empty($temaForzado)): ?>tema = '<?php echo $temaForzado === 'noche' ? 'noche' : 'dia'; ?>';<?php endif; ?>
            html.classList.add(tema === 'noche' ? 'tema-noche' : 'tema-dia');
            html.classList.add(q.get('pisos') === 'b' ? 'pisos-b' : 'pisos-a');
            var fondo = tema === 'noche' ? { r: 0, g: 0, b: 0 } : { r: 245, g: 243, b: 236 };
            /* Paleta del cursor: tonos que se leen sobre blanco roto y sobre negro (el lima incluido). */
            var paleta = [
                { r: 236, g: 249, b: 142 },  /* lima */
                { r: 255, g: 168, b: 140 },  /* coral */
                { r: 150, g: 200, b: 255 },  /* cielo */
                { r: 200, g: 170, b: 255 },  /* lila */
                { r: 140, g: 230, b: 185 },  /* menta */
                { r: 255, g: 212, b: 110 }   /* albaricoque */
            ];
            var fijo = q.get('cursor') === 'fijo';
            var i = fijo ? 0 : Math.floor(Math.random() * paleta.length);
            window.__CURSOR = { paleta: paleta, i: i, fijo: fijo };
            /* El fluido de siempre como cursor, pero plano; sin manchas al cargar. */
            window.__FLUID_PRESET = {
                FLAT: true, SHADING: false, BLOOM: false, SUNRAYS: false, COLORFUL: false,
                NO_INTRO_SPLATS: true, BACK_COLOR: fondo, EFFECT_COLOR: paleta[i],
                EFFECT_OPACITY: 0.9, DENSITY_DISSIPATION: 1.1, CURL: 2, PRESSURE_ITERATIONS: 20,
                SPLAT_RADIUS: 0.3, DYE_RESOLUTION: 512,
                DITHER_URL: 'images/vectors/arrow.svg' /* relativa: vale en vivo y en la exportación estática */
            };
        })();
    </script>

    <link rel="stylesheet" href="/scss/js-style/swiper-bundle.min.css?v=<?php echo $assetVersion('scss/js-style/swiper-bundle.min.css'); ?>"/>

    <link rel="stylesheet" href="/css/style.css?v=<?php echo $assetVersion('css/style.css'); ?>">



    </head>