import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

/**
 * Ensures the series has at least one SeriesChannel row for the channel. A new row gets null
 * years and source; existing rows (any run) are left untouched. Channel appearances are WikiToon's
 * own historical data: callers pass the channel explicitly, it is never derived from TMDB.
 * Pass a transaction client as `db` to make the link part of a larger transaction.
 */
export async function linkSeriesToChannel(
  seriesId: number,
  channelId: number,
  db: Prisma.TransactionClient = prisma,
) {
  const existing = await db.seriesChannel.findFirst({
    where: { seriesId, channelId },
    orderBy: { id: "asc" },
  });
  if (existing) return { link: existing, created: false };

  const link = await db.seriesChannel.create({ data: { seriesId, channelId } });
  return { link, created: true };
}
