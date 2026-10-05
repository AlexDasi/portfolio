<?php
/**
 * Idiomas EN / ES.
 *
 * El HTML se escribe en inglés. Si la URL lleva ?lang=es, la página se
 * traduce al vuelo con los diccionarios de /lang/es/*.json:
 *   - "text": contenido de un elemento (lo que va entre >…</), con su HTML interno.
 *   - "attr": valores de alt, aria-label, title y content (metas).
 * Lo que no esté en el diccionario se queda en inglés.
 * Comprobar que no falta nada: php tools/i18n-check.php
 */
if (!defined('ALEX_I18N')) {
    define('ALEX_I18N', true);

    $lang = (isset($_GET['lang']) && $_GET['lang'] === 'es') ? 'es' : 'en';

    /** URL de la página actual en el idioma pedido (para el selector y hreflang). */
    function i18n_url(string $target): string
    {
        $path = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
        $query = $_GET;
        unset($query['lang']);
        if ($target === 'es') {
            $query['lang'] = 'es';
        }
        $qs = http_build_query($query);
        return $path . ($qs !== '' ? '?' . $qs : '');
    }

    /** Diccionarios que tocan a esta página: común + el de la página. */
    function i18n_dictionary(): array
    {
        $dir = dirname(__DIR__) . '/lang/es/';
        $slug = pathinfo(basename($_SERVER['SCRIPT_NAME'] ?? 'index.php'), PATHINFO_FILENAME);
        $files = [$dir . 'common.json', $dir . ($slug === 'index' ? 'home.json' : 'projects/' . $slug . '.json')];
        $map = [];
        foreach ($files as $file) {
            if (!is_file($file)) {
                continue;
            }
            $data = json_decode((string) file_get_contents($file), true);
            if (!is_array($data)) {
                continue;
            }
            foreach ($data['text'] ?? [] as $en => $es) {
                if ($es !== '') {
                    $map['>' . $en . '</'] = '>' . $es . '</';
                }
            }
            foreach ($data['attr'] ?? [] as $en => $es) {
                if ($es === '') {
                    continue;
                }
                $enA = htmlspecialchars($en, ENT_QUOTES, 'UTF-8', false);
                $esA = htmlspecialchars($es, ENT_QUOTES, 'UTF-8', false);
                foreach (['alt', 'aria-label', 'title', 'content'] as $a) {
                    $map[$a . '="' . $enA . '"'] = $a . '="' . $esA . '"';
                    if ($enA !== $en) {
                        $map[$a . '="' . $en . '"'] = $a . '="' . $esA . '"';
                    }
                }
            }
        }
        return $map;
    }

    /** Añade ?lang=es a los enlaces internos (.php) para no perder el idioma al navegar.
     *  Se salta los que llevan data-i18n-keep justo antes del href (el botón EN). */
    function i18n_links(string $html): string
    {
        return preg_replace_callback(
            '/(?<!data-i18n-keep )href="(?!https?:|mailto:|tel:|#|\/\/)([^"#?]*\.php)(\?[^"#]*)?(#[^"]*)?"/',
            static function (array $m): string {
                $q = $m[2] ?? '';
                if (strpos($q, 'lang=') === false) {
                    $q = $q !== '' ? $q . '&amp;lang=es' : '?lang=es';
                }
                return 'href="' . $m[1] . $q . ($m[3] ?? '') . '"';
            },
            $html
        );
    }

    if ($lang === 'es') {
        ob_start(static function (string $html): string {
            $html = strtr($html, i18n_dictionary());
            $html = str_replace('<html lang="en">', '<html lang="es">', $html);
            return i18n_links($html);
        });
    }
}
