# Registro de decisiones (ADR ligero) — project-gamma

> **Append-only.** Cada decisión de arquitectura/criterio relevante. No reescribir; si una decisión se revierte, añadir una nueva entrada que la supere y enlazarla.

---

## D-0002 · 2026-06-22 · Fusión cursor↔flecha por "absorción" en vez de gooey SVG
**Decisión:** Implementar el efecto de fusión como **absorción** (el dot `.follow` se encoge a su centro y se desvanece al activarse el magnet, sincronizado con el bloom amarillo del círculo), en CSS puro, descartando el gooey SVG con reparenting para la v1.
**Motivo:** El dot se posiciona con `transform: translate()` inline escrito por magnet-mouse en cada frame. Un ancestro con `filter: url(#gooey)` rompe el `position:fixed` del dot (el filtro crea contenedor de posicionamiento), obligando a reparentar y recalcular coordenadas por frame → frágil y caro de tunear. La absorción logra la lectura de "fusión" sin tocar el transform ni reparentar. Elegido por el usuario entre 3 opciones.
**Archivos:** `scss/layout/_cursor.scss` (transición size/opacity en `.follow`; `.follow-mouse-active` encoge en vez de `display:none`), `scss/utilities/_animations.scss` (bloom del círculo sincronizado a `.magnet-mouse-active`).
**Reversible:** Sí. La opción gooey SVG queda documentada en backlog B1 para una sesión dedicada.

## D-0001 · 2026-06-22 · Infraestructura de continuidad en `docs/`
**Decisión:** Centralizar la trazabilidad entre sesiones en `docs/` con cuatro archivos: `BITACORA.md` (log append-only), `HANDOFF.md` (estado vivo "por dónde retomar"), `DECISIONES.md` (este ADR), `BACKLOG.md` (tareas abiertas).
**Motivo:** El usuario quiere autonomía total y no repetir instrucciones entre sesiones; la continuidad debe vivir en el repo.
**Alternativas descartadas:** Mantener todo en `TODO.md` (mezclaba spec con backlog) · usar Issues de GitHub (fricción, no offline-first).
**Impacto:** `TODO.md` → `docs/specs/cursor-arrow-gooey.md`. `.github/copilot-instructions.md` se mantiene como guía técnica del repo (no se duplica aquí).
