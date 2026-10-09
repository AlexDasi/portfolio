<?php

$pageTitle = 'alè | Alex Dasi Portfolio';
$metaDescription = 'alè, a fictional yoga studio in Valencia whose website breathes with you. Independent web concept by Alex Dasi, built with ATELIER.';
include '../../php-elements/header-works.php'

?>

<body class="project-page">

    <?php include '../../php-elements/nav new.php'?>

    <header class="project-header">
        <div class="project-header__image"><img class="center" src="../../content/pictures/projects/ale/ale-home-hero.jpg" alt="alè homepage" loading="eager" decoding="async"></div>
        <h1 class="padding3 project-header__title title title--project title--black">alè</h1>
        <section class="project-description">
            <div class="project-description__main">

                <h2 class="padding3 slice-infos__title">A Website That Breathes With You</h2>

                <div class="padding3 slice-infos__text"><p>alè is a fictional yoga studio in the Cabanyal, two hundred metres from the sea. Groups of twelve, no mirrors and no rush. It is a one-page concept made to show what a small neighbourhood business could have.</p><p>In Valencian, alè means breath. So the whole page breathes: the logo, the navigation and the headline move to the same rhythm, four seconds in and six seconds out.</p></div>

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

                <p class="padding3 project-content__quote">Four seconds in, six seconds out.</p>

                <img class="element project-content__image" src="../../content/pictures/projects/ale/ale-manifesto.jpg" alt="alè manifesto lighting up word by word" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>Sand, sage, clay and ink. Fraunces in its soft version for headlines, Manrope for the text. The hero photo sits inside an organic shape that warps with every breath, and the manifesto lights up word by word.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/ale/ale-breathe.jpg" alt="alè breathing section with a growing circle" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>The special piece is called Before you go on. It is a pinned section where scrolling becomes a breath: inhale for four and the circle grows while the background turns sage, hold, then exhale for six. While it lasts, the clock of the whole site stops.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/ale/ale-classes.jpg" alt="alè list of classes" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>Five ways to slow down. In the class list, each photo lives inside a drop that follows the cursor.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/ale/ale-schedule.jpg" alt="alè weekly schedule with free mats" loading="lazy" decoding="async">

                <div class="padding3 project-content__text"><p>It is useful too. The weekly timetable starts from today and shows how many mats are still free, and the first class costs 8 euros, with its own form to save your spot.</p></div>

                <img class="element project-content__image" src="../../content/pictures/projects/ale/ale-first-class.jpg" alt="alè first class offer and booking form" loading="lazy" decoding="async">

                <p class="padding3 project-content__quote">The <a href="https://atelier-demo-ale.pages.dev" target="_blank" rel="noopener noreferrer">site is live</a> if you want to breathe along. Fictional studio, real website.</p>

                <img class="element project-content__image" src="../../content/pictures/projects/ale/ale-mobile.jpg" alt="alè on mobile" loading="lazy" decoding="async">


                <section class="tulong-section padding3">
                    <p class="concept-cards__label">More from ATELIER</p>
                    <?php $conceptsExclude = 'ale'; $conceptsWithAtelier = true; include '../../php-elements/atelier-concepts.php'; ?>
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
