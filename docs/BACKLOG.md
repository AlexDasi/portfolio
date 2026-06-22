# Backlog — project-gamma

> Fuente de verdad de tareas abiertas. Append-only en historial (no borrar entradas: marcar `[x]` o mover a "Cerradas").
> Última recopilación: **2026-06-22**

## Leyenda
- `P1` urgente / bloqueante · `P2` importante · `P3` cuando haya hueco
- Estado: ⬜ abierta · 🟡 en curso · ✅ hecha

---

## A. Integración / merges pendientes

- ⬜ **A1 · P2 · Merge `fix/tulong-mobile-structure` → `main`**
  La rama actual tiene 1 commit no integrado en main: `a9eac82 fix: restore fluid background loading and rendering`.
  Main, a su vez, tiene `0dcef0c merge: update CV` que la rama no tiene → divergencia 1/1.
  Acción: reconciliar (merge o cherry-pick de `a9eac82` a main) y dejar una sola línea viva.

## B. Features especificadas pero sin implementar

- ⬜ **B1 · P3 · Efecto gooey de fusión cursor ↔ flecha**
  Spec completa en [docs/specs/cursor-arrow-gooey.md](specs/cursor-arrow-gooey.md). Rama `cursor-arrow-merge` existe pero **nunca se implementó** (0 commits únicos sobre main).
  Acción: implementar filtro SVG `#gooey` + reparenting de `.follow` en activación del magnet.

## C. Limpieza de ramas (decisión requerida)

- ⬜ **C1 · P2 · Resolver `MASTER---JUNE`** — 28 commits únicos, diverge desde 2025-10-30 (122 detrás de main). Decidir: integrar lo rescatable o archivar/borrar.
- ⬜ **C2 · P1 · Borrar `main-corrupt`** — 31 commits, marcada como corrupta. Confirmar que no hay nada rescatable y eliminar (local + `origin`).
- ⬜ **C3 · P3 · Archivar `backup/2025-10-30-restore-request`** — 1 commit de backup. Conservar como tag y borrar rama, o eliminar.
- ⬜ **C4 · P3 · Podar ramas ya integradas (0 commits únicos vs main)** — `FIXES-MOBILE`, `MOVIL`, `about-3columns-backup`, `about-cv-download`, `contact-email-update`, `cursor-arrow-merge`*, `feat/background-live-controls`, `feature/mobile-swiper-fluid-refresh`, `feature/project-tulong`, `feature/swiper-navigation`, `fix/swiper-performance`, `fix/urgent-stability-2026-03-17`, `horizontal-scroll-works-swiper`, `swiper-navigation-rework`, `works-project-pages`.
  *(`cursor-arrow-merge` solo si se mueve la spec B1 a backlog; ya está en `docs/specs/`.)*

## D. Deuda técnica / higiene de repo

- ⬜ **D1 · P2 · `project-gamma.zip` (134 MB)** en la raíz `PORTFOLIO/` (fuera del repo). Mover a almacenamiento externo o borrar; no debe vivir junto al working dir.
- ⬜ **D2 · P3 · Hooks legacy de WordPress** en `php-elements/footer.php` (`bloginfo()`, `wp_nav_menu()`, `wp_footer()`) — guardar con `function_exists()` para evitar fatals fuera de WP.
- ⬜ **D3 · P3 · `swiperBottomScrollbarFull` indefinido** referenciado en el resize handler de `js/swiper/swiper.js` sin definición. Restaurar definición o eliminar referencia.
- ⬜ **D4 · P3 · Sin tests ni lint** — validación 100% manual en navegador. Evaluar smoke test mínimo.

---

## Cerradas
_(mover aquí las entradas completadas con fecha)_
