// Downloads the raw sources listed in sources.ts into .cache/research/programming. Raw copies stay
// out of the repo; files already in the cache are not downloaded again (pass --force to refresh).
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { blogSources, cablevisionSources, cablevisionUrl, officialSources, waybackRawUrl, wikiSources } from "./sources";

export const CACHE_DIR = path.join(".cache", "research", "programming");
const HEADERS = { "User-Agent": "Mozilla/5.0 (WikiToon research)" };

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function get(url: string) {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(url, { headers: HEADERS });
    if (response.ok) return response;
    if (attempt === 3) throw new Error(`GET ${url} failed with ${response.status}`);
    await pause(2000 * attempt);
  }
}

async function main() {
  const { values } = parseArgs({ options: { force: { type: "boolean" } }, strict: true });
  const save = async (kind: string, file: string, download: () => Promise<string | Buffer>) => {
    const target = path.join(CACHE_DIR, kind, file);
    if (!values.force && existsSync(target)) return;
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, await download());
    console.log(`saved ${target}`);
    await pause(500);
  };

  for (const source of wikiSources) {
    await save("wiki", `${source.key}.wikitext`, async () => {
      const api = `https://cartoonnetwork.fandom.com/es/api.php?action=parse&page=${encodeURIComponent(source.page)}&prop=wikitext&format=json&formatversion=2`;
      const json = (await (await get(api)).json()) as { parse?: { wikitext: string } };
      if (!json.parse) throw new Error(`Wiki page not found: ${source.page}`);
      return json.parse.wikitext;
    });
  }

  // Blogger has no lookup by URL, so the feed is paged through once and the posts picked from it.
  const missingPosts = blogSources.filter((s) => values.force || !existsSync(path.join(CACHE_DIR, "blog", `${s.key}.json`)));
  if (missingPosts.length) {
    type Entry = { title: { $t: string }; content: { $t: string }; published: { $t: string }; link: { rel: string; href: string }[] };
    const entries: Entry[] = [];
    // Blogger may return fewer entries than asked for, so only an empty page ends the feed.
    for (let start = 1; ; ) {
      const feed = `https://forogrilladecanales.blogspot.com/feeds/posts/default?alt=json&max-results=100&start-index=${start}`;
      const page = ((await (await get(feed)).json()) as { feed: { entry?: Entry[] } }).feed.entry ?? [];
      if (!page.length) break;
      entries.push(...page);
      start += page.length;
    }
    for (const source of missingPosts) {
      const entry = entries.find((e) => e.link.some((l) => l.rel === "alternate" && l.href === source.url));
      if (!entry) throw new Error(`Blog post not found in the feed: ${source.url}`);
      await save("blog", `${source.key}.json`, async () =>
        JSON.stringify({ url: source.url, title: entry.title.$t, published: entry.published.$t, html: entry.content.$t }),
      );
    }
  }

  for (const source of cablevisionSources) {
    await save("cablevision", `${source.key}.html`, async () =>
      Buffer.from(await (await get(waybackRawUrl(source.timestamp, cablevisionUrl(source.page)))).arrayBuffer()),
    );
  }
  for (const source of officialSources) {
    await save("official", `${source.key}.html`, async () =>
      Buffer.from(await (await get(waybackRawUrl(source.timestamp, source.url))).arrayBuffer()),
    );
  }
  console.log("All sources are in the cache.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
