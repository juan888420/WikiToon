import { findTmdbSeriesByExactTitle, importTmdbSeries } from "@/lib/import/tmdb-series";
import { prisma } from "@/lib/prisma";

const CHANNEL_SLUG = "cartoon-network";

async function main() {
  const channel = await prisma.channel.findUnique({ where: { slug: CHANNEL_SLUG } });
  if (!channel) throw new Error(`Channel "${CHANNEL_SLUG}" not found. Run \`npm run db:seed\` first.`);

  // The original 2005 series. Later shows reuse the "Ben 10" title (e.g. the 2016 reboot).
  const match = await findTmdbSeriesByExactTitle("Ben 10", 2005);
  console.log(`Selected TMDB ${match.id}: "${match.name}" / "${match.original_name}" (${match.first_air_date})`);

  const { series, seasonCount, episodeCount } = await importTmdbSeries(match.id);
  console.log(`Imported "${series.title}" (series ${series.id}): ${seasonCount} seasons, ${episodeCount} episodes.`);

  // Channel appearances are WikiToon's own historical data, never derived from TMDB.
  // Years and source stay null until there is a verified source.
  const existingLink = await prisma.seriesChannel.findFirst({
    where: { seriesId: series.id, channelId: channel.id },
  });
  if (existingLink) {
    console.log(`SeriesChannel for ${channel.name} already exists (id ${existingLink.id}).`);
  } else {
    const link = await prisma.seriesChannel.create({
      data: { seriesId: series.id, channelId: channel.id },
    });
    console.log(`Linked to ${channel.name} (SeriesChannel ${link.id}).`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
