import { parseArgs } from "node:util";
import { loadSeriesCatalog } from "@/lib/import/series-catalog";
import { prisma } from "@/lib/prisma";
import { seriesCatalog } from "../prisma/data/series";

async function main() {
  const { values } = parseArgs({ options: { refresh: { type: "boolean" } }, strict: true });

  const loaded = await loadSeriesCatalog(seriesCatalog, { refresh: values.refresh });
  for (const series of loaded) {
    const links = series.linkedChannels.length
      ? `, linked to ${series.linkedChannels.join(", ")}`
      : "";
    console.log(
      `${series.status.padEnd(9)} "${series.title}" (series ${series.seriesId}, TMDB ${series.tmdbId})${links}`,
    );
  }

  const count = (status: string) => loaded.filter((series) => series.status === status).length;
  const links = loaded.reduce((total, series) => total + series.linkedChannels.length, 0);
  console.log(
    `\n${loaded.length} series: ${count("imported")} imported, ${count("refreshed")} refreshed, ` +
      `${count("unchanged")} unchanged; ${links} channel links created.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
