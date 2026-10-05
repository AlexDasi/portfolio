# Handoff — próxima sesión

> Estado vivo de "por dónde retomar". Se sobreescribe cada cierre de bloque; el histórico queda en [BITACORA.md](BITACORA.md).

**Fecha:** 2026-10-02
**Rama activa:** `main` (ATELIER mergeado el 2026-10-02). Para trabajo nuevo, abrir rama desde `main`.

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
- **Publicar (Hostinger):** automático con GitHub Actions (`.github/workflows/deploy-hostinger.yml`). Cada push a `main` sube por FTPS solo lo que cambia a `public_html` (cuenta FTP `u274648775.deploy`, secretos `FTP_USERNAME` y `FTP_PASSWORD` en GitHub). También se lanza a mano en Actions → Run workflow. Ya NO se usa el Git del panel de Hostinger (tiraba por https de un repo privado y no descargaba nada). `/docs/` queda bloqueado en la web con `docs/.htaccess`.
- OK de Alex recibido (Conv. 3) → `main` mergeado. Falta desplegar y comprobar en vivo.
- **Copy de la home**: hecho (Conv. 2). Hero PRODUCT, WEB & SYSTEMS (id `web`) + texto opción 1. Meta actualizada. About: titular nuevo «I FIGURE OUT HOW THINGS REALLY WORK, THEN MAKE THEM EASY TO USE» (antes repetía el hero). Process: «AI speeds up production» → «The tools do the heavy lifting» (para no repetir la frase de IA del hero). Demo actualizada.
- ¿Los 3 conceptos también en Works? (de momento no, para no restar a Tulong/Idrica).
- Feedback final de Pati y Lenta v1.1 en ATELIER; si cambian, refrescar capturas.
- Errores de consola previos (magnet-mouse `length`, `onmousemove` null y `clientWidth` en páginas de proyecto): ya estaban en `main`.
- Idrica: case study flojo (faltan datos). B2 gooey (backlog).

## Próximo paso exacto
➡️ Desplegar en Hostinger (Git) → comprobar alexdasi.com en vivo: home, Works, Process, ATELIER y los 3 conceptos, escritorio y móvil.
