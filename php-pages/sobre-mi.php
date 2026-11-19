<?php
/* About v2 (feedback 79, rama rediseno-baraja-2026-11): rediseñado en blanco roto con el lenguaje de la home.
   Copy: ATELIER clientes/alexdasi/bio/2026-11-18_bio-about-cv.md. Años: 15 (Alex, feedback 103); los de Edimburgo,
   5 (2016-2021, como en el CV). Cinco pantallas: hola · cómo trabajo · trayectoria · UX/UI · hablamos.
   v4 (feedback 102): más diseñado con el acento contenido: la cifra dentro de la bola, pasos con número en punto
   del acento, ATELIER en bloque de acento, hitos con su punto, títulos grandes y la bola que te sigue en «Hablamos».
   Se escribe en los dos idiomas aquí mismo (no pasa por los diccionarios). */
$es = !isset($lang) || $lang === 'es';
$e = static function ($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); };
$flecha = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
$wa = 'https://wa.me/34616420048';
$cv = $es ? 'content/downloadables/alex-dasi_cv_2026-11.pdf' : 'content/downloadables/alex-dasi_cv_2026-11_en.pdf';

$T = $es ? [
    'hola_t1' => 'Soy Alex.',
    'hola_t2' => ['a' => 'Diseño webs para negocios con algo que contar.', 'b' => 'Diseño webs, marca y producto digital.', 'c' => 'Diseño webs que se parecen a tu negocio.'],
    'hola_p' => 'Llevo 15 años diseñando: marcas, webs y, los últimos años, producto digital. Hoy junto todo eso en algo muy concreto: webs que se parecen a tu negocio, que se entienden a la primera y que van bien en el móvil.',
    'cifra_k' => 'años diseñando',
    'cifra_s' => 'marca · web · producto',
    'que' => [
        ['Webs para negocios y profesionales', 'Tiendas, restaurantes, estudios, librerías: gente con algo bueno que enseñar.'],
        ['Marca, si hace falta', 'Si tu negocio no tiene logo o se te ha quedado corto, empezamos por ahí.'],
        ['Todo lo de después', 'Dominio, hosting y mantenimiento: me ocupo yo.'],
        ['Un panel sencillo', 'Si quieres cambiar tú textos o fotos, te lo dejo preparado.'],
    ],
    'como_t' => 'Cómo trabajo',
    'pasos' => [
        ['Te escucho', 'Miro tu negocio, tu web de ahora si la tienes, tus fotos y lo que te hace distinto. Te pregunto lo justo.'],
        ['Te lo enseño antes de pedirte nada', 'Una demo con tu marca y tus fotos, al lado de tu web actual, para que veas la diferencia.'],
        ['Lo afinamos juntos', 'Hasta que te reconozcas en ella.'],
        ['La pongo en marcha y la cuido', 'Antes de publicarla la pruebo en móvil, tablet y ordenador.'],
    ],
    'fotos' => 'Fotos reales de tu negocio, nunca inventadas con IA.',
    'atelier_t' => 'ATELIER, mi taller',
    'atelier_p' => 'Para trabajar así me he construido una herramienta propia: un sistema con IA que sigue lo que se hace en diseño web, guarda referencias, me propone caminos y construye la web en código. La IA hace el trabajo pesado; la dirección, las decisiones y lo que se tira son cosa mía.',
    'atelier_a' => 'Cómo funciona ATELIER',
    'tray_t' => 'De dónde vengo',
    'tray' => [
        ['Valencia', 'Estudié Diseño de Producto y Gráfico en el CEU San Pablo.'],
        ['Edimburgo · 2016-2021', 'Cinco años como diseñador en Registers of Scotland y Scottish Enterprise: marca, campañas, informes, web e intranet.'],
        ['En remoto para Londres · 2021-2025', 'Diseño digital para Knowadays, una plataforma de formación online: web, email, redes y editorial.'],
        ['El salto a UX/UI · 2022-2024', 'Posgrado en diseño y desarrollo web (ID3, ESAT) e Idrica: el UX/UI de una plataforma para depuradoras, con alarmas, mapas y muchos datos.'],
        ['Sobre el terreno · 2024-2025', 'Logística con World Central Kitchen en la DANA de Valencia y en Filipinas. De ahí salió Tulong.'],
        ['Hoy', 'Producto y marca por proyectos (DinAI, ODEI) y, desde 2026, ATELIER y webs para negocios.'],
    ],
    'llevo_t' => 'Lo que me llevo',
    'llevo' => [
        ['Entender antes de diseñar', 'Ver cómo funciona algo de verdad y luego hacerlo fácil de usar.'],
        ['Oficio visual', 'Marca, tipografía, color: que algo se vea bien no es un extra.'],
        ['Herramientas nuevas, el mismo gusto', 'Uso la IA para prototipar y construir más rápido; el criterio sigue siendo mío.'],
    ],
    'ux_t' => 'Si vienes por producto',
    'ux_p' => 'También diseño producto digital: herramientas complejas, con muchos datos o mucha operativa, para equipos que necesitan que se entiendan.',
    'casos' => [
        ['tulong', 'Tulong', 'Sistema para planificar el reparto de ayuda en emergencias', '2025-2026'],
        ['idrica-wastewater', 'Idrica', 'Plataforma para depuradoras: alarmas, mapas y datos', '2022-2024'],
        ['atelier', 'ATELIER', 'Mi taller con IA para diseñar y construir webs', '2026'],
        ['clustag', 'Clustag', 'Web para una empresa de intralogística RFID, con FreshUp', ''],
        ['knowadays', 'Knowadays', 'Web, landings, email y redes de una marca de formación', '2021-2025'],
    ],
    'cv' => 'Descargar CV (PDF)',
    'habla_t' => 'Hablamos',
    'habla_p' => 'Si tienes un negocio y crees que tu web podría estar mejor (o todavía no la tienes), escríbeme. Te contesto yo. Y si estás por Valencia, quedamos y lo vemos con un café.',
    'wa' => 'Escríbeme por WhatsApp',
] : [
    'hola_t1' => "I'm Alex.",
    'hola_t2' => ['a' => 'I design websites for businesses with something to say.', 'b' => 'I design websites, brands and digital products.', 'c' => 'I design websites that look like your business.'],
    'hola_p' => "I've been designing for 15 years: brands, websites and, in recent years, digital products. Today I bring all of that into something very concrete: websites that look like your business, make sense at first glance and work well on a phone.",
    'cifra_k' => 'years designing',
    'cifra_s' => 'brand · web · product',
    'que' => [
        ['Websites for businesses and independents', 'Shops, restaurants, studios, bookshops: people with something good to show.'],
        ['Brand, if it’s needed', 'If your business has no logo, or has outgrown it, we start there.'],
        ['Everything that comes after', 'Domain, hosting and maintenance: I take care of it.'],
        ['A simple panel', 'If you’d like to change texts or photos yourself, I set it up for you.'],
    ],
    'como_t' => 'How I work',
    'pasos' => [
        ['I listen', 'I look at your business, your current site if you have one, your photos and what makes you different.'],
        ['I show you before I ask for anything', 'A demo with your brand and your photos, next to your current site, so you can see the difference.'],
        ['We fine-tune it together', 'Until it feels like you.'],
        ['I launch it and look after it', 'Before it goes live, I test it on phone, tablet and desktop.'],
    ],
    'fotos' => 'Real photos of your business, never made up with AI.',
    'atelier_t' => 'ATELIER, my workshop',
    'atelier_p' => 'To work this way I built my own tool: an AI-assisted system that follows web design, keeps references, proposes directions and builds the site in code. AI does the heavy lifting; direction, decisions and what gets thrown away stay with me.',
    'atelier_a' => 'How ATELIER works',
    'tray_t' => 'Where I come from',
    'tray' => [
        ['Valencia', 'I studied Product and Graphic Design at CEU San Pablo.'],
        ['Edinburgh · 2016-2021', 'Five years as a designer at Registers of Scotland and Scottish Enterprise: brand, campaigns, reports, web and intranet.'],
        ['Remote for London · 2021-2025', 'Digital design for Knowadays, an online learning platform: web, email, social and editorial.'],
        ['The move into UX/UI · 2022-2024', 'A postgraduate in web design and development (ID3, ESAT) and Idrica: UX/UI for a platform that runs wastewater plants.'],
        ['In the field · 2024-2025', 'Logistics with World Central Kitchen during the Valencia floods and in the Philippines. That’s where Tulong came from.'],
        ['Today', 'Product and brand work by project (DinAI, ODEI) and, since 2026, ATELIER and websites for businesses.'],
    ],
    'llevo_t' => 'What I take from it',
    'llevo' => [
        ['Understand before designing', 'Figure out how something really works, then make it easy to use.'],
        ['Visual craft', 'Brand, type, colour: looking good is not an extra.'],
        ['New tools, same taste', 'I use AI to prototype and build faster; the judgement stays mine.'],
    ],
    'ux_t' => 'If you’re here for product',
    'ux_p' => 'I also design digital products: complex tools, heavy on data or operations, for teams that need them to make sense.',
    'casos' => [
        ['tulong', 'Tulong', 'A system to plan aid distribution in emergencies', '2025-2026'],
        ['idrica-wastewater', 'Idrica', 'A platform for wastewater plants: alarms, maps and data', '2022-2024'],
        ['atelier', 'ATELIER', 'My AI-assisted workshop to design and build websites', '2026'],
        ['clustag', 'Clustag', 'Website for an RFID intralogistics company, with FreshUp', ''],
        ['knowadays', 'Knowadays', 'Web, landing pages, email and social for a learning brand', '2021-2025'],
    ],
    'cv' => 'Download CV (PDF)',
    'habla_t' => 'Let’s talk',
    'habla_p' => 'If you run a business and think your website could be better (or you don’t have one yet), drop me a line. I answer myself. And if you’re around Valencia, let’s meet for a coffee.',
    'wa' => 'Message me on WhatsApp',
];

