<?php
/* Cabecera fina de la home y de «about» (rama rediseno-baraja-2026-11).
   Idioma a la izquierda (ES por defecto), «alex dasi» en el centro, accesos sutiles a la derecha.
   En día, todo en tinta; el lima solo como acento (feedback 81). */
$isEs = isset($lang) && $lang === 'es';
$navActual = $navActual ?? 'home';
?>
<div class="follow hiddenMobile"></div>
<nav class="nav nav--top">
    <ul>
        <li class="nav--items single"> <a href="index.php"><span class="logo-txt">alex dasi</span><?php /* v24 (Alex): sin punto en el logo: se salía del subrayado */ ?></a>
        </li>
    </ul>
</nav>
<div class="lang-switch" role="group" aria-label="Language">
    <a class="lang-switch__item<?php echo $isEs ? ' is-active' : ''; ?>" data-i18n-keep href="<?php echo htmlspecialchars(i18n_url('es'), ENT_QUOTES, 'UTF-8'); ?>" hreflang="es" lang="es"<?php echo $isEs ? ' aria-current="true"' : ''; ?>>ES</a>
    <a class="lang-switch__item<?php echo $isEs ? '' : ' is-active'; ?>" href="<?php echo htmlspecialchars(i18n_url('en'), ENT_QUOTES, 'UTF-8'); ?>" hreflang="en" lang="en"<?php echo $isEs ? '' : ' aria-current="true"'; ?>>EN</a>
</div>
<p class="press-space" aria-hidden="true"><?php echo $isEs ? 'PULSA ESPACIO' : 'PRESS SPACE'; /* v20 (Alex): en el idioma de la página */ ?><span class="press-space__cara">:)</span></p>
<?php /* v15 (Alex, 21/11): cambiar la piel 3D de la esfera a mano (botón o tecla E), como el PRESS SPACE del color. js/esfera.js */ ?>
<button class="piel-3d" type="button" data-piel-3d aria-label="<?php echo $isEs ? 'Cambiar la esfera 3D' : 'Change the 3D sphere'; ?>"><span class="piel-3d__tecla"><?php echo $isEs ? 'PULSA E' : 'PRESS E'; ?></span><svg class="piel-3d__icono" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.1"/><ellipse cx="8" cy="8" rx="6.25" ry="2.4" fill="none" stroke="currentColor" stroke-width="1.1"/></svg><span class="piel-3d__nombre" data-piel-nombre>3D</span></button>
<nav class="nav-sutil" aria-label="More">
    <a class="nav-sutil__item nav-sutil__item--uxui<?php echo $navActual === 'uxui' ? ' is-active' : ''; ?>" href="uxui.php"><?php echo $isEs ? 'Producto' : 'Product'; /* v24 (Alex: «UX/UI se queda muy específico; lo llamaría Producto») */ ?></a>
    <a class="nav-sutil__item<?php echo $navActual === 'about' ? ' is-active' : ''; ?>" href="about.php?s=about"><?php echo $isEs ? 'Sobre mí' : 'About'; /* v20: el idioma de la página, no el de un traductor que solo corre en algunas */ ?></a>
    <?php /* v15 (Alex, 21/11): «Contact» lleva al pie de la página en la que estés (en los pisos, al último) */ ?>
    <a class="nav-sutil__item<?php echo $navActual === 'contact' ? ' is-active' : ''; ?>" href="<?php echo !empty($conPie) ? '#contacto' : 'about.php?s=contact'; ?>" data-contacto><?php echo $isEs ? 'Contacto' : 'Contact'; ?></a>
    <?php if (empty($temaForzado)): ?>
    <button class="nav-sutil__tema" type="button" data-tema aria-label="Day / night">
        <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.25" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 2.75a5.25 5.25 0 0 1 0 10.5z" fill="currentColor"/></svg>
    </button>
    <?php endif; ?>
</nav>
<?php
/* v8 (feedback 159 + QA móvil H-06): en móvil (≤ 768 px) la cabecera es una barra con FONDO del modo (nada pasa por debajo
   de los textos) con «alex dasi» y un menú de dos líneas; el menú abre un panel a pantalla completa con los accesos en
   grande, idioma, día/noche, WhatsApp y email. Sustituye en móvil a idioma + accesos sueltos (a 320 px o con letra del
   sistema al 125-150 % «EN» pisaba «SOBRE MÍ»). js/menu-movil.js lo abre y cierra. */
