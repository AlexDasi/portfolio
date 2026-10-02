<?php

$pageTitle = 'Pati | Alex Dasi Portfolio';
$metaDescription = 'Pati, a fictional brunch café with a courtyard in Ruzafa, Valencia. Independent web concept by Alex Dasi, built with ATELIER.';
include '../../php-elements/header-works.php'

?>

<body class="project-page">

    <?php include '../../php-elements/nav new.php'?>

    <header class="project-header">
        <div class="project-header__image"><img class="center" src="../../content/pictures/projects/pati/pati-home-hero.jpg" alt="Pati homepage" loading="eager" decoding="async"></div>
        <h1 class="padding3 project-header__title title title--project title--black">Pati</h1>
        <section class="project-description">
            <div class="project-description__main">

                <h2 class="padding3 slice-infos__title">A Neighbourhood Brunch Café Built Around Its Courtyard</h2>

                <div class="padding3 slice-infos__text"><p>Pati is a fictional brunch café in Ruzafa, Valencia, with an inner courtyard and a long table for working in the morning. It was designed as an independent concept, deliberately different from a specialty coffee shop.</p><p>The brand comes first: PATI in olive green, with the T and the I joined, set against an arch framing the courtyard. The logo is treated exactly the same everywhere.</p></div>

                <ul class="padding3 slice-infos__columns">
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">client</h3>
                        <div class="info-column__text"><p>Own work<br>2026, independent concept</p></div>
                    </li>
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">services</h3>
                        <div class="info-column__text"><p>Branding, Art Direction<br>UX/UI, Web Development</p></div>
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

                <img class="element project-content__image" src="../../content/pictures/projects/pati/pati-home-section.jpg" alt="Pati homepage section" loading="lazy" decoding="async">

                <p class="padding3 project-content__quote">The courtyard is the hero, not the food.</p>


                <div class="padding3 project-content__text"><p>A day in the courtyard shows how it changes at 9, at 1 and at 7, and it has a page of its own. One frame system runs through the whole site.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/pati/pati-patio.jpg" alt="Pati courtyard page with photo gallery" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>The menu can be read in full. On the homepage, tabs switch on their own with the time of day; on its own page, four sheets that feel printed, with a small round stamp.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/pati/pati-carta.jpg" alt="Pati menu designed as printed sheets" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>Coworking passes and table bookings are part of the same story. The booking flow is Pati's own: a strip of days, times by breakfast or brunch, party size, area, and a live ticket that fills in as you go.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/pati/pati-reservar.jpg" alt="Pati table booking with live ticket" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>Olive, cream, egg yolk and terracotta. A simple, warm site that feels like the neighbourhood.</p></div>

                <p class="padding3 project-content__quote">The <a href="https://atelier-demo-pati.pages.dev" target="_blank" rel="noopener noreferrer">site is live</a> if you want to explore it. Fictional brand, real website.</p>

                <img class="element project-content__image" src="../../content/pictures/projects/pati/pati-mobile.jpg" alt="Pati on mobile" loading="lazy" decoding="async">


                <section class="tulong-section padding3">
                    <p class="concept-cards__label">More from ATELIER</p>
                    <?php $conceptsExclude = 'pati'; $conceptsWithAtelier = true; include '../../php-elements/atelier-concepts.php'; ?>
                </section>

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
