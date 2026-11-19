# Bitácora de sesiones — project-gamma

> Registro **append-only**. Nunca borrar entradas; añadir al principio (más reciente arriba).
> Formato por entrada: Fecha/hora · Contexto · Cambios · Pendientes · Riesgos/dudas · Siguiente paso.

---

## Conv. 15 · 2026-10-12 16:00 · Publicar (OK)

**Inicio:** 2026-10-12 16:00 · **Turnos:** 1 · **Último msg:** 2026-10-12 16:00 · **Cierre:** 2026-10-12 16:15

**Contexto:** Alex: «ok».

**Cambios:** merge `feat/copy-conceptos-atelier` → `main` (0d1cc8d), push; despliegue automático por GitHub Actions.

**Comprobado en vivo** (navegador del Mac; desde la nube alexdasi.com está bloqueado y el token no lee Actions): la home carga `style.css?v=1791813647` (nuevo) y pide las tarjetas nuevas (otra-vez, pati, lenta) y los 5 `*-portrait.jpg`, todo 200. `atelier.php` (EN/ES) y `pati.php` 200. El panel del navegador estaba oculto y no dejó leer el texto ni hacer capturas.

**Pendientes:** que Alex mire en vivo la tablet y el móvil. «Archive» en móvil fuera de pantalla. `export_demo.py` no copia `srcset`.

---

## Conv. 14 · 2026-10-12 15:32 · Revisión tablet + conceptos como posts en Works

**Inicio:** 2026-10-12 15:32 · **Turnos:** 1 · **Último msg:** 2026-10-12 15:32 · **Cierre:** 2026-10-12 15:55

**Contexto:** Alex: subrayar enlaces de la línea local; en tablet las columnas proyecto/alcance/stack se salen por la derecha y el texto corrido es demasiado grande; Casa Albar, alè, Pati y Lenta deben verse como posts propios; revisar thumbnails en tablet y las tres vistas.

**Cambios (rama `feat/copy-conceptos-atelier`):**
- Enlaces WhatsApp / email del hero subrayados (`_index.scss`).
- Fichas de proyecto 768-1280: columnas sin `min-width: 25vw` (ya no se salen), columna de contenido 50vw → 80vw (capturas más grandes), texto corrido 17-20 px (antes 33-47 px), título del proyecto a 7vw (Idrica se cortaba). Comprobadas las 22 fichas a 390, 768, 820, 1024×1366, 1024×768, 1180 y 1440: sin desbordes.
- Home 768-1280: p global a 18-24 px (About salía a 41 px), hero a 20-28 px, Contact sin solaparse (enlaces en el flujo), tarjeta de Works más baja en horizontal (60vh) para no pisar los filtros.
- Works: tarjetas propias para Otra Vez, Pati y Lenta (thumbnails nuevos desde la captura del hero). Total 12. ES en `lang/es/home.json`.
- Thumbnails verticales `<slug>-portrait.jpg` (captura del móvil centrada) para los 5 conceptos: `<picture>` los usa solo en ≤1280 en vertical; en horizontal y escritorio sigue la captura apaisada.
- Escritorio sin cambios (hero cabe en 1281×720 … 1920×1080). `i18n_check` = 0. Demo v12.

**Pendientes:** OK de Alex para merge a `main`. `export_demo.py` no copia imágenes de `srcset` (se copiaron a mano). «Archive» en móvil sigue fuera de pantalla (ya pasaba).

---

## Conv. 13 · 2026-10-12 15:25 · Aplicar copy elegido (ATELIER A, línea local A)

**Inicio:** 2026-10-12 15:25 · **Turnos:** 1 · **Último msg:** 2026-10-12 15:25 · **Cierre:** 2026-10-12 15:30

**Contexto:** Alex elige A en titular ATELIER y A en línea local; WhatsApp +34 616420048; hola@alexdasi.com existe; quitar la frase de IA del hero.

