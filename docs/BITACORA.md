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

---

## 2026-11-19 — v6 · fichas de proyecto rediseñadas (feedback 116, ATELIER conv. 1330, agente Fichas)

- **Plantilla nueva** (`proyecto.php`, hoja propia `scss/ficha.scss` → `css/ficha.css`, `js/ficha.js`; no toca `style.css` ni la home): barra (volver + nº/total) → titular enorme + ficha técnica en columnas (cliente o tipo · sector · lugar · año · rol) → portada con el vídeo de escritorio grande y el de móvil montado encima → 01 El problema / 02 Qué hice → 03 Momentos (3 capturas de escritorio + 1 de móvil, numeradas y a distintas escalas) → 04 En vivo (dominio grande + botón) → Siguiente proyecto (la carta siguiente de pie con dos de canto, se abre hacia ti al pasar). Día/noche, acento activo, fusión del cursor en botón y «Proyectos», interfaz en mayúsculas. La cabecera fija se aparta al bajar y vuelve al subir.
- **Móvil = diseño propio:** solo el vídeo de móvil (el de escritorio no se pide), datos en dos columnas, momentos en fila con imán y la siguiente asomando, botón a todo el ancho, carta siguiente casi de frente. Tablet: misma composición que escritorio con datos en 3 columnas.
- **Procedencia** (regla «Referencias primero»): registro n.º 256 Gil Huybrecht (ficha en columnas, pantallas numeradas), n.º 240 Maria Vasilyeva (pantallas reales a distintas escalas), n.º 183 Jesper Landberg · The Lookback (cierre que sigue la baraja). Tabla en ATELIER `briefs/alexdasi-fichas.procedencia.md` (comprobar ✅; pendiente del sí de Alex).
- **Momentos:** `content/baraja/<slug>_momento-<d1|d2|d3|m1>-<ancho>.webp` (1600 y 900 escritorio · 780 y 480 móvil), capturados el 19/11 de cada web en vivo (Chrome sin cabeza, 1600×1000 y 390×844 a 2×). `js/ficha.js` pide la versión que toca según el hueco. 88 archivos, 6 MB; perezosos.
- **Datos** (`content/baraja.json`): campo `rol`; textos revisados contra `sites/<slug>/ATELIER.md` de ATELIER. Cambiados por no estar respaldados: Imperio (fuera «panel para que el equipo la mantenga»), Berto («panel propio» → «panel sencillo»), Berto Studio (fuera «para clientes que buscan encargar una pieza»), Nómada (fuera «suscripción»), Mas Vesprada (el final es de noche, no al atardecer). Nada de cifras, resultados ni citas.
- **Queda sin uso** el bloque `.pf` de `scss/layout/_baraja.scss` (no se borra aquí para no recompilar `style.css` mientras se trabaja la home).

**QA (exportación servida en local):** vivo.mjs 0 rojos en Casa Albar, Berto Studio e Imperio (iPhone 13, SE, Android 360, desktop) · medir.mjs 0 rojos (aviso: en móvil la cabecera + vídeo 4:5 suman 1,5-1,9 pantallas) · nitidez 0 rojos (naranja: el vídeo HD de 1600 px en pantallas retina de 1440).

## 2026-11-19 — v6 · arreglos (feedback 115 y 118-122, ATELIER conv. 1330)

- **115 · Acentos al azar:** el espacio salta a otro color AL AZAR, nunca el que hay (antes, en orden de rueda). Paleta: los 6 de siempre + 3 locos (abajo). Fuera los 12 de la v5.
- **118 · Flecha:** se quedaba imantada si el ratón salía de ella hacia fuera de la ventana (está a 40 px del borde) o hacia el marco de la esfera: magnet-mouse solo escucha el mousemove de la ventana y no le llegaba nada más; el mouseout sí quitaba `.active`, por eso la flecha se quedaba BLANCA sobre el acento. Ahora `js/magnet.js` la suelta al salir de la ventana, al entrar en un marco, al perder el foco, al cambiar de pantalla y si el ratón ya está fuera de su zona en reposo (caja de diseño, sin el desplazamiento). Sobre el acento (imán o hover) la flecha va siempre en tinta, también con la esfera abierta.
- **119 · La piel cambia:** nueva al azar en cada carga y otra cada vez que se vuelve a abrir la esfera, nunca la misma que la anterior. La última vista se apunta en `localStorage` (`alexdasi-piel-ultima`) solo para no repetirla y para que «Hablamos» enseñe esa. Fuera el `sessionStorage` de la v5. `?piel=` sigue forzando una.
- **120 · El fluido no se congela nunca:** fuera el `PAUSED` al abrir la esfera. El marco de la esfera va con `pointer-events: none` y la página decide: cuando el ratón entra en la bola, el marco recoge el ratón (gas, chicle, caras, arrastre con inercia, clic) y el fluido de fuera no pinta encima; al salir de la bola sin arrastrar, el marco lo devuelve (`{esfera:'fuera'}`, `?mano`) y el fluido sigue, sin salto (`window.__fluidSinSalto`). Igual en «Hablamos» (antes el marco, 1,8 veces la bola, se comía el ratón en un cuadrado enorme: por eso el fondo parecía congelado y la bola se movía al arrastrarla); allí la bola deja de seguirte mientras estás dentro. Clic fuera de la bola (no en enlaces, flecha ni pisos) la cierra.
- **121 · Pisos con imán:** `js/pisos-iman.js`: el piso más cercano (34 px) se deja llevar hacia el ratón (propiedad `translate`, el rombo sigue en `transform`), se enciende del acento con su brillo y el punto se funde en él (`html.piso-iman`). Activo y hover SIEMPRE del acento, en día y en noche (de día con un filo de tinta para leerse sobre el papel; `?pisos=a|b` ya no cambia nada). El punto del cursor es del acento siempre (de día con un aro fino de tinta).
- **122 · Día más claro:** la esfera sabe si es día (`?dia` y mensajes `{esferaTema}` al cambiar) y sube la exposición por piel (`EXPO_DIA` 1,32-1,95) y levanta las sombras en el último pase (`uLuz`, solo donde hay bola). La noche no cambia.
- Fuera el bloque `.pf` de la ficha v3 de `_baraja.scss` (la ficha nueva vive en `scss/ficha.scss`).

### Paleta (9)
| Nombre | Hex | Tinta encima (día) | Sobre negro (noche) |
|---|---|---|---|
| lima | #ECF98E | 16,2 | 18,5 |
| coral | #FFA88C | 9,9 | 11,2 |
| cielo | #96C8FF | 10,5 | 12,0 |
| lila | #C8AAFF | 9,3 | 10,7 |
| menta | #8CE6B9 | 12,4 | 14,1 |
| albaricoque | #FFD46E | 13,1 | 14,9 |
| magenta (loco) | #FF4FD8 | 6,5 | 7,4 |
| verde ácido (loco) | #8CFF3C | 14,5 | 16,5 |
| naranja eléctrico (loco) | #FF7A1A | 7,1 | 8,1 |

**QA (exportación servida en local):** vivo.mjs 0 rojos en home, Hablamos y la ficha de Casa Albar (iPhone 13, SE, Android 360, desktop) · medir.mjs 0 rojos · rendimiento con el mismo servidor que la v5: escritorio 0,85 MB / 30 peticiones (v5 0,85 / 29; +`pisos-iman.js`), móvil 1,03 MB / 37 (v5 1,16 / 36), rAF en reposo 0 en intro y baraja. Las 7 pieles comprobadas de día antes/después y de noche sin cambios.

---

## 2026-11-19 — v7 · arreglos (feedback 123-126, 132-134, 137, 139-143 y 146, ATELIER conv. 1330, agente Arreglos)

