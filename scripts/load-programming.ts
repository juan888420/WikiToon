import { loadProgramming } from "@/lib/import/programming";
import { prisma } from "@/lib/prisma";
import { programmingData } from "../prisma/data/programming";

async function main() {
  const loaded = await loadProgramming(programmingData);
  console.log(`${loaded.feeds} feeds upserted.`);
  for (const grid of loaded.grids) {
    console.log(`${grid.created ? "Created" : "Updated"} grid ${grid.slug}: ${grid.slots} slots (${grid.replacedSlots} replaced).`);
  }
  for (const day of loaded.days) {
    console.log(`Day ${day.channelSlug} ${day.airDate}: ${day.rows} rows (${day.replacedRows} replaced).`);
  }
  const { unresolvedTitles, unmappedBlocks, missingSeriesChannels, conflicts } = loaded.analysis;
  console.log(
    `\nFor review (npm run db:report:programming): ${unresolvedTitles.size} unresolved titles, ` +
      `${unmappedBlocks.size} block labels not in the catalog, ${missingSeriesChannels.size} series ` +
      `scheduled on a channel they aren't linked to, ${conflicts.length / 2} source conflicts.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
