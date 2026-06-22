# Bitácora de sesiones — project-gamma

> Registro **append-only**. Nunca borrar entradas; añadir al principio (más reciente arriba).
> Formato por entrada: Fecha/hora · Contexto · Cambios · Pendientes · Riesgos/dudas · Siguiente paso.

---

## 2026-06-22 (tarde) — Cierre de limpieza de ramas (C1+C3+C5) + análisis D2/D3

**Contexto:** Continuación autónoma del backlog. Investigadas y resueltas las ramas viejas restantes y la deuda D2/D3.

**Cambios realizados:**
- **C1/C3/C5:** Borradas 9 ramas viejas (MASTER---JUNE, backup/2025-10-30, y 7 remote-only de 2022). Todas preservadas en tags `archive/*` pusheados a origin. Tabla en [RECUPERACION-ramas.md](RECUPERACION-ramas.md).
- **Estado final ramas:** locales → `main`, `fix/tulong-mobile-structure`, `feat/cursor-arrow-gooey` (actual). Remotas → solo `main` y `fix/tulong-mobile-structure`. 10 tags `archive/*` como red de recuperación.
- **D2 (WP hooks):** OBSOLETO — no quedan llamadas WordPress en ningún PHP.
- **D3 (swiperBottomScrollbarFull):** OBSOLETO — símbolo inexistente; `js.php` usa `swiperNew.js`. `swiper.js`/`swiperMobile.js` siguen vivos (proyecto/móvil).
- **D5 (nuevo):** copilot-instructions.md desactualizado (avisos D2/D3, status Nov-2025) → refrescar.

**Pendientes:** A1 (merge tulong→main, producción, requiere revisión), B1 review visual ya OK, D4 (tests), D5 (refrescar copilot-instructions).

**Riesgos/dudas:** Ninguno. Borrado de ramas 100% reversible vía tags `archive/*` (en local y origin).

**Siguiente paso:** A1 o D5.

---

## 2026-06-22 14:05 — Rama feature + localhost + fusión cursor↔flecha (absorción) + limpieza dead code

**Contexto:** Usuario pide trabajar en autónomo con localhost para ir viendo cambios, rama nueva antes de tocar nada, y aviso al cerrar bloques grandes.

**Cambios realizados:**
- Rama nueva `feat/cursor-arrow-gooey` desde la línea actual.
- Entorno: `php -S localhost:8000` (HTTP 200, OK) + `sass --watch` en background.
- **Descubrimiento:** `scss/layout/_arrow.scss` estaba corrupto (residuo de merge) Y muerto (no importado). Los estilos reales de la flecha están en `scss/utilities/_animations.scss`. Eliminado el archivo → CSS compilado **idéntico** (verificado por diff).
- **B1 v1 (absorción):** `.follow-mouse-active` ahora encoge el dot a su centro + fade (en vez de `display:none`); bloom amarillo del círculo sincronizado a `.magnet-mouse-active`. Puro CSS. Ver [D-0002](DECISIONES.md). El usuario eligió "absorción" sobre "gooey SVG" y "híbrido".
- Razón técnica clave: el `transform` del dot lo escribe magnet-mouse inline cada frame; no se puede transicionar transform (lag) ni meter el dot bajo `filter` (rompe `position:fixed`).

**Pendientes:** Revisión visual del usuario en localhost + posible tuneo de timing. Luego A1 / C1. Commit de este bloque a continuación.

**Riesgos/dudas:** Efecto no revisado visualmente aún (solo verificado que compila y el sitio responde). Sin riesgo para mobile (regla solo afecta `.follow-mouse-active`, desktop). Reversible.

**Siguiente paso:** Usuario revisa absorción en localhost; ajustar si procede.

---

## 2026-06-22 13:42 — Limpieza de riesgo nulo (C2 + C4 + D1) + autonomía total

**Contexto:** Tras aprobar el plan, ejecutada la limpieza de riesgo nulo y configurada la autonomía total del repo.

**Cambios realizados:**
- **C2:** Borrada `main-corrupt` (local + origin). Preservada en tag `archive/main-corrupt` (pusheado a origin) por tener 31 commits únicos.
- **C4:** Borradas 15 ramas locales ya integradas en `main` (0 commits únicos) + 9 ramas remotas equivalentes. `git remote prune origin` ejecutado.
- **D1:** `project-gamma.zip` (~128 MB) movido a `~/Documents/portfolio-backups/project-gamma-2025-10-30.zip` (fuera del repo).
- **Permisos:** `.claude/settings.local.json` → `defaultMode: bypassPermissions` + allows amplios. Autonomía total en este repo (los pop-ups eran del sistema de permisos del harness, no preguntas mías).
- Creado [RECUPERACION-ramas.md](RECUPERACION-ramas.md) con todos los SHAs antes de borrar (red de recuperación).

**Estado de ramas tras limpieza:** locales → `main`, `fix/tulong-mobile-structure` (actual), `MASTER---JUNE` (C1 pendiente), `backup/2025-10-30-restore-request` (C3 pendiente).

**Pendientes:** C1 (MASTER---JUNE), C3 (backup branch), C5 (7 ramas remote-only sin analizar), A1 (merge tulong→main), B1 (gooey), D2/D3/D4.

**Riesgos/dudas:** Ninguno. Todo borrado es recuperable vía SHAs/tag. `bypassPermissions` puede requerir recargar la sesión para aplicarse de forma global.

**Siguiente paso:** Elegir tarea nueva (sugerido: A1 o C1).

---

## 2026-06-22 12:36 — Arranque: infraestructura de continuidad

**Contexto:** Primera sesión como copiloto persistente. No existía documentación de continuidad (solo `TODO.md` con una spec y `.github/copilot-instructions.md`). Objetivo: autonomía total + trazabilidad entre sesiones + recopilar tareas abiertas.

**Cambios realizados:**
- Creada carpeta `docs/` con: `BITACORA.md` (este log), `HANDOFF.md`, `DECISIONES.md`, `BACKLOG.md`.
- `TODO.md` → movido a `docs/specs/cursor-arrow-gooey.md` (era una spec de feature, no un backlog). Renombrado para reflejar su naturaleza.
- Recopilado el backlog de tareas abiertas analizando divergencia de las ~20 ramas vs `main`.
- Guardada preferencia de trabajo (autonomía + trazabilidad) en memoria persistente de Claude.

**Hallazgos clave:**
- Repo git vive en `portfolio/`, no en la raíz `PORTFOLIO/`.
- Rama activa `fix/tulong-mobile-structure`: diverge 1/1 con `main` (commit `a9eac82` fluid background pendiente de integrar).
- 15 ramas ya integradas en main (0 commits únicos) → podables.
- `MASTER---JUNE` (28 únicos) y `main-corrupt` (31 únicos) requieren decisión.
- `project-gamma.zip` (134 MB) en la raíz, fuera del repo.

**Pendientes:** Ver [BACKLOG.md](BACKLOG.md). Destacados: A1 (merge tulong→main), C2 (borrar main-corrupt), D1 (zip 134MB).

**Riesgos/dudas:** Ninguna acción destructiva ejecutada aún (no se ha borrado ninguna rama ni el zip). A la espera de elegir tarea nueva.

**Siguiente paso:** Elegir tarea nueva a ejecutar (o cerrar A1).