- **123 + 139 · Pisos estáticos como en la v5** (lección L-1330e): fuera `js/pisos-iman.js` (ni se mueven hacia el ratón ni brillan). De día, la opción A de la v5 tal cual: apagados en tinta al 12 %, hover al 30 %, **activo en tinta** (feedback 139). De noche, los de siempre: acento al 40 % y el activo del acento.
- **124 + 140 · Punto sin aro:** fuera el `box-shadow` de tinta del `.follow` (día y noche). Comprobado: sin sombra ni borde libre, sobre la flecha y sobre los accesos.
- **125 + 142 · Con la esfera abierta el punto no desaparece:** fuera `html.esfera-abierta .follow { opacity: 0 }` (venía de la v3, cuando el marco tapaba toda la pantalla). Fuera de la bola, el punto de siempre; sobre la flecha encendida **se queda a la vista en tinta** (el imán no se lo traga con la esfera abierta); dentro de la bola, el cursor de la esfera. Al salir de la bola el punto vuelve en el primer movimiento (no en la posición vieja) y, si la página recibe un movimiento lejos de la bola (salida de golpe), se suelta ahí mismo. La fusión de los accesos funciona igual que con la esfera cerrada.
- **126 · HUD de cuarzo/gema/prisma en día:** el texto de la medida va en tinta de día (`html.dia #hud .tag`); de noche, acento + blanco como antes.
- **132 · Fichas, «Proyectos»:** salían dos líneas del acento (la del CSS de `.ficha__link` y la de la mancha). El volver queda fuera de la fusión y sin línea. En el resto de enlaces de texto con fusión (también «Ver proyecto / Visitar web» de la baraja), una sola línea: la de la mancha.
- **146 · Accesos de arriba (UX/UI, Sobre mí, Contacto):** igual: al pasar, solo la línea de la mancha (la propia en tinta se apaga en hover; la del activo se ve cuando no estás encima).
- **133 · Fichas, fluido que «baja muchísimo»:** era `js/intro.js`: en cualquier página con rueda soltaba una ola de fluido hacia abajo por cada vuelta (pensado para la intro). Ahora solo actúa si la página tiene intro (la home). El lienzo ya era fijo al viewport. Medido en la ficha: 12 olas en 12 vueltas de rueda → 0.
- **134 · La mancha nunca excede el botón:** la mancha va dentro de un marco con la forma exacta del elemento (su rect y su radio, `overflow: hidden`); fuera el pad de 2 px y el paralaje de ±3 px. Medido entrando desde 6 direcciones: antes asomaba hasta 5 px, ahora 0. Al salir se retira recortada y el punto vuelve ya.
- **137 · «Hablamos» igual que la home:** mismo código (`mano()` de `js/esfera.js`) y misma zona de captura; lo que lo rompía era que «Hablamos.» y la entrada iban DELANTE de la bola y recogían el ratón a partir de la mitad del radio (el marco perdía el ratón y el fluido pintaba encima). Ahora ese texto no recoge el ratón (como `.intro` en la home); los botones sí. Arrastrando, el marco sigue recibiendo el ratón fuera de la bola hasta soltar (comprobado: eventos fuera de la caja del marco con el botón pulsado).
- **141 · Fluido más suave:** día `EFFECT_OPACITY` 0,45 → **0,35** y `SPLAT_FORCE` 4500 → **4000**; noche `EFFECT_OPACITY` 0,5 → **0,4** y `SPLAT_FORCE` 12000 → **10000** (resto igual).
- **143 · La esfera carga mucho antes:** (1) **precarga en reposo**: con la home cargada (`load` + 600 ms + `requestIdleCallback`) se monta invisible la esfera de la piel que va a salir, baja three.js, construye la pieza, compila sus shaders, pinta 2 fotogramas y se PAUSA (sin trabajo después); al clic vuela la bola plana del punto y la esfera de verdad toma el relevo a los 380 ms. Al cerrar, se precarga en reposo la piel de la próxima vez. `?precarga=no` la apaga. (2) La esfera avisa «lista» con 2 fotogramas pintados (antes, 0,25 s de animación). **Medido aquí (WebGL por software, sin GPU, así que los absolutos son exagerados):** clic → esfera visible **15.300-18.900 ms → 590-625 ms** con precarga; sin precarga (clic antes de que termine), 14.000 ms. Coste: la home baja three.js (~200 KB gzip de jsDelivr) y crea un contexto WebGL en reposo, ya no solo al hacer clic; rAF en reposo sigue en 0 porque la esfera precargada está en pausa.

**QA v7 (exportación servida en local, con la Elsa de 6b908fb):** vivo.mjs 0 rojos en home, Hablamos y las fichas de Casa Albar y Elsa Moreno (iPhone 13, SE, Android 360, desktop) · medir.mjs 0 rojos (5 avisos de siempre: bloques del About y cabecera de la ficha en móvil). Rendimiento home escritorio: 1,16 MB / 43 peticiones (v6 0,85 / 30: la diferencia es la precarga de la esfera, three.js 222 KB de jsDelivr + su página), LCP 156 ms, **rAF en reposo 0 y 0,3 ms/s de trabajo en la intro** (la esfera precargada está en pausa), baraja 2,4 ms de JS por frame; móvil 1,21 MB / 37 (sin precarga: en móvil la esfera ya cargaba en reposo). Comprobado con Playwright: pisos sin moverse (0 px) y con los colores de arriba; el punto sin sombra ni borde en día y noche; con la esfera abierta, el punto a la vista fuera de la bola y sobre la flecha, y dentro el cursor de la esfera; HUD del cuarzo de día en tinta (rgb 20,20,21), el prisma de noche igual que antes; una sola línea en accesos, «Ver proyecto» y botones; el volver de la ficha, sin ninguna.

## 2026-11-19 — v7 · fichas de proyecto como un caso (feedback 128-131, 135-136 y 144, ATELIER conv. 1330, agente Fichas v2)

El layout de la v6 se queda (feedback 127: «esto tiene otra pinta ya»); cambia lo que hay dentro.

- **144 · Elsa Moreno publicada** con su nombre (antes carta neutra «Próximamente»): carta normal en el puesto 3, con vídeo, sector «Poesía · web de autora», enlace `https://elsa-moreno.alexdasi.com` y ficha completa. Vídeos de `clientes/alexdasi/seleccion/media/` de ATELIER con sus variantes (hd, 840, pósters webp). Datos de `sites/elsa-moreno/resumen.md`, `briefs/elsa-moreno.brief.md` y `proyectos.json`. La baraja pasa a 12 cartas con ficha.
- **129 · Fuera la tarjeta redondeada:** las pantallas de escritorio van en una ventana de navegador de esquinas rectas (radio 3 px, la mitad que las cartas de la home), con barra de tres puntos y el dominio. El móvil va en un teléfono (cuerpo oscuro, botones en el canto): es un aparato, no una tarjeta. Detalles, escenas y la carta siguiente, a 3 px.
- **130 · Se entiende qué es escritorio y qué es móvil:** la portada lleva el vídeo de escritorio en su ventana y un vídeo de móvil NUEVO a pantalla entera (390×844, `<slug>_caso-pm.mp4`) dentro del teléfono; antes era un recorte 4:5 sin marco. Cada momento dice debajo qué es (Escritorio · Móvil · Detalle · Vídeo · En uso).
- **131 y 135 · Momentos como un caso de Behance** (9 por proyecto, 108 en total; antes 4, casi todos de la home): 2 páginas internas de escritorio, 2 de móvil (una con el menú o índice desplegado donde lo hay), 1 zoom de detalle a 2×, 1 vídeo corto de microinteracción (menú que se abre, modo oscuro, cambio de número, selector de turno, desplegable de géneros…), 1 vídeo de pasada por una página interna o un tramo con scroll, y 2 escenas en uso. Grabados el 19/11 de cada web en vivo con `clientes/alexdasi/seleccion/grabar/2026-11-19_grabar-caso.mjs` de ATELIER (plan por proyecto en `guiones/casos/<slug>.json`). Antes de capturar se espera a que carguen las imágenes a la vista; los vídeos de pasada recorren la página una vez antes de grabar (el hueco de «Novedades» del Imperio ya no sale).
- **136 · Mockups libres** (tabla abajo): 3 fotos de portátil y 3 de móvil de Unsplash con la pantalla en blanco o apagada; la captura se mete con transformación de perspectiva sobre la pantalla detectada y conserva la luz de la foto (`2026-11-19_mockup-componer.py` y `2026-11-19_mockup-escenas.py`). Cada ficha lleva una de portátil y una de móvil, rotando, para que dos fichas seguidas no repitan escena.
- **128 · Más copy, solo con datos de ATELIER:** un párrafo de contexto del negocio bajo «Qué hice» y un bloque «Claves» con tres decisiones (qué se decidió y qué tiene la web), sacadas de `sites/<slug>/ATELIER.md`. Nada de cifras de resultado, citas ni premios. Pies de foto reales en cada momento. Todo en ES y EN.
- **Datos** (`content/baraja.json`): campos `contexto`, `claves` y `caso` (id, marco `nav | tel | det | escena-p | escena-t`, medio `img | vid`, pie ES/EN, medidas). `proyecto.php` pinta los que existan en disco. Fuera los 88 `_momento-*` de la v6.
- **Móvil = diseño propio:** teléfono de portada centrado, momentos en columna con los dos teléfonos en pareja, sin numeración (el orden cambia).
- **Peso:** todo perezoso (los vídeos de momentos solo piden el mp4 al entrar en pantalla). Primera carga con caché vacía, 6 s: escritorio 1,5-2,9 MB (la más pesada, Mas Vesprada: su vídeo de portada se recodificó de 2,9 a 1,5 MB), móvil 0,9-1,7 MB. Ninguna pasa de 3 MB. Medios nuevos: 29 MB entre las 12 fichas.

