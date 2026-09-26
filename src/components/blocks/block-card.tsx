import Link from "next/link";
import { LogoTile } from "@/components/logo-tile";
import { blockHref, type BlockSummary } from "@/lib/data/blocks";
import { formatYearRange, pluralize } from "@/lib/format";

export function BlockCard({ block }: { block: BlockSummary }) {
  const years = formatYearRange(block.startYear, block.endYear);

  return (
    <Link
      href={blockHref(block)}
      className="flex h-full flex-col rounded-xl border border-border/60 p-3 transition-colors outline-none hover:border-foreground/20 hover:bg-muted/30 focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-4"
    >
      <LogoTile
        logoPath={block.logoPath}
        name={block.name}
        sizes="(min-width: 1024px) 240px, (min-width: 768px) 30vw, 45vw"
        className="aspect-[4/3] w-full"
        imageClassName="p-4 sm:p-6"
      />
      <div className="mt-3 flex min-w-0 flex-1 flex-col">
        <h3 className="leading-snug font-medium">{block.name}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {block.channels.map((channel) => channel.name).join(" · ")}
        </p>
        {block.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {block.description}
          </p>
        )}
        <p className="mt-auto flex flex-wrap gap-x-2 pt-3 text-xs text-muted-foreground tabular-nums">
          <span>{pluralize(block.seriesCount, "serie", "series")}</span>
          {years && <span>{years}</span>}
        </p>
      </div>
    </Link>
  );
}