/* v11 (Alex, 21/11): + Inicio; UX/UI es página propia; Contacto baja al pie (#contacto) de la página en la que estés */
$mm = [
    ['home', 'Inicio', 'Home', 'index.php'],
    ['uxui', 'Producto', 'Product', 'uxui.php'],
    ['about', 'Sobre mí', 'About', 'about.php'],
    ['contact', 'Contacto', 'Contact', !empty($conPie) ? '#contacto' : 'index.php#contacto'],
];
?>
<?php /* v40 (Alex, 23/11: «el menú en el color acento, que se abra como un círculo que ocupe toda la pantalla y las palabras
   con el efecto cortina que le quitamos a Berto»; «lo de cambiar el color o el material, escóndelo en el menú»):
   botón = círculo del acento; el panel crece en círculo desde él (clip-path) y las palabras suben desde su máscara
   (la cortina circular de Berto v14, conv. 685). Dos fondos para probar: ?menu=acento (por defecto) · ?menu=modo (día/noche).
   Color y Material (la piel de la esfera) viven aquí en móvil y tablet; fuera, el botón suelto de la esfera. */ ?>
<header class="barra-movil" data-barra-movil>
    <a class="barra-movil__nombre" href="index.php">alex dasi</a>
    <button class="barra-movil__abrir" type="button" data-menu-abrir aria-expanded="false" aria-controls="menu-movil" aria-label="<?php echo $isEs ? 'Abrir menú' : 'Open menu'; ?>">
        <span class="barra-movil__bola" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 10h11M6.5 14h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
    </button>
</header>
<div class="menu-movil" id="menu-movil" data-menu-movil role="dialog" aria-modal="true" aria-label="<?php echo $isEs ? 'Menú' : 'Menu'; ?>" hidden>
    <div class="menu-movil__barra">
        <a class="barra-movil__nombre" href="index.php">alex dasi</a>
        <button class="barra-movil__abrir menu-movil__cerrar" type="button" data-menu-cerrar aria-label="<?php echo $isEs ? 'Cerrar menú' : 'Close menu'; ?>">
            <span class="barra-movil__bola" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 8l8 8M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
        </button>
    </div>
    <nav class="menu-movil__enlaces" aria-label="<?php echo $isEs ? 'Secciones' : 'Sections'; ?>">
        <?php foreach ($mm as $i => $m): ?>
        <a class="menu-movil__enlace<?php echo $navActual === $m[0] ? ' is-active' : ''; ?>" href="<?php echo $m[3]; ?>"<?php echo $m[0] === 'contact' ? ' data-menu-contacto' : ''; ?><?php echo $navActual === $m[0] ? ' aria-current="page"' : ''; ?> style="--i: <?php echo $i; ?>"><span class="menu-movil__txt"><?php echo $isEs ? $m[1] : $m[2]; ?></span></a>
        <?php endforeach; ?>
    </nav>
    <div class="menu-movil__pie">
        <div class="menu-movil__fila">
            <div class="menu-movil__idioma" role="group" aria-label="<?php echo $isEs ? 'Idioma' : 'Language'; ?>">
                <a class="menu-movil__chip<?php echo $isEs ? ' is-active' : ''; ?>" data-i18n-keep href="<?php echo htmlspecialchars(i18n_url('es'), ENT_QUOTES, 'UTF-8'); ?>" hreflang="es" lang="es"<?php echo $isEs ? ' aria-current="true"' : ''; ?>>ES</a>
                <a class="menu-movil__chip<?php echo $isEs ? '' : ' is-active'; ?>" href="<?php echo htmlspecialchars(i18n_url('en'), ENT_QUOTES, 'UTF-8'); ?>" hreflang="en" lang="en"<?php echo $isEs ? '' : ' aria-current="true"'; ?>>EN</a>
            </div>
            <?php if (empty($temaForzado)): ?>
            <button class="menu-movil__tema" type="button" data-tema>
                <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.25" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 2.75a5.25 5.25 0 0 1 0 10.5z" fill="currentColor"/></svg>
                <span class="menu-movil__tema-dia"><?php echo $isEs ? 'Modo noche' : 'Night mode'; ?></span><span class="menu-movil__tema-noche"><?php echo $isEs ? 'Modo día' : 'Day mode'; ?></span>
            </button>
            <?php endif; ?>
        </div>
        <div class="menu-movil__fila menu-movil__fila--ajustes">
            <button class="menu-movil__ajuste" type="button" data-menu-color><span class="menu-movil__punto" aria-hidden="true"></span><?php echo $isEs ? 'Color' : 'Colour'; ?></button>
            <button class="menu-movil__ajuste" type="button" data-menu-material><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.1"/><ellipse cx="8" cy="8" rx="6.25" ry="2.4" fill="none" stroke="currentColor" stroke-width="1.1"/></svg><?php echo $isEs ? 'Esfera' : 'Sphere'; ?> · <span data-piel-nombre>3D</span></button>
        </div>
        <a class="menu-movil__contacto" href="https://wa.me/34616420048?text=<?php echo rawurlencode($isEs ? 'Hola Alex, tengo un negocio y me gustaría hablar de mi web.' : 'Hi Alex, I run a business and I’d like to talk about my website.'); ?>">WhatsApp</a>
        <a class="menu-movil__contacto" href="mailto:hola@alexdasi.com">hola@alexdasi.com</a>
    </div>
</div>