### Mockups (Unsplash License: uso libre, también comercial, sin atribución obligatoria; ninguna es Unsplash+)
| Archivo de trabajo | Foto | Autor | Uso |
|---|---|---|---|
| portatil-escritorio-madera | https://unsplash.com/photos/OOHsoUNRxt8 | Sincerely Media | escena de portátil |
| portatil-plantas | https://unsplash.com/photos/3NgBIwltqVA | Alisa Bright | escena de portátil |
| portatil-blanco | https://unsplash.com/photos/AsZoi-Ar2CI | 2H Media | escena de portátil |
| movil-escalera | https://unsplash.com/photos/aBnYmYVTXgM | Jakub Żerdzicki | escena de móvil |
| movil-jardin | https://unsplash.com/photos/jSQCLQA99Og | Jakub Żerdzicki | escena de móvil |
| movil-chimenea | https://unsplash.com/photos/DxBUFxwUWJ8 | Jakub Żerdzicki | escena de móvil |

Descargadas por el conector de Unsplash (queda registrada la descarga). Descartadas: las dos de Nextiva (el autor pide enlace de crédito) y una de móvil sobre pared blanca (el pulgar pisa la pantalla y la captura quedaba mal encajada). Qué escena lleva cada ficha: campo `mockup` de `caso` en `baraja.json`.

**QA (servido en local con `php -S`):** vivo.mjs 0 rojos en Casa Albar, El Imperio y Elsa Moreno (iPhone 13, SE, Android 360, desktop) · medir.mjs 0 rojos (iPhone 13, SE, iPad, desktop; aviso: en móvil la cabecera con el teléfono de portada ocupa 1,5-1,9 pantallas) · nitidez 0 rojos (naranja de siempre: el vídeo HD de portada a 1440).

**Preguntas de datos para Alex (lo que falta se ha dejado fuera, no inventado):**
1. Elsa Moreno: su ficha de ATELIER decía «permiso: pedir el 30/11». Se publica por tu decisión (feedback 144). ¿El enlace se queda en `elsa-moreno.alexdasi.com` o pasa a su dominio? El zoom de detalle enseña su línea de bio «València, 1999» (está en su web): ¿lo dejo?
2. El Imperio: ¿hay permiso de Mauro para enseñarla? Las capturas llevan la franja «web nueva en revisión» de la demo.
3. Berto Sánchez Studio: ¿se puede enseñar ya y nombrar MUT Design en el texto? (lo dice su propia bio)
4. Mas Vesprada: sigue sin subdominio público (las capturas salen del taller). ¿Creo `mas-vesprada.alexdasi.com` para que la ficha tenga botón?
5. ¿Quieres duración de cada proyecto y herramientas (Astro, GSAP, three.js…) en la ficha técnica? No hay horas apuntadas por proyecto en lo que he leído.
6. ¿Hay alguna frase de cliente (Berto, Mauro, Elsa) o resultado medido que se pueda citar? No hay ninguno escrito, así que no sale nada.
7. Créditos de fotografía en las fichas de cliente (p. ej. Ismael Nasrollah en Facetas 02): ¿se nombran?

## 2026-11-19 — v7 · casos UX/UI en la plantilla nueva (feedback 150, ATELIER conv. 1330, agente Fichas v2)

- **`caso.php?c=<slug>`**: Tulong, Idrica, ATELIER, Clustag y Knowadays pasan a la ficha nueva, adaptada a caso de producto: titular + subtítulo + datos (los tres de la página antigua) → portada → 01 El reto / 02 Mi papel → 03 El proyecto → 04 Decisiones y pantallas (imágenes, citas y textos en su orden original; 4 o más fotos seguidas = galería; los conceptos de ATELIER en fila) → 05 El resultado → siguiente caso. Mismos estilos que las fichas (`css/ficha.css`, bloque «caso»), día/noche y acento.
- **Contenido: ni una frase nueva.** `tools/extrae_casos.py` lee cada página antigua ya renderizada en EN y en ES (`php-pages/projects/<slug>.php` + `lang/es/projects/<slug>.json`) y lo deja en `content/casos.json`. Si se cambia el texto de un caso, se cambia en la fuente y se vuelve a extraer.
- **Medios** en `content/casos/`: cada imagen a 1800 y 900 px en webp (9,4 MB entre los cinco casos; antes había JPG de hasta 1,7 MB) y el GIF de Clustag de 11,8 MB pasa a MP4 de 0,6 MB. Todo perezoso menos la portada.
- **Enlaces:** la lista de UX/UI de «Sobre mí» (`php-pages/sobre-mi.php`) apunta a `caso.php?c=…`. Las páginas antiguas siguen en su sitio (no se borran; el resto de `php-pages/projects/*` no se ha tocado). `tools/export_preview.py` exporta también `caso-<slug>.html`.
- **QA (local):** vivo.mjs 0 rojos en Tulong y Knowadays (iPhone 13, SE, Android 360, desktop) · peso de primera carga 0,7-0,9 MB · nitidez 0 rojos · **medir.mjs marca en rojo el bloque «Decisiones y pantallas» en móvil** (3,3 pantallas en Knowadays, 6,6-6,8 en Tulong, sin «ver todo»): es la secuencia de pantallas del caso; la galería de fotos de campo ya va en carril. Queda a decisión de Alex si se pliega.


---

## 2026-11-19 — v8 · arreglos (feedback 147-149, 151-159, ATELIER conv. 1330, agente Web v8)

