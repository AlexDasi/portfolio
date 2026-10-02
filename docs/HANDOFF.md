# Handoff — próxima sesión

> Estado vivo de "por dónde retomar". Se sobreescribe cada cierre de bloque; el histórico queda en [BITACORA.md](BITACORA.md).

**Fecha:** 2026-10-02
**Rama activa:** `feat/atelier-case-study` (pendiente del OK final de Alex). `main` sigue en producción, sin tocar.

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
- OK final de Alex → merge a `main` → Alex actualiza Hostinger (preguntarle cómo lo hace exactamente).
- **Copy de la home**: propuesta enviada en el chat (2026-10-02), pendiente de que Alex elija.
- ¿Los 3 conceptos también en Works? (de momento no, para no restar a Tulong/Idrica).
- Feedback final de Pati y Lenta v1.1 en ATELIER; si cambian, refrescar capturas.
- Errores de consola previos (magnet-mouse `length`, `onmousemove` null y `clientWidth` en páginas de proyecto): ya estaban en `main`.
- Idrica: case study flojo (faltan datos). B2 gooey (backlog).

## Próximo paso exacto
➡️ Alex elige copy de la home y da el OK → aplicar copy en la rama, actualizar demo, merge a `main`.
