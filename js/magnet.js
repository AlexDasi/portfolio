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
/* v6 (feedback 118): la flecha imantada SIEMPRE se suelta al salir. magnet-mouse solo se entera por el mousemove de la
   ventana: si el ratón salía de la flecha hacia fuera de la ventana (está a 40 px del borde de abajo) o hacia un marco (la
   esfera abierta), no llegaba ningún movimiento más y se quedaba imantada (y con la flecha en blanco sobre el acento,
   porque el mouseout sí quitaba .active). Ahora se suelta al salir de la ventana, al entrar en un marco, al perder el
   foco y al cambiar de pantalla; y además, en cada movimiento, si el ratón ya está fuera de su zona en reposo. */
(function () {
    if (!canUseMagnet) return;
    const ZONA = 28; // la misma distancia que el imán
    function soltar(el) {
        el.classList.remove('magnet-mouse-active');
        el.style.transform = '';
        const flecha = el.querySelector('.arrow');
        if (flecha) flecha.classList.remove('active');
    }
    function soltarTodo() {
        document.querySelectorAll('.magnet.magnet-mouse-active').forEach(soltar);
        document.querySelectorAll('.follow').forEach((f) => f.classList.remove('follow-mouse-active'));
    }
    document.addEventListener('mouseout', (e) => { if (!e.relatedTarget || e.relatedTarget.tagName === 'IFRAME') soltarTodo(); });
    window.addEventListener('blur', soltarTodo);
    window.addEventListener('pisos:cambio', soltarTodo);
    window.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.magnet.magnet-mouse-active').forEach((el) => {
            // zona en reposo (sin el desplazamiento del imán ni su transición): la caja de diseño del elemento fijo
            let x0, x1, y0, y1;
            if (el.offsetParent === null && getComputedStyle(el).position === 'fixed') {
                x0 = el.offsetLeft - ZONA; x1 = el.offsetLeft + el.offsetWidth + ZONA;
                y0 = el.offsetTop - ZONA; y1 = el.offsetTop + el.offsetHeight + ZONA;
            } else {
                const m = /translate3d\(([-\d.]+)px,\s*([-\d.]+)px/.exec(el.style.transform || '');
                const ox = m ? +m[1] : 0, oy = m ? +m[2] : 0, r = el.getBoundingClientRect();
                x0 = r.left - ox - ZONA; x1 = r.right - ox + ZONA; y0 = r.top - oy - ZONA; y1 = r.bottom - oy + ZONA;
            }
            if (e.clientX < x0 || e.clientX > x1 || e.clientY < y0 || e.clientY > y1) {
                soltar(el);
                document.querySelectorAll('.follow').forEach((f) => f.classList.remove('follow-mouse-active'));
            }
        });
    }, { passive: true });
})();