- **149 · La primera apertura «rarísima» a pantalla completa:** causa encontrada con Playwright (fotograma a fotograma). El sello de tiempo del primer `requestAnimationFrame` de la esfera era ANTERIOR a `last` (fijado con `performance.now()` al acabar de cargar el módulo, una tarea larga): **dt negativo** → las 8 pieles «aparecían» a la vez (aparece 1,8) y el brillo se disparaba (bloom ×31): una mancha borrosa que llenaba la pantalla y lo atascaba todo hasta que la cuenta se recuperaba. Ahora `dt` nunca es < 0. Además el marco embebido es transparente desde el primer pintado (antes, negro hasta que bajaba three.js). La apertura es siempre la misma: el punto crece a bola plana detrás del texto y la esfera la sustituye con un fundido cuando está lista. Comprobado con screencast: 0 fotogramas oscuros (antes, 6).
- **148 · Luz de la esfera:** el «ojo» era el disco de contraluz azul del entorno reflejado (y girado de tono hacia verde/turquesa con acentos cálidos); el halo, el brillo (bloom) que salía de la silueta y sumaba luz sobre el papel. Embebida: entorno de estudio (discos más grandes y difusos, contraluz casi neutro), los reflejos de otro tono se desaturan, y de día el brillo no sale de la silueta ni deja filo claro (color ≤ alfa). Hojas de las 7 pieles día/noche antes/después con el acento naranja (el peor caso).
- **156 · El clic en la esfera a veces fallaba:** causa: el marco solo recogía el ratón tras un MOVIMIENTO dentro de la bola ya lista; al abrirla el ratón ya está dentro (el punto queda en el disco) y el primer clic sin mover caía en la página. Ahora se mira la última posición en cuanto la bola está lista. Comprobado: clic sin mover, tras un salto, arrastre, salir/entrar, tras espacio y tras día/noche: los 7 llegan a la esfera (antes, el primero se perdía). Zona de clic del punto: 19 → 46 px (`::before`). Ninguna capa tapa el punto (saludo, fusión, marco: `elementFromPoint` = el botón).
- **158 · Punto sobre la flecha con la esfera abierta:** fuera la excepción de la v7 (punto en tinta): se absorbe como en la web original. Fuera de la flecha sigue a la vista.
- **147 · Variante de día de cada acento** (`--cursor-color-dia` → `--accent-color` en día; fluido, esfera y bola plana también): tabla abajo.
- **154 · Menú:** la página activa, subrayada en el acento (2 px; de día, la variante oscura).
- **155 · Día/noche en fundido de ~500 ms:** variables de color registradas con `@property` (se interpolan en toda la web), fondo/opacidad/color del fluido interpolados fotograma a fotograma (`js/tema.js`), la esfera ya suavizaba su luz. Medido: fondo y titular pasan de papel a negro en ~500 ms, a la vez.
- **153 · «Hablamos»:** piel nueva al azar en cada carga (4 recargas: cuarzo, glaseado, solare, prisma, cuarzo); solo si vienes de la home sin recargar sale la última vista allí (sessionStorage `alexdasi-piel-home`). Comprobado.
- **152 · Orden de la baraja:** clientes reales por calidad (Berto Sánchez · El Imperio 7/10 · Elsa Moreno · Berto Sánchez Studio, la variante más derivada) y luego conceptos por nota (autopsia conv. 452 y criba del 18/11): Casa Albar 8 · Cocció 7,5 · Solvera 7,5 · Mas Vesprada 7 · Brot 7 · Vapor 6,5 · REISSUE · Nómada. Propuesta de quitar **REISSUE y Nómada** (T1, sin pieza propia; ya fuera en la criba) con el flag `quitar_propuesta`: `?baraja=corta` las oculta para comparar; para quitarlas, `oculta: true`. Tercera candidata: Vapor (6,5).
- **157 · Niebla de Solare:** los torbellinos venían de la proyección de presión (50 iteraciones: cada pasada = pareja de remolinos), una velocidad que tardaba ~3 s en apagarse y el gas desplazado ×2,6. Embebida: `?niebla=b` (por defecto) arrastre sin proyección de presión, disipación 2,4, ×1,4, toque más ancho y suave; `?niebla=a` estela con algo de remolino (presión 12, disipación 2,6, ×1,5). Vuelve a su movimiento en 1-2 s. La demo del laboratorio no cambia.
- **151 · Rendimiento:** (1) el dt negativo (149) también era el peor atasco: primeros fotogramas de 1,4-2,3 s con las 8 pieles y el brillo ×30; (2) la esfera se monta en trozos (cede el hilo entre entornos, cada piel y el postproceso: el módulo era una tarea de ~470 ms en el hilo de la página, el marco es del mismo origen) y compila los shaders de su piel con `compileAsync` antes del primer fotograma; (3) con la esfera abierta el fluido NO se congela pero trabaja a media resolución (simulación 64, tinte 256, presión ≤ 20) y vuelve al cerrar. Vídeos fuera de vista: ya no se decodifican (en la intro, 1 vídeo con datos y en pausa; en la baraja, 2).
- **159 · Menú del móvil (≤ 768 px) + QA H-06:** barra fija con fondo del modo (95 % + desenfoque: nada pasa por debajo de los textos) con «alex dasi» y un menú de dos líneas (SVG propio); panel a pantalla completa con UX/UI · Sobre mí · Contacto en grande (activo subrayado en el acento), ES/EN, día/noche, WhatsApp y email; entrada escalonada, bloquea el fondo, se cierra con la X, un enlace o Esc; foco atrapado dentro. En las fichas se aparta al bajar como la de escritorio. Probado a 390, 320, 300, 260 y 768 px en día y noche: sin solapes, todos los toques ≥ 44 px, nada fuera de pantalla, 0 errores.

### Acento de día (feedback 147)
| Acento | Noche | Sobre papel antes | Día | Sobre papel | Tinta encima |
|---|---|---|---|---|---|
| lima | #ECF98E | 1,02 | #7A9B18 | 2,90 | 5,72 |
| coral | #FFA88C | 1,68 | #F0623A | 2,90 | 5,71 |
| cielo | #96C8FF | 1,58 | #1C8FF5 | 3,00 | 5,52 |
| lila | #C8AAFF | 1,78 | #A770F6 | 3,01 | 5,52 |
| menta | #8CE6B9 | 1,34 | #349E71 | 3,01 | 5,50 |
| albaricoque | #FFD46E | 1,27 | #C0880F | 2,79 | 5,94 |
| magenta | #FF4FD8 | 2,57 | #EE2ACB | 3,24 | 5,11 |
| verde ácido | #8CFF3C | 1,15 | #45A116 | 2,97 | 5,58 |
| naranja eléctrico | #FF7A1A | 2,35 | #EA650C | 2,97 | 5,58 |

### Rendimiento v7 → v8 (php -S local sin gzip; WebGL por software: los absolutos de render no valen, las comparaciones sí)
| | v7 | v8 |
|---|---|---|
| Esfera: tarea más larga al montarse (solare · chicle · prisma) | 533 · 400 · 387 ms | 65 · 80 · 115 ms |
| Esfera: primeros fotogramas (chicle) | 2.304 · 1.379 · 1.064 ms (8 pieles + brillo ×30) | 547 · 332 · 427 ms |
| Esfera: lista desde que se crea (chicle · prisma) | 7.448 · 6.768 ms | 2.305 · 1.862 ms |
| Home, tarea más larga por fase: carga · fluido · ir a la baraja · baraja · abrir esfera · esfera abierta | 470 · 2.384 · 113 · 157 · 424 · 1.694 ms | 195 · 121 · 109 · 131 · 349 · 1.121 ms |
| Home, tiempo bloqueado (TBT) en «fluido» · «esfera abierta» | 4.025 · 42.277 ms | 1.680 · 38.491 ms |
| Escritorio: peso · peticiones · LCP | 1,34 MB · 46 · 564 ms | 1,36 MB · 48 · 388 ms |
| Escritorio: rAF en reposo intro · baraja | 0 · 0 | 0 · 0 |
| Escritorio: JS por frame moviendo la baraja | 1,18 ms | 1,17 ms |
| Móvil: peso · peticiones · LCP | 1,38 MB · 40 · 220 ms | 1,40 MB · 41 · 392 ms |

**QA v8 (php -S local):** `vivo.mjs` 0 rojos en home, Hablamos y la ficha de Casa Albar · `medir.mjs` (iPhone 13, SE, iPad, desktop) 0 rojos, 1 aviso de siempre (bloque «De dónde vengo» del About en SE) · menú del móvil a 390/320/300/260/768 · clics de la esfera (7 casos) · Hablamos (recargas y desde la home) · punto sobre la flecha con la esfera abierta (absorbido; a la vista fuera).

---

## 2026-11-20 — v9 · QA móvil (informe ATELIER `clientes/alexdasi/qa/2026-11-19_qa-movil-alexdasi.md`, conv. 1330, agente Web v9 · Móvil)