function sobre_pantalla(string $k, array $T, callable $e, string $flecha, string $wa, string $cv): void
{
    switch ($k) {
        case 'hola': ?>
<section class="sm sm--hola">
    <div class="sm__cabeza">
        <div class="sm__cabeza-texto">
            <h1 class="sm__titulo"><span class="sm__fino"><?php echo $e($T['hola_t1']); ?></span> <span class="sm__grueso"><?php foreach ($T['hola_t2'] as $ck => $ct): ?><span class="claim claim--<?php echo $ck; ?>"><?php echo $e($ct); ?></span><?php endforeach; ?></span></h1>
            <p class="sm__entrada"><?php echo $e($T['hola_p']); ?></p>
        </div>
        <div class="sm__cifra" data-sigue>
            <span class="sm__cifra-bola" aria-hidden="true"><span class="sm__cifra-n" data-cuenta="15">15</span></span>
            <p class="sm__cifra-k"><span class="sm__cifra-titulo"><?php echo $e($T['cifra_k']); ?></span><span class="sm__cifra-sub"><?php echo $e($T['cifra_s']); ?></span></p>
        </div>
    </div>
    <ul class="sm__rejilla sm__rejilla--4">
        <?php foreach ($T['que'] as $i => $q): ?>
        <li><span class="sm__mini"><?php echo str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT); ?></span><p class="sm__item-t"><?php echo $e($q[0]); ?></p><p class="sm__item-p"><?php echo $e($q[1]); ?></p></li>
        <?php endforeach; ?>
    </ul>
</section>
<?php break;
        case 'como': ?>
<section class="sm sm--como">
    <div class="sm__col">
        <h2 class="sm__h2"><?php echo $e($T['como_t']); ?></h2>
        <ol class="sm__pasos">
            <?php foreach ($T['pasos'] as $i => $p): ?>
            <li><span class="sm__num"><?php echo str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT); ?></span><div><p class="sm__item-t"><?php echo $e($p[0]); ?></p><p class="sm__item-p"><?php echo $e($p[1]); ?></p></div></li>
            <?php endforeach; ?>
        </ol>
        <p class="sm__nota"><?php echo $e($T['fotos']); ?></p>
    </div>
    <div class="sm__col sm__col--aparte sm__bloque">
        <h2 class="sm__h2"><?php echo $e($T['atelier_t']); ?></h2>
        <p class="sm__texto"><?php echo $e($T['atelier_p']); ?></p>
        <a class="sm__link" href="php-pages/projects/atelier.php"><?php echo $e($T['atelier_a']); ?><?php echo $flecha; ?></a>
    </div>
