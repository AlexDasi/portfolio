<?php
require_once __DIR__ . '/i18n.php';
$siteName = 'Alex Dasi Portfolio';
$pageTitle = isset($pageTitle) && is_string($pageTitle) && trim($pageTitle) !== ''
    ? trim($pageTitle)
    : $siteName;
$metaDescription = isset($metaDescription) && is_string($metaDescription) && trim($metaDescription) !== ''
    ? trim($metaDescription)
    : 'Portfolio of Alex Dasi, product, web and systems designer. I take complex, ambiguous problems and make them clear: products, websites and the systems behind them.';

$assetVersion = static function (string $relativePath): string {
    $fullPath = dirname(__DIR__) . '/' . ltrim($relativePath, '/');
    return is_file($fullPath) ? (string) filemtime($fullPath) : '1';
};
?>

<!doctype html>

<html lang="en">

    <head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#f7ff99">
    <meta property="og:title" content="<?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Alex Dasi Portfolio">
    <meta name="twitter:card" content="summary_large_image">
    <title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
    <link rel="alternate" hreflang="en" href="https://alexdasi.com<?php echo htmlspecialchars(i18n_url('en'), ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="es" href="https://alexdasi.com<?php echo htmlspecialchars(i18n_url('es'), ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="x-default" href="https://alexdasi.com<?php echo htmlspecialchars(i18n_url('en'), ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="icon" type="image/svg+xml" href="/images/vectors/arrow.svg">
        
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">    

    <script type="text/javascript" src="/js/dat.gui.min.js"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-HSXNYNQRKG"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HSXNYNQRKG');
    </script>

    <!-- cursor -->

    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../js/cursor.js"></script> -->



    <link rel="stylesheet" href="/scss/js-style/swiper-bundle.min.css?v=<?php echo $assetVersion('scss/js-style/swiper-bundle.min.css'); ?>"/>

    <link rel="stylesheet" href="/css/style.css?v=<?php echo $assetVersion('css/style.css'); ?>">



    </head>