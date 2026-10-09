<?php

$pageTitle = 'Casa Albar | Alex Dasi Portfolio';
$metaDescription = 'Casa Albar, a fictional nine-room hotel in Cabo de Gata. Independent web concept by Alex Dasi, built with ATELIER.';
include '../../php-elements/header-works.php'

?>

<body class="project-page">

    <?php include '../../php-elements/nav new.php'?>

    <header class="project-header">
        <div class="project-header__image"><img class="center" src="../../content/pictures/projects/casa-albar/casa-albar-home-hero.jpg" alt="Casa Albar homepage" loading="eager" decoding="async"></div>
        <h1 class="padding3 project-header__title title title--project title--black">Casa Albar</h1>
        <section class="project-description">
            <div class="project-description__main">

                <h2 class="padding3 slice-infos__title">A Hotel That Closes Its Eyes at Sunset</h2>

                <div class="padding3 slice-infos__text"><p>Casa Albar is a fictional hotel with nine rooms in an old whitewashed house on a cliff in Cabo de Gata. It is made for people who choose a hotel by how it feels, not by its list of amenities.</p><p>So the website is one whole day at the house. It opens in white morning light and, as you scroll down, the page slowly dims into night, through dinner and up to the stars.</p></div>

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

                <p class="padding3 project-content__quote">Scrolling is the hours going by.</p>

                <div class="padding3 project-content__text"><p>Two palettes do the work: bone and ink by day, night blue and pale bone by night. A Sunset section turns one into the other, and the text flips colour at the exact point where it would stop being readable.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/casa-albar/casa-albar-rooms.jpg" alt="Casa Albar rooms in a horizontal corridor" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>Cormorant Garamond, with italics woven in, gives the old house its voice. Geist keeps the data and the prices clean. The nine rooms run along a horizontal corridor, one card each, none of them alike.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/casa-albar/casa-albar-sunset.jpg" alt="Casa Albar sunset section where day turns into night" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>The motion follows the same idea: three hero photos that melt into each other, big images with parallax, line drawings that sketch themselves on the plan cards and a menu that drops like a curtain. If the visitor asks for less motion, the site stays in daylight, still and complete.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/casa-albar/casa-albar-table.jpg" alt="Casa Albar dinner menu at night" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>It also works as a hotel site. Pick your nights and it tells you which rooms are free and roughly what the stay costs, depending on the season.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/casa-albar/casa-albar-night-footer.jpg" alt="Casa Albar footer with the night sky and the time at the house" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>The footer is the last hour of the day: a sky full of stars, the moon in its real phase for tonight and the current time at the house, with whatever is happening there right now.</p></div>

                <p class="padding3 project-content__quote">The <a href="https://atelier-demo-casa-albar.pages.dev" target="_blank" rel="noopener noreferrer">site is live</a> if you want to spend a day there. Fictional hotel, real website.</p>

                <img class="element project-content__image" src="../../content/pictures/projects/casa-albar/casa-albar-mobile.jpg" alt="Casa Albar on mobile" loading="lazy" decoding="async">


                <section class="tulong-section padding3">
                    <p class="concept-cards__label">More from ATELIER</p>
                    <?php $conceptsExclude = 'casa-albar'; $conceptsWithAtelier = true; include '../../php-elements/atelier-concepts.php'; ?>
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
