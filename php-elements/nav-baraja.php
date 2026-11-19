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
        <li class="nav--items single"> <a href="index.php">alex dasi</a>
        </li>
    </ul>
</nav>
<div class="lang-switch" role="group" aria-label="Language">
    <a class="lang-switch__item<?php echo $isEs ? ' is-active' : ''; ?>" data-i18n-keep href="<?php echo htmlspecialchars(i18n_url('es'), ENT_QUOTES, 'UTF-8'); ?>" hreflang="es" lang="es"<?php echo $isEs ? ' aria-current="true"' : ''; ?>>ES</a>
    <a class="lang-switch__item<?php echo $isEs ? '' : ' is-active'; ?>" href="<?php echo htmlspecialchars(i18n_url('en'), ENT_QUOTES, 'UTF-8'); ?>" hreflang="en" lang="en"<?php echo $isEs ? '' : ' aria-current="true"'; ?>>EN</a>
</div>
<p class="press-space" aria-hidden="true">PRESS SPACE<span class="press-space__cara">:)</span></p>
<nav class="nav-sutil" aria-label="More">
    <a class="nav-sutil__item nav-sutil__item--uxui<?php echo $navActual === 'uxui' ? ' is-active' : ''; ?>" href="about.php?s=uxui">UX/UI</a>
    <a class="nav-sutil__item<?php echo $navActual === 'about' ? ' is-active' : ''; ?>" href="about.php?s=about">About</a>
    <a class="nav-sutil__item<?php echo $navActual === 'contact' ? ' is-active' : ''; ?>" href="about.php?s=contact">Contact</a>
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
$mm = [
    ['uxui', 'UX/UI', 'UX/UI'],
    ['about', 'Sobre mí', 'About'],
    ['contact', 'Contacto', 'Contact'],
];
?>
<header class="barra-movil" data-barra-movil>
    <a class="barra-movil__nombre" href="index.php">alex dasi</a>
    <button class="barra-movil__abrir" type="button" data-menu-abrir aria-expanded="false" aria-controls="menu-movil" aria-label="<?php echo $isEs ? 'Abrir menú' : 'Open menu'; ?>">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 9h17M3.5 15h17" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
    </button>
</header>
<div class="menu-movil" id="menu-movil" data-menu-movil role="dialog" aria-modal="true" aria-label="<?php echo $isEs ? 'Menú' : 'Menu'; ?>" hidden>
    <div class="menu-movil__barra">
        <a class="barra-movil__nombre" href="index.php">alex dasi</a>
        <button class="barra-movil__abrir menu-movil__cerrar" type="button" data-menu-cerrar aria-label="<?php echo $isEs ? 'Cerrar menú' : 'Close menu'; ?>">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
    </div>
    <nav class="menu-movil__enlaces" aria-label="<?php echo $isEs ? 'Secciones' : 'Sections'; ?>">
        <?php foreach ($mm as $i => $m): ?>
        <a class="menu-movil__enlace<?php echo $navActual === $m[0] ? ' is-active' : ''; ?>" href="about.php?s=<?php echo $m[0]; ?>"<?php echo $navActual === $m[0] ? ' aria-current="page"' : ''; ?> style="--i: <?php echo $i; ?>"><?php echo $isEs ? $m[1] : $m[2]; ?></a>
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
        <a class="menu-movil__contacto" href="https://wa.me/34616420048">WhatsApp</a>
        <a class="menu-movil__contacto" href="mailto:hola@alexdasi.com">hola@alexdasi.com</a>
    </div>
</div>
