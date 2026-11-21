<?php /* v17 (Alex, 21/11: «que aparezca una flecha arriba del contenido, debajo de Alex Dasi, igual que la de abajo: un slider en
   toda regla»): flecha de subir arriba (desde el 2.º piso) y la de bajar abajo (se va en el último). js/swiper/swiperNew.js */ ?>
<div class="hiddenMobile arrow-container arrow-container--arriba" data-pisos-subir>
    <a class="circle effect magnet" href="#" aria-label="<?php echo (isset($lang) && $lang === 'en') ? 'Previous screen' : 'Pantalla anterior'; ?>">
        <div class="arrow down"></div>
    </a>
</div>
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



