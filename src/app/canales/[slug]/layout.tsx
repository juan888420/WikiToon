import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { ChannelSectionNav } from "@/components/channels/channel-section-nav";
import { Container } from "@/components/container";
import { listChannelSlugs } from "@/lib/data/channels";
import { requireChannel } from "./require-channel";

// Channels only change through the seed, so every known slug is prerendered and unknown ones 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return listChannelSlugs();
}

export default async function ChannelLayout({ children, params }: LayoutProps<"/canales/[slug]">) {
  const channel = await requireChannel(params);
  const base = `/canales/${channel.slug}`;
  const sections = [
    // Blocks are filters in the Series section, by name, rather than a section of their own.
    { href: base, label: "Series", count: channel.counts.series },
    { href: `${base}/programacion`, label: "Programación", count: channel.counts.schedules },
    { href: `${base}/timeline`, label: "Timeline", count: channel.counts.timelineEvents },
  ];

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/canales"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon aria-hidden className="size-4" />
        Canales
      </Link>

      <header className="mt-6 flex items-center gap-4 sm:gap-5">
        <ChannelLogo
          logoPath={channel.logoPath}
          name={channel.name}
          sizes="80px"
          className="size-16 sm:size-20"
        />
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wider text-primary uppercase">Canal</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {channel.name}
          </h1>
        </div>
      </header>

      <div className="mt-8">
        <ChannelSectionNav sections={sections} />
      </div>
      <div className="mt-8">{children}</div>
    </Container>
  );
}
