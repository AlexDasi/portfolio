<?php

$pageTitle = 'Lenta | Alex Dasi Portfolio';
$metaDescription = 'Lenta, a fictional tattoo studio in Ruzafa, Valencia. Independent web concept by Alex Dasi, built with ATELIER.';
include '../../php-elements/header-works.php'

?>

<body class="project-page">

    <?php include '../../php-elements/nav new.php'?>

    <header class="project-header">
        <div class="project-header__image"><img class="center" src="../../content/pictures/projects/lenta/lenta-home-hero.jpg" alt="Lenta homepage" loading="eager" decoding="async"></div>
        <h1 class="padding3 project-header__title title title--project title--black">Lenta</h1>
        <section class="project-description">
            <div class="project-description__main">

                <h2 class="padding3 slice-infos__title">A Tattoo Studio Where Flash Is Sold Like Product</h2>

                <div class="padding3 slice-infos__text"><p>Lenta is a fictional tattoo studio in Ruzafa, Valencia, designed as an independent concept. The idea is that nothing here is rushed: four artists, original designs and flash at a fixed price.</p><p>The site opens with a full-bleed photo and the name in red blackletter. Below it, a ribbon with the house notes: walk-ins on Saturdays, a 30 euro deposit, aftercare cream included.</p></div>

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

                <img class="element project-content__image" src="../../content/pictures/projects/lenta/lenta-flash.jpg" alt="Lenta flash designs with price, size and artist" loading="lazy" decoding="async">

                <p class="padding3 project-content__quote">Flash, sold like product.</p>


                <div class="padding3 project-content__text"><p>Flash is the core. Each design is shown like a product, with its price, size, who tattoos it and the next free slot. Each flash is matched to the artist whose style it really belongs to.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/lenta/lenta-equipo.jpg" alt="Lenta team page with each artist" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>The team is shown through people, not just their work: a photo of each artist, their style and the days they are in.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/lenta/lenta-home-section.jpg" alt="Lenta homepage section" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>Booking takes four steps: a flash or your own idea, placement and size on a ruler, then the artist. A live card builds up with a fixed or estimated price. Picking a flash opens the booking with that design already selected.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/lenta/lenta-cita.jpg" alt="Lenta four-step booking with live summary card" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>Black, bone and red. A short, direct site, designed to look its best on a phone.</p></div>

                <p class="padding3 project-content__quote">The <a href="https://atelier-demo-lenta.pages.dev" target="_blank" rel="noopener noreferrer">site is live</a> if you want to explore it. Fictional brand, real website.</p>

                <img class="element project-content__image" src="../../content/pictures/projects/lenta/lenta-mobile.jpg" alt="Lenta on mobile" loading="lazy" decoding="async">


                <section class="tulong-section padding3">
                    <p class="concept-cards__label">More from ATELIER</p>
                    <?php $conceptsExclude = 'lenta'; $conceptsWithAtelier = true; include '../../php-elements/atelier-concepts.php'; ?>
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
