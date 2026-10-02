# ATELIER en el portfolio · propuesta (2026-10-02)

Rama: `feat/atelier-case-study` (no tocar `main` hasta OK de Alex).

## Hecho en la rama
- `php-pages/projects/atelier.php`: caso de estudio estrella (formato Tulong).
- `php-pages/projects/otra-vez.php`, `pati.php`, `lenta.php`: fichas «Own work · 2026, independent concept» (formato Camisola), con enlace a la demo en vivo y a ATELIER.
- `works.php` + `works-mobile.php`: ATELIER en 2ª posición (tras Tulong). Las 3 webs NO están en Works (opción A, abajo).
- Imágenes: `content/pictures/projects/{atelier,otra-vez,pati,lenta}/` (capturas reales de las webs y de las rondas de propuestas, sin arte generado). Thumbnails `content/pictures/thumbnails/lq/atelier*.jpg`.
- Fuentes del relato: repo atelier → `sites/<slug>/resumen.md`, `CHANGELOG.md`, `prospeccion/propuestas.json`, `system/taste.md`, `docs/03-decisiones.md` (21 ADR), `docs/04-logbook.md`.

## Dudas abiertas · opciones
### 1. ¿Dónde van las 3 webs?
- **A (montada, recomendada):** solo ATELIER en Works; las 3 fichas cuelgan del caso. Works sigue centrado en producto.
- B: ATELIER + las 3 en Works (10 entradas, se diluye Tulong/Idrica).
- C: nueva sección «Concepts / Lab» en el swiper principal (5ª diapositiva).

### 2. ¿Dónde va el proceso ampliado?
- About ampliado: rápido, pero el About ya es una sola diapositiva corta.
- **Diapositiva nueva «Process» (recomendada)** entre About y Contact: 5 pasos + herramientas. Cuenta el método para todo el portfolio, no solo ATELIER.

### 3. ¿Enlazar el panel privado?
- **Solo capturas (recomendado):** tiene login, datos internos y no está pulido para público.
- Enlace con usuario demo: más trabajo y riesgo de exponer cosas.
- Vídeo corto del panel (más adelante).

## Borrador · Process (inglés, sin em dash)
**HOW I WORK**
Fast tools, slow decisions. AI speeds up production; direction, judgement and what gets thrown away stay with me.

1. **Discover.** Map how the problem really works: users, context, references. Trends and saved references go into a tagged moodboard.
2. **Explore directions.** Three distinct directions, light enough to throw away: palette, type, layout and one signature piece each.
3. **Decide.** Pick, mix or reject them all. Nothing gets built until a direction earns it.
4. **Build.** Design systems and real code, not just mockups, with automated checks for accessibility, links and responsive layouts.
5. **Iterate.** Review on the live product, pin comments on real elements, feed the lessons back so the next project starts smarter.

**TOOLS**
Figma · Astro · Tailwind · Claude · GitHub · Cloudflare Pages · Hostinger
(Opcional: iconos o logos monocromos; el gráfico del proceso lo hace otra IA, según Alex.)

## Pendiente
- OK de Alex al texto y a las 3 dudas.
- Feedback final de Pati y Lenta v1.1 (si cambian, refrescar capturas).
- Despliegue: merge a `main` + paso manual de Alex en Hostinger (preguntarle cómo).
