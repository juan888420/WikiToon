import { parseArgs } from "node:util";
import { linkSeriesToChannel } from "@/lib/import/series-channel";
import { findTmdbSeriesByExactTitle, importTmdbSeries } from "@/lib/import/tmdb-series";
import { prisma } from "@/lib/prisma";

const USAGE = `Usage:
  npm run db:import:series -- --tmdb-id <id> [--channel <slug>]
  npm run db:import:series -- --title "<title>" --year <first air year> [--channel <slug>]`;

class UsageError extends Error {}

type Target = { tmdbId: number } | { title: string; firstAirYear: number };

function parsePositiveInt(value: string, flag: string) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new UsageError(`${flag} must be a positive integer, got "${value}".`);
  }
  return number;
}

function parseCliArgs(): { target: Target; channelSlug: string | undefined } {
  let values;
  try {
    ({ values } = parseArgs({
      options: {
        "tmdb-id": { type: "string" },
        title: { type: "string" },
        year: { type: "string" },
        channel: { type: "string" },
      },
      strict: true,
    }));
  } catch (error) {
    throw new UsageError((error as Error).message);
  }

  const { "tmdb-id": tmdbId, title, year, channel } = values;
  if (channel !== undefined && !channel.trim()) throw new UsageError("--channel cannot be empty.");

  if (tmdbId !== undefined) {
    if (title !== undefined || year !== undefined) {
      throw new UsageError("Pass either --tmdb-id or --title with --year, not both.");
    }
    return { target: { tmdbId: parsePositiveInt(tmdbId, "--tmdb-id") }, channelSlug: channel };
  }

  if (!title?.trim() || year === undefined) {
    throw new UsageError("Pass --tmdb-id, or both --title and --year.");
  }
  return {
    target: { title, firstAirYear: parsePositiveInt(year, "--year") },
    channelSlug: channel,
  };
}

async function main() {
  const { target, channelSlug } = parseCliArgs();

  // Resolve the channel before calling TMDB so a wrong slug fails without writing anything.
  const channel = channelSlug
    ? await prisma.channel.findUnique({ where: { slug: channelSlug } })
    : null;
  if (channelSlug && !channel) {
    throw new Error(`Channel "${channelSlug}" not found. Run \`npm run db:seed\` first.`);
  }

  let tmdbId: number;
  if ("tmdbId" in target) {
    tmdbId = target.tmdbId;
  } else {
    const match = await findTmdbSeriesByExactTitle(target.title, target.firstAirYear);
    console.log(
      `Selected TMDB ${match.id}: "${match.name}" / "${match.original_name}" (${match.first_air_date})`,
    );
    tmdbId = match.id;
  }

  const { series, seasonCount, episodeCount } = await importTmdbSeries(tmdbId);
  console.log(
    `Imported "${series.title}" (series ${series.id}, TMDB ${tmdbId}): ${seasonCount} seasons, ${episodeCount} episodes.`,
  );

  if (!channel) return;
  const { link, created } = await linkSeriesToChannel(series.id, channel.id);
  console.log(
    created
      ? `Linked to ${channel.name} (SeriesChannel ${link.id}).`
      : `SeriesChannel for ${channel.name} already exists (id ${link.id}).`,
  );
}

main()
  .catch((error) => {
    if (error instanceof UsageError) {
      console.error(`${error.message}\n\n${USAGE}`);
    } else {
      console.error(error);
    }
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
