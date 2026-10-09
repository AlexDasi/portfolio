# Bitácora de sesiones — project-gamma

> Registro **append-only**. Nunca borrar entradas; añadir al principio (más reciente arriba).
> Formato por entrada: Fecha/hora · Contexto · Cambios · Pendientes · Riesgos/dudas · Siguiente paso.

---

## Conv. 11 · 2026-10-08 22:10 · Casa Albar y alè + Works centrado en móvil

**Inicio:** 2026-10-08 22:10 · **Turnos:** 1 · **Último msg:** 2026-10-08 22:10 · **Cierre:** 2026-10-09 09:45

**Contexto:** Alex: subir al portfolio Casa Albar y la web de yoga (alè), que no están en el post de ATELIER; y que los thumbnails de Works en móvil estén centrados (se iban a la derecha).

**Cambios (rama `feat/casa-albar-ale`):**
- `php-pages/projects/casa-albar.php` y `ale.php` (Own work · independent concept), mismo patrón que Otra Vez. Textos sacados de `sites/<slug>/resumen.md` y `CHANGELOG.md` de `AlexDasi/atelier`. ES completo en `lang/es/projects/`.
- Capturas propias (1440×900 + composición de 3 móviles) en `content/pictures/projects/<slug>/` y thumbnails 1536×1024 en `thumbnails/lq/`. Casa Albar se compiló en local (Astro) con sus 14 fotos de Unsplash bajadas por el navegador del Mac de Alex (desde la nube Unsplash y pages.dev están bloqueados). alè es HTML autocontenido; fuentes Fraunces/Manrope de fontsource.
- Works (escritorio y móvil): tarjetas CASA ALBAR y ALÈ (tag `web`, 2026), tras Tulong.
- `atelier-concepts.php`: 5 conceptos (Casa Albar, alè, Otra Vez, Pati, Lenta).
- **Fix móvil:** (1) Swiper de Works móvil con `roundLengths: false`: 90vw con decimales se redondeaba y el error se sumaba en cada clon del bucle (17 px a la derecha a 768 px). (2) `.categories` medía 100vw dentro de un hueco de 90vw: el body se salía 5vw y la página se podía arrastrar en horizontal. Ahora body = viewport y tarjeta centrada (±1 px) de 360 a 1024 px.
- Demo privada actualizada (versión 10).

**Pendientes:** OK de Alex → merge a `main` (despliega solo). En móvil el enlace «Archive» de la fila de filtros queda fuera de pantalla (ya pasaba en `main`).

---

## Conv. 10 · 2026-10-05 · Arreglarlo todo y publicar

**Inicio:** 2026-10-05 · **Turnos:** 1 · **Último msg:** 2026-10-05 · **Cierre:** 2026-10-05

**Contexto:** Alex: «arréglalo todo y publícalo».

**Cambios:** 11 párrafos de más de 20 palabras pasan de `project-content__quote` a `project-content__text` (Knowadays, Tulong, Idrica, Clustag, Elsa); los destacados quedan para frases cortas. Merge `fix/textos-proyectos` (incluye `fix/enlaces-movil`) → `main`. Run #18 OK.

**Comprobado en vivo (375 px):** Pati ES: «ATELIER» 18,75/18,75 px y «web está online» 31,9/31,9 px (enlace = frase). Knowadays 0 destacados, Tulong/Idrica/Clustag 1, Elsa 0.

---

## Conv. 9 · 2026-10-05 · Enlaces demasiado grandes en móvil

**Inicio:** 2026-10-05 · **Turnos:** 1 · **Último msg:** 2026-10-05 · **Cierre:** 2026-10-05

**Contexto:** Alex ve en móvil (Pati, entrando desde ATELIER) que los enlaces dentro de una frase salen mucho más grandes que el texto.

**Causa:** `.project-content__quote > a` con `font-size: 4.5rem` fijo; en móvil el destacado baja a ~32 px (Conv. 6) y el enlace se quedaba en 54 px. Además la regla global `a {1.5rem}` dejaba los enlaces de las columnas a 18 px frente a 18,75 px.

**Arreglo (rama `fix/enlaces-movil`):** el enlace del destacado hereda el tamaño; `p a`, `.slice-infos__text a`, `.info-column__text a`, `.case-summary__text a` heredan tamaño e interlineado. Script de comprobación: 0 enlaces con tamaño distinto a su frase en los 20 proyectos EN/ES (375 y 1440 px), salvo el «Volver» de Archive, que es un enlace suelto a propósito. Demo versión 9.

