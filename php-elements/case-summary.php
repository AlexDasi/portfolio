<?php
/**
 * Resumen del caso: reto, mi papel y resultado. Mismo bloque en todos los casos principales.
 * Uso (dentro de .project-description__main, después de las columnas):
 *   $caseSummary = ['challenge' => '…', 'role' => '…', 'outcome' => '…'];
 *   include '../../php-elements/case-summary.php';
 * Solo hechos que ya están en la página: nada de cifras inventadas.
 */
$caseSummaryLabels = ['challenge' => 'The challenge', 'role' => 'My role', 'outcome' => 'The outcome'];
?>
<div class="padding3 case-summary">
    <?php foreach ($caseSummaryLabels as $key => $label): if (empty($caseSummary[$key])) continue; ?>
    <div class="case-summary__item">
        <h3 class="case-summary__label"><?php echo $label; ?></h3>
        <p class="case-summary__text"><?php echo $caseSummary[$key]; ?></p>
    </div>
    <?php endforeach; ?>
</div>