- **H-03/H-04 · Compartir:** og:image nueva (intro de día con la esfera, 1200×630, `images/og-alexdasi-2026-11_es|en.jpg`, sin «12+ years»), una por ficha y por caso (`content/og/`, `tools/og_fichas.py`), description con el claim (fichas: su «problema»; casos: subtítulo + entrada), og:url + canonical + hreflang propios (`?p=`, `?c=`, `?s=`, `&lang=en`) en `https://www.alexdasi.com`. Títulos por idioma (H-19).
- **H-07 · Errata:** «cambiar tus textos»; EN «I’ll reply myself».
- **H-01 · Pista para bajar:** «Proyectos» + la flecha fina de escritorio al pie de la intro (móvil y tablet), siempre en la primera pantalla (la esfera encoge solo en pantallas bajas: `min(100vw, 62svh, 100svh − 380px)`); la primera carta asoma (`#works` sin el 6 vh de la home antigua). Móvil en horizontal: intro en dos columnas (H-14).
- **H-02 · Volver a la carta:** «← Proyectos» = `index.php?carta=<slug>#works`; el atrás del navegador recupera la carta (sessionStorage al abrir una ficha desde la baraja) y la pantalla de la baraja (escritorio: piso 2). Probado en 390 y 1440 (v8: carta 1 e intro).
- **H-05 · Hablamos en móvil/tablet:** la esfera va encima del titular, a la derecha; no pisa texto.
- **160 · Hovers:** todo `:hover` dentro de `(hover: hover) and (pointer: fine)` (30 reglas → 0 sin proteger en home, Sobre mí, ficha y caso); en táctil, `:active` breve en enlaces y botones; filas de «Cómo trabajo» y puntos de la trayectoria quietos.
- **H-08 · Reducir movimiento:** la esfera no gira sola, no flota, gas quieto, sin inercia; quieta deja de pintar. Medido: diferencia entre fotogramas en reposo 10-15 → 0.
- **H-09 · Fichas cortas:** momentos en fila con imán y contador; «Claves» y contexto plegados con «Ver más»; cabecera y teléfono más compactos; casos con «Decisiones y pantallas» plegado. iPhone 13: 6,5-6,9 → 3,5-3,6 pantallas (casos 5,5-7,5 → 4,4); SE: 8,1-8,6 → 4,3-4,5.
- **H-10/H-21 · LCP:** ficha.css en `<head>` (`$headExtra`), póster de portada precargado con prioridad (escritorio en webp 1600, `_scroll-desktop-hd_poster-1600.webp`), fichas sin swiper/baraja/esfera (`$sinSwiper`), pósters de momentos perezosos; casos con portada de 1200 en `<picture>` precargada. 4G + CPU ×4 con gzip: fichas móvil 2,4-2,5 → 1,1 s, escritorio 4,1-4,5 → 2,1-2,3 s; casos móvil 3,1-3,5 → 1,8-2,1 s.
- **H-11 · 404 propia** (`404.php`, ES/EN, noindex) por `ErrorDocument` y para `?p=`/`?c=` inexistentes o vacíos (antes 200 con Berto).
- **H-18:** `alexdasi.com` → `www` (301 en `.htaccess`), `robots.txt`, `sitemap.xml` (38 URL con hreflang), `favicon.ico` + iconos 180/192/512 (punto lima sobre negro).
- **H-12 · Baraja en táctil ≤ 1280** (iPad y móvil en horizontal): fila con imán y un gesto = una carta (v8: hasta 3 en iPad horizontal y 4 en móvil horizontal con un mismo gesto).
- **⚪:** H-13 (`.com` ya no se queda solo), H-19 (iframe «Esfera»/«Sphere»), H-20 (WhatsApp con frase, también en el menú), H-22 (con «Ahorro de datos» solo pósters).
- **Sin hacer:** H-15 (scroll del documento en iOS: toca el layout base de todas las páginas y no se puede medir aquí; mejor con el iPhone de Alex delante), H-16 (sin JavaScript), H-17 (three.js alojado en casa: 12 módulos, pide su propia prueba), H-23 (medir en dispositivo real).

**QA (php -S + proxy gzip local):** `vivo.mjs` 0 rojos en home, ficha (Imperio, Elsa EN), casos (Tulong, ATELIER) y Sobre mí en iPhone 13, SE, Android 360 y desktop 1440 (la 404 marca su propio 404 de consola: es la página) · `medir.mjs` 0 rojos (1 aviso de siempre: «De dónde vengo» en SE) · menú móvil (script propio: `menu-movil.mjs` es el de Imperio, busca `header.hd`) en 390/375/320/escritorio estrechado × 4 páginas: abre, toques ≥ 44 px, nada fuera, fondo quieto, cierra · hover de escritorio comprobado · rendimiento home (`medir_rendimiento.mjs`, sin gzip, v8 → v9): escritorio 1,36 → 1,37 MB, LCP 176 → 148 ms, rAF en reposo 0, JS por frame en la baraja 2,03 → 1,08 ms; móvil 1,40 → 1,27 MB, LCP 368 → 140 ms.

---

## 2026-11-21 — v10 · móvil (feedback de Alex por audio, ATELIER conv. 398)

- **Esfera más rápida (móvil):** three.js r160 alojado en casa en un solo archivo con solo lo que usa la esfera (`esfera/three-r160-esfera.min.js`, esbuild, 518 KB → 125 KB gzip; antes ~12 módulos encadenados desde jsDelivr) — resuelve también H-17. Precargado desde la cabecera en táctil. El marco se crea al tener el DOM (antes esperaba al `load` de la página, que esperaba a los pósters de la baraja, y al reposo). Preloader: disco plano del acento latiendo en el sitio de la bola hasta el primer fotograma (mensaje `lista`), luego fundido.
- **Botón «Proyectos»:** la flecha dentro del círculo del acento (60 px) con un aro que sale y se apaga; la flecha sigue latiendo. La intro ocupa justo una pantalla (la baraja ya no asoma).
- **Imán (solo táctil, `body.home-pisos`):** scroll-snap obligatorio: intro · proyectos · pie. Con ratón/trackpad no (frenaría la rueda).
- **Proyectos en un pantallazo:** título «Proyectos.» con el punto del acento + «Desliza →»; la carta (4:5 de siempre) toma el alto que sobra; ficha compacta de alto fijo (texto a 3 líneas; 2 en pantallas ≤ 700 px; sin texto ≤ 600 px) y la regla de marcas siempre a la vista.
- **Pie de contacto** (`php-elements/pie-contacto.php`, móvil y tablet): en la home, Hablamos + WhatsApp + email + «© 2026 Alex Dasi · Todos los derechos reservados»; en Sobre mí solo la línea final.
- **Hablamos (móvil):** bola más pequeña; WhatsApp y email dentro de la primera pantalla también en SE.
- **Casos UX/UI en táctil:** fuera el tinte del acento al tocar (se encendía al hacer scroll por encima); solo un leve apagado con retardo.
- **CV:** nombre en una línea con Inter (no Anton), «6 años en Edimburgo»; PDFs ES/EN regenerados (fuente en ATELIER `clientes/alexdasi/bio/`). El de la web sale en su idioma y al lado, discreto, el otro. Sobre mí: «Seis años».

**QA (php -S local):** `vivo.mjs` 0 rojos en home ES/EN y Sobre mí (iPhone 13, SE, Android 360, desktop) · `medir.mjs` 0 rojos nuevos (UX/UI en SE = 2,4 pantallas, igual que antes; ahora el medidor lo separa como bloque) · capturas iPhone 13, SE, Android, iPad · imán probado · esfera, primer fotograma local con CPU ×4: 4,6-4,8 s → 3,8-4,0 s (sin compresión; en vivo se mide tras publicar).

**Publicado (21/11 12:45, «publica» de Alex, ATELIER conv. 1385):** `main` 506b647, en vivo. Esfera en vivo (iPhone 13 emulado, 4G 9 Mb/s + 150 ms, CPU ×4, sin caché), primer fotograma: antes 4,6-6,3 s → ahora 3,5-5,0 s (mediana ~3,5); three.js baja con brotli en 118 KB. El disco del acento late desde el primer pintado. Respaldo de lo anterior: commit 7ef6f79.

---

## 2026-11-21 — v11 · contacto, UX/UI aparte, mazo (feedback 161-172, ATELIER conv. 1386) — rama `v11-contacto-uxui`, SIN publicar

