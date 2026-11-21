<?php /* Cabecera de la home y de about.php en la rama rediseno-baraja-2026-11: la de siempre sin dat.gui, con día/noche y el ajuste del fluido. Las páginas de proyecto siguen con header.php / header-works.php. */ ?>
<?php
require_once __DIR__ . '/i18n.php';
$siteName = 'Alex Dasi Portfolio';
/* v9 (QA móvil H-03, H-04, H-18, H-19): título, descripción, miniatura y URL propios por página e idioma.
   Cada página puede dar $pageTitle / $metaDescription / $ogImage como texto o como ['es' => …, 'en' => …],
   y $canonParams (p. ej. ['p' => 'casa-albar']) para que og:url y canonical sean los de esa ficha. */
$porIdioma = static function ($v) use ($lang) { return is_array($v) ? (string) ($v[$lang] ?? reset($v)) : (string) $v; };
$pageTitle = isset($pageTitle) ? trim($porIdioma($pageTitle)) : '';
if ($pageTitle === '') {
    $pageTitle = $lang === 'es' ? 'Alex Dasi · Webs que se parecen a tu negocio' : 'Alex Dasi · Websites that look like your business';
}
$metaDescription = isset($metaDescription) ? trim($porIdioma($metaDescription)) : '';
if ($metaDescription === '') {
    $metaDescription = $lang === 'es'
        ? 'Webs que se parecen a tu negocio, no a una plantilla. Alex Dasi, diseñador web y UX/UI: webs a medida para negocios y casos de producto.'
        : 'Websites that look like your business, not like a template. Alex Dasi, web and UX/UI designer: custom websites for businesses and product case studies.';
}
if (mb_strlen($metaDescription) > 200) { $metaDescription = rtrim(mb_substr($metaDescription, 0, 197), " ,.;:") . '…'; }
$sitioUrl = 'https://www.alexdasi.com';
$ogImage = isset($ogImage) ? trim($porIdioma($ogImage)) : '';
if ($ogImage === '') { $ogImage = $sitioUrl . '/images/og-alexdasi-2026-11_' . $lang . '.jpg'; }
$canonPath = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
if ($canonPath === '/index.php') { $canonPath = '/'; }
$canonQuery = isset($canonParams) && is_array($canonParams) ? $canonParams : [];
$canonUrl = static function (string $l) use ($sitioUrl, $canonPath, $canonQuery): string {
    $q = $canonQuery; if ($l === 'en') { $q['lang'] = 'en'; }
    $qs = http_build_query($q);
    return $sitioUrl . $canonPath . ($qs !== '' ? '?' . $qs : '');
};
$ogUrl = $canonUrl($lang);

$assetVersion = static function (string $relativePath): string {
    $fullPath = dirname(__DIR__) . '/' . ltrim($relativePath, '/');
    return is_file($fullPath) ? (string) filemtime($fullPath) : '1';
};
?>

<!doctype html>