**Cambios (rama `feat/copy-conceptos-atelier`):**
- Ficha ATELIER reescrita como proceso propio (titular «My Design Process, Turned Into a System», intro, resumen, destacado, último párrafo con la IA como herramienta, stack reordenado, meta). EN + ES.
- Tarjeta ATELIER de Works (escritorio y móvil): sin IA.
- Home: hero sin «AI speeds me up…»; línea local dentro del mismo párrafo (sin CSS nuevo) con enlaces `wa.me/34616420048` y `mailto:hola@alexdasi.com`. EN + ES.
- Cabe en 1281×720, 1366×768, 1440×900, 1920×1080 y 375 px. `i18n_check` = 0.
- Demo privada actualizada (versión 11).

**Pendientes:** OK de Alex para merge a `main`. Los enlaces de la línea local no se distinguen del texto (sin subrayado): ¿subrayarlos?

---

## Conv. 12 · 2026-10-12 15:19 · Copy: conceptos, ficha ATELIER y negocios locales

**Inicio:** 2026-10-12 15:19 · **Turnos:** 1 · **Último msg:** 2026-10-12 15:19 · **Cierre:** 2026-10-12 15:22

**Contexto:** Alex: (1) quitar «Built with ATELIER» de los conceptos y poner «Concept · 2026»; (2) reescribir ATELIER como su proceso de diseño propio, sin IA en titular ni en el resumen de la home; (3) línea para negocios locales con CTA (WhatsApp / hola@alexdasi.com). Enseñar textos antes de publicar.

**Cambios (rama `feat/copy-conceptos-atelier`):** punto 1 aplicado en EN y ES. Puntos 2 y 3 propuestos en `docs/specs/2026-10-12_copy-atelier-conceptos-local.md`.

**Pendientes:** elección de Alex (titular ATELIER, línea local), número de WhatsApp, confirmar hola@alexdasi.com, ¿quitar la frase de IA del hero?

---

## Conv. 11 · 2026-10-08 22:10 · Casa Albar y alè + Works centrado en móvil

**Inicio:** 2026-10-08 22:10 · **Turnos:** 2 · **Último msg:** 2026-10-09 10:20 · **Cierre:** 2026-10-09 10:30

**Contexto:** Alex: subir al portfolio Casa Albar y la web de yoga (alè), que no están en el post de ATELIER; y que los thumbnails de Works en móvil estén centrados (se iban a la derecha).

**Cambios (rama `feat/casa-albar-ale`):**
- `php-pages/projects/casa-albar.php` y `ale.php` (Own work · independent concept), mismo patrón que Otra Vez. Textos sacados de `sites/<slug>/resumen.md` y `CHANGELOG.md` de `AlexDasi/atelier`. ES completo en `lang/es/projects/`.
- Capturas propias (1440×900 + composición de 3 móviles) en `content/pictures/projects/<slug>/` y thumbnails 1536×1024 en `thumbnails/lq/`. Casa Albar se compiló en local (Astro) con sus 14 fotos de Unsplash bajadas por el navegador del Mac de Alex (desde la nube Unsplash y pages.dev están bloqueados). alè es HTML autocontenido; fuentes Fraunces/Manrope de fontsource.
- Works (escritorio y móvil): tarjetas CASA ALBAR y ALÈ (tag `web`, 2026), tras Tulong.
- `atelier-concepts.php`: 5 conceptos (Casa Albar, alè, Otra Vez, Pati, Lenta).
- **Fix móvil:** (1) Swiper de Works móvil con `roundLengths: false`: 90vw con decimales se redondeaba y el error se sumaba en cada clon del bucle (17 px a la derecha a 768 px). (2) `.categories` medía 100vw dentro de un hueco de 90vw: el body se salía 5vw y la página se podía arrastrar en horizontal. Ahora body = viewport y tarjeta centrada (±1 px) de 360 a 1024 px.
- Demo privada actualizada (versión 10).

**Publicado (turno 2, «ok»):** merge a `main` (85aaaf2), run #20 Success. En vivo: Casa Albar y alè (EN/ES) 200, thumbnails 200, `swiperNew.js` con el fix, 9 tarjetas en Works móvil; a 375 px body = 375 y tarjeta 20/18 px.

