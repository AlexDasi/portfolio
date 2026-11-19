<?php
/* About v2 (feedback 79, rama rediseno-baraja-2026-11, ATELIER conv. 1330): rediseñado en blanco roto con el
   lenguaje de la home (antes se traían tal cual las pantallas oscuras). Misma estructura que la home: pantallas
   completas que se pasan con «los pisos» o la flecha. ?s=about|uxui|contact abre en esa pantalla. */
$bodyClass = 'sitio-baraja pagina-about';
$pageTitle = 'Alex Dasi · About';
include 'php-elements/header-baraja.php';
include 'php-pages/sobre-mi.php';
$pantallas = ['hola', 'como', 'tray', 'uxui', 'habla'];
$secciones = ['about' => 0, 'process' => 1, 'uxui' => 3, 'contact' => 4];
$s = isset($_GET['s']) && isset($secciones[$_GET['s']]) ? $_GET['s'] : 'about';
$navActual = $s === 'process' ? 'about' : $s;
$pisos = ($lang === 'es') ? 'HOLA|CÓMO TRABAJO|TRAYECTORIA|UX/UI|HABLAMOS' : 'HELLO|HOW I WORK|BACKGROUND|UX/UI|LET’S TALK';
?>

<body class="<?php echo $bodyClass; ?>">
<script>document.documentElement.classList.add('sm-anima'); /* v4: entrada escalonada (sin JS, todo visible) */</script>

    <?php include 'php-elements/nav-baraja.php'?>

<div class="hiddenMobile swiper MainSwiper" data-menu="<?php echo $pisos; ?>" data-wheel="off" data-initial="<?php echo $secciones[$s]; ?>">
    <div class="swiper-wrapper">
        <?php foreach ($pantallas as $k): ?>
        <div class="swiper-slide slide-sm"><?php sobre_pantalla($k, $T, $e, $flecha, $wa, $cv); ?></div>
        <?php endforeach; ?>
    </div>
    <div class="swiper-pagination"></div>
    <?php include 'php-elements/arrow.php'?>
</div>

<div class="hiddenDesktop sm-movil">
    <?php foreach ($pantallas as $k): ?>
    <div class="pantalla pantalla--sm" id="s-<?php echo $k; ?>"><?php sobre_pantalla($k, $T, $e, $flecha, $wa, $cv); ?></div>
    <?php endforeach; ?>
</div>

    <?php include 'php-elements/js-baraja.php'?>
    <script>
        /* Escritorio: el acceso de arriba que toca se marca según la pantalla */
        window.addEventListener('pisos:cambio', function (e) {
            var marca = { 0: 'about', 1: 'about', 2: 'about', 3: 'uxui', 4: 'contact' }[e.detail.index];
            document.querySelectorAll('.nav-sutil__item').forEach(function (a) {
                a.classList.toggle('is-active', a.getAttribute('href').indexOf('s=' + marca) !== -1);
            });
        });
        /* v4 (feedback 102): cada pantalla entra escalonada al llegar; la cifra cuenta hasta 15 una vez;
           las bolas del acento te siguen un poco (solo transform, el bucle se para al llegar). */
        (function () {
            var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            function vista(el) {
                if (!el || el.classList.contains('is-vista')) return;
                el.classList.add('is-vista');
                el.querySelectorAll('[data-cuenta]').forEach(function (n) {
                    var fin = +n.getAttribute('data-cuenta'); if (reduce) return;
                    var t0 = performance.now(), dur = 900;
                    (function paso(t) { var k = Math.min(1, (t - t0) / dur); k = 1 - Math.pow(1 - k, 3);
                        n.textContent = Math.round(fin * k); if (k < 1) requestAnimationFrame(paso); })(t0);
                });
            }
            var slides = document.querySelectorAll('.MainSwiper .slide-sm');
            window.addEventListener('pisos:cambio', function (e) {
                slides.forEach(function (s, i) { if (i === e.detail.index) vista(s); else s.classList.remove('is-vista'); });
            });
            if ('IntersectionObserver' in window) {
                var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) vista(x.target); }); }, { threshold: 0.2 });
                document.querySelectorAll('.pantalla--sm').forEach(function (p) { io.observe(p); });
            } else document.querySelectorAll('.pantalla--sm').forEach(vista);
            setTimeout(function () { var a = document.querySelector('.MainSwiper .swiper-slide-active'); if (a) vista(a); }, 120);

            if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
            var bolas = [].slice.call(document.querySelectorAll('.MainSwiper [data-sigue]')).map(function (el) {
                var b = el.classList.contains('sm__cifra') ? el.querySelector('.sm__cifra-bola') : el;
                return { el: b, x: 0, y: 0, mx: 0, my: 0, k: el.classList.contains('sm__cifra') ? 0.05 : 0.07, max: el.classList.contains('sm__cifra') ? 14 : 34 };
            });
            var raf = 0, enEsfera = false;
            // v6 (feedback 120): con el ratón dentro de la esfera de «Hablamos», la bola se queda quieta (se agarra bien)
            window.addEventListener('esfera:mano', function (e) { enEsfera = e.detail; });
            function paso() {
                raf = 0; var sigue = false;
                bolas.forEach(function (b) {
                    b.x += (b.mx - b.x) * 0.08; b.y += (b.my - b.y) * 0.08;
                    if (Math.abs(b.mx - b.x) > 0.05 || Math.abs(b.my - b.y) > 0.05) sigue = true; else { b.x = b.mx; b.y = b.my; }
                    b.el.style.setProperty('--sx', b.x.toFixed(2) + 'px'); b.el.style.setProperty('--sy', b.y.toFixed(2) + 'px');
                });
                if (sigue) raf = requestAnimationFrame(paso);
            }
            window.addEventListener('mousemove', function (e) {
                if (enEsfera) return;
                bolas.forEach(function (b) {
                    var r = b.el.getBoundingClientRect(); if (!r.width || r.bottom < 0 || r.top > innerHeight) return;
                    var cx = r.left + r.width / 2 - b.x, cy = r.top + r.height / 2 - b.y;
                    b.mx = Math.max(-b.max, Math.min(b.max, (e.clientX - cx) * b.k));
                    b.my = Math.max(-b.max, Math.min(b.max, (e.clientY - cy) * b.k));
                });
                if (!raf) raf = requestAnimationFrame(paso);
            }, { passive: true });
        })();
        /* Móvil: abrir en la sección pedida */
        (function () {
            if (window.innerWidth > 1280) return;
            var id = { about: 'hola', process: 'como', uxui: 'uxui', contact: 'habla' }['<?php echo $s; ?>'];
            var el = document.getElementById('s-' + id);
            if (el && id !== 'hola') setTimeout(function () { el.scrollIntoView(); }, 60);
        })();
    </script>

</body>
</html>
