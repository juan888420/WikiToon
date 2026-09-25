# Block logo sources

Logos for the blocks in `prisma/data/blocks.ts`, referenced by `Block.logoPath`. Files are named `{channel-slug}-{block-slug}` because a block slug is only unique within its channel.

Rule for adding a logo:

- There must be evidence that the logo was used in Latin America.
- The file must come from a source with a verifiable license.
- The documented Latin American version and the file must match visually.

Otherwise the block keeps `logoPath = null` and shows initials. A logo from another region is never used as a substitute.

- **Evidence of Latin American use:** [Logopedia](https://logos.fandom.com). Its files have no free license, so they are used only to identify the version, never copied.
- **Files and licenses:** [Wikimedia Commons](https://commons.wikimedia.org). Both logos below are tagged `PD-textlogo` (public domain, below the threshold of originality) and `Trademarked`. They remain trademarks of their owners and are used only to identify the block in a historical archive, with no endorsement implied.
- **Comparison:** Logopedia's files are behind a bot challenge, so their archived copies on the [Wayback Machine](https://web.archive.org) were used to compare against Commons. Checked on 2026-09-24.

## Logos in use

| File | Block | Latin American evidence | Commons file | Credited author / original source | Changes |
|---|---|---|---|---|---|
| `cartoon-network-toonami.svg` | Cartoon Network, Toonami | [Logopedia: Toonami (Latin America)](https://logos.fandom.com/wiki/Toonami_(Latin_America)) documents this logo for 2002-2005 (the block launched on December 2, 2002). Matches the Logopedia file `Toonami logo.svg` ([archived copy](https://web.archive.org/web/20250528180422/https://static.wikia.nocookie.net/logopedia/images/b/b7/Toonami_logo.svg/revision/latest)). | [Toonami logo.svg](https://commons.wikimedia.org/wiki/File:Toonami_logo.svg) (Public domain) | Cartoon Network / Toonami | None: byte-identical to the Commons file. Legible on the dark tile as is (white outline). |
| `nickelodeon-nick-at-nite.svg` | Nickelodeon, Nick at Nite | [Logopedia: Nick at Nite (Latin America)](https://logos.fandom.com/wiki/Nick_at_Nite_(Latin_America)) documents this logo for 2008-2010. The Latin American launch logo (2006-2008) has no free source. Matches the Logopedia file `Nick_at_Nite_2007.svg` ([archived copy](https://web.archive.org/web/20240719234403/https://static.wikia.nocookie.net/logopedia/images/b/bb/Nick_at_Nite_2007.svg)). | [Nick at Nite logo 2007.svg](https://commons.wikimedia.org/wiki/File:Nick_at_Nite_logo_2007.svg) (Public domain) | Viacom International Inc. / Logopedia | None: byte-identical to the Commons file. |

## Pending blocks (`logoPath = null`)

Candidates checked and rejected:

| Block | Why it has no logo |
|---|---|
| Nickelodeon, Nick Jr. | The Latin American block used the "Nick JR" wordmark (Logopedia: Nick Jr. (Latin America), 1996-2010). Commons only has other variants: `Nick-Jr-old-logo.png` (circles) and `Nick Jr 1988.webp` (figures, a user recreation). Neither matches. |
| Disney Channel, Playhouse Disney | The Latin American block used the Mickey-ears logo (Logopedia: Disney Jr. (Latin America), 2003-2011). `2000 Playhouse Disney logo.svg` on Commons is a different design. `Playhouse Disney logo 2002.png` matches the design, but it is a user recreation uploaded as "own work" under CC0, a license the uploader can't grant for Disney's graphic logo. It is also a 3840x2160 PNG that is mostly padding. |
| Disney Channel, Zapping Zone | Latin American logos exist only on Logopedia (640x480 PNG), with no free license. |
| Cartoon Network, Cartoon Cartoons | Only on Logopedia, with no free license. There is also no evidence of a distinct Latin American version. |

Not found at all, on Commons or Logopedia:

| Block | Why it has no logo |
|---|---|
| Nickelodeon, Nicktoons | No Latin American logo for the label. Commons only has logos of the Nicktoons TV channel (United States, United Kingdom), which is a different thing. |
| Fox Kids: Mysteria, Insomnio, ¿Quién tiene el control?, Doble Carga, Invasión Animé | No logo found. |
| Jetix: Invasión Animé, Mysteria, ¿Quién tiene el control?, Doble Carga | No logo found. |

When a logo is provided for a pending block:

1. Add the file here.
2. Add a row to "Logos in use" with its source, license and any changes.
3. Set `logoPath` in `prisma/data/blocks.ts`.
4. Run `npm run db:load:blocks`.
