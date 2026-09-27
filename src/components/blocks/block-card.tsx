import Link from "next/link";
import { TimeRanges } from "@/components/blocks/time-ranges";
import { LogoTile } from "@/components/logo-tile";
import { blockHref, type BlockSummary } from "@/lib/data/blocks";
import { formatWeekdays } from "@/lib/format";

// The card shows the block's main schedule; the rest (and the description) live on its page.
const CARD_LINES = 2;

export function BlockCard({ block }: { block: BlockSummary }) {
  const lines = block.schedule.slice(0, CARD_LINES);
  const hidden = block.schedule.length - lines.length;
  // A block shared by Fox Kids and Jetix aired at different times on each, so name the channel.
  const showChannel = block.channels.length > 1;

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
        {lines.length === 0 ? (
          <p className="mt-1 text-sm text-muted-foreground">Horario no documentado</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {lines.map((line) => (
              <li key={`${line.channel?.slug} ${line.weekdays} ${line.period} ${line.sourceUrl}`} className="text-sm">
                <p>{formatWeekdays(line.weekdays)}</p>
                <p className="text-muted-foreground tabular-nums">
                  <TimeRanges times={line.times} />
                  {showChannel && line.channel && ` · ${line.channel.name}`}
                </p>
              </li>
            ))}
          </ul>
        )}
        {hidden > 0 && (
          <p className="mt-auto pt-3 text-xs text-muted-foreground">
            {hidden === 1 ? "1 horario más" : `${hidden} horarios más`}
          </p>
        )}
      </div>
    </Link>
  );
}
