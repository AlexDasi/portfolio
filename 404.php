<?php
/* 404 propia con el diseño de la web (v9, QA H-11; ATELIER conv. 1330). La usan .htaccess (ErrorDocument 404) y proyecto.php /
   caso.php cuando el ?p= / ?c= no existe (antes: la 404 de Hostinger en inglés y, en fichas, la de Berto con un 200). */
if (!headers_sent()) { http_response_code(404); }
$bodyClass = 'sitio-baraja pagina-404';
$pageTitle = ['es' => 'Página no encontrada · Alex Dasi', 'en' => 'Page not found · Alex Dasi'];
$noIndex = true;
$sinSwiper = true;
$canonParams = [];
$headExtra = '<base href="/">'; // servida por ErrorDocument en cualquier ruta: los enlaces relativos de la cabecera salen de la raíz
include __DIR__ . '/php-elements/header-baraja.php';
$es = $lang === 'es';
$navActual = '';
$e = static function ($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); };
?>

<body class="<?php echo $bodyClass; ?>">
    <?php include __DIR__ . '/php-elements/nav-baraja.php'?>

<main class="sm sm--404">
    <p class="sm__h2">404</p>
    <h1 class="sm__titulo sm__titulo--enorme"><span class="sm__grueso"><?php echo $es ? 'No está' : 'Not here'; ?></span><span class="sm__punto" aria-hidden="true"></span></h1>
    <p class="sm__entrada"><?php echo $e($es ? 'Esta página no existe: puede que el enlace esté mal o que la página se haya movido. Los proyectos siguen aquí.' : 'This page doesn’t exist: the link may be wrong or the page may have moved. The projects are still here.'); ?></p>
    <div class="sm__botones">
        <a class="sm__boton sm__boton--lleno" href="/index.php#works"><?php echo $e($es ? 'Ver proyectos' : 'See projects'); ?></a>
        <a class="sm__boton" href="/about.php?s=contact"><?php echo $e($es ? 'Escríbeme' : 'Get in touch'); ?></a>
    </div>
</main>

    <?php include __DIR__ . '/php-elements/js-baraja.php'?>
</body>
</html>
