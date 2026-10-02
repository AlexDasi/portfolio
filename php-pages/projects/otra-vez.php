<?php

$pageTitle = 'Otra Vez | Alex Dasi Portfolio';
$metaDescription = 'Otra Vez, a fictional vintage store in Valencia. Independent web concept by Alex Dasi, built with ATELIER.';
include '../../php-elements/header-works.php'

?>

<body class="project-page">

    <?php include '../../php-elements/nav new.php'?>

    <header class="project-header">
        <div class="project-header__image"><img class="center" src="../../content/pictures/projects/otra-vez/otra-vez-home-hero.jpg" alt="Otra Vez homepage" loading="eager" decoding="async"></div>
        <h1 class="padding3 project-header__title title title--project title--black">Otra Vez</h1>
        <section class="project-description">
            <div class="project-description__main">

                <h2 class="padding3 slice-infos__title">A Vintage Store Run Like a Well-Kept Archive</h2>

                <div class="padding3 slice-infos__text"><p>Otra Vez is a fictional vintage store with two shops in Valencia, designed as an independent concept for real second-hand stores. People who buy vintage shop for the piece, not the label: they want to see each garment properly, know its size and condition, and reserve it before it is gone.</p><p>So the store works like an archive. Every piece has a number, a label and a price, and the catalogue can be browsed as a grid or as an index.</p></div>

                <ul class="padding3 slice-infos__columns">
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">client</h3>
                        <div class="info-column__text"><p>Own work<br>2026, independent concept</p></div>
                    </li>
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">services</h3>
                        <div class="info-column__text"><p>Art Direction, UX/UI<br>Web Development</p></div>
                    </li>
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">credits</h3>
                        <div class="info-column__text"><p>Alex Dasi<br>Built with <a href="atelier.php">ATELIER</a></p></div>
                    </li>
                </ul>
            </div>
        </section>
        <section class="project-content">
            <div class="project-content__wrapper">

                <img class="element project-content__image" src="../../content/pictures/projects/otra-vez/otra-vez-home-section.jpg" alt="Otra Vez homepage with collection and outfit" loading="lazy" decoding="async">

                <p class="padding3 project-content__quote">Paper, ink and a single rust accent. Hanken Grotesk for headlines, a monospace for the data of each piece, and 1 px lines holding everything together.</p>

                <img class="element project-content__image" src="../../content/pictures/projects/otra-vez/otra-vez-piezas.jpg" alt="Otra Vez catalogue with filters and grid or index view" loading="lazy" decoding="async">

                <p class="padding3 project-content__quote">On top of that calm structure, the homepage stays alive: new arrivals, events, collections and outfits share one slider. Small shops live on their neighbourhood, so the agenda has DJ nights, flea markets and collaborations with other local businesses.</p>

                <img class="element project-content__image" src="../../content/pictures/projects/otra-vez/otra-vez-agenda.jpg" alt="Otra Vez events agenda" loading="lazy" decoding="async">

                <p class="padding3 project-content__quote">Outfits are a feature, not the concept: a teaser on the homepage, and on their own page the full look with every piece broken down, bookable as a set or one by one.</p>

                <img class="element project-content__image" src="../../content/pictures/projects/otra-vez/otra-vez-conjunto.jpg" alt="Otra Vez outfit page with each piece listed" loading="lazy" decoding="async">

                <p class="padding3 project-content__quote">Four rounds of directions came before a single page was built. The chosen one, Archivo, kept the thin lines and the grid or index view, and borrowed the shop photos from another direction.</p>

                <p class="padding3 project-content__quote">The <a href="https://atelier-demo-otra-vez.pages.dev" target="_blank" rel="noopener noreferrer">site is live</a> if you want to explore it. Fictional brand, real website.</p>

                <img class="element project-content__image" src="../../content/pictures/projects/otra-vez/otra-vez-mobile.jpg" alt="Otra Vez on mobile" loading="lazy" decoding="async">

            </div>
        </section>
    </header>

    <?php include '../../php-elements/js-nofluid.php'?>

    <footer>

    <p class="credits credits-left creditsDesktop">PRESS SPACE :)</p>

    <p class="credits creditsMobile">Alex Dasi©2026</p>

    <?php

    include '../../php-elements/footer.php'

    ?>
</footer>

</body>
</html>