**Pendientes:** en móvil el enlace «Archive» de la fila de filtros queda fuera de pantalla (ya pasaba en `main`).

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
- 2026-10-30 · Contact: mailto a hola@alexdasi.com (antes alejandrodasi@gmail.com). ATELIER conv. 829.

---

## 2026-11-18 — Rama `rediseno-baraja-2026-11`: home = intro + baraja, sobre su web (ATELIER conv. 1330)

**Contexto:** giro de Alex (feedback ronda 6, puntos 66-74; además 53-55 y 60): la v0.3 Astro queda aparcada como camino y se trabaja sobre esta web. `main` sin tocar (un push a main despliega en vivo).

**Rescatado tal cual:** cursor (fluido + punto con imán, magnet-mouse), flecha con su círculo y su bloom, «los pisos» (paginación del MainSwiper), cabecera (EN/ES + «alex dasi»), Inter, About/Process/Contact y el pasafotos de UX/UI (ahora en `about.php`, en su oscuro de siempre).

**Rediseñado:**
- `index.php`: solo dos pantallas, intro (`php-pages/intro.php`, saludo sencillo; la bola solo como punto final lima con imán) + baraja (`php-elements/baraja.php`, `js/baraja.js`, datos y flags en `content/baraja.json`, vídeos en `content/baraja/`). La rueda NO cambia de pantalla (`data-wheel="off"`): en la intro empuja el fluido y en la baraja pasa cartas. Solo pisos y flecha cambian de pantalla.
- Baraja sin HUD, bucle infinito, inclinada a la izquierda y menos frontal (rotateY -16°, rotateZ -7°), de esquina a esquina; rueda/trackpad, arrastre, swipe y flechas; solo transform/opacity por frame; solo la carta de delante reproduce vídeo y la siguiente se precarga. Móvil (< 900 px): una carta grande con swipe.
- Día (blanco roto #f5f3ec + lima #ECF98E + tinta) / noche (#000 + lima), botón fino arriba a la derecha junto a UX/UI · About · Contact (`php-elements/nav-baraja.php`, `js/tema.js`).
- Fluido: preset por página (`window.__FLUID_PRESET` en `header-baraja.php`): plano (`FLAT`, sin relieve ni arcoíris), lima fijo, sin manchas al cargar (fuera la «textura»), cola `window.__fluidQueue` para la rueda y el dedo. Sin preset, `fluid.js` se comporta como siempre.
- Arreglos de paso: error de consola de magnet-mouse (doble `init()` sin `destroy()`), página en blanco a 1280 px justos (`_site.scss`, 1281), favicon/dither con ruta relativa.
- `tools/export_preview.py`: exportación estática con rutas relativas para Cloudflare (`--con-proyectos` para incluir los casos).

**QA (export servida en local):** vivo.mjs 0 rojos en iPhone 13 / SE / Android 360 / desktop, EN y ES (2 avisos de póster móvil a 780 px nativos). medir.mjs: home sin rojos; About arrastra rojos de antes (HOW I WORK 3,4 pantallas en móvil, chips de filtro de 33 px). Fluidez: `pinta()` p95 2,1 ms/frame en escritorio, 1,4 ms en móvil (4,4 ms con CPU ×4); sin layout por frame (solo al cambiar de carta). Los fps absolutos del contenedor (sin GPU, 2 núcleos) no sirven: falta verlo en un dispositivo real.

**Preview:** https://atelier-demo-propuestas.pages.dev/2026-11-19_alexdasi-baraja-sobre-su-web/

**Pendiente (Alex):** ver la fluidez en su Mac y su móvil; Imperio (permiso de Mauro; el vídeo enseña la franja «web nueva en revisión»); Mas Vesprada sin enlace hasta tener subdominio; Elsa neutra hasta el 30/11 (sus datos no están en este repo a propósito).

---

## 2026-11-19 — v2 de la rama `rediseno-baraja-2026-11` (feedback 75-81 de Alex, ATELIER conv. 1330)

- **75 · Giro, no inclinación:** cartas como fichas de dominó vistas de lado (rotateY −64° detrás, −12° la de delante, con perspectiva por carta); la de delante entera y con su ficha debajo; al pasar el ratón por una de detrás se abre hacia ti (−34°). `js/baraja.js` › `MESA`.
- **76-77 · 7-8 a la vez:** 9 cartas (Brot visible y Vapor nuevo, vídeos grabados el 19/11 con el script de la selección). Se ven 8 a la vez en escritorio. Ningún vídeo enseñaba alexdasi.com; la única carta con «portfolio» era Berto («Diseño industrial · portfolio») → ahora «web de autor». Rango de la baraja asimétrico [−1.5, n−1.5) para que el bucle no se vea.
- **78 · Pisos sin borde:** `?pisos=a` (todo en tinta, apagados al 12 %, activo al 86 %) · `?pisos=b` (apagados en tinta suave, activo del color del cursor).
- **79 · About nuevo:** `about.php` + `php-pages/sobre-mi.php`, blanco roto, 5 pantallas (hola · cómo trabajo · trayectoria · UX/UI · hablamos) con el copy de `clientes/alexdasi/bio/2026-11-18_bio-about-cv.md` (años como [N]); CV en PDF discreto (`content/downloadables/alex-dasi_cv_2026-11*.pdf`); botones ≥ 44 px. Ya no se traen las pantallas oscuras antiguas (siguen en `php-pages/about.php`, `process.php`, `contact.php`, `works.php`, sin usar aquí).
- **80 · Color del cursor:** paleta corta (lima, coral, cielo, lila, menta, albaricoque) al azar al abrir; la tecla espacio pasa al siguiente (`js/cursor-color.js`); pista mínima en la intro que se va al usarla; `?cursor=fijo` = solo lima. El punto final del saludo toma el color del cursor.
- **81 · Día en tinta:** cabecera, idioma, pisos, flecha y textos en tinta; el lima solo de acento.
- **Idioma:** castellano por defecto, inglés con `?lang=en` (`php-elements/i18n.php`; afecta a todo el sitio, también a las páginas de proyecto).
- Cabecera táctil ≥ 44 px en móvil; en ≤ 400 px se oculta «alex dasi» del centro (no cabía con los accesos).

**QA (exportación servida en local):** vivo.mjs 0 rojos en home ES, home EN y About (iPhone 13, SE, Android 360, desktop) · medir.mjs 0 rojos · nitidez 0. Fluidez: `pinta()` p95 1,7 ms/frame escritorio, 1,5 ms móvil (2,5 ms con CPU ×4); layout solo al cambiar de carta (28 en 2,3 s, 6 ms en total).

---

## 2026-11-19 — v3 de la rama `rediseno-baraja-2026-11` (feedback 82-96, ATELIER conv. 1330)

- **A · Estética:** noche por defecto (clave `alexdasi-tema-v3`); el acento elegido (al azar al abrir, espacio = siguiente, `?cursor=fijo` = lima) tiñe toda la web vía `--cursor-color → --accent-color`. Fluido de noche con la config del panel FX de Alex (density 0,35 · velocity 1,0 · curl 0 · pressure 50 · radius 0,19 · force 12000 · opacity 0,5 · shading); de día, plano. «PRESS SPACE» en inglés arriba a la izquierda (solo con ratón). Interfaz en mayúsculas. Claim sin «Valencia» con `?claim=a|b|c` (por defecto c: «Webs que se parecen a tu negocio, no a una plantilla»), también en el titular del About.
- **B · Baraja escritorio:** resaltado al pasar por cualquier carta; las cartas se tumban y se abren según la velocidad del scroll (`VIVO` en `js/baraja.js`); flotan en reposo; ficha nueva (filete, nº/total, tipo con punto de acento, nombre, sector, texto, «Ver proyecto» + «Visitar web»).
- **C · Proyectos:** 12 cartas (+ Berto Sánchez Studio, REISSUE y Nómada; vídeos de REISSUE y Nómada grabados el 19/11). Cada carta abre su ficha `proyecto.php?p=<slug>` (vídeo HD, problema, qué hice, datos, visitar web, siguiente). Mas Vesprada sin botón externo (sin URL pública). Elsa sigue neutra y sin ficha.
- **D · La esfera:** el punto de «Alex Dasi» ya no lleva borde ni imán; al hacer clic vuela al centro y crece hasta la esfera, portada tal cual de la demo aprobada v9 (`esfera/esfera-pieles.html`, modo `?embed`). `?piel=solare|chicle|glaseado|gota|prisma` (por defecto solare). Arrastrar = gira con inercia y vuelve a su giro (de la demo). Clic fuera o Esc la devuelven al punto. `js/esfera.js`.
- **E · Móvil:** sin fluido; la esfera flota en el centro de la intro con spin con el dedo; baraja en fila horizontal con imán, la siguiente asomando y una regla de marcas (como el móvil de The Lookback).
- Medios de la baraja a 1000 px (las fichas usan `*-hd`).

**QA:** vivo.mjs 0 rojos (home ES/EN, About, fichas) · medir.mjs 0 rojos. Fluidez: móvil 60 fps en el swipe (p95 16,7 ms; con CPU ×4 58,9 fps); escritorio `pinta()` p95 ≈ 5 ms, sin layout por frame; los fps de escritorio de este contenedor (sin GPU) no son representativos (el fluido de noche con su config baja la página a ~10 fps en render por software).

---

## 2026-11-19 — v4 de la rama `rediseno-baraja-2026-11` (feedback 98-105, ATELIER conv. 1330)

- **98 · Esfera:** el punto anuncia el clic (te sigue hasta 18 px y se imanta en un radio de 120 px, crece ×1,9, halo y aro fino del acento que late; el cursor propio se aparta). Al hacer clic la bola crece DETRÁS del saludo: la capa vive dentro de la pantalla de la intro (z 0, el texto z 1); de noche el saludo se invierte sobre la bola (`mix-blend-mode: difference`), de día ya es tinta sobre acento. Ni el fondo ni la bola cambian de color: la capa no tiene fondo, el iframe es transparente (alfa = silueta de la bola; el brillo no toca el alfa) y la piel se tiñe del lima al acento activo (giro de tono en el último pase, `?acento=r,g,b` + mensaje `esferaAcento` si pulsas espacio con ella abierta). Espacio con el foco dentro de la esfera hace lo mismo que fuera.
- **99 · Fluido de día:** opacidad 0,9 → 0,65. Noche sigue con su config.
- **101 · Acento en todo:** glow de la flecha, pisos, panel FX y restos (`rgba(236,249,142,…)` y `#ecf98e`) → `color-mix(in srgb, var(--accent-color) N%, transparent)`. `theme-color` según día/noche. Solo quedan los `$lima` de respaldo dentro de `var(--cursor-color, …)`.
- **102 · About:** la cifra 15 en tinta dentro de una bola del acento (te sigue un poco y cuenta hasta 15 al llegar), «qué hago» numerado con filete del acento al pasar, pasos con número en punto del acento, ATELIER en bloque de acento, hitos con su punto en el filete (el de «Hoy» late), «lo que me llevo» con subrayado grueso del acento, UX/UI en titular grande con su punto y casos numerados, «Hablamos.» enorme con la bola del acento detrás que te sigue y WhatsApp en acento. Entrada escalonada por pantalla (solo transform/opacity; sin JS todo visible; respeta «reducir movimiento»). Móvil con composición propia (cifra pequeña al lado, «qué hago» en 2 columnas, bola de «Hablamos» arriba a la derecha).
- **103 · 15 años:** About ES/EN («Llevo 15 años diseñando» / «I've been designing for 15 years»); Edimburgo «Cinco años» (2016-2021, como en el CV, que ya decía «5 años en Edimburgo»). CV ES/EN regenerados (Chrome headless, mismo HTML de ATELIER `clientes/alexdasi/bio/`) y copiados a `content/downloadables/`.
- **104 · PRESS SPACE :)** abajo a la izquierda como en la web original, en una pastilla del acento con texto en tinta (se lee igual en día y en noche), «:)» en texto plano con `font-variant-emoji: text`. Solo con ratón.
- **105 · Día y noche iguales:** lo que difería: (1) espacio de noche soltaba además una ráfaga ARCOÍRIS de 16-36 manchas (`fluid.js`) y de día nada; (2) cambiar de color soltaba 2 manchas al azar solo de noche (`applySettings`); (3) la esfera ponía el fondo NEGRO en los dos modos (de día se iba la página a negro) y la bola siempre lima; (4) el glow de la flecha, lima fijo. Ahora espacio = acento siguiente + pincelada + ráfaga corta del acento nuevo (7 manchas) en los dos modos; solo cambian la paleta y la config del fluido.
- **100 · Rendimiento** (tabla abajo): fluido que se duerme (sin gesto: deja de pedir frames a los ~12 s de noche / ~4 s de día, y nada más cargar; se despierta con ratón, cola, ajuste, resize o volver a la pestaña; en pausa con la esfera abierta), lienzo a 1× (`MAX_DPR`) y tinte a 512 de noche; las cartas flotan con CSS (`translate`) y la baraja para su bucle en reposo; solo la carta de delante, la anterior y la siguiente guardan vídeo (el resto vuelve a póster); vídeos de carta recodificados (escritorio 840 px, móvil 600 px, crf 29: 20,5 → 8,5 MB); pósters en webp por hueco (560/1000 escritorio, 420/780 móvil; elegidos por JS para que `naturalWidth` sean píxeles reales); Inter servida desde la web (variable, latín + latín ampliado, precarga) en vez de la hoja de Google que bloqueaba el pintado; esfera de móvil cargada en reposo, a 1,25× y a 30 fps si no la tocas, pausada fuera de pantalla. La esfera de escritorio ya solo bajaba al hacer clic (iframe + three.js de jsDelivr).

