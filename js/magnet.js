const canUseMagnet =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (canUseMagnet && typeof window.MagnetMouse === 'function' && !window.magnetMouseInstance) {
    window.magnetMouseInstance = new MagnetMouse({
        magnet: {
            element: '.magnet',
            class: 'magnet-mouse-active',
            enabled: true, /* Enables the magnet effect */
            distance: 28, /* Stronger magnet range so desktop CTA and arrow visibly follow cursor */
            position: 'center' /* Position of mouse relative to the element when magnet effect is active */
            },
        follow: {
            element: '.follow',
            class: 'follow-mouse-active'
            }
        });

    window.magnetMouseInstance.init();
    // posiciones de los imanes ya mismo (el script va al final del body): sin esto, un mousemove
    // antes de DOMContentLoaded rompía la librería
    window.dispatchEvent(new Event('resize'));
}

const magnetfunction = window.magnetMouseInstance;

// Reinitialize magnet for dynamically loaded elements
document.addEventListener('DOMContentLoaded', function() {
    if (!magnetfunction || typeof magnetfunction.init !== 'function') return;

    setTimeout(() => {
        // Antes: un segundo init() sin destroy() dejaba otro listener con las posiciones sin calcular
        // («Cannot read properties of undefined (reading 'length')» en cada mousemove). Ahora se rehace limpio
        // y se fuerzan las posiciones con un resize (rama rediseno-baraja-2026-11).
        if (typeof magnetfunction.destroy === 'function') magnetfunction.destroy();
        magnetfunction.init();
        document.querySelectorAll('.follow').forEach((el) => { el.style.opacity = ''; });
        window.dispatchEvent(new Event('resize'));
    }, 100);
});

// Al cambiar de pantalla (pisos), los imanes se han movido: recalcular cuando acaba la transición.
window.addEventListener('pisos:cambio', () => {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 1050);
});