import Link from "next/link";
import { blockHref, type BlockSummary } from "@/lib/data/blocks";
import { formatYearRange, pluralize } from "@/lib/format";

type BlockCardProps = {
  block: BlockSummary;
  /** Hidden inside a channel page, where the channel is already the context. */
  showChannel?: boolean;
};

export function BlockCard({ block, showChannel = true }: BlockCardProps) {
  const years = formatYearRange(block.startYear, block.endYear);

  return (
    <Link
      href={blockHref(block)}
      className="block rounded-xl border border-border/60 p-4 transition-colors outline-none hover:border-foreground/20 hover:bg-muted/30 focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-medium">{block.name}</h3>
        {years && <span className="text-xs text-muted-foreground tabular-nums">{years}</span>}
      </div>
      {showChannel && <p className="mt-0.5 text-sm text-muted-foreground">{block.channel.name}</p>}
      {block.description && (
        <p className="mt-2 line-clamp-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {block.description}
        </p>
      )}
      <p className="mt-3 text-xs text-muted-foreground tabular-nums">
        {pluralize(block.seriesCount, "serie", "series")} en su programación
      </p>
    </Link>
  );
}