### Rendimiento antes / después (home, exportación servida en local con gzip; `node tools/medir_rendimiento.mjs <url>`)
| | Escritorio antes | Escritorio v4 | Móvil antes | Móvil v4 |
|---|---|---|---|---|
| Peso transferido en la primera carga | 1,33 MB | **0,48 MB** | 1,21 MB | **0,79 MB** |
| Peticiones | 29 | 28 | 36 | 35 |
| De otros dominios | 49 KB (Google Fonts) | 0 | 270 KB | 223 KB (three.js de la esfera) |
| Imágenes / vídeo | 772 / 433 KB | 138 / 195 KB | 633 / 226 KB | 276 / 141 KB |
| LCP | 896 ms | 388 ms | 424 ms | 100 ms |
| rAF en reposo (intro, ≥ 14 s sin tocar) | 9,5/s continuo | **0** | 0 | 0 (la esfera va en su iframe) |
| Trabajo del hilo principal en reposo (intro) | 1.053 ms/s | **0,3 ms/s** | 1.117 ms/s* | 1.145 ms/s* |
| rAF en reposo con la baraja | 16/s | **0** | — | — |
| JS por frame moviendo la baraja | 0,76 ms | 1,05 ms | — | — |
| Memoria de vídeo: texturas WebGL | 27,3 MB | 8,1 MB | 0 | 0 |
| Lienzo del fluido | 9,9 MB a 1× (≈ 40 MB en retina) | 9,9 MB (se queda a 1× en retina) | — | — |
| Vídeos con datos en memoria tras pasar 20 cartas | 11 (≈ 40 MB) | 3 (≈ 8 MB) | 1 | 1 |

