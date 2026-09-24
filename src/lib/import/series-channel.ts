import { prisma } from "@/lib/prisma";

/**
 * Ensures the series has at least one SeriesChannel row for the channel. A new row gets null
 * years and source; existing rows (any run) are left untouched. Channel appearances are WikiToon's
 * own historical data: callers pass the channel explicitly, it is never derived from TMDB.
 */
export async function linkSeriesToChannel(seriesId: number, channelId: number) {
  const existing = await prisma.seriesChannel.findFirst({
    where: { seriesId, channelId },
    orderBy: { id: "asc" },
  });
  if (existing) return { link: existing, created: false };

  const link = await prisma.seriesChannel.create({ data: { seriesId, channelId } });
  return { link, created: true };
}
