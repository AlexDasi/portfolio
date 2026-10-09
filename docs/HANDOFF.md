# Handoff — próxima sesión

> Estado vivo de "por dónde retomar". Se sobreescribe cada cierre de bloque; el histórico queda en [BITACORA.md](BITACORA.md).

**Fecha:** 2026-10-09
**Rama activa:** `feat/casa-albar-ale` (Conv. 11), pendiente del OK de Alex. Lleva Casa Albar y alè (páginas, Works, tarjetas de ATELIER) y el centrado de Works en móvil. Con el OK: merge a `main`.

## Contexto en una frase
ATELIER entra en el portfolio: caso de estudio + 3 conceptos (Otra Vez, Pati, Lenta) + diapositiva Process + pasafotos de Works nuevo. Todo en la rama, revisado por Alex en una demo privada.

## Hecho en la rama
- `php-pages/projects/atelier.php` (caso) y `otra-vez.php`, `pati.php`, `lenta.php` (Own work · independent concept).
- `php-elements/atelier-concepts.php`: tarjetas de conceptos (arriba en ATELIER, «More from ATELIER» al final de cada concepto).
- Jerarquía de texto: `project-content__quote` = solo destacados; `project-content__text` = párrafo normal.
- Diapositiva **Process** (`php-pages/process.php`, `scss/layout/_process.scss`) entre About y Contact: método en 5 pasos + herramientas + «In practice» (ATELIER y los 3 conceptos). Paginación principal = 5; la flecha «subir» usa la última diapositiva (antes índice fijo 3).
- **Works:** ATELIER y Tulong primero (orden por año más reciente del rango). Pasafotos infinito con imán (freeMode sticky en escritorio, una tarjeta por gesto en móvil), arrastre y rueda horizontal sin secuestrar el vertical, nueva navegación `.works-nav` (`scss/layout/_works-nav.scss`).
- Propuesta y opciones en `docs/specs/2026-10-02_atelier-en-portfolio.md`.

## Demo privada
- Artefacto de claude.ai «alexdasi.com Preview»: https://claude.ai/artifact/9fN3BSCKYsdd4hNotqCZLb
- Se genera exportando la rama servida en local (`php -S localhost:8000`) a HTML estático. El visor no deja navegar entre páginas: la demo carga cada una en un iframe nuevo (solo afecta a la demo).

## Abierto / pendiente
- **Publicar (Hostinger):** automático con GitHub Actions (`.github/workflows/deploy-hostinger.yml`). Cada push a `main` sube por FTP solo lo que cambia. Usuario FTP `u274648775.alexdasi.com` (su raíz es la carpeta de la web; `u274648775` a secas entra en otra carpeta vacía). Secreto `FTP_PASSWORD` en GitHub. FTPS no funciona en Hostinger (error 425). También se lanza a mano en Actions → Run workflow. Ya NO se usa el Git del panel de Hostinger. El `.htaccess` raíz oculta `.git`, `/docs` y el estado del FTP.
- Publicado y comprobado en vivo el 2026-10-05 (Conv. 4).
- **Copy de la home**: hecho (Conv. 2). Hero PRODUCT, WEB & SYSTEMS (id `web`) + texto opción 1. Meta actualizada. About: titular nuevo «I FIGURE OUT HOW THINGS REALLY WORK, THEN MAKE THEM EASY TO USE» (antes repetía el hero). Process: «AI speeds up production» → «The tools do the heavy lifting» (para no repetir la frase de IA del hero). Demo actualizada.
- ¿Los 3 conceptos también en Works? (de momento no, para no restar a Tulong/Idrica).
- Feedback final de Pati y Lenta v1.1 en ATELIER; si cambian, refrescar capturas.
- Errores de consola previos (magnet-mouse `length`, `onmousemove` null y `clientWidth` en páginas de proyecto): ya estaban en `main`.
- Idrica: case study flojo (faltan datos). B2 gooey (backlog).

## Idiomas (desde Conv. 5)
- EN por defecto; ES con `?lang=es`. Diccionarios en `lang/es/` (claves = HTML exacto en inglés). Si cambias un texto en inglés: `php -S localhost:8000` + `python3 tools/i18n_extract.py` (añade claves vacías) → traducir → `python3 tools/i18n_check.py` (debe dar 0).
- Demo: `python3 tools/export_demo.py <carpeta>` y publicar en el artefacto (jQuery ya está en el artefacto; borrar media >2 MB).

## Works y casos (desde Conv. 7)
- Categorías de Works en `data-tags` de cada tarjeta (works.php y works-mobile.php). Filtro en `swiperNew.js` (`bindWorksFilter`).
- Resumen de caso: `$caseSummary` + include de `php-elements/case-summary.php` tras las columnas. Solo hechos de la página.
- Archive: `php-pages/projects/archive.php` (array `$archive`).

## Próximo paso exacto
➡️ OK de Alex a `feat/casa-albar-ale` (demo v10) → merge a `main` y comprobar en vivo Casa Albar, alè y Works en móvil.

## Capturas de webs de ATELIER (desde Conv. 11)
- Desde la nube no cargan `*.pages.dev` ni Unsplash. Se compila la web en local (`sites/<slug>`, `npm i && npx astro build`) y las fotos de Unsplash se bajan con el navegador integrado del Mac a Descargas (`casa-albar-foto-<id>.jpg`), se suben con stage y Playwright las sirve interceptando `images.unsplash.com`. Ojo: en Playwright la ruta comodín de abortar va registrada PRIMERO (la última registrada gana).

➡️ Antes: nada urgente. Pendiente: cifras reales de resultado para Idrica, Knowadays, Clustag y Elsa; backlog R3 (navegación), R4 (rendimiento), R5 (legibilidad: texto justificado y gris), R6 (About/Contact).