</section>
<?php break;
        case 'tray': ?>
<section class="sm sm--tray">
    <div class="sm__col sm__col--ancha">
        <h2 class="sm__h2"><?php echo $e($T['tray_t']); ?></h2>
        <ol class="sm__rejilla sm__rejilla--3 sm__hitos">
            <?php foreach ($T['tray'] as $t): ?>
            <li><span class="sm__hito" aria-hidden="true"></span><p class="sm__item-t"><?php echo $e($t[0]); ?></p><p class="sm__item-p"><?php echo $e($t[1]); ?></p></li>
            <?php endforeach; ?>
        </ol>
    </div>
    <div class="sm__col sm__col--aparte">
        <h2 class="sm__h2"><?php echo $e($T['llevo_t']); ?></h2>
        <ul class="sm__lista sm__lista--subraya">
            <?php foreach ($T['llevo'] as $t): ?>
            <li><p class="sm__item-t"><?php echo $e($t[0]); ?></p><p class="sm__item-p"><?php echo $e($t[1]); ?></p></li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>
<?php break;
        case 'uxui': ?>
<section class="sm sm--uxui">
    <div class="sm__col">
        <h2 class="sm__titulo sm__titulo--seccion"><span class="sm__grueso">UX/UI</span><span class="sm__punto" aria-hidden="true"></span></h2>
        <p class="sm__texto sm__texto--grande"><?php echo $e($T['ux_t']); ?></p>
        <p class="sm__texto"><?php echo $e($T['ux_p']); ?></p>
        <a class="sm__cv" href="<?php echo $e($cv); ?>" target="_blank" rel="noopener"><?php echo $e($T['cv']); ?></a>
    </div>
    <ul class="sm__casos">
        <?php foreach ($T['casos'] as $ci => $c): ?>
        <li><a href="php-pages/projects/<?php echo $e($c[0]); ?>.php">
            <span class="sm__caso-n"><span class="sm__caso-i"><?php echo str_pad((string) ($ci + 1), 2, '0', STR_PAD_LEFT); ?></span><?php echo $e($c[1]); ?></span>
            <span class="sm__caso-p"><?php echo $e($c[2]); ?></span>
            <span class="sm__caso-a"><?php echo $e($c[3]); ?></span>
            <?php echo $flecha; ?>
        </a></li>
        <?php endforeach; ?>
    </ul>
</section>
<?php break;
        case 'habla': ?>
<section class="sm sm--habla">
    <span class="sm__habla-bola" data-sigue aria-hidden="true"></span>
    <h2 class="sm__titulo sm__titulo--enorme"><span class="sm__grueso"><?php echo $e($T['habla_t']); ?></span><span class="sm__punto" aria-hidden="true"></span></h2>
    <p class="sm__entrada"><?php echo $e($T['habla_p']); ?></p>
    <div class="sm__botones">
        <a class="sm__boton sm__boton--lleno" href="<?php echo $e($wa); ?>" target="_blank" rel="noopener"><?php echo $e($T['wa']); ?></a>
        <a class="sm__boton" href="mailto:hola@alexdasi.com">hola@alexdasi.com</a>
    </div>
</section>
<?php break;
    }
}
