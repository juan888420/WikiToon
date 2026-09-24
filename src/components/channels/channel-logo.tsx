import Image from "next/image";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

type ChannelLogoProps = {
  /** Local path under `public/` (e.g. "/logos/cartoon-network.svg"); null until assets are chosen. */
  logoPath: string | null;
  name: string;
  sizes: string;
  className?: string;
};

export function ChannelLogo({ logoPath, name, sizes, className }: ChannelLogoProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted",
        className,
      )}
    >
      {logoPath ? (
        <Image src={logoPath} alt={`Logo de ${name}`} fill sizes={sizes} className="object-contain p-2" />
      ) : (
        <span aria-hidden className="font-mono text-sm font-medium text-muted-foreground">
          {initials(name)}
        </span>
      )}
    </div>
  );
}
