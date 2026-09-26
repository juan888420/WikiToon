"use client";

import { ArrowRightIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, type ReactNode } from "react";
import { EmptyState } from "@/components/empty-state";
import { SeriesCard } from "@/components/series/series-card";
import type { SeriesListItem } from "@/lib/data/series";
import { pluralize } from "@/lib/format";
import { cn } from "@/lib/utils";

export type BrowsableSeries = {
  series: SeriesListItem;
  /** Passed to `SeriesCard`; undefined shows the TMDB original-run years. */
  caption?: string | null;
  channelSlugs: string[];
  blockSlugs: string[];
};

export type ChannelOption = { slug: string; name: string };

export type BlockOption = {
  slug: string;
  name: string;
  description: string | null;
  /** Built on the server with `blockHref`. */
  href: string;
  channelSlugs: string[];
};

type SeriesBrowserProps = {
  items: BrowsableSeries[];
  /** Omit to hide the channel filter, e.g. inside a channel page. */
  channels?: ChannelOption[];
  blocks: BlockOption[];
};

type Filters = { query: string; channel: string | null; block: string | null };

const NO_FILTERS: Filters = { query: "", channel: null, block: null };

// Case- and accent-insensitive, so "pajaro" finds "Pájaro".
function normalize(text: string) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

/**
 * Filterable series grid. Filters live in the URL (`q`, `canal`, `bloque`) so they survive going
 * back from a series page. Reading them opts this subtree out of prerendering, so the static HTML
 * is the same view without filters, which also keeps the layout from shifting on hydration.
 */
export function SeriesBrowser(props: SeriesBrowserProps) {
  return (
    <Suspense fallback={<BrowserView {...props} initial={NO_FILTERS} />}>
      <BrowserFromUrl {...props} />
    </Suspense>
  );
}

function BrowserFromUrl(props: SeriesBrowserProps) {
  const params = useSearchParams();
  const initial = {
    query: params.get("q") ?? "",
    channel: params.get("canal"),
    block: params.get("bloque"),
  };
  return <BrowserView {...props} initial={initial} />;
}

function BrowserView({ items, channels, blocks, initial }: SeriesBrowserProps & { initial: Filters }) {
  const [filters, setFilters] = useState(() => sanitize(initial, channels, blocks));
  const { query, channel, block } = filters;

  function update(next: Filters) {
    setFilters(next);
    const params = new URLSearchParams(window.location.search);
    const entries = { q: next.query, canal: next.channel, bloque: next.block };
    for (const [key, value] of Object.entries(entries)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const search = params.toString();
    // Native History API: Next keeps `useSearchParams` in sync without a server round trip.
    window.history.replaceState(null, "", search ? `?${search}` : window.location.pathname);
  }

  const titles = useMemo(() => items.map((item) => normalize(item.series.title)), [items]);

  const inChannel = channel ? items.filter((item) => item.channelSlugs.includes(channel)) : items;
  const visibleBlocks = blocks
    .map((option) => ({
      ...option,
      count: inChannel.filter((item) => item.blockSlugs.includes(option.slug)).length,
    }))
    .filter((option) => option.count > 0 && (!channel || option.channelSlugs.includes(channel)));

  const needle = normalize(query);
  const results = items.filter(
    (item, index) =>
      (!channel || item.channelSlugs.includes(channel)) &&
      (!block || item.blockSlugs.includes(block)) &&
      (!needle || titles[index].includes(needle)),
  );
  const selectedBlock = block ? blocks.find((option) => option.slug === block) : undefined;
  const filtered = Boolean(query || channel || block);

  return (
    <>
      <div className="space-y-4">
        <div className="relative max-w-md">
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => update({ ...filters, query: event.target.value })}
            placeholder="Buscar por título"
            aria-label="Buscar series por título"
            className="h-10 w-full rounded-lg border border-border/60 bg-transparent pr-3 pl-9 text-sm transition-colors outline-none placeholder:text-muted-foreground hover:border-foreground/20 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>

        {channels && (
          <FilterRow label="Canal">
            <FilterChip
              active={!channel}
              onClick={() => update({ ...filters, channel: null, block: null })}
            >
              Todos
            </FilterChip>
            {channels.map((option) => (
              <FilterChip
                key={option.slug}
                active={channel === option.slug}
                onClick={() => {
                  const keepsBlock = blocks.some(
                    (b) => b.slug === block && b.channelSlugs.includes(option.slug),
                  );
                  update({ ...filters, channel: option.slug, block: keepsBlock ? block : null });
                }}
              >
                {option.name}
              </FilterChip>
            ))}
          </FilterRow>
        )}

        {visibleBlocks.length > 0 && (
          <FilterRow label="Bloque">
            <FilterChip active={!block} onClick={() => update({ ...filters, block: null })}>
              Todos
            </FilterChip>
            {visibleBlocks.map((option) => (
              <FilterChip
                key={option.slug}
                active={block === option.slug}
                onClick={() => update({ ...filters, block: option.slug })}
              >
                {option.name}
                <span className="text-xs text-muted-foreground tabular-nums">{option.count}</span>
              </FilterChip>
            ))}
          </FilterRow>
        )}
      </div>

      {selectedBlock && (
        <div className="mt-6 flex flex-col gap-2 rounded-xl border border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="text-sm font-medium">{selectedBlock.name}</p>
            {selectedBlock.description && (
              <p className="mt-0.5 text-sm text-muted-foreground">{selectedBlock.description}</p>
            )}
          </div>
          <Link
            href={selectedBlock.href}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary/80"
          >
            Ver bloque
            <ArrowRightIcon aria-hidden className="size-4" />
          </Link>
        </div>
      )}

      <div className="mt-6 mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {pluralize(results.length, "serie", "series")}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={() => update(NO_FILTERS)}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="Ninguna serie coincide con los filtros."
          description="Prueba con otro título o quita algún filtro."
        />
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((item) => (
            <li key={item.series.slug}>
              <SeriesCard series={item.series} caption={item.caption} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Drops URL values that don't match any option (stale or hand-edited links). */
function sanitize(filters: Filters, channels: ChannelOption[] | undefined, blocks: BlockOption[]) {
  const channel = channels?.some((option) => option.slug === filters.channel)
    ? filters.channel
    : null;
  const block = blocks.some(
    (option) =>
      option.slug === filters.block && (!channel || option.channelSlugs.includes(channel)),
  )
    ? filters.block
    : null;
  return { query: filters.query, channel, block };
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3"
    >
      <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase sm:w-16 sm:shrink-0 sm:pt-2">
        {label}
      </span>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {children}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-sm whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        active
          ? "border-primary/50 bg-primary/10 text-foreground"
          : "border-border/60 text-muted-foreground hover:border-foreground/20 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
