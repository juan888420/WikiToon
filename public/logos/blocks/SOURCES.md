# Block logo sources

Logos for the blocks in `prisma/data/blocks.ts`, referenced by `Block.logoPath`. Files are named `{block-slug}`, which is globally unique: a block can run on several channels (Fox Kids and Jetix share five of them), so the file name can't carry a channel.

Rule for adding a logo:

- There must be evidence that the logo was used in Latin America.
- The file must come from a source with a verifiable license.
- The documented Latin American version and the file must match visually.

Otherwise the block keeps `logoPath = null` and shows initials. A logo from another region is never used as a substitute. The rule applies to every logo sourced for the project; the exception below is the project owner's own call, recorded so it isn't mistaken for a sourced file.

- **Evidence of Latin American use:** [Logopedia](https://logos.fandom.com). Its files have no free license, so they are used only to identify the version, never copied.
- **Files and licenses:** [Wikimedia Commons](https://commons.wikimedia.org). Both logos below are tagged `PD-textlogo` (public domain, below the threshold of originality) and `Trademarked`. They remain trademarks of their owners and are used only to identify the block in a historical archive, with no endorsement implied.
- **Comparison:** Logopedia's files are behind a bot challenge, so their archived copies on the [Wayback Machine](https://web.archive.org) were used to compare against Commons. Checked on 2026-09-24.

## Logos in use

| File | Block | Latin American evidence | Commons file | Credited author / original source | Changes |
|---|---|---|---|---|---|
| `toonami.svg` | Toonami (Cartoon Network) | [Logopedia: Toonami (Latin America)](https://logos.fandom.com/wiki/Toonami_(Latin_America)) documents this logo for 2002-2005 (the block launched on December 2, 2002). Matches the Logopedia file `Toonami logo.svg` ([archived copy](https://web.archive.org/web/20250528180422/https://static.wikia.nocookie.net/logopedia/images/b/b7/Toonami_logo.svg/revision/latest)). | [Toonami logo.svg](https://commons.wikimedia.org/wiki/File:Toonami_logo.svg) (Public domain) | Cartoon Network / Toonami | None: byte-identical to the Commons file. Legible on the dark tile as is (white outline). |
| `nick-at-nite.svg` | Nick at Nite (Nickelodeon) | [Logopedia: Nick at Nite (Latin America)](https://logos.fandom.com/wiki/Nick_at_Nite_(Latin_America)) documents this logo for 2008-2010. The Latin American launch logo (2006-2008) has no free source. Matches the Logopedia file `Nick_at_Nite_2007.svg` ([archived copy](https://web.archive.org/web/20240719234403/https://static.wikia.nocookie.net/logopedia/images/b/bb/Nick_at_Nite_2007.svg)). | [Nick at Nite logo 2007.svg](https://commons.wikimedia.org/wiki/File:Nick_at_Nite_logo_2007.svg) (Public domain) | Viacom International Inc. / Logopedia | None: byte-identical to the Commons file. |

## Assets provided by the project owner

These files were added to the repository by the project owner, who assigned each one to its block. **They do not meet the sourcing rule above:** they are broadcast captures with no documented license and no Commons equivalent, kept because the owner chose to use them. They are not the result of a source search, and nothing here should be read as a license claim. Each remains a trademark of its owner and is used only to identify the block in a historical archive.

Every one of them is a candidate for replacement if a properly licensed file ever turns up. They are also large PNGs (175-710 KB) rendered in a 48-80 px tile, so downscaling them is pending.

| File | Block | What the image shows |
|---|---|---|
| `cartoon-cartoons.png` | Cartoon Cartoons (Cartoon Network) | The "Cartoon Cartoons" wordmark on a TV set over a checkerboard. Unambiguous. |
| `nicktoons.png` | Nicktoons (Nickelodeon) | The "NICKTOONS" wordmark on the orange splat. Unambiguous. |
| `zapping-zone.png` | Zapping Zone (Disney Channel) | The "ZAPPING ZONE" wordmark on the yellow starburst. Unambiguous. |
| `quien-tiene-el-control.png` | ¿Quién tiene el control? (Fox Kids, Jetix) | A title card reading "¿QUIÉN TIENE EL CONTROL?". Unambiguous. |
| `invasion-anime.png` | Invasión Animé (Fox Kids, Jetix) | The "invasión animé" wordmark over the Jetix X. Unambiguous. |
| `insomnio.png` | Insomnio (Fox Kids, Jetix) | A title card with the Fox Kids logo. **The artwork reads "INSOMNIA", not "Insomnio"**, the name the block is recorded under. Worth confirming which name the Latin American block used. |
| `mysteria.png` | Mysteria (Fox Kids, Jetix) | A Fox Kids logo with bat wings and claws. **No "Mysteria" wordmark appears**; assigned on the file name alone, at the owner's instruction. |
| `doble-carga.png` | Doble Carga (Fox Kids, Jetix) | A Fox Kids schedule bumper: a robot with a panel reading "HOY / 11:00 ARG / 10:00 CHI". **Nothing in the image says "Doble Carga"**; assigned on the file name alone, at the owner's instruction. |

## Pending blocks (`logoPath = null`)

None: every block in the catalog has a logo. The rejected candidates below are kept as a record, so the same files are not proposed again.

| Block | Why a sourced logo was rejected |
|---|---|
| Cartoon Cartoons | Only on Logopedia, with no free license. There is also no evidence of a distinct Latin American version. |
| Nicktoons | No Latin American logo for the label. Commons only has logos of the Nicktoons TV channel (United States, United Kingdom), which is a different thing. |
| Zapping Zone | Latin American logos exist only on Logopedia (640x480 PNG), with no free license. |
| Mysteria, Insomnio, ¿Quién tiene el control?, Doble Carga, Invasión Animé | No logo found on Commons or Logopedia. |

Blocks removed from the catalog (see `prisma/data/blocks.ts`), with the candidates that had been checked for them:

| Block | Why it had no logo |
|---|---|
| Nick Jr. (Nickelodeon) | The Latin American block used the "Nick JR" wordmark (Logopedia: Nick Jr. (Latin America), 1996-2010). Commons only has other variants: `Nick-Jr-old-logo.png` (circles) and `Nick Jr 1988.webp` (figures, a user recreation). Neither matches. |
| Playhouse Disney (Disney Channel) | The Latin American block used the Mickey-ears logo (Logopedia: Disney Jr. (Latin America), 2003-2011). `2000 Playhouse Disney logo.svg` on Commons is a different design. `Playhouse Disney logo 2002.png` matches the design, but it is a user recreation uploaded as "own work" under CC0, a license the uploader can't grant for Disney's graphic logo. It is also a 3840x2160 PNG that is mostly padding. |

When a logo is provided for a new block:

1. Add the file here, named `{block-slug}`.
2. Add a row to "Logos in use" with its source, license and any changes, or to "Assets provided by the project owner" when it doesn't meet the rule.
3. Set `logoPath` in `prisma/data/blocks.ts`.
4. Run `npm run db:load:blocks`.