- **Contacto = pie único** (`php-elements/pie-contacto.php`, `#contacto`): el mismo en la home, Sobre mí y UX/UI. «Contacto» del menú baja al pie de la página en la que estés (`js/menu-movil.js`; en tablet también los accesos de arriba). En móvil, Sobre mí ya no tiene pantalla «Hablamos» (es el pie). Escritorio: Sobre mí mantiene su pantalla Hablamos.
- **Menú del móvil:** Inicio · UX/UI · Sobre mí · Contacto.
- **UX/UI en página propia** (`uxui.php`, scroll normal): titular, texto, CV ES/EN, los 5 casos con su portada (Tulong, Idrica y ATELIER a lo ancho alternando; Clustag y Knowadays en pareja), número en el acento, «Ver el caso», pie. `about.php?s=uxui` → 301 a `uxui.php`.
- **Acento fijo en la visita** (sessionStorage `alexdasi-acento`; el espacio lo cambia y se queda).
- **Mazo en móvil** (`js/baraja.js`, `data-mazo`): delante la carta entera, dos detrás asomando arriba a la derecha y giradas; al pasar, la de delante sale volando a la izquierda. `?baraja=fila` = la fila de antes.
- **Más acento en proyectos:** número, filete, «Ver proyecto» como botón del acento, marca activa de la regla, borde y sombra de la carta.
- **Esfera móvil con más inercia** (sensibilidad 3,2 → 4,6, frenado 2,2 → 1,1, el giro sigue al soltar aunque el dedo se pare hasta 160 ms).
- **Fuera «Valencia» del copy de venta** (Hablamos, pie, CV «webs para clientes»). Lo biográfico (estudios, DANA) se queda.
- **ATELIER:** portada nueva (abanico de 5 webs: Cocció, Casa Albar, Elsa Moreno, El Imperio, Berto Sánchez) en `content/casos/atelier_portada-*.webp` + og; enlace «Cómo funciona ATELIER» → `caso.php?c=atelier`; `.htaccess` manda las fichas antiguas (tulong, idrica, atelier, clustag, knowadays, casa-albar, elsa) a las nuevas (301).
- **Cursor que desaparecía:** al volver atrás se quedaba la mancha de fusión activa y el punto apagado; ahora se limpia en `pagehide`/`pageshow`.
- **Fluido:** se va antes (noche 0,35 → 1,2; día 1,1 → 1,8). Panel FX temporal con `?fx` (tecla B) para que Alex lo ajuste y mande captura.

**QA:** `vivo.mjs` 0 rojos en home, Sobre mí y UX/UI ES/EN (iPhone 13, SE, Android, desktop); menú y salto a #contacto probados; `vivo.mjs` arreglado (falsos «estiradas» con srcset).
**Pendiente:** contenido del caso ATELIER con clientes y webs nuevas (más allá de la portada); calidad y variantes de la esfera (traspaso).

**Publicado (21/11 13:27, «publica» de Alex, ATELIER conv. 1387):** `main` 3bbc976 en vivo. Comprobado: home, uxui.php, about.php y caso ATELIER 200; fichas antiguas y `about.php?s=uxui` con 301 a las nuevas; pie #contacto y mazo en vivo. Respaldo de lo anterior: f7d7164.

---

## 2026-11-21 — v12 · pie grande, preloader y ajustes (feedback 173-180, ATELIER conv. 1388) — rama `v12-preloader`

- **Pie = «Hablamos» de siempre** (grande, alto, con la esfera) en home, Sobre mí y UX/UI (`pie-contacto.php`), + línea © 2026.
- **Preloader** en la primera página de la visita (entrar de fuera o recargar), móvil y escritorio: fondo, «alex dasi» y el punto del acento latiendo; se va cuando la esfera de la home pinta (móvil) o al cargar; tope 3,2 s, mínimo 0,65 s. `?sinprecarga` lo salta (QA).
- **Acento:** cambia en cada visita (entrar de fuera o recargar, nunca el mismo que el anterior) y se mantiene al navegar por dentro.
- **Enlaces unificados:** «Ver proyecto» (home) y «Ver el caso» (UX/UI) sin pastilla: mayúsculas, filete del acento y flecha del acento.
- **UX/UI móvil:** cabecera más compacta, el primer caso entra en la primera pantalla.
- **Esfera:** inercia en el punto medio (sensibilidad 3,9, frenado 1,7); fuera del sorteo el planeta (solare) y la gota.

- **(conv. 1389)** Cursor (punto) en todas las páginas, fichas incluidas (magnet cargaba solo con swiper). UX/UI en escritorio por encima del lienzo del fluido (se veía un segundo y desaparecía). Fuera el cuarzo (forma) del sorteo: quedan chicle, glaseado, prisma y gema. Escenas de móvil en la mano «movil-chimenea» (Imperio, Mas Vesprada, Cocció, Vapor) ocultas (`oculto` en baraja.json): entraban torcidas arriba porque el script encaja la captura con un rectángulo girado (minAreaRect) y no con la perspectiva real.

**Publicado (21/11 13:41, conv. 1391):** `main` fc36525 en vivo (v12 completa). Desde ahora el portfolio se publica sin pedir permiso (Alex: «publica SIEMPRE, no me pidas permiso»).

---

## 2026-11-21 — v13 · mockups, vídeo de Mas Vesprada y caso ATELIER (feedback 182-183 y 186-188, ATELIER conv. 1391)

- **Mockups rehechos (24 escenas, 12 fichas):** encaje nuevo con la perspectiva real: la pantalla se saca rellenando desde una semilla sin cruzar bordes (Canny) y las esquinas son la intersección de 4 rectas ajustadas a los lados (antes: rectángulo girado → arriba torcido). Script: ATELIER `clientes/alexdasi/seleccion/grabar/2026-11-21_mockup-encaje.py` + `2026-11-21_mockup-escenas.py`. **14 fotos** (antes 6), cada ficha con una de portátil y una de móvil distintas a la de al lado; e1 = captura d1, e2 = m1 (las capturas d3/m3 originales no estaban guardadas). Vuelven las 4 e2 que estaban ocultas.
- **Mas Vesprada:** la miniatura (vídeo de la carta) pasaba por los números del plano al cambiar de sección; ahora es la portada con un acercamiento lento (escritorio 6,2 s, móvil 7,8 s).
- **Caso ATELIER rediseñado:** arriba las 7 mejores (Berto Sánchez, El Imperio, Elsa Moreno — clientes — y Casa Albar, Cocció, Solvera, Mas Vesprada) enlazando a sus fichas nuevas; fuera Otra Vez, Pati, Lenta y alè; texto nuevo (referencias antes que diseño, clientes reales, revisión de móvil); mockups nuevos dentro; resultado y stack al día.

### Fotos de mockup (Unsplash, licencia Unsplash)
| id | autor | uso |
|---|---|---|
| sKGpCOu_voE | Jakub Żerdzicki | móvil en la mano |
| DxBUFxwUWJ8 | Jakub Żerdzicki | móvil en la mano (la de antes, ahora bien encajada) |
| OQM6fjcp22c | Kelly Sikkema | móvil en la mano, fondo oscuro |
| _HB3Y1wGlxw | Matteo Vella | móvil sobre rosa |
| ZfQUwQsG1QY | G | móvil de estudio, gris |
| y5_nKn4JRLI | Lucas Cleutjens | móvil sobre bloque, azul |
| 1SAnrIxw5OY · qu8w7x-0gw4 · p0UwQ-Wd8TM · OOHsoUNRxt8 · UXvXdQC1GoM · j4uuKnN43_M · nXGw951o3Hk · 3xQ65cknLPk | Kari Shea · Devin Pickell (2) · Sincerely Media (2) · Alex Knight · Marcin Skalij · Quaritsch Photography | portátiles e iMac |

**QA:** `vivo.mjs` 0 rojos en el caso ATELIER y la ficha de El Imperio (iPhone 13, SE, Android, desktop).

