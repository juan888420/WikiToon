import { cache } from "react";
import { prisma } from "@/lib/prisma";

const nameCollator = new Intl.Collator("es", { sensitivity: "base", numeric: true });

export type ScheduleDay = { airDate: string; slotCount: number };

/**
 * Dates with at least one real Schedule row, per channel. `airDate` is "YYYY-MM-DD" TEXT, so the
 * string order is chronological; no Date conversion happens anywhere in the schedule module.
 */
async function groupScheduleDays(channelId?: number) {
  const groups = await prisma.schedule.groupBy({
    by: ["channelId", "airDate"],
    where: channelId === undefined ? undefined : { channelId },
    _count: { _all: true },
    orderBy: [{ channelId: "asc" }, { airDate: "asc" }],
  });

  const byChannel = new Map<number, ScheduleDay[]>();
  for (const group of groups) {
    const days = byChannel.get(group.channelId) ?? [];
    days.push({ airDate: group.airDate, slotCount: group._count._all });
    byChannel.set(group.channelId, days);
  }
  return byChannel;
}

/** Channels that have schedule data, each with its available dates. */
export async function listScheduleChannels() {
  const daysByChannel = await groupScheduleDays();
  if (daysByChannel.size === 0) return [];

  const channels = await prisma.channel.findMany({
    where: { id: { in: [...daysByChannel.keys()] } },
    select: { id: true, slug: true, name: true, logoPath: true },
  });

  return channels
    .map(({ id, ...channel }) => ({ channel, days: daysByChannel.get(id) ?? [] }))
    .sort((a, b) => nameCollator.compare(a.channel.name, b.channel.name));
}

export async function listChannelScheduleDays(channelId: number) {
  return (await groupScheduleDays(channelId)).get(channelId) ?? [];
}

/** Only (channel, date) pairs with real rows, so no page is generated for empty dates. */
export async function listScheduleDayParams() {
  const [daysByChannel, channels] = await Promise.all([
    groupScheduleDays(),
    prisma.channel.findMany({ select: { id: true, slug: true } }),
  ]);
  return channels.flatMap((channel) =>
    (daysByChannel.get(channel.id) ?? []).map((day) => ({ canal: channel.slug, fecha: day.airDate })),
  );
}

export function scheduleDayHref(channelSlug: string, airDate: string) {
  return `/programacion/${channelSlug}/${airDate}`;
}

/** Cached per request so `generateMetadata` and the page share one query. */
export const getScheduleDay = cache(async (channelSlug: string, airDate: string) => {
  const channel = await prisma.channel.findUnique({
    where: { slug: channelSlug },
    select: { id: true, slug: true, name: true, logoPath: true },
  });
  if (!channel) return null;

  const slots = await prisma.schedule.findMany({
    where: { channelId: channel.id, airDate },
    // "HH:MM" strings sort chronologically within the day.
    orderBy: [{ startTime: "asc" }, { id: "asc" }],
    select: {
      id: true,
      startTime: true,
      endTime: true,
      feed: true,
      listedTitle: true,
      sourceName: true,
      sourceUrl: true,
      series: { select: { slug: true, title: true } },
      block: { select: { slug: true, name: true } },
    },
  });
  if (slots.length === 0) return null;

  return { channel, airDate, slots };
});

export type ScheduleSlot = NonNullable<Awaited<ReturnType<typeof getScheduleDay>>>["slots"][number];