**Visto de paso:** varios párrafos largos (Knowadays, Tulong, Idrica) están como destacado (`__quote`) en vez de texto normal (`__text`).

---

## Conv. 8 · 2026-10-05 14:25 · Publicar R1 + R2

**Inicio:** 2026-10-05 14:25 · **Turnos:** 1 · **Último msg:** 2026-10-05 14:25 · **Cierre:** 2026-10-05 14:35

**Contexto:** Alex da el OK («publícalo así, de momento está bien»).

**Cambios:** merge `feat/works-y-casos` → `main` y push. Run #16 OK.

**Comprobado en vivo:** home EN/ES con filtro y Archive; archive.php EN/ES (9 imágenes 200); Tulong EN/ES y Knowadays con el resumen; CSS y JS nuevos servidos.

**Pendiente:** cifras reales de resultado para Idrica, Knowadays, Clustag y Elsa (si Alex las tiene). Resto del backlog R3-R6.

---

## Conv. 7 · 2026-10-05 · Rediseño R1 (Works) y R2 (casos + Archive)

**Inicio:** 2026-10-05 · **Turnos:** 1 · **Último msg:** 2026-10-05 · **Cierre:** 2026-10-05 14:20

**Contexto:** Alex elige R1 y R2 de las propuestas de la Conv. 6.

**Cambios (rama `feat/works-y-casos`):**
- R1 Works: nombre, resumen (2 líneas), papel y año siempre visibles bajo cada tarjeta en escritorio; en móvil sobre la foto con degradado y ahora también papel y año (antes ocultos). Filtro All / Product / Web / Brand en la fila de navegación (en móvil, encima): `data-tags` en cada tarjeta, `swiperNew.js` guarda las tarjetas originales y vuelve a montar el pasafotos (sin bucle si quedan < 4). Enlace «Archive». `index.php#works` abre Works.
- R2: `php-elements/case-summary.php` (Reto / Mi papel / Resultado) en ATELIER, Tulong, Idrica, Knowadays, Clustag, Elsa y Camisola, escrito solo con hechos de cada página (sin cifras inventadas). Nueva `php-pages/projects/archive.php` con los 9 trabajos 2015-2021.
- ES de todo lo nuevo; `i18n_check` 0 problemas. Capturas: 1281×720, 1366×768, 1440×900, 1920×1080 y 390 px; filtro probado en escritorio y móvil.

**Demo:** artefacto «alexdasi.com Preview» versión 8.

**Pendiente de Alex:** OK para publicar. Datos reales de resultado (cifras) para Idrica, Knowadays, Clustag y Elsa si los tiene.

---

## Conv. 6 · 2026-10-05 13:05 · OK, publicación y propuestas de rediseño

**Inicio:** 2026-10-05 13:05 · **Turnos:** 1 · **Último msg:** 2026-10-05 13:05 · **Cierre:** 2026-10-05

**Contexto:** Alex da el OK a todo (castellano, Pati, erratas y titular de Tulong) y pide sugerencias de rediseño al terminar.

