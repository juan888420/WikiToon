import Image from "next/image";
import { cn } from "@/lib/utils";

// First letter or digit of the first two words, skipping punctuation such as "¿".
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.match(/[\p{L}\p{N}]/u)?.[0]?.toUpperCase() ?? "")
    .join("");
}

type LogoTileProps = {
  /** Local path under `public/` (e.g. "/logos/cartoon-network.svg"); null until an asset is chosen. */
  logoPath: string | null;
  name: string;
  sizes: string;
  className?: string;
  /** Overrides the logo's inset, for tiles larger than the default square. */
  imageClassName?: string;
};

/** Square logo tile for channels and blocks, with the name's initials as fallback. */
export function LogoTile({ logoPath, name, sizes, className, imageClassName }: LogoTileProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted",
        className,
      )}
    >
      {logoPath ? (
        <Image
          src={logoPath}
          alt={`Logo de ${name}`}
          fill
          sizes={sizes}
          className={cn("object-contain p-2", imageClassName)}
        />
      ) : (
        <span aria-hidden className="font-mono text-sm font-medium text-muted-foreground">
          {initials(name)}
        </span>
      )}
    </div>
  );
}
