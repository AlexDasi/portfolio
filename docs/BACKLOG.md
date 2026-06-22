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

- 🟡 **B1 · Efecto fusión cursor ↔ flecha** — v1 implementado 2026-06-22 (enfoque **absorción**, no gooey SVG). Ver [D-0002](DECISIONES.md). Pendiente: revisión visual en localhost + tuneo de timing. Spec original: [docs/specs/cursor-arrow-gooey.md](specs/cursor-arrow-gooey.md).
  - Hecho: dot se encoge a su centro + fade al activarse magnet; bloom amarillo del círculo sincronizado a `magnet-mouse-active`. Puro CSS, sin reparenting.
  - Opción futura: gooey SVG líquido real (requiere reparenting + recálculo de coords por frame).

## C. Limpieza de ramas (decisión requerida)

- ⬜ **C1 · P2 · Resolver `MASTER---JUNE`** — 28 commits únicos, diverge desde 2025-10-30 (122 detrás de main). Decidir: integrar lo rescatable o archivar/borrar.
- ✅ **C2 · Borrar `main-corrupt`** — HECHO 2026-06-22. Preservada en tag `archive/main-corrupt` (pusheado a origin). Borrada local + origin.
- ⬜ **C3 · P3 · Archivar `backup/2025-10-30-restore-request`** — 1 commit de backup. Conservar como tag y borrar rama, o eliminar.
- ✅ **C4 · Podar ramas ya integradas (0 commits únicos vs main)** — HECHO 2026-06-22. 15 ramas locales borradas + 9 remotas equivalentes. SHAs en [RECUPERACION-ramas.md](RECUPERACION-ramas.md).
- ⬜ **C5 · P3 · Revisar ramas remote-only sin local** — `MASTER-VERSION`, `SFC---color-test`, `WORKS-SWIPER-LIMPIO`, `background-colour-test`, `new-nav`, `new-swiper`, `pagination`. No analizadas (no tenían rama local); revisar contenido vs main antes de decidir.

## D. Deuda técnica / higiene de repo

- ✅ **D1 · `project-gamma.zip` (~128 MB)** — HECHO 2026-06-22. Movido a `~/Documents/portfolio-backups/project-gamma-2025-10-30.zip` (fuera del área del repo).
- ⬜ **D2 · P3 · Hooks legacy de WordPress** en `php-elements/footer.php` (`bloginfo()`, `wp_nav_menu()`, `wp_footer()`) — guardar con `function_exists()` para evitar fatals fuera de WP.
- ✅ **D2bis · `scss/layout/_arrow.scss` corrupto** — HECHO 2026-06-22. Era código muerto (no importado en style.scss) y corrupto desde commit `96baa84`. Eliminado; CSS compilado idéntico. Estilos reales de la flecha viven en `scss/utilities/_animations.scss`.
- ⬜ **D3 · P3 · `swiperBottomScrollbarFull` indefinido** referenciado en el resize handler de `js/swiper/swiper.js` sin definición. Restaurar definición o eliminar referencia.
- ⬜ **D4 · P3 · Sin tests ni lint** — validación 100% manual en navegador. Evaluar smoke test mínimo.

---

## Cerradas
_(mover aquí las entradas completadas con fecha)_
