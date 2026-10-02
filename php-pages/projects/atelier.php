<?php

$pageTitle = 'ATELIER | Alex Dasi Portfolio';
$metaDescription = 'ATELIER, a design system by Alex Dasi that tracks web design trends, proposes three directions per site, learns from feedback and builds the final website.';
include '../../php-elements/header-works.php'

?>

<body class="project-page">

    <?php include '../../php-elements/nav new.php'?>

    <!-- ---------------------------------------------
         HERO
    ---------------------------------------------- -->
    <header class="project-header">

        <div class="project-header__image">
            <img class="center" src="../../content/pictures/projects/atelier/atelier-header-three-concepts.jpg" alt="Three websites built with ATELIER: Otra Vez, Pati and Lenta" loading="eager" decoding="async">
        </div>

        <h1 class="padding3 project-header__title title title--project title--black">Atelier</h1>

        <!-- ---------------------------------------------
             INTRO / OVERVIEW
        ---------------------------------------------- -->
        <section class="project-description">
            <div class="project-description__main">

                <h2 class="padding3 slice-infos__title">A Design System That Learns My Taste</h2>

                <div class="padding3 slice-infos__text">
                    <p>ATELIER is a system I designed to explore web design at speed without giving up art direction. It tracks design trends, keeps a structured moodboard, proposes three visual directions for every website, learns from my feedback and builds the final site.</p>
                    <p>AI does the heavy lifting in production. I set the direction, make the calls and decide what gets thrown away.</p>
                </div>

                <ul class="padding3 slice-infos__columns">
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">project</h3>
                        <div class="info-column__text"><p>Own work<br>2026, ongoing</p></div>
                    </li>
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">scope</h3>
                        <div class="info-column__text">
                            <p>
                                System Design<br>
                                Art Direction<br>
                                Design Ops<br>
                                Web Development
                            </p>
                        </div>
                    </li>
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">stack</h3>
                        <div class="info-column__text">
                            <p>Claude, Astro, Tailwind<br>GitHub, Cloudflare Pages<br>Figma</p>
                        </div>
                    </li>
                </ul>

            </div>
        </section>

        <!-- ---------------------------------------------
             MAIN CONTENT
        ---------------------------------------------- -->
        <section class="project-content">
            <div class="project-content__wrapper tulong-flow">

                <!-- LOS TRES CONCEPTOS, ARRIBA -->
                <section class="tulong-section padding3">
                    <p class="concept-cards__label">Three concepts built with ATELIER</p>
                    <?php include '../../php-elements/atelier-concepts.php'; ?>
                </section>

                <!-- PROBLEM (destacado) -->
                <p class="padding3 project-content__quote">A tool can generate a website from four sentences. That is the problem: it looks like everything else.</p>

                <div class="padding3 project-content__text">
                    <p>I wanted the opposite: a process where speed serves taste and every site has a personality of its own. ATELIER runs as one loop. Trends and saved references become a moodboard tagged by palette, type, layout and motion. Every brief gets three directions. I choose. The chosen direction becomes a real site in Astro, checked automatically for links, accessibility and responsive layouts. My feedback goes back into the system.</p>
                </div>

                <!-- DIRECTIONS -->
                <p class="padding3 project-content__quote">Directions before builds.</p>

                <div class="padding3 project-content__text">
                    <p>Each direction defines palette, typography, layout and one signature piece, shown on desktop and mobile with a light demo. It costs little to throw away, so I throw away a lot.</p>
                </div>

                <figure class="tulong-figure tulong-figure--full">
                    <img class="element project-content__image" src="../../content/pictures/projects/atelier/atelier-three-directions-otra-vez.jpg" alt="Three visual directions proposed for Otra Vez: Archivo, Mosaico and Ocre" loading="lazy" decoding="async">
                </figure>

                <div class="padding3 project-content__text">
                    <p>Otra Vez took four rounds. The first ones were rejected: too similar to each other, too editorial, too much colour. The fourth round landed on Archivo, with the shop photos borrowed from Mosaico. Pati and Lenta each needed two rounds, mixing the best parts of several directions.</p>
                </div>

                <div class="tulong-grid">
                    <figure class="tulong-figure">
                        <img class="element project-content__image" src="../../content/pictures/projects/atelier/atelier-proposals-pati.jpg" alt="Second round of directions for Pati" loading="lazy" decoding="async">
                    </figure>
                    <figure class="tulong-figure">
                        <img class="element project-content__image" src="../../content/pictures/projects/atelier/atelier-proposals-lenta.jpg" alt="Second round of directions for Lenta" loading="lazy" decoding="async">
                    </figure>
                </div>

                <!-- TASTE (destacado) -->
                <p class="padding3 project-content__quote">Empty and flat is not minimal. Complexity has to earn its place.</p>

                <div class="padding3 project-content__text">
                    <p>Those are two of the rules in the taste profile the system keeps in writing. Every comment starts as a suggestion and becomes a rule once it repeats or I generalise it. Others: no template stores, one frame system per site, and if a brand detail needs explaining, it should not be there.</p>
                    <p>A private control panel ties it together: the trend radar, every round of directions with my notes, the sites, and a review mode where I pin comments straight onto live elements. Those pins become the next iteration's to-do list.</p>
                    <p>In its first weeks ATELIER logged more than 20 design decisions and built ten sites. Three went through the full process, from directions to final site, and are shown above.</p>
                </div>

                <!-- ROLE -->
                <p class="padding3 project-content__quote">The brands are fictional. The process is real.</p>

                <div class="padding3 project-content__text">
                    <p>I designed the system end to end: the workflow, the decision rules, the taste model, the review tools and the art direction of every site. AI agents handle research, production and QA within those rules.</p>
                </div>

            </div>
        </section>

    </header>

    <?php include '../../php-elements/js-nofluid.php'?>

    <footer>

        <p class="credits credits-left creditsDesktop">PRESS SPACE :)</p>

        <p class="credits creditsMobile">Alex Dasi©2026</p>

        <?php include '../../php-elements/footer.php' ?>

    </footer>

</body>
</html>
