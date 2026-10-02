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

                <!-- PROBLEM -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">Today a tool can generate a website from four sentences. That is exactly the problem: the result looks like everything else. I wanted the opposite, a process where speed serves taste and every site has a personality of its own.</p>
                </section>

                <!-- THE LOOP -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">It runs as one loop: discover, explore, decide, build, learn. Trends and references become a tagged moodboard. Every brief gets three directions. I choose. The chosen one becomes a real site, checked automatically. My feedback goes back into the system.</p>
                </section>

                <!-- DIRECTIONS -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">Directions before builds. Each one defines palette, typography, layout and one signature piece, shown on desktop and mobile. It costs little to throw away, so I throw away a lot.</p>
                    <figure class="tulong-figure tulong-figure--full">
                        <img class="element project-content__image" src="../../content/pictures/projects/atelier/atelier-three-directions-otra-vez.jpg" alt="Three visual directions proposed for Otra Vez: Archivo, Mosaico and Ocre" loading="lazy" decoding="async">
                    </figure>
                    <p class="padding3 project-content__quote">Otra Vez took four rounds. The first ones were rejected: too similar to each other, too editorial, too much colour. The fourth round landed on Archivo, with the shop photos borrowed from Mosaico.</p>
                    <div class="tulong-grid">
                        <figure class="tulong-figure">
                            <img class="element project-content__image" src="../../content/pictures/projects/atelier/atelier-proposals-pati.jpg" alt="Second round of directions for Pati" loading="lazy" decoding="async">
                        </figure>
                        <figure class="tulong-figure">
                            <img class="element project-content__image" src="../../content/pictures/projects/atelier/atelier-proposals-lenta.jpg" alt="Second round of directions for Lenta" loading="lazy" decoding="async">
                        </figure>
                    </div>
                </section>

                <!-- TASTE -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">The system keeps a written taste profile. A comment starts as a suggestion and becomes a rule once it repeats or I generalise it. A few of the rules today: empty and flat is not minimal. Complexity has to earn its place. No template stores. One frame system per site. If a brand detail needs explaining, it should not be there.</p>
                </section>

                <!-- REVIEW -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">A private control panel ties it together: the trend radar, every round of directions with my notes, the sites and a review mode where I pin comments straight onto live elements. Those pins are the next iteration's to-do list.</p>
                </section>

                <!-- OUTPUT -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">In its first weeks ATELIER logged more than 20 design decisions and built ten sites. Three went through the full process, from directions to final site, and made it into this portfolio:</p>
                    <p class="padding3 project-content__quote"><a href="otra-vez.php">Otra Vez</a>, a vintage store run like an archive.<br><a href="pati.php">Pati</a>, a brunch café built around its courtyard.<br><a href="lenta.php">Lenta</a>, a tattoo studio where flash is sold like product.</p>
                </section>

                <!-- ROLE -->
                <p class="padding3 project-content__quote">I designed the system end to end: the workflow, the decision rules, the taste model, the review tools and the art direction of every site. AI agents handle research, production and QA within those rules. The brands are fictional, the process is real.</p>

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
