<?php
/* Pie de contacto (v10 → v11, Alex 21/11: «el footer tiene que ser igual en las dos partes… al final contacto es contacto»).
   El MISMO en la home, en Sobre mí y en UX/UI (móvil y tablet; en UX/UI también en escritorio). «Contacto» del menú lleva
   aquí (#contacto) estés donde estés. El email y el WhatsApp quedan lejos del borde inferior (la barra del navegador). */
$pieEs = !isset($lang) || $lang === 'es';
$pieWa = 'https://wa.me/34616420048?text=' . rawurlencode($pieEs ? 'Hola Alex, tengo un negocio y me gustaría hablar de mi web.' : 'Hi Alex, I run a business and I’d like to talk about my website.');
?>
<footer class="pie" id="contacto">
    <p class="pie__titulo"><?php echo $pieEs ? 'Hablamos' : 'Let’s talk'; ?><span class="pie__punto" aria-hidden="true"></span></p>
    <p class="pie__texto"><?php echo $pieEs ? 'Si tienes un negocio y crees que tu web podría estar mejor (o todavía no la tienes), escríbeme. Te contesto yo.' : 'If you run a business and think your website could be better (or you don’t have one yet), drop me a line. I’ll reply myself.'; ?></p>
    <div class="pie__acciones">
        <a class="pie__boton pie__boton--lleno" href="<?php echo htmlspecialchars($pieWa, ENT_QUOTES, 'UTF-8'); ?>" target="_blank" rel="noopener"><?php echo $pieEs ? 'Escríbeme por WhatsApp' : 'Message me on WhatsApp'; ?></a>
        <a class="pie__boton" href="mailto:hola@alexdasi.com">hola@alexdasi.com</a>
    </div>
    <div class="pie__linea">
        <span>© 2026 Alex Dasi</span>
        <span><?php echo $pieEs ? 'Todos los derechos reservados' : 'All rights reserved'; ?></span>
    </div>
</footer>
