<?php
/* v10 (Alex, 21/11: «el footer de contacto debería estar también en la home… y poner todos los derechos reservados»).
   Pie de contacto de móvil y tablet: cierra la home (después de proyectos) y «Sobre mí» (después de Hablamos).
   $pieCorto = true → solo la línea de abajo (en «Sobre mí» el contacto grande ya está en Hablamos, justo encima).
   El email y el WhatsApp quedan lejos del borde inferior (la barra del navegador del móvil tapaba lo último). */
$pieEs = !isset($lang) || $lang === 'es';
$pieWa = 'https://wa.me/34616420048?text=' . rawurlencode($pieEs ? 'Hola Alex, tengo un negocio y me gustaría hablar de mi web.' : 'Hi Alex, I run a business and I’d like to talk about my website.');
?>
<footer class="pie<?php echo !empty($pieCorto) ? ' pie--corto' : ''; ?>">
    <?php if (empty($pieCorto)): ?>
    <p class="pie__titulo"><?php echo $pieEs ? 'Hablamos' : 'Let’s talk'; ?><span class="pie__punto" aria-hidden="true"></span></p>
    <p class="pie__texto"><?php echo $pieEs ? 'Si tienes un negocio y quieres una web que se le parezca, escríbeme. Te contesto yo.' : 'If you run a business and want a website that looks like it, write to me. I’ll reply myself.'; ?></p>
    <div class="pie__acciones">
        <a class="pie__boton pie__boton--lleno" href="<?php echo htmlspecialchars($pieWa, ENT_QUOTES, 'UTF-8'); ?>" target="_blank" rel="noopener">WhatsApp</a>
        <a class="pie__boton" href="mailto:hola@alexdasi.com">hola@alexdasi.com</a>
    </div>
    <?php endif; ?>
    <div class="pie__linea">
        <span>© 2026 Alex Dasi</span>
        <span><?php echo $pieEs ? 'Todos los derechos reservados' : 'All rights reserved'; ?></span>
        <?php if (!empty($pieCorto)): ?><a href="mailto:hola@alexdasi.com">hola@alexdasi.com</a><?php endif; ?>
    </div>
</footer>
