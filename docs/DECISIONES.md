# Registro de decisiones (ADR ligero) — project-gamma

> **Append-only.** Cada decisión de arquitectura/criterio relevante. No reescribir; si una decisión se revierte, añadir una nueva entrada que la supere y enlazarla.

---

## D-0001 · 2026-06-22 · Infraestructura de continuidad en `docs/`
**Decisión:** Centralizar la trazabilidad entre sesiones en `docs/` con cuatro archivos: `BITACORA.md` (log append-only), `HANDOFF.md` (estado vivo "por dónde retomar"), `DECISIONES.md` (este ADR), `BACKLOG.md` (tareas abiertas).
**Motivo:** El usuario quiere autonomía total y no repetir instrucciones entre sesiones; la continuidad debe vivir en el repo.
**Alternativas descartadas:** Mantener todo en `TODO.md` (mezclaba spec con backlog) · usar Issues de GitHub (fricción, no offline-first).
**Impacto:** `TODO.md` → `docs/specs/cursor-arrow-gooey.md`. `.github/copilot-instructions.md` se mantiene como guía técnica del repo (no se duplica aquí).
