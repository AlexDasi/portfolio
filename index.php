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
<div class="hiddenMobile swiper MainSwiper" data-menu="<?php echo $pisos; ?>" data-wheel="off"<?php echo isset($_GET['carta']) ? ' data-initial="1"' : ''; /* v9 (QA H-02): vuelta desde una ficha */ ?>>
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
        <?php /* v9 (QA H-01): pista para bajar en móvil y tablet: la flecha fina de la de escritorio + «Proyectos», al pie de la
           intro y siempre dentro de la primera pantalla (la esfera encoge en pantallas bajas para que quepa). */ ?>
        <a class="bajar" href="#works" data-bajar><span><?php echo $lang === 'es' ? 'Proyectos' : 'Projects'; ?></span><svg viewBox="0 0 16 24" aria-hidden="true"><path d="M8 1v21M1.5 15.5 8 22l6.5-6.5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg></a>
    </div>
    <div class="pantalla pantalla--baraja" id="works">
        <?php include 'php-elements/baraja.php'?>
    </div>
</div>

    <?php include 'php-elements/js-baraja.php'?>

</body>
</html>
