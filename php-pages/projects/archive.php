<?php

$pageTitle = 'Archive | Alex Dasi Portfolio';
$metaDescription = 'Earlier work by Alex Dasi, 2015 to 2021: branding, editorial design, illustration and early UI.';
include '../../php-elements/header-works.php';

// Trabajos anteriores a 2022 (fuera del pasafotos de Works). Orden: más reciente primero.
$archive = [
    ['slug' => 'terralava',       'name' => 'Terralava',       'client' => 'Co-founded brand', 'year' => '2021', 'what' => 'Branding, e-commerce and marketing', 'img' => 'thumbnails/lq/Terralava.jpg'],
    ['slug' => 'scotland-is-now', 'name' => 'Scotland Is Now', 'client' => 'Scottish Enterprise', 'year' => '2019', 'what' => 'Brand applications and event collateral', 'img' => 'thumbnails/lq/SE.jpg'],
    ['slug' => 'rotc',            'name' => 'ROTC',            'client' => 'Registers of Scotland', 'year' => '2017', 'what' => 'Conference branding, print and web', 'img' => 'thumbnails/lq/ROTCPop-up.jpg'],
    ['slug' => 'ros-styleguide',  'name' => 'RoS Styleguide',  'client' => 'Registers of Scotland', 'year' => '2017', 'what' => 'Brand guidelines and editorial design', 'img' => 'thumbnails/lq/RoS styleguide.jpg'],
    ['slug' => 'office-design',   'name' => 'Office Design',   'client' => 'Registers of Scotland', 'year' => '2016', 'what' => 'Graphic and environmental design', 'img' => 'projects/scotland-is-now/RoS enviromental.jpg'],
    ['slug' => 'burbuja',         'name' => 'Burbuja',         'client' => 'Burbuja', 'year' => '2016', 'what' => 'Branding for an industrial laundry', 'img' => 'thumbnails/lq/burbuja-wood-banner.jpg'],
    ['slug' => 'old-skull',       'name' => 'Old Skull',       'client' => 'Old Skull', 'year' => '2016', 'what' => 'Illustration for a bike clothing brand', 'img' => 'thumbnails/lq/SKULL-2.jpg'],
    ['slug' => 'pinstripe',       'name' => 'Pinstripe',       'client' => 'Pinstripe', 'year' => '2016', 'what' => 'User interface design', 'img' => 'thumbnails/lq/Pinstripe.jpg'],
    ['slug' => 'mef2c-concerts',  'name' => 'MEF2C Concerts',  'client' => 'MEF2C', 'year' => '2015', 'what' => 'Concert poster design', 'img' => 'thumbnails/lq/poster conciertos.jpg'],
];
?>

<body class="project-page archive-page">

    <?php include '../../php-elements/nav new.php'?>

    <main class="archive">
        <header class="padding3 archive__head">
            <h1 class="archive__title">Archive</h1>
            <p class="archive__lead">Earlier work, 2015 to 2021. Brand, editorial, illustration and some early UI, from before product design became my main thing.</p>
            <a class="archive__back" href="../../index.php#works"><span aria-hidden="true">&larr;</span> Back to selected work</a>
        </header>

        <ul class="padding3 archive__grid">
            <?php foreach ($archive as $item): ?>
            <li class="archive-card">
                <a class="archive-card__link" href="<?php echo $item['slug']; ?>.php">
                    <img class="archive-card__image" src="../../content/pictures/<?php echo $item['img']; ?>" alt="<?php echo $item['name']; ?>" loading="lazy" decoding="async">
                    <span class="archive-card__row">
                        <span class="archive-card__name"><?php echo $item['name']; ?></span>
                        <span class="archive-card__year"><?php echo $item['year']; ?></span>
                    </span>
                    <span class="archive-card__what"><?php echo $item['what']; ?></span>
                    <span class="archive-card__client"><?php echo $item['client']; ?></span>
                </a>
            </li>
            <?php endforeach; ?>
        </ul>
    </main>

    <?php include '../../php-elements/js-nofluid.php'?>

    <footer>

    <p class="credits credits-left creditsDesktop">PRESS SPACE :)</p>

    <p class="credits creditsMobile">Alex Dasi©2026</p>

    <?php include '../../php-elements/footer.php' ?>
</footer>

</body>
</html>
