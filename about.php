<?php
/* About v2 (feedback 79, rama rediseno-baraja-2026-11, ATELIER conv. 1330): rediseñado en blanco roto con el
   lenguaje de la home (antes se traían tal cual las pantallas oscuras). Misma estructura que la home: pantallas
   completas que se pasan con «los pisos» o la flecha. ?s=about|uxui|contact abre en esa pantalla. */
$bodyClass = 'sitio-baraja pagina-about';
$pageTitle = 'Alex Dasi · About';
include 'php-elements/header-baraja.php';
include 'php-pages/sobre-mi.php';
$pantallas = ['hola', 'como', 'tray', 'uxui', 'habla'];
$secciones = ['about' => 0, 'process' => 1, 'uxui' => 3, 'contact' => 4];
$s = isset($_GET['s']) && isset($secciones[$_GET['s']]) ? $_GET['s'] : 'about';
$navActual = $s === 'process' ? 'about' : $s;
$pisos = ($lang === 'es') ? 'HOLA|CÓMO TRABAJO|TRAYECTORIA|UX/UI|HABLAMOS' : 'HELLO|HOW I WORK|BACKGROUND|UX/UI|LET’S TALK';
?>

<body class="<?php echo $bodyClass; ?>">

    <?php include 'php-elements/nav-baraja.php'?>

<div class="hiddenMobile swiper MainSwiper" data-menu="<?php echo $pisos; ?>" data-wheel="off" data-initial="<?php echo $secciones[$s]; ?>">
    <div class="swiper-wrapper">
        <?php foreach ($pantallas as $k): ?>
        <div class="swiper-slide slide-sm"><?php sobre_pantalla($k, $T, $e, $flecha, $wa, $cv); ?></div>
        <?php endforeach; ?>
    </div>
    <div class="swiper-pagination"></div>
    <?php include 'php-elements/arrow.php'?>
</div>

<div class="hiddenDesktop sm-movil">
    <?php foreach ($pantallas as $k): ?>
    <div class="pantalla pantalla--sm" id="s-<?php echo $k; ?>"><?php sobre_pantalla($k, $T, $e, $flecha, $wa, $cv); ?></div>
    <?php endforeach; ?>
</div>

    <?php include 'php-elements/js-baraja.php'?>
    <script>
        /* Escritorio: el acceso de arriba que toca se marca según la pantalla */
        window.addEventListener('pisos:cambio', function (e) {
            var marca = { 0: 'about', 1: 'about', 2: 'about', 3: 'uxui', 4: 'contact' }[e.detail.index];
            document.querySelectorAll('.nav-sutil__item').forEach(function (a) {
                a.classList.toggle('is-active', a.getAttribute('href').indexOf('s=' + marca) !== -1);
            });
        });
        /* Móvil: abrir en la sección pedida */
        (function () {
            if (window.innerWidth > 1280) return;
            var id = { about: 'hola', process: 'como', uxui: 'uxui', contact: 'habla' }['<?php echo $s; ?>'];
            var el = document.getElementById('s-' + id);
            if (el && id !== 'hola') setTimeout(function () { el.scrollIntoView(); }, 60);
        })();
    </script>

</body>
</html>
