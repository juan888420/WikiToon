// Normalizes the cached raw sources into docs/research/data/programming/<kind>/<key>.json: the
// facts each source states (times, titles, block labels) plus where it came from. These files are
// committed so the dataset can be audited and rebuilt without downloading anything again.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseBlogPost } from "./lib/blog-post";
import { parseCablevision } from "./lib/cablevision";
import { parseOfficialDaily, parseOfficialWeeklyGrids } from "./lib/official";
import { parseWikiGrid } from "./lib/wiki-grid";
import {
  blogSources,
  cablevisionSources,
  cablevisionUrl,
  officialSources,
  waybackUrl,
  wikiSources,
  wikiUrl,
} from "./sources";

export const EXTRACTED_DIR = path.join("docs", "research", "data", "programming");
const CACHE_DIR = path.join(".cache", "research", "programming");

const read = (kind: string, file: string, encoding: BufferEncoding = "utf8") => readFileSync(path.join(CACHE_DIR, kind, file), encoding);
const write = (kind: string, key: string, data: unknown) => {
  mkdirSync(path.join(EXTRACTED_DIR, kind), { recursive: true });
  writeFileSync(path.join(EXTRACTED_DIR, kind, `${key}.json`), `${JSON.stringify(data, null, 1)}\n`);
};

function main() {
  for (const source of wikiSources) {
    const grid = parseWikiGrid(read("wiki", `${source.key}.wikitext`));
    write("wiki", source.key, {
      source: { name: `Cartoon Network Wiki (Fandom): ${source.page}`, url: wikiUrl(source.page) },
      ...grid,
    });
  }
  for (const source of blogSources) {
    const raw = JSON.parse(read("blog", `${source.key}.json`)) as { title: string; published: string; html: string };
    write("blog", source.key, {
      source: { name: `Foro Grilla de Canales: ${raw.title}`, url: source.url, published: raw.published.slice(0, 10) },
      ...parseBlogPost(raw.title, raw.html),
    });
  }
  for (const source of cablevisionSources) {
    // The pages are Latin-1.
    const day = parseCablevision(read("cablevision", `${source.key}.html`, "latin1"));
    if (!source.key.endsWith(day.date)) throw new Error(`${source.key}: the page is for ${day.date}.`);
    write("cablevision", source.key, {
      source: {
        name: `Cablevisión Monterrey, guía de ${day.channelName}`,
        url: waybackUrl(source.timestamp, cablevisionUrl(source.page)),
      },
      channelSlug: source.channelSlug,
      ...day,
    });
  }
  for (const source of officialSources) {
    const html = read("official", `${source.key}.html`, "latin1");
    const data = source.kind === "weekly" ? { grids: parseOfficialWeeklyGrids(html) } : parseOfficialDaily(html);
    write("official", source.key, { source: { name: "Sitio oficial del canal (Wayback Machine)", url: waybackUrl(source.timestamp, source.url) }, ...data });
  }
  console.log(`Extracted into ${EXTRACTED_DIR}.`);
}

main();