## 2026-11-21 — v14 · la esfera en calidad alta (three.js elegido en el A/B, ATELIER conv. 1390 → 1393)
- **A/B (conv. 1390):** misma escena en three.js (girable) y en Blender/Cycles (vídeo), mismos materiales. Alex: «se ve increíble en three js»; el póster de Blender como primer fotograma, fuera («se nota el cambio»).
- **Esfera nueva:** `esfera/esfera-hq.html` + `esfera/esfera-hq.min.js` (esbuild, 149 KB gzip; fuente `esfera/hq/esfera-hq_embed.js`) + `esfera/hq/` (HDR de estudio 512, GLB por piel, texturas 1024/2048 en webp, `materiales_esfera-hq.json`). Misma API que `esfera-pieles.html` para `js/esfera.js` (embed, acento, día, mano, móvil, frac, pausa, lista/fuera/cerrar/espacio).
- **Pieles en el sorteo:** chicle · glaseado · prisma (con textura de cuarzo turbio y velos lechosos). La gema sale (es la misma idea que el prisma nuevo). `?esfera=v12` vuelve a las pieles de antes.
- **Giro libre (Alex, conv. 1393):** se arrastra en cualquier dirección (trackball), con inercia media, y vuelve a su giro lento sobre el eje vertical. En el móvil, un toque que empieza dentro de la bola es para girarla; fuera, la página hace scroll.
- **Entrada:** la bola nace del disco del acento (escala .9 → 1 en 1,1 s) y el giro arranca desde 0: sin póster ni salto.
- **Chicle (conv. 1390, 7ada1cd traído a main):** en `esfera-pieles.html` agarra en todo el borde visible y no se suelta en el móvil.
- **Pendiente:** los efectos de cursor de cada piel (pellizco del chicle, rascar el glaseado, cara encendida del prisma) en la versión de calidad alta; GLB con meshopt para bajar peso en el móvil.

---

## 2026-11-21 — v15 · pie en todas las páginas, pisos de uno en uno, UX/UI en filas, vídeos con play, piel 3D a mano y paleta pastel (feedback 189-198, ATELIER conv. 1393)

- **Mockups (auditoría a fondo):** fuera port-074 y port-114 (barra de menú del Mac), tel-b03 (torcida), tel-b10 (hueco arriba), tel-002/041/043/046/b17 (bordes y muesca); entran tel-015, tel-021 y tel-044; bisel ajustado en port-111 (0,035) y port-056 (0,04). Commit 3c58127.
- **Pie «Hablamos» en TODAS las páginas** (`php-elements/pie-contacto.php`): home y Sobre mí en escritorio lo tienen como ÚLTIMO PISO (`$pieEnPiso`, sin id); UX/UI, fichas, casos y 404 lo cierran al final. `esfera.js` se carga también donde hay pie.
- **Contacto = el pie de donde estés:** en los pisos salta al último; en las páginas con scroll baja a `#contacto`; `?s=contact` en la home abre en el pie. «Contact» se marca en el último piso.
- **Pisos (escritorio):** la flecha grande baja hasta el último; ahí se da la vuelta y sube DE UNO EN UNO hasta el primero. Flecha pequeña ↑ desde el 2.º piso (mientras la grande baja). Teclas ↓/↑ y AvPág/RePág (en la baraja las flechas siguen siendo de las cartas). `js/swiper/swiperNew.js` (`pintarFlechas`).
- **UX/UI:** fuera el zigzag y los tamaños distintos: cinco filas iguales (texto 5/12 a la izquierda, portada 16:10 a la derecha), filete entre casos; todos con reto y papel.
- **Vídeos de ejemplo (fichas y casos):** ya no arrancan solos: botón grande de play → aro de carga → corre (pausa al pasar el ratón o al tocar); la etiqueta «Vídeo» del pie es otro botón con el mismo estado. Los de la portada siguen solos. `js/ficha.js` (`conMando`) + `scss/ficha.scss`.
- **Piel 3D a mano:** botón abajo a la derecha («PRESS E · Glaseado») o tecla E: pasa a la siguiente piel y recarga las esferas abiertas. En táctil solo sale con una esfera a la vista.
- **Esfera plana / cursor (escritorio) y prisma distinto móvil/escritorio:** resueltos con la v14 (todas las pieles en `esfera-hq.html`, mismo motor en los dos; la esfera dibuja su propio punto). Comprobado en «Hablamos» con el ratón dentro.
- **Paleta (Alex: «me gustan colores pastel»):** fuera verde ácido, magenta y naranja eléctrico; entran rosa empolvado, melocotón y aguamarina. Se quedan lima, coral (el butano rosáceo), cielo, lila, menta y albaricoque.

## 2026-11-21 — v16 · cuatro pieles tech, botones sutiles y Hablamos con la esfera en la esquina (ATELIER conv. 1395)
- **Pieles tech (Alex: «haz el alambre, la maqueta, los rayos X y el anodizado, que quiero verlos»; conv. 1396: «no me gusta ninguno… guárdalos»: fuera del sorteo y de la E, el código se queda)** en `esfera/hq/esfera-hq_tech.js`, mismo estudio y tinte que las de calidad alta, cada una con su gesto: **alambre** (meridianos y paralelos en tubo de metal lima; cerca del cursor se doblan como un imán y se encienden) · **maqueta** (maqueta mate con retícula y ecuador; un anillo de escáner sigue al ratón y barre solo) · **rayos X** (borde que brilla + núcleo de 42.000 puntos; el cursor es una lente que deja ver el núcleo denso) · **anodizado** (metal lima satinado con iridiscencia; linterna en el cursor y huella que se borra). Entran en el sorteo y en el botón/tecla E.
- **Botones (Alex):** «PRESS SPACE» y el de la piel 3D, sin pastilla de color y **sin rebote**: texto pequeño a media luz abajo a la derecha (uno encima del otro); al pasar el ratón solo sube la luz.
- **Color al cambiar de piel (Alex: salía menta/azulito hasta pasar el ratón):** la esfera recargada llevaba el acento de cuando se creó el marco; ahora lleva el acento y el tema de ese momento (`js/esfera.js`).
- **Hablamos (Alex: «me gustaba más con la esfera arriba a la derecha, en la esquina»):** en escritorio, el pie de los pisos (home y Sobre mí) con la esfera grande en la esquina (right −4vw, top 8vh, 34vw), como UX/UI y fichas.

---

## 2026-11-21 — v17 · HUD, flechas de slider, esfera de Hablamos en la esquina y arreglos (ATELIER conv. 1398)

- **PRESS SPACE** abajo a la izquierda y **PRESS E · <piel>** abajo a la derecha, gemelos (11 px, mismo peso, color y luz). PRESS SPACE vuelve a UX/UI.
- **Flechas de pisos = slider:** la de bajar abajo (se va en el último piso); la de subir arriba, debajo de «alex dasi», desde el 2.º (la misma flecha girada). Fuera el giro de la v15 y la flecha pequeña.
- **Esfera de Hablamos** (pie de todas las páginas, escritorio): grande en la esquina de arriba a la derecha (40vw, cortada), sin tocar los pisos. Composiciones para comparar: `?bola=abajo` y `?bola=centro`.
- **HUD sensible al fondo:** lo que cae encima de una esfera pasa a tinta oscura (js/esfera.js, final).
- **Fluido sobre la esfera:** el marco pasa el ratón a la página (esfera-hq.html → mensaje `puntero`) y el fondo sigue moviéndose.
- **Esfera de la home:** al bajar ya no se cierra, se pausa; al subir sigue ahí hasta que la escondes. **Sobre mí:** la de Hablamos se precarga en reposo y en pausa.
- **Día/noche automático** por la hora (8-20 h día); el cambio a mano dura la visita.
- **Pie:** solo «© Alex Dasi». **Enlaces «Ver el caso»:** el subrayado se redibuja al pasar el ratón. **Descargar CV:** el resaltado cubre la palabra y el texto pasa a oscuro.

---

## 2026-11-21 — v18 · ajustes y propuestas (ATELIER conv. 1399)

