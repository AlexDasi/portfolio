<?php
/* Cabecera fina de la home y de «about» (rama rediseno-baraja-2026-11).
   Igual que la de siempre (idioma a la izquierda, «alex dasi» en el centro)
   + accesos sutiles a la derecha: UX/UI, About, Contact y día/noche. */
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
    <a class="lang-switch__item<?php echo $isEs ? '' : ' is-active'; ?>" data-i18n-keep href="<?php echo htmlspecialchars(i18n_url('en'), ENT_QUOTES, 'UTF-8'); ?>" hreflang="en" lang="en"<?php echo $isEs ? '' : ' aria-current="true"'; ?>>EN</a>
    <a class="lang-switch__item<?php echo $isEs ? ' is-active' : ''; ?>" href="<?php echo htmlspecialchars(i18n_url('es'), ENT_QUOTES, 'UTF-8'); ?>" hreflang="es" lang="es"<?php echo $isEs ? ' aria-current="true"' : ''; ?>>ES</a>
</div>
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
