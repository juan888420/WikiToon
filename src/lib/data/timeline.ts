import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

/** A channel's own events plus those of its blocks; shared by the list and the channel nav count. */
export function channelTimelineWhere(channelId: number) {
  return {
    OR: [{ channelId }, { block: { blockChannels: { some: { channelId } } } }],
  } satisfies Prisma.TimelineEventWhereInput;
}

/**
 * Timeline events in chronological order. Partial dates are valid: within a year, events with no
 * month (then no day) come first, since they can't be placed more precisely.
 * With `channelId`, returns the channel's own events plus those of the blocks that ran on it (a
 * block can run on several). Series events are not included: a series can air on many channels.
 */
export function listTimelineEvents({ channelId }: { channelId?: number } = {}) {
  return prisma.timelineEvent.findMany({
    where: channelId === undefined ? undefined : channelTimelineWhere(channelId),
    orderBy: [
      { year: "asc" },
      { month: { sort: "asc", nulls: "first" } },
      { day: { sort: "asc", nulls: "first" } },
      { id: "asc" },
    ],
    select: {
      id: true,
      type: true,
      title: true,
      description: true,
      year: true,
      month: true,
      day: true,
      sourceName: true,
      sourceUrl: true,
      channel: { select: { slug: true, name: true } },
      series: { select: { slug: true, title: true } },
      block: { select: { slug: true, name: true } },
    },
  });
}

export type TimelineEventItem = Awaited<ReturnType<typeof listTimelineEvents>>[number];
