# Investigación: grillas históricas de programación en Latinoamérica

Documento de investigación para la futura sección de **Programación** y **Timeline** de WikiToon. Reúne las grillas encontradas, cómo se verificaron, qué períodos se pueden reconstruir y una propuesta para convertirlas en datos.

> **Actualización (2026-09-26): primer dataset cargado.** Un subconjunto de estas grillas ya está en la base (`prisma/data/programming`, ver "Programming data" en `CLAUDE.md`). Las tablas de este documento son la foto de la investigación. Para cada franja, la fuente de verdad son los datos cargados y [programming-review.md](programming-review.md). Cambios respecto de este documento:
>
> - **Certeza más estricta.** Al cargar, una franja es `VERIFIED` solo en el día de la semana que confirma una fuente primaria, dentro del mismo mes o el siguiente. Las secciones que aquí figuran como `verified` para lunes a viernes quedan `PROBABLE` en los días no contrastados.
> - **Cartoon Network, noviembre 2002, pasa a `PROBABLE`.** La captura oficial que cita la wiki es de febrero 2003 y no verifica ese mes.
> - **Cartoon Network, octubre 2000: aclaración sobre las fechas.** La fecha "2/10/2000" de la página oficial rotula la grilla de **México**. La grilla general no tiene fecha de vigencia y es la captura del 18/10/2000. El conflicto de lunes a viernes de 15:00 a 17:00 se conserva como dos grillas separadas: la oficial (evidencia primaria) y la de la wiki (secundaria).
> - **Extracciones y reproducción.** Las extracciones normalizadas de las fuentes del dataset están en `docs/research/data/programming`. Los scripts que las generan están en `scripts/research/programming`.

- Fecha de la investigación: 2026-09-26.
- Alcance: Cartoon Network, Boomerang, Fox Kids, Jetix, Nickelodeon (con Nick Jr. y Nick@Nite), Disney Channel (con Playhouse Disney y Zapping Zone) y Discovery Kids, entre 1993 y 2010, con foco en 1998-2008.
- Regla de trabajo: ningún horario sale de la memoria ni de otra región. Todo dato tiene fuente y nivel de certeza.

## Resumen

1. **Hay mucho más material del esperado.** Se procesaron 276 grillas mensuales de Cartoon Network y Boomerang (F1), 60 grillas mensuales de un blog especializado para todos los canales (F4) y 66 guías diarias archivadas de un cableoperador mexicano (F3), además de capturas oficiales (F2) y artículos de ANMTV (F5).
2. **Las guías de Cablevisión Monterrey (F3) son la mejor evidencia primaria.** Son guías de un día completo, archivadas en Wayback Machine, de 7 canales entre noviembre 2003 y abril 2006. Incluyen la transición de Fox Kids a Jetix (agosto 2004).
3. **Las grillas de la Cartoon Network Wiki (F1) son fiables cuando citan capturas oficiales.** La comprobación contra el horario oficial de Cartoon Network del 13/10/2005 dio 47 de 47 franjas iguales.
4. **El blog Foro Grilla de Canales (F4) es útil pero no uniforme.** Contra F3 coincide al 100% en Discovery Kids (enero 2004), 91% en Jetix (agosto 2005) y 83% en Disney Channel (enero 2004). En Nickelodeon rondan el 60%, porque son los mismos programas en otro orden. En Fox Kids el orden del día coincide, pero con +4 h de desfase por ser otra señal.
5. **La hora depende de la señal.** Cada canal tenía varias señales (Sur, Norte/México, "demás feeds"), y las fuentes usan horas locales distintas: F1 y F2 publican en hora de Buenos Aires, F3 en hora de Monterrey. Un horario sin señal ni zona horaria no es reproducible.
6. **Los bloques tienen patrones muy estables**, útiles para la experiencia nostálgica. Algunos ejemplos: Votatoon los sábados de 15:00 a 18:00 durante 2000-2008, Teatro Cartoon los domingos de 14:00 a 16:00 durante 1999-2008, Cinetoon los sábados de 9:00 a 10:00 durante 1998-2004 y Toonami de lunes a viernes de 17:00 a 19:00 entre 2002 y 2004. Boomerang repetía un ciclo de 8 horas tres veces por día hasta abril 2006.
7. **Lo más débil:**
   - Cartoon Network 1993-mayo 1996, que era una extensión de la señal de EE.UU.
   - Fox Kids antes de 2001.
   - Disney Channel y Discovery Kids antes de 2003.
   - Nick Jr. como canal propio.
   - El contenido interno de Rodeo Cartoon y de BoomBox.

## Cómo leer las tablas

- **Día:** días agrupados (`Lun–Vie`, `Lun, Mié, Vie`, `Sáb`…). Si el mismo programa ocupa la misma franja en varios días, va en una sola fila.
- **Hora:** hora local de la fuente, en el formato `inicio–fin`, donde el fin es el inicio de la franja siguiente. Si ocupa varias medias horas seguidas, se fusiona en un solo rango.
- **Día de emisión:** en las grillas mensuales (F1, F4), lo que va de 00:00 a 05:59 pertenece a la noche del día indicado. Por ejemplo, `Lun–Vie 00:00` es la madrugada posterior a lunes-viernes. En las guías diarias (F3), en cambio, el día empieza a las 00:00 del calendario.
- **Bloque:** nombre del bloque cuando la fuente lo indica. `_(contenido del bloque)_` significa que la fuente solo nombra el bloque, sin detallar las series.
- **Certeza:**
  - `verified`: fuente primaria revisada directamente, o secundaria contrastada con una primaria del mismo período (80% o más de coincidencia).
  - `probable`: fuente secundaria clara (grilla completa de wiki o blog) que no pudo contrastarse, o se contrastó con coincidencia parcial.
  - `uncertain`: sin evidencia suficiente. Incluye las franjas marcadas "A IDENTIFICAR" en la fuente.
- **Títulos:** se transcriben como los escribe cada fuente, sin normalizarlos al título del catálogo de WikiToon. Esa correspondencia es un paso posterior (ver la propuesta de datos).

## Fuentes