\* Móvil: es la esfera WebGL de la intro (la pidió Alex girando sola). En este contenedor el WebGL va por software (SwiftShader) y ocupa toda la CPU a cualquier ritmo; en un móvil real va por GPU. Ahora va a 30 fps y 1,25× cuando no la tocas y se para fuera de pantalla. Los fps absolutos de aquí no valen; los bytes, las peticiones y los rAF, sí.

**Preview vs web final:** la carpeta exportada pesa 27 MB (antes 37 MB) porque copia TODOS los medios de la baraja (vídeos HD de las fichas, jpg de respaldo, versiones móvil y escritorio), pero la home solo transfiere lo de la tabla. La web final en Hostinger transfiere lo mismo + Google Analytics (gtag, que la exportación quita; ~100 KB, asíncrono, no bloquea).

**QA (exportación servida en local):** vivo.mjs 0 rojos en home ES y EN, About y ficha (iPhone 13, SE, Android 360, desktop) · nitidez 0 · medir.mjs 0 rojos (avisos: el bloque «hola» del About en móvil ocupa 1,4-1,8 pantallas en SE/13, y la cabecera de las fichas). Paridad día/noche comprobada con script: espacio, acento, glow, PRESS SPACE y esfera hacen lo mismo en los dos.

---

## 2026-11-19 — v5 de la rama `rediseno-baraja-2026-11` (feedback 106-116, ATELIER conv. 1330)

