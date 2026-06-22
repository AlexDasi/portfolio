# Red de recuperación — ramas borradas

> Registro de SHAs antes de cualquier borrado. Para recuperar: `git branch <nombre> <sha>` (y `git push origin <nombre>` si era remota).
> `main-corrupt` además quedó preservada en el tag `archive/main-corrupt`.

## 2026-06-22 — Limpieza C2 + C4

### C2 · Rama corrupta (tenía 31 commits únicos → preservada en tag)
| Rama | SHA | Recuperación |
|---|---|---|
| `main-corrupt` | f2306af | `git branch main-corrupt archive/main-corrupt` |

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
