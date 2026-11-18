<?php
/* «About»: lo que salió de la home (rama rediseno-baraja-2026-11, ATELIER conv. 1330).
   Las pantallas de siempre (UX/UI, About, Process, Contact) con sus pisos y su flecha.
   ?s=uxui|about|process|contact abre directamente en esa pantalla. */
$bodyClass = 'sitio-baraja pagina-about';
$pageTitle = 'About · Alex Dasi';
$temaForzado = 'noche'; // About, UX/UI, Process y Contact se diseñaron en oscuro: se quedan así (rescatar, no rehacer)
include 'php-elements/header-baraja.php';
$secciones = ['uxui' => 0, 'about' => 1, 'process' => 2, 'contact' => 3];
$s = isset($_GET['s']) && isset($secciones[$_GET['s']]) ? $_GET['s'] : 'about';
$navActual = $s === 'process' ? 'about' : $s;
$pisos = ($lang === 'es') ? 'UX/UI|SOBRE MÍ|PROCESO|CONTACTO' : 'UX/UI|ABOUT|PROCESS|CONTACT';
?>

<body class="<?php echo $bodyClass; ?>">

    <?php include 'php-elements/nav-baraja.php'?>

<div class="hiddenMobile swiper MainSwiper" data-menu="<?php echo $pisos; ?>" data-initial="<?php echo $secciones[$s]; ?>">
    <div class="swiper-wrapper">
        <div class="swiper-slide slide-works">
            <?php include 'php-pages/works.php'?>
        </div>
        <div class="swiper-slide slide-about">
            <?php include 'php-pages/about.php'?>
        </div>
        <div class="swiper-slide slide-process">
            <?php include 'php-pages/process.php'?>
        </div>
        <div class="swiper-slide slide-contact">
            <?php include 'php-pages/contact.php'?>
        </div>
    </div>

    <div class="swiper-pagination"></div>
    <?php include 'php-elements/arrow.php'?>
</div>

<div class="hiddenDesktop">
    <div class="swiper-wrapper">
        <div class="swiper-slide slide-works" id="s-uxui">
            <?php include 'php-pages/works-mobile.php'?>
        </div>
        <div class="swiper-slide slide-about" id="s-about">
            <?php include 'php-pages/about.php'?>
        </div>
        <div class="swiper-slide slide-process" id="s-process">
            <?php include 'php-pages/process.php'?>
        </div>
        <div class="swiper-slide slide-contact" id="s-contact">
            <?php include 'php-pages/contact.php'?>
        </div>
    </div>
</div>

    <?php include 'php-elements/js-baraja.php'?>
    <script>
        /* Móvil: abrir en la sección pedida */
        (function () {
            if (window.innerWidth > 1280) return;
            var el = document.getElementById('s-<?php echo $s; ?>');
            if (el && '<?php echo $s; ?>' !== 'uxui') setTimeout(function () { el.scrollIntoView(); }, 60);
        })();
    </script>

</body>
</html>
