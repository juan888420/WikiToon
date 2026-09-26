import { parseArgs } from "node:util";
import { loadSeriesCatalog } from "@/lib/import/series-catalog";
import { prisma } from "@/lib/prisma";
import { seriesCatalog } from "../prisma/data/series";

async function main() {
  const { values } = parseArgs({ options: { refresh: { type: "boolean" } }, strict: true });

  const loaded = await loadSeriesCatalog(seriesCatalog, { refresh: values.refresh });
  for (const series of loaded) {
    const retitled = series.retitled ? ", retitled" : "";
    const links = series.linkedChannels.length
      ? `, linked to ${series.linkedChannels.join(", ")}`
      : "";
    console.log(
      `${series.status.padEnd(9)} "${series.title}" (series ${series.seriesId}, TMDB ${series.tmdbId})${retitled}${links}`,
    );
  }

  const count = (status: string) => loaded.filter((series) => series.status === status).length;
  const links = loaded.reduce((total, series) => total + series.linkedChannels.length, 0);
  const retitled = loaded.filter((series) => series.retitled).length;
  console.log(
    `\n${loaded.length} series: ${count("imported")} imported, ${count("refreshed")} refreshed, ` +
      `${count("unchanged")} unchanged; ${retitled} retitled; ${links} channel links created.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
