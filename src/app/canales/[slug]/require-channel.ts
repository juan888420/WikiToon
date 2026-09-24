import { notFound } from "next/navigation";
import { getChannelBySlug } from "@/lib/data/channels";

/** Shared by the channel layout and its section pages; the lookup is cached per request. */
export async function requireChannel(params: Promise<{ slug: string }>) {
  const channel = await getChannelBySlug((await params).slug);
  if (!channel) notFound();
  return channel;
}