- **106 · Una piel por sesión:** la piel de la esfera sale al azar UNA vez por sesión (`sessionStorage` `alexdasi-piel`, decidido en `header-baraja.php` antes de pintar → `window.__PIEL`) y es la misma en la home y en «Hablamos» del Sobre mí. En «Hablamos» la bola del acento es ahora el marcador de la esfera de verdad (`[data-esfera-habla]`, iframe `?frac=0.56&hudizq`), que solo se carga al llegar a esa pantalla (escritorio: pisos; móvil: al entrar en vista) y se pausa al salir. `?piel=` sigue forzando una (y se queda para la sesión).
- **107 · Más luz:** embebida, la exposición del AgX va por piel (`EXPO` en `esfera/esfera-pieles.html`: solare 1,12 · chicle 1,3 · glaseado 1,12 · gota 1,45 · prisma 1,15 · cuarzo 1,3 · gema 1,4). La gota (el «planeta» de Alex) salía casi negra: el metal reflejaba la franja oscura del entorno → metal 0,85 → 0,5, reflejo 1,25 → 1,7 y algo de luz propia; ya se leen vetas, surco y brillo en noche y día.
- **114-115 · Pieles rescatadas, portadas tal cual** de `ATELIER sites/propuestas/public/lab/2026-11-05_esfera-demo-cursor/`: **Cuarzo** = punta de cuarzo lima de la `_v2.html` (conv. 1020; mismo `cristal()` que el prisma con velos lechosos) y **Gema** = la «gema turbia» de la `_v3.html` (conv. 1024; icosaedro irregular y gastado de cuarzo turbio: el poliedro cuarcificado). Las dos con la cara bajo el cursor que se enciende y el HUD de medida del prisma. El **Chicle** ya estaba (v8/v9, con su agarre de clic y arrastre). Sorteo: solare · chicle · glaseado · gota · prisma · cuarzo · gema. Fuera del sorteo: niebla (descartada por Alex en la v8), aceite (v5, sustituido por la gota) y el cubo de cuarzo turbio (v4, «demasiado cubo»).
- **112 · Saludo sin invertir:** fuera el `mix-blend-mode: difference` del saludo con la esfera abierta: blanco de noche, tinta de día.
- **113 · El ratón juega con la esfera:** con la esfera abierta el fluido de fuera se queda CONGELADO tal cual (en pausa ya no entra ninguna mancha: `applyInputs` y el `mousemove` de `fluid.js` salen si `PAUSED`; antes un gesto o el espacio pintaban encima y se quedaban fijas). Dentro, Solare ya no pinta el rastro del fluido sobre la piel (era el mismo fluido de la web y parecía el de fuera): el mismo campo de velocidad REMUEVE EL GAS de dentro, en todas sus capas, y el gas removido se aviva un poco (`uGas`, solo embebida).
- **108 · Fluido de día:** opacidad 0,65 → 0,45, radio 0,3 → 0,2 y fuerza 6000 → 4500 (rastro más corto). Noche sin cambios.
- **111 · El punto se funde con lo interactivo:** `js/cursor-fusion.js`, PORTADO de la pieza de la librería de ATELIER «Cursor contextual que se convierte en botón» (`aww-dynamic-contextual-cursor-studiors`, kit `tools/templates/motion-kit/cursorShape.ts` modo `shape`, lab `2026-10-22_cursor-contextual-forma` V1). Una mancha del acento nace debajo del punto al entrar, se estira hasta ser el fondo del elemento (rect + 2 px con su radio, lerp 0,4/0,28, paralaje del kit acotado a ±3 px) y al salir vuelve a ser el punto. Va DEBAJO del texto (z 1, antes de la pantalla en el DOM). Solo en filas de UX/UI, botones (Sobre mí y fichas; el WhatsApp lleno se funde en el color del texto), «Ver proyecto / Visitar web» de la baraja (subrayado de 3 px) y los accesos de arriba (subrayado). La flecha conserva su absorción (D-0002) y los pisos su imán. Bucle parado en reposo. `?fusion=no` la apaga.
- **109 · PRESS SPACE :)** sin tocar.