| Id | Fuente | Tipo | Cobertura | Región / hora | Uso y confiabilidad |
| -- | ------ | ---- | --------- | ------------- | ------------------- |
| F1 | [Cartoon Network Wiki (Fandom, es): grillas de Cartoon Network](https://cartoonnetwork.fandom.com/es/wiki/Categor%C3%ADa:Grillas_de_Cartoon_Network) y [de Boomerang](https://cartoonnetwork.fandom.com/es/wiki/Categor%C3%ADa:Grillas_de_Boomerang) | Wiki de fans. Cada grilla cita sus referencias. | Cartoon Network 1993-2026 (214 páginas), Boomerang 2001-2021 (62 páginas) | Varía por página; muchas separan "México", "Latinoamérica" o "Demás feeds" | Alta cuando cita capturas oficiales o de cableoperadores latinoamericanos. Baja cuando cita solo prensa brasileña, videos o el archivo estadounidense (ver "Fuentes descartadas"). |
| F2 | Capturas oficiales de `cartoonnetworkla.com` en Wayback Machine: [grilla oct-2000](https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html), [horario 13/10/2005](https://web.archive.org/web/20051013061542/http://alt.cartoonnetworkla.com:80/english/schedule), [Boomerang 6/6/2005](https://web.archive.org/web/20050606232744/http://alt.cartoonnetworkla.com/spanish/boomerang/schedule) | Primaria (sitio del canal) | Muestras puntuales | Hora de Buenos Aires ("Hora de la Ciudad de Buenos Aires") | Sirvió para validar F1. Los sitios de Fox Kids y Jetix eran Flash y Wayback no guardó sus grillas. |
| F3 | [Cablevisión Monterrey (México), guías por canal](https://web.archive.org/web/2004*/cablevision.com.mx/programacion/canales/*) | Primaria (cableoperador), 66 días distintos | Nov 2003-abr 2006: Cartoon Network, Boomerang, Fox Kids/Jetix, Nickelodeon, Disney Channel, Discovery Kids | Hora de Monterrey; señal que recibía ese operador en México | La evidencia más sólida. Cada página es un día completo, de 00:00 a 23:30. No trae nombres de bloque. El índice completo está en el apéndice. |
| F4 | [Foro Grilla de Canales (blog)](https://forogrilladecanales.blogspot.com/) | Secundaria. Indica el sitio oficial de origen, pero no enlaza capturas. | Grillas mensuales 1999-2006 de todos los canales | Casi nunca indica la señal. Fox Kids corresponde a la Zona Sur (deducido de F3). | Buena en Disney, Discovery Kids, Jetix y Cartoon Network; parcial en Nickelodeon. El mismo autor publica "recreaciones" (grillas reconstruidas), que se descartaron. |
| F5 | ANMTV: [cierre de Fox Kids y estreno de Jetix](https://www.anmtvla.com/2021/08/se-cumplen-17-anos-del-cierre-de-fox.html), [Nick@Nite 2008-2010](https://www.anmtvla.com/2025/07/programacion-del-bloque-nicknite_19.html), destacados de Jetix ([ago 2004](https://www.anmtvla.com/2023/08/para-recordar-los-destacados-de-jetix.html), [2005 parte VII](https://www.anmtvla.com/2025/07/especial-jetix-temporada-2005-parte-vii.html), [2005 parte X](https://www.anmtvla.com/2025/10/especial-jetix-temporada-2005-parte-x.html), [abr 2009](https://www.anmtvla.com/2009/04/destacados-de-abril-en-jetix-y-disney.html), [may 2009](https://www.anmtvla.com/2009/05/destacados-de-mayo-en-jetix-y-disney.html)) | Secundaria (portal de noticias latinoamericano). Retrospectivas y notas de época. | Horarios de bloques de Jetix (Zona Sur y Norte), Nick@Nite, maratones | Distingue Zona Sur y Zona Norte (México, una hora después) | `probable`. Las notas de época (2009) son más fiables que las retrospectivas. |
| F6 | Wikipedia en español: [Fox Kids](https://es.wikipedia.org/wiki/Fox_Kids) (bloques y alineaciones) y [Adult Swim (Latinoamérica)](https://es.wikipedia.org/wiki/Adult_Swim_(Latinoam%C3%A9rica)) (fechas) | Enciclopedia | Bloques de Fox Kids 2000-2004; fechas de Adult Swim | Latinoamérica | Solo nombres, alineaciones y fechas; no da horarios. |

### Fuentes descartadas o de otra región

- **Brasil:** Folha de S.Paulo y la [Hemeroteca Digital de la Biblioteca Nacional de Brasil](http://memoria.bn.gov.br/). Varias grillas de F1 las usan, sobre todo en 1997-1999 y en notas de 2002-2010. La señal brasileña tenía otra programación; por ejemplo, Dragon Ball GT se estrenó allí en 2002 y en la señal hispana recién en 2007. Las grillas de F1 apoyadas **solo** en estas fuentes se tratan como `uncertain` para Latinoamérica.
- **Estados Unidos:** [Cartoon Network/Adult Swim Archives Wiki](https://cnas.fandom.com/) (`cnas.fandom.com`), que es la base de las grillas de F1 de 1993-1996. Según F1, hasta mayo de 1996 la señal latina era "una extensión directa del estadounidense". Esos horarios no se presentan como latinoamericanos.
- **Recreaciones:** los posts "Recreación de…" de F4 son reconstrucciones del autor, no grillas de época.
- **Sin grilla recuperable:** los sitios Flash de Fox Kids (`foxkidstv.com`) y Jetix (`jetixtv.com`) en Wayback, y Cable Mágico Perú (el índice de Wayback no devolvió capturas).

## Validación cruzada

Para cada par de fuentes del mismo canal y mes se buscó el desfase horario (en pasos de 30 minutos) que maximiza las coincidencias de título en la misma franja.

| Canal | Fuente A | Fuente B (primaria) | Desfase de B respecto de A | Coincidencias | Lectura |
| ----- | -------- | ------------------- | -------------------------: | ------------: | ------- |
| Cartoon Network | F1 oct-2005 (lun-jue) | F2 horario oficial 13/10/2005 | 0 h | 47/47 | F1 transcribe fielmente la captura oficial (hora de Buenos Aires). |
| Cartoon Network | F1 nov-2003 a abr-2006 | F3 (12 días) | 0 h | 17-37 de 41-47 por día | Misma grilla base. Las diferencias son cambios dentro del mes, especiales y variantes de la señal México. |
| Cartoon Network | F4 nov-2003 (lun-jue) | F3 5/11/2003 | 0 h | 40/44 | F4 es fiable para Cartoon Network. |
| Boomerang | F1 dic-2003 a abr-2006 | F3 (11 días) | −3 h (dic-mar) / −2 h (abr-oct) | 17-37 de 26-45 | Misma señal. El desfase es exactamente la diferencia horaria Buenos Aires–Monterrey (México usaba horario de verano de abril a octubre). |
| Discovery Kids | F4 ene-2004 (vie-sáb) | F3 vie 20/2/2004 | 0 h | 48/48 | Coincidencia total. |
| Disney Channel | F4 ene-2004 (lun-vie) | F3 vie 20/2/2004 | 0 h | 35/42 | Alta. |
| Jetix | F4 ago-2005 (lun-vie) | F3 vie 2/9/2005 | 0 h | 43/47 | Alta. |
| Nickelodeon | F4 ene-2004 (vie) | F3 vie 20/2/2004 | 0 h | 29/48 | Parcial: mismos programas en otro orden. |
| Fox Kids | F4 ene-2004 (lun-mié-vie) | F3 vie 20/2/2004 | +4 h | 30/48 | Mismo orden del día, desplazado. F4 corresponde a la Zona Sur y F3 a la Zona Norte/México. |
| Disney Channel | F4 ago-2005 (vie) | F3 vie 2/9/2005 | −1 h | 28/41 | Parcial (distinto mes y posible cambio de señal). |

**Conclusión:** para convertir una grilla en datos hay que guardar siempre la **señal** y la **zona horaria** de la fuente. Una misma grilla puede aparecer con 0, 1, 2, 3 o 4 horas de diferencia según quién la publicó.

## Cartoon Network Latinoamérica

Contexto de las fuentes:
- **1993-mayo 1996:** la señal era una extensión de la estadounidense. F1 tiene grillas de esos años, pero apoyadas en el archivo de EE.UU.: `uncertain` para Latinoamérica.
- **1997-1999:** fuentes mixtas; las mejores citan prensa argentina.
- **2000-2002:** F1 cita capturas oficiales de `cartoonnetworkla.com`.
- **2003-2008:** F1 combina capturas oficiales con prensa brasileña, y F3 permite contrastar noviembre 2003-abril 2006.
- **Desde 2000:** F1 tiene además una tabla aparte para la **señal México** en varios meses.

### Período: octubre 1998 (Cartoon Network en los 90)

- **Fuente:** F1, [Grilla de Cartoon Network, Octubre de 1998](https://cartoonnetwork.fandom.com/es/wiki/Grilla_de_Cartoon_Network,_Octubre_de_1998). Cita: [ref. 1](https://www.lanacion.com.ar/lifestyle/cartoon-network-nid195191/), [ref. 2](https://ahira.com.ar/wp-content/uploads/2021/09/Grandes-Lineas-20-10-1998.pdf), [ref. 3](https://ahira.com.ar/wp-content/uploads/2021/09/Grandes-Lineas-27-10-1998.pdf).
- **Región de las fuentes citadas:** LatAm. La página no indica zona horaria; cita prensa argentina (La Nación, revista *Grandes Líneas*), así que lo más probable es la hora de Argentina.
- **Notas:** No hay captura oficial para contrastar; se apoya en guías de prensa argentina de octubre 1998.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Vie, Dom | 06:00–06:30 | Cartoon a Doodle-Do |  | F1 | `probable` |
| Lun–Vie | 06:30–07:00 | Las aventuras de Tiny Toons |  | F1 | `probable` |
| Lun–Vie | 07:00–08:00 | _(contenido del bloque)_ | Hora Acme | F1 | `probable` |
| Todos los días | 08:00–08:30 | Las tres mellizas |  | F1 | `probable` |
| Todos los días | 08:30–09:00 | La pequeña Lulú |  | F1 | `probable` |
| Lun–Vie | 09:00–09:30 | Nuevo Shmoo |  | F1 | `probable` |
| Lun–Vie | 09:30–10:00 | Los pequeños Tom y Jerry |  | F1 | `probable` |
| Lun–Vie | 10:00–10:30 | Las aventuras de Tiny Toons |  | F1 | `probable` |
| Lun–Vie | 10:30–11:00 | Garfield y sus amigos |  | F1 | `probable` |
| Lun–Vie | 11:00–11:30 | Pinky y Cerebro |  | F1 | `probable` |
| Lun–Vie | 11:30–12:00 | Tom y Jerry |  | F1 | `probable` |
| Lun–Vie | 12:00–12:30 | Bugs Bunny y el Pato Lucas |  | F1 | `probable` |
| Lun–Vie | 12:30–13:00 | Garfield y sus amigos |  | F1 | `probable` |
| Lun–Vie | 13:00–13:30 | Las aventuras de Silvestre y Piolín |  | F1 | `probable` |
| Lun–Vie | 13:30–14:00 | Ace Ventura |  | F1 | `probable` |
| Lun–Vie | 14:00–14:30 | La máscara |  | F1 | `probable` |
| Lun–Vie | 14:30–15:00 | ¡Fenomenoide! |  | F1 | `probable` |
| Lun–Vie | 15:00–15:30 | Beetlejuice |  | F1 | `probable` |
| Lun–Vie | 15:30–16:00 | Dos perros tontos |  | F1 | `probable` |
| Lun–Vie | 16:00–16:30 | Bobo y tonto |  | F1 | `probable` |
| Lun–Vie | 16:30–17:00 | Scooby-Doo y Scrappy-Doo |  | F1 | `probable` |
| Lun–Vie | 17:00–17:30 | Las increíbles aventuras de Jonny Quest |  | F1 | `probable` |
| Lun–Vie | 17:30–18:00 | Meteoro |  | F1 | `probable` |
| Lun–Vie | 18:00–19:00 | Las nuevas películas de Scooby-Doo |  | F1 | `probable` |
| Lun–Vie | 19:00–19:30 | La máscara |  | F1 | `probable` |
| Lun–Vie | 19:30–20:00 | Ace Ventura |  | F1 | `probable` |
| Lun–Vie | 20:00–20:30 | Las aventuras de Silvestre y Piolín |  | F1 | `probable` |
| Lun–Vie | 20:30–21:00 | Pinky y Cerebro |  | F1 | `probable` |
| Lun–Vie | 21:00–21:30 | El laboratorio de Dexter |  | F1 | `probable` |
| Lun–Vie | 21:30–22:00 | La vaca y el pollito |  | F1 | `probable` |
| Lun–Vie | 22:00–22:30 | Johnny Bravo |  | F1 | `probable` |
| Lun–Vie | 22:30–23:00 | Bugs Bunny y el Pato Lucas |  | F1 | `probable` |
| Lun–Vie | 23:00–23:30 | Tom y Jerry |  | F1 | `probable` |
| Lun–Vie | 23:30–00:00 | Scooby-Doo, ¿dónde estás? |  | F1 | `probable` |
| Lun | 00:00–00:30 | Johnny Bravo |  | F1 | `probable` |
| Lun–Vie | 00:30–01:00 | Beetlejuice |  | F1 | `probable` |
| Lun–Vie | 01:00–01:30 | ¡Fenomenoide! |  | F1 | `probable` |
| Lun–Vie | 01:30–02:00 | Bobo y tonto |  | F1 | `probable` |
| Lun–Vie | 02:00–02:30 | Dos perros tontos |  | F1 | `probable` |
| Lun–Vie | 02:30–03:00 | Los locos Addams |  | F1 | `probable` |
| Lun–Vie | 03:00–03:30 | Tom y Jerry |  | F1 | `probable` |
| Lun–Vie | 03:30–04:00 | Bugs Bunny y el Pato Lucas |  | F1 | `probable` |
| Lun–Vie | 04:00–04:30 | Popeye |  | F1 | `probable` |
| Lun–Vie | 04:30–05:00 | Droopy D |  | F1 | `probable` |
| Lun–Vie, Dom | 05:00–05:30 | Los Snorkels |  | F1 | `probable` |
| Todos los días | 05:30 | Josie y las melódicas en el espacio |  | F1 | `probable` |
| Mar | 00:00–00:30 | La vaca y el pollito |  | F1 | `probable` |
| Mié | 00:00–00:30 | El laboratorio de Dexter |  | F1 | `probable` |
| Jue | 00:00–00:30 | ¡Qué historia tan maravillosa! |  | F1 | `probable` |
| Vie | 00:00–00:30 | El fantasma del espacio de costa a costa |  | F1 | `probable` |
| Sáb | 06:00–07:00 | _(contenido del bloque)_ | Hora Acme | F1 | `probable` |
| Sáb, Dom | 07:00–07:30 | Big Bag |  | F1 | `probable` |
| Sáb, Dom | 07:30–08:00 | Pequeño Mundo |  | F1 | `probable` |
| Sáb | 09:00–10:00 | _(contenido del bloque)_ | CineToon | F1 | `probable` |
| Sáb | 10:00–10:30 | ¡Qué historia tan maravillosa! |  | F1 | `probable` |
| Sáb | 10:30–11:00 | Johnny Bravo |  | F1 | `probable` |
| Sáb | 11:00–11:30 | La vaca y el pollito |  | F1 | `probable` |
| Sáb | 11:30–12:00 | El laboratorio de Dexter |  | F1 | `probable` |
| Sáb | 12:00–12:30 | Capitán Simio y los monos galácticos |  | F1 | `probable` |
| Sáb | 12:30–13:00 | ExtremoDinos |  | F1 | `probable` |
| Sáb | 13:00–13:30 | Swat Kats |  | F1 | `probable` |
| Sáb | 13:30–14:00 | Capitán Planeta |  | F1 | `probable` |
| Sáb | 14:00–15:00 | Las aventuras de Tintín |  | F1 | `probable` |
| Sáb | 15:00–18:00 | Super Chunk |  | F1 | `probable` |
| Sáb | 18:00–18:30 | Los 13 fantasmas de Scooby-Doo |  | F1 | `probable` |
| Sáb | 18:30–19:00 | Dos perros tontos |  | F1 | `probable` |
| Sáb | 19:00–19:30 | Garfield y sus amigos |  | F1 | `probable` |
| Sáb | 19:30–20:00 | Tom y Jerry |  | F1 | `probable` |
| Sáb | 20:00–20:30 | Los Picapiedra |  | F1 | `probable` |
| Sáb | 20:30–21:00 | Los Supersónicos |  | F1 | `probable` |
| Sáb | 21:00–23:00 | _(contenido del bloque)_ | Hora Acme | F1 | `probable` |
| Sáb | 23:00–23:30 | Popeye |  | F1 | `probable` |
| Sáb | 23:30–00:00 | El show de Tex Avery |  | F1 | `probable` |
| Sáb | 00:00–00:30 | Bugs Bunny y el Pato Lucas |  | F1 | `probable` |
| Sáb | 00:30–01:00 | El fantasma del espacio de costa a costa |  | F1 | `probable` |
| Sáb | 01:00–02:00 | Las aventuras de Tintín |  | F1 | `probable` |
| Sáb | 02:00–02:30 | Meteoro |  | F1 | `probable` |
| Sáb | 02:30–03:00 | Fuerza G |  | F1 | `probable` |
| Sáb | 03:00–03:30 | James Bond Jr. |  | F1 | `probable` |
| Sáb | 03:30–04:00 | ExtremoDinos |  | F1 | `probable` |
| Sáb | 04:00–04:30 | Capitán Simio y los monos galácticos |  | F1 | `probable` |
| Sáb | 04:30–05:00 | Scooby-Doo, el cachorro |  | F1 | `probable` |
| Sáb | 05:00–05:30 | Las tres mellizas |  | F1 | `probable` |
| Dom | 06:30–07:00 | Cartoon a Doodle-Do |  | F1 | `probable` |
| Dom | 09:00–09:30 | Los pequeños Tom y Jerry |  | F1 | `probable` |
| Dom | 09:30–10:00 | Los pequeños Picapiedra |  | F1 | `probable` |
| Dom | 10:00–11:00 | _(contenido del bloque)_ | Hora Acme | F1 | `probable` |
| Dom | 11:00–11:30 | Garfield y sus amigos |  | F1 | `probable` |
| Dom | 11:30–12:00 | Taz-Manía |  | F1 | `probable` |
| Dom | 12:00–12:30 | Los 13 fantasmas de Scooby-Doo | Misterios S.A. | F1 | `probable` |
| Dom | 12:30–13:00 | El fantasma revoltoso | Misterios S.A. | F1 | `probable` |
| Dom | 13:00–13:30 | Hong Kong Phooey | Misterios S.A. | F1 | `probable` |
| Dom | 13:30–14:00 | Scooby-Doo, el cachorro | Misterios S.A. | F1 | `probable` |
| Dom | 14:00–16:00 | El teatro del Sr. Spim |  | F1 | `probable` |
| Dom | 16:00–16:30 | Las aventuras de Silvestre y Piolín |  | F1 | `probable` |
| Dom | 16:30–17:00 | Bugs Bunny y el Pato Lucas |  | F1 | `probable` |
| Dom | 17:00–17:30 | Tom y Jerry |  | F1 | `probable` |
| Dom | 17:30–18:00 | Los nuevos cuentos de Félix el gato |  | F1 | `probable` |
| Dom | 18:00–18:30 | Garfield y sus amigos |  | F1 | `probable` |
| Dom | 18:30–19:00 | Taz-Manía |  | F1 | `probable` |
| Dom | 19:00–19:30 | Johnny Bravo |  | F1 | `probable` |
| Dom | 19:30–20:00 | La vaca y el pollito |  | F1 | `probable` |
| Dom | 20:00–20:30 | El laboratorio de Dexter |  | F1 | `probable` |
| Dom | 20:30–21:00 | ¡Qué historia tan maravillosa! |  | F1 | `probable` |
| Dom | 21:00–21:30 | Las aventuras de Silvestre y Piolín |  | F1 | `probable` |
| Dom | 21:30–22:00 | Los nuevos cuentos de Félix el gato |  | F1 | `probable` |
| Dom | 22:00–23:00 | Tom y Jerry |  | F1 | `probable` |
| Dom | 23:00–00:00 | Bugs Bunny y el Pato Lucas |  | F1 | `probable` |
| Dom | 00:00–01:00 | Droopy D |  | F1 | `probable` |
| Dom | 01:00–02:00 | Popeye |  | F1 | `probable` |
| Dom | 02:00–03:00 | Toons mundialmente famosos |  | F1 | `probable` |
| Dom | 03:00–03:30 | La carrera espacial de Yogi |  | F1 | `probable` |
| Dom | 03:30–04:00 | Los locos de la galaxia |  | F1 | `probable` |
| Dom | 04:00–04:30 | Super fisgón y Despistado |  | F1 | `probable` |
| Dom | 04:30–05:00 | Huckleberry Hound |  | F1 | `probable` |

### Período: octubre 2000

- **Fuente:** F1, [Grilla de Cartoon Network, Octubre de 2000](https://cartoonnetwork.fandom.com/es/wiki/Grilla_de_Cartoon_Network,_Octubre_de_2000). Cita: [ref. 1](https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html), [ref. 2](https://web.archive.org/web/20001018034414/http://www.cartoonnetworkla.com/spanish/toonin/index.html).
- **Región de las fuentes citadas:** LatAm. Señal Latinoamérica; la página separa una tabla para México. Comprobado contra la [grilla oficial archivada](https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html): la franja de la mañana coincide exacta.
- **Notas:** El bloque Talismán reunía la acción de la tarde y la trasnoche. Hora ACME era el bloque de cortos de Looney Tunes.
- **Otras tablas en la misma página:** México.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Vie, Dom | 06:00–07:00 | Cartoon a Doodle-Do |  | F1 | `verified` |
| Lun–Vie | 07:00–08:00 | Pequeño Mundo |  | F1 | `verified` |
| Todos los días | 08:00–08:30 | Las tres mellizas |  | F1 | `verified` |
| Lun–Vie | 08:30–09:00 | La pequeña Lulú |  | F1 | `verified` |
| Lun–Vie | 09:00–09:30 | Franklin |  | F1 | `verified` |
| Lun–Vie | 09:30–10:00 | Scooby-Doo, el cachorro |  | F1 | `verified` |
| Lun–Vie | 10:00–10:30 | Los Picapiedra |  | F1 | `verified` |
| Lun–Vie | 10:30–11:00 | Los Supersónicos |  | F1 | `verified` |
| Lun–Vie | 11:00–12:00 | _(contenido del bloque)_ | Hora Acme | F1 | `verified` |
| Lun–Vie | 12:00–12:30 | El laboratorio de Dexter |  | F1 | `verified` |
| Lun–Vie | 12:30–13:00 | Garfield y sus amigos |  | F1 | `verified` |
| Lun–Vie | 13:00–13:30 | La vaca y el pollito |  | F1 | `verified` |
| Lun–Vie | 13:30–14:00 | Pinky y Cerebro |  | F1 | `verified` |
| Lun–Vie | 14:00–14:30 | Johnny Bravo |  | F1 | `verified` |
| Lun–Vie | 14:30–15:00 | Ace Ventura |  | F1 | `verified` |
| Lun–Vie | 15:00–17:00 | Scooby-Doo |  | F1 | `verified` |
| Lun–Vie | 17:00–17:30 | Pokémon | Talismán | F1 | `verified` |
| Lun–Vie | 17:30–18:00 | Guerra de bestias | Talismán | F1 | `verified` |
| Lun–Vie | 18:00–18:20 | La conspiración Roswell | Talismán | F1 | `verified` |
| Lun–Vie | 18:20–18:30 | En busca del castillo Lavender | Talismán | F1 | `verified` |
| Lun–Vie | 18:30–19:00 | Las increíbles aventuras de Jonny Quest | Talismán | F1 | `verified` |
| Lun–Jue | 19:00–19:30 | Pinky y Cerebro |  | F1 | `verified` |
| Lun–Jue | 19:30–20:00 | Mike, Lu y Og |  | F1 | `verified` |
| Lun–Jue | 20:00–20:30 | Las aventuras de Tiny Toons |  | F1 | `verified` |
| Lun–Jue | 20:30–21:00 | Johnny Bravo |  | F1 | `verified` |
| Lun–Jue | 21:00–21:30 | El laboratorio de Dexter |  | F1 | `verified` |
| Lun–Jue | 21:30–22:00 | La vaca y el pollito |  | F1 | `verified` |
| Lun–Vie | 22:00–22:30 | Pokémon |  | F1 | `verified` |
| Lun–Vie | 22:30–23:00 | Bugs Bunny y el Pato Lucas |  | F1 | `verified` |
| Lun–Vie | 23:00–23:30 | Tom y Jerry |  | F1 | `verified` |
| Lun–Jue | 23:30–00:00 | Los Picapiedra |  | F1 | `verified` |
| Lun–Vie | 00:00–00:30 | Shadow Raiders | Talismán | F1 | `verified` |
| Lun–Vie | 00:30–00:50 | Las increíbles aventuras de Jonny Quest | Talismán | F1 | `verified` |
| Lun–Vie | 00:50–01:00 | En busca del castillo Lavender | Talismán | F1 | `verified` |
| Lun–Vie | 01:00–01:20 | Guerra de bestias | Talismán | F1 | `verified` |
| Lun–Vie | 01:20–01:30 | En busca del castillo Lavender | Talismán | F1 | `verified` |
| Lun–Vie | 01:30–02:00 | Pokémon | Talismán | F1 | `verified` |
| Lun–Vie | 02:00–04:00 | _(contenido del bloque)_ | Cartoon Cartoon | F1 | `verified` |
| Lun–Vie | 04:00 | _(contenido del bloque)_ | Hora Acme | F1 | `verified` |
| Vie | 19:00–19:30 | Ed, Edd y Eddy |  | F1 | `verified` |
| Vie | 19:30–20:00 | Las chicas superpoderosas |  | F1 | `verified` |
| Vie, Dom | 20:00–21:00 | _(contenido del bloque)_ | Cartoon Cartoon | F1 | `verified` |
| Vie | 21:00–22:00 | _(contenido del bloque)_ | Cartoon Cartoon | F1 | `verified` |
| Vie | 23:30–00:00 | Pinky y Cerebro |  | F1 | `verified` |
| Sáb | 06:00–07:00 | _(contenido del bloque)_ | Hora Acme | F1 | `verified` |
| Sáb | 07:00–07:30 | Los pequeños Tom y Jerry |  | F1 | `verified` |
| Sáb | 07:30–08:00 | Garfield y sus amigos |  | F1 | `verified` |
| Sáb | 08:30–09:00 | Franklin |  | F1 | `verified` |
| Sáb | 09:00–10:00 | _(contenido del bloque)_ | Cinetoon | F1 | `verified` |
| Sáb | 10:00–10:30 | Ed, Edd y Eddy |  | F1 | `verified` |
| Sáb | 10:30–11:00 | Las chicas superpoderosas |  | F1 | `verified` |
| Sáb | 11:00–13:00 | _(contenido del bloque)_ | Cartoon Cartoon | F1 | `verified` |
| Sáb | 13:00–13:30 | Hombres de negro |  | F1 | `verified` |
| Sáb | 13:30–14:00 | La conspiración Roswell |  | F1 | `verified` |
| Sáb | 14:00–14:30 | Guerra de bestias |  | F1 | `verified` |
| Sáb | 14:30–15:00 | Pokémon |  | F1 | `verified` |
| Sáb | 15:00–18:00 | _(contenido del bloque)_ | Votatoon | F1 | `verified` |
| Sáb | 18:00–18:30 | Garfield y sus amigos |  | F1 | `verified` |
| Sáb | 18:30–19:00 | Las aventuras de Silvestre y Piolín |  | F1 | `verified` |
| Sáb | 19:00–19:30 | Dos perros tontos |  | F1 | `verified` |
| Sáb | 19:30–20:00 | Tom y Jerry |  | F1 | `verified` |
| Sáb | 20:00–20:30 | Los Picapiedra |  | F1 | `verified` |
| Sáb | 20:30–21:00 | Los Supersónicos |  | F1 | `verified` |
| Sáb | 21:00–23:00 | _(contenido del bloque)_ | Hora Acme | F1 | `verified` |
| Sáb | 23:00–00:30 | Pokémon |  | F1 | `verified` |
| Sáb | 00:30–01:00 | Fantasma del espacio de costa a costa |  | F1 | `verified` |
| Sáb | 01:00–01:30 | Guerra de bestias |  | F1 | `verified` |
| Sáb | 01:30–02:00 | La conspiración Roswell |  | F1 | `verified` |
| Sáb | 02:00–02:30 | Jonny Quest |  | F1 | `verified` |
| Sáb | 02:30–03:00 | Las increíbles aventuras de Jonny Quest |  | F1 | `verified` |
| Sáb | 03:00–03:30 | La máscara |  | F1 | `verified` |
| Sáb | 03:30–04:00 | Los locos Addams |  | F1 | `verified` |
| Sáb | 04:00–04:30 | Beetlejuice |  | F1 | `verified` |
| Sáb | 04:30–05:00 | Scooby-Doo, el cachorro |  | F1 | `verified` |
| Sáb | 05:00–05:30 | Las tres mellizas |  | F1 | `verified` |
| Sáb | 05:30 | El fantástico Max |  | F1 | `verified` |
| Dom | 07:00–07:30 | Kipper |  | F1 | `verified` |
| Dom | 07:30–08:00 | Los cuentos de Fievel |  | F1 | `verified` |
| Dom | 08:30–09:00 | Las aventuras de Tiny Toons |  | F1 | `verified` |
| Dom | 09:00–09:30 | Los pequeños Tom y Jerry |  | F1 | `verified` |
| Dom | 09:30–10:00 | Los pequeños Picapiedra |  | F1 | `verified` |
| Dom | 10:00–11:00 | _(contenido del bloque)_ | Hora Acme | F1 | `verified` |
| Dom | 11:00–11:30 | Garfield y sus amigos |  | F1 | `verified` |
| Dom | 11:30–12:00 | Don gato y su pandilla |  | F1 | `verified` |
| Dom | 12:00–12:30 | Las aventuras de Tiny Toons |  | F1 | `verified` |
| Dom | 12:30–13:00 | El lagartijo de Ned |  | F1 | `verified` |
| Dom | 13:00–13:30 | Los nuevos cuentos de Felix el gato |  | F1 | `verified` |
| Dom | 13:30–14:00 | Beetlejuice |  | F1 | `verified` |
| Dom | 14:00–16:00 | _(contenido del bloque)_ | Teatro Cartoon | F1 | `verified` |
| Dom | 16:00–16:30 | Las aventuras de Silvestre y Piolín |  | F1 | `verified` |
| Dom | 16:30–17:00 | Bugs Bunny y el Pato Lucas |  | F1 | `verified` |
| Dom | 17:00–17:30 | Tom y Jerry |  | F1 | `verified` |
| Dom | 17:30–18:00 | Pinky, Elvira y Cerebro |  | F1 | `verified` |
| Dom | 18:00–18:30 | Ed, Edd y Eddy |  | F1 | `verified` |
| Dom | 18:30–19:00 | Las chicas superpoderosas |  | F1 | `verified` |
| Dom | 19:00–20:00 | _(contenido del bloque)_ | Cartoon Cartoon | F1 | `verified` |
| Dom | 21:00–21:30 | Las aventuras de Silvestre y Piolín |  | F1 | `verified` |
| Dom | 21:30–22:00 | Pinky, Elvira y Cerebro |  | F1 | `verified` |
| Dom | 22:00–23:00 | Tom y Jerry |  | F1 | `verified` |
| Dom | 23:00–00:00 | Bugs Bunny y el Pato Lucas |  | F1 | `verified` |
| Dom | 00:00–01:00 | Droopy D |  | F1 | `verified` |
| Dom | 01:00–02:00 | Popeye |  | F1 | `verified` |
| Dom | 02:00–03:00 | Toons mundialmente famosos |  | F1 | `verified` |
| Dom | 03:00–03:30 | Maguila Gorila |  | F1 | `verified` |
| Dom | 03:30–04:00 | Tiro Loco McGraw |  | F1 | `verified` |
| Dom | 04:00–04:30 | Canuto y Canito |  | F1 | `verified` |
| Dom | 04:30–05:00 | Pixie y Dixie |  | F1 | `verified` |
| Dom | 05:00–05:30 | Leoncio el león |  | F1 | `verified` |
| Dom | 05:30 | Huckleberry Hound |  | F1 | `verified` |

### Período: noviembre 2002 (Toonami en su primer año)

- **Fuente:** F1, [Grilla de Cartoon Network, Noviembre de 2002](https://cartoonnetwork.fandom.com/es/wiki/Grilla_de_Cartoon_Network,_Noviembre_de_2002). Cita: [ref. 1](https://web.archive.org/web/20030205160749/http://www.cartoonnetworkla.com/spanish/toonin/).
- **Región de las fuentes citadas:** LatAm. Señal Latinoamérica, citando la captura oficial de `cartoonnetworkla.com`. Toonami aparece marcado en la tabla de la fuente.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Vie | 06:00–06:30 | Los pequeños Picapiedra |  | F1 | `verified` |
| Lun–Vie | 06:30–07:00 | Tiny Toons |  | F1 | `verified` |
| Lun–Vie | 07:00–08:00 | Pequeño Mundo |  | F1 | `verified` |
| Todos los días | 08:00–08:30 | Las tres mellizas |  | F1 | `verified` |
| Lun–Vie, Dom | 08:30–09:00 | Hamtaro |  | F1 | `verified` |
| Lun–Vie | 09:00–09:30 | Franklin |  | F1 | `verified` |
| Lun–Vie | 09:30–10:00 | Scooby-Doo y Scrappy-Doo |  | F1 | `verified` |
| Lun–Vie | 10:00–10:30 | Los Picapiedra |  | F1 | `verified` |
| Lun–Vie | 10:30–11:00 | Tom y Jerry |  | F1 | `verified` |
| Lun–Vie | 11:00–12:00 | _(contenido del bloque)_ | Hora ACME | F1 | `verified` |
| Lun–Vie | 12:00–12:30 | El laboratorio de Dexter |  | F1 | `verified` |
| Lun–Vie | 12:30–13:00 | Garfield y sus amigos |  | F1 | `verified` |
| Lun–Vie | 13:00–13:30 | La vaca y el pollito |  | F1 | `verified` |
| Lun–Vie | 13:30–14:00 | Beetlejuice |  | F1 | `verified` |
| Lun–Vie | 14:00–14:30 | Ed, Edd y Eddy |  | F1 | `verified` |
| Lun–Vie | 14:30–15:00 | El lagartijo de Ned |  | F1 | `verified` |
| Lun–Vie | 15:00–15:30 | Los 13 fantasmas de Scooby-Doo |  | F1 | `verified` |
| Lun–Vie | 15:30–16:00 | Hamtaro |  | F1 | `verified` |
| Lun–Vie | 16:00–16:30 | Las chicas superpoderosas |  | F1 | `verified` |
| Lun–Vie | 16:30–17:00 | Super Doll Licca Chan |  | F1 | `verified` |
| Lun–Vie | 17:00–17:30 | Pokémon |  | F1 | `verified` |
| Lun–Vie | 17:30–18:00 | Gundam Wing |  | F1 | `verified` |
| Lun–Vie | 18:00–18:30 | Street Fighter II-V |  | F1 | `verified` |
| Lun–Vie | 18:30–19:00 | Dragon Ball Z |  | F1 | `verified` |
| Lun–Jue | 19:00–19:30 | Las chicas superpoderosas |  | F1 | `verified` |
| Lun–Jue | 19:30–20:00 | Coraje, el perro cobarde |  | F1 | `verified` |
| Lun–Jue | 20:00–20:30 | ¡Qué historia tan maravillosa! |  | F1 | `verified` |
| Lun–Jue | 20:30–21:00 | Johnny Bravo |  | F1 | `verified` |
| Lun–Jue | 21:00–21:30 | El laboratorio de Dexter |  | F1 | `verified` |
| Lun–Jue | 21:30–22:00 | Soy la comadreja |  | F1 | `verified` |
| Lun–Vie | 22:00–22:30 | Pokémon |  | F1 | `verified` |
| Lun–Vie | 22:30–23:00 | Bugs Bunny y el Pato Lucas |  | F1 | `verified` |
| Lun–Vie | 23:00–23:30 | Tom y Jerry |  | F1 | `verified` |
| Lun–Vie | 23:30–00:00 | Los Picapiedra |  | F1 | `verified` |
| Lun–Vie | 00:00–00:30 | Samurai X |  | F1 | `verified` |
| Lun–Vie | 00:30–01:00 | Hombres X: Evolución |  | F1 | `verified` |
| Lun–Vie | 01:00–01:30 | Corrector Yui |  | F1 | `verified` |
| Lun–Vie | 01:30–02:00 | Pokémon |  | F1 | `verified` |
| Lun–Vie | 02:00–03:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `verified` |
| Lun–Vie | 03:00–03:30 | Mister Magoo |  | F1 | `verified` |
| Lun–Vie | 03:30–04:00 | La pantera rosa |  | F1 | `verified` |
| Lun–Vie | 04:00–04:30 | Rocky y Bullwinkle |  | F1 | `verified` |
| Lun–Vie | 04:30–05:00 | Popeye |  | F1 | `verified` |
| Lun–Vie | 05:00 | _(contenido del bloque)_ | Hora ACME | F1 | `verified` |
| Vie | 19:00–19:30 | Samurai Jack |  | F1 | `verified` |
| Vie | 19:30–20:00 | El show del malo y siniestro |  | F1 | `verified` |
| Vie, Dom | 20:00–21:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `verified` |
| Vie | 21:00–22:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `verified` |
| Sáb | 06:00–07:00 | _(contenido del bloque)_ | Hora ACME | F1 | `verified` |
| Sáb | 07:00–07:30 | Sagwa, la gatita siamesa |  | F1 | `verified` |
| Sáb | 07:30–08:00 | Garfield y sus amigos |  | F1 | `verified` |
| Sáb | 08:30–09:00 | Franklin |  | F1 | `verified` |
| Sáb | 09:00–10:00 | _(contenido del bloque)_ | Cinetoon | F1 | `verified` |
| Sáb | 10:00–10:30 | Samurai Jack |  | F1 | `verified` |
| Sáb | 10:30–11:00 | El show del malo y siniestro |  | F1 | `verified` |
| Sáb | 11:00–13:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `verified` |
| Sáb | 13:00–13:30 | Las aventuras de Jackie Chan |  | F1 | `verified` |
| Sáb | 13:30–14:00 | Proyecto Zeta |  | F1 | `verified` |
| Sáb | 14:00–14:30 | Liga de la justicia |  | F1 | `verified` |
| Sáb | 14:30–15:00 | Pokémon |  | F1 | `verified` |
| Sáb | 15:00–18:00 | _(contenido del bloque)_ | Votatoon | F1 | `verified` |
| Sáb | 18:00–18:30 | Scooby-Doo |  | F1 | `verified` |
| Sáb | 18:30–19:00 | Las aventuras de Silvestre y Piolín |  | F1 | `verified` |
| Sáb | 19:00–19:30 | El show de los Looney Tunes |  | F1 | `verified` |
| Sáb | 19:30–20:00 | Tom y Jerry |  | F1 | `verified` |
| Sáb | 20:00–20:30 | Los Picapiedra |  | F1 | `verified` |
| Sáb | 20:30–21:00 | Los Supersónicos |  | F1 | `verified` |
| Sáb | 21:00–23:00 | _(contenido del bloque)_ | Hora ACME | F1 | `verified` |
| Sáb | 23:00–00:45 | Pokémon |  | F1 | `verified` |
| Sáb | 00:45–01:00 | Fantasma del espacio de costa a costa |  | F1 | `verified` |
| Sáb | 01:00–03:00 | Dragon Ball Z |  | F1 | `verified` |
| Sáb | 03:00–03:30 | Meteoro |  | F1 | `verified` |
| Sáb | 03:30–04:00 | Fuerza G |  | F1 | `verified` |
| Sáb | 04:00–04:30 | En busca del castillo Lavender |  | F1 | `verified` |
| Sáb | 04:30–05:00 | Sakura Card Captors |  | F1 | `verified` |
| Sáb | 05:00–05:30 | Proyecto Zeta |  | F1 | `verified` |
| Sáb | 05:30 | Las aventuras de Jackie Chan |  | F1 | `verified` |
| Dom | 06:00–07:00 | Porky Pig |  | F1 | `verified` |
| Dom | 07:00–07:30 | Kipper |  | F1 | `verified` |
| Dom | 07:30–08:00 | Popolocrois |  | F1 | `verified` |
| Dom | 09:00–09:30 | Percy, el guardabosques |  | F1 | `verified` |
| Dom | 09:30–10:00 | La pequeña Lulú |  | F1 | `verified` |
| Dom | 10:00–11:00 | _(contenido del bloque)_ | Hora ACME | F1 | `verified` |
| Dom | 11:00–11:30 | Garfield y sus amigos |  | F1 | `verified` |
| Dom | 11:30–12:00 | Sheep en la gran ciudad |  | F1 | `verified` |
| Dom | 12:00–12:30 | Mike, Lu y Og |  | F1 | `verified` |
| Dom | 12:30–13:00 | Tiny Toons |  | F1 | `verified` |
| Dom | 13:00–13:30 | Los nuevos cuentos de Félix el gato |  | F1 | `verified` |
| Dom | 13:30–14:00 | Los patos astutos |  | F1 | `verified` |
| Dom | 14:00–16:00 | _(contenido del bloque)_ | Teatro Cartoon | F1 | `verified` |
| Dom | 16:00–16:30 | Droopy D |  | F1 | `verified` |
| Dom | 16:30–17:00 | Bugs Bunny y el Pato Lucas |  | F1 | `verified` |
| Dom | 17:00–17:30 | Tom y Jerry |  | F1 | `verified` |
| Dom | 17:30–18:00 | Pinky y Cerebro |  | F1 | `verified` |
| Dom | 18:00–18:30 | Samurai Jack |  | F1 | `verified` |
| Dom | 18:30–19:00 | El show del malo y siniestro |  | F1 | `verified` |
| Dom | 19:00–20:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `verified` |
| Dom | 21:00–21:30 | Pinky y Cerebro |  | F1 | `verified` |
| Dom | 21:30–22:00 | Bobo y tonto |  | F1 | `verified` |
| Dom | 22:00–23:00 | Tom y Jerry |  | F1 | `verified` |
| Dom | 23:00–00:00 | Bugs Bunny y el Pato Lucas |  | F1 | `verified` |
| Dom | 00:00–01:00 | _(contenido del bloque)_ | Hora ACME | F1 | `verified` |
| Dom | 01:00–02:00 | Popeye |  | F1 | `verified` |
| Dom | 02:00–03:00 | Porky Pig |  | F1 | `verified` |
| Dom | 03:00–03:30 | Karate Kid |  | F1 | `verified` |
| Dom | 03:30–04:00 | Los verdaderos cazafantasmas |  | F1 | `verified` |
| Dom | 04:00–04:30 | Familia Partridge |  | F1 | `verified` |
| Dom | 04:30–05:00 | Jeannie (animado) |  | F1 | `verified` |
| Dom | 05:00–05:30 | Los Supersónicos |  | F1 | `verified` |
| Dom | 05:30 | Los Picapiedra |  | F1 | `verified` |

### Período: noviembre 2003

- **Fuente:** F1, [Grilla de Cartoon Network, Noviembre de 2003](https://cartoonnetwork.fandom.com/es/wiki/Grilla_de_Cartoon_Network,_Noviembre_de_2003). Cita: [ref. 1](https://web.archive.org/web/20031106014936/http://www.cablevision.com.mx/programacion/canales/Canal106.htm).
- **Región de las fuentes citadas:** mixta (LatAm + Brasil). Fuentes mixtas (sitio oficial latinoamericano + prensa brasileña). Contra la guía de Cablevisión Monterrey del 5/11/2003 coinciden 34 de 44 franjas sin desfase horario (ver F3).
- **Otras tablas en la misma página:** México.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Vie | 06:00–06:30 | Los pequeños Tom y Jerry |  | F1 | `probable` |
| Lun–Vie | 06:30–07:00 | Dragon Tales |  | F1 | `probable` |
| Lun–Vie | 07:00–08:00 | Pequeño Mundo |  | F1 | `probable` |
| Lun–Vie | 08:00–08:30 | Sagwa, la gatita siamesa |  | F1 | `probable` |
| Lun–Vie, Dom | 08:30–09:00 | Hamtaro |  | F1 | `probable` |
| Lun–Vie | 09:00–09:30 | Los pequeños Looney Tunes |  | F1 | `probable` |
| Lun–Vie | 09:30–10:00 | Scooby-Doo el cachorro |  | F1 | `probable` |
| Lun–Vie | 10:00–10:30 | Los Picapiedra |  | F1 | `probable` |
| Lun–Vie | 10:30–11:00 | Tom y Jerry |  | F1 | `probable` |
| Lun–Vie | 11:00–12:00 | _(contenido del bloque)_ | Hora ACME | F1 | `probable` |
| Lun–Vie | 12:00–12:30 | El laboratorio de Dexter |  | F1 | `probable` |
| Lun–Vie | 12:30–13:00 | Las chicas superpoderosas |  | F1 | `probable` |
| Lun–Vie, Dom | 13:00–13:30 | Coraje, el perro cobarde |  | F1 | `probable` |
| Lun–Vie | 13:30–14:00 | Soy la Comadreja |  | F1 | `probable` |
| Lun–Vie | 14:00–14:30 | Sheep en la gran ciudad |  | F1 | `probable` |
| Lun–Vie | 14:30–15:00 | La vaca y el pollito |  | F1 | `probable` |
| Lun–Vie | 15:00–15:30 | Scooby-Doo, ¿dónde estás? |  | F1 | `probable` |
| Lun–Vie | 15:30–16:00 | ¿Qué hay de nuevo, Scooby-Doo? |  | F1 | `probable` |
| Lun–Vie | 16:00–16:30 | Las aventuras de Jackie Chan |  | F1 | `probable` |
| Lun–Vie | 16:30–17:00 | Proyecto Zeta |  | F1 | `probable` |
| Lun–Vie | 17:00–17:30 | Pokémon | Toonami | F1 | `probable` |
| Lun–Vie | 17:30–18:00 | Inuyasha | Toonami | F1 | `probable` |
| Lun–Vie | 18:00–18:30 | Los caballeros del zodiaco | Toonami | F1 | `probable` |
| Lun–Vie | 18:30–19:00 | Dragon Ball Z | Toonami | F1 | `probable` |
| Lun–Jue | 19:00–19:30 | Las chicas superpoderosas | Horario Central | F1 | `probable` |
| Lun–Jue | 19:30–20:00 | Sheep en la gran ciudad | Horario Central | F1 | `probable` |
| Lun–Jue | 20:00–20:30 | El show de Cartoon Cartoons | Horario Central | F1 | `probable` |
| Lun–Jue | 20:30–21:00 | La vaca y el pollito | Horario Central | F1 | `probable` |
| Lun–Jue | 21:00–21:30 | El laboratorio de Dexter | Horario Central | F1 | `probable` |
| Lun–Jue | 21:30–22:00 | Johnny Bravo | Horario Central | F1 | `probable` |
| Lun–Vie | 22:00–22:30 | Pokémon |  | F1 | `probable` |
| Lun–Vie | 22:30–23:00 | Bugs Bunny y el Pato Lucas |  | F1 | `probable` |
| Lun–Vie | 23:00–23:30 | Tom y Jerry |  | F1 | `probable` |
| Lun–Vie | 23:30–00:00 | Scooby-Doo y Scrappy-Doo |  | F1 | `probable` |
| Lun–Vie | 00:00–00:30 | Las aventuras de Jackie Chan |  | F1 | `probable` |
| Lun–Vie | 00:30–01:00 | _(sin identificar)_ |  | F1 | `uncertain` |
| Lun–Vie | 01:00–01:30 | Static Shock |  | F1 | `probable` |
| Lun–Vie | 01:30–02:00 | Pokémon |  | F1 | `probable` |
| Lun–Vie | 02:00–03:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `probable` |
| Lun–Vie | 03:00–03:30 | El show de Underdog |  | F1 | `probable` |
| Lun–Vie | 03:30–04:00 | La Pantera Rosa |  | F1 | `probable` |
| Lun–Vie | 04:00–04:30 | Rocky y Bullwinkle |  | F1 | `probable` |
| Lun–Vie | 04:30–05:00 | Popeye, el marino |  | F1 | `probable` |
| Lun–Vie | 05:00 | _(contenido del bloque)_ | Hora ACME | F1 | `probable` |
| Vie | 19:00–19:30 | KND: Los chicos del barrio |  | F1 | `probable` |
| Vie | 19:30–20:00 | Las sombrías aventuras de Billy y Mandy |  | F1 | `probable` |
| Vie, Dom | 20:00–21:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `probable` |
| Vie | 21:00–22:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `probable` |
| Sáb | 06:00–07:00 | _(contenido del bloque)_ | Hora ACME | F1 | `probable` |
| Sáb | 07:00–07:30 | Sagwa, la gatita siamesa |  | F1 | `probable` |
| Sáb | 07:30–08:00 | Garfield y sus amigos |  | F1 | `probable` |
| Sáb, Dom | 08:00–08:30 | Las tres mellizas |  | F1 | `probable` |
| Sáb | 08:30–09:00 | Franklin |  | F1 | `probable` |
| Sáb | 09:00–10:00 | _(contenido del bloque)_ | CineToon | F1 | `probable` |
| Sáb | 10:00–10:30 | KND: Los chicos del barrio |  | F1 | `probable` |
| Sáb | 10:30–11:00 | Las sombrías aventuras de Billy y Mandy |  | F1 | `probable` |
| Sáb | 11:00–13:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `probable` |
| Sáb | 13:00–13:30 | Samurai Jack |  | F1 | `probable` |
| Sáb | 13:30–14:00 | He-Man (2002) |  | F1 | `probable` |
| Sáb | 14:00–14:30 | Liga de la Justicia |  | F1 | `probable` |
| Sáb | 14:30–15:00 | Pokémon |  | F1 | `probable` |
| Sáb | 15:00–18:00 | _(contenido del bloque)_ | Votatoon | F1 | `probable` |
| Sáb | 18:00–20:00 | Primera Fila |  | F1 | `probable` |
| Sáb | 20:00–20:30 | Los Picapiedra |  | F1 | `probable` |
| Sáb | 20:30–21:00 | Los Supersónicos |  | F1 | `probable` |
| Sáb | 21:00–23:00 | _(contenido del bloque)_ | Hora ACME | F1 | `probable` |
| Sáb | 23:00–01:10 | Samurai X |  | F1 | `probable` |
| Sáb | 01:10–01:20 | Fantasma del Espacio de Costa a Costa |  | F1 | `probable` |
| Sáb | 01:20–03:00 | Liga de la Justicia |  | F1 | `probable` |
| Sáb | 03:00–03:30 | Inuyasha |  | F1 | `probable` |
| Sáb | 03:30–04:00 | Fuerza G |  | F1 | `probable` |
| Sáb | 04:00–04:30 | Super Doll Licca Chan |  | F1 | `probable` |
| Sáb | 04:30–05:00 | Las aventuras de Jackie Chan |  | F1 | `probable` |
| Sáb | 05:00–05:30 | Corrector Yui (solo domingo 2) / James Bond Jr. (resto del mes) |  | F1 | `probable` |
| Sáb | 05:30 | Los hijos de la Pantera Rosa |  | F1 | `probable` |
| Dom | 06:00–07:00 | Porky Pig |  | F1 | `probable` |
| Dom | 07:00–07:30 | Los pequeños Looney Tunes |  | F1 | `probable` |
| Dom | 07:30–08:00 | Los pequeños Picapiedra |  | F1 | `probable` |
| Dom | 09:00–09:30 | Todos los perros van al cielo |  | F1 | `probable` |
| Dom | 09:30–10:00 | La pequeña Lulú |  | F1 | `probable` |
| Dom | 10:00–11:00 | El show de los Looney Tunes |  | F1 | `probable` |
| Dom | 11:00–11:30 | Garfield y sus amigos |  | F1 | `probable` |
| Dom | 11:30–12:00 | Soy la Comadreja |  | F1 | `probable` |
| Dom | 12:00–12:30 | Mucha Lucha |  | F1 | `probable` |
| Dom | 12:30–13:00 | Ozzy y Drix |  | F1 | `probable` |
| Dom | 13:30–14:00 | Los patos astutos |  | F1 | `probable` |
| Dom | 14:00–16:00 | _(contenido del bloque)_ | Teatro Cartoon | F1 | `probable` |
| Dom | 16:00–18:00 | Caleidoscopio |  | F1 | `probable` |
| Dom | 18:00–18:30 | KND: Los chicos del barrio |  | F1 | `probable` |
| Dom | 18:30–19:00 | Las sombrías aventuras de Billy y Mandy |  | F1 | `probable` |
| Dom | 19:00–20:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `probable` |
| Dom | 21:00–21:30 | Los patos astutos |  | F1 | `probable` |
| Dom | 21:30–22:00 | ¿Qué hay de nuevo, Scooby-Doo? |  | F1 | `probable` |
| Dom | 22:00–23:00 | Tom y Jerry |  | F1 | `probable` |
| Dom | 23:00–00:00 | Bugs Bunny y el Pato Lucas |  | F1 | `probable` |
| Dom | 00:00–01:00 | _(contenido del bloque)_ | Hora ACME | F1 | `probable` |
| Dom | 01:00–02:00 | Popeye, el marino |  | F1 | `probable` |
| Dom | 02:00–03:00 | Porky Pig |  | F1 | `probable` |
| Dom | 03:00–03:30 | El Inspector |  | F1 | `probable` |
| Dom | 03:30–04:00 | Cazafantasmas: La nueva generación |  | F1 | `probable` |
| Dom | 04:00–04:30 | Los 13 fantasmas de Scooby-Doo |  | F1 | `probable` |
| Dom | 04:30–05:00 | Scooby-Doo y Scrappy-Doo |  | F1 | `probable` |
| Dom | 05:00–05:30 | Los Supersónicos |  | F1 | `probable` |
| Dom | 05:30 | Los Picapiedra |  | F1 | `probable` |

### Período: octubre 2005 (estreno de Adult Swim)

- **Fuente:** F1, [Grilla de Cartoon Network, Octubre de 2005](https://cartoonnetwork.fandom.com/es/wiki/Grilla_de_Cartoon_Network,_Octubre_de_2005). Cita: [ref. 1](https://web.archive.org/web/20051013061542/http://alt.cartoonnetworkla.com:80/english/schedule).
- **Región de las fuentes citadas:** mixta (LatAm + Brasil). Hora de la Ciudad de Buenos Aires. Comprobado contra el [horario oficial del 13/10/2005](https://web.archive.org/web/20051013061542/http://alt.cartoonnetworkla.com:80/english/schedule): 47 de 47 franjas coinciden.
- **Notas:** Adult Swim se estrenó el viernes 7 de octubre de 2005 (Wikipedia en español).
- **Otras tablas en la misma página:** Adult Swim.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Vie | 06:00–06:30 | Coraje, el perro cobarde |  | F1 | `verified` |
| Lun–Vie | 06:30–07:00 | Las sombrías aventuras de Billy y Mandy |  | F1 | `verified` |
| Lun–Vie | 07:00–08:00 | Pequeño Mundo |  | F1 | `verified` |
| Lun–Vie | 08:00–08:30 | Sagwa, la gatita siamesa |  | F1 | `verified` |
| Lun–Vie, Dom | 08:30–09:00 | Los osos Berenstains |  | F1 | `verified` |
| Lun–Vie | 09:00–09:30 | Jacobo Dos Dos |  | F1 | `verified` |
| Lun–Vie | 09:30–10:00 | Las chicas superpoderosas |  | F1 | `verified` |
| Lun–Vie | 10:00–10:30 | _(contenido del bloque)_ | show de Cartoon Cartoons | F1 | `verified` |
| Lun–Vie | 10:30–11:00 | KND: Los chicos del barrio |  | F1 | `verified` |
| Lun–Vie | 11:00–11:30 | Ed, Edd y Eddy |  | F1 | `verified` |
| Lun–Vie | 11:30–12:00 | Hi Hi Puffy AmiYumi |  | F1 | `verified` |
| Lun–Vie | 12:00–12:30 | Malo con Carne |  | F1 | `verified` |
| Lun–Vie | 12:30–13:00 | Mucha Lucha |  | F1 | `verified` |
| Lun–Vie | 13:00–13:30 | Duelo Xiaolin |  | F1 | `verified` |
| Lun–Vie | 13:30–14:00 | Coraje, el perro cobarde |  | F1 | `verified` |
| Lun–Vie | 14:00–14:30 | ¿Qué hay de nuevo, Scooby-Doo? |  | F1 | `verified` |
| Lun–Vie | 14:30–15:00 | Las sombrías aventuras de Billy y Mandy |  | F1 | `verified` |
| Lun–Vie | 15:00–15:30 | El club Winx |  | F1 | `verified` |
| Lun–Vie | 15:30–16:00 | Hi Hi Puffy AmiYumi |  | F1 | `verified` |
| Lun–Vie | 16:00–16:30 | Mascotas extraterrestres |  | F1 | `verified` |
| Lun–Vie | 16:30–17:00 | Malo con Carne |  | F1 | `verified` |
| Lun–Vie | 17:00–17:30 | Ed, Edd y Eddy |  | F1 | `verified` |
| Lun–Vie | 17:30–18:00 | Las sombrías aventuras de Billy y Mandy |  | F1 | `verified` |
| Lun–Vie | 18:00–18:30 | Investigadores de fantasmas |  | F1 | `verified` |
| Lun–Vie | 18:30–19:00 | ¿Qué hay de nuevo, Scooby-Doo? |  | F1 | `verified` |
| Lun–Jue | 19:00–19:30 | Malo con Carne |  | F1 | `verified` |
| Lun–Jue | 19:30–20:00 | Coraje, el perro cobarde |  | F1 | `verified` |
| Lun–Jue | 20:00–20:30 | KND: Los chicos del barrio |  | F1 | `verified` |
| Lun–Jue, Dom | 20:30–21:00 | Ed, Edd y Eddy |  | F1 | `verified` |
| Lun–Vie | 21:00–21:30 | Las sombrías aventuras de Billy y Mandy |  | F1 | `verified` |
| Lun–Vie | 21:30–22:00 | ¿Qué hay de nuevo, Scooby-Doo? |  | F1 | `verified` |
| Lun–Vie | 22:00–22:30 | Pokémon |  | F1 | `verified` |
| Lun–Jue | 22:30–23:00 | Bugs Bunny y el Pato Lucas |  | F1 | `verified` |
| Lun–Jue | 23:00–23:30 | Tom y Jerry |  | F1 | `verified` |
| Lun–Jue | 23:30–00:00 | Historias de fantasmas |  | F1 | `verified` |
| Lun–Jue | 00:00–00:30 | Inuyasha → Samurai Jack | Toonami | F1 | `verified` |
| Lun–Jue | 00:30–01:00 | Yu-Yu Hakusho | Toonami | F1 | `verified` |
| Lun–Jue | 01:00–01:30 | Duel Masters → Los caballeros del zodiaco | Toonami | F1 | `verified` |
| Lun–Jue | 01:30–02:00 | Pokémon (hasta miércoles 12) → La guerra de Sakura | Toonami | F1 | `verified` |
| Lun–Jue | 02:00–02:30 | Batman del futuro |  | F1 | `verified` |
| Lun–Jue | 02:30–03:00 | Los jóvenes titanes |  | F1 | `verified` |
| Lun–Jue | 03:00–03:30 | Superman: La serie animada |  | F1 | `verified` |
| Lun–Jue | 03:30–03:45 | Hombre-X: Evolución |  | F1 | `verified` |
| Lun–Jue | 03:45–04:00 | Batman: La serie animada |  | F1 | `verified` |
| Lun–Jue | 04:00–04:30 | Samurai Jack |  | F1 | `verified` |
| Lun–Jue | 04:30–05:00 | Las aventuras de Jackie Chan |  | F1 | `verified` |
| Lun–Sáb | 05:00 | _(contenido del bloque)_ | Hora ACME | F1 | `verified` |
| Vie | 19:00–19:30 | Hi Hi Puffy AmiYumi → Ed, Edd y Eddy (viernes 28) |  | F1 | `verified` |
| Vie | 19:30–20:00 | Las sombrías aventuras de Billy y Mandy |  | F1 | `verified` |
| Vie | 20:00–21:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `verified` |
| Vie–Dom | 22:30–23:00 | Locos Dieciseis |  | F1 | `verified` |
| Vie–Dom | 23:00–01:00 | _(contenido del bloque)_ | Adult Swim | F1 | `verified` |
| Vie–Dom | 01:00–05:00 | Adult Swim (repetición) |  | F1 | `verified` |
| Sáb | 06:00–07:00 | _(contenido del bloque)_ | Hora ACME | F1 | `verified` |
| Sáb | 07:00–07:30 | Mona, la vampira |  | F1 | `verified` |
| Sáb | 07:30–08:00 | Jacobo Dos Dos |  | F1 | `verified` |
| Sáb | 08:00–08:30 | Arturo |  | F1 | `verified` |
| Sáb | 08:30–09:00 | Hamtaro |  | F1 | `verified` |
| Sáb | 09:00–09:30 | Krypto, el superperro |  | F1 | `verified` |
| Sáb | 09:30–10:00 | El club Winx |  | F1 | `verified` |
| Sáb | 10:00–10:30 | Hi Hi Puffy AmiYumi → Ed, Edd y Eddy (sábado 29) |  | F1 | `verified` |
| Sáb | 10:30–11:00 | Las sombrías aventuras de Billy y Mandy |  | F1 | `verified` |
| Sáb | 11:00–12:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `verified` |
| Sáb | 12:00–12:30 | Pixcodelics → Mascotas extraterrestres |  | F1 | `verified` |
| Sáb | 12:30–13:00 | Las aventuras de Jackie Chan |  | F1 | `verified` |
| Sáb | 13:00–13:30 | Transformers Energon → Los jóvenes titanes |  | F1 | `verified` |
| Sáb | 13:30–14:00 | Batman (2004) |  | F1 | `verified` |
| Sáb | 14:00–14:30 | Liga de la Justicia Ilimitada → Hombres X: Evolución |  | F1 | `verified` |
| Sáb | 14:30–15:00 | Pokémon |  | F1 | `verified` |
| Sáb | 15:00–18:00 | _(contenido del bloque)_ | Votatoon | F1 | `verified` |
| Sáb | 18:00–20:00 | _(contenido del bloque)_ | Teatro Cartoon | F1 | `verified` |
| Sáb | 20:00–20:30 | Malo con Carne |  | F1 | `verified` |
| Sáb | 20:30–21:00 | El laboratorio de Dexter |  | F1 | `verified` |
| Sáb | 21:00–21:30 | Ozzy y Drix |  | F1 | `verified` |
| Sáb | 21:30–22:00 | Mascotas Extraterrestres |  | F1 | `verified` |
| Sáb | 22:00–22:30 | Duck Dodgers |  | F1 | `verified` |
| Dom | 06:00–06:30 | Tiny Toons |  | F1 | `verified` |
| Dom | 06:30–07:00 | La pequeña Lulú |  | F1 | `verified` |
| Dom | 07:00–07:30 | Pecola |  | F1 | `verified` |
| Dom | 07:30–08:00 | Max y Ruby |  | F1 | `verified` |
| Dom | 08:00–08:30 | Las aventuras de Arañita |  | F1 | `verified` |
| Dom | 09:00–09:30 | Betty Toons |  | F1 | `verified` |
| Dom | 09:30–10:00 | Pinky y Cerebro |  | F1 | `verified` |
| Dom | 10:00–10:30 | El show de los Looney Tunes |  | F1 | `verified` |
| Dom | 10:30–11:00 | La pandilla del Río Canguro |  | F1 | `verified` |
| Dom | 11:00–11:30 | Jacobo Dos Dos |  | F1 | `verified` |
| Dom | 11:30–12:00 | Las chicas superpoderosas |  | F1 | `verified` |
| Dom | 12:00–12:30 | Las sombrías aventuras de Billy y Mandy |  | F1 | `verified` |
| Dom | 12:30–13:00 | Mansión Foster para amigos imaginarios |  | F1 | `verified` |
| Dom | 13:00–13:30 | El laboratorio de Dexter |  | F1 | `verified` |
| Dom | 13:30–14:00 | Hi Hi Puffy AmiYumi |  | F1 | `verified` |
| Dom | 14:00–16:00 | _(contenido del bloque)_ | Teatro Cartoon | F1 | `verified` |
| Dom | 16:00–16:30 | Duelo Xiaolin |  | F1 | `verified` |
| Dom | 16:30–17:00 | Mucha Lucha |  | F1 | `verified` |
| Dom | 17:00–17:30 | Los jóvenes titanes |  | F1 | `verified` |
| Dom | 17:30–18:00 | Duck Dodgers |  | F1 | `verified` |
| Dom | 18:00–18:30 | Hi Hi Puffy AmiYumi → Ed, Edd y Eddy (domingo 30) |  | F1 | `verified` |
| Dom | 18:30–19:00 | Las sombrías aventuras de Billy y Mandy |  | F1 | `verified` |
| Dom | 19:00–20:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `verified` |
| Dom | 20:00–20:30 | Mascotas Extraterrestres |  | F1 | `verified` |
| Dom | 21:00–21:30 | ¿Qué hay de nuevo, Scooby-Doo? |  | F1 | `verified` |
| Dom | 21:30–22:00 | Malo con Carne |  | F1 | `verified` |
| Dom | 22:00–22:30 | Tom y Jerry |  | F1 | `verified` |
| Dom | 05:00–05:30 | Las sombrías aventuras de Billy y Mandy |  | F1 | `verified` |
| Dom | 05:30 | La vaca y el pollito |  | F1 | `verified` |

**Tabla "Adult Swim" de la misma página:**

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Vie | 23:00–23:15 | Harvey Birdman, abogado |  | F1 | `verified` |
| Vie, Sáb | 23:15–23:30 | Aqua Teen Hunger Force |  | F1 | `verified` |
| Vie | 23:30–00:00 | Secundaria de clones |  | F1 | `verified` |
| Vie–Dom | 00:00–00:30 | Mission Hill |  | F1 | `verified` |
| Vie–Dom | 00:30–00:45 | Bob y Margaret |  | F1 | `verified` |
| Vie, Dom | 00:45 | El show de Brak |  | F1 | `verified` |
| Sáb | 23:00–23:15 | Aqua Teen Hunger Force |  | F1 | `verified` |
| Sáb | 23:30–00:00 | Universitarios |  | F1 | `verified` |
| Sáb | 00:45 | Cortos |  | F1 | `verified` |
| Dom | 23:00–23:15 | Laboratorio Submarino 2021 |  | F1 | `verified` |
| Dom | 23:15–23:30 | Harvey Birdman, abogado |  | F1 | `verified` |
| Dom | 23:30–00:00 | Películas caseras |  | F1 | `verified` |

### Período: septiembre 2007 (último año de Adult Swim en Cartoon Network)

- **Fuente:** F1, [Grilla de Cartoon Network, Septiembre de 2007](https://cartoonnetwork.fandom.com/es/wiki/Grilla_de_Cartoon_Network,_Septiembre_de_2007). Cita: [ref. 1](https://web.archive.org/web/20070930232556/http://directstage.directvla.com/opgnet/(S(5ghv5455weiplh55f0jafx55))/default.aspx), [ref. 2](https://web.archive.org/web/20070929045500/http://directstage.directvla.com/opgnet/(S(5ghv5455weiplh55f0jafx55))/default.aspx), [ref. 3](https://web.archive.org/web/20070929150824/http://directstage.directvla.com/opgnet/(S(5ghv5455weiplh55f0jafx55))/default.aspx).
- **Región de las fuentes citadas:** mixta (LatAm + Brasil). Tabla "Latinoamérica"; la página tiene otra para "Demás feeds". Fuentes mixtas: DirecTV Latinoamérica y Cable Mágico (Perú) más sitios brasileños.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Vie | 06:00–06:30 | Ed, Edd y Eddy |  | F1 | `probable` |
| Lun–Vie | 06:30–07:00 | Las Sombrías Aventuras de Billy y Mandy |  | F1 | `probable` |
| Lun–Vie | 07:00–07:30 | Las Chicas Superpoderosas |  | F1 | `probable` |
| Lun–Vie | 07:30–08:00 | Tom y Jerry |  | F1 | `probable` |
| Lun–Vie | 08:00–08:30 | La Pantera Rosa |  | F1 | `probable` |
| Lun–Vie | 08:30–09:00 | Ed, Edd y Eddy |  | F1 | `probable` |
| Lun–Sáb | 09:00–10:00 | _(contenido del bloque)_ | Cartoon Cartoons | F1 | `probable` |
| Lun–Vie | 10:00–10:30 | El Campamento de Lazlo |  | F1 | `probable` |
| Lun–Vie | 10:30–11:00 | El Club Winx |  | F1 | `probable` |
| Lun–Vie | 11:00–11:30 | Las Chicas Superpoderosas |  | F1 | `probable` |
| Lun–Vie | 11:30–12:00 | KND: Los Chicos del Barrio |  | F1 | `probable` |
| Lun–Vie | 12:00–12:30 | Ser Ian |  | F1 | `probable` |
| Lun–Vie | 12:30–13:00 | Las Sombrías Aventuras de Billy y Mandy |  | F1 | `probable` |
| Lun–Vie | 13:00–13:30 | ¡Mucha Lucha! |  | F1 | `probable` |
| Lun–Vie | 13:30–14:00 | ¡Shaggy y Scooby-Doo Detectives! |  | F1 | `probable` |
| Lun–Vie | 14:00–14:30 | Ben 10 |  | F1 | `probable` |
| Lun–Vie | 14:30–15:00 | Ed, Edd y Eddy |  | F1 | `probable` |
| Lun–Jue | 15:00–15:30 | Pokémon: Batalla Avanzada |  | F1 | `probable` |
| Lun–Jue | 15:30–16:00 | Vida y Obra de Juniper Lee |  | F1 | `probable` |
| Lun–Jue | 16:00–16:30 | KND: Los Chicos del Barrio |  | F1 | `probable` |
| Lun–Jue | 16:30–17:00 | Tom y Jerry |  | F1 | `probable` |
| Lun–Jue | 17:00–19:00 | _(contenido del bloque)_ | Cinemanía | F1 | `probable` |
| Lun–Jue | 19:00–19:30 | KND: Los Chicos del Barrio |  | F1 | `probable` |
| Lun–Jue | 19:30–20:00 | Mi Compañero de Clase es un Mono |  | F1 | `probable` |
| Lun–Jue | 20:00–20:30 | Ed, Edd y Eddy |  | F1 | `probable` |
| Lun–Jue | 20:30–21:00 | Las Sombrías Aventuras de Billy y Mandy |  | F1 | `probable` |
| Lun–Jue | 21:00–21:30 | Tom y Jerry |  | F1 | `probable` |
| Lun–Jue | 21:30–22:00 | ¡Shaggy y Scooby-Doo Detectives! |  | F1 | `probable` |
| Lun–Vie | 22:00–22:30 | Pokémon: Liga Naranja |  | F1 | `probable` |
| Lun–Vie | 22:30–23:00 | Naruto (hasta martes 11) → Viewtiful Joe (desde miércoles 12) |  | F1 | `probable` |
| Lun–Vie | 23:00–23:30 | Duelo Xiaolin |  | F1 | `probable` |
| Lun–Vie | 23:30–00:00 | One Piece |  | F1 | `probable` |
| Lun–Vie | 00:00–00:40 | Dragon Ball Z (hasta jueves 20) → Dragon Ball GT (desde jueves 20, 0:30am) |  | F1 | `probable` |
| Lun–Vie | 00:40–01:00 | Naruto |  | F1 | `probable` |
| Lun–Jue | 01:00–01:30 | Zoids Fuzors |  | F1 | `probable` |
| Lun–Jue | 01:30–02:00 | Transformers Energon |  | F1 | `probable` |
| Lun–Jue | 02:00–02:30 | Inuyasha |  | F1 | `probable` |
| Lun–Jue | 02:30–03:00 | Rave Master |  | F1 | `probable` |
| Lun–Jue | 03:00–03:45 | Pokémon: Batalla Avanzada |  | F1 | `probable` |
| Lun–Jue | 03:45–04:00 | Duck Dodgers |  | F1 | `probable` |
| Todos los días | 04:00–04:30 | El Nuevo Show del Pájaro Loco |  | F1 | `probable` |
| Lun–Vie | 04:30–05:00 | Las Aventuras de Silvestre y Piolín |  | F1 | `probable` |
| Lun–Sáb | 05:00 | Hora ACME (mes final) |  | F1 | `probable` |
| Vie | 15:00–19:00 | Mini-maratones |  | F1 | `probable` |
| Vie | 19:00–19:30 | Las Sombrías Aventuras de Billy y Mandy |  | F1 | `probable` |
| Vie | 19:30–20:00 | KND: Los Chicos del Barrio |  | F1 | `probable` |
| Vie, Dom | 20:00–22:00 | _(contenido del bloque)_ | Teatro Cartoon | F1 | `probable` |
| Vie | 01:00–01:15 | Laboratorio Submarino 2021 | Adult Swim | F1 | `probable` |
| Vie | 01:15–01:30 | El Show de Brak | Adult Swim | F1 | `probable` |
| Vie | 01:30–01:45 | Los Calamareños | Adult Swim | F1 | `probable` |
| Vie | 01:45–02:15 | Secundaria de Clones | Adult Swim | F1 | `probable` |
| Vie | 02:15–02:45 | Tullidos | Adult Swim | F1 | `probable` |
| Vie | 02:45–03:00 | Tropezando en el Espacio | Adult Swim | F1 | `probable` |
| Vie–Dom | 03:00–03:30 | La Pantera Rosa |  | F1 | `probable` |
| Vie–Dom | 03:30–04:00 | Tom y Jerry |  | F1 | `probable` |
| Sáb | 06:00–06:30 | La Vaca y el Pollito |  | F1 | `probable` |
| Sáb | 06:30–07:00 | Las Chicas Superpoderosas |  | F1 | `probable` |
| Sáb | 07:00–07:30 | El Laboratorio de Dexter |  | F1 | `probable` |
| Sáb | 07:30–08:00 | Coraje, el Perro Cobarde |  | F1 | `probable` |
| Sáb | 08:00–08:30 | Tom y Jerry |  | F1 | `probable` |
| Sáb | 08:30–09:00 | ¡Shaggy y Scooby-Doo Detectives! |  | F1 | `probable` |
| Sáb | 10:00–10:30 | Las Sombrías Aventuras de Billy y Mandy |  | F1 | `probable` |
| Sáb | 10:30–11:00 | KND: Los Chicos del Barrio |  | F1 | `probable` |
| Sáb | 11:00–11:30 | Johnny Test |  | F1 | `probable` |
| Sáb | 11:30–12:00 | Los 4 Fantásticos (2006) |  | F1 | `probable` |
| Sáb | 12:00–12:30 | Loonatics |  | F1 | `probable` |
| Sáb | 12:30–13:00 | ¡Mucha Lucha! |  | F1 | `probable` |
| Sáb | 13:00–13:30 | Los Jóvenes Titanes |  | F1 | `probable` |
| Sáb | 13:30–14:00 | Ben 10 |  | F1 | `probable` |
| Sáb | 14:00–14:30 | Vida y Obra de Juniper Lee |  | F1 | `probable` |
| Sáb | 14:30–15:00 | Pokemon: Batalla de la Frontera |  | F1 | `probable` |
| Sáb | 15:00–18:00 | _(contenido del bloque)_ | Votatoon | F1 | `probable` |
| Sáb | 18:00–20:00 | Teatro Cartoon (repetición) |  | F1 | `probable` |
| Sáb | 20:00–22:00 | Mini-maratones |  | F1 | `probable` |
| Sáb | 22:00–22:30 | ¡Shaggy y Scooby-Doo Detectives! |  | F1 | `probable` |
| Sáb, Dom | 22:30–23:00 | Bugs Bunny y el Pato Lucas |  | F1 | `probable` |
| Sáb | 23:00–23:30 | Tom y Jerry |  | F1 | `probable` |
| Sáb | 23:30–00:00 | La Vaca y el Pollito |  | F1 | `probable` |
| Sáb, Dom | 00:00–00:30 | Johnny Bravo |  | F1 | `probable` |
| Sáb | 00:30–01:00 | Los Desastres del Rey Arturo |  | F1 | `probable` |
| Sáb | 01:00–01:15 | Aqua Teen Hunger Force | Adult Swim | F1 | `probable` |
| Sáb | 01:15–01:30 | Pollo Robot | Adult Swim | F1 | `probable` |
| Sáb | 01:30–02:00 | Universitarios | Adult Swim | F1 | `probable` |
| Sáb | 02:00–02:30 | Los Oblongs | Adult Swim | F1 | `probable` |
| Sáb | 02:30–02:45 | Películas Caseras | Adult Swim | F1 | `probable` |
| Sáb | 02:45–03:00 | Cortos | Adult Swim | F1 | `probable` |
| Sáb, Dom | 04:30–05:00 | Pinky, Elvira y Cerebro |  | F1 | `probable` |
| Dom | 06:00–06:30 | Taz-Manía |  | F1 | `probable` |
| Dom | 06:30–07:00 | Ed, Edd y Eddy |  | F1 | `probable` |
| Dom | 07:00–07:30 | Mi Compañero de Clase es un Mono |  | F1 | `probable` |
| Dom | 07:30–08:00 | El Campamento de Lazlo |  | F1 | `probable` |
| Dom | 08:00–08:30 | Mansión Foster para amigos imaginarios |  | F1 | `probable` |
| Dom | 08:30–09:00 | Las Chicas Superpoderosas |  | F1 | `probable` |
| Dom | 09:00–09:30 | Las Aventuras de Tom y Jerry |  | F1 | `probable` |
| Dom | 09:30–10:00 | ¡Shaggy y Scooby-Doo Detectives! |  | F1 | `probable` |
| Dom | 10:00–14:00 | Mini-maratones |  | F1 | `probable` |
| Dom | 14:00–16:00 | _(contenido del bloque)_ | Teatro Cartoon | F1 | `probable` |
| Dom | 16:00–16:30 | Pokemon: Batalla de la Frontera |  | F1 | `probable` |
| Dom | 16:30–17:00 | Ben 10 |  | F1 | `probable` |
| Dom | 17:00–17:30 | ¡Shaggy y Scooby-Doo Detectives! |  | F1 | `probable` |
| Dom | 17:30–18:00 | KND: Los Chicos del Barrio |  | F1 | `probable` |
| Dom | 18:00–18:30 | Las Sombrías Aventuras de Billy y Mandy |  | F1 | `probable` |
| Dom | 18:30–19:00 | KND: Los Chicos del Barrio |  | F1 | `probable` |
| Dom | 19:00–19:30 | Johnny Test |  | F1 | `probable` |
| Dom | 19:30–20:00 | Las Sombrías Aventuras de Billy y Mandy |  | F1 | `probable` |
| Dom | 22:00–22:30 | Tom y Jerry |  | F1 | `probable` |
| Dom | 23:00–23:30 | La Vaca y el Pollito |  | F1 | `probable` |
| Dom | 23:30–00:00 | Las Chicas Superpoderosas |  | F1 | `probable` |
| Dom | 00:30–01:00 | Locos Dieciséis |  | F1 | `probable` |
| Dom | 01:00–01:15 | Harvey Birdman, Abogado | Adult Swim | F1 | `probable` |
| Dom | 01:15–01:45 | Stroker y Hoop | Adult Swim | F1 | `probable` |
| Dom | 01:45–02:15 | Los Hermanos Venture | Adult Swim | F1 | `probable` |
| Dom | 02:15–02:45 | Jack, el Empleado Desempleado | Adult Swim | F1 | `probable` |
| Dom | 02:45–03:00 | Baby Blues: Una Familia Animada | Adult Swim | F1 | `probable` |
| Dom | 05:00–05:30 | Bobo y Tonto |  | F1 | `probable` |
| Dom | 05:30 | Johnny Bravo |  | F1 | `probable` |

## Boomerang Latinoamérica

El canal se lanzó en julio de 2001 (F1). Hasta el 3/4/2006 emitía **8 horas de programación repetidas tres veces al día**: el bloque de las 06:00 se repetía a las 14:00 y a las 22:00. El 3/4/2006 se relanzó con 24 horas de programación y enfoque juvenil. Antes del canal, "Boomerang" fue un **bloque de Cartoon Network**: los domingos de 01:00 a 06:00 en 2001 y un bloque de clásicos desde 1993; F1 marca su mes final en junio de 2001.

### Período: octubre 2001 (primer año del canal)

- **Fuente:** F1, [Grilla de Boomerang, Octubre de 2001](https://cartoonnetwork.fandom.com/es/wiki/Grilla_de_Boomerang,_Octubre_de_2001). Cita: [ref. 1](https://web.archive.org/web/20011018041604/http://www.cartoonnetworkla.com/spanish/boomerang/grid.html).
- **Región de las fuentes citadas:** LatAm. Cita capturas del sitio oficial de Boomerang dentro de `cartoonnetworkla.com`.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun | 06:00–09:00 | El oso Yogi |  | F1 | `verified` |
| Todos los días | 09:00–09:30 | Jonny Quest | Boomeraction | F1 | `verified` |
| Todos los días | 09:30–10:00 | El fantasma del espacio y Dino Boy | Boomeraction | F1 | `verified` |
| Lun | 10:00–13:00 | Canuto y Canito |  | F1 | `verified` |
| Todos los días | 13:00–13:30 | Josie y sus Gatimelódicas |  | F1 | `verified` |
| Todos los días | 13:30–14:00 | Los peligros de Penélope |  | F1 | `verified` |
| Lun | 14:00–17:00 | El oso Yogi |  | F1 | `verified` |
| Todos los días | 17:00–17:30 | Jonny Quest | Boomeraction | F1 | `verified` |
| Todos los días | 17:30–18:00 | El fantasma del espacio y Dino Boy | Boomeraction | F1 | `verified` |
| Lun | 18:00–21:00 | Canuto y Canito |  | F1 | `verified` |
| Todos los días | 21:00–21:30 | Josie y sus Gatimelódicas |  | F1 | `verified` |
| Todos los días | 21:30–22:00 | Los peligros de Penélope |  | F1 | `verified` |
| Lun | 22:00–01:00 | El oso Yogi |  | F1 | `verified` |
| Todos los días | 01:00–01:30 | Jonny Quest | Boomeraction | F1 | `verified` |
| Todos los días | 01:30–02:00 | El fantasma del espacio y Dino Boy | Boomeraction | F1 | `verified` |
| Lun | 02:00–05:00 | Canuto y Canito |  | F1 | `verified` |
| Todos los días | 05:00–05:30 | Josie y sus Gatimelódicas |  | F1 | `verified` |
| Todos los días | 05:30 | Los peligros de Penélope |  | F1 | `verified` |
| Mar | 06:00–09:00 | Huckleberry Hound |  | F1 | `verified` |
| Mar | 10:00–13:00 | Simiolón y Listolín |  | F1 | `verified` |
| Mar | 14:00–17:00 | Huckleberry Hound |  | F1 | `verified` |
| Mar | 18:00–21:00 | Simiolón y Listolín |  | F1 | `verified` |
| Mar | 22:00–01:00 | Huckleberry Hound |  | F1 | `verified` |
| Mar | 02:00–05:00 | Simiolón y Listolín |  | F1 | `verified` |
| Mié | 06:00–09:00 | Tiro Loco McGraw |  | F1 | `verified` |
| Mié | 10:00–13:00 | Super Fisgón y Despistado |  | F1 | `verified` |
| Mié | 14:00–17:00 | Tiro Loco McGraw |  | F1 | `verified` |
| Mié | 18:00–21:00 | Super Fisgón y Despistado |  | F1 | `verified` |
| Mié | 22:00–01:00 | Tiro Loco McGraw |  | F1 | `verified` |
| Mié | 02:00–05:00 | Super Fisgón y Despistado |  | F1 | `verified` |
| Jue | 06:00–09:00 | Maguila Gorila |  | F1 | `verified` |
| Jue | 10:00–13:00 | Loopy De Loop |  | F1 | `verified` |
| Jue | 14:00–17:00 | Maguila Gorila |  | F1 | `verified` |
| Jue | 18:00–21:00 | Loopy De Loop |  | F1 | `verified` |
| Jue | 22:00–01:00 | Maguila Gorila |  | F1 | `verified` |
| Jue | 02:00–05:00 | Loopy De Loop |  | F1 | `verified` |
| Vie | 06:00–09:00 | El león Melquiades |  | F1 | `verified` |
| Vie | 10:00–13:00 | Pixie, Dixie y el Sr. Jinks |  | F1 | `verified` |
| Vie | 14:00–17:00 | El león Melquiades |  | F1 | `verified` |
| Vie | 18:00–21:00 | Pixie, Dixie y el Sr. Jinks |  | F1 | `verified` |
| Vie | 22:00–01:00 | El león Melquiades |  | F1 | `verified` |
| Vie | 02:00–05:00 | Pixie, Dixie y el Sr. Jinks |  | F1 | `verified` |
| Sáb | 06:00–09:00 | Pier-No-Doyuna y Patán |  | F1 | `verified` |
| Sáb | 10:00–13:00 | Los autos locos |  | F1 | `verified` |
| Sáb | 14:00–17:00 | Pier-No-Doyuna y Patán |  | F1 | `verified` |
| Sáb | 18:00–21:00 | Los autos locos |  | F1 | `verified` |
| Sáb | 22:00–01:00 | Pier-No-Doyuna y Patán |  | F1 | `verified` |
| Sáb | 02:00–05:00 | Los autos locos |  | F1 | `verified` |
| Dom | 06:00–09:00 | Yakky Doodle |  | F1 | `verified` |
| Dom | 10:00–13:00 | Lindo pulgoso |  | F1 | `verified` |
| Dom | 14:00–17:00 | Yakky Doodle |  | F1 | `verified` |
| Dom | 18:00–21:00 | Lindo pulgoso |  | F1 | `verified` |
| Dom | 22:00–01:00 | Yakky Doodle |  | F1 | `verified` |
| Dom | 02:00–05:00 | Lindo pulgoso |  | F1 | `verified` |

### Período: diciembre 2003

- **Fuente:** F1, [Grilla de Boomerang, Diciembre de 2003](https://cartoonnetwork.fandom.com/es/wiki/Grilla_de_Boomerang,_Diciembre_de_2003). Cita: [ref. 1](https://web.archive.org/web/20040219014632/http://www.cartoonnetworkla.com:80/spanish/boomerang/grid.html), [ref. 2](https://web.archive.org/web/20031212124821/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm), [ref. 3](https://web.archive.org/web/20031226001756/http://www.cablemagico.com.pe:8002/cmagico/owa/programacion?actual=0&tipo_consulta=pc&canal=44).
- **Región de las fuentes citadas:** LatAm. Hora de Buenos Aires. Contra la guía de Cablevisión Monterrey del 11/12/2003 coinciden 24 de 30 franjas con desfase de −3 h, que es la diferencia horaria Buenos Aires–Monterrey de ese mes: la señal es la misma.
- **Notas:** Hasta abril de 2006 el canal repetía un ciclo de 8 horas tres veces al día (06:00, 14:00 y 22:00).

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Vie | 06:00–07:00 | Tiro Loco McGraw |  | F1 | `verified` |
| Lun–Vie | 07:00–08:00 | Ruff y Reddy |  | F1 | `verified` |
| Lun–Vie | 08:00–08:30 | Frankenstein Jr. y los Imposibles | Boomeraction | F1 | `verified` |
| Lun–Vie | 08:30–09:00 | Birdman y el trío Galaxia | Boomeraction | F1 | `verified` |
| Lun–Vie | 09:00–10:00 | Pepe Pótamo |  | F1 | `verified` |
| Lun–Vie | 10:00–11:00 | Los locos Addams |  | F1 | `verified` |
| Todos los días | 11:00–11:30 | Shazzan | Boomeraction | F1 | `verified` |
| Todos los días | 11:30–12:00 | Ases del Peligro | Boomeraction | F1 | `verified` |
| Lun–Vie | 12:00–13:00 | Conejo Ricochet |  | F1 | `verified` |
| Lun–Vie | 13:00–14:00 | Pixie, Dixie y el Sr. Jinx |  | F1 | `verified` |
| Lun–Vie | 14:00–15:00 | Tiro Loco McGraw |  | F1 | `verified` |
| Lun–Vie | 15:00–16:00 | Ruff y Reddy |  | F1 | `verified` |
| Lun–Vie | 16:00–16:30 | Frankenstein Jr. y los Imposibles | Boomeraction | F1 | `verified` |
| Lun–Vie | 16:30–17:00 | Birdman y el trío Galaxia | Boomeraction | F1 | `verified` |
| Lun–Vie | 17:00–18:00 | Pepe Pótamo |  | F1 | `verified` |
| Lun–Vie | 18:00–19:00 | Los locos Addams |  | F1 | `verified` |
| Todos los días | 19:00–19:30 | Shazzan | Boomeraction | F1 | `verified` |
| Todos los días | 19:30–20:00 | Ases del Peligro | Boomeraction | F1 | `verified` |
| Lun–Vie | 20:00–21:00 | Conejo Ricochet |  | F1 | `verified` |
| Lun–Vie | 21:00–22:00 | Pixie, Dixie y el Sr. Jinx |  | F1 | `verified` |
| Lun–Vie | 22:00–23:00 | Tiro Loco McGraw |  | F1 | `verified` |
| Lun–Vie | 23:00–00:00 | Ruff y Reddy |  | F1 | `verified` |
| Lun–Vie | 00:00–00:30 | Frankenstein Jr. y los Imposibles | Boomeraction | F1 | `verified` |
| Lun–Vie | 00:30–01:00 | Birdman y el trío Galaxia | Boomeraction | F1 | `verified` |
| Lun–Vie | 01:00–02:00 | Pepe Pótamo |  | F1 | `verified` |
| Lun–Vie | 02:00–03:00 | Los locos Addams |  | F1 | `verified` |
| Todos los días | 03:00–03:30 | Shazzan | Boomeraction | F1 | `verified` |
| Todos los días | 03:30–04:00 | Ases del Peligro | Boomeraction | F1 | `verified` |
| Lun–Vie | 04:00–05:00 | Conejo Ricochet |  | F1 | `verified` |
| Lun–Vie | 05:00 | Pixie, Dixie y el Sr. Jinx |  | F1 | `verified` |
| Sáb | 06:00–08:00 | Los autos locos |  | F1 | `verified` |
| Sáb | 08:00–10:00 | El inspector Ardilla |  | F1 | `verified` |
| Sáb, Dom | 10:00–10:30 | Frankenstein Jr. y los Imposibles | Boomeraction | F1 | `verified` |
| Sáb, Dom | 10:30–11:00 | Birdman y el trío Galaxia | Boomeraction | F1 | `verified` |
| Sáb | 12:00–14:00 | El oso Yogi |  | F1 | `verified` |
| Sáb | 14:00–16:00 | Los autos locos |  | F1 | `verified` |
| Sáb | 16:00–18:00 | El inspector Ardilla |  | F1 | `verified` |
| Sáb, Dom | 18:00–18:30 | Frankenstein Jr. y los Imposibles | Boomeraction | F1 | `verified` |
| Sáb, Dom | 18:30–19:00 | Birdman y el trío Galaxia | Boomeraction | F1 | `verified` |
| Sáb | 20:00–22:00 | El oso Yogi |  | F1 | `verified` |
| Sáb | 22:00–00:00 | Los autos locos |  | F1 | `verified` |
| Sáb | 00:00–02:00 | El inspector Ardilla |  | F1 | `verified` |
| Sáb, Dom | 02:00–02:30 | Frankenstein Jr. y los Imposibles | Boomeraction | F1 | `verified` |
| Sáb, Dom | 02:30–03:00 | Birdman y el trío Galaxia | Boomeraction | F1 | `verified` |
| Sáb | 04:00 | El oso Yogi |  | F1 | `verified` |
| Dom | 06:00–08:00 | La Hormiga Atómica |  | F1 | `verified` |
| Dom | 08:00–10:00 | Yakky Doodle Duck |  | F1 | `verified` |
| Dom | 12:00–14:00 | Los Banana Splits |  | F1 | `verified` |
| Dom | 14:00–16:00 | La Hormiga Atómica |  | F1 | `verified` |
| Dom | 16:00–18:00 | Yakky Doodle Duck |  | F1 | `verified` |
| Dom | 20:00–22:00 | Los Banana Splits |  | F1 | `verified` |
| Dom | 22:00–00:00 | La Hormiga Atómica |  | F1 | `verified` |
| Dom | 00:00–02:00 | Yakky Doodle Duck |  | F1 | `verified` |
| Dom | 04:00 | Los Banana Splits |  | F1 | `verified` |

### Período: julio 2005 (Rodeo Cartoon, CineBoom, Boomeraction)

- **Fuente:** F1, [Grilla de Boomerang, Julio de 2005](https://cartoonnetwork.fandom.com/es/wiki/Grilla_de_Boomerang,_Julio_de_2005). Cita: [ref. 1](https://web.archive.org/web/20050708073627/http://alt.cartoonnetworkla.com/english/boomerang/schedule).
- **Región de las fuentes citadas:** LatAm. Hora de Buenos Aires. Verifiqué directamente la [grilla oficial del 6/6/2005](https://web.archive.org/web/20050606232744/http://alt.cartoonnetworkla.com/spanish/boomerang/schedule), con la misma estructura; F4 publica la misma grilla para julio.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Vie | 06:00–07:00 | _(contenido del bloque)_ | Rodeo Cartoon de Hanna-Barbera | F1 | `verified` |
| Lun–Vie | 07:00–07:30 | Kimba, el león blanco |  | F1 | `verified` |
| Lun–Vie | 07:30–08:00 | El show de Underdog |  | F1 | `verified` |
| Lun–Sáb | 08:00–09:00 | _(contenido del bloque)_ | CineBoom | F1 | `verified` |
| Lun–Vie | 09:00–10:00 | Garfield y sus amigos |  | F1 | `verified` |
| Lun–Vie | 10:00–11:00 | Popeye, el marino | La Hora Boomerang | F1 | `verified` |
| Lun–Sáb | 11:00–11:30 | Meteoro | Boomeraction | F1 | `verified` |
| Lun–Vie | 11:30–12:00 | Cazafantasmas: la nueva generación | Boomeraction | F1 | `verified` |
| Lun–Vie | 12:00–13:00 | Los Picapiedra |  | F1 | `verified` |
| Lun–Vie | 13:00–14:00 | Los Supersónicos |  | F1 | `verified` |
| Lun–Vie | 14:00–15:00 | _(contenido del bloque)_ | Rodeo Cartoon de Hanna-Barbera | F1 | `verified` |
| Lun–Vie | 15:00–15:30 | Kimba, el león blanco |  | F1 | `verified` |
| Lun–Vie | 15:30–16:00 | El show de Underdog |  | F1 | `verified` |
| Lun–Sáb | 16:00–17:00 | _(contenido del bloque)_ | CineBoom | F1 | `verified` |
| Lun–Vie | 17:00–18:00 | Garfield y sus amigos |  | F1 | `verified` |
| Lun–Vie | 18:00–19:00 | Popeye, el marino | La Hora Boomerang | F1 | `verified` |
| Lun–Sáb | 19:00–19:30 | Meteoro | Boomeraction | F1 | `verified` |
| Lun–Vie | 19:30–20:00 | Cazafantasmas: la nueva generación | Boomeraction | F1 | `verified` |
| Lun–Vie | 20:00–21:00 | Los Picapiedra |  | F1 | `verified` |
| Lun–Vie | 21:00–22:00 | Los Supersónicos |  | F1 | `verified` |
| Lun–Vie | 22:00–23:00 | _(contenido del bloque)_ | Rodeo Cartoon de Hanna-Barbera | F1 | `verified` |
| Lun–Vie | 23:00–23:30 | Kimba, el león blanco |  | F1 | `verified` |
| Lun–Vie | 23:30–00:00 | El show de Underdog |  | F1 | `verified` |
| Lun–Sáb | 00:00–01:00 | _(contenido del bloque)_ | CineBoom | F1 | `verified` |
| Lun–Vie | 01:00–02:00 | Garfield y sus amigos |  | F1 | `verified` |
| Lun–Vie | 02:00–03:00 | Popeye, el marino | La Hora Boomerang | F1 | `verified` |
| Lun–Sáb | 03:00–03:30 | Meteoro | Boomeraction | F1 | `verified` |
| Lun–Vie | 03:30–04:00 | Cazafantasmas: la nueva generación | Boomeraction | F1 | `verified` |
| Lun–Vie | 04:00–05:00 | Los Picapiedra |  | F1 | `verified` |
| Lun–Vie | 05:00 | Los Supersónicos |  | F1 | `verified` |
| Sáb | 06:00–07:00 | El perro Dinky |  | F1 | `verified` |
| Sáb | 07:00–08:00 | Los Cariñositos |  | F1 | `verified` |
| Sáb | 09:00–10:00 | Popeye, el marino |  | F1 | `verified` |
| Sáb | 10:00–11:00 | Los 4 Fantásticos | Boomeraction | F1 | `verified` |
| Sáb | 11:30–12:00 | Meteoro | Boomeraction | F1 | `verified` |
| Sáb | 12:00–13:00 | Mistertibu |  | F1 | `verified` |
| Sáb | 13:00–14:00 | La Pantera Rosa |  | F1 | `verified` |
| Sáb | 14:00–15:00 | El perro Dinky |  | F1 | `verified` |
| Sáb | 15:00–16:00 | Los Cariñositos |  | F1 | `verified` |
| Sáb | 17:00–18:00 | Popeye, el marino |  | F1 | `verified` |
| Sáb | 18:00–19:00 | Los 4 Fantásticos | Boomeraction | F1 | `verified` |
| Sáb | 19:30–20:00 | Meteoro | Boomeraction | F1 | `verified` |
| Sáb | 20:00–21:00 | Mistertibu |  | F1 | `verified` |
| Sáb | 21:00–22:00 | La Pantera Rosa |  | F1 | `verified` |
| Sáb | 22:00–23:00 | El perro Dinky |  | F1 | `verified` |
| Sáb | 23:00–00:00 | Los Cariñositos |  | F1 | `verified` |
| Sáb | 01:00–02:00 | Popeye, el marino |  | F1 | `verified` |
| Sáb | 02:00–03:00 | Los 4 Fantásticos | Boomeraction | F1 | `verified` |
| Sáb | 03:30–04:00 | Meteoro | Boomeraction | F1 | `verified` |
| Sáb | 04:00–05:00 | Mistertibu |  | F1 | `verified` |
| Sáb | 05:00 | La Pantera Rosa |  | F1 | `verified` |
| Dom | 06:00–07:00 | Rocky y Bullwinkle |  | F1 | `verified` |
| Dom | 07:00–08:00 | Tom y Jerry |  | F1 | `verified` |
| Dom | 08:00–09:00 | Gasparín y sus amigos |  | F1 | `verified` |
| Dom | 09:00–10:00 | El Capitán Planeta |  | F1 | `verified` |
| Dom | 10:00–11:00 | Shazzan | Boomeraction | F1 | `verified` |
| Dom | 11:00–12:00 | Birdman y el trío Galaxia | Boomeraction | F1 | `verified` |
| Dom | 12:00–13:00 | Los Supersónicos |  | F1 | `verified` |
| Dom | 13:00–14:00 | Los Picapiedra |  | F1 | `verified` |
| Dom | 14:00–15:00 | Rocky y Bullwinkle |  | F1 | `verified` |
| Dom | 15:00–16:00 | Tom y Jerry |  | F1 | `verified` |
| Dom | 16:00–17:00 | Gasparín y sus amigos |  | F1 | `verified` |
| Dom | 17:00–18:00 | El Capitán Planeta |  | F1 | `verified` |
| Dom | 18:00–19:00 | Shazzan | Boomeraction | F1 | `verified` |
| Dom | 19:00–20:00 | Birdman y el trío Galaxia | Boomeraction | F1 | `verified` |
| Dom | 20:00–21:00 | Los Supersónicos |  | F1 | `verified` |
| Dom | 21:00–22:00 | Los Picapiedra |  | F1 | `verified` |
| Dom | 22:00–23:00 | Rocky y Bullwinkle |  | F1 | `verified` |
| Dom | 23:00–00:00 | Tom y Jerry |  | F1 | `verified` |
| Dom | 00:00–01:00 | Gasparín y sus amigos |  | F1 | `verified` |
| Dom | 01:00–02:00 | El Capitán Planeta |  | F1 | `verified` |
| Dom | 02:00–03:00 | Shazzan | Boomeraction | F1 | `verified` |
| Dom | 03:00–04:00 | Birdman y el trío Galaxia | Boomeraction | F1 | `verified` |
| Dom | 04:00–05:00 | Los Supersónicos |  | F1 | `verified` |
| Dom | 05:00 | Los Picapiedra |  | F1 | `verified` |

### Período: abril 2006 (relanzamiento del 3/4/2006)

- **Fuente:** F1, [Grilla de Boomerang, Abril de 2006](https://cartoonnetwork.fandom.com/es/wiki/Grilla_de_Boomerang,_Abril_de_2006). Cita: [ref. 1](https://web.archive.org/web/20060522203232/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm), [ref. 2](https://web.archive.org/web/20060412075642/http://www.cablemagico.com.pe:8002/cmagico/owa/fconsulta?tipo_consulta=in&dia=4&unmes=4).
- **Región de las fuentes citadas:** LatAm. Cita Cablevisión México y Cable Mágico (Perú). Contra Cablevisión Monterrey del 3/4/2006 coinciden 37 de 45 franjas con −3 h.
- **Notas:** Primera grilla de 24 horas, sin el ciclo de 8 horas: bloque preescolar Mini TV por la mañana, series juveniles por la tarde y clásicos de madrugada.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Todos los días | 06:00–06:30 | Garfield y sus amigos |  | F1 | `verified` |
| Lun–Vie | 06:30–07:00 | El autobús mágico |  | F1 | `verified` |
| Todos los días | 07:00–07:30 | Preston Pig (Mini TV) |  | F1 | `verified` |
| Todos los días | 07:30–08:00 | Las tres mellizas (Mini TV) |  | F1 | `verified` |
| Todos los días | 08:00–09:00 | La película de la mañana |  | F1 | `verified` |
| Todos los días | 09:00–09:30 | Dragón (2004) (Mini TV) |  | F1 | `verified` |
| Todos los días | 09:30–10:00 | Miffy y sus amigos (Mini TV) |  | F1 | `verified` |
| Todos los días | 10:00–10:30 | Max y Ruby (Mini TV) |  | F1 | `verified` |
| Todos los días | 10:30–11:00 | Peppa Cerdita (Mini TV) |  | F1 | `verified` |
| Todos los días | 11:00–11:30 | Los pies mágicos de Franny (Mini TV) |  | F1 | `verified` |
| Todos los días | 11:30–12:00 | Tom el tractor (Mini TV) |  | F1 | `verified` |
| Todos los días | 12:00–12:30 | Mona la vampira |  | F1 | `verified` |
| Lun–Vie | 12:30–13:00 | El autobús mágico |  | F1 | `verified` |
| Lun–Sáb | 13:00–13:30 | El lagartijo de Ned |  | F1 | `verified` |
| Lun–Vie | 13:30–14:00 | Scooby-Doo |  | F1 | `verified` |
| Lun–Sáb | 14:00–14:30 | Mascotas extraterrestres |  | F1 | `verified` |
| Lun–Sáb | 14:30–15:00 | Jumanji, la serie animada |  | F1 | `verified` |
| Lun–Sáb | 15:00–15:30 | Las aventuras de Jackie Chan |  | F1 | `verified` |
| Lun–Vie | 15:30–16:00 | El mundo de Beakman |  | F1 | `verified` |
| Lun–Vie | 16:00–16:30 | Betty Atómica |  | F1 | `verified` |
| Lun–Vie | 16:30–17:00 | Sakura Card Captors |  | F1 | `verified` |
| Lun–Vie | 17:00–17:30 | El club Winx |  | F1 | `verified` |
| Lun–Vie | 17:30–18:00 | Cosas de chicos y chicas |  | F1 | `verified` |
| Lun–Sáb | 18:00–18:30 | Las nuevas aventuras de Flipper |  | F1 | `verified` |
| Lun–Vie | 18:30–19:00 | Harry y los Hendersons |  | F1 | `verified` |
| Lun–Vie | 19:00–19:30 | El club del dormitorio |  | F1 | `verified` |
| Lun–Vie | 19:30–20:00 | Blue Water High: Escuela de surf |  | F1 | `verified` |
| Lun–Vie | 20:00–20:30 | Intercambio extranjero |  | F1 | `verified` |
| Lun–Vie | 20:30–21:00 | Mis padres son extraterrestres |  | F1 | `verified` |
| Lun–Sáb | 21:00–21:30 | Harry y los Hendersons |  | F1 | `verified` |
| Lun–Sáb | 21:30–22:00 | Las nuevas aventuras de Flipper |  | F1 | `verified` |
| Lun–Vie, Dom | 22:00–22:30 | El club del dormitorio |  | F1 | `verified` |
| Lun–Vie | 22:30–23:00 | Blue Water High: Escuela de surf |  | F1 | `verified` |
| Lun–Vie | 23:00–23:30 | Intercambio extranjero |  | F1 | `verified` |
| Lun–Vie | 23:30–00:00 | Mis padres son extraterrestres |  | F1 | `verified` |
| Todos los días | 00:00–00:30 | Tom y Jerry |  | F1 | `verified` |
| Todos los días | 00:30–01:00 | Bugs Bunny y el Pato Lucas |  | F1 | `verified` |
| Todos los días | 01:00–01:30 | La Pantera Rosa |  | F1 | `verified` |
| Todos los días | 01:30–02:00 | Mr. Magoo |  | F1 | `verified` |
| Lun–Vie | 02:00–02:30 | Popeye, el marino |  | F1 | `verified` |
| Todos los días | 02:30–03:00 | Los autos locos |  | F1 | `verified` |
| Todos los días | 03:00–03:30 | Jonny Quest |  | F1 | `verified` |
| Todos los días | 03:30–04:00 | Los Centuriones |  | F1 | `verified` |
| Todos los días | 04:00–04:30 | James Bond Jr. |  | F1 | `verified` |
| Lun–Vie | 04:30–05:00 | Familia Partridge en el año 2200 |  | F1 | `verified` |
| Todos los días | 05:00–05:30 | Los Picapiedra |  | F1 | `verified` |
| Todos los días | 05:30 | Los Supersónicos |  | F1 | `verified` |
| Sáb, Dom | 06:30–07:00 | La pequeña Lulú |  | F1 | `verified` |
| Sáb, Dom | 12:30–13:00 | Scooby-Doo |  | F1 | `verified` |
| Sáb | 13:30–14:00 | Corneil y Bernie |  | F1 | `verified` |
| Sáb | 15:30–16:00 | Betty Atómica |  | F1 | `verified` |
| Sáb | 16:00–16:30 | El club Winx |  | F1 | `verified` |
| Sáb | 16:30–17:00 | El mundo de Beakman |  | F1 | `verified` |
| Sáb | 17:00–17:30 | Harry y los Hendersons |  | F1 | `verified` |
| Sáb | 17:30–18:00 | Mis padres son extraterrestres |  | F1 | `verified` |
| Sáb | 18:30–19:00 | Intercambio extranjero |  | F1 | `verified` |
| Sáb | 19:00–21:00 | _(contenido del bloque)_ | Película Boomerang | F1 | `verified` |
| Sáb | 22:00–22:30 | Mis padres son extraterrestres |  | F1 | `verified` |
| Sáb | 22:30–23:00 | Intercambio extranjero |  | F1 | `verified` |
| Sáb | 23:00–23:30 | El club del dormitorio |  | F1 | `verified` |
| Sáb | 23:30–00:00 | Blue Water High: Escuela de surf |  | F1 | `verified` |
| Sáb, Dom | 02:00–02:30 | Los Locos Totalmente Animados |  | F1 | `verified` |
| Sáb, Dom | 04:30–05:00 | Jeannie (animado) |  | F1 | `verified` |
| Dom | 13:00–15:00 | Película Boomerang (repetición) |  | F1 | `verified` |
| Dom | 15:00–15:30 | Mis padres son extraterrestres |  | F1 | `verified` |
| Dom | 15:30–16:00 | Harry y los Hendersons |  | F1 | `verified` |
| Dom | 16:00–18:00 | El club del dormitorio |  | F1 | `verified` |
| Dom | 18:00–20:00 | Película Boomerang (repetición) |  | F1 | `verified` |
| Dom | 20:00–20:30 | Mis padres son extraterrestres |  | F1 | `verified` |
| Dom | 20:30–21:00 | Las nuevas aventuras de Flipper |  | F1 | `verified` |
| Dom | 21:00–22:00 | El club del dormitorio |  | F1 | `verified` |
| Dom | 22:30–23:00 | El club del dormitorio |  | F1 | `verified` |
| Dom | 23:00–23:30 | Harry y los Hendersons |  | F1 | `verified` |
| Dom | 23:30–00:00 | Las nuevas aventuras de Flipper |  | F1 | `verified` |

### Día verificado: Boomerang, jueves 21/10/2004 (México)

- **Fuente:** F3, guía diaria de Cablevisión Monterrey (México) para el jueves 21 octubre 2004, [captura de Wayback Machine](https://web.archive.org/web/20041022194208/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm).
- **Señal / zona horaria:** la que recibía Cablevisión Monterrey, hora local de Monterrey. La guía lista el día de 00:00 a 23:30 del calendario, así que las primeras filas son la madrugada posterior al día anterior. No trae nombres de bloque.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Jue | 00:00–01:00 | Totally Tooned In Show |  | F3 | `verified` |
| Jue | 01:00–01:30 | Los Piratas de las Aguas tenebrosas |  | F3 | `verified` |
| Jue | 01:30–02:00 | El Show de Underdog |  | F3 | `verified` |
| Jue | 02:00–03:00 | El Inspector |  | F3 | `verified` |
| Jue | 03:00–04:00 | Los cariñositos |  | F3 | `verified` |
| Jue | 04:00–05:00 | Huckleberry Hound |  | F3 | `verified` |
| Jue | 05:00–06:00 | Las aventuras de Ricky Ricón |  | F3 | `verified` |
| Jue | 06:00–06:30 | Los Centuriones |  | F3 | `verified` |
| Jue | 06:30–07:00 | G-Force: Guardianes del Espacio |  | F3 | `verified` |
| Jue | 07:00–08:00 | El lagarto Juancho |  | F3 | `verified` |
| Jue | 08:00–09:00 | Totally Tooned In Show |  | F3 | `verified` |
| Jue | 09:00–09:30 | Los Piratas de las Aguas tenebrosas |  | F3 | `verified` |
| Jue | 09:30–10:00 | El Show de Underdog |  | F3 | `verified` |
| Jue | 10:00–11:00 | El Inspector |  | F3 | `verified` |
| Jue | 11:00–12:00 | Los cariñositos |  | F3 | `verified` |
| Jue | 12:00–13:00 | Huckleberry Hound |  | F3 | `verified` |
| Jue | 13:00–14:00 | Las aventuras de Ricky Ricón |  | F3 | `verified` |
| Jue | 14:00–14:30 | Los Centuriones |  | F3 | `verified` |
| Jue | 14:30–15:00 | G-Force: Guardianes del Espacio |  | F3 | `verified` |
| Jue | 15:00–16:00 | El lagarto Juancho |  | F3 | `verified` |
| Jue | 16:00–17:00 | Totally Tooned In Show |  | F3 | `verified` |
| Jue | 17:00–17:30 | Los Piratas de las Aguas tenebrosas |  | F3 | `verified` |
| Jue | 17:30–18:00 | El Show de Underdog |  | F3 | `verified` |
| Jue | 18:00–19:00 | El Inspector |  | F3 | `verified` |
| Jue | 19:00–20:00 | Los cariñositos |  | F3 | `verified` |
| Jue | 20:00–21:00 | Huckleberry Hound |  | F3 | `verified` |
| Jue | 21:00–22:00 | Mandibulín |  | F3 | `verified` |
| Jue | 22:00–22:30 | Los Centuriones |  | F3 | `verified` |
| Jue | 22:30–23:00 | G-Force: Guardianes del Espacio |  | F3 | `verified` |
| Jue | 23:00 | El lagarto Juancho |  | F3 | `verified` |

## Fox Kids Latinoamérica

F6 documenta los bloques de 2000-2004: Súper Chiflados, Clásicos de la Medianoche, Girl Power, Insomnio, Cineskopio, Invasión Animé, Mysteria, ¿Quién tiene el control? y Doble Carga. F4 aporta tres grillas completas con los bloques nombrados. F3 aporta cuatro días verificados de la señal mexicana (diciembre 2003 a junio 2004).

### Período: agosto 2001

- **Fuente:** F4, [Programación de Fox Kids Latinoamérica | Agosto 2001](https://forogrilladecanales.blogspot.com/2025/03/programacion-de-fox-kids-latinoamerica.html). El post indica como origen `http://www.foxkidstv.com` y no enlaza capturas.
- **Señal / zona horaria:** Sin indicar. Por la comparación de 2003-2004 (ver más abajo), las grillas de este blog para Fox Kids están en la Zona Sur.
- **Notas:** Todos los bloques de la época aparecen con nombre: Girl Power, Súper Chiflados, Invasión Animé, Mysteria, Clásicos a la Medianoche, Insomnio y Cineskopio.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Vie | 06:00–06:30 | La Abejita Hutch |  | F4 | `probable` |
| Lun–Vie | 06:30–07:00 | La Princesa Sissi |  | F4 | `probable` |
| Lun–Vie | 07:00–07:30 | Gasparín |  | F4 | `probable` |
| Lun–Vie | 07:30–08:00 | La Familia Por Qué? |  | F4 | `probable` |
| Lun–Vie | 08:00–09:00 | It's Itsy Bitsy Time! |  | F4 | `probable` |
| Lun, Mié, Vie | 09:00–09:30 | Gemelas en Apuros | Girl Power | F4 | `probable` |
| Lun–Vie | 09:30–10:00 | Escuadrón Sobre Ruedas | Girl Power | F4 | `probable` |
| Lun, Mié, Vie | 10:00–10:30 | Dientes de Lata | Girl Power | F4 | `probable` |
| Lun–Vie | 10:30–11:00 | Angela Anaconda | Girl Power | F4 | `probable` |
| Lun–Vie | 11:00–11:30 | Súper Cerdita | Súper Chiflados | F4 | `probable` |
| Lun–Vie | 11:30–12:00 | Jim Botón | Súper Chiflados | F4 | `probable` |
| Lun, Mié, Vie | 12:00–12:30 | Oggy y Las Cucarachas | Súper Chiflados | F4 | `probable` |
| Lun–Vie | 12:30–13:00 | El Pájaro Loco (Clásico) | Súper Chiflados | F4 | `probable` |
| Lun–Vie | 13:00–13:30 | El Nuevo Show del Pájaro Loco | Súper Chiflados | F4 | `probable` |
| Lun, Mié, Vie | 13:30–14:00 | Los Mega Bebés | Súper Chiflados | F4 | `probable` |
| Lun, Mié, Vie | 14:00–14:30 | El Mundo de Bobby | Súper Chiflados | F4 | `probable` |
| Lun–Vie | 14:30–15:00 | Los Nuevos Locos Addams |  | F4 | `probable` |
| Lun–Vie | 15:00–15:30 | Las Aventuras de Shirley Holmes |  | F4 | `probable` |
| Lun–Vie | 15:30–16:00 | Súper Cerdita |  | F4 | `probable` |
| Lun, Mié, Vie | 16:00–16:30 | El Nuevo Action Man |  | F4 | `probable` |
| Lun–Vie | 16:30–17:00 | Power Rangers: La Galaxia Perdida |  | F4 | `probable` |
| Todos los días | 17:00–17:30 | Power Rangers: A la Velocidad de la Luz |  | F4 | `probable` |
| Todos los días | 17:30–18:00 | Digimon 02 | Invasión Animé | F4 | `probable` |
| Todos los días | 18:00–18:30 | Monster Rancher | Invasión Animé | F4 | `probable` |
| Todos los días | 18:30–19:00 | Flint: El Detective del Tiempo | Invasión Animé | F4 | `probable` |
| Todos los días | 19:00–19:30 | Patlabor | Invasión Animé | F4 | `probable` |
| Todos los días | 19:30–20:00 | Dinozaurs | Invasión Animé | F4 | `probable` |
| Lun–Jue | 20:00–20:30 | El Mundo Secreto de Alex Mack | Mysteria | F4 | `probable` |
| Lun–Vie | 20:30–21:00 | Las Aventuras de Shirley Holmes | Mysteria | F4 | `probable` |
| Lun–Vie | 21:00–21:30 | Escalofríos | Mysteria | F4 | `probable` |
| Lun–Vie, Dom | 21:30–22:00 | Digimon |  | F4 | `probable` |
| Lun–Vie | 22:00–22:30 | Patlabor |  | F4 | `probable` |
| Lun–Vie | 22:30–23:00 | Power Rangers: A la Velocidad de la Luz |  | F4 | `probable` |
| Lun–Vie | 23:00–23:30 | El Hombre Araña y sus Increíbles Amigos | Clásicos a la Medianoche | F4 | `probable` |
| Lun | 23:30–00:00 | La Mujer Araña | Clásicos a la Medianoche | F4 | `probable` |
| Lun–Vie | 00:00–00:30 | Los 4 Fantásticos | Insomnio | F4 | `probable` |
| Lun–Vie | 00:30–01:00 | Los Tres Chiflados | Insomnio | F4 | `probable` |
| Lun–Vie | 01:00–01:30 | Batman | Insomnio | F4 | `probable` |
| Lun–Vie | 01:30–02:00 | El Zorro | Insomnio | F4 | `probable` |
| Lun–Vie | 02:00–02:30 | El Gordo y El Flaco | Insomnio | F4 | `probable` |
| Lun–Vie | 02:30–03:00 | Los Locos Addams | Insomnio | F4 | `probable` |
| Lun–Vie | 03:00–03:30 | Los Munsters | Insomnio | F4 | `probable` |
| Lun–Vie | 03:30–04:00 | El Hombre Araña y sus Increíbles Amigos | Insomnio | F4 | `probable` |
| Lun–Vie | 04:00–04:30 | Mortadelo y Filemón | Insomnio | F4 | `probable` |
| Lun–Vie | 04:30–05:00 | Dilbert | Insomnio | F4 | `probable` |
| Lun–Vie | 05:00–05:30 | Hulk el Hombre Increíble | Insomnio | F4 | `probable` |
| Lun–Vie | 05:30 | Batman | Insomnio | F4 | `probable` |
| Mar, Jue | 09:00–09:30 | Hannah y Grace | Girl Power | F4 | `probable` |
| Mar, Jue | 10:00–10:30 | Mimi | Girl Power | F4 | `probable` |
| Mar, Jue | 12:00–12:30 | Toonsylvania | Súper Chiflados | F4 | `probable` |
| Mar, Jue | 13:30–14:00 | Wunschpunsch | Súper Chiflados | F4 | `probable` |
| Mar, Jue | 14:00–14:30 | Travesuras del Aula 402 | Súper Chiflados | F4 | `probable` |
| Mar, Jue | 16:00–16:30 | Kong |  | F4 | `probable` |
| Mar | 23:30–00:00 | El Hombre de Hierro | Clásicos a la Medianoche | F4 | `probable` |
| Mié | 23:30–00:00 | El Poderoso Thor | Clásicos a la Medianoche | F4 | `probable` |
| Jue | 23:30–00:00 | Robocop: La Serie Animada | Clásicos a la Medianoche | F4 | `probable` |
| Vie | 20:00–20:30 | Historias de Miedo | Mysteria | F4 | `probable` |
| Vie | 23:30–00:00 | El Hombre Araña | Clásicos a la Medianoche | F4 | `probable` |
| Sáb | 06:00–06:30 | El Mundo de Bobby |  | F4 | `probable` |
| Sáb | 06:30–07:00 | La Granja de los Monstruos |  | F4 | `probable` |
| Sáb | 07:00–07:30 | El Pájaro Loco (clásico) |  | F4 | `probable` |
| Sáb | 07:30–08:00 | Los Mega Bebés |  | F4 | `probable` |
| Sáb | 08:00–08:30 | Wunschpunsch |  | F4 | `probable` |
| Sáb | 08:30–09:00 | Travesuras del Aula 402 |  | F4 | `probable` |
| Sáb | 09:00–09:30 | Mimi |  | F4 | `probable` |
| Sáb | 09:30–10:00 | Los Cerditos de al Lado |  | F4 | `probable` |
| Sáb | 10:00–10:30 | La Pareja Dispareja |  | F4 | `probable` |
| Sáb, Dom | 10:30–11:00 | Toonsylvania |  | F4 | `probable` |
| Sáb, Dom | 11:00–11:30 | Súper Cerdita |  | F4 | `probable` |
| Sáb, Dom | 11:30–12:00 | Angela Anaconda |  | F4 | `probable` |
| Sáb, Dom | 12:00–12:30 | Oggy y Las Cucarachas |  | F4 | `probable` |
| Sáb, Dom | 12:30–13:00 | El Pájaro Loco (clásico) |  | F4 | `probable` |
| Sáb, Dom | 13:00–13:30 | El Nuevo Show del Pájaro Loco |  | F4 | `probable` |
| Sáb, Dom | 13:30–14:00 | Los Mega Bebés |  | F4 | `probable` |
| Sáb, Dom | 14:00–14:30 | El Mundo de Bobby |  | F4 | `probable` |
| Sáb | 14:30–15:00 | Los Archivos Secretos de los Perros Espías |  | F4 | `probable` |
| Sáb | 15:00–16:30 | Cineskopio | Cineskopio | F4 | `probable` |
| Sáb, Dom | 16:30–17:00 | Power Rangers: En el Espacio |  | F4 | `probable` |
| Sáb | 20:00–22:00 | Historias del Miedo | Mysteria | F4 | `probable` |
| Sáb | 22:00–22:30 | Escalofríos | Mysteria | F4 | `probable` |
| Sáb | 22:30–23:00 | Las Aventuras de Shirley Holmes | Mysteria | F4 | `probable` |
| Sáb | 23:00–23:30 | Historias del Miedo | Mysteria | F4 | `probable` |
| Sáb | 23:30–00:00 | El Mundo Secreto de Alex Mack | Mysteria | F4 | `probable` |
| Sáb | 00:00–02:00 | Historias del Miedo | Mysteria | F4 | `probable` |
| Sáb, Dom | 02:00–02:30 | Los 4 Fantásticos |  | F4 | `probable` |
| Sáb, Dom | 02:30–03:00 | El Pájaro Loco (clásico) |  | F4 | `probable` |
| Sáb, Dom | 03:00–03:30 | El Nuevo Show del Pájaro Loco |  | F4 | `probable` |
| Sáb, Dom | 03:30–04:00 | La Mujer Araña |  | F4 | `probable` |
| Sáb, Dom | 04:00–04:30 | Los 4 Fantásticos |  | F4 | `probable` |
| Sáb, Dom | 04:30–05:00 | El Pájaro Loco (clásico) |  | F4 | `probable` |
| Sáb, Dom | 05:00–05:30 | Travesuras del Aula 402 |  | F4 | `probable` |
| Sáb, Dom | 05:30 | Angela Anaconda |  | F4 | `probable` |
| Dom | 06:00–10:00 | ¿Quién Tiene el Control? |  | F4 | `probable` |
| Dom | 10:00–10:30 | Las Travesuras de Barki |  | F4 | `probable` |
| Dom | 14:30–15:00 | El Nuevo Action Man |  | F4 | `probable` |
| Dom | 15:00–15:30 | NASCAR Racers |  | F4 | `probable` |
| Dom | 15:30–16:00 | Autopista |  | F4 | `probable` |
| Dom | 16:00–16:30 | Wishbone |  | F4 | `probable` |
| Dom | 20:00–20:30 | Autopista | Invasión Animé | F4 | `probable` |
| Dom | 20:30–21:00 | Shinzo | Invasión Animé | F4 | `probable` |
| Dom | 21:00–21:30 | Los Luchadores |  | F4 | `probable` |
| Dom | 22:00–22:30 | Historias de Miedo |  | F4 | `probable` |
| Dom | 22:30–23:00 | Cuentos de la Cripta |  | F4 | `probable` |
| Dom | 23:00–23:30 | Toonsylvania |  | F4 | `probable` |
| Dom | 23:30–00:00 | Eerie, Indiana: La Otra Dimensión |  | F4 | `probable` |
| Dom | 00:00–00:30 | X-Men |  | F4 | `probable` |
| Dom | 00:30–01:30 | Batman |  | F4 | `probable` |
| Dom | 01:30–02:00 | El Pájaro Loco (clásico) |  | F4 | `probable` |

### Período: enero 2003

- **Fuente:** F4, [Programación de Fox Kids | Enero 2003](https://forogrilladecanales.blogspot.com/2022/12/programacion-de-fox-kids-enero-2003.html). El post indica como origen `www.foxkidstv.com` y no enlaza capturas.
- **Señal / zona horaria:** Zona Sur probable. Contra Cablevisión Monterrey del 11/12/2003 (Zona Norte, México) el orden del día coincide con +4 h de desfase (20 de 47 franjas coinciden un mes antes).
- **Notas:** Insomnio pasa a la franja de 20:00 en adelante; Invasión Animé ocupa la tarde.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Todos los días | 06:00–07:00 | El Pájaro Loco |  | F4 | `probable` |
| Lun–Vie | 07:00–07:30 | El Escuadrón Sobre Ruedas |  | F4 | `probable` |
| Lun–Vie | 07:30–08:00 | Dientes de Lata | Girl Power | F4 | `probable` |
| Lun, Mié, Vie | 08:00–08:30 | Gemelas en Apuros | Girl Power | F4 | `probable` |
| Lun–Vie | 08:30–09:00 | Ángela Anaconda | Girl Power | F4 | `probable` |
| Lun, Mié, Vie | 09:00–09:30 | Los Súper Sumos |  | F4 | `probable` |
| Lun–Vie | 09:30–10:00 | El Nuevo Show del Pájaro Loco |  | F4 | `probable` |
| Lun–Vie | 10:00–10:30 | Los Padrinos Mágicos |  | F4 | `probable` |
| Lun–Vie | 10:30–11:00 | Las Locuras de Andy |  | F4 | `probable` |
| Lun–Vie | 11:00–11:30 | Los Patos Extremos |  | F4 | `probable` |
| Lun–Vie | 11:30–12:00 | Travesuras del Aula 402 |  | F4 | `probable` |
| Lun–Vie | 12:00–12:30 | Ángela Anaconda |  | F4 | `probable` |
| Lun–Vie | 12:30–13:00 | El Hombre Araña |  | F4 | `probable` |
| Lun, Mié, Vie | 13:00–13:30 | Heavy Gear |  | F4 | `probable` |
| Todos los días | 13:30–14:00 | Power Rangers: Fuerza del Tiempo |  | F4 | `probable` |
| Todos los días | 14:00–14:30 | Power Rangers: Fuerza Salvaje |  | F4 | `probable` |
| Todos los días | 14:30–15:00 | Digimon 3 | Invasión Animé | F4 | `probable` |
| Todos los días | 15:00–15:30 | Beyblade | Invasión Animé | F4 | `probable` |
| Todos los días | 15:30–16:00 | Medabots | Invasión Animé | F4 | `probable` |
| Todos los días | 16:00–16:30 | Shaman King | Invasión Animé | F4 | `probable` |
| Todos los días | 16:30–17:00 | Shinzo | Invasión Animé | F4 | `probable` |
| Lun–Vie | 17:00–17:30 | Los Caballeros del Mundo Mon | Invasión Animé | F4 | `probable` |
| Lun–Vie | 17:30–18:00 | Transformers: Nueva Generación | Invasión Animé | F4 | `probable` |
| Lun–Vie | 18:00–18:30 | Digimon 2 | Invasión Animé | F4 | `probable` |
| Lun–Vie | 18:30–19:00 | Digimon 3 | Invasión Animé | F4 | `probable` |
| Lun–Vie | 19:00–19:30 | Shin-Chan | Invasión Animé | F4 | `probable` |
| Lun–Vie | 19:30–20:00 | Power Rangers: Fuerza Salvaje |  | F4 | `probable` |
| Lun–Vie | 20:00–20:30 | Los Tres Chiflados | Insomnio | F4 | `probable` |
| Lun–Vie | 20:30–21:00 | El Zorro | Insomnio | F4 | `probable` |
| Lun–Vie | 21:00–21:30 | Batman | Insomnio | F4 | `probable` |
| Lun–Vie | 21:30–22:00 | Hulk: El Hombre Increible | Insomnio | F4 | `probable` |
| Lun–Vie | 22:00–22:30 | El Hombre Araña | Insomnio | F4 | `probable` |
| Lun–Vie | 22:30–23:00 | El Zorro | Insomnio | F4 | `probable` |
| Lun–Vie | 23:00–23:30 | Los Tres Chiflados | Insomnio | F4 | `probable` |
| Lun–Vie | 23:30–00:00 | Digimon 3 | Invasión Animé | F4 | `probable` |
| Lun–Vie | 00:00–00:30 | Beyblade | Invasión Animé | F4 | `probable` |
| Lun–Vie | 00:30–01:00 | Medabots | Invasión Animé | F4 | `probable` |
| Lun–Vie | 01:00–01:30 | Shaman King | Invasión Animé | F4 | `probable` |
| Lun–Vie | 01:30–02:00 | Shinzo | Invasión Animé | F4 | `probable` |
| Lun–Vie | 02:00–02:30 | Los Caballeros del Mundo Mon | Invasión Animé | F4 | `probable` |
| Lun–Vie | 02:30–03:00 | Transformers: Nueva Generación | Invasión Animé | F4 | `probable` |
| Lun–Vie | 03:00–03:30 | Escuadrón al Aire |  | F4 | `probable` |
| Lun–Vie | 03:30–04:00 | Kong |  | F4 | `probable` |
| Lun–Vie | 04:00–04:30 | El Escuadrón Sobre Ruedas |  | F4 | `probable` |
| Lun–Vie | 04:30–05:00 | Digimon 2 |  | F4 | `probable` |
| Lun–Vie | 05:00–05:30 | Power Rangers: Fuerza del Tiempo |  | F4 | `probable` |
| Lun–Vie | 05:30 | Power Rangers: Fuerza Salvaje |  | F4 | `probable` |
| Mar, Jue | 08:00–08:30 | Mary Kate y Ashley: ¡En Acción! | Girl Power | F4 | `probable` |
| Mar, Jue | 09:00–09:30 | Mellizos Cramp |  | F4 | `probable` |
| Mar, Jue | 13:00–13:30 | Autopista |  | F4 | `probable` |
| Sáb, Dom | 06:30–07:00 | Monster Rancher |  | F4 | `probable` |
| Sáb, Dom | 07:00–07:30 | El Hombre Araña sin Limites |  | F4 | `probable` |
| Sáb, Dom | 07:30–08:00 | La Momia |  | F4 | `probable` |
| Sáb | 08:00–12:00 | ¿Quién Tiene el Control? |  | F4 | `probable` |
| Sáb, Dom | 12:00–12:30 | Tres Espías sin Limite | Girl Power | F4 | `probable` |
| Sáb, Dom | 12:30–13:00 | Dientes de Lata | Girl Power | F4 | `probable` |
| Sáb | 13:00–13:30 | Mary Kate y Ashley: ¡En Acción | Girl Power | F4 | `probable` |
| Sáb, Dom | 17:00–19:30 | Escalofríos |  | F4 | `probable` |
| Sáb, Dom | 19:30–20:00 | Gárgolas: Héroes Góticos |  | F4 | `probable` |
| Sáb, Dom | 20:00–20:30 | Evolución |  | F4 | `probable` |
| Sáb, Dom | 20:30–21:30 | Los Nuevos Locos Addams | Insomnio | F4 | `probable` |
| Sáb, Dom | 21:30–22:30 | Los Tres Chiflados | Insomnio | F4 | `probable` |
| Sáb, Dom | 22:30–23:00 | Batman | Insomnio | F4 | `probable` |
| Sáb, Dom | 23:00–23:30 | Dilbert | Insomnio | F4 | `probable` |
| Sáb, Dom | 23:30–00:00 | Power Rangers: Fuerza del Tiempo |  | F4 | `probable` |
| Sáb, Dom | 00:00–00:30 | Power Rangers: Fuerza Salvaje |  | F4 | `probable` |
| Sáb, Dom | 00:30–01:00 | Digimon 3 | Invasión Animé | F4 | `probable` |
| Sáb, Dom | 01:00–01:30 | Beyblade | Invasión Animé | F4 | `probable` |
| Sáb, Dom | 01:30–02:00 | Medabots | Invasión Animé | F4 | `probable` |
| Sáb, Dom | 02:00–02:30 | Shaman King | Invasión Animé | F4 | `probable` |
| Sáb, Dom | 02:30–03:00 | Shinzo | Invasión Animé | F4 | `probable` |
| Sáb, Dom | 03:00–03:30 | Toonsylvania |  | F4 | `probable` |
| Sáb, Dom | 03:30–04:00 | Travesuras del Aula 402 |  | F4 | `probable` |
| Sáb, Dom | 04:00–04:30 | Mellizos Cramp |  | F4 | `probable` |
| Sáb, Dom | 04:30–05:30 | Los Súper Sumos |  | F4 | `probable` |
| Sáb, Dom | 05:30 | El Pájaro Loco |  | F4 | `probable` |
| Dom | 08:00–08:30 | Power Rangers: Fuerza del Tiempo |  | F4 | `probable` |
| Dom | 08:30–09:00 | Power Rangers: Fuerza Salvaje |  | F4 | `probable` |
| Dom | 09:00–09:30 | Patlabor |  | F4 | `probable` |
| Dom | 09:30–10:00 | Flint: El Detective del Tiempo |  | F4 | `probable` |
| Dom | 10:00–10:30 | Autopista |  | F4 | `probable` |
| Dom | 10:30–11:00 | Masked Rider |  | F4 | `probable` |
| Dom | 11:00–11:30 | Digimon 2 |  | F4 | `probable` |
| Dom | 11:30–12:00 | Digimon 3 |  | F4 | `probable` |
| Dom | 13:00–13:30 | Mary Kate y Ashley: ¡En Acción! | Girl Power | F4 | `probable` |

### Día verificado: Fox Kids, jueves 11/12/2003 (México)

- **Fuente:** F3, guía diaria de Cablevisión Monterrey (México) para el jueves 11 diciembre 2003, [captura de Wayback Machine](https://web.archive.org/web/20031212124226/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm).
- **Señal / zona horaria:** la que recibía Cablevisión Monterrey, hora local de Monterrey. La guía lista el día de 00:00 a 23:30 del calendario, así que las primeras filas son la madrugada posterior al día anterior. No trae nombres de bloque.
- **Notas:** Mismo orden de programas que la grilla de enero 2003 del blog, desplazado +4 h.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Jue | 00:00–00:30 | El hombre Araña |  | F3 | `verified` |
| Jue | 00:30–01:00 | X-Men |  | F3 | `verified` |
| Jue | 01:00–01:30 | Power Rangers fuerza de tiempo |  | F3 | `verified` |
| Jue | 01:30–02:00 | Power Rangers fuerza salvaje |  | F3 | `verified` |
| Jue | 02:00–02:30 | Digimon IV |  | F3 | `verified` |
| Jue | 02:30–03:00 | Beyblade |  | F3 | `verified` |
| Jue | 03:00–03:30 | Medabots |  | F3 | `verified` |
| Jue | 03:30–04:00 | Shaman King |  | F3 | `verified` |
| Jue | 04:00–04:30 | Kid Músculo |  | F3 | `verified` |
| Jue | 04:30–05:00 | Kirby |  | F3 | `verified` |
| Jue | 05:00–05:30 | Transformers Armada |  | F3 | `verified` |
| Jue | 05:30–06:00 | Digimon II |  | F3 | `verified` |
| Jue | 06:00–06:30 | Digimon III |  | F3 | `verified` |
| Jue | 06:30–07:00 | Los Padrinos Mágicos |  | F3 | `verified` |
| Jue | 07:00–07:30 | Kirby |  | F3 | `verified` |
| Jue | 07:30–08:00 | Medabots |  | F3 | `verified` |
| Jue | 08:00–08:30 | Beyblade |  | F3 | `verified` |
| Jue | 08:30–09:00 | Digimon IV |  | F3 | `verified` |
| Jue | 09:00–09:30 | Power Rangers fuerza de tiempo |  | F3 | `verified` |
| Jue | 09:30–10:00 | Power Rangers fuerza salvaje |  | F3 | `verified` |
| Jue | 10:00–10:30 | Pájaro Loco |  | F3 | `verified` |
| Jue | 10:30–11:00 | Wheel Squad |  | F3 | `verified` |
| Jue | 11:00–11:30 | Tres espías sin límite |  | F3 | `verified` |
| Jue | 11:30–12:00 | Dientes de Lata |  | F3 | `verified` |
| Jue | 12:00–12:30 | Mary-Kate y Ashley en acción! |  | F3 | `verified` |
| Jue | 12:30–13:00 | Angela Anaconda |  | F3 | `verified` |
| Jue | 13:00–13:30 | Mellizos Carmp |  | F3 | `verified` |
| Jue | 13:30–14:00 | Pájaro Loco |  | F3 | `verified` |
| Jue | 14:00–14:30 | Los Padrinos Mágicos |  | F3 | `verified` |
| Jue | 14:30–15:00 | Las locuras de Andy |  | F3 | `verified` |
| Jue | 15:00–15:30 | Kirby |  | F3 | `verified` |
| Jue | 15:30–16:00 | Travesuras del aula 402 |  | F3 | `verified` |
| Jue | 16:00–16:30 | Angela Anaconda |  | F3 | `verified` |
| Jue | 16:30–17:00 | Hombre Araña |  | F3 | `verified` |
| Jue | 17:00–17:30 | X-Men |  | F3 | `verified` |
| Jue | 17:30–18:00 | Power Rangers fuerza de tiempo |  | F3 | `verified` |
| Jue | 18:00–18:30 | Power Rangers fuerza salvaje |  | F3 | `verified` |
| Jue | 18:30–19:00 | Digimon IV |  | F3 | `verified` |
| Jue | 19:00–19:30 | Beyblade |  | F3 | `verified` |
| Jue | 19:30–20:00 | Medabots |  | F3 | `verified` |
| Jue | 20:00–20:30 | Shaman King |  | F3 | `verified` |
| Jue | 20:30–21:00 | Kid Músculo |  | F3 | `verified` |
| Jue | 21:00–21:30 | Kirby |  | F3 | `verified` |
| Jue | 21:30–22:00 | Transformers Armada |  | F3 | `verified` |
| Jue | 22:00–22:30 | Digimon II |  | F3 | `verified` |
| Jue | 22:30–23:00 | Digimon III |  | F3 | `verified` |
| Jue | 23:00–23:30 | Shaman King |  | F3 | `verified` |
| Jue | 23:30 | Power Rangers fuerza salvaje |  | F3 | `verified` |

## Jetix Latinoamérica

Jetix reemplazó a Fox Kids el 31/7/2004 y conservó sus bloques (F5, F6). Horario de bloques en el lanzamiento, según F5, con la Zona Norte (México) una hora después que la Zona Sur:

| Bloque | Días | Zona Sur | Zona Norte | Fuente | Certeza |
| ------ | ---- | -------: | ---------: | ------ | ------- |
| Súper Horas | Lun–Vie | 15:00–18:00 | 16:00–19:00 | F5 | `probable` |
| Súper Horas | Sáb, Dom | 16:00–18:00 | 17:00–19:00 | F5 | `probable` |
| Invasión Animé | Todos los días | 18:00–20:00 | 19:00–21:00 | F5 | `probable` |
| Mysteria | Todos los días | 21:30–04:00 | 22:00–04:30 | F5 | `probable` |
| Generación Power Rangers (una hora de Mighty Morphin) | Todos los días | 14:00 | 15:00 | F5 | `probable` |
| Doble Carga (una hora de una serie destacada del mes) | Sáb, Dom | 15:00 | 16:00 | F5 | `probable` |
| Especiales o maratones | Sáb | 11:00–13:00 | 12:00–14:00 | F5 | `probable` |
| Cineskopio (películas) | Dom | 11:00 | 12:00 | F5 | `probable` |
| ¿Quién tiene el control? (maratón por votación) | Sáb (Norte: último sábado del mes) | 11:00–13:00 | 12:00–14:00 | F5 | `probable` |

¿Quién tiene el control? no tenía alineación fija. Las ediciones documentadas (F5) son:
- 28/8/2004, 11:00, sin opciones publicadas.
- 30/7/2005, 11:00, sin opciones publicadas.
- 22/10/2005, 11:00: votación del piloto favorito de Dragon Booster.
- Abril 2009: votación entre temporadas de Power Rangers (Fuerza Mística, Operación Sobrecarga, Furia Animal).
- Mayo 2009: votación entre Pucca, Isla de mutantes y Los Padrinos Mágicos.

### Período: agosto 2005

- **Fuente:** F4, [Programación de Jetix | Agosto 2005 (celebrando el Día del Niño)](https://forogrilladecanales.blogspot.com/2023/10/programacion-de-jetix-agosto-2005.html). El post indica como origen `www.jetixtv.com` y no enlaza capturas.
- **Señal / zona horaria:** Sin indicar. La sección de lunes a viernes coincide 43 de 47 franjas con Cablevisión Monterrey del viernes 2/9/2005 sin desfase, así que la considero `verified`; el fin de semana queda `probable`.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Todos los días | 06:00–06:30 | Digimon 4 |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 06:30–07:00 | Kirby |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Lun–Vie | 07:00–07:30 | Transformers: Armada |  | F4 | `verified` |
| Todos los días | 07:30–08:00 | Medabots |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 08:00–08:30 | Beyblade G Revolution |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 08:30–09:00 | Power Rangers Fuerza Salvaje |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 09:00–09:30 | Power Rangers Tormenta Ninja |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 09:30–10:00 | Power Rangers Dino Trueno |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Lun–Vie | 10:00–10:30 | El Pájaro Loco |  | F4 | `verified` |
| Lun–Vie | 10:30–11:00 | Los Padrinos Mágicos |  | F4 | `verified` |
| Lun–Vie | 11:00–11:30 | Las Tortugas Ninja |  | F4 | `verified` |
| Lun–Vie | 11:30–12:00 | Espías sin Límite |  | F4 | `verified` |
| Lun–Vie | 12:00–12:30 | Dientes de Lata |  | F4 | `verified` |
| Lun–Vie | 12:30–13:00 | Gadget y Los Gadgetinis |  | F4 | `verified` |
| Lun–Vie | 13:00–13:30 | Dave el Bárbaro |  | F4 | `verified` |
| Lun–Vie | 13:30–14:00 | Los Padrinos Mágicos |  | F4 | `verified` |
| Todos los días | 14:00–14:30 | Los Padrinos Mágicos |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Lun–Vie | 14:30–15:00 | Fillmore |  | F4 | `verified` |
| Todos los días | 15:00–16:00 | Generación Power Rangers | Generación Power Rangers | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Lun–Vie | 16:00–16:30 | Sonic X |  | F4 | `verified` |
| Lun–Vie | 16:30–17:00 | Dragon Booster |  | F4 | `verified` |
| Todos los días | 17:00–17:30 | Power Rangers Fuerza Salvaje |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 17:30–18:00 | Power Rangers Tormenta Ninja |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 18:00–18:30 | Power Rangers Dino Trueno |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Lun–Vie | 18:30–19:00 | Súper Escuadrón Ciber Monos Híper Fuerza Ya! | Invasión Animé | F4 | `verified` |
| Lun–Vie | 19:00–19:30 | Digimon 1 | Invasión Animé | F4 | `verified` |
| Lun–Vie | 19:30–20:00 | Battle B-Daman | Invasión Animé | F4 | `verified` |
| Lun–Vie | 20:00–20:30 | Dragon Booster |  | F4 | `verified` |
| Lun–Vie | 20:30–21:00 | MegaMan NT Warrior | Invasión Animé | F4 | `verified` |
| Lun–Vie | 21:00–22:00 | Los Padrinos Mágicos |  | F4 | `verified` |
| Todos los días | 22:00–22:30 | Colegio del Agujero Negro | Mysteria | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 22:30–23:00 | Ciencia Traviesa | Mysteria | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 23:00–23:30 | Que Raro | Mysteria | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 23:30–00:00 | Escalofríos | Mysteria | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 00:00–00:30 | Los Padrinos Mágicos |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 00:30–01:00 | El Pájaro Loco (Clásico) |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 01:00–01:30 | Las Locuras de Andy |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 01:30–02:00 | Los Nuevos Locos Addams | Mysteria | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 02:00–02:30 | Los Misterios de Moville | Mysteria | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 02:30–03:00 | Colegio del Agujero Negro | Mysteria | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 03:00–03:30 | Qué Raro | Mysteria | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 03:30–04:00 | Ciencia Traviesa | Mysteria | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 04:00–04:30 | Escalofríos | Mysteria | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 04:30–05:00 | MegaMan NT Warrior |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 05:00–05:30 | Beyblade G Revolution |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Todos los días | 05:30 | Medabots |  | F4 | `verified` (Lun–Vie) / `probable` (Sáb, Dom) |
| Sáb, Dom | 07:00–07:30 | Hulk: El Hombre Increible |  | F4 | `probable` |
| Sáb, Dom | 10:00–10:30 | A.T.O.M. |  | F4 | `probable` |
| Sáb, Dom | 10:30–11:00 | Silverwing |  | F4 | `probable` |
| Sáb | 11:00–13:00 | ¿Quién Tiene el Control? |  | F4 | `probable` |
| Sáb, Dom | 13:00–14:00 | Copa Jetix |  | F4 | `probable` |
| Sáb, Dom | 14:30–15:00 | El Zorro |  | F4 | `probable` |
| Sáb, Dom | 16:00–16:30 | Los 4 Fantásticos |  | F4 | `probable` |
| Sáb, Dom | 16:30–17:00 | X-Men |  | F4 | `probable` |
| Sáb, Dom | 18:30–19:00 | Code Lyoko |  | F4 | `probable` |
| Sáb, Dom | 19:00–19:30 | Digimon 4 |  | F4 | `probable` |
| Sáb, Dom | 19:30–20:00 | Kid Músculo |  | F4 | `probable` |
| Sáb, Dom | 20:00–20:30 | El Hombre Araña |  | F4 | `probable` |
| Sáb, Dom | 20:30–21:00 | La Momia |  | F4 | `probable` |
| Sáb, Dom | 21:00–21:30 | Power Rangers Tormenta Ninja |  | F4 | `probable` |
| Sáb, Dom | 21:30–22:00 | Power Rangers Dino Trueno |  | F4 | `probable` |
| Dom | 11:00–12:45 | Cineskopio | Cineskopio | F4 | `probable` |
| Dom | 12:45–13:00 | Extra Bonus |  | F4 | `probable` |

### Día verificado: Jetix, lunes 9/8/2004 (primera semana del canal, México)

- **Fuente:** F3, guía diaria de Cablevisión Monterrey (México) para el lunes 9 agosto 2004, [captura de Wayback Machine](https://web.archive.org/web/20040809224955/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm).
- **Señal / zona horaria:** la que recibía Cablevisión Monterrey, hora local de Monterrey. La guía lista el día de 00:00 a 23:30 del calendario, así que las primeras filas son la madrugada posterior al día anterior. No trae nombres de bloque.
- **Notas:** Jetix reemplazó a Fox Kids el 31/7/2004. El 30/8/2004 la misma página ya mostraba otra grilla (hay capturas del 17/8 y del 30/8).

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun | 00:00–00:30 | Escalofríos |  | F3 | `verified` |
| Lun | 00:30–01:00 | Colegio del Agujero negro |  | F3 | `verified` |
| Lun | 01:00–01:30 | Gargoyles: Héroes góticos |  | F3 | `verified` |
| Lun | 01:30–02:00 | Los nuevos Locos Addams |  | F3 | `verified` |
| Lun | 02:00–02:30 | Los misterios de Moville |  | F3 | `verified` |
| Lun | 02:30–03:00 | Colegio del Agujero negro |  | F3 | `verified` |
| Lun | 03:00–03:30 | Qué raro |  | F3 | `verified` |
| Lun | 03:30–04:00 | Ciencia Traviesa |  | F3 | `verified` |
| Lun | 04:00–04:30 | Escalofríos |  | F3 | `verified` |
| Lun | 04:30–05:00 | MegaMan NT Warrior |  | F3 | `verified` |
| Lun | 05:00–05:30 | Beyblade |  | F3 | `verified` |
| Lun | 05:30–06:00 | Medabots |  | F3 | `verified` |
| Lun | 06:00–06:30 | Digimon 4 |  | F3 | `verified` |
| Lun | 06:30–07:00 | Kirby |  | F3 | `verified` |
| Lun | 07:00–07:30 | Transformers Armada |  | F3 | `verified` |
| Lun | 07:30–08:00 | Medabots |  | F3 | `verified` |
| Lun | 08:00–08:30 | BeyBlade |  | F3 | `verified` |
| Lun | 08:30–09:00 | Power Rangers fuerza de tiempo |  | F3 | `verified` |
| Lun | 09:00–09:30 | Power Rangers fuerza salvaje |  | F3 | `verified` |
| Lun | 09:30–10:00 | Power Rangers Tormenta Ninja |  | F3 | `verified` |
| Lun | 10:00–10:30 | El Pájaro Loco |  | F3 | `verified` |
| Lun | 10:30–11:00 | Los Padrinos Mágicos |  | F3 | `verified` |
| Lun | 11:00–11:30 | Las Tortugas Ninja |  | F3 | `verified` |
| Lun | 11:30–12:00 | Dientes de lata |  | F3 | `verified` |
| Lun | 12:00–12:30 | Tres espías sin límite |  | F3 | `verified` |
| Lun | 12:30–13:00 | Code Lyoko |  | F3 | `verified` |
| Lun | 13:00–13:30 | Las locuras de Andy |  | F3 | `verified` |
| Lun | 13:30–14:00 | ¡Fillmore! |  | F3 | `verified` |
| Lun | 14:00–15:00 | Los Padrinos Mágicos |  | F3 | `verified` |
| Lun | 15:00–16:00 | Generación Power Rangers |  | F3 | `verified` |
| Lun | 16:00–16:30 | ¡Fillmore! |  | F3 | `verified` |
| Lun | 16:30–17:00 | Kid Músculo |  | F3 | `verified` |
| Lun | 17:00–17:30 | Power Rangers fuerza salvaje |  | F3 | `verified` |
| Lun | 17:30–18:30 | Power Rangers Tormenta ninja |  | F3 | `verified` |
| Lun | 18:30–19:00 | Code Lyoko |  | F3 | `verified` |
| Lun | 19:00–19:30 | Digimon 4 |  | F3 | `verified` |
| Lun | 19:30–20:00 | Beyblade |  | F3 | `verified` |
| Lun | 20:00–20:30 | Shaman King |  | F3 | `verified` |
| Lun | 20:30–21:00 | MegaMan NT Warrior |  | F3 | `verified` |
| Lun | 21:00–21:30 | Power Rangers fuerza salvaje |  | F3 | `verified` |
| Lun | 21:30–22:00 | Power Rangers Tormenta ninja |  | F3 | `verified` |
| Lun | 22:00–22:30 | Colegio del Agujero negro |  | F3 | `verified` |
| Lun | 22:30–23:00 | Ciencia Traviesa |  | F3 | `verified` |
| Lun | 23:00–23:30 | Qué raro |  | F3 | `verified` |
| Lun | 23:30 | Escalofríos |  | F3 | `verified` |

## Nickelodeon Latinoamérica, Nick Jr. y Nick@Nite

**Nick Jr.** aparece en todas las grillas de F4 como **bloque dentro de Nickelodeon**:
- noviembre 1999 y agosto 2001: de 08:00 a 11:00;
- julio 2001 (vacaciones): de 12:00 a 15:00;
- enero 2003 y enero 2004: de 08:00 a 09:30;
- julio y agosto 2005: de 07:00 a 08:30.

**Nicktoons** aparece como bloque en 1999-2003, sobre todo de 15:00 a 17:00, con otras apariciones sueltas. No se encontraron grillas de un **canal** Nick Jr. independiente en el período, así que queda `uncertain`.

**Nick@Nite:** se lanzó en febrero 2006 (fecha exacta sin confirmar). Según F5, emitía todos los días de 22:00 a 05:30 en la Zona Sur. Su rotación de sitcoms está documentada por períodos entre 2008 y 2010:

| Período | Días | Rotación (en orden, repetida de 22:00 a 05:30) | Fuente | Certeza |
| ------- | ---- | ---------------------------------------------- | ------ | ------- |
| ene 2008 | Lun–Vie | Alf, Mork & Mindy, Los Locos Addams, Los Munsters, Hechizada, Mi Bella Genio, ¡Ay! Cómo Duele Crecer | F5 | `probable` |
| ene 2008 | Sáb, Dom | Alf, Blanco y Negro, Los Hechos de la Vida, ¡Ay! Cómo Duele Crecer, Mork & Mindy, Los Munsters, Hechizada, Mi Bella Genio | F5 | `probable` |
| may–dic 2008 | Lun–Vie | Clarissa, Kenan & Kel, El Príncipe de Bel Air, Alf, Súper Agente 86, Mi Bella Genio, Hechizada, Los Munsters | F5 | `probable` |
| may–dic 2008 | Sáb, Dom | Kenan & Kel, El Príncipe de Bel Air, Alf, ¡Ay! Cómo Duele Crecer, Mork & Mindy, Los Munsters, Hechizada, Mi Bella Genio | F5 | `probable` |
| jul 2009–mar 2010 | Lun–Vie (los fines de semana pasan a Nick Hits desde el 4/7/2009) | El Príncipe de Bel Air (x2), Alf, Kenan & Kel, Días Felices, Súper Agente 86, Hechizada, Mi Bella Genio | F5 | `probable` |
| abr 2010 | Sáb, Dom | Nicktoons: Bob Esponja, Los Padrinos Mágicos, El Tigre, ¡Oye Arnold!, Rocket Power, Meteoro: La Nueva Generación, Los Castores Cascarrabias, La Vida Moderna de Rocko | F5 | `probable` |

F5 da el orden de rotación, no la hora de cada episodio. Asignar horas exactas a cada serie sería inventar, así que por ahora solo se conoce la ventana del bloque.

### Período: noviembre 1999

- **Fuente:** F4, [Programación de Nickelodeon | Noviembre 1999 (este es mi nacimiento)](https://forogrilladecanales.blogspot.com/2023/02/programacion-de-nickelodeon-noviembre.html). El post indica como origen `www.mundonick.com` y no enlaza capturas.
- **Señal / zona horaria:** Sin indicar. No hay otra fuente del mismo período para contrastar.
- **Notas:** Nick Jr. de 08:00 a 11:00 entre semana y Nicktoons como bloque de 07:00 y de 15:00 a 17:00.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun | 06:00–06:30 | Despistados |  | F4 | `probable` |
| Todos los días | 06:30–07:00 | ¿Le Temes a la Oscuridad? |  | F4 | `probable` |
| Lun–Vie | 07:00–08:00 | Nicktoons | Nicktoons | F4 | `probable` |
| Lun–Vie | 08:00–08:30 | La Isla Gullah Gullah | Nick Jr. | F4 | `probable` |
| Lun–Vie | 08:30–09:00 | La Ventana de Allegra | Nick Jr. | F4 | `probable` |
| Lun–Vie | 09:00–09:30 | Las Pistas de Blue | Nick Jr. | F4 | `probable` |
| Lun–Vie | 09:30–10:00 | El Castillo de Eureka | Nick Jr. | F4 | `probable` |
| Lun–Vie | 10:00–10:30 | Bananas en Pyjamas | Nick Jr. | F4 | `probable` |
| Lun–Vie | 10:30–11:00 | El Fabuloso Mundo de Dr. Seuss | Nick Jr. | F4 | `probable` |
| Lun–Vie | 11:00–11:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun–Vie | 11:30–12:00 | Doug |  | F4 | `probable` |
| Todos los días | 12:00–12:30 | La Vida Moderna de Rocko |  | F4 | `probable` |
| Lun–Vie | 12:30–13:00 | Pippi Calzas Largas |  | F4 | `probable` |
| Lun–Vie | 13:00–13:30 | Las Aventuras de Pete y Pete |  | F4 | `probable` |
| Lun–Vie | 13:30–14:00 | Clarissa lo Explica Todo |  | F4 | `probable` |
| Lun–Vie | 14:00–14:30 | Kablam |  | F4 | `probable` |
| Todos los días | 14:30–15:00 | ¿Le Temes a la Oscuridad? |  | F4 | `probable` |
| Todos los días | 15:00–17:00 | Nicktoons | Nicktoons | F4 | `probable` |
| Lun–Vie | 17:00–17:30 | Global Guts |  | F4 | `probable` |
| Lun–Vie | 17:30–18:00 | Leyendas del Templo Escondido |  | F4 | `probable` |
| Todos los días | 18:00–18:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun–Vie | 18:30–19:00 | Charlie Brown |  | F4 | `probable` |
| Todos los días | 19:00–19:30 | La Vida Moderna de Rocko |  | F4 | `probable` |
| Lun–Vie | 19:30–20:00 | Sabrina la Bruja Adolescente |  | F4 | `probable` |
| Lun–Vie | 20:00–20:30 | Los Salvajes Thornberrys |  | F4 | `probable` |
| Lun–Vie | 20:30–21:00 | Hermana, Hermana |  | F4 | `probable` |
| Lun–Vie | 21:00–21:30 | Animorphs |  | F4 | `probable` |
| Lun–Vie | 21:30–22:00 | Clarissa lo Explica Todo |  | F4 | `probable` |
| Lun–Vie | 22:00–22:30 | Kablam |  | F4 | `probable` |
| Todos los días | 22:30–23:00 | ¿Le Temes a la Oscuridad? |  | F4 | `probable` |
| Todos los días | 23:00–01:00 | Nicktoons | Nicktoons | F4 | `probable` |
| Lun–Sáb | 01:00–01:30 | Global Guts |  | F4 | `probable` |
| Lun–Sáb | 01:30–02:00 | Leyendas del Templo Escondido |  | F4 | `probable` |
| Todos los días | 02:00–02:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun–Sáb | 02:30–03:00 | Charlie Brown |  | F4 | `probable` |
| Todos los días | 03:00–03:30 | La Vida Moderna de Rocko |  | F4 | `probable` |
| Lun–Sáb | 03:30–04:00 | Sabrina la Bruja Adolescente |  | F4 | `probable` |
| Lun–Sáb | 04:00–04:30 | Los Salvajes Thornberrys |  | F4 | `probable` |
| Lun–Sáb | 04:30–05:00 | Hermana, Hermana |  | F4 | `probable` |
| Lun–Sáb | 05:00–05:30 | Animorphs |  | F4 | `probable` |
| Lun–Sáb | 05:30 | Clarissa lo Explica Todo |  | F4 | `probable` |
| Mar–Dom | 06:00–06:30 | Kablam |  | F4 | `probable` |
| Sáb, Dom | 07:00–07:30 | La Leyenda del Viento del Norte |  | F4 | `probable` |
| Sáb, Dom | 07:30–08:00 | Pippi Calzas Largas |  | F4 | `probable` |
| Sáb, Dom | 08:00–08:30 | Mi Osito |  | F4 | `probable` |
| Sáb, Dom | 08:30–10:00 | Nicktoons | Nicktoons | F4 | `probable` |
| Sáb, Dom | 10:00–10:30 | Doug |  | F4 | `probable` |
| Sáb, Dom | 10:30–11:00 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Sáb, Dom | 11:00–11:30 | Los Grafitos |  | F4 | `probable` |
| Sáb, Dom | 11:30–12:00 | Charlie Brown |  | F4 | `probable` |
| Sáb, Dom | 12:30–13:00 | ¡Oye Arnold! |  | F4 | `probable` |
| Sáb, Dom | 13:00–13:30 | Los Renegados de Renford |  | F4 | `probable` |
| Sáb, Dom | 13:30–14:00 | Kablam |  | F4 | `probable` |
| Sáb, Dom | 14:00–14:30 | Clarissa lo Explica Todo |  | F4 | `probable` |
| Sáb, Dom | 17:00–17:30 | CatDog |  | F4 | `probable` |
| Sáb, Dom | 17:30–18:00 | Charlie Brown |  | F4 | `probable` |
| Sáb, Dom | 18:30–19:00 | Los Castores Cascarrabias |  | F4 | `probable` |
| Sáb, Dom | 19:30–20:00 | ¡Oye Arnold! |  | F4 | `probable` |
| Sáb, Dom | 20:00–20:30 | ¡¡¡Aaahh!!!, Monstruos de Verdad |  | F4 | `probable` |
| Sáb, Dom | 20:30–21:00 | 3 Amigos y Jerry |  | F4 | `probable` |
| Sáb, Dom | 21:00–21:30 | Los Renegados de Renford |  | F4 | `probable` |
| Sáb | 21:30–22:00 | Primo Skeeter |  | F4 | `probable` |
| Sáb, Dom | 22:00–22:30 | Despistados |  | F4 | `probable` |
| Dom | 21:30–22:00 | Kenan y Kel |  | F4 | `probable` |
| Dom | 01:00–01:30 | CatDog |  | F4 | `probable` |
| Dom | 01:30–02:00 | Charlie Brown |  | F4 | `probable` |
| Dom | 02:30–03:00 | Los Castores Cascarrabias |  | F4 | `probable` |
| Dom | 03:30–04:00 | ¡Oye Arnold! |  | F4 | `probable` |
| Dom | 04:00–04:30 | ¡¡¡Aaahh!!!, Monstruos de Verdad |  | F4 | `probable` |
| Dom | 04:30–05:00 | 3 Amigos y Jerry |  | F4 | `probable` |
| Dom | 05:00–05:30 | Los Renegados de Renford |  | F4 | `probable` |
| Dom | 05:30 | Kenan y Kel |  | F4 | `probable` |

### Período: agosto 2001

- **Fuente:** F4, [Programación de Nickelodeon Latinoamérica | Agosto 2001](https://forogrilladecanales.blogspot.com/2025/01/programacion-de-nickelodeon.html). El post indica como origen `sin indicar` y no enlaza capturas.
- **Señal / zona horaria:** Sin indicar.
- **Días especiales listados aparte en la fuente (no incluidos en la tabla):** Domingo 5 de agosto del 2001; Sábado 25 de agosto del 2001; Domingo 26 de agosto del 2001.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun, Dom | 06:00–06:30 | Los Archivos Secretos de Shelby Woo |  | F4 | `probable` |
| Lun, Dom | 06:30–07:00 | Allen Strange |  | F4 | `probable` |
| Lun–Vie | 07:00–07:30 | La Vida Moderna de Rocko |  | F4 | `probable` |
| Lun–Vie | 07:30–08:00 | Escuela del Rinoceronte Volador |  | F4 | `probable` |
| Lun–Vie | 08:00–08:30 | El Mundo Fantástico de Richard Scarry | Nick Jr. | F4 | `probable` |
| Lun–Vie | 08:30–09:00 | La Ventana de Allegra | Nick Jr. | F4 | `probable` |
| Lun–Vie | 09:00–09:30 | Las Pistas de Blue | Nick Jr. | F4 | `probable` |
| Lun–Vie | 09:30–10:00 | Dora la Exploradora | Nick Jr. | F4 | `probable` |
| Lun–Vie | 10:00–10:30 | Bananas en Pijamas | Nick Jr. | F4 | `probable` |
| Lun–Vie | 10:30–11:00 | Rupert | Nick Jr. | F4 | `probable` |
| Todos los días | 11:00–11:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun–Vie | 11:30–12:00 | Charlie Brown |  | F4 | `probable` |
| Lun–Vie | 12:00–12:30 | Los Castores Cascarrabias |  | F4 | `probable` |
| Lun–Vie | 12:30–13:00 | Rocket Power |  | F4 | `probable` |
| Lun–Vie | 13:00–13:30 | Los Thornberrys |  | F4 | `probable` |
| Lun–Vie | 13:30–14:00 | La Vida Moderna de Rocko |  | F4 | `probable` |
| Lun–Vie | 14:00–14:30 | 3 Amigos y Jerry |  | F4 | `probable` |
| Lun–Vie | 14:30–15:00 | Bob Esponja |  | F4 | `probable` |
| Todos los días | 15:00–15:30 | Los Castores Cascarrabias |  | F4 | `probable` |
| Todos los días | 15:30–16:00 | Doug |  | F4 | `probable` |
| Todos los días | 16:00–16:30 | CatDog |  | F4 | `probable` |
| Todos los días | 16:30–17:00 | Bob Esponja |  | F4 | `probable` |
| Lun–Vie | 17:00–17:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun–Vie | 17:30–18:00 | GaS / Leyendas del Templo Escondido |  | F4 | `probable` |
| Lun–Vie | 18:00–18:30 | GaS / Global Guts |  | F4 | `probable` |
| Lun–Jue | 18:30–19:00 | Kenan y Kel |  | F4 | `probable` |
| Lun–Jue | 19:00–19:30 | Sabrina la Bruja Adolescente |  | F4 | `probable` |
| Lun, Mié | 19:30–20:00 | Ginger |  | F4 | `probable` |
| Todos los días | 20:00–20:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun–Vie | 20:30–21:00 | ¡Oye, Arnold! |  | F4 | `probable` |
| Todos los días | 21:00–21:30 | Rocket Power |  | F4 | `probable` |
| Todos los días | 21:30–22:00 | Los Thornberrys |  | F4 | `probable` |
| Lun–Vie | 22:00–22:30 | Kenan y Kel |  | F4 | `probable` |
| Lun–Vie | 22:30–23:00 | Hermana, Hermana |  | F4 | `probable` |
| Lun–Vie | 23:00–23:30 | ¿Le Temes a la Oscuridad? |  | F4 | `probable` |
| Lun–Vie | 23:30–00:00 | Los Castores Cascarrabias |  | F4 | `probable` |
| Lun–Vie | 00:00–00:30 | Doug |  | F4 | `probable` |
| Lun–Vie | 00:30–01:00 | CatDog |  | F4 | `probable` |
| Lun–Vie | 01:00–01:30 | Bob Esponja |  | F4 | `probable` |
| Lun–Vie | 01:30–02:00 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun–Vie | 02:00–02:30 | GaS / Leyendas del Templo Escondido |  | F4 | `probable` |
| Lun–Vie | 02:30–03:00 | GaS / Global Guts |  | F4 | `probable` |
| Lun–Vie | 03:00–03:30 | Kenan y Kel |  | F4 | `probable` |
| Lun–Jue | 03:30–04:00 | Sabrina la Bruja Adolescente |  | F4 | `probable` |
| Lun, Mié | 04:00–04:30 | Ginger |  | F4 | `probable` |
| Lun–Vie | 04:30–05:00 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun–Vie | 05:00–05:30 | ¡Oye, Arnold! |  | F4 | `probable` |
| Lun–Vie | 05:30 | Rocket Power |  | F4 | `probable` |
| Mar–Sáb | 06:00–06:30 | Los Thornberrys |  | F4 | `probable` |
| Mar–Sáb | 06:30–07:00 | Kenan y Kel |  | F4 | `probable` |
| Mar, Jue | 19:30–20:00 | Generación O! |  | F4 | `probable` |
| Mar, Jue | 04:00–04:30 | Generación O! |  | F4 | `probable` |
| Vie | 18:30–19:00 | S Club 7 |  | F4 | `probable` |
| Vie | 19:00–19:30 | DJ Nick |  | F4 | `probable` |
| Vie | 19:30–20:00 | Making the Band |  | F4 | `probable` |
| Vie | 03:30–04:00 | DJ Nick |  | F4 | `probable` |
| Vie | 04:00–04:30 | Making the Band |  | F4 | `probable` |
| Sáb, Dom | 07:00–07:30 | Mi Osito |  | F4 | `probable` |
| Sáb, Dom | 07:30–08:00 | Bananas en Pijamas |  | F4 | `probable` |
| Sáb, Dom | 08:00–08:30 | La Vida Moderna de Rocko |  | F4 | `probable` |
| Sáb, Dom | 08:30–09:00 | CatDog |  | F4 | `probable` |
| Sáb, Dom | 09:00–09:30 | Los Thornberrys |  | F4 | `probable` |
| Sáb, Dom | 09:30–10:00 | Bob Esponja |  | F4 | `probable` |
| Sáb, Dom | 10:00–10:30 | Los Castores Cascarrabias |  | F4 | `probable` |
| Sáb, Dom | 10:30–11:00 | Escuela del Rinoceronte Volador |  | F4 | `probable` |
| Sáb, Dom | 11:30–12:00 | Kablam |  | F4 | `probable` |
| Sáb, Dom | 12:00–12:30 | 3 Amigos y Jerry |  | F4 | `probable` |
| Sáb, Dom | 12:30–13:00 | Bob Esponja |  | F4 | `probable` |
| Sáb, Dom | 13:00–13:30 | Charlie Brown |  | F4 | `probable` |
| Sáb, Dom | 13:30–14:00 | Primo Skeeter |  | F4 | `probable` |
| Sáb, Dom | 14:00–14:30 | Depsistados |  | F4 | `probable` |
| Sáb, Dom | 14:30–15:00 | ¿Le Temes a la Oscuridad? |  | F4 | `probable` |
| Sáb, Dom | 17:00–17:30 | Allen Strange |  | F4 | `probable` |
| Sáb, Dom | 17:30–18:00 | S Club 7 |  | F4 | `probable` |
| Sáb, Dom | 18:00–18:30 | Hermana, Hermana |  | F4 | `probable` |
| Sáb, Dom | 18:30–19:00 | Los Archivos Secretos de Shelby Woo |  | F4 | `probable` |
| Sáb, Dom | 19:00–19:30 | Ralph el Travieso |  | F4 | `probable` |
| Sáb, Dom | 19:30–20:00 | ¡Oye, Arnold! |  | F4 | `probable` |
| Sáb, Dom | 20:30–21:00 | ¡Aaah, Monstruos! |  | F4 | `probable` |
| Sáb, Dom | 22:00–22:30 | ¡Oye, Arnold! |  | F4 | `probable` |
| Sáb, Dom | 22:30–23:00 | Doug |  | F4 | `probable` |
| Sáb, Dom | 23:00–23:30 | Los Castores Cascarrabias |  | F4 | `probable` |
| Sáb, Dom | 23:30–00:00 | ¡Aaah, Monstruos! |  | F4 | `probable` |
| Sáb, Dom | 00:00–00:30 | CatDog |  | F4 | `probable` |
| Sáb, Dom | 00:30–01:00 | Bob Esponja |  | F4 | `probable` |
| Sáb, Dom | 01:00–01:30 | Allen Strange |  | F4 | `probable` |
| Sáb, Dom | 01:30–02:00 | S Club 7 |  | F4 | `probable` |
| Sáb, Dom | 02:00–02:30 | Hermana, Hermana |  | F4 | `probable` |
| Sáb, Dom | 02:30–03:00 | Los Archivos Secretos de Shelby Woo |  | F4 | `probable` |
| Sáb, Dom | 03:00–03:30 | Ralph el Travieso |  | F4 | `probable` |
| Sáb, Dom | 03:30–04:00 | ¡Oye, Arnold! |  | F4 | `probable` |
| Sáb, Dom | 04:00–04:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Sáb, Dom | 04:30–05:00 | ¡Aaah, Monstruos! |  | F4 | `probable` |
| Sáb, Dom | 05:00–05:30 | Rocket Power |  | F4 | `probable` |
| Sáb, Dom | 05:30 | Los Thornberrys |  | F4 | `probable` |

### Período: enero 2004

- **Fuente:** F4, [Programación de Nickelodeon | Enero 2004](https://forogrilladecanales.blogspot.com/2021/02/programacion-de-nickelodeon-enero-2004.html). El post indica como origen `www.mundonick.com` y no enlaza capturas.
- **Señal / zona horaria:** Sin indicar. Contra Cablevisión Monterrey del viernes 20/2/2004: 29 de 48 franjas coinciden sin desfase; el resto son los mismos programas en otro orden.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun, Dom | 06:00–06:30 | Invasor Zim |  | F4 | `probable` |
| Lun, Dom | 06:30–07:00 | Galidor |  | F4 | `probable` |
| Lun–Vie | 07:00–07:30 | Ralph el Travieso |  | F4 | `probable` |
| Lun–Vie | 07:30–08:00 | Kablam |  | F4 | `probable` |
| Lun–Vie | 08:00–08:30 | La Ventana de Allegra | Nick Jr. | F4 | `probable` |
| Lun–Vie | 08:30–09:00 | Las Pistas de Blue | Nick Jr. | F4 | `probable` |
| Lun–Vie | 09:00–09:30 | Dora la Exploradora | Nick Jr. | F4 | `probable` |
| Lun, Mié, Vie | 09:30–10:00 | Juanito Jones |  | F4 | `probable` |
| Lun–Vie | 10:00–10:30 | Stuart Little |  | F4 | `probable` |
| Lun–Vie | 10:30–11:00 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun–Vie | 11:00–11:30 | ¡Oye Arnold! |  | F4 | `probable` |
| Lun, Mié, Vie | 11:30–12:00 | CatDog |  | F4 | `probable` |
| Lun–Vie | 12:00–12:30 | Los Thornberrys |  | F4 | `probable` |
| Lun–Vie | 12:30–13:00 | Yvon del Yukon |  | F4 | `probable` |
| Lun–Vie | 13:00–13:30 | Poochini |  | F4 | `probable` |
| Lun–Vie | 13:30–14:00 | Rocket Power |  | F4 | `probable` |
| Lun–Vie | 14:00–14:30 | Bob Esponja |  | F4 | `probable` |
| Lun–Vie | 14:30–15:00 | Yu-Gi-Oh! |  | F4 | `probable` |
| Lun, Mié, Jue | 15:00–15:30 | ¡Oye Arnold! |  | F4 | `probable` |
| Lun–Vie | 15:30–16:00 | Doug |  | F4 | `probable` |
| Lun–Vie | 16:00–16:30 | CatDog |  | F4 | `probable` |
| Lun | 16:30–17:00 | Invasor Zim |  | F4 | `probable` |
| Lun–Vie | 17:00–17:30 | Rugrats Crecidos |  | F4 | `probable` |
| Lun–Vie | 17:30–18:00 | Ginger |  | F4 | `probable` |
| Lun–Jue | 18:00–18:30 | Bob Esponja |  | F4 | `probable` |
| Lun–Jue | 18:30–19:00 | Kenan y Kel |  | F4 | `probable` |
| Lun–Vie | 19:00–19:30 | Sabrina la Bruja Adolescente |  | F4 | `probable` |
| Lun–Jue | 19:30–20:00 | El Mundo de Tosh |  | F4 | `probable` |
| Lun–Vie | 20:00–20:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun, Mar | 20:30–21:00 | ¡Oye Arnold! |  | F4 | `probable` |
| Lun–Vie | 21:00–21:30 | Bob Esponja |  | F4 | `probable` |
| Lun–Vie | 21:30–22:00 | Rocket Power |  | F4 | `probable` |
| Lun–Vie | 22:00–22:30 | Kenan y Kel |  | F4 | `probable` |
| Lun–Vie | 22:30–23:00 | Yu-Gi-Oh! |  | F4 | `probable` |
| Lun, Jue, Vie | 23:00–23:30 | ¡Oye Arnold! |  | F4 | `probable` |
| Lun, Mié, Jue | 23:30–00:00 | Doug |  | F4 | `probable` |
| Lun–Vie | 00:00–00:30 | CatDog |  | F4 | `probable` |
| Lun–Vie | 00:30–01:00 | Bob Esponja |  | F4 | `probable` |
| Lun–Mié, Vie | 01:00–01:30 | Rugrats Crecidos |  | F4 | `probable` |
| Lun–Vie | 01:30–02:00 | Ginger |  | F4 | `probable` |
| Lun–Jue | 02:00–02:30 | Bob Esponja |  | F4 | `probable` |
| Lun–Jue | 02:30–03:00 | Kenan y Kel |  | F4 | `probable` |
| Lun–Vie | 03:00–03:30 | Sabrina la Bruja Adolescente |  | F4 | `probable` |
| Lun–Jue | 03:30–04:00 | El Mundo de Tosh |  | F4 | `probable` |
| Lun–Vie | 04:00–04:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Lun, Vie | 04:30–05:00 | ¡Oye Arnold! |  | F4 | `probable` |
| Lun–Jue | 05:00–05:30 | Bob Esponja |  | F4 | `probable` |
| Lun–Vie | 05:30 | Rocket Power |  | F4 | `probable` |
| Mar–Sáb | 06:00–06:30 | Kenan y Kel |  | F4 | `probable` |
| Mar–Vie | 06:30–07:00 | Yu-Gi-Oh! |  | F4 | `probable` |
| Mar, Jue | 09:30–10:00 | Miniman |  | F4 | `probable` |
| Mar, Jue | 11:30–12:00 | La Vida Moderna de Rocko |  | F4 | `probable` |
| Mar | 15:00–15:30 | Doug |  | F4 | `probable` |
| Mar | 16:30–17:00 | Las Aventuras de Jimmy Neutron el Niño Genio |  | F4 | `probable` |
| Mar | 23:00–23:30 | Doug |  | F4 | `probable` |
| Mar | 23:30–00:00 | Las Aventuras de Jimmy Neutron el Niño Genio |  | F4 | `probable` |
| Mar–Jue | 04:30–05:00 | Las Aventuras de Jimmy Neutron el Niño Genio |  | F4 | `probable` |
| Mié | 16:30–17:00 | Mighty Morphin Power Rangers |  | F4 | `probable` |
| Mié–Vie | 20:30–21:00 | Las Aventuras de Jimmy Neutron el Niño Genio |  | F4 | `probable` |
| Mié | 23:00–23:30 | CatDog |  | F4 | `probable` |
| Jue | 16:30–17:00 | Los Castores Cascarrabias |  | F4 | `probable` |
| Jue | 01:00–01:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Vie | 15:00–15:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Vie | 16:30–17:00 | La Vida Moderna de Rocko |  | F4 | `probable` |
| Vie | 18:00–18:30 | Zona Tiza |  | F4 | `probable` |
| Vie | 18:30–19:00 | S Club 7 |  | F4 | `probable` |
| Vie | 19:30–20:00 | Taina |  | F4 | `probable` |
| Vie | 23:30–00:00 | La Vida Moderna de Rocko |  | F4 | `probable` |
| Vie | 02:00–02:30 | Zona Tiza |  | F4 | `probable` |
| Vie | 02:30–03:00 | S Club 7 |  | F4 | `probable` |
| Vie | 03:30–04:00 | Taina |  | F4 | `probable` |
| Vie | 05:00–05:30 | Zona Tiza |  | F4 | `probable` |
| Sáb | 06:30–07:00 | Yu-Gi-Oh |  | F4 | `probable` |
| Sáb, Dom | 07:00–07:30 | Kablam |  | F4 | `probable` |
| Sáb, Dom | 07:30–08:00 | Doug |  | F4 | `probable` |
| Sáb, Dom | 08:00–09:00 | La Vida Moderna de Rocko |  | F4 | `probable` |
| Sáb, Dom | 09:00–09:30 | Stuart Little |  | F4 | `probable` |
| Sáb, Dom | 09:30–10:00 | Los Thornberrys |  | F4 | `probable` |
| Sáb, Dom | 10:00–10:30 | Poochini |  | F4 | `probable` |
| Sáb, Dom | 10:30–11:00 | Generación O! |  | F4 | `probable` |
| Sáb, Dom | 11:00–11:30 | Rugrats: Aventuras en Pañales |  | F4 | `probable` |
| Sáb, Dom | 11:30–12:00 | El Show de Amanda |  | F4 | `probable` |
| Sáb | 12:00–12:30 | Slam! - Yakkity Yak |  | F4 | `probable` |
| Sáb, Dom | 12:30–13:00 | Invasor Zim |  | F4 | `probable` |
| Sáb, Dom | 13:00–13:30 | Galidor |  | F4 | `probable` |
| Sáb, Dom | 13:30–14:00 | Las Aventuras de Jimmy Neutron el Niño Genio |  | F4 | `probable` |
| Sáb, Dom | 14:00–14:30 | Despistados |  | F4 | `probable` |
| Sáb, Dom | 14:30–15:00 | Hermana, Hermana |  | F4 | `probable` |
| Sáb, Dom | 15:00–17:00 | Click Nick |  | F4 | `probable` |
| Sáb, Dom | 17:00–21:30 | Weekend Stunt |  | F4 | `probable` |
| Sáb | 21:30–22:00 | Yu-Gi-Oh! |  | F4 | `probable` |
| Sáb, Dom | 22:00–22:30 | Invasor Zim |  | F4 | `probable` |
| Sáb, Dom | 22:30–23:00 | Galidor |  | F4 | `probable` |
| Sáb, Dom | 23:00–01:00 | Click Nick |  | F4 | `probable` |
| Sáb, Dom | 01:00–05:30 | Weekend Stunt |  | F4 | `probable` |
| Sáb, Dom | 05:30 | Yu-Gi-Oh! |  | F4 | `probable` |
| Dom | 12:00–12:30 | Yu-Gi-Oh! |  | F4 | `probable` |
| Dom | 21:30–22:00 | Yu-Gi-Oh |  | F4 | `probable` |

### Día verificado: Nickelodeon, viernes 4/6/2004 (México)

- **Fuente:** F3, guía diaria de Cablevisión Monterrey (México) para el viernes 4 junio 2004, [captura de Wayback Machine](https://web.archive.org/web/20040605163146/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm).
- **Señal / zona horaria:** la que recibía Cablevisión Monterrey, hora local de Monterrey. La guía lista el día de 00:00 a 23:30 del calendario, así que las primeras filas son la madrugada posterior al día anterior. No trae nombres de bloque.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Vie | 00:00–00:30 | Catdog |  | F3 | `verified` |
| Vie | 00:30–01:00 | Bob Esponja |  | F3 | `verified` |
| Vie | 01:00–01:30 | Rugrats crecidos |  | F3 | `verified` |
| Vie | 01:30–02:00 | Martin Mystery |  | F3 | `verified` |
| Vie | 02:00–02:30 | Bob Esponja |  | F3 | `verified` |
| Vie | 02:30–03:00 | Kenan & Kel |  | F3 | `verified` |
| Vie | 03:00–03:30 | Sabrina la Bruja Adolescente |  | F3 | `verified` |
| Vie | 03:30–04:00 | Yakkity Yak |  | F3 | `verified` |
| Vie | 04:00–04:30 | Rugrats |  | F3 | `verified` |
| Vie | 04:30–05:00 | ¡Oye Arnold! |  | F3 | `verified` |
| Vie | 05:00–05:30 | Bob Esponja |  | F3 | `verified` |
| Vie | 05:30–06:00 | Rocket Power |  | F3 | `verified` |
| Vie | 06:00–06:30 | Kenan & Kel |  | F3 | `verified` |
| Vie | 06:30–07:00 | Yu-Gi-Oh! |  | F3 | `verified` |
| Vie | 07:00–07:30 | Los Castores Cascarrabias |  | F3 | `verified` |
| Vie | 07:30–08:00 | Kablam |  | F3 | `verified` |
| Vie | 08:00–08:30 | La ventana de Allegra |  | F3 | `verified` |
| Vie | 08:30–09:00 | Las Pistas de Blue |  | F3 | `verified` |
| Vie | 09:00–09:30 | Dora la Exploradora |  | F3 | `verified` |
| Vie | 09:30–10:00 | Juanito Jones |  | F3 | `verified` |
| Vie | 10:00–10:30 | Stuart Little |  | F3 | `verified` |
| Vie | 10:30–11:00 | Rugrats |  | F3 | `verified` |
| Vie | 11:00–11:30 | ¡Oye Arnold! |  | F3 | `verified` |
| Vie | 11:30–12:00 | Cat dog |  | F3 | `verified` |
| Vie | 12:00–12:30 | Poochini |  | F3 | `verified` |
| Vie | 12:30–13:00 | Yvon of the Yunkon |  | F3 | `verified` |
| Vie | 13:00–13:30 | Ginger |  | F3 | `verified` |
| Vie | 13:30–14:00 | Rocket Power |  | F3 | `verified` |
| Vie | 14:00–14:30 | Bob Esponja |  | F3 | `verified` |
| Vie | 14:30–15:00 | Yu-Gi-Oh! |  | F3 | `verified` |
| Vie | 15:00–15:30 | Rugrats |  | F3 | `verified` |
| Vie | 15:30–16:00 | Doug |  | F3 | `verified` |
| Vie | 16:00–16:30 | Catdog |  | F3 | `verified` |
| Vie | 16:30–17:00 | Rocko |  | F3 | `verified` |
| Vie | 17:00–17:30 | Jimmy Neutrón |  | F3 | `verified` |
| Vie | 17:30–18:00 | Martin Mystery |  | F3 | `verified` |
| Vie | 18:00–18:30 | Chalkzone |  | F3 | `verified` |
| Vie | 18:30–19:00 | My life as a teen age robot |  | F3 | `verified` |
| Vie | 19:00–19:30 | Sabrina la Bruja Adolescente |  | F3 | `verified` |
| Vie | 19:30–20:00 | Taina |  | F3 | `verified` |
| Vie | 20:00–20:30 | Rugrats |  | F3 | `verified` |
| Vie | 20:30–21:00 | ¡Oye Arnold! |  | F3 | `verified` |
| Vie | 21:00–21:30 | Bob Esponja |  | F3 | `verified` |
| Vie | 21:30–22:00 | Spiderman |  | F3 | `verified` |
| Vie | 22:00–22:30 | Kenan & Kel |  | F3 | `verified` |
| Vie | 22:30–23:00 | Yu-Gi-Oh! |  | F3 | `verified` |
| Vie | 23:00–23:30 | Rugrats |  | F3 | `verified` |
| Vie | 23:30 | Rocko |  | F3 | `verified` |

## Disney Channel Latinoamérica (Playhouse Disney y Zapping Zone)

- **Playhouse Disney:** mañanas de lunes a viernes, de 08:00 a 12:00 en 2004 y de 07:00 a 11:00 en 2005.
- **Zapping Zone:** de lunes a viernes a las 18:00, con repetición a las 23:00 (enero 2004, julio 2005) o a las 00:00 (agosto 2005).

Las dos cosas aparecen en todas las grillas de F4 y se confirman en F3.

### Período: enero 2004 (Playhouse Disney y Zapping Zone)

- **Fuente:** F4, [Programación de Disney Channel | Enero 2004](https://forogrilladecanales.blogspot.com/2021/02/programacion-de-disney-channel-enero.html). El post indica como origen `www.disneylatino.com` y no enlaza capturas.
- **Señal / zona horaria:** Sin indicar. La sección de lunes a viernes coincide 35 de 42 franjas con Cablevisión Monterrey del 20/2/2004 sin desfase: `verified`. El fin de semana queda `probable`.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Vie | 06:00–06:30 | Sabrina, La Brujita |  | F4 | `verified` |
| Lun–Vie | 06:30–07:00 | Recreo |  | F4 | `verified` |
| Lun–Vie | 07:00–07:30 | Doug de Disney |  | F4 | `verified` |
| Lun–Vie | 07:30–08:00 | Pepper Ann |  | F4 | `verified` |
| Lun–Vie | 08:00–08:30 | Bear en la Gran Casa Azul | Playhouse Disney | F4 | `verified` |
| Lun–Vie | 08:30–09:00 | Oswald | Playhouse Disney | F4 | `verified` |
| Lun–Vie | 09:00–09:30 | Las Aventuras de PB&J Otter | Playhouse Disney | F4 | `verified` |
| Lun–Vie | 09:30–10:00 | El Libro de Pooh | Playhouse Disney | F4 | `verified` |
| Lun–Vie | 10:00–10:30 | Rolie Polie Olie | Playhouse Disney | F4 | `verified` |
| Lun–Vie | 10:30–11:00 | Stanley | Playhouse Disney | F4 | `verified` |
| Lun–Vie | 11:00–11:30 | Bear en la Gran Casa Azul | Playhouse Disney | F4 | `verified` |
| Lun–Vie | 11:30–12:00 | El Libro de Pooh | Playhouse Disney | F4 | `verified` |
| Lun–Vie | 12:00–12:30 | El Show del Ratón |  | F4 | `verified` |
| Lun–Vie | 12:30–13:00 | Las Aventuras de Timón y Pumba |  | F4 | `verified` |
| Lun–Vie | 13:00–13:30 | Buzz Lightyear: Comando Estelar |  | F4 | `verified` |
| Lun–Vie | 13:30–14:00 | La Leyenda de Tarzan |  | F4 | `verified` |
| Lun–Vie | 14:00–14:30 | Pepper Ann |  | F4 | `verified` |
| Lun–Vie | 14:30–15:00 | Doug de Disney |  | F4 | `verified` |
| Lun–Vie | 15:00–15:30 | Sabrina, La Brujita |  | F4 | `verified` |
| Lun–Vie | 15:30–16:00 | Recreo |  | F4 | `verified` |
| Lun–Vie | 16:00–16:30 | Art Attack |  | F4 | `verified` |
| Lun–Vie | 16:30–17:00 | La Peor Bruja |  | F4 | `verified` |
| Lun–Vie | 17:00–17:30 | Aprendiendo a Vivir |  | F4 | `verified` |
| Lun–Vie | 17:30–18:00 | La Familia Proud |  | F4 | `verified` |
| Lun–Vie | 18:00–18:30 | con Dani Martins, Caro Ibarra, Diego Alcalá, Vero Spinelli, Diego Topa y Javier Zucker | Zapping Zone | F4 | `verified` |
| Lun–Vie | 18:30–19:00 | Mano a Mano |  | F4 | `verified` |
| Lun–Vie | 19:00–19:30 | Chico Listo |  | F4 | `verified` |
| Lun–Vie | 19:30–20:00 | Lizzie McGuire |  | F4 | `verified` |
| Lun–Vie | 20:00–22:00 | Pelicula Disney Channel |  | F4 | `verified` |
| Lun–Vie | 22:00–22:30 | Amor Fraternal |  | F4 | `verified` |
| Lun–Vie | 22:30–23:00 | Aprendiendo a Vivir |  | F4 | `verified` |
| Lun–Vie | 23:00–23:30 | con Dani Martins, Caro Ibarra, Diego Alcalá, Vero Spinelli, Diego Topa y Javier Zucker | Zapping Zone | F4 | `verified` |
| Lun–Vie | 23:30–00:00 | Mano a Mano |  | F4 | `verified` |
| Lun–Vie | 00:00–00:30 | Chico Listo |  | F4 | `verified` |
| Lun–Vie | 00:30–01:00 | Lizzie McGuire |  | F4 | `verified` |
| Lun–Vie | 01:00–03:00 | Pelicula Disney Channel |  | F4 | `verified` |
| Lun–Vie | 03:00–03:30 | Art Attack |  | F4 | `verified` |
| Lun–Vie | 03:30–04:00 | La Peor Bruja |  | F4 | `verified` |
| Lun–Vie | 04:00–04:30 | El Show del Ratón |  | F4 | `verified` |
| Lun–Vie | 04:30–05:00 | Las Aventuras de Timón y Pumba |  | F4 | `verified` |
| Lun–Vie | 05:00–05:30 | Doug de Disney |  | F4 | `verified` |
| Lun–Vie | 05:30 | Pepper Ann |  | F4 | `verified` |
| Sáb, Dom | 06:00–06:30 | Las Aventuras de Timón y Pumba |  | F4 | `probable` |
| Sáb, Dom | 06:30–07:00 | El Show de Ratón |  | F4 | `probable` |
| Sáb, Dom | 07:00–07:30 | Bear en la Gran Casa Azul | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 07:30–08:00 | Las Aventuras de PB&J Otter | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 08:00–08:30 | Las Nuevas Aventuras de Madeline | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 08:30–09:00 | Rolie Polie Olie | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 09:00–09:30 | El Libro de Pooh | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 09:30–10:00 | Stanley | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 10:00–10:30 | La Pandilla del Fin de Semana |  | F4 | `probable` |
| Sáb, Dom | 10:30–11:00 | Teamo Supremo |  | F4 | `probable` |
| Sáb, Dom | 11:00–11:30 | La Leyenda de Tarzan |  | F4 | `probable` |
| Sáb, Dom | 11:30–12:00 | Sabrina, La Brujita |  | F4 | `probable` |
| Sáb, Dom | 12:00–12:30 | Disney Princesas - La Sirenita |  | F4 | `probable` |
| Sáb, Dom | 12:30–13:00 | Disney Princesas - Aladdin |  | F4 | `probable` |
| Sáb, Dom | 13:00–13:30 | Lloyd del Espacio |  | F4 | `probable` |
| Sáb, Dom | 13:30–14:00 | La Mascota de la Clase |  | F4 | `probable` |
| Sáb, Dom | 14:00–14:30 | Art Attack |  | F4 | `probable` |
| Sáb, Dom | 14:30–15:00 | Lo Mejor de Zapping Zone |  | F4 | `probable` |
| Sáb, Dom | 15:00–16:00 | Querida, Encogí a los Niños |  | F4 | `probable` |
| Sáb, Dom | 16:00–16:30 | Mano a Mano |  | F4 | `probable` |
| Sáb, Dom | 16:30–17:00 | La Familia Proud |  | F4 | `probable` |
| Sáb, Dom | 17:00–17:30 | Kim Possible |  | F4 | `probable` |
| Sáb, Dom | 17:30–18:00 | Es Tan Raven |  | F4 | `probable` |
| Sáb, Dom | 18:00–18:30 | Mano a Mano |  | F4 | `probable` |
| Sáb, Dom | 18:30–19:00 | Lizzie McGuire |  | F4 | `probable` |
| Sáb, Dom | 19:00–21:00 | Pelicula Disney Channel |  | F4 | `probable` |
| Sáb, Dom | 21:00–23:00 | El Maravilloso Mundo de Disney |  | F4 | `probable` |
| Sáb, Dom | 23:00–23:30 | Lizzie McGuire |  | F4 | `probable` |
| Sáb, Dom | 23:30–00:00 | Es Tan Raven |  | F4 | `probable` |
| Sáb, Dom | 00:00–02:00 | Pelicula Disney Channel |  | F4 | `probable` |
| Sáb, Dom | 02:00–02:30 | Kim Possible |  | F4 | `probable` |
| Sáb, Dom | 02:30–03:00 | Aprendiendo a Vivir |  | F4 | `probable` |
| Sáb, Dom | 03:00–04:00 | Querida, Encogí a los Niños |  | F4 | `probable` |
| Sáb, Dom | 04:00–04:30 | Lo Mejor de Zapping Zone |  | F4 | `probable` |
| Sáb, Dom | 04:30–05:00 | Art Attack |  | F4 | `probable` |
| Sáb, Dom | 05:00–05:30 | Sabrina, La Brujita |  | F4 | `probable` |
| Sáb, Dom | 05:30 | La Pandilla del Fin de Semana |  | F4 | `probable` |

### Período: agosto 2005

- **Fuente:** F4, [Programación de Disney Channel | Agosto 2005 (celebrando el Día del Niño)](https://forogrilladecanales.blogspot.com/2023/10/programacion-de-disney-channel-agosto.html). El post indica como origen `www.disneylatino.com` y no enlaza capturas.
- **Señal / zona horaria:** Sin indicar. Contra Cablevisión Monterrey del 2/9/2005: 28 de 41 con −1 h.
- **Días especiales listados aparte en la fuente (no incluidos en la tabla):** Domingo 7 de agosto del 2005 (Semana del Niño); Lunes 1 de agosto de 2005; Martes 2 de agosto de 2005; Miércoles 3 de agosto de 2005; Jueves 4 de agosto de 2005; Viernes 5 de agosto de 2005; Sábado 6 de agosto de 2005; Domingo 7 de agosto de 2005; Lunes 8 de agosto de 2005; Martes 9 de agosto de 2005; Miércoles 10 de agosto de 2005; Jueves 11 de agosto de 2005; Viernes 12 de agosto de 2005; Sábado 13 de agosto de 2005; Domingo 14 de agosto de 2005; Lunes 15 de agosto de 2005; Martes 16 de agosto de 2005; Miércoles 17 de agosto de 2005; Jueves 18 de agosto de 2005; Viernes 19 de agosto de 2005; Sábado 20 de agosto de 2005; Domingo 21 de agosto de 2005; Lunes 22 de agosto de 2005; Martes 23 de agosto de 2005; Miércoles 24 de agosto de 2005; Jueves 25 de agosto de 2005; Viernes 26 de agosto de 2005; Sábado 27 de agosto de 2005; Domingo 28 de agosto de 2005; Lunes 29 de agosto de 2005; Martes 30 de agosto de 2005; Miércoles 31 de agosto de 2005.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Todos los días | 06:00–06:30 | Art Attack de Disney |  | F4 | `probable` |
| Todos los días | 06:30–07:00 | Kim Possible |  | F4 | `probable` |
| Lun–Vie | 07:00–07:30 | Las Aventuras de PB&J Otter | Playhouse Disney | F4 | `probable` |
| Lun–Vie | 07:30–08:00 | Las Nuevas Aventuras de Winnie Pooh | Playhouse Disney | F4 | `probable` |
| Lun–Vie | 08:00–08:30 | Bear en la Gran Casa Azul | Playhouse Disney | F4 | `probable` |
| Todos los días | 08:30–09:00 | El Libro de Pooh | Playhouse Disney | F4 | `probable` |
| Lun–Vie | 09:00–09:30 | El Circo de Jojo | Playhouse Disney | F4 | `probable` |
| Lun–Vie | 09:30–10:00 | Los Héroes de la Ciudad | Playhouse Disney | F4 | `probable` |
| Lun–Vie | 10:00–10:30 | Rolie Polie Olie y su Familia | Playhouse Disney | F4 | `probable` |
| Lun–Vie | 10:30–11:00 | Stanley | Playhouse Disney | F4 | `probable` |
| Todos los días | 11:00–11:30 | El Librito de la Selva |  | F4 | `probable` |
| Todos los días | 11:30–12:00 | Quack Pack |  | F4 | `probable` |
| Lun–Vie | 12:00–12:30 | El Show del Ratón |  | F4 | `probable` |
| Lun–Vie | 12:30–13:00 | 101 Dálmatas de Disney |  | F4 | `probable` |
| Lun–Vie | 13:00–13:30 | La Leyenda de Tarzán |  | F4 | `probable` |
| Lun–Vie | 13:30–14:00 | Art Attack de Disney |  | F4 | `probable` |
| Lun–Vie | 14:00–14:30 | Teamo Supremo |  | F4 | `probable` |
| Lun–Vie | 14:30–15:00 | La Mascota de la Clase |  | F4 | `probable` |
| Lun–Vie | 15:00–15:30 | Hora Toon / Lilo y Stitch de Disney |  | F4 | `probable` |
| Lun–Vie | 15:30–16:00 | Hora Toon / Las Aventuras de Brandy y el Sr. Bigotes |  | F4 | `probable` |
| Lun–Vie | 16:00–16:30 | Hora Toon / Jake Long: El Dragón Occidental |  | F4 | `probable` |
| Lun–Vie | 16:30–17:00 | Hora Toon / Recreo |  | F4 | `probable` |
| Lun–Vie | 17:00–17:30 | Hora Toon / La Familia Proud |  | F4 | `probable` |
| Lun–Vie | 17:30–18:00 | Hora Toon / Kim Possible |  | F4 | `probable` |
| Lun–Vie | 18:00–18:30 | Zapping Zone | Zapping Zone | F4 | `probable` |
| Lun–Vie | 18:30–19:00 | Es Tan Raven |  | F4 | `probable` |
| Lun–Vie | 19:00–19:30 | Mano a Mano |  | F4 | `probable` |
| Lun–Sáb | 19:30–20:00 | Lizzie McGuire |  | F4 | `probable` |
| Lun, Mié, Jue, Sáb | 20:00–22:00 | El Maravilloso Mundo de Disney |  | F4 | `probable` |
| Lun–Vie | 22:00–23:00 | Floricienta |  | F4 | `probable` |
| Lun–Vie | 23:00–23:30 | Phil del Futuro |  | F4 | `probable` |
| Lun, Mié, Vie | 23:30–00:00 | La Peor Bruja |  | F4 | `probable` |
| Lun–Vie | 00:00–00:30 | Zapping Zone | Zapping Zone | F4 | `probable` |
| Lun–Vie | 00:30–01:00 | Es Tan Raven |  | F4 | `probable` |
| Lun–Vie | 01:00–01:30 | Mano a Mano |  | F4 | `probable` |
| Lun–Vie | 01:30–02:00 | Lizzie McGuire |  | F4 | `probable` |
| Lun, Mié, Jue | 02:00–04:00 | El Maravilloso Mundo de Disney |  | F4 | `probable` |
| Lun–Vie | 04:00–04:30 | Art Attack de Disney |  | F4 | `probable` |
| Lun–Vie | 04:30–05:00 | La Familia Proud |  | F4 | `probable` |
| Lun–Vie | 05:00–05:30 | La Mascota de la Clase |  | F4 | `probable` |
| Lun–Vie | 05:30 | Kim Possible |  | F4 | `probable` |
| Mar, Vie | 20:00–21:30 | Disney Movie |  | F4 | `probable` |
| Mar | 21:30–22:00 | Zapping Music |  | F4 | `probable` |
| Mar, Jue | 23:30–00:00 | La Facultad Abracadabra |  | F4 | `probable` |
| Mar, Vie | 02:00–03:30 | Disney Movie |  | F4 | `probable` |
| Mar | 03:30–04:00 | Zapping Music |  | F4 | `probable` |
| Jue | 21:30–22:00 | Zapping Sports |  | F4 | `probable` |
| Jue | 03:30–04:00 | Zapping Sports |  | F4 | `probable` |
| Sáb, Dom | 07:00–07:30 | Bear en la Gran Casa Azul | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 07:30–08:00 | Las Nuevas Aventuras de Madeline | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 08:00–08:30 | El Circo de Jojo | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 09:00–09:30 | Rolie Polie Olie y su Familia | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 09:30–10:00 | Stanley | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 10:00–10:30 | Bear en la Gran Casa Azul | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 10:30–11:00 | El Libro de Pooh | Playhouse Disney | F4 | `probable` |
| Sáb, Dom | 12:00–12:30 | Disney Princesas / La Sirenita de Disney |  | F4 | `probable` |
| Sáb, Dom | 12:30–13:00 | Disney Princesas / Aladdin de Disney |  | F4 | `probable` |
| Sáb, Dom | 13:00–13:30 | Lilo y Stitch de Disney |  | F4 | `probable` |
| Sáb, Dom | 13:30–14:00 | Recreo |  | F4 | `probable` |
| Sáb, Dom | 14:00–14:30 | Pepper Ann |  | F4 | `probable` |
| Sáb, Dom | 14:30–15:00 | Kim Possible |  | F4 | `probable` |
| Sáb | 15:00–15:30 | Las Aventuras de Timón y Pumba |  | F4 | `probable` |
| Sáb | 15:30–16:00 | Buzz Lightyear: Comando Estelar |  | F4 | `probable` |
| Sáb | 16:00–16:30 | Sabrina: Secretos de la Brujita |  | F4 | `probable` |
| Sáb | 16:30–17:00 | Hércules de Disney |  | F4 | `probable` |
| Sáb, Dom | 17:00–17:30 | La Familia Proud |  | F4 | `probable` |
| Sáb, Dom | 17:30–18:00 | Art Attack de Disney |  | F4 | `probable` |
| Sáb | 18:00–18:30 | Es Tan Raven |  | F4 | `probable` |
| Sáb | 18:30–19:00 | Mano a Mano |  | F4 | `probable` |
| Sáb | 19:00–19:30 | Phil del Futuro |  | F4 | `probable` |
| Sáb, Dom | 21:30–23:30 | El Maravilloso Mundo de Disney |  | F4 | `probable` |
| Sáb | 23:30–00:00 | Lo Mejor de Zapping Zone |  | F4 | `probable` |
| Sáb | 00:00–00:30 | Aprendiendo a Vivir |  | F4 | `probable` |
| Sáb | 00:30–01:00 | Chico Listo |  | F4 | `probable` |
| Sáb | 01:00–02:30 | El Maravilloso Mundo de Disney |  | F4 | `probable` |
| Sáb, Dom | 02:30–04:30 | El Maravilloso Mundo de Disney |  | F4 | `probable` |
| Sáb | 04:30–05:00 | Lo Mejor de Zapping Zone |  | F4 | `probable` |
| Sáb, Dom | 05:00–05:30 | Disney Princesas / La Sirenita de Disney |  | F4 | `probable` |
| Sáb, Dom | 05:30 | Disney Princesas / Aladdin de Disney |  | F4 | `probable` |
| Dom | 15:00–16:30 | El Maravilloso Mundo de Disney |  | F4 | `probable` |
| Dom | 16:30–17:00 | Golazo: La Copa Jetix en Disney Channel |  | F4 | `probable` |
| Dom | 18:00–18:30 | Mejorando la Casa |  | F4 | `probable` |
| Dom | 18:30–20:00 | Película Disney Channel |  | F4 | `probable` |
| Dom | 20:00–21:30 | Mouse, Cámara, Acción |  | F4 | `probable` |
| Dom | 23:30–00:30 | Querida, Encogí a los Niños: La Serie |  | F4 | `probable` |
| Dom | 00:30–01:00 | Amor Fraternal |  | F4 | `probable` |
| Dom | 01:00–02:30 | Mouse, Cámara, Acción |  | F4 | `probable` |
| Dom | 04:30–05:00 | Kim Possible |  | F4 | `probable` |

### Día verificado: Disney Channel, viernes 2/9/2005 (México)

- **Fuente:** F3, guía diaria de Cablevisión Monterrey (México) para el viernes 2 septiembre 2005, [captura de Wayback Machine](https://web.archive.org/web/20050904014750/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm).
- **Señal / zona horaria:** la que recibía Cablevisión Monterrey, hora local de Monterrey. La guía lista el día de 00:00 a 23:30 del calendario, así que las primeras filas son la madrugada posterior al día anterior. No trae nombres de bloque.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Vie | 00:00–00:30 | Mano a mano |  | F3 | `verified` |
| Vie | 00:30–01:00 | Lizzie McGuire |  | F3 | `verified` |
| Vie | 01:00–03:00 | Bichos: Una aventura en miniatura |  | F3 | `verified` |
| Vie | 03:00–03:30 | Art attack |  | F3 | `verified` |
| Vie | 03:30–04:00 | La familia Proud |  | F3 | `verified` |
| Vie | 04:00–04:30 | La mascota de la clase |  | F3 | `verified` |
| Vie | 04:30–05:00 | Recreo |  | F3 | `verified` |
| Vie | 05:00–05:30 | Art attack |  | F3 | `verified` |
| Vie | 05:30–06:00 | Kim posible |  | F3 | `verified` |
| Vie | 06:00–06:30 | Las aventuras de PB & J Otter |  | F3 | `verified` |
| Vie | 06:30–07:00 | Las aventuras de Winnie Pooh |  | F3 | `verified` |
| Vie | 07:00–07:30 | Bear en la gran casa azul |  | F3 | `verified` |
| Vie | 07:30–08:00 | El libro de Pooh |  | F3 | `verified` |
| Vie | 08:00–08:30 | El circo de Jojo |  | F3 | `verified` |
| Vie | 08:30–09:00 | Los héroes de la ciudad |  | F3 | `verified` |
| Vie | 09:00–09:30 | Rolie Polie Olie |  | F3 | `verified` |
| Vie | 09:30–10:00 | Stanley |  | F3 | `verified` |
| Vie | 10:00–10:30 | El librito de la selva |  | F3 | `verified` |
| Vie | 10:30–11:00 | Quack pack |  | F3 | `verified` |
| Vie | 11:00–11:30 | El show del ratón |  | F3 | `verified` |
| Vie | 11:30–12:00 | 101 dálmatas |  | F3 | `verified` |
| Vie | 12:00–12:30 | Lilo y Stitch |  | F3 | `verified` |
| Vie | 12:30–13:00 | Art attack |  | F3 | `verified` |
| Vie | 13:00–13:30 | Teamo supremo |  | F3 | `verified` |
| Vie | 13:30–14:00 | La mascota de la clase |  | F3 | `verified` |
| Vie | 14:00–14:30 | Lilo y Stitch |  | F3 | `verified` |
| Vie | 14:30–15:00 | Brandy y el Sr. Bigotes |  | F3 | `verified` |
| Vie | 15:00–15:30 | Jake Long, El dragón occidental |  | F3 | `verified` |
| Vie | 15:30–16:00 | Recreo |  | F3 | `verified` |
| Vie | 16:00–16:30 | Art attack |  | F3 | `verified` |
| Vie | 16:30–17:00 | Kim possible |  | F3 | `verified` |
| Vie | 17:00–17:30 | Zapping Zone |  | F3 | `verified` |
| Vie | 17:30–18:00 | Es tan Raven |  | F3 | `verified` |
| Vie | 18:00–18:30 | Mano a mano |  | F3 | `verified` |
| Vie | 18:30–19:00 | Lizzie McGuire |  | F3 | `verified` |
| Vie | 19:00–21:00 | El novato |  | F3 | `verified` |
| Vie | 21:00–22:00 | Floricienta |  | F3 | `verified` |
| Vie | 22:00–22:30 | Phil del futuro |  | F3 | `verified` |
| Vie | 22:30–23:00 | La familia Proud |  | F3 | `verified` |
| Vie | 23:00–23:30 | Zapping Zone |  | F3 | `verified` |
| Vie | 23:30 | Es tan Raven |  | F3 | `verified` |

## Discovery Kids Latinoamérica

Discovery Kids no tenía bloques con nombre en las fuentes: su grilla es una rotación preescolar de medias horas. F3 y F4 coinciden totalmente en enero-febrero de 2004.

### Período: enero 2004

- **Fuente:** F4, [Programación de Discovery Kids | Enero 2004](https://forogrilladecanales.blogspot.com/2021/03/programacion-de-discovery-kids-enero.html). El post indica como origen `www.discoverykidslatino.com` y no enlaza capturas.
- **Señal / zona horaria:** Sin indicar. La sección "Viernes a Sábados" coincide 48 de 48 con Cablevisión Monterrey del viernes 20/2/2004: `verified`. El resto queda `probable`.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Jue | 06:00–06:30 | Fetch el Veterinario |  | F4 | `probable` |
| Todos los días | 06:30–07:00 | Thomas y Sus Amigos |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 07:00–07:30 | Plaza Sésamo |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Lun–Jue | 07:30–08:00 | El Mundo de Elmo |  | F4 | `probable` |
| Todos los días | 08:00–08:30 | Teletubbies |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Lun–Jue | 08:30–09:00 | Connie la Vaquita |  | F4 | `probable` |
| Todos los días | 09:00–09:30 | Paz |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 09:30–10:00 | Teletubbies |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 10:00–10:30 | Boo! |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Lun–Jue | 10:30–11:00 | Bob el Constructor |  | F4 | `probable` |
| Todos los días | 11:00–11:30 | Clifford |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 11:30–12:00 | Save-Ums! |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 12:00–12:30 | Barney y Sus Amigos |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 12:30–13:00 | Zoboomafoo |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Lun–Jue | 13:00–13:30 | El Mundo de Elmo |  | F4 | `probable` |
| Lun–Jue | 13:30–14:00 | Connie la Vaquita |  | F4 | `probable` |
| Todos los días | 14:00–14:30 | Paz |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 14:30–15:00 | Boo! |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 15:00–15:30 | Jay Jay el Avioncito |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Lun–Jue | 15:30–16:00 | Albie |  | F4 | `probable` |
| Todos los días | 16:00–16:30 | Clifford |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 16:30–17:00 | Save-Ums! |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 17:00–17:30 | Barney y Sus Amigos |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 17:30–18:00 | Zoboomafoo |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 18:00–18:30 | Boo! |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 18:30–19:00 | Paz |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 19:00–19:30 | Jay Jay el Avioncito |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Lun–Jue | 19:30–20:00 | Bob el Constructor |  | F4 | `probable` |
| Todos los días | 20:00–20:30 | Barney y Sus Amigos |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 20:30–21:00 | Save-Ums! |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 21:00–21:30 | Clifford |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 21:30–22:00 | Zoboomafoo |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 22:00–22:30 | Animales Asombrosos |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 22:30–23:30 | Plaza Sésamo |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Lun–Jue | 23:30–00:00 | El Mundo de Elmo |  | F4 | `probable` |
| Todos los días | 00:00–00:30 | Teletubbies |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Lun–Mié, Dom | 00:30–01:00 | Connie la Vaquita |  | F4 | `probable` |
| Todos los días | 01:00–01:30 | Paz |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 01:30–02:00 | Teletubbies |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 02:00–02:30 | Boo! |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Lun–Mié, Dom | 02:30–03:00 | Bob el Constructor |  | F4 | `probable` |
| Todos los días | 03:00–03:30 | Save-Ums! |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 03:30–04:00 | Clifford |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 04:00–05:00 | Barney y Sus Amigos |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 05:00–05:30 | Zoboomafoo |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Todos los días | 05:30 | Animales Asombrosos |  | F4 | `verified` (Vie, Sáb) / `probable` (Lun–Jue, Dom) |
| Jue–Sáb | 00:30–01:00 | Cubitos |  | F4 | `verified` (Vie, Sáb) / `probable` (Jue) |
| Jue–Sáb | 02:30–03:00 | Albie |  | F4 | `verified` (Vie, Sáb) / `probable` (Jue) |
| Vie–Dom | 06:00–06:30 | Las Aventuras de Henry |  | F4 | `verified` (Vie, Sáb) / `probable` (Dom) |
| Vie–Dom | 07:30–08:00 | Pequeños Planetas |  | F4 | `verified` (Vie, Sáb) / `probable` (Dom) |
| Vie–Dom | 08:30–09:00 | Cubitos |  | F4 | `verified` (Vie, Sáb) / `probable` (Dom) |
| Vie–Dom | 10:30–11:00 | Albie |  | F4 | `verified` (Vie, Sáb) / `probable` (Dom) |
| Vie–Dom | 13:00–13:30 | Pequeños Planetas |  | F4 | `verified` (Vie, Sáb) / `probable` (Dom) |
| Vie–Dom | 13:30–14:00 | Cubitos |  | F4 | `verified` (Vie, Sáb) / `probable` (Dom) |
| Vie–Dom | 15:30–16:00 | Bob el Constructor |  | F4 | `verified` (Vie, Sáb) / `probable` (Dom) |
| Vie–Dom | 19:30–20:00 | Albie |  | F4 | `verified` (Vie, Sáb) / `probable` (Dom) |
| Vie–Dom | 23:30–00:00 | Pequeños Planetas |  | F4 | `verified` (Vie, Sáb) / `probable` (Dom) |

### Período: agosto 2005

- **Fuente:** F4, [Programación de Discovery Kids | Agosto 2005 (celebrando el Día del Niño)](https://forogrilladecanales.blogspot.com/2023/09/programacion-de-discovery-kids-agosto.html). El post indica como origen `www.tudiscoverykids.com` y no enlaza capturas.
- **Señal / zona horaria:** Sin indicar.
- **Días especiales listados aparte en la fuente (no incluidos en la tabla):** Jueves 11 de agosto del 2005.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Lun–Mié | 06:00–06:15 | Teletubbies en Todas Partes |  | F4 | `probable` |
| Lun–Mié | 06:15–06:30 | Edelberto el Tigre |  | F4 | `probable` |
| Lun–Mié | 06:30–07:00 | Paz |  | F4 | `probable` |
| Lun–Mié | 07:00–07:30 | Caillou |  | F4 | `probable` |
| Todos los días | 07:30–08:00 | ¡Boo! |  | F4 | `probable` |
| Todos los días | 08:00–08:30 | Plaza Sésamo |  | F4 | `probable` |
| Todos los días | 08:30–09:00 | Little People |  | F4 | `probable` |
| Todos los días | 09:00–09:30 | Rubbadubbers |  | F4 | `probable` |
| Todos los días | 09:30–10:00 | El Mundo Divertido de Peep |  | F4 | `probable` |
| Todos los días | 10:00–10:30 | Toddworld |  | F4 | `probable` |
| Lun–Mié | 10:30–11:00 | Poko |  | F4 | `probable` |
| Todos los días | 11:00–11:30 | Los Hermanos Koala |  | F4 | `probable` |
| Todos los días | 11:30–12:00 | Clifford |  | F4 | `probable` |
| Todos los días | 12:00–12:30 | LazyTown |  | F4 | `probable` |
| Lun–Mié | 12:30–13:00 | Las Aventuras de Henry |  | F4 | `probable` |
| Lun–Vie | 13:00–13:30 | Barney y Sus Amigos |  | F4 | `probable` |
| Todos los días | 13:30–14:00 | ¡Jakers!: Las Aventuras de Piggley Winks |  | F4 | `probable` |
| Todos los días | 14:00–14:30 | Dragon Tales |  | F4 | `probable` |
| Todos los días | 14:30–15:00 | Save-Ums! |  | F4 | `probable` |
| Todos los días | 15:00–15:30 | Engie Benjy |  | F4 | `probable` |
| Lun–Mié | 15:30–16:00 | Backyardigans |  | F4 | `probable` |
| Lun–Mié | 16:00–16:30 | Las Aventuras de Henry |  | F4 | `probable` |
| Todos los días | 16:30–17:00 | Los Hermanos Koala |  | F4 | `probable` |
| Lun–Mié | 17:00–17:30 | Clifford |  | F4 | `probable` |
| Todos los días | 17:30–18:00 | Save-Ums! |  | F4 | `probable` |
| Lun–Vie | 18:00–18:30 | Barney y Sus Amigos |  | F4 | `probable` |
| Todos los días | 18:30–19:00 | Backyardigans |  | F4 | `probable` |
| Todos los días | 19:00–19:30 | LazyTown |  | F4 | `probable` |
| Todos los días | 19:30–20:00 | Dragon Tales |  | F4 | `probable` |
| Todos los días | 20:00–20:30 | Bob el Constructor |  | F4 | `probable` |
| Todos los días | 20:30–21:00 | Engie Benjy |  | F4 | `probable` |
| Todos los días | 21:00–21:30 | Barney y Sus Amigos |  | F4 | `probable` |
| Todos los días | 21:30–22:00 | Save-Ums! |  | F4 | `probable` |
| Todos los días | 22:00–22:30 | Clifford |  | F4 | `probable` |
| Todos los días | 22:30–23:00 | ¡Jakers!: Las Aventuras de Piggley Winks |  | F4 | `probable` |
| Todos los días | 23:00–23:30 | Zoboomafoo |  | F4 | `probable` |
| Todos los días | 23:30–00:00 | Little Robots |  | F4 | `probable` |
| Todos los días | 00:00–00:30 | Jay, Jay el Avioncito |  | F4 | `probable` |
| Lun–Jue, Dom | 00:30–01:00 | El Mundo de Elmo |  | F4 | `probable` |
| Todos los días | 01:00–01:30 | Teletubbies |  | F4 | `probable` |
| Lun–Jue, Dom | 01:30–02:00 | Connie la Vaquita |  | F4 | `probable` |
| Todos los días | 02:00–02:30 | Paz |  | F4 | `probable` |
| Todos los días | 02:30–02:45 | Teletubbies en Todas Partes |  | F4 | `probable` |
| Todos los días | 02:45–03:00 | Edelberto el Tigre |  | F4 | `probable` |
| Todos los días | 03:00–03:30 | ¡Boo! |  | F4 | `probable` |
| Todos los días | 03:30–04:00 | Bob el Constructor |  | F4 | `probable` |
| Todos los días | 04:00–04:30 | Save-Ums! |  | F4 | `probable` |
| Lun–Mié, Dom | 04:30–05:00 | Clifford |  | F4 | `probable` |
| Todos los días | 05:00–05:30 | Barney y Sus Amigos |  | F4 | `probable` |
| Todos los días | 05:30 | ¡Jakers!: Las Aventuras de Piggley Winks |  | F4 | `probable` |
| Jue–Dom | 06:00–06:30 | Jay, Jay el Avioncito |  | F4 | `probable` |
| Jue–Dom | 06:30–07:00 | Cubitos |  | F4 | `probable` |
| Jue–Dom | 07:00–07:30 | Connie la Vaquita |  | F4 | `probable` |
| Jue–Dom | 10:30–11:00 | El Mundo de Elmo |  | F4 | `probable` |
| Jue–Dom | 12:30–13:00 | Harry y Su Cubeta de Dinosaurios |  | F4 | `probable` |
| Jue–Dom | 15:30–16:00 | El Pequeño Tractor Rojo |  | F4 | `probable` |
| Jue–Dom | 16:00–16:30 | Backyardigans |  | F4 | `probable` |
| Jue–Dom | 17:00–17:30 | Clifford de Cachorrito |  | F4 | `probable` |
| Jue–Sáb | 04:30–05:00 | Clifford de Cachorrito |  | F4 | `probable` |
| Vie, Sáb | 00:30–01:00 | Pequeños Planetas |  | F4 | `probable` |
| Vie, Sáb | 01:30–02:00 | Cubitos |  | F4 | `probable` |
| Sáb, Dom | 13:00–13:30 | Las Aventuras de Henry |  | F4 | `probable` |
| Sáb, Dom | 18:00–18:30 | Thomas y Sus Amigos |  | F4 | `probable` |

### Día verificado: Discovery Kids, viernes 4/3/2005 (México)

- **Fuente:** F3, guía diaria de Cablevisión Monterrey (México) para el viernes 4 marzo 2005, [captura de Wayback Machine](https://web.archive.org/web/20050307054916/http://www.cablevision.com.mx:80/programacion/canales/Canal108.htm).
- **Señal / zona horaria:** la que recibía Cablevisión Monterrey, hora local de Monterrey. La guía lista el día de 00:00 a 23:30 del calendario, así que las primeras filas son la madrugada posterior al día anterior. No trae nombres de bloque.

| Día | Hora | Programa | Bloque | Fuente | Certeza |
| --- | ---: | -------- | ------ | ------ | ------- |
| Vie | 00:00–00:30 | Teletubbies |  | F3 | `verified` |
| Vie | 00:30–01:00 | Connie |  | F3 | `verified` |
| Vie | 01:00–01:30 | Paz |  | F3 | `verified` |
| Vie | 01:30–02:00 | Teletubbies |  | F3 | `verified` |
| Vie | 02:00–02:30 | ¡Boo! |  | F3 | `verified` |
| Vie | 02:30–03:00 | Bob |  | F3 | `verified` |
| Vie | 03:00–03:30 | Save-Ums! |  | F3 | `verified` |
| Vie | 03:30–04:00 | Clifford |  | F3 | `verified` |
| Vie | 04:00–04:30 | Barney y sus Amigos |  | F3 | `verified` |
| Vie | 04:30–05:00 | Jakers! |  | F3 | `verified` |
| Vie | 05:00–05:30 | Zoboomafoo |  | F3 | `verified` |
| Vie | 05:30–06:00 | Little Robots |  | F3 | `verified` |
| Vie | 06:00–06:30 | Las Aventuras de Henry |  | F3 | `verified` |
| Vie | 06:30–07:00 | Teletubbies |  | F3 | `verified` |
| Vie | 07:00–07:30 | Plaza Sésamo |  | F3 | `verified` |
| Vie | 07:30–08:00 | Little People |  | F3 | `verified` |
| Vie | 08:00–08:30 | Paz |  | F3 | `verified` |
| Vie | 08:30–09:00 | Jay Jay |  | F3 | `verified` |
| Vie | 09:00–09:30 | Toddworld |  | F3 | `verified` |
| Vie | 09:30–10:00 | El Mundo Divertido de Peep |  | F3 | `verified` |
| Vie | 10:00–10:30 | Poko |  | F3 | `verified` |
| Vie | 10:30–11:00 | ¡Boo! |  | F3 | `verified` |
| Vie | 11:00–11:30 | Caillou |  | F3 | `verified` |
| Vie | 11:30–12:00 | Los hermanos Koala |  | F3 | `verified` |
| Vie | 12:00–12:30 | Little Robots |  | F3 | `verified` |
| Vie | 12:30–13:00 | Las Aventuras de Henry |  | F3 | `verified` |
| Vie | 13:00–13:30 | Jakers! |  | F3 | `verified` |
| Vie | 13:30–14:00 | Barney y sus amigos |  | F3 | `verified` |
| Vie | 14:00–15:00 | Save-Ums! |  | F3 | `verified` |
| Vie | 15:00–15:30 | Jakers! |  | F3 | `verified` |
| Vie | 15:30–16:30 | Clifford |  | F3 | `verified` |
| Vie | 16:30–17:00 | Save-Ums! |  | F3 | `verified` |
| Vie | 17:00–17:30 | Barney y sus Amigos |  | F3 | `verified` |
| Vie | 17:30–18:00 | Zoboomafoo |  | F3 | `verified` |
| Vie | 18:00–18:30 | Dragon Tales |  | F3 | `verified` |
| Vie | 18:30–19:00 | Los hermanos Koala |  | F3 | `verified` |
| Vie | 19:00–19:30 | Bob |  | F3 | `verified` |
| Vie | 19:30–20:00 | Engie Benjy |  | F3 | `verified` |
| Vie | 20:00–20:30 | Barney y sus amigos |  | F3 | `verified` |
| Vie | 20:30–21:00 | Save-Ums! |  | F3 | `verified` |
| Vie | 21:00–21:30 | Clifford |  | F3 | `verified` |
| Vie | 21:30–22:00 | Jakers! |  | F3 | `verified` |
| Vie | 22:00–22:30 | Zoboomafoo |  | F3 | `verified` |
| Vie | 22:30–23:00 | Little Robots |  | F3 | `verified` |
| Vie | 23:00–23:30 | Jay Jay |  | F3 | `verified` |
| Vie | 23:30 | El Mundo de Elmo |  | F3 | `verified` |

## Patrones de bloques

### Cartoon Network y Boomerang (derivado de F1)

Esta tabla resume, por año, el horario más frecuente de cada bloque en las grillas mensuales de F1. Excluye las grillas apoyadas solo en fuentes brasileñas. En Boomerang (hasta marzo 2006) la franja indicada es la del primer ciclo, que se repetía 8 y 16 horas después. La certeza hereda la de la grilla de origen: `verified` o `probable` desde 2000, `uncertain` para 1994-1996 (señal de EE.UU.).

| Canal | Bloque | Años observados | Grillas mensuales | Horario más frecuente por año |
| ----- | ------ | --------------- | ----------------: | ----------------------------- |
| Boomerang | Boomeraction | 2001–2006 | 41 | **2001** (3/3 meses): Todos los días 09:00–10:00<br>**2002** (4/4 meses): Todos los días 09:00–10:00<br>**2003** (7/7 meses): Lun–Vie 08:00–09:00 y 11:00–12:00; Sáb, Dom 10:00–12:00<br>**2004** (9/12 meses): Lun–Vie 08:00–09:00 y 11:00–12:00; Sáb, Dom 10:00–12:00<br>**2005** (9/12 meses): Lun–Vie 11:00–12:00; Sáb, Dom 10:00–12:00<br>**2006** (3/3 meses): Lun–Vie 11:00–12:00; Sáb, Dom 10:00–12:00 |
| Boomerang | La Hora Boomerang | 2004–2005 | 13 | **2004** (2/2 meses): Lun–Vie 10:00–11:00<br>**2005** (11/11 meses): Lun–Vie 10:00–11:00 |
| Boomerang | CineBoom | 2005–2006 | 14 | **2005** (6/11 meses): Lun–Sáb 08:00–09:00<br>**2006** (3/3 meses): Lun–Sáb 08:00–09:00 |
| Boomerang | Rodeo Cartoon de Hanna-Barbera | 2005–2006 | 10 | **2005** (7/7 meses): Lun–Vie 06:00–07:00<br>**2006** (3/3 meses): Lun–Vie 06:00–07:00 |
| Boomerang | Película Boomerang | 2006–2007 | 4 | **2006** (1/3 meses): Sáb 19:00–21:00<br>**2007** (1/1 meses): Lun–Vie 19:00–21:00 |
| Cartoon Network | Caricatoons de la Tarde | 1994–1996 | 9 | **1994** (1/1 meses): Lun–Vie 12:00–14:00<br>**1995** (3/5 meses): Lun–Vie 12:00–14:00<br>**1996** (3/3 meses): Lun–Vie 12:00–15:00 |
| Cartoon Network | Aventuras de la Tarde | 1995–1996 | 10 | **1995** (4/4 meses): Lun–Vie 16:30–18:30<br>**1996** (3/6 meses): Lun–Vie 15:00–18:00 |
| Cartoon Network | Toonapalooza | 1995–1996 | 9 | **1995** (4/4 meses): Vie 00:00–02:00; Sáb 10:00–12:00<br>**1996** (4/5 meses): Vie 00:00–02:00; Sáb 10:00–12:00 |
| Cartoon Network | Sunday Afternoon Mysteries | 1995–1996 | 9 | **1995** (4/5 meses): Dom 13:00–17:00<br>**1996** (4/4 meses): Dom 13:00–17:00 |
| Cartoon Network | La Súper Explosión de los 70 | 1995–1996 | 9 | **1995** (2/4 meses): Mié 22:00–06:00<br>**1996** (2/5 meses): Mié 22:00–02:00 |
| Cartoon Network | Power Zone | 1995–1995 | 3 | **1995** (2/3 meses): Sáb 00:15–00:45 y 01:00–01:30 y 02:00–02:30 y 03:00–03:30 y 04:00–04:30 |
| Cartoon Network | Misterios S.A. | 1996–1998 | 13 | **1996** (5/5 meses): Dom 18:00–21:00<br>**1997** (3/3 meses): Dom 18:00–21:00<br>**1998** (5/5 meses): Dom 12:00–14:00 |
| Cartoon Network | Gran Miércoles | 1997–1997 | 2 | **1997** (2/2 meses): Mié 20:30–22:30 |
| Cartoon Network | Hora ACME | 1998–2007 | 102 | **1998** (3/5 meses): Lun–Vie 07:00–08:00; Sáb 06:00–07:00 y 21:00–23:00; Dom 10:00–11:00<br>**1999** (5/10 meses): Lun–Vie 07:00–08:00; Sáb 06:00–07:00 y 21:00–23:00; Dom 10:00–11:00<br>**2000** (10/12 meses): Lun–Vie 11:00–12:00 y 04:00–06:00; Sáb 06:00–07:00 y 21:00–23:00; Dom 10:00–11:00<br>**2001** (12/12 meses): Lun–Vie 11:00–12:00 y 04:00–06:00; Sáb 06:00–07:00 y 21:00–23:00; Dom 10:00–11:00<br>**2002** (5/9 meses): Lun–Vie 11:00–12:00 y 05:00–06:00; Sáb 06:00–07:00 y 21:00–23:00; Dom 10:00–11:00 y 00:00–01:15<br>**2003** (5/11 meses): Lun–Vie 11:00–12:00 y 05:00–06:00; Sáb 06:00–07:00 y 21:00–23:00; Dom 00:00–01:15<br>**2004** (4/12 meses): Lun–Vie 05:00–06:00; Sáb 06:00–07:00; Dom 02:00–03:00<br>**2005** (9/12 meses): Lun–Vie 05:00–06:00; Sáb 06:00–07:00<br>**2006** (11/11 meses): Lun–Vie 05:00–06:00; Sáb 06:00–07:00 y 05:00–06:00<br>**2007** (7/8 meses): Lun–Sáb 05:00–06:00 |
| Cartoon Network | Cinetoon | 1998–2004 | 71 | **1998** (5/5 meses): Sáb 09:00–10:00<br>**1999** (7/10 meses): Sáb 09:00–10:00<br>**2000** (12/12 meses): Sáb 09:00–10:00<br>**2001** (12/12 meses): Sáb 09:00–10:00<br>**2002** (9/9 meses): Sáb 09:00–10:00<br>**2003** (11/11 meses): Sáb 09:00–10:00<br>**2004** (11/12 meses): Sáb 09:00–10:00 |
| Cartoon Network | SuperToons | 1998–1998 | 2 | **1998** (1/2 meses): Lun–Vie 16:00–18:10 |
| Cartoon Network | Teatro Cartoon | 1999–2008 | 111 | **1999** (10/10 meses): Dom 14:00–16:00<br>**2000** (11/12 meses): Dom 14:00–16:00<br>**2001** (12/12 meses): Dom 14:00–16:00<br>**2002** (9/9 meses): Dom 14:00–16:00<br>**2003** (10/10 meses): Dom 14:00–16:00<br>**2004** (12/12 meses): Dom 14:00–16:00<br>**2005** (10/12 meses): Sáb 18:00–20:00; Dom 14:00–16:00<br>**2006** (5/11 meses): Sáb 18:00–20:00; Dom 14:00–16:00<br>**2007** (5/12 meses): Vie 20:00–22:00; Dom 14:00–16:00<br>**2008** (10/11 meses): Vie 20:00–22:00; Dom 14:00–16:00 |
| Cartoon Network | Cartoon Cartoons | 2000–2007 | 85 | **2000** (10/12 meses): Lun–Jue 02:00–04:00; Vie 20:00–22:00 y 02:00–04:00; Sáb 11:00–13:00; Dom 19:00–21:00<br>**2001** (8/12 meses): Lun–Jue 02:00–04:00; Vie 20:00–22:00 y 02:00–04:00; Sáb 11:00–13:00; Dom 19:00–21:00<br>**2002** (5/9 meses): Lun–Jue 02:00–03:00; Vie 20:00–22:00 y 02:00–03:00; Sáb 11:00–13:00; Dom 19:00–21:00<br>**2003** (10/11 meses): Lun–Jue 02:00–03:00; Vie 20:00–22:00 y 02:00–03:00; Sáb 11:00–13:00; Dom 19:00–21:00<br>**2004** (5/12 meses): Lun–Jue 02:00–03:00; Vie 20:00–22:00 y 02:00–03:00; Sáb 11:00–13:00; Dom 19:00–21:00<br>**2005** (5/10 meses): Lun–Jue 02:00–03:00; Vie 20:00–21:00 y 02:00–03:00; Sáb 11:00–12:00; Dom 19:00–20:00<br>**2006** (4/7 meses): Sáb 09:00–10:00<br>**2007** (7/12 meses): Lun–Sáb 09:00–10:00 |
| Cartoon Network | Votatoon | 2000–2008 | 100 | **2000** (10/10 meses): Sáb 15:00–18:00<br>**2001** (12/12 meses): Sáb 15:00–18:00<br>**2002** (9/9 meses): Sáb 15:00–18:00<br>**2003** (11/11 meses): Sáb 15:00–18:00<br>**2004** (12/12 meses): Sáb 15:00–18:00<br>**2005** (12/12 meses): Sáb 15:00–18:00<br>**2006** (11/11 meses): Sáb 15:00–18:00<br>**2007** (12/12 meses): Sáb 15:00–18:00<br>**2008** (11/11 meses): Sáb 15:00–18:00 |
| Cartoon Network | Talismán | 2000–2001 | 13 | **2000** (10/10 meses): Lun–Vie 17:00–19:00 y 00:00–02:00<br>**2001** (3/3 meses): Lun–Vie 17:00–19:00 y 00:00–02:00 |
| Cartoon Network | Boomerang (bloque) | 2001–2001 | 5 | **2001** (5/5 meses): Dom 01:00–06:00 |
| Cartoon Network | Toonami | 2002–2007 | 50 | **2002** (1/1 meses): Lun–Vie 17:00–19:00<br>**2003** (11/11 meses): Lun–Vie 17:00–19:00<br>**2004** (5/12 meses): Lun–Vie 17:00–19:00<br>**2005** (7/12 meses): Lun–Vie 00:00–02:00; Sáb 23:00–03:00<br>**2006** (11/11 meses): Lun–Jue 00:00–02:00<br>**2007** (3/3 meses): Lun–Jue 00:00–02:00 |
| Cartoon Network | El show de Cartoon Cartoons (programa, no el bloque) | 2003–2005 | 10 | **2003** (4/4 meses): Lun–Jue 20:00–20:30<br>**2005** (6/6 meses): Lun–Vie 10:00–10:30 |
| Cartoon Network | Horario Central | 2003–2004 | 16 | **2003** (5/5 meses): Lun–Jue 19:00–22:00<br>**2004** (11/11 meses): Lun–Jue 19:00–22:00 |
| Cartoon Network | X2 (Por dos) | 2005–2006 | 3 | **2005** (1/2 meses): Lun–Jue 09:00–19:00; Vie 09:00–16:00 y 19:00–21:00; Sáb 09:00–12:00 y 13:00–14:00 y 20:00–21:00; Dom 11:00–13:00 y 18:00–20:00<br>**2006** (1/1 meses): Lun–Jue 09:00–19:00; Vie 09:00–16:00 y 19:00–20:00; Sáb 09:00–11:00 y 13:00–14:00 y 20:00–21:00; Dom 11:00–14:00 y 18:00–19:00 |
| Cartoon Network | Adult Swim | 2007–2008 | 8 | **2007** (5/6 meses): Vie–Dom 01:00–03:15<br>**2008** (2/2 meses): Vie–Dom 01:00–03:15 |

Complementos que no salen en la tabla porque F1 los pone en una tabla aparte:
- **Adult Swim** (Cartoon Network), viernes a domingo por la noche:
  - octubre 2005: 23:00–01:00;
  - noviembre 2005: 23:00–05:00;
  - enero 2006 a febrero 2008: 01:00–03:00, y 01:00–03:15 en 2007-2008.
- **Toonami** (Cartoon Network):
  - 2002-2004: lunes a viernes de 17:00 a 19:00;
  - 2005: de lunes a viernes de 00:00 a 02:00, más sábados de 23:00 a 03:00;
  - 2006-2007: lunes a jueves de 00:00 a 02:00.
- **"El show de Cartoon Cartoons"** es un programa, no el bloque: estuvo en 2003 de lunes a jueves a las 20:00 y en 2005 de lunes a viernes a las 10:00.

### Otros canales

| Canal | Bloque | Patrón | Período | Fuente | Certeza |
| ----- | ------ | ------ | ------- | ------ | ------- |
| Fox Kids | Girl Power | Lun–Vie 09:00–11:00 (2001) / 07:30–09:00 (2003) | 2001–2003 | F4, F6 | `probable` |
| Fox Kids | Súper Chiflados | Lun–Vie 11:00–14:30 | 2001 | F4, F6 | `probable` |
| Fox Kids | Invasión Animé | Todos los días 17:30–20:00 (2001); Lun–Vie 14:30–18:30 (2003) | 2001–2003 | F4 | `probable` |
| Fox Kids | Mysteria | Lun–Vie 20:00–21:30 | 2001 | F4 | `probable` |
| Fox Kids | Clásicos a la Medianoche | Lun–Vie 23:00–00:00 | 2001 | F4, F6 | `probable` |
| Fox Kids | Insomnio | Lun–Vie 00:00–06:00 (2001); 20:00 en adelante (2003) | 2001–2003 | F4, F6 | `probable` |
| Jetix | ver tabla de bloques de agosto 2004 | | 2004–2005 | F5 | `probable` |
| Nickelodeon | Nick Jr. | Lun–Vie 08:00–11:00 (1999, ago 2001); 12:00–15:00 (jul 2001); 08:00–09:30 (2003–2004); 07:00–08:30 (2005) | 1999–2005 | F4 | `probable` |
| Nickelodeon | Nicktoons | Lun–Vie 15:00–17:00, con otras apariciones sueltas | 1999–2003 | F4 | `probable` |
| Nickelodeon | Nick@Nite | Todos los días 22:00–05:30 (Zona Sur); fines de semana hasta el 4/7/2009 | 2006–2010 | F5 | `probable` |
| Disney Channel | Playhouse Disney | Lun–Vie 08:00–12:00 (2004); 07:00–11:00 (2005) | 2004–2005 | F4, F3 | `verified` (2004), `probable` (2005) |
| Disney Channel | Zapping Zone | Lun–Vie 18:00, repetición 23:00 (ene 2004, jul 2005) o 00:00 (ago 2005) | 2004–2005 | F4, F3 | `verified` (2004), `probable` (2005) |

### Patrones generales

- **Días de semana contra fin de semana.** Todas las fuentes separan lunes a viernes (Cartoon Network: lunes a jueves más un viernes distinto) de sábado y domingo. El viernes por la noche suele ser especial: Cartoon Cartoons de 20:00 a 22:00 en 2000-2004 y Adult Swim desde 2005.
- **Rotación de madrugada.** De 00:00 a 06:00 se repiten series del día (Cartoon Network, Fox Kids), se emiten bloques de clásicos (Clásicos a la Medianoche, Insomnio) o se programa para adultos (Adult Swim, Toonami desde 2005, Nick@Nite).
- **Ciclos.** Boomerang (2001-2006) repetía 8 horas tres veces al día. Nick@Nite repite una rotación de 7-8 sitcoms durante toda la noche.
- **Franjas estables durante años:** Votatoon (sábados 15:00–18:00, 2000–2008), Teatro Cartoon (domingos 14:00–16:00, 1999–2008), Cinetoon (sábados 09:00–10:00, 1998–2004), Hora ACME (de mañana en 1998-2003 y en la última franja de la madrugada, 05:00–06:00, en 2004-2007).
- **Maratones y especiales.** Están fechados en las notas de F1 y F4; por ejemplo, 59 horas de Pokémon del 30/12/2000 al 1/1/2001 y la Semana del Niño de agosto 2005 en todos los canales. Son eventos del Timeline, no parte de la grilla regular.
- **Cambios de grilla.** Suelen coincidir con el primer día hábil del mes o con relanzamientos: Cartoon Network en enero 2005 (nueva imagen), Boomerang el 3/4/2006, Jetix el 31/7/2004.

## Eventos para el Timeline

Fechas encontradas durante la investigación. Todas pueden cargarse como `TimelineEvent` con fecha parcial.

| Fecha | Canal | Evento | Tipo sugerido | Fuente | Certeza |
| ----- | ----- | ------ | ------------- | ------ | ------- |
| 1993-04-30 | Cartoon Network | Lanzamiento en Latinoamérica | CHANNEL_LAUNCH | F1 (nota de aniversario en F4) | `probable` |
| 1996-05 | Cartoon Network | Último mes de la señal latina como extensión directa de la de EE.UU. | OTHER | F1 | `probable` |
| 1998-01 | Cartoon Network | Estreno del bloque Hora ACME (día desconocido) | BLOCK_LAUNCH | F1 | `probable` |
| 2000-01-07 | Cartoon Network | Estreno del bloque Cartoon Cartoon(s) | BLOCK_LAUNCH | F1 | `probable` |
| 2000-02-12 | Cartoon Network | Estreno de Votatoon | BLOCK_LAUNCH | F1 | `probable` |
| 2000-03-06 | Cartoon Network | Estreno del bloque Talismán (termina en marzo 2001) | BLOCK_LAUNCH | F1 | `probable` |
| 2001-03-01 | Fox Kids | Estreno de Invasión Animé | BLOCK_LAUNCH | F6 | `probable` |
| 2001-03-03 | Fox Kids | Estreno de Mysteria, junto con Real Scary Stories | BLOCK_LAUNCH | F6 | `probable` |
| 2001-06 | Cartoon Network | Último mes de los bloques Boomerang, Cartoon-A-Doodle-Doo y Toons Mundialmente Famosas | BLOCK_END | F1 | `probable` |
| 2001-07 | Boomerang | Lanzamiento del canal (primera grilla en F1: julio 2001) | CHANNEL_LAUNCH | F1 | `probable` |
| 2002-12-02 | Cartoon Network | Estreno de Toonami | BLOCK_LAUNCH | F1 | `probable` |
| 2003-02-01 | Cartoon Network | Estreno del bloque Primera Fila (termina en diciembre 2004) | BLOCK_LAUNCH | F1 | `probable` |
| 2003-08-04 | Cartoon Network | Estreno del bloque Horario Central | BLOCK_LAUNCH | F1 | `probable` |
| 2004-07-31 | Fox Kids / Jetix | Fox Kids es reemplazado por Jetix | REBRAND | F5 | `verified` (F3 muestra Jetix el 9/8/2004) |
| 2005-01 | Cartoon Network | Nueva imagen; Cinetoon pasa a Boomerang como CineBoom | REBRAND | F1 | `probable` |
| 2005-06-06 | Boomerang | Estreno de Rodeo Cartoon de Hanna-Barbera | BLOCK_LAUNCH | F1, F2 | `verified` |
| 2005-10-07 | Cartoon Network | Estreno de Adult Swim | BLOCK_LAUNCH | F6, F1 | `verified` |
| 2006-02 | Nickelodeon | Estreno de Nick@Nite. Fuentes secundarias ([Nickelodeon Wiki](https://nickelodeon.fandom.com/wiki/Nick_at_Nite_(Latin_America)), Wikipedia en inglés) dan el 6/2 o el 13/2; no se pudo confirmar el día. | BLOCK_LAUNCH | Nickelodeon Wiki | `probable` |
| 2006-04-03 | Boomerang | Relanzamiento: 24 horas, enfoque juvenil, fin del ciclo de 8 horas | REBRAND | F1 | `verified` (F3 3/4/2006) |
| 2007-03-23 | Cartoon Network | Última emisión de Toonami | BLOCK_END | F1 | `probable` |
| 2007-08-01 | Cartoon Network | Estreno del bloque Cinemanía | BLOCK_LAUNCH | F1 | `probable` |
| 2007-09 | Cartoon Network | Último mes de Hora ACME en su formato original | BLOCK_END | F1 | `probable` |
| 2008-01 | Cartoon Network | Retiro de la marca Cartoon Cartoons (relanzada como Cartoon POP) | BLOCK_END | F1 | `probable` |
| 2008-03-07 | Cartoon Network | Última emisión de Adult Swim en Cartoon Network | BLOCK_END | F1, F6 | `verified` |
| 2009-07-04 | Nickelodeon | Nick Hits reemplaza a Nick@Nite los fines de semana | OTHER | F5 | `probable` |

## Períodos reconstruibles con suficiente confianza

| Canal | Período | Base | Certeza |
| ----- | ------- | ---- | ------- |
| Cartoon Network | oct 2000 – dic 2002 (mensual) | F1 con capturas oficiales | `verified` |
| Cartoon Network | nov 2003 – abr 2006 (mensual) | F1 contrastado con 12 días de F3 | `probable`; los días de F3 son `verified` |
| Cartoon Network | oct 2005 | F1 + F2 (47/47) | `verified` |
| Cartoon Network | 1997 – 1999 | F1 con prensa argentina en algunos meses (oct y dic 1998, abr-may 1999) | `probable` en esos meses; `uncertain` en el resto |
| Cartoon Network | 2006 – 2008 | F1 con DirecTV Latinoamérica y Cable Mágico | `probable` |
| Boomerang | jul 2001 – mar 2006 | F1 con capturas oficiales + 11 días de F3 | `verified` |
| Boomerang | abr 2006 – oct 2006 | F1 + F4 + F3 | `verified` en abril, `probable` en el resto |
| Fox Kids | ago 2001, ene 2003, ene 2004 | F4 (Zona Sur) | `probable` |
| Fox Kids | dic 2003 – jun 2004 (4 días) | F3 (México) | `verified` |
| Jetix | ago 2004 – abr 2006 (9 días) | F3 (México) | `verified` |
| Jetix | ago 2005 | F4, contrastado con F3 | `verified` (lun-vie), `probable` (fin de semana) |
| Nickelodeon | nov 1999, jul-ago 2001, ene 2003, ene 2004, jul-ago 2005 | F4 | `probable` |
| Nickelodeon | dic 2003 – abr 2006 (11 días) | F3 | `verified` |
| Nickelodeon (Nick@Nite) | 2008 – 2010 (rotación) | F5 | `probable` |
| Disney Channel | ene 2004 | F4, contrastado con F3 | `verified` (lun-vie) |
| Disney Channel | jul-ago 2005 | F4 | `probable` |
| Disney Channel | dic 2003 – abr 2006 (12 días) | F3 | `verified` |
| Discovery Kids | ene 2004 | F4, contrastado con F3 (48/48) | `verified` (vie-sáb), `probable` (resto) |
| Discovery Kids | dic 2003 – abr 2006 (7 días) | F3 | `verified` |

## Programas y bloques encontrados

- **Bloques con horario documentado:**
  - Cartoon Network: Hora ACME, Cinetoon, Teatro Cartoon, Cartoon Cartoons, Votatoon, Talismán, Toonami, Horario Central, Primera Fila, Adult Swim, Cinemanía, X2 y varios bloques de los años 90 (Caricatoons de la Tarde, Aventuras de la Tarde, Toonapalooza, Misterios S.A.).
  - Boomerang: Boomeraction, La Hora Boomerang, CineBoom, Rodeo Cartoon de Hanna-Barbera y Mini TV/Película Boomerang (2006).
  - Fox Kids: Girl Power, Súper Chiflados, Invasión Animé, Mysteria, Clásicos a la Medianoche, Insomnio y Cineskopio.
  - Jetix: Súper Horas, Invasión Animé, Mysteria, Generación Power Rangers, Doble Carga, Cineskopio y ¿Quién tiene el control?
  - Nickelodeon: Nick Jr., Nicktoons y Nick@Nite.
  - Disney Channel: Playhouse Disney y Zapping Zone.
- **Bloques del catálogo sin grilla con contenido:**
  - Rodeo Cartoon aparece solo como contenedor de una hora.
  - BoomBox aparece solo como "ESPECIAL: BoomBox" un domingo de junio 2005; el segmento musical de 2007-2014 no tiene grilla.
  - Nick at Nite antes de 2008 no tiene rotación documentada.
- **Programas:** las tablas incluyen varios cientos de títulos distintos. Muchos coinciden con series del catálogo, pero con otro nombre ("Hombre-X: Evolución", "El Pájaro Loco"). Otros no están en el catálogo: preescolares de Discovery Kids, películas, sitcoms de Disney. La correspondencia título → serie es un paso aparte (ver la propuesta).

## Datos inciertos o pendientes

- **Cartoon Network 1993 – mayo 1996:** grillas basadas en la señal de EE.UU. (`uncertain` para Latinoamérica).
- **Cartoon Network 1997-1999:** varias grillas se apoyan solo en prensa brasileña (por ejemplo jun y dic 1997, ene-abr 1998, sep y nov 1998, ago-sep 1999): `uncertain`.
- **Fox Kids 1996-2000:** no se encontraron grillas.
- **Disney Channel y Discovery Kids antes de fines de 2003:** no se encontraron grillas.
- **Nick Jr. como canal independiente:** no documentado en el período. Solo existe como bloque dentro de Nickelodeon.
- **Jetix 2006-2009:** solo quedan maratones puntuales (F5, 2009) y el último día de F3 (abril 2006).
- **Contenido de bloques contenedor:** Rodeo Cartoon, Cartoon Cartoons (el bloque), Hora ACME, Cinetoon, Votatoon y Teatro Cartoon aparecen en muchas grillas sin las series o películas concretas. F1 lista algunas películas y votaciones en notas mensuales.
- **Señal de F4:** el blog casi nunca indica señal ni zona horaria. Solo se pudo deducir en Fox Kids (Zona Sur) y en los canales contrastados con F3.
- **Diferencias de F3:** cada guía es un día concreto y puede incluir especiales de ese día. No representa necesariamente la grilla regular del mes.

## Propuesta de estructura de datos

El esquema actual tiene `Schedule`, que representa franjas **fechadas**: `airDate` `"YYYY-MM-DD"`, `startTime`/`endTime` `"HH:MM"`, `feed` libre, `listedTitle`, `seriesId?`, `blockId?` y procedencia. Eso encaja con las guías diarias (F3). Pero la mayor parte de la evidencia son **grillas recurrentes** ("de lunes a viernes a las 17:00, durante noviembre 2002"). Convertirlas en filas fechadas día por día inventaría precisión que las fuentes no tienen.

Propuesta, a decidir antes de programar:

1. **`ScheduleGrid`**: una grilla regular de un canal y una señal durante un período.
   - Campos: `channelId`, `feed` (código libre como el actual `Schedule.feed`: `"SUR"`, `"NORTE"`, `"MX"`, `"LA"`, `"AR"`), `timeZone` (IANA; por ejemplo `America/Argentina/Buenos_Aires` para F1/F2, `America/Monterrey` para F3), `validFrom`/`validTo` (texto `"YYYY-MM"` o `"YYYY-MM-DD"`, sin `Date`, igual que las fechas históricas actuales), `broadcastDayStart` (`"06:00"`: lo anterior pertenece a la noche del día indicado), `certainty`, `sourceName`, `sourceUrl`, `notes`.
2. **`ScheduleGridSlot`**: cada fila de las tablas de este documento.
   - Campos: `gridId`, `days` (máscara de 7 bits o texto `"1111100"`), `startTime`/`endTime` `"HH:MM"`, `listedTitle` (como lo escribe la fuente), `seriesId?`, `blockId?`, `certainty`, `notes`.
   - Una franja que solo nombra el bloque lleva `blockId` y `listedTitle` nulo.
3. **`Schedule`** (existente) se mantiene para días concretos: las 66 guías de F3 se cargan tal cual, con `feed` `"MX"` y la fuente de cada captura.
4. **`certainty`**: enum (`VERIFIED`, `PROBABLE`, `UNCERTAIN`) en `ScheduleGrid`, `ScheduleGridSlot`, `Schedule` y `TimelineEvent`. Requiere una migración.
5. **Títulos → series**: guardar siempre `listedTitle` y resolver `seriesId` con un mapa de alias curado en un archivo de datos, por ejemplo `prisma/data/title-aliases.ts` (`"Hombre-X: Evolución"` → X-Men: Evolución). Sin alias, la franja queda solo con `listedTitle`. Nada se asocia por parecido automático.
6. **Carga reproducible**, siguiendo el patrón de `db:load:series` y `db:load:blocks`: un archivo de datos por grilla, por ejemplo `prisma/data/grids/cartoon-network/2002-11-sur.ts`. El loader valida todo antes de escribir y es aditivo.
7. **Bloques:** el horario de un bloque se **deriva** de sus franjas, así que no hace falta otra tabla. Las fechas de estreno y fin van como `TimelineEvent` (sección anterior).
8. **Señales:** CLAUDE.md dice no crear un modelo `Feed` sin preguntar. Con esta investigación se justifica al menos una lista cerrada de códigos por canal (Sur, Norte/México, Latinoamérica, Demás feeds). Se puede mantener como texto y validarse en el loader, o convertirse en modelo; hay que decidirlo.

Alternativa descartada: expandir cada grilla mensual a filas `Schedule` por día. Reutiliza la UI actual, pero multiplica las filas (unas 48 franjas × 30 días × canal × mes) y afirma que cada día concreto se emitió igual, cosa que las fuentes no dicen.

## Apéndice: guías diarias de Cablevisión Monterrey (F3)

Todas las guías recuperadas, con su captura. Cada una es un día completo de 00:00 a 23:30, en hora de Monterrey. En el texto se reproducen como tablas: Fox Kids (11/12/2003), Jetix (9/8/2004), Nickelodeon (4/6/2004), Disney Channel (2/9/2005), Discovery Kids (4/3/2005) y Boomerang (21/10/2004). Cartoon Network se usó para validar F1. Algunas páginas siguieron archivándose después de abril 2006 sin actualizarse; se tomó una sola vez cada fecha distinta.

| Canal | Fecha | Día | Franjas | Captura |
| ----- | ----- | --- | ------: | ------- |
| Boomerang | 2003-12-11 | Jueves | 30 | [Wayback](https://web.archive.org/web/20031212124821/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Boomerang | 2004-02-20 | Viernes | 30 | [Wayback](https://web.archive.org/web/20040220200909/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Boomerang | 2004-04-07 | Miércoles | 30 | [Wayback](https://web.archive.org/web/20040411090354/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Boomerang | 2004-06-04 | Viernes | 30 | [Wayback](https://web.archive.org/web/20040605164504/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Boomerang | 2004-08-09 | Lunes | 27 | [Wayback](https://web.archive.org/web/20040809225218/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Boomerang | 2004-10-21 | Jueves | 30 | [Wayback](https://web.archive.org/web/20041022194208/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Boomerang | 2004-12-07 | Martes | 30 | [Wayback](https://web.archive.org/web/20041207195441/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Boomerang | 2005-03-04 | Viernes | 30 | [Wayback](https://web.archive.org/web/20050307055630/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Boomerang | 2005-04-18 | Lunes | 26 | [Wayback](https://web.archive.org/web/20050421173755/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Boomerang | 2005-09-02 | Viernes | 30 | [Wayback](https://web.archive.org/web/20050905125334/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Boomerang | 2006-04-03 | Lunes | 45 | [Wayback](https://web.archive.org/web/20060522203232/http://www.cablevision.com.mx:80/programacion/canales/Canal112.htm) |
| Cartoon Network | 2003-11-05 | Miércoles | 44 | [Wayback](https://web.archive.org/web/20031106014936/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2003-12-11 | Jueves | 43 | [Wayback](https://web.archive.org/web/20031212123304/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2004-02-20 | Viernes | 41 | [Wayback](https://web.archive.org/web/20040220200428/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2004-04-07 | Miércoles | 44 | [Wayback](https://web.archive.org/web/20040411090024/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2004-06-04 | Viernes | 42 | [Wayback](https://web.archive.org/web/20040605162055/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2004-08-09 | Lunes | 45 | [Wayback](https://web.archive.org/web/20040809224923/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2004-10-21 | Jueves | 44 | [Wayback](https://web.archive.org/web/20041022184021/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2004-12-07 | Martes | 41 | [Wayback](https://web.archive.org/web/20041207194413/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2005-03-04 | Viernes | 44 | [Wayback](https://web.archive.org/web/20050307054519/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2005-04-21 | Jueves | 45 | [Wayback](https://web.archive.org/web/20050421175622/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2005-09-23 | Viernes | 45 | [Wayback](https://web.archive.org/web/20050924151906/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Cartoon Network | 2006-04-03 | Lunes | 47 | [Wayback](https://web.archive.org/web/20060409120006/http://www.cablevision.com.mx:80/programacion/canales/canal106.htm) |
| Discovery Kids | 2003-12-11 | Jueves | 48 | [Wayback](https://web.archive.org/web/20031212124247/http://www.cablevision.com.mx:80/programacion/canales/Canal108.htm) |
| Discovery Kids | 2004-02-20 | Viernes | 48 | [Wayback](https://web.archive.org/web/20040220200612/http://www.cablevision.com.mx:80/programacion/canales/Canal108.htm) |
| Discovery Kids | 2004-06-04 | Viernes | 48 | [Wayback](https://web.archive.org/web/20040605162921/http://www.cablevision.com.mx:80/programacion/canales/Canal108.htm) |
| Discovery Kids | 2004-10-21 | Jueves | 48 | [Wayback](https://web.archive.org/web/20041022191503/http://www.cablevision.com.mx:80/programacion/canales/Canal108.htm) |
| Discovery Kids | 2005-03-04 | Viernes | 48 | [Wayback](https://web.archive.org/web/20050307054916/http://www.cablevision.com.mx:80/programacion/canales/Canal108.htm) |
| Discovery Kids | 2005-04-18 | Lunes | 48 | [Wayback](https://web.archive.org/web/20050421173058/http://www.cablevision.com.mx:80/programacion/canales/Canal108.htm) |
| Discovery Kids | 2006-04-03 | Lunes | 48 | [Wayback](https://web.archive.org/web/20060426202435/http://www.cablevision.com.mx:80/programacion/canales/Canal108.htm) |
| Disney Channel | 2003-12-11 | Jueves | 43 | [Wayback](https://web.archive.org/web/20031212125900/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2004-02-20 | Viernes | 44 | [Wayback](https://web.archive.org/web/20040220200955/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2004-04-07 | Miércoles | 43 | [Wayback](https://web.archive.org/web/20040411090721/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2004-06-04 | Viernes | 42 | [Wayback](https://web.archive.org/web/20040605164706/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2004-08-09 | Lunes | 41 | [Wayback](https://web.archive.org/web/20040809225258/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2004-10-21 | Jueves | 42 | [Wayback](https://web.archive.org/web/20041022195407/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2004-12-07 | Martes | 42 | [Wayback](https://web.archive.org/web/20041207195901/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2005-03-04 | Viernes | 41 | [Wayback](https://web.archive.org/web/20050307055740/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2005-04-18 | Lunes | 40 | [Wayback](https://web.archive.org/web/20050421173902/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2005-09-02 | Viernes | 41 | [Wayback](https://web.archive.org/web/20050904014750/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2006-01-05 | Jueves | 40 | [Wayback](https://web.archive.org/web/20060106050428/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Disney Channel | 2006-04-03 | Lunes | 39 | [Wayback](https://web.archive.org/web/20060412074554/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) |
| Fox Kids | 2003-12-11 | Jueves | 48 | [Wayback](https://web.archive.org/web/20031212124226/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Fox Kids | 2004-02-20 | Viernes | 48 | [Wayback](https://web.archive.org/web/20040220200517/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Fox Kids | 2004-04-07 | Miércoles | 48 | [Wayback](https://web.archive.org/web/20040411090014/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Fox Kids | 2004-06-04 | Viernes | 48 | [Wayback](https://web.archive.org/web/20040605162154/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Jetix | 2004-08-09 | Lunes | 46 | [Wayback](https://web.archive.org/web/20040809224955/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Jetix | 2004-08-17 | Martes | 46 | [Wayback](https://web.archive.org/web/20040818003901/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Jetix | 2004-08-30 | Lunes | 46 | [Wayback](https://web.archive.org/web/20040831000625/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Jetix | 2004-10-21 | Jueves | 46 | [Wayback](https://web.archive.org/web/20041022185627/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Jetix | 2004-12-07 | Martes | 46 | [Wayback](https://web.archive.org/web/20041207194603/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Jetix | 2005-03-04 | Viernes | 47 | [Wayback](https://web.archive.org/web/20050307054801/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Jetix | 2005-04-18 | Lunes | 47 | [Wayback](https://web.archive.org/web/20050421172849/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Jetix | 2005-09-02 | Viernes | 47 | [Wayback](https://web.archive.org/web/20050903202309/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Jetix | 2006-04-03 | Lunes | 48 | [Wayback](https://web.archive.org/web/20060426175831/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) |
| Nickelodeon | 2003-12-11 | Jueves | 48 | [Wayback](https://web.archive.org/web/20031212125103/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
| Nickelodeon | 2004-02-20 | Viernes | 48 | [Wayback](https://web.archive.org/web/20040220200726/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
| Nickelodeon | 2004-04-07 | Miércoles | 48 | [Wayback](https://web.archive.org/web/20040411090221/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
| Nickelodeon | 2004-06-04 | Viernes | 48 | [Wayback](https://web.archive.org/web/20040605163146/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
| Nickelodeon | 2004-08-09 | Lunes | 48 | [Wayback](https://web.archive.org/web/20040809225103/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
| Nickelodeon | 2004-10-21 | Jueves | 48 | [Wayback](https://web.archive.org/web/20041022192739/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
| Nickelodeon | 2004-12-07 | Martes | 48 | [Wayback](https://web.archive.org/web/20041207194817/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
| Nickelodeon | 2005-03-04 | Viernes | 45 | [Wayback](https://web.archive.org/web/20050307055115/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
| Nickelodeon | 2005-04-18 | Lunes | 48 | [Wayback](https://web.archive.org/web/20050421173338/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
| Nickelodeon | 2005-09-02 | Viernes | 48 | [Wayback](https://web.archive.org/web/20050904000221/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
| Nickelodeon | 2006-04-03 | Lunes | 48 | [Wayback](https://web.archive.org/web/20060420031545/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) |
