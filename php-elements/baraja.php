<?php
/**
 * Baraja de proyectos (home). Datos y flags en content/baraja.json.
 * Una sola maqueta para todos los tamaños: js/baraja.js decide el modo
 * (escritorio = baraja inclinada · móvil = una carta grande con swipe)
 * y qué vídeo carga (desktop o móvil). Solo se reproduce la carta de delante.
 */
$barajaData = json_decode((string) file_get_contents(dirname(__DIR__) . '/content/baraja.json'), true);
$barajaLang = (isset($lang) && $lang === 'es') ? 'es' : 'en';
// v8 (feedback 152): ?baraja=corta oculta además las que se proponen quitar (quitar_propuesta), para comparar
$barajaCorta = ($_GET['baraja'] ?? '') === 'corta';
$barajaCartas = array_values(array_filter($barajaData['proyectos'] ?? [], static function ($p) use ($barajaCorta) {
    return empty($p['oculta']) && !($barajaCorta && !empty($p['quitar_propuesta']));
}));
$barajaTxt = [
    'concept' => $barajaLang === 'es' ? 'Concepto' : 'Concept',
    'soon' => $barajaLang === 'es' ? 'Próximamente' : 'Coming soon',
    'soonSub' => $barajaLang === 'es' ? 'Web en marcha' : 'Work in progress',
    'visit' => $barajaLang === 'es' ? 'Visitar web' : 'Visit site',
    'ficha' => $barajaLang === 'es' ? 'Ver proyecto' : 'View project',
    'client' => $barajaLang === 'es' ? 'Cliente' : 'Client',
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
            $url = $neutra ? null : 'proyecto.php?p=' . $slug; // la carta abre su ficha (feedback 94)
            $tag = $url ? 'a' : 'div';
            $media = 'content/baraja/' . $slug . '_scroll-';
        ?>
        <<?php echo $tag; ?> class="carta<?php echo $neutra ? ' carta--neutra' : ''; ?>" data-carta="<?php echo $i; ?>"
            <?php if ($url): ?>href="<?php echo $e($url); ?>"<?php endif; ?>
            aria-label="<?php echo $e($nombre); ?>" tabindex="-1">
            <div class="carta__cara">
                <?php if (!$neutra): ?>
                <img class="carta__poster" alt="" decoding="async" draggable="false"
                    data-poster-d="<?php echo $e($media . 'desktop_poster.jpg'); ?>"
                    data-poster-m="<?php echo $e($media . 'movil_poster.jpg'); ?>"
                    data-srcset-d="<?php echo $e($media . 'desktop_poster-560.webp 560w, ' . $media . 'desktop_poster-1000.webp 1000w'); ?>"
                    data-srcset-m="<?php echo $e($media . 'movil_poster-420.webp 420w, ' . $media . 'movil_poster-780.webp 780w'); ?>">
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
        <?php $barajaN = count($barajaCartas); foreach ($barajaCartas as $i => $p):
            $neutra = !empty($p['neutra']);
            $web = $neutra ? null : ($p['url'] ?? null);
            $num = str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT) . ' / ' . str_pad((string) $barajaN, 2, '0', STR_PAD_LEFT);
        ?>
        <div class="ficha" data-ficha="<?php echo $i; ?>"<?php echo $i === 0 ? '' : ' hidden'; ?>>
            <div class="ficha__cab">
                <span class="ficha__num"><?php echo $num; ?></span>
                <?php if (!$neutra): ?><span class="ficha__tipo"><?php echo $e(($p['tipo'] ?? '') === 'concepto' ? $barajaTxt['concept'] : $barajaTxt['client']); ?></span><?php endif; ?>
            </div>
            <?php if ($neutra): ?>
            <p class="ficha__nombre"><?php echo $e($barajaTxt['soon']); ?></p>
            <p class="ficha__meta"><?php echo $e($barajaTxt['soonSub']); ?></p>
            <?php else: ?>
            <p class="ficha__nombre"><?php echo $e($p['nombre']); ?></p>
            <p class="ficha__meta"><?php echo $e($p['sector'][$barajaLang]); ?> <span aria-hidden="true">·</span> <?php echo $e($p['anio']); ?></p>
            <p class="ficha__texto"><?php echo $e($p['problema'][$barajaLang]); ?></p>
            <div class="ficha__acciones">
                <a class="ficha__link" href="proyecto.php?p=<?php echo $e($p['slug']); ?>"><?php echo $e($barajaTxt['ficha']); ?><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1"/></svg></a>
                <?php if ($web): ?><a class="ficha__link ficha__link--fuera" href="<?php echo $e($web); ?>" target="_blank" rel="noopener"><?php echo $e($barajaTxt['visit']); ?><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1"/></svg></a><?php endif; ?>
            </div>
            <?php endif; ?>
        </div>
        <?php endforeach; ?>
    </div>

    <div class="baraja__regla" aria-hidden="true"><?php foreach ($barajaCartas as $i => $p): ?><i data-tick="<?php echo $i; ?>"></i><?php endforeach; ?></div>

    <p class="baraja__pista" aria-hidden="true"><span class="baraja__pista-mesa"><?php echo $e($barajaTxt['hint']); ?></span><span class="baraja__pista-una"><?php echo $e($barajaTxt['hintTouch']); ?></span></p>
</section>
