# Revisión de los datos de programación

Generado por `npm run db:report:programming` a partir de `prisma/data/programming` y de la base de datos. No editar a mano.

## Estado de la base

- 7 señales, 16 grillas con 4438 franjas por día de la semana, 1343 filas de días concretos (`Schedule`).
- Franjas de grilla por certeza: PROBABLE 3606, UNCERTAIN 18, VERIFIED 814.
- Filas de `Schedule` por certeza: VERIFIED 1343.

| Comprobación | Resultado |
| ------------ | --------: |
| Franjas duplicadas (grilla + día + hora) | 0 ✓ |
| Grillas o días con una señal de otro canal | 0 ✓ |
| Registros UNCERTAIN sin nota que explique por qué | 0 ✓ |
| Grillas sin fuente | 0 ✓ |
| Días nuevos que usan el campo deprecado `feed` | 0 ✓ |

## Conflictos entre fuentes

Grillas del mismo período cuyas fuentes no coinciden. Se conservan ambas; ninguna se da por correcta.

- `cartoon-network-2000-10-latinoamerica-oficial` ↔ `cartoon-network-2000-10-latinoamerica-wiki`
  - cartoon-network-2000-10-latinoamerica-oficial: Grilla general del sitio oficial cartoonnetworkla.com (sección Toon In), captura del 18/10/2000; no indica fecha de vigencia ni zona horaria. La misma página publica aparte una grilla para México fechada el 2/10/2000. Conflicto con la versión de la wiki (cartoon-network-2000-10-latinoamerica-wiki) de lunes a viernes de 15:00 a 17:00.
  - cartoon-network-2000-10-latinoamerica-wiki: Tabla "Latinoamérica" de la wiki. Conflicto con la grilla oficial archivada (grilla cartoon-network-2000-10-latinoamerica-oficial): de lunes a viernes de 15:00 a 17:00 la wiki lista Scooby-Doo dos horas (la página dice que fue un "mes enfocado en Scooby-Doo"), y la grilla oficial lista Beetlejuice, Las Aventuras de Tiny Toons, Scooby Doo Donde Estás? y Que Historia Tan Maravillosa. La grilla oficial no tiene fecha de vigencia (captura del 18/10/2000); ninguna de las dos se da por correcta. La página no indica zona horaria.

## Diferencias con fuentes primarias

Franjas de una grilla secundaria que una fuente primaria de otra fecha (o del mismo período) lista distinto. Conservan su certeza y la nota con la fuente.

