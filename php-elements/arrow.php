<?php /* v15 (Alex, 21/11): flecha pequeña para subir un piso, visible desde el 2.º (la grande baja; en el último se da la vuelta y sube de uno en uno). js/swiper/swiperNew.js */ ?>
<a class="hiddenMobile pisos-subir" href="#" data-pisos-subir aria-label="<?php echo (isset($lang) && $lang === 'en') ? 'Previous screen' : 'Pantalla anterior'; ?>"><svg viewBox="0 0 14 20" aria-hidden="true"><path d="M7 19V2M1.5 7.5 7 2l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
<div class="hiddenMobile arrow-container slide-arrow slide-arrow__next">
    <a class="circle effect magnet slideNext-btn">
        <div class="arrow down"></div>
    </a>
</div>

<div class="hiddenDesktop arrow-container slide-arrow slide-arrow__next">
    <a class="circle effect slideNext-btn">
        <div class="arrow down"></div>
    </a>
</div>



