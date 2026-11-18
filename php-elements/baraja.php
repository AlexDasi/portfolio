<?php
/**
 * Baraja de proyectos (home). Datos y flags en content/baraja.json.
 * Una sola maqueta para todos los tamaños: js/baraja.js decide el modo
 * (escritorio = baraja inclinada · móvil = una carta grande con swipe)
 * y qué vídeo carga (desktop o móvil). Solo se reproduce la carta de delante.
 */
$barajaData = json_decode((string) file_get_contents(dirname(__DIR__) . '/content/baraja.json'), true);
$barajaLang = (isset($lang) && $lang === 'es') ? 'es' : 'en';
$barajaCartas = array_values(array_filter($barajaData['proyectos'] ?? [], static function ($p) {
    return empty($p['oculta']);
}));
$barajaTxt = [
    'concept' => $barajaLang === 'es' ? 'Concepto' : 'Concept',
    'soon' => $barajaLang === 'es' ? 'Próximamente' : 'Coming soon',
    'soonSub' => $barajaLang === 'es' ? 'Web en marcha' : 'Work in progress',
    'visit' => $barajaLang === 'es' ? 'Ver la web' : 'Visit site',
    'label' => $barajaLang === 'es' ? 'Proyectos' : 'Projects',
    'hint' => $barajaLang === 'es' ? 'Usa la rueda o arrastra' : 'Scroll or drag',
    'hintTouch' => $barajaLang === 'es' ? 'Desliza' : 'Swipe',
];
$e = static function ($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); };
?>
<section class="baraja" data-baraja aria-roledescription="carousel" aria-label="<?php echo $e($barajaTxt['label']); ?>">
    <div class="baraja__mesa" data-baraja-mesa>
        <?php foreach ($barajaCartas as $i => $p):
            $neutra = !empty($p['neutra']);
            $slug = $p['slug'];
            $nombre = $neutra ? $barajaTxt['soon'] : $p['nombre'];
            $url = $neutra ? null : ($p['url'] ?? null);
            $tag = $url ? 'a' : 'div';
            $media = 'content/baraja/' . $slug . '_scroll-';
        ?>
        <<?php echo $tag; ?> class="carta<?php echo $neutra ? ' carta--neutra' : ''; ?>" data-carta="<?php echo $i; ?>"
            <?php if ($url): ?>href="<?php echo $e($url); ?>" target="_blank" rel="noopener"<?php endif; ?>
            aria-label="<?php echo $e($nombre); ?>" tabindex="-1">
            <div class="carta__cara">
                <?php if (!$neutra): ?>
                <img class="carta__poster" alt="" decoding="async" draggable="false"
                    data-poster-d="<?php echo $e($media . 'desktop_poster.jpg'); ?>"
                    data-poster-m="<?php echo $e($media . 'movil_poster.jpg'); ?>">
                <video class="carta__video" muted loop playsinline preload="none" disablepictureinpicture
                    data-video-d="<?php echo $e($media . 'desktop.mp4'); ?>"
                    data-video-m="<?php echo $e($media . 'movil.mp4'); ?>"></video>
                <?php else: ?>
                <div class="carta__neutra">
                    <span class="carta__neutra-punto" aria-hidden="true"></span>
                    <p><?php echo $e($barajaTxt['soon']); ?></p>
                </div>
                <?php endif; ?>
            </div>
        </<?php echo $tag; ?>>
        <?php endforeach; ?>
    </div>

    <div class="baraja__pie" aria-live="polite">
        <?php foreach ($barajaCartas as $i => $p):
            $neutra = !empty($p['neutra']);
            $url = $neutra ? null : ($p['url'] ?? null);
        ?>
        <div class="ficha" data-ficha="<?php echo $i; ?>"<?php echo $i === 0 ? '' : ' hidden'; ?>>
            <?php if ($neutra): ?>
            <p class="ficha__nombre"><?php echo $e($barajaTxt['soon']); ?></p>
            <p class="ficha__meta"><?php echo $e($barajaTxt['soonSub']); ?></p>
            <?php else: ?>
            <p class="ficha__nombre"><?php echo $e($p['nombre']); ?><?php if (($p['tipo'] ?? '') === 'concepto'): ?> <span class="ficha__tag"><?php echo $e($barajaTxt['concept']); ?></span><?php endif; ?></p>
            <p class="ficha__meta"><?php echo $e($p['sector'][$barajaLang]); ?> <span aria-hidden="true">·</span> <?php echo $e($p['anio']); ?></p>
            <p class="ficha__texto"><?php echo $e($p['problema'][$barajaLang]); ?></p>
            <?php if ($url): ?>
            <a class="ficha__link" href="<?php echo $e($url); ?>" target="_blank" rel="noopener"><?php echo $e($barajaTxt['visit']); ?><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1"/></svg></a>
            <?php endif; ?>
            <?php endif; ?>
        </div>
        <?php endforeach; ?>
    </div>

    <p class="baraja__pista" aria-hidden="true"><span class="baraja__pista-mesa"><?php echo $e($barajaTxt['hint']); ?></span><span class="baraja__pista-una"><?php echo $e($barajaTxt['hintTouch']); ?></span></p>
</section>
