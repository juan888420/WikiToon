import Link from "next/link";
import { ChannelLogo } from "@/components/channels/channel-logo";
import type { ChannelListItem } from "@/lib/data/channels";
import { pluralize } from "@/lib/format";

export function ChannelCard({ channel }: { channel: ChannelListItem }) {
  return (
    <Link
      href={`/canales/${channel.slug}`}
      className="group flex items-center gap-4 rounded-xl border border-border/60 p-4 transition-colors outline-none hover:border-foreground/20 hover:bg-muted/30 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <ChannelLogo logoPath={channel.logoPath} name={channel.name} sizes="56px" className="size-14" />
      <div className="min-w-0">
        <h2 className="truncate font-medium">{channel.name}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
          {pluralize(channel.seriesCount, "serie", "series")} ·{" "}
          {pluralize(channel.blockCount, "bloque", "bloques")}
        </p>
      </div>
    </Link>
  );
}