<html lang="en">

    <head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="robots" content="<?php echo empty($noIndex) ? 'index, follow' : 'noindex, follow'; ?>">
    <meta name="theme-color" content="#000000">
    <?php if (empty($noIndex)): ?><link rel="canonical" href="<?php echo htmlspecialchars($ogUrl, ENT_QUOTES, 'UTF-8'); ?>"><?php endif; ?>
    <meta property="og:title" content="<?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="<?php echo $lang === 'es' ? 'es_ES' : 'en_GB'; ?>">
    <meta property="og:url" content="<?php echo htmlspecialchars($ogUrl, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image" content="<?php echo htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image:secure_url" content="<?php echo htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="<?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:site_name" content="Alex Dasi">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="<?php echo htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8'); ?>">
    <title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
    <link rel="alternate" hreflang="es" href="<?php echo htmlspecialchars($canonUrl('es'), ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="en" href="<?php echo htmlspecialchars($canonUrl('en'), ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="x-default" href="<?php echo htmlspecialchars($canonUrl('es'), ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="icon" type="image/svg+xml" href="/images/favicon-flecha.svg?v=21">
    <link rel="icon" type="image/png" sizes="192x192" href="/images/icono-192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
        
    <!-- v4 (feedback 100): Inter servida desde la web (variable 200-700, solo latín + latín ampliado) con precarga;
         antes era una hoja de Google Fonts que bloqueaba el pintado y abría dos conexiones más. -->
    <link rel="preload" href="/content/fuentes/inter-latin-var.woff2" as="font" type="font/woff2" crossorigin>
    <?php /* v10 (Alex, 21/11: esfera más rápida en el móvil): en táctil la esfera arranca nada más cargar; su three.js (uno, de casa) se pide ya desde aquí */ ?>
    <?php if (empty($sinSwiper)): ?><link rel="modulepreload" href="/esfera/esfera-hq.min.js" media="(hover: none), (max-width: 1280px)"><?php endif; ?>
    <style>
        @font-face { font-family: 'Inter'; font-style: normal; font-weight: 200 700; font-display: swap;
            src: url('/content/fuentes/inter-latin-var.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
        @font-face { font-family: 'Inter'; font-style: normal; font-weight: 200 700; font-display: swap;
            src: url('/content/fuentes/inter-latin-ext-var.woff2') format('woff2');
            unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }
    </style>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HSXNYNQRKG"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HSXNYNQRKG');
    </script>

    <!-- cursor -->

    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../js/cursor.js"></script> -->



    <script>
        /* Rama rediseno-baraja-2026-11: todo se decide antes de pintar para que no parpadee.
           - Día / noche: NOCHE por defecto (feedback 92). Se recuerda (clave nueva en la v3).
           - Acento: un color al azar de una paleta corta al abrir; la tecla espacio pasa al siguiente.
             Tiñe TODA la web (--cursor-color → --accent-color) y el fluido (feedback 80, 92). ?cursor=fijo = lima.
           - ?pisos=a|b (feedback 78) · ?claim=a|b|c (feedback 88).
           - Fluido: noche = la config del panel FX de Alex (feedback 82); día = plano. */
        (function () {
            var html = document.documentElement;
            var q = new URLSearchParams(location.search);
            /* v17 (Alex, 21/11: «el modo noche y el modo día, automáticos según la hora»): de 8:00 a 20:00 día, el resto noche.
               Si lo cambias a mano (js/tema.js) se respeta durante esa visita (sessionStorage), no para siempre. */
            var hora = new Date().getHours();
            var tema = (hora >= 8 && hora < 20) ? 'dia' : 'noche';
            try { tema = sessionStorage.getItem('alexdasi-tema-visita') || tema; } catch (e) {}
            <?php if (!empty($temaForzado)): ?>tema = '<?php echo $temaForzado === 'noche' ? 'noche' : 'dia'; ?>';<?php endif; ?>
            html.classList.add(tema === 'noche' ? 'tema-noche' : 'tema-dia');
            /* v17: composiciones de la esfera de «Hablamos» para comparar (?bola=abajo|centro; por defecto, la esquina) */
            try { var bolaQ = new URLSearchParams(location.search).get('bola'); if (bolaQ === 'abajo-centro') html.classList.add('bola-abajo-centro'); /* v25: fuera las composiciones ya descartadas (?bola=abajo|centro, ?hablamos=…) */ } catch (e) {}
            var tc = document.querySelector('meta[name="theme-color"]'); if (tc) tc.setAttribute('content', tema === 'noche' ? '#000000' : '#f5f3ec');
            html.classList.add(q.get('pisos') === 'b' ? 'pisos-b' : 'pisos-a');
            var claim = q.get('claim'); html.classList.add('claim-' + (claim === 'a' || claim === 'b' ? claim : 'c'));
            /* v6 (feedback 115): vuelven los 6 de siempre + 3 «locos» (magenta, verde ácido, naranja eléctrico). Al abrir sale uno
               al azar y el espacio salta a otro AL AZAR (nunca el mismo que hay). Tinta encima ≥ 6,4:1 en día y ≥ 7,3:1 sobre el
               negro de noche (todos AA de texto; los 6 de siempre y el verde, AAA). Documentada en docs/BITACORA.md. */
            /* v8 (feedback 147): cada acento tiene su variante de DÍA, más oscura y saturada (mismo tono; ≈ 3:1 sobre el papel,
               la tinta encima ≥ 5,1:1). De día todo lo que usa acento toma la variante (--cursor-color-dia → --accent-color):
               subrayados, fusión del cursor, fluido, PRESS SPACE, resaltados. La noche no cambia. Tabla en docs/BITACORA.md. */
            /* v20 (Alex, 21/11: «mi color lima es sagrado, no se toca nunca»; «una gama entre pastel y flúor, ni una cosa ni la
               otra»; el menta de hace dos versiones; el coral un pelín más anaranjado, no rosa chicle). El lima es SIEMPRE
               #ECF98E, de día y de noche. La de día (d) es la misma familia un punto más llena. Ver el design system. */
            var paleta = [
                { r: 236, g: 249, b: 142, n: 'lima', d: { r: 236, g: 249, b: 142 } },
                { r: 140, g: 232, b: 186, n: 'menta', d: { r: 112, g: 222, b: 166 } },
                { r: 255, g: 174, b: 122, n: 'coral', d: { r: 255, g: 152, b: 96 } },
                { r: 132, g: 204, b: 255, n: 'cielo', d: { r: 104, g: 186, b: 255 } },
                { r: 100, g: 131, b: 253, n: 'lila', d: { r: 73, g: 110, b: 255 } },   // v22: el azul que puso Alex en el design system
                { r: 255, g: 164, b: 206, n: 'rosa', d: { r: 255, g: 138, b: 190 } }
                /* v22: fuera el albaricoque (Alex lo quitó en el design system) */
            ];
            var fijo = q.get('cursor') === 'fijo'; if (fijo) html.classList.add('cursor-fijo');
            /* v11 (Alex, 21/11: «no quiero que cambie el color acento mientras estés en la misma visita»): el acento se elige al
               entrar y se guarda para toda la visita (sessionStorage); el espacio lo cambia y el nuevo también se queda. */
            /* v12 (Alex, 21/11: «cada visita me cambie el color, pero dentro de la web no»): se mantiene solo si vienes de otra
               página de la web (navegación interna o atrás/adelante); al entrar de fuera o al recargar, otro distinto al último. */
            var i = -1, interna = false, recarga = false;
            try { var nv = performance.getEntriesByType('navigation')[0]; recarga = !!nv && nv.type === 'reload'; interna = !!nv && nv.type === 'back_forward'; } catch (e) {}
            try { if (document.referrer && new URL(document.referrer).host === location.host) interna = true; } catch (e) {}
            try { i = parseInt(sessionStorage.getItem('alexdasi-acento'), 10); } catch (e) {}
            if (recarga || !interna || !(i >= 0 && i < paleta.length)) {
                var ant = i; i = Math.floor(Math.random() * (paleta.length - (ant >= 0 && ant < paleta.length ? 1 : 0)));
                if (ant >= 0 && ant < paleta.length && i >= ant) i++;
                /* v18 (Alex, 21/11: «el lima lo veo aparecer poco, debería salir más»): 1 de cada 3 visitas, lima (si no tocaba ya) */
                var iLima = paleta.findIndex ? paleta.findIndex(function (x) { return x.n === 'lima'; }) : 0;
                if (iLima >= 0 && ant !== iLima && Math.random() < 0.34) i = iLima;
                try { sessionStorage.setItem('alexdasi-acento', i); } catch (e) {}
            }
            if (fijo) i = 0;
            /* v12 (Alex, 21/11: «un preloader al principio de la web, en móvil y en ordenador»): solo en la primera página de la
               visita (entrar de fuera o recargar). Se va cuando la esfera de la home pinta (móvil) o al cargar la página; tope 3,2 s. */
            if ((recarga || !interna) && !q.has('sinprecarga')) {
                html.classList.add('precarga');
                var t0p = Date.now(), fuera = function () {
                    if (!html.classList.contains('precarga') || html.classList.contains('precarga--fuera')) return;
                    var espera = Math.max(0, 650 - (Date.now() - t0p));
                    setTimeout(function () { html.classList.add('precarga--fuera'); setTimeout(function () { html.classList.remove('precarga', 'precarga--fuera'); }, 700); }, espera);
                };
                window.addEventListener('esfera:lista', fuera);
                window.addEventListener('load', function () {
                    // en la home del móvil se espera a la esfera (si tarda, el tope); en el resto, al cargar
                    if (document.querySelector('.pantalla--intro') && window.innerWidth <= 1280) setTimeout(fuera, 1800); else fuera();
                });
                setTimeout(fuera, 3200);
            }
            var c = paleta[i];
            html.style.setProperty('--cursor-color', 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')');
            html.style.setProperty('--cursor-color-dia', 'rgb(' + c.d.r + ',' + c.d.g + ',' + c.d.b + ')');
            window.__CURSOR = { paleta: paleta, i: i, fijo: fijo };
            /* v6 (feedback 119): la piel de la esfera CAMBIA: una nueva al azar en cada carga (nunca la última que se vio) y otra
               cada vez que se vuelve a abrir (js/esfera.js). La última que se ha visto se apunta (localStorage, solo para no
               repetirla y para que «Hablamos» del Sobre mí enseñe esa). Fuera la sesión de la v5. ?piel= fuerza una. */
            var PIELES = ['chicle', 'glaseado', 'prisma', 'solare']; /* v19 (Alex, conv. 1402): + Solare lima en calidad alta (gas con luz dentro de cristal esmerilado) */ /* v16 (Alex, conv. 1396): las cuatro tech (alambre, maqueta, rayos X, anodizado) NO convencen: se guardan en esfera/hq/esfera-hq_tech.js (se ven con ?piel=alambre…) pero fuera del sorteo y de la E */ /* v14 (Alex, 21/11, ATELIER conv. 1393): las tres en calidad alta (esfera/esfera-hq.html); el prisma lleva la textura de cuarzo, así que la gema sale del sorteo. v12: fuera planeta, gota y cuarzo (forma) */
            var piel = q.get('piel'), ultima = null;
            try { ultima = localStorage.getItem('alexdasi-piel-ultima'); sessionStorage.removeItem('alexdasi-piel'); } catch (e) {}
            if (PIELES.indexOf(ultima) < 0) ultima = null;
            var forzada = PIELES.indexOf(piel) >= 0;
            if (!forzada) { var resto = PIELES.filter(function (x) { return x !== ultima; }); piel = resto[Math.floor(Math.random() * resto.length)]; }
            window.__PIELES = PIELES;
            window.__PIEL = piel;
            window.__PIEL_ULTIMA = forzada ? piel : (ultima || piel);
            /* v4 (feedback 100): lienzo a 1× aunque la pantalla sea retina y tinte a 512 (el fluido es blando: no se nota y pesa ~4× menos) */
            var comun = { BLOOM: false, SUNRAYS: false, COLORFUL: false, NO_INTRO_SPLATS: true, MAX_DPR: 1,
                DITHER_URL: 'images/vectors/arrow.svg' /* relativa: vale en vivo y en la exportación estática */ };
            /* Noche: su panel FX (captura del 19/11): density al mínimo, velocity ~35 %, vorticity 0,
               pressure iter al máximo, splat radius ~35 %, splat force al máximo, opacity ~50 %, shading sí, bloom no. */
            window.__FLUID_NOCHE = { FLAT: false, SHADING: true, BACK_COLOR: { r: 0, g: 0, b: 0 },
                DENSITY_DISSIPATION: 1.2 /* v11 (Alex, 21/11: «que desaparezca antes»): 0,35 → 1,2 */, VELOCITY_DISSIPATION: 1.0, CURL: 0, PRESSURE_ITERATIONS: 50,
                SPLAT_RADIUS: 0.19, SPLAT_FORCE: 10000 /* v7 (feedback 141): 12000 → 10000 */, EFFECT_OPACITY: 0.4 /* v7 (feedback 141): 0,5 → 0,4, que moleste menos */, DYE_RESOLUTION: 512 };
            window.__FLUID_DIA = { FLAT: true, SHADING: false, BACK_COLOR: { r: 245, g: 243, b: 236 },
                DENSITY_DISSIPATION: 1.8 /* v11: 1,1 → 1,8 */, VELOCITY_DISSIPATION: 0.9, CURL: 2, PRESSURE_ITERATIONS: 20,
                SPLAT_RADIUS: 0.2 /* v5 (feedback 108): 0,3 → 0,2, manchas más pequeñas */, SPLAT_FORCE: 4000 /* v5: 6000 → 4500, rastro más corto · v7 (feedback 141): → 4000 */,
                EFFECT_OPACITY: 0.35 /* v4 (feedback 99): 0,9 → 0,65 · v5 (feedback 108): → 0,45 · v7 (feedback 141): → 0,35, que moleste menos */, DYE_RESOLUTION: 512 };
            var base = tema === 'noche' ? window.__FLUID_NOCHE : window.__FLUID_DIA;
            var col = tema === 'noche' ? c : c.d; // v8 (feedback 147): de día el fluido va en la variante de día
            window.__FLUID_PRESET = Object.assign({}, comun, base, { EFFECT_COLOR: { r: col.r, g: col.g, b: col.b } });
        })();
    </script>

    <?php if (empty($sinSwiper)): ?><link rel="stylesheet" href="/scss/js-style/swiper-bundle.min.css?v=<?php echo $assetVersion('scss/js-style/swiper-bundle.min.css'); ?>"/><?php endif; ?>

    <link rel="stylesheet" href="/css/style.css?v=<?php echo $assetVersion('css/style.css'); ?>">
    <?php echo $headExtra ?? ''; /* v9 (QA H-10): hojas y precargas propias de la página (fichas: ficha.css y el póster de portada) */ ?>



    </head>