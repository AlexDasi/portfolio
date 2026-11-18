<?php
/* Home = intro + portfolio (baraja). Rama rediseno-baraja-2026-11 (ATELIER conv. 1330).
   About, UX/UI, proceso y contacto viven en about.php (acceso sutil arriba a la derecha).
   Estructura de siempre: pantallas completas; solo se cambia de pantalla con «los pisos» o la flecha.
   La rueda no cambia de pantalla: en la intro mueve el fluido y en la baraja pasa cartas. */
$bodyClass = 'sitio-baraja';
include 'php-elements/header-baraja.php';
$navActual = 'home';
$pisos = ($lang === 'es') ? 'INICIO|PROYECTOS' : 'HOME|WORKS';
?>

<body class="<?php echo $bodyClass; ?>">

    <?php include 'php-elements/nav-baraja.php'?>

<!-- ESCRITORIO (> 1280 px): las dos pantallas en el MainSwiper de siempre -->
<div class="hiddenMobile swiper MainSwiper" data-menu="<?php echo $pisos; ?>" data-wheel="off">
    <div class="swiper-wrapper">
        <div class="swiper-slide slide-index">
            <?php include 'php-pages/intro.php'?>
        </div>
        <div class="swiper-slide slide-baraja">
            <?php include 'php-elements/baraja.php'?>
        </div>
    </div>

    <div class="swiper-pagination"></div>
    <?php include 'php-elements/arrow.php'?>
</div>

<!-- MÓVIL Y TABLET (≤ 1280 px): las mismas dos pantallas, una debajo de otra -->
<div class="hiddenDesktop">
    <div class="pantalla pantalla--intro">
        <?php include 'php-pages/intro.php'?>
    </div>
    <div class="pantalla pantalla--baraja" id="works">
        <?php include 'php-elements/baraja.php'?>
    </div>
</div>

    <?php include 'php-elements/js-baraja.php'?>

</body>
</html>
