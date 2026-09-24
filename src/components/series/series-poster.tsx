import { TvIcon } from "lucide-react";
import Image from "next/image";
import { tmdbImageUrl } from "@/lib/tmdb";
import { cn } from "@/lib/utils";

type SeriesPosterProps = {
  posterPath: string | null;
  title: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function SeriesPoster({ posterPath, title, sizes, priority, className }: SeriesPosterProps) {
  const src = tmdbImageUrl(posterPath, "w500");

  return (
    <div
      className={cn(
        "relative aspect-[2/3] overflow-hidden rounded-lg border border-border/60 bg-muted",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`Póster de ${title}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <TvIcon aria-hidden className="size-8" strokeWidth={1.5} />
          <span className="sr-only">Sin póster</span>
        </div>
      )}
    </div>
  );
}