- **Glaseado pesado en grande:** la esfera de Hablamos (escritorio) va a densidad 1,25 y el glaseado con la transmisión a media resolución (`esfera-hq`: `?dpr`, `?ligero`; min.js reconstruido con esbuild desde `esfera/hq/esfera-hq_embed.js`, three 0.160).
- **`?bola=centro`** = centrada en VERTICAL, pegada a la derecha.
- **Lima más a menudo:** 1 de cada 3 visitas (si no tocaba ya).
- **Flechas:** bola de 68 px (antes 100) y flecha al 70 %; fuera magnet-mouse en ellas, imán propio de 6 px como mucho.
- **«ALEX DASI» y UX/UI · Sobre mí · Contacto** con el mismo tratamiento (13 px, mayúsculas, .1em, color pleno).
- **Proyectos (home, escritorio):** más acento: punto del acento tras el nombre, número y regla del acento, halo suave detrás de la carta.
- **Tecla E:** la esfera se funde, late el disco del acento mientras carga y la nueva entra fundiéndose al pintar. **Color (espacio):** transición de 0,8 s (`@property --cursor-color`).
- **Hablamos:** no encoge al salir del piso. **Pie:** fuera la línea «© Alex Dasi».
- **Propuestas para mirar:** Hablamos `?hablamos=plana|velada|lejos` (+ `?bola=abajo|centro`); UX/UI en pisos `uxui.php?vista=pisos`.

---

## 2026-11-21 — v19 · HUD unificado, acentos brillantes, UX/UI en slider horizontal (ATELIER conv. 1402)

- **HUD:** idioma, ALEX DASI, menú, PRESS SPACE y PRESS E a 12 px, .12em, mayúsculas, color pleno, centrados a la misma altura; ALEX DASI en semibold con fondo del acento. Subrayado único (1 px) idéntico en hover y active.
- **Teclas:** E y espacio funcionan con el foco dentro de la esfera (el marco avisa `tecla-e` / `espacio`); el espacio ya no se pierde tras pulsar un enlace o botón.
- **Color:** transición de 0,3 s en la página y en la esfera (el acento de la esfera se interpola fotograma a fotograma).
- **Piel (E):** un marco invisible precarga la piel nueva mientras la vieja sigue; luego la esfera se encoge un poco, cambia y vuelve a crecer (sin desaparecer).
- **Imán de las flechas:** intermedio (radio 110 px, hasta 14 px). **Hablamos:** la esfera ya no sigue al ratón; se gira arrastrando.
- **Paleta:** siete acentos de la misma luz (lima, menta, cielo, lila, rosa, coral, albaricoque); la variante de día es la misma familia un punto más llena (ya no oscura). Texto pequeño en acento, de día, mezclado con tinta para que se lea.
- **CTAs:** «Descargar CV» con barrido del acento de izquierda a derecha; «Ver el caso» con barrido del acento.
- **UX/UI (escritorio):** tres pisos — portada con índice (hover con fondo del acento) · los cinco casos en un slider horizontal (arrastre, rueda horizontal, ← →, flechas y progreso; tarjetas rectas, al pasar el ratón borde y sombra del acento) · Hablamos. `?vista=lista` enseña la lista anterior.

---

## 2026-11-21 — v20 · arreglos antes del design system (ATELIER conv. 1405)

- Menú, PULSA ESPACIO y PULSA E en el idioma de la página (antes «About/Contact» en inglés en UX/UI y fichas).
- Menú e idioma: hover = active (2 px del acento, misma altura). ALEX DASI: subrayado grueso del acento a la altura del texto (sin caja) + punto del acento.
- Paleta: el lima es SAGRADO (#ECF98E, de día y de noche); menta de hace dos versiones; coral más anaranjado; siete en total, entre pastel y flúor.
- Proyectos (home): fuera la línea del acento encima; el acento pasa a las etiquetas bajo el nombre.
- CTAs de texto unificados (Ver proyecto, Visitar web, Ver el caso, Descargar CV, In English, Cómo funciona ATELIER): mayúsculas 12 px, filete fino pegado al texto que se rellena del acento de izquierda a derecha; zona táctil de 44 px con un pseudo-elemento.
- Hablamos: la esfera junto a la palabra, montándose en la S; composición `?bola=abajo-centro` (un trozo grande asomando por abajo).
- Home: la esfera ya no se cierra al picar fuera. Cursor: el punto de la página no se esconde hasta que la esfera pinta el suyo.
- `esfera-hq.min.js?v=20`: el navegador usaba la copia vieja (por eso la E no llegaba desde dentro de la esfera).

---

## 2026-11-21 — v22 · acento de verdad, menú, Hablamos y baraja (ATELIER conv. 1408)

- **Bug del acento:** `--acento-texto` se declaraba en `:root`, donde `--accent-color` aún vale el lima inicial → números, puntos y etiquetas salían siempre en lima. Ahora en `body`.
- **Paleta = design system:** seis acentos; el lila pasa al azul de Alex (#6483FD / #496EFF día); fuera el albaricoque.
- **Menú:** fuera la fusión del cursor sobre el menú y el logo (hacía el hover más gordo/opaco y una caja en ALEX DASI de noche); hover = active al píxel. ALEX DASI igual en día y noche y sin subrayado extra.
- **Baraja:** fuera el halo fijo; la rueda no pasaba cartas al volver de una ficha (`?carta`): ahora se mira el piso al arrancar.
- **Hablamos:** la esfera separada de la palabra, más pequeña, flotando entre el punto y los pisos. `?bola=abajo-centro` más ancha (76vw) asomando lo mismo y a densidad 1 para no pesar.
- **UX/UI:** un solo destacado en las tarjetas (halo del acento), sin borde ni filete del acento.

---

## 2026-11-21 — v23 · HUD en minúsculas y repaso móvil (ATELIER conv. 1409)

- **HUD en minúsculas (prueba de Alex):** idioma, alex dasi, menú, pulsa espacio, pulsa e · material — 13 px, .02em. alex dasi en semibold con el subrayado del acento en un `span` (cubre la palabra entera; el punto queda fuera).
- **Móvil (medir.mjs en iPhone 13, SE, iPad):** CTAs de texto con zona táctil real de 44 px y el filete pegado al texto; «Vídeo» del pie a 44 px; UX/UI en móvil sin el párrafo del reto (6,9 → ~5 pantallas en el SE). Queda: casos de UX/UI 4,7 pantallas y «Momentos» de las fichas 2,6 (galerías, se acepta).
## 2026-11-21 — v19 · Solare lima en calidad alta, al sorteo (ATELIER conv. 1402)
- Alex: de los cinco materiales nuevos «Solare lima sí me gusta… en alta calidad y mételo en el sorteo». Globo, satén, pompa y terciopelo no convencen: se quedan en `esfera/hq/esfera-hq_materiales.js` fuera del sorteo.
- **Solare lima** (`?piel=solare`): gas lima y ámbar que se enrosca y da luz dentro (raymarch, 72 pasos en escritorio / 36 en táctil) bajo una carcasa de cristal esmerilado con barniz (MeshPhysical con transmisión rugosa) que lo difumina y coge los reflejos del estudio. Cursor: el gas se arremolina donde pasas y la luz se aviva, con inercia (se apaga despacio).
- Sorteo: chicle · glaseado · prisma · solare (y la E pasa por las cuatro).

## v20 · Solare lima mate y ligera (ATELIER conv. 1406)
- **Alex:** «le has puesto los reflejos de la burbuja; tiene que ser mucho más mate, como en el ejemplo; y pesa un quintal».
- **Carcasa:** fuera el MeshPhysical con transmisión y barniz; vuelve la carcasa lechosa y mate de la v1, pintada en el mismo shader que el gas (un solo shader, una sola pasada).
- **Peso:** 36 pasos de gas en escritorio / 20 en móvil (antes 72/36), ruido 4+2 octavas (antes 4+4), sin el segundo render de la transmisión, sin fondo de refracción y a densidad 1,25 (móvil 1). Medido en el mismo equipo: 12,9 s → 1,1 s por fotograma en software (≈ 11 veces menos trabajo).
- **Se queda:** el remolino del cursor con inercia.
- Embed: las pieles de un solo shader pueden pedir `dpr` y `sinFondo`.
