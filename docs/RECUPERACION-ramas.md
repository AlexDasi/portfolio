# Red de recuperación — ramas borradas

> Registro de SHAs antes de cualquier borrado. Para recuperar: `git branch <nombre> <sha>` (y `git push origin <nombre>` si era remota).
> `main-corrupt` además quedó preservada en el tag `archive/main-corrupt`.

## 2026-06-22 — Limpieza C2 + C4

### C2 · Rama corrupta (tenía 31 commits únicos → preservada en tag)
| Rama | SHA | Recuperación |
|---|---|---|
| `main-corrupt` | f2306af | `git branch main-corrupt archive/main-corrupt` |

## 2026-06-22 (tarde) — Limpieza C1 + C3 + C5 (todas preservadas en tags `archive/*`, pusheados a origin)

Para recuperar cualquiera: `git branch <nombre> archive/<tag>` (y `git push origin <nombre>` si la quieres remota).

| Rama borrada | SHA | Tag de recuperación |
|---|---|---|
| `MASTER---JUNE` (C1, local+origin) | b3fab13 | `archive/master-june` |
| `backup/2025-10-30-restore-request` (C3, local) | 544161f | `archive/backup-2025-10-30` |
| `MASTER-VERSION` (C5, origin) | deb8ad1 | `archive/master-version` |
| `SFC---color-test` (C5, origin) | 094606c | `archive/sfc-color-test` |
| `WORKS-SWIPER-LIMPIO` (C5, origin) | 4313d01 | `archive/works-swiper-limpio` |
| `background-colour-test` (C5, origin) | 1621ea4 | `archive/background-colour-test` |
| `new-nav` (C5, origin) | 3fe06be | `archive/new-nav` |
| `new-swiper` (C5, origin) | 811bee8 | `archive/new-swiper` |
| `pagination` (C5, origin) | 628dc11 | `archive/pagination` |

---

### C4 · Ramas ya integradas en `main` (0 commits únicos — todo su trabajo vive en `main`)
| Rama | SHA |
|---|---|
| FIXES-MOBILE | 68986c9 |
| MOVIL | 318f7d1 |
| about-3columns-backup | d2ff916 |
| about-cv-download | 2076f08 |
| contact-email-update | 5abd2df |
| cursor-arrow-merge | d2ff916 |
| feat/background-live-controls | c38c59b |
| feature/mobile-swiper-fluid-refresh | a9f7518 |
| feature/project-tulong | 8d7e7aa |
| feature/swiper-navigation | 7e92294 |
| fix/swiper-performance | b0f1d35 |
| fix/urgent-stability-2026-03-17 | 5604c54 |
| horizontal-scroll-works-swiper | b1cfaf8 |
| swiper-navigation-rework | 93e8ef1 |
| works-project-pages | 4f4550e |