### Paleta de acentos (feedback 110): 12, dando la vuelta al círculo de color
Al abrir sale uno al azar; espacio = el siguiente (en este orden). Todos claros: la tinta encima se lee en día (≥ 8,6:1, AAA) y sobre el negro de noche ≥ 9,8:1. `?cursor=fijo` = lima.

| # | Nombre | RGB | Tono | Tinta encima | Sobre negro |
|---|---|---|---|---|---|
| 1 | lima | 236, 249, 142 | 67° | 16,2 | 18,5 |
| 2 | pistacho | 190, 235, 140 | 88° | 13,5 | 15,5 |
| 3 | menta | 140, 230, 185 | 150° | 12,4 | 14,1 |
| 4 | aqua | 120, 225, 230 | 183° | 12,0 | 13,7 |
| 5 | cielo | 150, 200, 255 | 211° | 10,5 | 12,0 |
| 6 | pervinca | 168, 180, 255 | 232° | 9,3 | 10,6 |
| 7 | lila | 200, 170, 255 | 261° | 9,3 | 10,6 |
| 8 | orquídea | 240, 165, 240 | 300° | 9,9 | 11,3 |
| 9 | rosa | 255, 170, 210 | 332° | 10,5 | 11,9 |
| 10 | cereza | 255, 145, 155 | 355° | 8,6 | 9,8 |
| 11 | coral | 255, 168, 140 | 15° | 9,8 | 11,2 |
| 12 | albaricoque | 255, 212, 110 | 42° | 13,1 | 14,9 |

La esfera se tiñe de cualquiera (giro de tono desde el lima en el último pase, v4).

**QA (exportación servida en local, sin «clean URLs»):** vivo.mjs 0 rojos en home, About UX/UI, Hablamos y una ficha (iPhone 13, SE, Android 360, desktop) · medir.mjs 0 rojos (4 avisos de siempre: bloques del About en móvil de 1,4-1,7 pantallas) · las 7 pieles comprobadas en noche y día (escritorio) y gema/cuarzo/chicle en iPhone 13 e iPad vertical/horizontal. Rendimiento home: escritorio 0,49 MB / 29 peticiones (v4: 0,48 / 28; +`cursor-fusion.js`), rAF en reposo 0 (intro y baraja), LCP 164-404 ms; móvil 0,80 MB / 36 (v4: 0,79 / 35), rAF en reposo 0. Ojo al probar en local con `serve`: sus «clean URLs» quitan la query del iframe (`?embed&piel=…`) y sale la demo entera; Cloudflare y Hostinger no lo hacen.
