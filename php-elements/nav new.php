<!-- Gooey liquid-cursor: SVG filter (defs only) + layer holding the cursor dot
     and the arrow target blob. The filter is switched on via CSS only while the
     arrow magnet is engaged, so it never runs during normal cursor movement. -->
<svg class="gooey-defs" width="0" height="0" aria-hidden="true" focusable="false">
    <defs>
        <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
    </defs>
</svg>
<div class="gooey-layer hiddenMobile" aria-hidden="true">
    <div class="follow"></div>
    <div class="gooey-blob gooey-blob--arrow"></div>
</div>
<nav class="nav nav--top">
    <ul>
        <li class="nav--items single"> <a href="../../index.php">alex dasi</a>
        </li>
    </ul>
</nav>

