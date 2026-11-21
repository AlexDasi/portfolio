<?php
/* Pie de contacto = «Hablamos» de siempre (v10 → v11 → v12, Alex 21/11: «me gustaba más la parte de contacto antigua, más
   grande, más alta y con la esfera»). El MISMO en la home, en Sobre mí y en UX/UI; «Contacto» del menú baja aquí (#contacto)
   estés donde estés. La esfera la pone js/esfera.js ([data-esfera-habla], se carga al acercarte). */
$pieEs = !isset($lang) || $lang === 'es';
$pieWa = 'https://wa.me/34616420048?text=' . rawurlencode($pieEs ? 'Hola Alex, tengo un negocio y me gustaría hablar de mi web.' : 'Hi Alex, I run a business and I’d like to talk about my website.');
$pe = static function ($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); };
/* v15 (Alex, 21/11: «el footer de Hablamos en todas las páginas»): también en las fichas, en la 404 y, en escritorio, como
   ÚLTIMO PISO de la home y de Sobre mí ($pieEnPiso = true: sin id, el #contacto es el de móvil). */
$pieEnPiso = !empty($pieEnPiso);
?>
<footer class="pie <?php echo $pieEnPiso ? 'pie--piso' : 'pantalla pantalla--sm'; ?>"<?php echo $pieEnPiso ? ' data-pie-piso' : ' id="contacto"'; ?>>
    <section class="sm sm--habla">
        <span class="sm__habla-bola" data-sigue data-esfera-habla aria-hidden="true"></span>
        <h2 class="sm__titulo sm__titulo--enorme"><span class="sm__grueso"><?php echo $pieEs ? 'Hablamos' : 'Let’s talk'; ?></span><span class="sm__punto" aria-hidden="true"></span></h2>
        <p class="sm__entrada"><?php echo $pieEs ? 'Si tienes un negocio y crees que tu web podría estar mejor (o todavía no la tienes), escríbeme. Te contesto yo.' : 'If you run a business and think your website could be better (or you don’t have one yet), drop me a line. I’ll reply myself.'; ?></p>
        <div class="sm__botones">
            <a class="sm__boton sm__boton--lleno" href="<?php echo $pe($pieWa); ?>" target="_blank" rel="noopener"><?php echo $pieEs ? 'Escríbeme por WhatsApp' : 'Message me on WhatsApp'; ?></a>
            <a class="sm__boton" href="mailto:hola@alexdasi.com">hola@alexdasi.com</a>
        </div>
    </section>
    <div class="pie__linea">
        <span>© Alex Dasi</span><?php /* v17 (Alex, 21/11: «lo de todos los derechos reservados y el año, no sé si hace falta»): fuera los dos; el © basta */ ?>
    </div>
</footer>
