<?php
/* Home = intro + portfolio (baraja). Rama rediseno-baraja-2026-11 (ATELIER conv. 1330).
   About, UX/UI, proceso y contacto viven en about.php (acceso sutil arriba a la derecha).
   Estructura de siempre: pantallas completas; solo se cambia de pantalla con «los pisos» o la flecha.
   La rueda no cambia de pantalla: en la intro mueve el fluido y en la baraja pasa cartas. */
$bodyClass = 'sitio-baraja home-pisos'; /* v10: home-pisos = en móvil la página se imanta a cada pantalla */
include 'php-elements/header-baraja.php';
$navActual = 'home';
$conPie = true; /* v11: el menú «Contacto» baja al pie */
/* v40 (Alex, 23/11): + dos pisos, Producto y Sobre mí, entre Proyectos y Hablamos (php-elements/banners-home.php) */
$pisos = ($lang === 'es') ? 'INICIO|PROYECTOS|PRODUCTO|SOBRE MÍ|HABLAMOS' : 'HOME|WORKS|PRODUCT|ABOUT|LET’S TALK'; /* v15: el pie es el último piso */
$inicial = isset($_GET['carta']) ? 1 : ((($_GET['s'] ?? '') === 'contact') ? 4 : 0);
include 'php-elements/banners-home.php';
?>

<body class="<?php echo $bodyClass; ?>">

    <?php include 'php-elements/nav-baraja.php'?>

<!-- ESCRITORIO (> 1280 px): las dos pantallas en el MainSwiper de siempre -->
<div class="hiddenMobile swiper MainSwiper" data-menu="<?php echo $pisos; ?>" data-wheel="off"<?php echo $inicial ? ' data-initial="' . $inicial . '"' : ''; /* v9 (QA H-02): vuelta desde una ficha; v15: ?s=contact abre en el pie */ ?>>
    <div class="swiper-wrapper">
        <div class="swiper-slide slide-index">
            <?php include 'php-pages/intro.php'?>
        </div>
        <div class="swiper-slide slide-baraja">
            <?php include 'php-elements/baraja.php'?>
        </div>
        <div class="swiper-slide slide-banner"><?php banner_home('producto', $T, $e, $es); ?></div>
        <div class="swiper-slide slide-banner"><?php banner_home('sobre', $T, $e, $es); ?></div>
        <div class="swiper-slide slide-sm slide-pie">
            <?php $pieEnPiso = true; include 'php-elements/pie-contacto.php'; $pieEnPiso = false; ?>
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
        <?php /* v10 (Alex, 21/11): botón de llamada a la acción: «Proyectos» y la flecha dentro del círculo del acento, más grande,
           latiendo igual que antes. La intro ocupa justo una pantalla y la página se imanta: o intro o proyectos. */ ?>
        <?php /* v40 (Alex, 23/11: «si va imantado, el botón deja de tener sentido en móvil»): pasa a pista fina «Desliza», que se va al primer gesto */ ?>
        <a class="bajar" href="#works" data-bajar><span class="bajar__txt"><?php echo $lang === 'es' ? 'Desliza' : 'Swipe'; ?></span><span class="bajar__bola" aria-hidden="true"><svg viewBox="0 0 16 24"><path d="M8 2v19M2 15l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span></a>
    </div>
    <div class="pantalla pantalla--baraja" id="works">
        <?php include 'php-elements/baraja.php'?>
    </div>
    <div class="pantalla pantalla--banner" id="producto"><?php banner_home('producto', $T, $e, $es); ?></div>
    <div class="pantalla pantalla--banner" id="sobre-mi"><?php banner_home('sobre', $T, $e, $es); ?></div>
    <?php include 'php-elements/pie-contacto.php'?>
</div>

    <?php include 'php-elements/js-baraja.php'?>

</body>
</html>
