<div class="follow hiddenMobile"></div>
<nav class="nav nav--top">
    <ul>
        <li class="nav--items single"> <a href="../../index.php">alex dasi</a>
        </li>
    </ul>
</nav>
<?php $isEs = isset($lang) && $lang === 'es'; ?>
<div class="lang-switch" role="group" aria-label="Language">
    <a class="lang-switch__item<?php echo $isEs ? '' : ' is-active'; ?>" data-i18n-keep href="<?php echo htmlspecialchars(i18n_url('en'), ENT_QUOTES, 'UTF-8'); ?>" hreflang="en" lang="en"<?php echo $isEs ? '' : ' aria-current="true"'; ?>>EN</a>
    <a class="lang-switch__item<?php echo $isEs ? ' is-active' : ''; ?>" href="<?php echo htmlspecialchars(i18n_url('es'), ENT_QUOTES, 'UTF-8'); ?>" hreflang="es" lang="es"<?php echo $isEs ? ' aria-current="true"' : ''; ?>>ES</a>
</div>
