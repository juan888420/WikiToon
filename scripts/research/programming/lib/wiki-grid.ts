// Parses the grid pages of the Cartoon Network Wiki (Fandom, es): MediaWiki tables with rowspan and
// colspan, where block membership is marked with templates such as {{Toonami (2002)}}.
import { normalizeTime } from "./text";

/** Templates that mark a slot as part of a block, with the block's name as the wiki writes it. */
const BLOCK_TEMPLATES: Record<string, string> = {
  "Toonami (2002)": "Toonami", "Toonami '05": "Toonami", "Adult Swim": "Adult Swim", Boomeraction: "Boomeraction",
  Talismán: "Talismán", "Horario Central": "Horario Central", "Sunday Afternoon Mysteries": "Sunday Afternoon Mysteries",
  "JAJAJA '09": "JAJAJA", Toonapalooza: "Toonapalooza", "La Súper Explosión de los 70": "La Súper Explosión de los 70",
  "Mysteries Inc": "Misterios S.A.", X2: "X2 (Por dos)", "High Noon Toons": "Caricatoons de la Tarde",
  "Afternoon Adventures": "Aventuras de la Tarde", Animaction: "Animaction", "Cartoon All Stars": "Cartoon All Stars",
  "WB Heroes": "WB Heroes", SuperToons: "SuperToons", "Top Top Toons": "Top Top Toons", "Power Zone": "Power Zone",
  "Cinco Minutos Más": "5 minutos más", "Héroes '10": "Héroes", "Boomerang (2000)": "Boomerang",
  "Gran Miércoles": "Gran Miércoles", "Asqueroso Asqueroso": "Asqueroso Asqueroso",
};

export type WikiSlot = {
  day: string;
  start: string;
  /** Start of the row the cell ends at; null when the cell reaches the end of the table. */
  end: string | null;
  text: string;
  block: string | null;
  /** The wiki marks the slot with a "Nuevo" (premiere) badge. */
  premiere: boolean;
};

export type WikiTable = { feed: string; days: string[]; slots: WikiSlot[] };

export type WikiGrid = { references: string[]; tables: WikiTable[] };

function cleanCell(raw: string) {
  let block: string | null = null;
  let premiere = false;
  let text = raw.replace(/\{\{([^}|]+)(\|[^}]*)?\}\}/g, (_, name: string, arg?: string) => {
    const key = name.trim();
    if (BLOCK_TEMPLATES[key]) {
      block = BLOCK_TEMPLATES[key];
      return "";
    }
    if (/^Nuevo/.test(key)) {
      premiere = true;
      return "";
    }
    if (key === "Bandera" && arg) return ` (${arg.slice(1).trim()})`;
    return "";
  });
  text = text
    .replace(/<hr[^>]*>/gi, " / ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]*)\]\]/g, "$1")
    .replace(/'{2,}/g, "")
    .replace(/\s*-{4,}\s*/g, " → ")
    .replace(/\s+/g, " ")
    .trim();
  return { text, block: block as string | null, premiere };
}

type Cell = { colspan: number; rowspan: number; content: string };

function splitCell(line: string): Cell {
  const body = line.replace(/^[|!]/, "");
  const m = body.match(/^\s*((?:[\w-]+="[^"]*"\s*|"\s*)+)\|(.*)$/);
  if (!m) return { colspan: 1, rowspan: 1, content: body };
  const attr = (name: string) => Number(m[1].match(new RegExp(`${name}="(\\d+)"`))?.[1] ?? 1);
  return { colspan: attr("colspan"), rowspan: attr("rowspan"), content: m[2] };
}

function parseTable(feed: string, body: string): WikiTable | null {
  const rows: Cell[][] = [[]];
  for (const line of body.split("\n")) {
    if (/^\{\||^\|\}|^\|\+/.test(line)) continue;
    if (/^\|-/.test(line)) rows.push([]);
    else if (/^[|!]/.test(line)) rows[rows.length - 1].push(splitCell(line));
    else if (line.trim() && rows[rows.length - 1].length) rows[rows.length - 1].at(-1)!.content += ` ${line}`;
  }
  const nonEmpty = rows.filter((row) => row.length);
  if (nonEmpty.length < 2) return null;
  const [header, ...body_] = nonEmpty;
  const timeColumns = header[0].colspan;
  const days = header.slice(1).flatMap((cell) => Array<string>(cell.colspan).fill(cleanCell(cell.content).text));
  const width = timeColumns + days.length;

  // Lay the cells out on a grid, following rowspan and colspan.
  const grid: { cell: Cell; startRow: number }[][] = [];
  const pending: ({ cell: Cell; startRow: number; left: number } | undefined)[] = [];
  body_.forEach((row, r) => {
    const out: { cell: Cell; startRow: number }[] = [];
    let col = 0;
    const skipPending = () => {
      while (col < width && pending[col] && pending[col]!.left > 0) {
        out[col] = pending[col]!;
        pending[col]!.left--;
        col++;
      }
    };
    for (const cell of row) {
      skipPending();
      for (let k = 0; k < cell.colspan && col < width; k++, col++) {
        out[col] = { cell, startRow: r };
        if (cell.rowspan > 1) pending[col] = { cell, startRow: r, left: cell.rowspan - 1 };
      }
    }
    skipPending();
    grid.push(out);
  });

  const times = grid.map((out) => out.slice(0, timeColumns).map((c) => (c ? normalizeTime(cleanCell(c.cell.content).text) : null)));
  const slots: WikiSlot[] = [];
  grid.forEach((out, r) => {
    days.forEach((day, i) => {
      const placed = out[timeColumns + i];
      if (!placed || placed.startRow !== r) return; // only where the cell starts
      const { text, block, premiere } = cleanCell(placed.cell.content);
      const endRow = r + placed.cell.rowspan;
      for (let t = 0; t < timeColumns; t++) {
        const start = times[r][t];
        if (!start) continue;
        // With several time columns (Boomerang's 8-hour cycle shown three times), a cell reaching
        // the end of the table ends where the next column's cycle starts.
        const wrapped = timeColumns > 1 ? times[0][(t + 1) % timeColumns] : null;
        slots.push({ day, start, end: times[endRow]?.[t] ?? (endRow === grid.length ? wrapped : null), text, block, premiere });
      }
    });
  });
  return { feed, days, slots };
}

/** Parses every schedule table on a grid page, labeled with the heading above it. */
export function parseWikiGrid(wikitext: string): WikiGrid {
  const tables: WikiTable[] = [];
  for (const match of wikitext.matchAll(/\{\|\s*class="wikitable"/g)) {
    const end = wikitext.indexOf("\n|}", match.index);
    const body = wikitext.slice(match.index, end + 3);
    if (!/Horario|Hora\b/i.test(body.split("\n").slice(1, 8).join(" "))) continue;
    const headings = [...wikitext.slice(0, match.index).matchAll(/^={2,4}\s*([^=\n]+?)\s*={2,4}\s*$/gm)];
    const table = parseTable(headings.at(-1)?.[1].replace(/'/g, "").trim() ?? "", body);
    if (table?.slots.length) tables.push(table);
  }
  const references = wikitext.split(/==\s*Referencias\s*==/)[1] ?? "";
  return { references: [...references.matchAll(/https?:\/\/[^\s\]|}]+/g)].map((m) => m[0]), tables };
}
