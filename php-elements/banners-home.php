<?php
/* v40 (Alex, 23/11: «en la home debería haber un banner de producto con un CTA a la sección de producto, y un banner con
   About»). Dos pisos nuevos entre Proyectos y Hablamos, los mismos en escritorio (pisos del MainSwiper) y en móvil/tablet
   (pantallas imantadas). Copy y datos de php-pages/sobre-mi.php y content/casos.json: aquí solo las etiquetas de los botones.
   - Producto: titular + lo que hace + los cinco casos por nombre + tres portadas en abanico (guiño a la baraja).
   - Sobre mí: la bola del acento con los 15 años + «Soy Alex.» + marca · web · producto. */
include_once __DIR__ . '/../php-pages/sobre-mi.php'; // $T, $e, $es

if (!function_exists('banner_home')) {
function banner_home(string $k, array $T, callable $e, bool $es): void
{
    $fd = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>';
    if ($k === 'producto') {
        $casos = json_decode((string) file_get_contents(dirname(__DIR__) . '/content/casos.json'), true)['casos'] ?? [];
        $porSlug = [];
        foreach ($casos as $c) { $porSlug[$c['slug']] = $c; }
        $L = $es ? 'es' : 'en';
        $abanico = array_slice($T['casos'], 0, 3); ?>
<section class="banner banner--producto">
    <div class="banner__texto">
        <h2 class="banner__titulo"><?php echo $es ? 'Producto' : 'Product'; ?><i aria-hidden="true">.</i></h2>
        <p class="banner__lead"><?php echo $e($T['ux_p']); ?></p>
        <p class="banner__casos"><?php echo implode(' · ', array_map(static function ($t) use ($e) { return '<span>' . $e($t[1]) . '</span>'; }, $T['casos'])); ?></p>
        <a class="sm__boton sm__boton--lleno banner__cta" href="uxui.php"><?php echo $es ? 'Ver producto' : 'See product work'; ?><?php echo $fd; ?></a>
    </div>
    <a class="banner__abanico" href="uxui.php" tabindex="-1" aria-hidden="true">
        <?php foreach (array_reverse($abanico, true) as $n => $t): $C = $porSlug[$t[0]] ?? null; if (!$C) continue; $p = $C['portada']; ?>
        <span class="banner__hoja banner__hoja--<?php echo $n; ?>"><img src="<?php echo $e($p['chica']); ?>" width="<?php echo (int) $p['wc']; ?>" height="<?php echo (int) round($p['wc'] * $p['h'] / $p['w']); ?>" alt="" loading="lazy" decoding="async"></span>
        <?php endforeach; ?>
    </a>
</section>
<?php } else { ?>
<section class="banner banner--sobre">
    <div class="banner__cifra" aria-hidden="true"><span class="banner__bola"><span>15</span></span></div>
    <div class="banner__texto">
        <h2 class="banner__titulo"><?php echo $e($T['hola_t1']); ?></h2>
        <p class="banner__lead"><span class="banner__fuerte">15 <?php echo $e($T['cifra_k']); ?></span><span class="banner__sub"><?php echo $e($T['cifra_s']); ?></span></p>
        <a class="sm__boton sm__boton--lleno banner__cta" href="about.php?s=about"><?php echo $es ? 'Sobre mí' : 'About me'; ?><?php echo $fd; ?></a>
    </div>
</section>
<?php }
}
}
