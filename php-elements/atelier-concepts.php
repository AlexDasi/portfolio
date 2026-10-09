<?php
/**
 * Tarjetas de los conceptos de ATELIER (Casa Albar, alè, Otra Vez, Pati, Lenta).
 * Uso desde php-pages/projects/*.php:
 *   $conceptsExclude = 'pati';          // opcional: no mostrar la página actual
 *   $conceptsWithAtelier = true;        // opcional: añade la tarjeta del caso ATELIER
 *   include '../../php-elements/atelier-concepts.php';
 */
$atelierConcepts = [
    ['slug' => 'casa-albar', 'name' => 'Casa Albar', 'line' => 'A hotel website that goes from day to night'],
    ['slug' => 'ale',      'name' => 'alè',      'line' => 'A yoga studio website that breathes with you'],
    ['slug' => 'otra-vez', 'name' => 'Otra Vez', 'line' => 'A vintage store run like an archive'],
    ['slug' => 'pati',     'name' => 'Pati',     'line' => 'A brunch café built around its courtyard'],
    ['slug' => 'lenta',    'name' => 'Lenta',    'line' => 'A tattoo studio where flash is sold like product'],
];
$conceptsExclude = $conceptsExclude ?? '';
$conceptsWithAtelier = $conceptsWithAtelier ?? false;
?>
<div class="concept-cards">
    <?php if ($conceptsWithAtelier): ?>
    <a class="concept-card" href="atelier.php">
        <img class="concept-card__image" src="../../content/pictures/thumbnails/lq/atelier.jpg" alt="ATELIER case study" loading="lazy" decoding="async">
        <span class="concept-card__name">ATELIER</span>
        <span class="concept-card__line">The system behind these concepts</span>
    </a>
    <?php endif; ?>
    <?php foreach ($atelierConcepts as $c): if ($c['slug'] === $conceptsExclude) continue; ?>
    <a class="concept-card" href="<?php echo $c['slug']; ?>.php">
        <img class="concept-card__image" src="../../content/pictures/projects/<?php echo $c['slug']; ?>/<?php echo $c['slug']; ?>-home-hero.jpg" alt="<?php echo $c['name']; ?> homepage" loading="lazy" decoding="async">
        <span class="concept-card__name"><?php echo $c['name']; ?></span>
        <span class="concept-card__line"><?php echo $c['line']; ?></span>
    </a>
    <?php endforeach; ?>
</div>
