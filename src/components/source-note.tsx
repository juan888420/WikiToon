import { ArrowUpRightIcon } from "lucide-react";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/** Provenance line for historical records; renders nothing when no source is documented. */
export function SourceNote({ name, url }: { name: string | null; url: string | null }) {
  if (!name && !url) return null;

  return (
    <p className="text-xs text-muted-foreground">
      Fuente:{" "}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-0.5 underline underline-offset-3 hover:text-foreground"
        >
          {name ?? hostnameOf(url)}
          <ArrowUpRightIcon aria-hidden className="size-3" />
        </a>
      ) : (
        name
      )}
    </p>
  );
}