| Grilla | Días | Hora | Título en la grilla | Nota |
| ------ | ---- | ---: | ------------------- | ---- |
| cartoon-network-2000-10-latinoamerica-wiki | lun, mar, mié, jue, vie | 15:00 | Scooby-Doo | Difiere de fuente primaria: la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) lista «Beetlejuice». |
| cartoon-network-2000-10-latinoamerica-wiki | lun, mar, mié, jue, vie | 00:30 | Las increíbles aventuras de Jonny Quest | Coincidencia parcial: la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) lista «J. Quest/Busca del Castillo». |
| cartoon-network-2000-10-latinoamerica-wiki | sáb | 23:00 | Pokémon | Difiere de fuente primaria: la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) lista «Popeye». |
| cartoon-network-2000-10-latinoamerica-wiki | dom | 18:00 | Ed, Edd y Eddy | Difiere de fuente primaria: la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) lista «Mike, Lu y Og». |
| cartoon-network-2000-10-mexico-wiki | lun, mar, mié, jue, vie | 18:00 | Shadow Raiders | Coincidencia parcial: la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) lista «Shadow/Busca del Castillo». |
| jetix-2005-08-blog | vie | 12:00 | Dientes de Lata | Difiere de fuente primaria: la guía de Cablevisión Monterrey del 2/9/2005 (https://web.archive.org/web/20050903202309/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) lista «Tres espías sin límite». |
| jetix-2005-08-blog | vie | 19:00 | Digimon 1 | Difiere de fuente primaria: la guía de Cablevisión Monterrey del 2/9/2005 (https://web.archive.org/web/20050903202309/http://www.cablevision.com.mx:80/programacion/canales/Canal107.htm) lista «Digimon». |
| nickelodeon-2004-01-blog | jue | 04:30 | Las Aventuras de Jimmy Neutron el Niño Genio | Difiere de fuente primaria: la guía de Cablevisión Monterrey del 20/2/2004 (https://web.archive.org/web/20040220200726/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) lista «¡Oye Arnold!». |
| nickelodeon-2004-01-blog | vie | 07:00 | Ralph el Travieso | Difiere de fuente primaria: la guía de Cablevisión Monterrey del 20/2/2004 (https://web.archive.org/web/20040220200726/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) lista «Los Castores Cascarrabias». |
| nickelodeon-2004-01-blog | vie | 20:30 | Las Aventuras de Jimmy Neutron el Niño Genio | Difiere de fuente primaria: la guía de Cablevisión Monterrey del 20/2/2004 (https://web.archive.org/web/20040220200726/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) lista «¡Oye Arnold!». |
| nickelodeon-2004-01-blog | vie | 23:00 | ¡Oye Arnold! | Difiere de fuente primaria: la guía de Cablevisión Monterrey del 20/2/2004 (https://web.archive.org/web/20040220200726/http://www.cablevision.com.mx:80/programacion/canales/Canal109.htm) lista «Rugrats». |
| disney-channel-2004-01-blog | jue | 01:00 | Pelicula Disney Channel | Difiere de fuente primaria: la guía de Cablevisión Monterrey del 20/2/2004 (https://web.archive.org/web/20040220200955/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) lista «Sí se puede». |
| disney-channel-2004-01-blog | vie | 17:00 | Aprendiendo a Vivir | La fuente agrega: «con Ben Savage, Danielle Fisher y Rider Strong». Difiere de fuente primaria: la guía de Cablevisión Monterrey del 20/2/2004 (https://web.archive.org/web/20040220200955/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) lista «Kim Posible». |
| disney-channel-2004-01-blog | vie | 17:30 | La Familia Proud | La fuente agrega: «con la voz de Kyla Pratt». Difiere de fuente primaria: la guía de Cablevisión Monterrey del 20/2/2004 (https://web.archive.org/web/20040220200955/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) lista «Es tan Raven». |
| disney-channel-2004-01-blog | vie | 20:00 | Pelicula Disney Channel | Difiere de fuente primaria: la guía de Cablevisión Monterrey del 20/2/2004 (https://web.archive.org/web/20040220200955/http://www.cablevision.com.mx:80/programacion/canales/Canal114.htm) lista «Hilary Duff: Concierto en Hawaii». |

## Franjas UNCERTAIN

| Fuente | Días | Hora | Título | Motivo |
| ------ | ---- | ---: | ------ | ------ |
| cartoon-network-2000-10-mexico-wiki | lun, mar, mié, jue, vie | 10:00 | — | La fuente marca la franja como sin identificar. En la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) figura «Los Picapiedras». |
| cartoon-network-2000-10-mexico-wiki | lun, mar, mié, jue | 19:00 | — | La fuente marca la franja como sin identificar. En la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) figura «Pinky y Cerebro». |
| cartoon-network-2000-10-mexico-wiki | lun, mar, mié, jue, vie | 03:30 | — | La fuente marca la franja como sin identificar. |
| cartoon-network-2000-10-mexico-wiki | vie | 20:00 | — | La fuente marca la franja como sin identificar. En la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) figura «Cartoon Cartoons». |
| cartoon-network-2000-10-mexico-wiki | sáb | 08:30 | — | La fuente marca la franja como sin identificar. En la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) figura «Franklin». |
| cartoon-network-2000-10-mexico-wiki | sáb | 14:30 | — | La fuente marca la franja como sin identificar. En la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) figura «Pokémon». |
| cartoon-network-2000-10-mexico-wiki | dom | 08:30 | — | La fuente marca la franja como sin identificar. En la grilla oficial (https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html) figura «Las Aventuras de Tiny Toons». |

## Series programadas en un canal al que no están vinculadas

La fuente las ubica en el canal, pero el catálogo no tiene `SeriesChannel` para ese par. No se crea ningún vínculo automáticamente.

| Serie | TMDB | Canal | Fuentes |
| ----- | ---: | ----- | ------- |
| Garfield y sus Amigos | 4606 | boomerang | boomerang-2005-07-latinoamerica-wiki, boomerang 2005-03-04, boomerang 2005-04-18, boomerang 2005-09-02 |
| ¡Scooby-Doo, dónde estás! | 926 | cartoon-network | cartoon-network-2000-10-latinoamerica-oficial |
| Don Gato y su Pandilla | 4232 | cartoon-network | cartoon-network-2000-10-latinoamerica-wiki, cartoon-network-2000-10-latinoamerica-oficial |
| El Inspector Ardilla | 4752 | cartoon-network | cartoon-network-2000-10-mexico-wiki |
| El Show de Maguila Gorila | 11167 | cartoon-network | cartoon-network-2000-10-latinoamerica-wiki, cartoon-network-2000-10-latinoamerica-oficial |
| El show de Scooby-Doo y Scrappy-Doo | 6005 | cartoon-network | cartoon-network 2005-09-23 |
| Franklin | 1458 | cartoon-network | cartoon-network-2000-10-latinoamerica-wiki, cartoon-network-2000-10-latinoamerica-oficial, cartoon-network-2002-11-wiki, cartoon-network 2005-03-04, cartoon-network 2005-04-21 |
| Jonny Quest | 962 | cartoon-network | cartoon-network-2000-10-latinoamerica-wiki, cartoon-network-2000-10-latinoamerica-oficial |
| La hormiga atómica | 22172 | cartoon-network | cartoon-network-2000-10-mexico-wiki |
| Las aventuras de Jackie Chan | 240 | cartoon-network | cartoon-network-2002-11-wiki, cartoon-network-2005-10-latinoamerica-wiki, cartoon-network 2005-03-04, cartoon-network 2005-04-21 |
| Los 13 fantasmas de Scooby-Doo | 1069 | cartoon-network | cartoon-network-2002-11-wiki |
| Los Pequeños Picapiedra | 4167 | cartoon-network | cartoon-network-2000-10-latinoamerica-wiki, cartoon-network-2002-11-wiki |
| Los pequeños Tom y Jerry | 4274 | cartoon-network | cartoon-network-2000-10-latinoamerica-wiki |
| Los Picapiedra | 1996 | cartoon-network | cartoon-network-2000-10-latinoamerica-wiki, cartoon-network-2000-10-latinoamerica-oficial, cartoon-network-2002-11-wiki |
| Los supersónicos | 2362 | cartoon-network | cartoon-network-2000-10-latinoamerica-wiki, cartoon-network-2000-10-latinoamerica-oficial, cartoon-network-2002-11-wiki |
| Los verdaderos Cazafantasmas | 2286 | cartoon-network | cartoon-network-2002-11-wiki |
| Meteoro | 30986 | cartoon-network | cartoon-network-2002-11-wiki |
| Tiro Loco McGraw | 38960 | cartoon-network | cartoon-network-2000-10-latinoamerica-wiki, cartoon-network-2000-10-latinoamerica-oficial |
| Un cachorro llamado Scooby-Doo | 418 | cartoon-network | cartoon-network-2000-10-latinoamerica-wiki, cartoon-network-2000-10-latinoamerica-oficial |
| BeyBlade | 54728 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18, jetix 2005-09-02 |
| Dientes de Lata | 1763 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18 |
| Digimon | 31654 | jetix | jetix-2005-08-blog, jetix 2005-09-02 |
| Digimon Frontier | 8991 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18, jetix 2005-09-02 |
| Digimon Tamers | 9302 | jetix | jetix 2005-03-04, jetix 2005-04-18 |
| El Hombre Araña | 888 | jetix | jetix-2005-08-blog |
| El Zorro | 4681 | jetix | jetix-2005-08-blog |
| Escalofríos | 5835 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18, jetix 2005-09-02 |
| Gárgolas | 1719 | jetix | jetix 2005-03-04 |
| Kid Músculo | 9550 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18 |
| Kirby de las Estrellas | 14891 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18, jetix 2005-09-02 |
| Los 4 Fantásticos | 2901 | jetix | jetix-2005-08-blog |
| Los Misterios de Moville | 43219 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18, jetix 2005-09-02 |
| Los nuevos locos Addams | 21036 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18, jetix 2005-09-02 |
| Los Padrinos Mágicos | 4630 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18, jetix 2005-09-02 |
| Medabots | 11235 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18, jetix 2005-09-02 |
| Megaman NT Warrior | 5653 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18, jetix 2005-09-02 |
| Qué raro | 1954 | jetix | jetix-2005-08-blog, jetix 2005-03-04, jetix 2005-04-18, jetix 2005-09-02 |
| Shaman King | 40143 | jetix | jetix 2005-03-04, jetix 2005-04-18 |
| X-Men | 4574 | jetix | jetix-2005-08-blog |
| Bananas en pijamas | 3103 | nickelodeon | nickelodeon-2001-08-blog |
| Escuela de espanto | 9277 | nickelodeon | nickelodeon 2004-12-07 |

## Etiquetas de bloque que no están en el catálogo

Se conservan literalmente en `listedBlock`. No se crea ningún bloque.

| Etiqueta | Franjas | Dónde |
| -------- | ------: | ----- |
| Playhouse Disney | 108 | disney-channel-2004-01-blog (lun 08:00, mar 08:00, mié 08:00…); disney-channel-2005-08-blog (lun 07:00, mar 07:00, mié 07:00…) |
| Talismán | 80 | cartoon-network-2000-10-latinoamerica-wiki (lun 17:00, mar 17:00, mié 17:00…); cartoon-network-2000-10-mexico-wiki (lun 18:00, mar 18:00, mié 18:00…) |
| Hora Acme | 47 | cartoon-network-2000-10-latinoamerica-wiki (lun 11:00, mar 11:00, mié 11:00…); cartoon-network-2000-10-latinoamerica-oficial (lun 11:00, mar 11:00, mié 11:00…); cartoon-network-2002-11-wiki (lun 11:00, mar 11:00, mié 11:00…); cartoon-network-2005-10-latinoamerica-wiki (lun 05:00, mar 05:00, mié 05:00…) |
| Nick Jr. | 45 | nickelodeon-2001-08-blog (lun 08:00, mar 08:00, mié 08:00…); nickelodeon-2004-01-blog (lun 08:00, mar 08:00, mié 08:00…) |
| Girl Power | 41 | fox-kids-2001-08-blog (lun 09:00, mié 09:00, vie 09:00…); fox-kids-2003-01-sur-blog (lun 07:30, mar 07:30, mié 07:30…) |
| Súper Chiflados | 35 | fox-kids-2001-08-blog (lun 11:00, mar 11:00, mié 11:00…) |
| CineBoom | 18 | boomerang-2005-07-latinoamerica-wiki (lun 08:00, mar 08:00, mié 08:00…) |
| La Hora Boomerang | 15 | boomerang-2005-07-latinoamerica-wiki (lun 10:00, mar 10:00, mié 10:00…) |
| Clásicos a la Medianoche | 10 | fox-kids-2001-08-blog (lun 23:00, mar 23:00, mié 23:00…) |
| Teatro Cartoon | 5 | cartoon-network-2000-10-latinoamerica-wiki (dom 14:00); cartoon-network-2000-10-latinoamerica-oficial (dom 14:00); cartoon-network-2002-11-wiki (dom 14:00); cartoon-network-2005-10-latinoamerica-wiki (sáb 18:00, dom 14:00) |
| Votatoon | 4 | cartoon-network-2000-10-latinoamerica-wiki (sáb 15:00); cartoon-network-2000-10-latinoamerica-oficial (sáb 15:00); cartoon-network-2002-11-wiki (sáb 15:00); cartoon-network-2005-10-latinoamerica-wiki (sáb 15:00) |
| Cinetoon | 3 | cartoon-network-2000-10-latinoamerica-wiki (sáb 09:00); cartoon-network-2000-10-latinoamerica-oficial (sáb 09:00); cartoon-network-2002-11-wiki (sáb 09:00) |

## Títulos sin resolver

347 títulos sin alias: la franja conserva el título literal y queda sin serie. Para resolver uno, agregar un alias en `prisma/data/programming/title-aliases.ts` (serie del catálogo, bloque o `notASeries`) y recargar. Nunca se crea una serie desde aquí.

| Título | Canales | Franjas | Dónde |
| ------ | ------- | ------: | ----- |
| Save-Ums! | discovery-kids | 78 | discovery-kids-2004-01-blog (lun 11:30, mar 11:30, mié 11:30…); discovery-kids-2005-08-blog (lun 14:30, mar 14:30, mié 14:30…); discovery-kids 2004-02-20 (03:00, 11:30, 16:30…); discovery-kids 2004-06-04 (03:00, 11:30, 16:30…); discovery-kids 2004-10-21 (03:00, 11:30, 16:30…); discovery-kids 2005-03-04 (03:00, 14:00, 14:30…); discovery-kids 2005-04-18 (03:00, 14:00, 14:30…) |
| Boo! | discovery-kids | 56 | discovery-kids-2004-01-blog (lun 10:00, mar 10:00, mié 10:00…); discovery-kids-2005-08-blog (lun 07:30, mar 07:30, mié 07:30…); discovery-kids 2004-02-20 (02:00, 10:00, 14:30…); discovery-kids 2004-06-04 (02:00, 10:00, 14:30…); discovery-kids 2004-10-21 (02:00, 14:30); discovery-kids 2005-03-04 (02:00, 10:30); discovery-kids 2005-04-18 (02:00, 10:30) |
| Paz | discovery-kids | 53 | discovery-kids-2004-01-blog (lun 09:00, mar 09:00, mié 09:00…); discovery-kids-2005-08-blog (lun 06:30, mar 06:30, mié 06:30…); discovery-kids 2004-02-20 (01:00, 09:00, 14:00…); discovery-kids 2004-06-04 (01:00, 09:00, 14:00…); discovery-kids 2004-10-21 (01:00, 09:00, 14:00); discovery-kids 2005-03-04 (01:00, 08:00); discovery-kids 2005-04-18 (01:00, 08:00) |
| Teletubbies | discovery-kids | 49 | discovery-kids-2004-01-blog (lun 08:00, mar 08:00, mié 08:00…); discovery-kids-2005-08-blog (lun 01:00, mar 01:00, mié 01:00…); discovery-kids 2004-02-20 (00:00, 01:30, 08:00…); discovery-kids 2004-06-04 (00:00, 01:30, 09:30); discovery-kids 2004-10-21 (00:00); discovery-kids 2005-03-04 (00:00, 01:30, 06:30); discovery-kids 2005-04-18 (00:00, 01:30, 06:30) |
| Tom y Jerry | cartoon-network, boomerang | 44 | cartoon-network-2000-10-latinoamerica-wiki (lun 23:00, mar 23:00, mié 23:00…); cartoon-network-2000-10-latinoamerica-oficial (lun 23:00, mar 23:00, mié 23:00…); cartoon-network-2002-11-wiki (lun 10:30, mar 10:30, mié 10:30…); cartoon-network-2005-10-latinoamerica-wiki (lun 23:00, mar 23:00, mié 23:00…); boomerang-2005-07-latinoamerica-wiki (dom 07:00, dom 15:00, dom 23:00); cartoon-network 2005-03-04 (10:30, 23:00); cartoon-network 2005-04-21 (10:30, 23:00); cartoon-network 2005-09-23 (23:00); boomerang 2005-04-18 (08:00, 16:00) |
| Bear en la Gran Casa Azul | disney-channel | 38 | disney-channel-2004-01-blog (lun 08:00, mar 08:00, mié 08:00…); disney-channel-2005-08-blog (lun 08:00, mar 08:00, mié 08:00…); disney-channel 2004-02-20 (08:00, 11:00); disney-channel 2004-04-07 (08:00, 11:00); disney-channel 2004-06-04 (08:00, 11:00); disney-channel 2004-08-09 (08:00, 11:00); disney-channel 2004-10-21 (08:00, 11:00); disney-channel 2004-12-07 (07:00, 10:00); disney-channel 2005-03-04 (07:00, 10:00); disney-channel 2005-04-18 (07:00, 10:00); disney-channel 2005-09-02 (07:00) |
| El Libro de Pooh | disney-channel | 37 | disney-channel-2004-01-blog (lun 09:30, mar 09:30, mié 09:30…); disney-channel-2005-08-blog (lun 08:30, mar 08:30, mié 08:30…); disney-channel 2004-02-20 (09:30, 11:30); disney-channel 2004-04-07 (09:30, 11:30); disney-channel 2004-06-04 (09:30, 11:30); disney-channel 2004-08-09 (09:30, 11:30); disney-channel 2004-10-21 (09:30, 11:30); disney-channel 2004-12-07 (08:30, 10:30); disney-channel 2005-03-04 (08:30, 10:30); disney-channel 2005-04-18 (10:30); disney-channel 2005-09-02 (07:30) |
| Plaza Sésamo | discovery-kids | 34 | discovery-kids-2004-01-blog (lun 07:00, mar 07:00, mié 07:00…); discovery-kids-2005-08-blog (lun 08:00, mar 08:00, mié 08:00…); discovery-kids 2004-02-20 (07:00, 22:30, 23:00); discovery-kids 2004-06-04 (07:00); discovery-kids 2004-10-21 (07:00); discovery-kids 2005-03-04 (07:00) |
| Las tres mellizas | cartoon-network | 30 | cartoon-network-2000-10-latinoamerica-wiki (lun 08:00, mar 08:00, mié 08:00…); cartoon-network-2000-10-latinoamerica-oficial (lun 08:00, mar 08:00, mié 08:00…); cartoon-network-2000-10-mexico-wiki (lun 08:30, mar 08:30, mié 08:30…); cartoon-network-2002-11-wiki (lun 08:00, mar 08:00, mié 08:00…); cartoon-network 2005-03-04 (08:00); cartoon-network 2005-04-21 (08:00) |
| Aprendiendo a Vivir | disney-channel | 29 | disney-channel-2004-01-blog (lun 17:00, mar 17:00, mié 17:00…); disney-channel-2005-08-blog (sáb 00:00); disney-channel 2004-02-20 (22:30); disney-channel 2004-04-07 (17:00, 22:30); disney-channel 2004-06-04 (22:30); disney-channel 2004-08-09 (02:30, 17:00, 22:30); disney-channel 2004-10-21 (17:00, 22:30); disney-channel 2004-12-07 (03:30, 17:30, 22:30); disney-channel 2005-03-04 (03:30, 22:30); disney-channel 2005-04-18 (17:30, 22:30) |
| El Show del Ratón | disney-channel | 29 | disney-channel-2004-01-blog (lun 12:00, mar 12:00, mié 12:00…); disney-channel-2005-08-blog (lun 12:00, mar 12:00, mié 12:00…); disney-channel 2004-02-20 (04:00, 12:00); disney-channel 2004-04-07 (04:00, 12:00); disney-channel 2004-06-04 (04:00, 12:00); disney-channel 2004-08-09 (12:00); disney-channel 2004-10-21 (04:00, 07:30, 12:00); disney-channel 2004-12-07 (11:00); disney-channel 2005-03-04 (11:00); disney-channel 2005-04-18 (11:00); disney-channel 2005-09-02 (11:00) |
| Sabrina la Bruja Adolescente | nickelodeon | 29 | nickelodeon-2001-08-blog (lun 19:00, mar 19:00, mié 19:00…); nickelodeon-2004-01-blog (lun 19:00, mar 19:00, mié 19:00…); nickelodeon 2004-02-20 (03:00, 19:00); nickelodeon 2004-04-07 (03:00, 19:00); nickelodeon 2004-06-04 (03:00, 19:00); nickelodeon 2004-08-09 (19:00); nickelodeon 2004-10-21 (03:00, 19:00); nickelodeon 2004-12-07 (03:00, 19:00) |
| Bugs Bunny y el Pato Lucas | cartoon-network | 28 | cartoon-network-2000-10-latinoamerica-wiki (lun 22:30, mar 22:30, mié 22:30…); cartoon-network-2000-10-latinoamerica-oficial (lun 22:30, mar 22:30, mié 22:30…); cartoon-network-2002-11-wiki (lun 22:30, mar 22:30, mié 22:30…); cartoon-network-2005-10-latinoamerica-wiki (lun 22:30, mar 22:30, mié 22:30…); cartoon-network 2005-03-04 (22:30); cartoon-network 2005-04-21 (22:30); cartoon-network 2005-09-23 (22:30) |
| Sabrina, La Brujita | disney-channel | 28 | disney-channel-2004-01-blog (lun 06:00, mar 06:00, mié 06:00…); disney-channel 2004-02-20 (06:00, 15:00); disney-channel 2004-04-07 (06:00, 15:00); disney-channel 2004-06-04 (06:00, 14:30); disney-channel 2004-08-09 (06:00, 14:30); disney-channel 2004-10-21 (04:30, 14:30); disney-channel 2004-12-07 (05:00, 16:00); disney-channel 2005-03-04 (05:00, 15:30) |
| Art Attack | disney-channel | 26 | disney-channel-2004-01-blog (lun 16:00, mar 16:00, mié 16:00…); disney-channel 2004-02-20 (03:00, 16:00); disney-channel 2004-04-07 (03:00); disney-channel 2004-06-04 (03:00, 16:00); disney-channel 2004-08-09 (04:30); disney-channel 2004-10-21 (03:00); disney-channel 2005-04-18 (16:00); disney-channel 2005-09-02 (03:00, 05:00, 12:30…) |
| El Mundo de Elmo | discovery-kids | 26 | discovery-kids-2004-01-blog (lun 07:30, mar 07:30, mié 07:30…); discovery-kids-2005-08-blog (lun 00:30, mar 00:30, mié 00:30…); discovery-kids 2004-06-04 (07:30, 23:30); discovery-kids 2004-10-21 (23:30); discovery-kids 2005-03-04 (23:30); discovery-kids 2005-04-18 (23:30) |
| En busca del castillo Lavender | cartoon-network | 26 | cartoon-network-2000-10-latinoamerica-wiki (lun 18:20, mar 18:20, mié 18:20…); cartoon-network-2000-10-mexico-wiki (lun 18:20, mar 18:20, mié 18:20…); cartoon-network-2002-11-wiki (sáb 04:00) |
| Guerra de bestias | cartoon-network | 24 | cartoon-network-2000-10-latinoamerica-wiki (lun 17:30, mar 17:30, mié 17:30…); cartoon-network-2000-10-latinoamerica-oficial (lun 17:30, mar 17:30, mié 17:30…) |
| La Peor Bruja | disney-channel | 24 | disney-channel-2004-01-blog (lun 16:30, mar 16:30, mié 16:30…); disney-channel-2005-08-blog (lun 23:30, mié 23:30, vie 23:30); disney-channel 2004-02-20 (03:30, 16:30); disney-channel 2004-04-07 (03:30, 16:30); disney-channel 2004-06-04 (03:30, 16:30); disney-channel 2004-08-09 (16:30); disney-channel 2004-10-21 (03:30, 16:30); disney-channel 2004-12-07 (17:00); disney-channel 2005-03-04 (17:30) |
| Pequeño Mundo | cartoon-network | 23 | cartoon-network-2000-10-latinoamerica-wiki (lun 07:00, mar 07:00, mié 07:00…); cartoon-network-2000-10-latinoamerica-oficial (lun 07:00, mar 07:00, mié 07:00…); cartoon-network-2002-11-wiki (lun 07:00, mar 07:00, mié 07:00…); cartoon-network-2005-10-latinoamerica-wiki (lun 07:00, mar 07:00, mié 07:00…); cartoon-network 2005-03-04 (07:00); cartoon-network 2005-04-21 (07:00); cartoon-network 2005-09-23 (07:00) |
| Stanley | disney-channel | 23 | disney-channel-2004-01-blog (lun 10:30, mar 10:30, mié 10:30…); disney-channel-2005-08-blog (lun 10:30, mar 10:30, mié 10:30…); disney-channel 2004-02-20 (10:30); disney-channel 2004-04-07 (10:30); disney-channel 2004-06-04 (10:30); disney-channel 2004-08-09 (10:30); disney-channel 2004-10-21 (10:30); disney-channel 2004-12-07 (09:30); disney-channel 2005-03-04 (09:30); disney-channel 2005-04-18 (09:30); disney-channel 2005-09-02 (09:30) |
| Art Attack de Disney | disney-channel | 22 | disney-channel-2005-08-blog (lun 06:00, mar 06:00, mié 06:00…); disney-channel 2004-04-07 (16:00); disney-channel 2004-08-09 (16:00); disney-channel 2004-10-21 (16:00) |
| Connie la Vaquita | discovery-kids | 22 | discovery-kids-2004-01-blog (lun 08:30, mar 08:30, mié 08:30…); discovery-kids-2005-08-blog (lun 01:30, mar 01:30, mié 01:30…); discovery-kids 2004-10-21 (00:30) |
| Popeye, el marino | boomerang | 21 | boomerang-2005-07-latinoamerica-wiki (lun 10:00, mar 10:00, mié 10:00…); boomerang 2005-09-02 (00:00, 08:00, 16:00) |
| El Pájaro Loco (Clásico) | fox-kids, jetix | 20 | fox-kids-2001-08-blog (lun 12:30, mar 12:30, mié 12:30…); jetix-2005-08-blog (lun 00:30, mar 00:30, mié 00:30…) |
| Cubitos | discovery-kids | 19 | discovery-kids-2004-01-blog (jue 00:30, vie 08:30, vie 13:30…); discovery-kids-2005-08-blog (jue 06:30, vie 06:30, sáb 06:30…); discovery-kids 2004-02-20 (00:30, 08:30, 13:30); discovery-kids 2004-10-21 (13:30) |
| El Pájaro Loco | fox-kids, jetix | 19 | fox-kids-2003-01-sur-blog (lun 06:00, mar 06:00, mié 06:00…); jetix-2005-08-blog (lun 10:00, mar 10:00, mié 10:00…); jetix 2005-03-04 (10:00); jetix 2005-04-18 (00:30, 10:00); jetix 2005-09-02 (00:30, 10:00) |
| La Mascota de la Clase | disney-channel | 19 | disney-channel-2004-01-blog (sáb 13:30, dom 13:30); disney-channel-2005-08-blog (lun 14:30, mar 14:30, mié 14:30…); disney-channel 2004-12-07 (04:00, 15:00); disney-channel 2005-03-04 (04:00, 15:00); disney-channel 2005-04-18 (15:00); disney-channel 2005-09-02 (04:00, 13:30) |
| Las Aventuras de Henry | discovery-kids | 19 | discovery-kids-2004-01-blog (vie 06:00, sáb 06:00, dom 06:00); discovery-kids-2005-08-blog (lun 12:30, mar 12:30, mié 12:30…); discovery-kids 2004-02-20 (06:00); discovery-kids 2004-06-04 (06:00, 15:30); discovery-kids 2004-10-21 (06:00); discovery-kids 2005-03-04 (06:00, 12:30); discovery-kids 2005-04-18 (06:00, 12:30) |
| Los locos Addams | cartoon-network, boomerang | 19 | cartoon-network-2000-10-latinoamerica-wiki (sáb 03:30); boomerang-2003-12-latinoamerica-wiki (lun 10:00, mar 10:00, mié 10:00…); boomerang 2003-12-11 (07:00, 15:00, 23:00) |
| Kimba, el león blanco | boomerang | 18 | boomerang-2005-07-latinoamerica-wiki (lun 07:00, mar 07:00, mié 07:00…); boomerang 2005-09-02 (05:00, 13:00, 21:00) |
| Engie Benjy | discovery-kids | 17 | discovery-kids-2005-08-blog (lun 15:00, mar 15:00, mié 15:00…); discovery-kids 2004-10-21 (13:00); discovery-kids 2005-03-04 (19:30); discovery-kids 2005-04-18 (19:30) |
| Las aventuras de Tiny Toons | cartoon-network | 17 | cartoon-network-2000-10-latinoamerica-wiki (lun 20:00, mar 20:00, mié 20:00…); cartoon-network-2000-10-latinoamerica-oficial (lun 15:30, mar 15:30, mié 15:30…) |
| ¿Qué hay de nuevo, Scooby-Doo? | cartoon-network | 16 | cartoon-network-2005-10-latinoamerica-wiki (lun 14:00, mar 14:00, mié 14:00…) |
| Albie | discovery-kids | 16 | discovery-kids-2004-01-blog (lun 15:30, mar 15:30, mié 15:30…); discovery-kids 2004-02-20 (02:30, 10:30, 19:30) |
| Animales Asombrosos | discovery-kids | 16 | discovery-kids-2004-01-blog (lun 22:00, mar 22:00, mié 22:00…); discovery-kids 2004-02-20 (05:30, 22:00) |
| Chico Listo | disney-channel | 16 | disney-channel-2004-01-blog (lun 19:00, mar 19:00, mié 19:00…); disney-channel-2005-08-blog (sáb 00:30); disney-channel 2004-02-20 (00:00, 19:00); disney-channel 2004-04-07 (00:00); disney-channel 2004-06-04 (00:00, 19:00) |
| Dora la Exploradora | nickelodeon | 16 | nickelodeon-2001-08-blog (lun 09:30, mar 09:30, mié 09:30…); nickelodeon-2004-01-blog (lun 09:00, mar 09:00, mié 09:00…); nickelodeon 2004-02-20 (09:00); nickelodeon 2004-04-07 (09:00); nickelodeon 2004-06-04 (09:00); nickelodeon 2004-08-09 (09:00); nickelodeon 2004-10-21 (09:00); nickelodeon 2004-12-07 (09:00) |
| Las Pistas de Blue | nickelodeon | 16 | nickelodeon-2001-08-blog (lun 09:00, mar 09:00, mié 09:00…); nickelodeon-2004-01-blog (lun 08:30, mar 08:30, mié 08:30…); nickelodeon 2004-02-20 (08:30); nickelodeon 2004-04-07 (08:30); nickelodeon 2004-06-04 (08:30); nickelodeon 2004-08-09 (08:30); nickelodeon 2004-10-21 (08:30); nickelodeon 2004-12-07 (08:30) |
| LazyTown | discovery-kids | 16 | discovery-kids-2005-08-blog (lun 12:00, mar 12:00, mié 12:00…); discovery-kids 2005-04-18 (15:00, 20:00) |
| Rolie Polie Olie | disney-channel | 16 | disney-channel-2004-01-blog (lun 10:00, mar 10:00, mié 10:00…); disney-channel 2004-02-20 (10:00); disney-channel 2004-04-07 (10:00); disney-channel 2004-06-04 (10:00); disney-channel 2004-08-09 (10:00); disney-channel 2004-10-21 (10:00); disney-channel 2004-12-07 (09:00); disney-channel 2005-03-04 (09:00); disney-channel 2005-04-18 (09:00); disney-channel 2005-09-02 (09:00) |
| Conejo Ricochet | boomerang | 15 | boomerang-2003-12-latinoamerica-wiki (lun 12:00, mar 12:00, mié 12:00…) |
| La Leyenda de Tarzan | disney-channel | 15 | disney-channel-2004-01-blog (lun 13:30, mar 13:30, mié 13:30…); disney-channel-2005-08-blog (lun 13:00, mar 13:00, mié 13:00…); disney-channel 2004-12-07 (13:30); disney-channel 2005-03-04 (13:30); disney-channel 2005-04-18 (13:30) |
| Pixie, Dixie y el Sr. Jinx | boomerang | 15 | boomerang-2003-12-latinoamerica-wiki (lun 13:00, mar 13:00, mié 13:00…) |
| Shadow Raiders | cartoon-network | 15 | cartoon-network-2000-10-latinoamerica-wiki (lun 00:00, mar 00:00, mié 00:00…); cartoon-network-2000-10-latinoamerica-oficial (lun 00:00, mar 00:00, mié 00:00…); cartoon-network-2000-10-mexico-wiki (lun 18:00, mar 18:00, mié 18:00…) |
| Beetlejuice | cartoon-network | 14 | cartoon-network-2000-10-latinoamerica-wiki (sáb 04:00, dom 13:30); cartoon-network-2000-10-latinoamerica-oficial (lun 15:00, mar 15:00, mié 15:00…); cartoon-network-2002-11-wiki (lun 13:30, mar 13:30, mié 13:30…) |
| Buzz Lightyear: Comando Estelar | disney-channel | 14 | disney-channel-2004-01-blog (lun 13:00, mar 13:00, mié 13:00…); disney-channel-2005-08-blog (sáb 15:30); disney-channel 2004-02-20 (13:00); disney-channel 2004-04-07 (13:00); disney-channel 2004-06-04 (13:00); disney-channel 2004-08-09 (13:00); disney-channel 2004-10-21 (13:00); disney-channel 2004-12-07 (13:00); disney-channel 2005-03-04 (13:00); disney-channel 2005-04-18 (13:00) |
| Pequeños Planetas | discovery-kids | 14 | discovery-kids-2004-01-blog (vie 07:30, vie 13:00, vie 23:30…); discovery-kids-2005-08-blog (vie 00:30, sáb 00:30); discovery-kids 2004-02-20 (07:30, 13:00, 23:30) |
| La Ventana de Allegra | nickelodeon | 13 | nickelodeon-2001-08-blog (lun 08:30, mar 08:30, mié 08:30…); nickelodeon-2004-01-blog (lun 08:00, mar 08:00, mié 08:00…); nickelodeon 2004-02-20 (08:00); nickelodeon 2004-04-07 (08:00); nickelodeon 2004-06-04 (08:00) |
| Las Aventuras de PB&J Otter | disney-channel | 13 | disney-channel-2004-01-blog (lun 09:00, mar 09:00, mié 09:00…); disney-channel-2005-08-blog (lun 07:00, mar 07:00, mié 07:00…); disney-channel 2005-09-02 (06:00) |
| Que Historia Tan Maravillosa | cartoon-network | 13 | cartoon-network-2000-10-latinoamerica-oficial (lun 16:30, mar 16:30, mié 16:30…); cartoon-network-2000-10-mexico-wiki (lun 21:30, mar 21:30, mié 21:30…); cartoon-network-2002-11-wiki (lun 20:00, mar 20:00, mié 20:00…) |
| Travesuras del Aula 402 | fox-kids | 13 | fox-kids-2001-08-blog (mar 14:00, jue 14:00, sáb 08:30…); fox-kids-2003-01-sur-blog (lun 11:30, mar 11:30, mié 11:30…); fox-kids 2003-12-11 (15:30) |
| El Circo de Jojo | disney-channel | 12 | disney-channel-2005-08-blog (lun 09:00, mar 09:00, mié 09:00…); disney-channel 2004-10-21 (09:00); disney-channel 2004-12-07 (08:00); disney-channel 2005-03-04 (08:00); disney-channel 2005-04-18 (08:00); disney-channel 2005-09-02 (08:00) |
| Hamtaro | cartoon-network | 12 | cartoon-network-2002-11-wiki (lun 08:30, mar 08:30, mié 08:30…); cartoon-network-2005-10-latinoamerica-wiki (sáb 08:30) |
| Hermana, Hermana | nickelodeon | 12 | nickelodeon-2001-08-blog (lun 22:30, mar 22:30, mié 22:30…); nickelodeon-2004-01-blog (sáb 14:30, dom 14:30); nickelodeon 2004-08-09 (02:00) |
| Hombres de negro | cartoon-network | 12 | cartoon-network-2000-10-latinoamerica-wiki (sáb 13:00); cartoon-network-2000-10-latinoamerica-oficial (sáb 13:00); cartoon-network-2000-10-mexico-wiki (lun 18:30, mar 18:30, mié 18:30…) |
| Hulk el Hombre Increíble | fox-kids, jetix | 12 | fox-kids-2001-08-blog (lun 05:00, mar 05:00, mié 05:00…); fox-kids-2003-01-sur-blog (lun 21:30, mar 21:30, mié 21:30…); jetix-2005-08-blog (sáb 07:00, dom 07:00) |
| La pequeña Lulú | cartoon-network | 12 | cartoon-network-2000-10-latinoamerica-wiki (lun 08:30, mar 08:30, mié 08:30…); cartoon-network-2000-10-latinoamerica-oficial (lun 08:30, mar 08:30, mié 08:30…); cartoon-network-2002-11-wiki (dom 09:30); cartoon-network-2005-10-latinoamerica-wiki (dom 06:30) |
| Poochini | nickelodeon | 12 | nickelodeon-2004-01-blog (lun 13:00, mar 13:00, mié 13:00…); nickelodeon 2004-02-20 (13:00); nickelodeon 2004-04-07 (13:00); nickelodeon 2004-06-04 (12:00); nickelodeon 2004-08-09 (12:00); nickelodeon 2004-10-21 (12:00) |
| Súper Cerdita | fox-kids | 12 | fox-kids-2001-08-blog (lun 11:00, mar 11:00, mié 11:00…) |
| Teletubbies en Todas Partes | discovery-kids | 12 | discovery-kids-2005-08-blog (lun 06:00, mar 06:00, mié 06:00…); discovery-kids 2004-10-21 (01:30, 09:30) |
| Amor Fraternal | disney-channel | 11 | disney-channel-2004-01-blog (lun 22:00, mar 22:00, mié 22:00…); disney-channel-2005-08-blog (dom 00:30); disney-channel 2004-02-20 (22:00); disney-channel 2004-04-07 (22:00); disney-channel 2004-06-04 (22:00); disney-channel 2004-08-09 (22:00); disney-channel 2004-10-21 (22:00) |
| Las increíbles aventuras de Jonny Quest | cartoon-network | 11 | cartoon-network-2000-10-latinoamerica-wiki (lun 18:30, mar 18:30, mié 18:30…) |
| Rubbadubbers | discovery-kids | 11 | discovery-kids-2005-08-blog (lun 09:00, mar 09:00, mié 09:00…); discovery-kids 2004-06-04 (08:00, 19:00); discovery-kids 2004-10-21 (08:00, 19:00) |
| Stuart Little | nickelodeon | 11 | nickelodeon-2004-01-blog (lun 10:00, mar 10:00, mié 10:00…); nickelodeon 2004-02-20 (10:00); nickelodeon 2004-04-07 (10:00); nickelodeon 2004-06-04 (10:00); nickelodeon 2004-08-09 (10:00) |
| Teamo Supremo | disney-channel | 11 | disney-channel-2004-01-blog (sáb 10:30, dom 10:30); disney-channel-2005-08-blog (lun 14:00, mar 14:00, mié 14:00…); disney-channel 2004-12-07 (14:30); disney-channel 2005-03-04 (14:30); disney-channel 2005-04-18 (14:30); disney-channel 2005-09-02 (13:00) |
| Thomas y Sus Amigos | discovery-kids | 11 | discovery-kids-2004-01-blog (lun 06:30, mar 06:30, mié 06:30…); discovery-kids-2005-08-blog (sáb 18:00, dom 18:00); discovery-kids 2004-02-20 (06:30); discovery-kids 2004-06-04 (06:30) |
| Ace Ventura | cartoon-network | 10 | cartoon-network-2000-10-latinoamerica-wiki (lun 14:30, mar 14:30, mié 14:30…); cartoon-network-2000-10-latinoamerica-oficial (lun 14:30, mar 14:30, mié 14:30…) |
| Edelberto el Tigre | discovery-kids | 10 | discovery-kids-2005-08-blog (lun 06:15, mar 06:15, mié 06:15…) |
| El Escuadrón Sobre Ruedas | fox-kids | 10 | fox-kids-2003-01-sur-blog (lun 07:00, mar 07:00, mié 07:00…) |
| El Mundo Divertido de Peep | discovery-kids | 10 | discovery-kids-2005-08-blog (lun 09:30, mar 09:30, mié 09:30…); discovery-kids 2004-10-21 (08:30); discovery-kids 2005-03-04 (09:30); discovery-kids 2005-04-18 (09:30) |
| GaS / Global Guts | nickelodeon | 10 | nickelodeon-2001-08-blog (lun 18:00, mar 18:00, mié 18:00…) |
| GaS / Leyendas del Templo Escondido | nickelodeon | 10 | nickelodeon-2001-08-blog (lun 17:30, mar 17:30, mié 17:30…) |
| Little People | discovery-kids | 10 | discovery-kids-2005-08-blog (lun 08:30, mar 08:30, mié 08:30…); discovery-kids 2004-10-21 (07:30); discovery-kids 2005-03-04 (07:30); discovery-kids 2005-04-18 (07:30) |
| Scooby-Doo | cartoon-network | 10 | cartoon-network-2000-10-latinoamerica-wiki (lun 15:00, mar 15:00, mié 15:00…); cartoon-network-2002-11-wiki (sáb 18:00); cartoon-network 2005-03-04 (14:00, 21:30); cartoon-network 2005-04-21 (14:00, 21:30) |
| Transformers: Armada | jetix, fox-kids | 10 | jetix-2005-08-blog (lun 07:00, mar 07:00, mié 07:00…); fox-kids 2003-12-11 (05:00, 21:30); jetix 2005-03-04 (07:00); jetix 2005-04-18 (07:00); jetix 2005-09-02 (07:00) |
| El Mundo de Tosh | nickelodeon | 9 | nickelodeon-2004-01-blog (lun 19:30, mar 19:30, mié 19:30…); nickelodeon 2004-02-20 (03:30) |
| Historias del Miedo | fox-kids | 9 | fox-kids-2001-08-blog (sáb 20:00, sáb 20:30, sáb 21:00…) |
| Jacobo Dos Dos | cartoon-network | 9 | cartoon-network-2005-10-latinoamerica-wiki (lun 09:00, mar 09:00, mié 09:00…); cartoon-network 2005-03-04 (09:00); cartoon-network 2005-04-21 (09:00) |
| Martin Mystery | nickelodeon | 9 | nickelodeon 2004-06-04 (01:30, 17:30); nickelodeon 2004-08-09 (00:00, 06:30, 17:30); nickelodeon 2004-10-21 (01:30, 17:30); nickelodeon 2004-12-07 (01:30, 17:30) |
| Oswald | disney-channel | 9 | disney-channel-2004-01-blog (lun 08:30, mar 08:30, mié 08:30…); disney-channel 2004-02-20 (08:30); disney-channel 2004-04-07 (08:30); disney-channel 2004-06-04 (08:30); disney-channel 2004-08-09 (08:30) |
| Popeye | cartoon-network | 9 | cartoon-network-2000-10-latinoamerica-wiki (dom 01:00); cartoon-network-2000-10-latinoamerica-oficial (sáb 23:00, dom 01:00); cartoon-network-2002-11-wiki (lun 04:30, mar 04:30, mié 04:30…) |
| Ralph el Travieso | nickelodeon | 9 | nickelodeon-2001-08-blog (sáb 19:00, dom 19:00, sáb 03:00…); nickelodeon-2004-01-blog (lun 07:00, mar 07:00, mié 07:00…) |
| Toddworld | discovery-kids | 9 | discovery-kids-2005-08-blog (lun 10:00, mar 10:00, mié 10:00…); discovery-kids 2005-03-04 (09:00); discovery-kids 2005-04-18 (09:00) |
| El Librito de la Selva | disney-channel | 8 | disney-channel-2005-08-blog (lun 11:00, mar 11:00, mié 11:00…); disney-channel 2005-09-02 (10:00) |
| Fillmore | jetix | 8 | jetix-2005-08-blog (lun 14:30, mar 14:30, mié 14:30…); jetix 2005-03-04 (13:30); jetix 2005-04-18 (13:30); jetix 2005-09-02 (14:30) |
| Floricienta | disney-channel | 8 | disney-channel-2005-08-blog (lun 22:00, mar 22:00, mié 22:00…); disney-channel 2005-03-04 (16:00); disney-channel 2005-04-18 (22:00); disney-channel 2005-09-02 (21:00) |
| Gadget y Los Gadgetinis | jetix | 8 | jetix-2005-08-blog (lun 12:30, mar 12:30, mié 12:30…); jetix 2005-03-04 (12:30); jetix 2005-04-18 (12:30); jetix 2005-09-02 (12:30) |
| Juanito Jones | nickelodeon | 8 | nickelodeon-2004-01-blog (lun 09:30, mié 09:30, vie 09:30); nickelodeon 2004-02-20 (09:30); nickelodeon 2004-04-07 (09:30); nickelodeon 2004-06-04 (09:30); nickelodeon 2004-08-09 (09:30); nickelodeon 2004-10-21 (10:00) |
| La pantera rosa | cartoon-network, boomerang | 8 | cartoon-network-2002-11-wiki (lun 03:30, mar 03:30, mié 03:30…); boomerang-2005-07-latinoamerica-wiki (sáb 13:00, sáb 21:00, sáb 05:00) |
| Mucha Lucha | cartoon-network | 8 | cartoon-network-2005-10-latinoamerica-wiki (lun 12:30, mar 12:30, mié 12:30…); cartoon-network 2005-03-04 (16:30); cartoon-network 2005-04-21 (16:30) |
| Rocky y Bullwinkle | cartoon-network, boomerang | 8 | cartoon-network-2002-11-wiki (lun 04:00, mar 04:00, mié 04:00…); boomerang-2005-07-latinoamerica-wiki (dom 06:00, dom 14:00, dom 22:00) |
| S Club 7 | nickelodeon | 8 | nickelodeon-2001-08-blog (vie 18:30, sáb 17:30, dom 17:30…); nickelodeon-2004-01-blog (vie 18:30, vie 02:30); nickelodeon 2004-02-20 (18:30) |
| 3 Amigos y Jerry | nickelodeon | 7 | nickelodeon-2001-08-blog (lun 14:00, mar 14:00, mié 14:00…) |
| Bob | discovery-kids | 7 | discovery-kids 2004-06-04 (02:30, 10:30, 19:30); discovery-kids 2005-03-04 (02:30, 19:00); discovery-kids 2005-04-18 (02:30, 19:00) |
| Charlie Brown | nickelodeon | 7 | nickelodeon-2001-08-blog (lun 11:30, mar 11:30, mié 11:30…) |
| Clifford de Cachorrito | discovery-kids | 7 | discovery-kids-2005-08-blog (jue 17:00, vie 17:00, sáb 17:00…) |
| Duelo Xiaolin | cartoon-network | 7 | cartoon-network-2005-10-latinoamerica-wiki (lun 13:00, mar 13:00, mié 13:00…); cartoon-network 2005-09-23 (13:00) |
| El lagartijo de Ned | cartoon-network | 7 | cartoon-network-2000-10-latinoamerica-wiki (dom 12:30); cartoon-network-2000-10-latinoamerica-oficial (dom 12:30); cartoon-network-2002-11-wiki (lun 14:30, mar 14:30, mié 14:30…) |
| Escuela del Rinoceronte Volador | nickelodeon | 7 | nickelodeon-2001-08-blog (lun 07:30, mar 07:30, mié 07:30…) |
| Kong | fox-kids | 7 | fox-kids-2001-08-blog (mar 16:00, jue 16:00); fox-kids-2003-01-sur-blog (lun 03:30, mar 03:30, mié 03:30…) |
| Los Héroes de la Ciudad | disney-channel | 7 | disney-channel-2005-08-blog (lun 09:30, mar 09:30, mié 09:30…); disney-channel 2005-04-18 (08:30); disney-channel 2005-09-02 (08:30) |
| Mascotas extraterrestres | cartoon-network | 7 | cartoon-network-2005-10-latinoamerica-wiki (lun 16:00, mar 16:00, mié 16:00…) |
| Rolie Polie Olie y su Familia | disney-channel | 7 | disney-channel-2005-08-blog (lun 10:00, mar 10:00, mié 10:00…) |
| Sagwa, la gatita siamesa | cartoon-network | 7 | cartoon-network-2002-11-wiki (sáb 07:00); cartoon-network-2005-10-latinoamerica-wiki (lun 08:00, mar 08:00, mié 08:00…); cartoon-network 2005-09-23 (08:00) |
| Tiny Toons | cartoon-network | 7 | cartoon-network-2002-11-wiki (lun 06:30, mar 06:30, mié 06:30…); cartoon-network-2005-10-latinoamerica-wiki (dom 06:00) |
| Toonsylvania | fox-kids | 7 | fox-kids-2001-08-blog (mar 12:00, jue 12:00, sáb 10:30…); fox-kids-2003-01-sur-blog (sáb 03:00, dom 03:00) |
| Yakkity Yak | nickelodeon | 7 | nickelodeon 2004-04-07 (03:30, 19:30); nickelodeon 2004-06-04 (03:30); nickelodeon 2004-08-09 (02:30, 19:30); nickelodeon 2004-10-21 (03:30, 19:30) |
| Allen Strange | nickelodeon | 6 | nickelodeon-2001-08-blog (lun 06:30, dom 06:30, sáb 17:00…) |
| Battle B-Daman | jetix | 6 | jetix-2005-08-blog (lun 19:30, mar 19:30, mié 19:30…); jetix 2005-09-02 (19:30) |
| Cartoon a Doodle-Do | cartoon-network | 6 | cartoon-network-2000-10-latinoamerica-wiki (lun 06:00, mar 06:00, mié 06:00…) |
| Cartoon-A-Doodle-Doo | cartoon-network | 6 | cartoon-network-2000-10-latinoamerica-oficial (lun 06:00, mar 06:00, mié 06:00…) |
| El club Winx | cartoon-network | 6 | cartoon-network-2005-10-latinoamerica-wiki (lun 15:00, mar 15:00, mié 15:00…) |
| El oso Yogi | boomerang | 6 | boomerang-2003-12-latinoamerica-wiki (sáb 12:00, sáb 20:00, sáb 04:00); boomerang 2005-03-04 (05:00, 13:00, 21:00) |
| Galidor | nickelodeon | 6 | nickelodeon-2004-01-blog (lun 06:30, dom 06:30, sáb 13:00…) |
| Gemelas en Apuros | fox-kids | 6 | fox-kids-2001-08-blog (lun 09:00, mié 09:00, vie 09:00); fox-kids-2003-01-sur-blog (lun 08:00, mié 08:00, vie 08:00) |
| Generación O! | nickelodeon | 6 | nickelodeon-2001-08-blog (mar 19:30, jue 19:30, mar 04:00…); nickelodeon-2004-01-blog (sáb 10:30, dom 10:30) |
| Gundam Wing | cartoon-network | 6 | cartoon-network-2002-11-wiki (lun 17:30, mar 17:30, mié 17:30…); cartoon-network 2005-09-23 (00:30) |
| Increíbles Aventuras J. Quest | cartoon-network | 6 | cartoon-network-2000-10-latinoamerica-oficial (lun 18:30, mar 18:30, mié 18:30…) |
| Los Archivos Secretos de Shelby Woo | nickelodeon | 6 | nickelodeon-2001-08-blog (lun 06:00, dom 06:00, sáb 18:30…) |
| Los Cariñositos | boomerang | 6 | boomerang-2005-07-latinoamerica-wiki (sáb 07:00, sáb 15:00, sáb 23:00); boomerang 2005-03-04 (04:30, 12:30, 20:30) |
| Los osos Berenstains | cartoon-network | 6 | cartoon-network-2005-10-latinoamerica-wiki (lun 08:30, mar 08:30, mié 08:30…) |
| Mouse, Cámara, Acción | disney-channel | 6 | disney-channel-2005-08-blog (dom 20:00, dom 20:30, dom 21:00…) |
| 101 Dálmatas de Disney | disney-channel | 5 | disney-channel-2005-08-blog (lun 12:30, mar 12:30, mié 12:30…) |
| Autopista | fox-kids | 5 | fox-kids-2001-08-blog (dom 15:30, dom 20:00); fox-kids-2003-01-sur-blog (mar 13:00, jue 13:00, dom 10:00) |
| Busca del Castillo/Pokémon | cartoon-network | 5 | cartoon-network-2000-10-latinoamerica-oficial (lun 01:30, mar 01:30, mié 01:30…) |
| Connie | discovery-kids | 5 | discovery-kids 2004-06-04 (00:30, 08:30, 13:30); discovery-kids 2005-03-04 (00:30); discovery-kids 2005-04-18 (00:30) |
| Corrector Yui | cartoon-network | 5 | cartoon-network-2002-11-wiki (lun 01:00, mar 01:00, mié 01:00…) |
| El Mundo Fantástico de Richard Scarry | nickelodeon | 5 | nickelodeon-2001-08-blog (lun 08:00, mar 08:00, mié 08:00…) |
| El show de Cartoon Cartoons | cartoon-network | 5 | cartoon-network-2005-10-latinoamerica-wiki (lun 10:00, mar 10:00, mié 10:00…) |
| Escuadrón al Aire | fox-kids | 5 | fox-kids-2003-01-sur-blog (lun 03:00, mar 03:00, mié 03:00…) |
| Escuadrón Sobre Ruedas | fox-kids | 5 | fox-kids-2001-08-blog (lun 09:30, mar 09:30, mié 09:30…) |
| Gasparín | fox-kids | 5 | fox-kids-2001-08-blog (lun 07:00, mar 07:00, mié 07:00…) |
| Hombres X: Evolución | cartoon-network | 5 | cartoon-network-2002-11-wiki (lun 00:30, mar 00:30, mié 00:30…) |
| Hora Toon / Jake Long: El Dragón Occidental | disney-channel | 5 | disney-channel-2005-08-blog (lun 16:00, mar 16:00, mié 16:00…) |
| Hora Toon / Kim Possible | disney-channel | 5 | disney-channel-2005-08-blog (lun 17:30, mar 17:30, mié 17:30…) |
| Hora Toon / La Familia Proud | disney-channel | 5 | disney-channel-2005-08-blog (lun 17:00, mar 17:00, mié 17:00…) |
| Hora Toon / Las Aventuras de Brandy y el Sr. Bigotes | disney-channel | 5 | disney-channel-2005-08-blog (lun 15:30, mar 15:30, mié 15:30…) |
| Hora Toon / Lilo y Stitch de Disney | disney-channel | 5 | disney-channel-2005-08-blog (lun 15:00, mar 15:00, mié 15:00…) |
| Hora Toon / Recreo | disney-channel | 5 | disney-channel-2005-08-blog (lun 16:30, mar 16:30, mié 16:30…) |
| Investigadores de fantasmas | cartoon-network | 5 | cartoon-network-2005-10-latinoamerica-wiki (lun 18:00, mar 18:00, mié 18:00…) |
| It's Itsy Bitsy Time! | fox-kids | 5 | fox-kids-2001-08-blog (lun 08:00, mar 08:00, mié 08:00…) |
| J. Quest/Busca del Castillo | cartoon-network | 5 | cartoon-network-2000-10-latinoamerica-oficial (lun 00:30, mar 00:30, mié 00:30…) |
| Jim Botón | fox-kids | 5 | fox-kids-2001-08-blog (lun 11:30, mar 11:30, mié 11:30…) |
| La Abejita Hutch | fox-kids | 5 | fox-kids-2001-08-blog (lun 06:00, mar 06:00, mié 06:00…) |
| La Familia Por Qué? | fox-kids | 5 | fox-kids-2001-08-blog (lun 07:30, mar 07:30, mié 07:30…) |
| La Pandilla del Fin de Semana | disney-channel | 5 | disney-channel-2004-01-blog (sáb 10:00, dom 10:00, sáb 05:30…); disney-channel 2004-08-09 (05:30) |
| La Princesa Sissi | fox-kids | 5 | fox-kids-2001-08-blog (lun 06:30, mar 06:30, mié 06:30…) |
| Las aventuras de Winnie Pooh | disney-channel | 5 | disney-channel 2004-10-21 (08:30); disney-channel 2004-12-07 (07:30); disney-channel 2005-03-04 (07:30); disney-channel 2005-04-18 (07:30); disney-channel 2005-09-02 (06:30) |
| Las Nuevas Aventuras de Winnie Pooh | disney-channel | 5 | disney-channel-2005-08-blog (lun 07:30, mar 07:30, mié 07:30…) |
| Mister Magoo | cartoon-network | 5 | cartoon-network-2002-11-wiki (lun 03:00, mar 03:00, mié 03:00…) |
| Pixie y Dixie | cartoon-network, boomerang | 5 | cartoon-network-2000-10-latinoamerica-wiki (dom 04:30); cartoon-network-2000-10-latinoamerica-oficial (dom 04:30); boomerang 2003-12-11 (02:00, 10:00, 18:00) |
| Poko | discovery-kids | 5 | discovery-kids-2005-08-blog (lun 10:30, mar 10:30, mié 10:30); discovery-kids 2005-03-04 (10:00); discovery-kids 2005-04-18 (10:00) |
| Power Rangers: La Galaxia Perdida | fox-kids | 5 | fox-kids-2001-08-blog (lun 16:30, mar 16:30, mié 16:30…) |
| Querida, Encogí a los Niños | disney-channel | 5 | disney-channel-2004-01-blog (sáb 15:00, dom 15:00, sáb 03:00…); disney-channel 2004-08-09 (03:00) |
| Rupert | nickelodeon | 5 | nickelodeon-2001-08-blog (lun 10:30, mar 10:30, mié 10:30…) |
| Samurai X | cartoon-network | 5 | cartoon-network-2002-11-wiki (lun 00:00, mar 00:00, mié 00:00…) |
| Scooby-Doo y Scrappy-Doo | cartoon-network | 5 | cartoon-network-2002-11-wiki (lun 09:30, mar 09:30, mié 09:30…) |
| Shin-Chan | fox-kids | 5 | fox-kids-2003-01-sur-blog (lun 19:00, mar 19:00, mié 19:00…) |
| Street Fighter II-V | cartoon-network | 5 | cartoon-network-2002-11-wiki (lun 18:00, mar 18:00, mié 18:00…) |
| Super Doll Licca Chan | cartoon-network | 5 | cartoon-network-2002-11-wiki (lun 16:30, mar 16:30, mié 16:30…) |
| Yvon del Yukon | nickelodeon | 5 | nickelodeon-2004-01-blog (lun 12:30, mar 12:30, mié 12:30…) |
| Click Nick | nickelodeon | 4 | nickelodeon-2004-01-blog (sáb 15:00, dom 15:00, sáb 23:00…) |
| Code Lyoko | jetix | 4 | jetix-2005-08-blog (sáb 18:30, dom 18:30); jetix 2005-03-04 (18:30); jetix 2005-04-18 (18:30) |
| Conspiracion Roswell/Lavender | cartoon-network | 4 | cartoon-network-2000-10-latinoamerica-oficial (lun 18:00, mar 18:00, mié 18:00…) |
| Disney Princesas / Aladdin de Disney | disney-channel | 4 | disney-channel-2005-08-blog (sáb 12:30, dom 12:30, sáb 05:30…) |
| Disney Princesas / La Sirenita de Disney | disney-channel | 4 | disney-channel-2005-08-blog (sáb 12:00, dom 12:00, sáb 05:00…) |
| Duel Masters → Los caballeros del zodiaco | cartoon-network | 4 | cartoon-network-2005-10-latinoamerica-wiki (lun 01:00, mar 01:00, mié 01:00…) |
| El Nuevo Action Man | fox-kids | 4 | fox-kids-2001-08-blog (lun 16:00, mié 16:00, vie 16:00…) |
| El Pequeño Tractor Rojo | discovery-kids | 4 | discovery-kids-2005-08-blog (jue 15:30, vie 15:30, sáb 15:30…) |
| Fetch el Veterinario | discovery-kids | 4 | discovery-kids-2004-01-blog (lun 06:00, mar 06:00, mié 06:00…) |
| Historias de fantasmas | cartoon-network | 4 | cartoon-network-2005-10-latinoamerica-wiki (lun 23:30, mar 23:30, mié 23:30…) |
| Inuyasha → Samurai Jack | cartoon-network | 4 | cartoon-network-2005-10-latinoamerica-wiki (lun 00:00, mar 00:00, mié 00:00…) |
| Karate Kid | cartoon-network, boomerang | 4 | cartoon-network-2002-11-wiki (dom 03:00); boomerang 2005-09-02 (03:00, 11:00, 19:00) |
| La Momia | fox-kids, jetix | 4 | fox-kids-2003-01-sur-blog (sáb 07:30, dom 07:30); jetix-2005-08-blog (sáb 20:30, dom 20:30) |
| Las aventuras de P B y J Otter | disney-channel | 4 | disney-channel 2004-02-20 (09:00); disney-channel 2004-04-07 (09:00); disney-channel 2004-06-04 (09:00); disney-channel 2004-08-09 (09:00) |
| Las aventuras de Silvestre y Piolín | cartoon-network | 4 | cartoon-network-2000-10-latinoamerica-wiki (sáb 18:30, dom 16:00, dom 21:00); cartoon-network-2002-11-wiki (sáb 18:30) |
| Las Nuevas Aventuras de Madeline | disney-channel | 4 | disney-channel-2004-01-blog (sáb 08:00, dom 08:00); disney-channel-2005-08-blog (sáb 07:30, dom 07:30) |
| Mellizos Cramp | fox-kids | 4 | fox-kids-2003-01-sur-blog (mar 09:00, jue 09:00, sáb 04:00…) |
| Mirmo Zibang | cartoon-network | 4 | cartoon-network 2005-03-04 (15:00); cartoon-network 2005-04-21 (15:00); cartoon-network 2005-09-23 (10:30, 15:00) |
| Pokémon (hasta miércoles 12) → La guerra de Sakura | cartoon-network | 4 | cartoon-network-2005-10-latinoamerica-wiki (lun 01:30, mar 01:30, mié 01:30…) |
| Taina | nickelodeon | 4 | nickelodeon-2004-01-blog (vie 19:30, vie 03:30); nickelodeon 2004-02-20 (19:30); nickelodeon 2004-06-04 (19:30) |
| Weekend Stunt | nickelodeon | 4 | nickelodeon-2004-01-blog (sáb 17:00, dom 17:00, sáb 01:00…) |
| Yvon of the Yunkon | nickelodeon | 4 | nickelodeon 2004-02-20 (12:30); nickelodeon 2004-04-07 (12:30); nickelodeon 2004-06-04 (12:30); nickelodeon 2004-08-09 (05:00) |
| Zapping Sports | disney-channel | 4 | disney-channel-2005-08-blog (jue 21:30, jue 03:30); disney-channel 2004-02-20 (21:30); disney-channel 2004-04-07 (02:30) |
| Aventuras Silvestre y Piolín | cartoon-network | 3 | cartoon-network-2000-10-latinoamerica-oficial (sáb 18:30, dom 16:00, dom 21:00) |
| Cartoon Cartoons Show | cartoon-network | 3 | cartoon-network 2005-03-04 (10:00); cartoon-network 2005-04-21 (10:00); cartoon-network 2005-09-23 (10:00) |
| Despistados | nickelodeon | 3 | nickelodeon-2004-01-blog (sáb 14:00, dom 14:00); nickelodeon 2004-08-09 (01:00) |
| Droopy D | cartoon-network | 3 | cartoon-network-2000-10-latinoamerica-wiki (dom 00:00); cartoon-network-2000-10-latinoamerica-oficial (dom 00:00); cartoon-network-2002-11-wiki (dom 16:00) |
| El Capitán Planeta | boomerang | 3 | boomerang-2005-07-latinoamerica-wiki (dom 09:00, dom 17:00, dom 01:00) |
| El perro Dinky | boomerang | 3 | boomerang-2005-07-latinoamerica-wiki (sáb 06:00, sáb 14:00, sáb 22:00) |
| El show del malo y siniestro | cartoon-network | 3 | cartoon-network-2002-11-wiki (vie 19:30, sáb 10:30, dom 18:30) |
| Érase una vez en Boomerang | boomerang | 3 | boomerang 2005-04-18 (05:00, 13:00, 21:00) |
| Gasparín y sus amigos | boomerang | 3 | boomerang-2005-07-latinoamerica-wiki (dom 08:00, dom 16:00, dom 00:00) |
| Kipper | cartoon-network | 3 | cartoon-network-2000-10-latinoamerica-wiki (dom 07:00); cartoon-network-2000-10-latinoamerica-oficial (dom 07:00); cartoon-network-2002-11-wiki (dom 07:00) |
| La Zorra y el Cuervo | boomerang | 3 | boomerang 2005-03-04 (07:00, 15:00, 23:00) |
| Locos Dieciseis | cartoon-network | 3 | cartoon-network-2005-10-latinoamerica-wiki (vie 22:30, sáb 22:30, dom 22:30) |
| Los hijos de la Pantera Rosa | boomerang | 3 | boomerang 2005-03-04 (02:00, 10:00, 18:00) |
| Mascostas extraterrestres | cartoon-network | 3 | cartoon-network 2005-09-23 (12:30, 20:00, 23:30) |
| Mimi | fox-kids | 3 | fox-kids-2001-08-blog (mar 10:00, jue 10:00, sáb 09:00) |
| Miniman | nickelodeon | 3 | nickelodeon-2004-01-blog (mar 09:30, jue 09:30); nickelodeon 2004-12-07 (10:00) |
| Mistertibu | boomerang | 3 | boomerang-2005-07-latinoamerica-wiki (sáb 12:00, sáb 20:00, sáb 04:00) |
| Pequeño Bill | nickelodeon | 3 | nickelodeon 2004-08-09 (08:00); nickelodeon 2004-10-21 (08:00); nickelodeon 2004-12-07 (08:00) |
| Pound Puppies | boomerang | 3 | boomerang 2005-03-04 (04:00, 12:00, 20:00) |
| Ratz | cartoon-network | 3 | cartoon-network 2005-03-04 (13:30, 21:00); cartoon-network 2005-04-21 (13:30) |
| Ricochet Rabbit | boomerang | 3 | boomerang 2003-12-11 (01:00, 09:00, 17:00) |
| Tarzán | disney-channel | 3 | disney-channel 2004-02-20 (13:30); disney-channel 2004-06-04 (13:30); disney-channel 2004-10-21 (13:30) |
| Wunschpunsch | fox-kids | 3 | fox-kids-2001-08-blog (mar 13:30, jue 13:30, sáb 08:00) |
| Yakky Doodle Duck | boomerang | 3 | boomerang-2003-12-latinoamerica-wiki (dom 08:00, dom 16:00, dom 00:00) |
| Batman | cartoon-network | 2 | cartoon-network 2005-09-23 (03:30, 18:30) |
| Canuto y Canito | cartoon-network | 2 | cartoon-network-2000-10-latinoamerica-wiki (dom 04:00); cartoon-network-2000-10-latinoamerica-oficial (dom 04:00) |
| Chicos Tom y Jerry | cartoon-network | 2 | cartoon-network-2000-10-latinoamerica-oficial (sáb 07:00, dom 09:00) |
| Copa Jetix | jetix | 2 | jetix-2005-08-blog (sáb 13:00, dom 13:00) |
| Corneil y Bernie | cartoon-network | 2 | cartoon-network 2005-03-04 (11:00); cartoon-network 2005-09-23 (16:30) |
| Depsistados | nickelodeon | 2 | nickelodeon-2001-08-blog (sáb 14:00, dom 14:00) |
| Disney Princesas - Aladdin | disney-channel | 2 | disney-channel-2004-01-blog (sáb 12:30, dom 12:30) |
| Disney Princesas - La Sirenita | disney-channel | 2 | disney-channel-2004-01-blog (sáb 12:00, dom 12:00) |
| Disney:La Leyenda de Tarzán | disney-channel | 2 | disney-channel 2004-04-07 (13:30); disney-channel 2004-08-09 (13:30) |
| DJ Nick | nickelodeon | 2 | nickelodeon-2001-08-blog (vie 19:00, vie 03:30) |
| El extraño mundo de Jack | disney-channel | 2 | disney-channel 2004-10-21 (01:00); disney-channel 2004-12-07 (01:00) |
| El fantástico Max | cartoon-network | 2 | cartoon-network-2000-10-latinoamerica-wiki (sáb 05:30); cartoon-network-2000-10-latinoamerica-oficial (sáb 05:30) |
| El show de los Looney Tunes | cartoon-network | 2 | cartoon-network-2002-11-wiki (sáb 19:00); cartoon-network-2005-10-latinoamerica-wiki (dom 10:00) |
| El Show de Ratón | disney-channel | 2 | disney-channel-2004-01-blog (sáb 06:30, dom 06:30) |
| Evolución | fox-kids | 2 | fox-kids-2003-01-sur-blog (sáb 20:00, dom 20:00) |
| Hannah y Grace | fox-kids | 2 | fox-kids-2001-08-blog (mar 09:00, jue 09:00) |
| Historias de Miedo | fox-kids | 2 | fox-kids-2001-08-blog (vie 20:00, dom 22:00) |
| Kim imposible | disney-channel | 2 | disney-channel 2004-12-07 (05:30, 16:30) |
| Krypto, el superperro | cartoon-network | 2 | cartoon-network-2005-10-latinoamerica-wiki (sáb 09:00); cartoon-network 2005-09-23 (09:30) |
| La Facultad Abracadabra | disney-channel | 2 | disney-channel-2005-08-blog (mar 23:30, jue 23:30) |
| Leoncio el león | cartoon-network | 2 | cartoon-network-2000-10-latinoamerica-wiki (dom 05:00); cartoon-network-2000-10-latinoamerica-oficial (dom 05:00) |
| Lloyd del Espacio | disney-channel | 2 | disney-channel-2004-01-blog (sáb 13:00, dom 13:00) |
| Los nuevos cuentos de Felix el gato | cartoon-network | 2 | cartoon-network-2000-10-latinoamerica-wiki (dom 13:00); cartoon-network-2002-11-wiki (dom 13:00) |
| Making the Band | nickelodeon | 2 | nickelodeon-2001-08-blog (vie 19:30, vie 04:00) |
| Mi Osito | nickelodeon | 2 | nickelodeon-2001-08-blog (sáb 07:00, dom 07:00) |
| Mi Padre, el Rockero | cartoon-network | 2 | cartoon-network 2005-04-21 (12:30, 20:00) |
| Mona the Vampire | cartoon-network | 2 | cartoon-network 2005-03-04 (09:30); cartoon-network 2005-04-21 (09:30) |
| Norman Normal | cartoon-network | 2 | cartoon-network 2005-04-21 (11:00); cartoon-network 2005-09-23 (11:00) |
| Pájaro Loco | fox-kids | 2 | fox-kids 2003-12-11 (10:00, 13:30) |
| Pinky, Elmyra y Cerebro | cartoon-network | 2 | cartoon-network-2000-10-latinoamerica-oficial (dom 17:30, dom 21:30) |
| Pinky, Elvira y Cerebro | cartoon-network | 2 | cartoon-network-2000-10-latinoamerica-wiki (dom 17:30, dom 21:30) |
| Porky Pig | cartoon-network | 2 | cartoon-network-2002-11-wiki (dom 06:00, dom 02:00) |
| Power Rangers: En el Espacio | fox-kids | 2 | fox-kids-2001-08-blog (sáb 16:30, dom 16:30) |
| Primates en acción | disney-channel | 2 | disney-channel 2004-08-09 (20:00); disney-channel 2005-04-18 (02:00) |
| Primo Skeeter | nickelodeon | 2 | nickelodeon-2001-08-blog (sáb 13:30, dom 13:30) |
| Proyecto Zeta | cartoon-network | 2 | cartoon-network-2002-11-wiki (sáb 13:30, sáb 05:00) |
| Sabrina: Secretos de la Brujita | disney-channel | 2 | disney-channel-2005-08-blog (sáb 16:00); disney-channel 2004-08-09 (05:00) |
| Silverwing | jetix | 2 | jetix-2005-08-blog (sáb 10:30, dom 10:30) |
| Superman | cartoon-network | 2 | cartoon-network 2005-03-04 (04:00); cartoon-network 2005-04-21 (04:00) |
| Transformers Energon | cartoon-network | 2 | cartoon-network 2005-03-04 (00:30); cartoon-network 2005-04-21 (00:30) |
| Zapping Music | disney-channel | 2 | disney-channel-2005-08-blog (mar 21:30, mar 03:30) |
| Zoids Fuzors | cartoon-network | 2 | cartoon-network 2005-03-04 (01:00); cartoon-network 2005-04-21 (01:00) |
| 2 Perros Tontos | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-oficial (sáb 19:00) |
| Aladdín | disney-channel | 1 | disney-channel 2005-04-18 (04:30) |
| Aladdín y los 40 ladrones | disney-channel | 1 | disney-channel 2005-04-18 (00:00) |
| Arturo | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (sáb 08:00) |
| Batman (2004) | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (sáb 13:30) |
| Beethoven | disney-channel | 1 | disney-channel 2005-03-04 (01:00) |
| Betty Atómica | cartoon-network | 1 | cartoon-network 2005-09-23 (15:30) |
| Betty Toons | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (dom 09:00) |
| Bichos: Una aventura en miniatura | disney-channel | 1 | disney-channel 2005-09-02 (01:00) |
| Bobo y tonto | cartoon-network | 1 | cartoon-network-2002-11-wiki (dom 21:30) |
| Conspiracion | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-oficial (vie 18:00) |
| Cosas de Chicos y Chicas | cartoon-network | 1 | cartoon-network 2005-03-04 (12:30) |
| Disney Planet | disney-channel | 1 | disney-channel 2004-02-20 (21:00) |
| Dos perros tontos | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-wiki (sáb 19:00) |
| Eerie, Indiana: La Otra Dimensión | fox-kids | 1 | fox-kids-2001-08-blog (dom 23:30) |
| El diario de la princesa | disney-channel | 1 | disney-channel 2005-04-18 (20:00) |
| El Hombre de Hierro | fox-kids | 1 | fox-kids-2001-08-blog (mar 23:30) |
| El león Melquiades | cartoon-network | 1 | cartoon-network-2000-10-mexico-wiki (dom 05:00) |
| El novato | disney-channel | 1 | disney-channel 2005-09-02 (19:00) |
| El Poderoso Thor | fox-kids | 1 | fox-kids-2001-08-blog (mié 23:30) |
| El Show de Tex Avery | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-oficial (sáb 23:30) |
| Érase una noche | disney-channel | 1 | disney-channel 2004-12-07 (20:00) |
| Extra Bonus | jetix | 1 | jetix-2005-08-blog (dom 12:45) |
| Familia Partridge | cartoon-network | 1 | cartoon-network-2002-11-wiki (dom 04:00) |
| Fantasma Espacio C a C | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-oficial (sáb 00:30) |
| Fievel | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-oficial (dom 07:30) |
| Fuerza G | cartoon-network | 1 | cartoon-network-2002-11-wiki (sáb 03:30) |
| Golazo: La Copa Jetix en Disney Channel | disney-channel | 1 | disney-channel-2005-08-blog (dom 16:30) |
| Hi Hi Puffy AmiYumi → Ed, Edd y Eddy (domingo 30) | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (dom 18:00) |
| Hi Hi Puffy AmiYumi → Ed, Edd y Eddy (sábado 29) | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (sáb 10:00) |
| Hi Hi Puffy AmiYumi → Ed, Edd y Eddy (viernes 28) | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (vie 19:00) |
| Hilary Duff: Concierto en Hawaii | disney-channel | 1 | disney-channel 2004-02-20 (20:00) |
| Hombre Araña | fox-kids | 1 | fox-kids 2003-12-11 (16:30) |
| Huck Hound | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-oficial (dom 05:30) |
| Huckleberry Hound | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-wiki (dom 05:30) |
| Jeannie (animado) | cartoon-network | 1 | cartoon-network-2002-11-wiki (dom 04:30) |
| La cadete Kelly | disney-channel | 1 | disney-channel 2005-03-04 (20:00) |
| La Familia Addams | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-oficial (sáb 03:30) |
| La Granja de los Monstruos | fox-kids | 1 | fox-kids-2001-08-blog (sáb 06:30) |
| La pandilla del Río Canguro | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (dom 10:30) |
| La Pareja Dispareja | fox-kids | 1 | fox-kids-2001-08-blog (sáb 10:00) |
| La sirenita | disney-channel | 1 | disney-channel 2005-04-18 (04:00) |
| Las aventuras de Arañita | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (dom 08:00) |
| Las locuras Andy | jetix | 1 | jetix 2005-09-02 (01:00) |
| Las Travesuras de Barki | fox-kids | 1 | fox-kids-2001-08-blog (dom 10:00) |
| Liga de la Justicia Ilimitada → Hombres X: Evolución | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (sáb 14:00) |
| Lo Mejor del Zapping Zone | disney-channel | 1 | disney-channel 2004-08-09 (04:00) |
| Loopy de Loop | cartoon-network | 1 | cartoon-network-2000-10-mexico-wiki (dom 04:30) |
| Los Archivos Secretos de los Perros Espías | fox-kids | 1 | fox-kids-2001-08-blog (sáb 14:30) |
| Los cuentos de Fievel | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-wiki (dom 07:30) |
| Los Luchadores | fox-kids | 1 | fox-kids-2001-08-blog (dom 21:00) |
| Los patos astutos | cartoon-network | 1 | cartoon-network-2002-11-wiki (dom 13:30) |
| Los pequeños Looney Tunes | cartoon-network | 1 | cartoon-network 2005-09-23 (09:00) |
| Mansión Foster | cartoon-network | 1 | cartoon-network 2005-03-04 (19:30) |
| Mansión Foster amigos imaginarios | cartoon-network | 1 | cartoon-network 2005-09-23 (19:30) |
| Masked Rider | fox-kids | 1 | fox-kids-2003-01-sur-blog (dom 10:30) |
| Max y Ruby | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (dom 07:30) |
| Mejorando la Casa | disney-channel | 1 | disney-channel-2005-08-blog (dom 18:00) |
| Mellizos Carmp | fox-kids | 1 | fox-kids 2003-12-11 (13:00) |
| Mi adorable Madeline | disney-channel | 1 | disney-channel 2004-04-07 (01:00) |
| Mi mamá tiene una cita con un vampiro | disney-channel | 1 | disney-channel 2004-10-21 (20:00) |
| Mighty Morphin Power Rangers | nickelodeon | 1 | nickelodeon-2004-01-blog (mié 16:30) |
| Milagro en el carril 2 | disney-channel | 1 | disney-channel 2004-06-04 (20:00) |
| Mini espías | disney-channel | 1 | disney-channel 2004-08-09 (00:00) |
| Mona, la vampira | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (sáb 07:00) |
| Monsters, Inc. | disney-channel | 1 | disney-channel 2004-06-04 (01:00) |
| My life as a teen age robot | nickelodeon | 1 | nickelodeon 2004-06-04 (18:30) |
| NASCAR Racers | fox-kids | 1 | fox-kids-2001-08-blog (dom 15:00) |
| Nuevos Cuentos Félix el Gato | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-oficial (dom 13:00) |
| Oh Yaeh | nickelodeon | 1 | nickelodeon 2004-10-21 (12:30) |
| Oh Yaeh Cartoon | nickelodeon | 1 | nickelodeon 2004-08-09 (12:30) |
| Oh Yeah | nickelodeon | 1 | nickelodeon 2004-12-07 (12:30) |
| Pecola | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (dom 07:00) |
| Pepper Ann de Disney | disney-channel | 1 | disney-channel 2004-08-09 (15:30) |
| Pequeños Picapiedras | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-oficial (dom 09:30) |
| Percy, el guardabosques | cartoon-network | 1 | cartoon-network-2002-11-wiki (dom 09:00) |
| Pixcodelics → Mascotas extraterrestres | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (sáb 12:00) |
| Plaza Sésamo y sus amigos | discovery-kids | 1 | discovery-kids 2005-04-18 (07:00) |
| Popolocrois | cartoon-network | 1 | cartoon-network-2002-11-wiki (dom 07:30) |
| Querida, Encogí a los Niños: La Serie | disney-channel | 1 | disney-channel-2005-08-blog (dom 23:30) |
| Robocop: La Serie Animada | fox-kids | 1 | fox-kids-2001-08-blog (jue 23:30) |
| Sabrina | nickelodeon | 1 | nickelodeon 2004-08-09 (01:30) |
| Sakura Card Captors | cartoon-network | 1 | cartoon-network-2002-11-wiki (sáb 04:30) |
| Sí se puede | disney-channel | 1 | disney-channel 2004-02-20 (01:00) |
| Slam! - Yakkity Yak | nickelodeon | 1 | nickelodeon-2004-01-blog (sáb 12:00) |
| Sneak Peek. Lilo y Stitch de Disney | disney-channel | 1 | disney-channel 2004-04-07 (19:00) |
| Spiderman | nickelodeon | 1 | nickelodeon 2004-06-04 (21:30) |
| Static Shock | cartoon-network | 1 | cartoon-network 2005-04-21 (23:30) |
| Súper Campeones | cartoon-network | 1 | cartoon-network 2005-03-04 (00:00) |
| Súper escuadrón ciber monos HF | jetix | 1 | jetix 2005-09-02 (18:30) |
| Toons Mundialmente Famos | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-oficial (dom 02:00) |
| Toons mundialmente famosos | cartoon-network | 1 | cartoon-network-2000-10-latinoamerica-wiki (dom 02:00) |
| Transformers Energon → Los jóvenes titanes | cartoon-network | 1 | cartoon-network-2005-10-latinoamerica-wiki (sáb 13:00) |
| Wheel Squad | fox-kids | 1 | fox-kids 2003-12-11 (10:30) |
| Winx Club, The | cartoon-network | 1 | cartoon-network 2005-04-21 (15:30) |
| Wishbone | fox-kids | 1 | fox-kids-2001-08-blog (dom 16:00) |