**Cambios:** erratas EN en Works (commissioned, stylish, old-fashioned) con claves ES al día. Móvil: titulares y destacados de proyecto con tamaño fluido (antes 54px fijos se salían en ~15 páginas) y columnas cliente/servicios/créditos alineadas. `tools/` excluido del deploy y bloqueado en `.htaccess`. Merge `feat/castellano` → `main` (runs #13 y #14 OK).

**Comprobado en vivo:** `/`, `/?lang=es`, Pati EN/ES, ATELIER/Tulong/Idrica ES → 200 con `lang` correcto y textos nuevos; imágenes de Pati y miniatura de ATELIER iguales byte a byte al repo; CSS nuevo; `/tools/` da 404.

**Ojo:** en el navegador integrado con el panel oculto la home (fluido WebGL) bloquea el renderizador; para verificar, abrir un JSON/asset del dominio y hacer fetch desde ahí.

---

## Conv. 5 · 2026-10-05 12:43 · Versión en castellano + Pati con logo nuevo

**Inicio:** 2026-10-05 12:43 · **Turnos:** 2 · **Último msg:** 2026-10-05 · **Cierre:** 2026-10-05 13:05

**Contexto:** Alex pide poder ver la web en castellano. Decide: traducir todo (home + 19 proyectos), selector EN / ES en el nav, tuteo con el mismo tono. A mitad pide actualizar todo lo de Pati porque ha cambiado el logo (v1.1.1, ya live).

**Cambios (rama `feat/castellano`):**
- `php-elements/i18n.php`: con `?lang=es` traduce la salida al vuelo con `lang/es/common.json`, `home.json` y `projects/<slug>.json` (texto entre etiquetas + alt/aria-label/title/content). Lo que no está en el diccionario sale en inglés. Añade `?lang=es` a los enlaces internos. `<html lang>` y hreflang.
- Selector EN / ES fijo arriba a la izquierda (`nav new.php`, `_nav.scss`); menú de la paginación traducido en `swiperNew.js`.
- Ajustes ES: «Hola, soy Alex Dasi, diseñador de» + PRODUCTO, WEB & SISTEMAS (se oculta la línea «designer»); PRODUCTO a 14vw en móvil; Contact «DI HOLA» con el texto separado.
- `tools/i18n_extract.py` (saca textos nuevos a los JSON sin pisar), `tools/i18n_check.py` (0 problemas), `tools/export_demo.py` (demo EN+ES).
- Pati: capturas rehechas desde `atelier/sites/pati` v1.1.1 (build local), columna de Pati del collage de ATELIER y miniaturas de Works regeneradas; copy «T and the I side by side, just touching». `atelier-proposals-pati.jpg` se deja (son las rondas históricas).

**Demo:** artefacto «alexdasi.com Preview» actualizado (versión 7), EN y ES de todas las páginas. Sin vídeos/GIF >2 MB para que quepa.

**Pendientes:** OK de Alex → merge a `main` (deploy automático). Erratas en el inglés original (commisioned, sytlish, «and and») sin tocar. Títulos de proyecto muy largos desbordan en móvil 390 px también en inglés (Tulong).

---

## Conv. 4 · 2026-10-05 · Recordatorio del estado del despliegue

**Inicio:** 2026-10-05 · **Turnos:** 11 · **Último msg:** 2026-10-05 · **Cierre:** 2026-10-05

**Contexto:** Alex pregunta dónde estábamos con el deploy. Estado: `main` ya mergeado y pusheado (Conv. 3); falta darle a desplegar en Hostinger (Git) y comprobar en vivo. No había ningún error con Hostinger, solo el paso manual pendiente. Desde la nube no se puede cargar alexdasi.com (bloqueado por el proxy), así que no se ha podido comprobar si ya está desplegado.

**Hallazgo:** Claude entró en hPanel (navegador integrado, sesión de Alex) y le dio a «Implementar» dos veces. El log dice OK, pero la web sigue en la versión de junio (`/php-pages/projects/atelier.php` da 404, `docs/HANDOFF.md` del 23 jun). Causa: la entrada Git de Hostinger usa `https://github.com/AlexDasi/portfolio.git` y el repo es privado, así que no descarga nada. La clave SSH de Hostinger ya está en GitHub como deploy key (huella coincide). Alex cambió la URL a SSH en `public_html/.git/config`, pero Hostinger usa la URL guardada en el panel y sigue sin descargar.

**Siguiente paso:** decidir con Alex: recrear la entrada Git del panel con `git@github.com:AlexDasi/portfolio.git` (ruta vacía), o despliegue por GitHub Actions. Ojo: `/docs/` se sirve en público.

**Decisión y cambios:** despliegue con GitHub Actions por FTPS (`.github/workflows/deploy-hostinger.yml`) usando la cuenta FTP principal (el plan Single no deja más cuentas extra). Alex cambió la contraseña FTP y creó los secretos `FTP_USERNAME` y `FTP_PASSWORD`. `docs/.htaccess` bloquea /docs en la web. Skill `desplegar-portfolio` creada. Ajustes hasta que funcionó: FTPS da 425 en Hostinger → FTP; el usuario `u274648775` entra en una carpeta vacía que no es la web → usuario `u274648775.alexdasi.com` (raíz = web). `.htaccess` raíz oculta `.git`, `/docs` y el estado del FTP.

**Resultado:** web publicada y comprobada en vivo (home con hero nuevo, Process, Works, ATELIER, Otra Vez, Pati, Lenta, Tulong: 200 y sin imágenes rotas; móvil 375 px sin scroll horizontal; `/docs` y `.git` ya no se ven).

**Cierre:** 2026-10-05 · conversación cerrada.

---

## Conv. 3 · 2026-10-02 22:02 · OK y paso a producción

**Inicio:** 2026-10-02 22:02 · **Turnos:** 1 · **Último msg:** 2026-10-02 22:02 · **Cierre:** abierta

**Contexto:** Alex da el OK. Cómo se publica: Hostinger tira del repo con Git (despliegue desde el panel de Hostinger).

**Cambios:** merge `--no-ff` de `feat/atelier-case-study` a `main` y push.

**Siguiente paso:** desplegar en Hostinger (Git) y comprobar alexdasi.com en vivo.

---

## Conv. 2 · 2026-10-02 21:51 · Copy de la home (primer arranque en el Project)

**Inicio:** 2026-10-02 21:51 · **Turnos:** 1 · **Último msg:** 2026-10-02 21:51 · **Cierre:** 2026-10-02 22:02

**Contexto:** Primera conversación desde el Project «PORTFOLIO alexdasi.com». Tarea: que Alex elija el copy de la home (hero + texto) y aplicarlo en `feat/atelier-case-study`.

**Cambios:**
- Alex elige hero A (PRODUCT, WEB & SYSTEMS) y texto 1. Aplicado en `home.php` (id/clase `uxui` → `web`; el relleno amarillo usa `inset:0`, se adapta solo).
- Meta description por defecto en `header.php` y `header-works.php` (esta aún decía «graphic designer»).
- About: titular nuevo para no repetir «complex, ambiguous problems». Process: frase de IA reescrita para no duplicar la del hero. Contact sin cambios.
- Comprobado en 1281×720, 1366×768, 1440×900, 1920×1080 y 390×844: todo cabe.
- Demo privada actualizada (versión 6).

**Siguiente paso:** OK de Alex → merge a `main` → Hostinger.

---

## Conv. 1 · 2026-10-02 10:00 · ATELIER en el portfolio

> Desde hoy cada conversación va numerada (inicio · turnos · cierre). Las entradas anteriores no tenían número.

**Inicio:** 2026-10-02 ~10:00 · **Turnos:** 6 · **Último msg:** 2026-10-02 ~13:10 · **Cierre:** abierta (pendiente del OK de Alex)

**Contexto:** Alex quiere llevar ATELIER al portfolio: un caso de estudio estrella, 3 webs como «Own work» (Otra Vez, Pati, Lenta) y la parte de proceso y herramientas ampliada.

**Cambios (rama `feat/atelier-case-study`, `main` intacto):**
- Página `atelier.php` + fichas `otra-vez.php`, `pati.php`, `lenta.php` (copy en inglés, sin em dash).
- ATELIER en Works (desktop y móvil), en 2ª posición.
- Imágenes reales (capturas de las webs construidas en local y de las rondas de propuestas).
- Propuesta de proceso/herramientas y opciones de las dudas en [specs/2026-10-02_atelier-en-portfolio.md](specs/2026-10-02_atelier-en-portfolio.md).

- Turno 2: diapositiva **Process** entre About y Contact (paginación pasa a 5; la flecha «subir» ahora mira la última diapositiva en vez del índice fijo 3). Demo estática privada como artefacto de claude.ai («alexdasi.com Preview»); la web real no se toca.
- Turno 3 (feedback de Alex): la home de la demo salía en blanco (el visor de artefactos no deja navegar entre páginas: la demo carga cada página con fetch en el mismo documento; solo afecta a la demo, no al repo). Jerarquía de texto: `project-content__quote` solo para destacados; el resto pasa a `project-content__text` (párrafo normal, como la intro). Tarjetas de los 3 conceptos arriba del todo en ATELIER y «More from ATELIER» al final de cada concepto (`php-elements/atelier-concepts.php`). Process rehecha a dos columnas: método + «In practice» (ATELIER + Otra Vez, Pati, Lenta enlazados). Cabe en 1281×720 a 1920×1080. Nueva miniatura de ATELIER.
- Turno 4: Works abre con ATELIER y Tulong (el orden usa el año más reciente del rango: Tulong «2025 – 2026» = 2026). Cursor negro de las páginas de proyecto: en el código funciona; fallaba solo en la demo (las páginas compartían ventana) → la demo carga cada página en un iframe nuevo.
- Turno 5: pasafotos de Works rehecho. Bucle infinito en escritorio y móvil; escritorio con arrastre y rueda/trackpad horizontal en modo libre con imán (freeMode sticky), sin secuestrar el scroll vertical (forceToAxis); móvil una tarjeta por gesto. «prev/next» y los puntos sustituidos por `.works-nav` (contador 01/07, nombre, barra de progreso clicable y flechas redondas; `scss/layout/_works-nav.scss`). Probado con rueda, arrastre, botones, segmentos, bucle en los dos sentidos, clic que abre proyecto y swipe vertical en móvil.
- Turno 6: propuesta de copy de la home (en el chat). Alex quiere un Project de claude.ai solo para el portfolio → HANDOFF reescrito como traspaso.

**Pendientes:** OK de Alex; elegir opciones (dónde van las 3 webs, el proceso y el panel); feedback final de Pati/Lenta.

**Siguiente paso:** Alex revisa las previews → ajustes → merge a `main` → Alex actualiza Hostinger.

---

## 2026-06-23 — Rework del portfolio a producción (Track B)

**Contexto:** Reposición de `alexdasi.com` de "web/graphic designer" a **Product Designer** (coordinado vía `cowork/INSTRUCCIONES-CC.md`), más mejoras de interacción y fixes de contenido. Pusheado a producción a petición de Alex (`git-all`).

**Cambios (mergeados a `main`, `fd4c14f`):**
- **Hero:** 3 palabras animadas **PRODUCT / UX·UI / SYSTEMS** + "designer"; relleno amarillo por palabra (sin blur); subtexto reorientado a producto + web.
- **Works:** orden producto-primero (Tulong·Idrica·Knowadays·Clustag·Elsa·Camisola); ocultados 4 proyectos viejos (Old Skull, MEF2C, RoS, Pinstripe) en `works.php` + `works-mobile.php`.
- **About:** copy reorientado a product/systems/AI-assisted (CV PDF intacto). **Meta SEO** actualizado.
- **Interacción:** glow en flecha y botón CV; botón CV rellena en cercanía del magnet.
- **Contenido:** contacto (REACH OUT, email→gmail, LinkedIn primero, typo `through`); claims de Tulong suavizados a "prototype/proposal".
- **CV:** `Resume Alex Dasi 2026.pdf` actualizado; borrado PDF viejo 2025.
- **Gooey:** explorado (v1–v3, metaball con JS en `edf016c`) y **revertido a v0**; tarea abierta **B2**.

**Reglas nuevas memorizadas:** `git-all` (build+merge+push a prod con guardas); nunca em dash en copys; hero conserva composición de palabras apiladas.

**Pendientes:** ver HANDOFF (Idrica, pieza IA, responsive móvil, B2).

**Riesgos/dudas:** Ninguno. Producción verificada (home/tulong/CV 200). Ramas feature integradas (borrables).

**Siguiente paso:** Esperar datos de Alex (Idrica / IA) o nueva tarea.

---

## 2026-06-22 (cierre) — A1 a producción + unificación total en `main`

**Contexto:** Cierre de sesión. Integrar todo en una sola línea (`main`) y dejar producción al día.

**Cambios realizados:**
- **A1:** Mergeada `fix/tulong-mobile-structure` → `main` y pusheada a `origin/main`.
- **Bug de origen cazado:** el fix del fondo fluido de `a9eac82` solo estaba en `css/style.css` (no en SCSS); el watcher lo revertía en cada recompilación al cambiar de rama. Corregido en `scss/js-style/_fluid.scss` (quitado `canvas{display:none}` del media ≤1280; conservados `.bg-controls` oculto y fallback `.no-fluid-mobile`). Ahora es permanente.
- **Unificación:** Mergeada también `feat/cursor-arrow-gooey` → `main` (absorción cursor↔flecha aprobada + eliminación `_arrow.scss` muerto + D5 copilot + docs). Conflictos resueltos: `css/style.css` recompilado (conviven absorción + fluid fix), `HANDOFF.md` reescrito unificado.
- **Verificado:** CSS compilado contiene los 3 cambios (absorción, bloom magnet-active, sin canvas-hide en ≤1280). Sitio 200.

**Estado final:** `main` == `origin/main`, línea única. `fix/tulong-mobile-structure` y `feat/cursor-arrow-gooey` ya integradas (borrables). 10 tags `archive/*`.

**Pendientes:** D4 (tests, opcional), B1 (gooey SVG líquido futuro), borrar las 2 ramas ya integradas.

**Riesgos/dudas:** Ninguno. Producción al día y verificada. Todo reversible (git revert / tags).

**Siguiente paso:** Sesión limpia; nueva tarea cuando quieras.

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
