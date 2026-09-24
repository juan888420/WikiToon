import { Container } from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-8 sm:py-12" aria-busy="true" aria-label="Cargando serie">
      <Skeleton className="h-4 w-16" />
      <div className="mt-6 grid gap-8 md:grid-cols-[240px_1fr] md:gap-10 lg:grid-cols-[280px_1fr]">
        <Skeleton className="mx-auto aspect-[2/3] w-3/5 max-w-60 rounded-lg md:w-full md:max-w-none" />
        <div className="space-y-3">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-10 w-2/3" />
          <div className="grid grid-cols-2 gap-3 pt-3 sm:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-14 rounded-lg" />
            ))}
          </div>
          <Skeleton className="mt-5 h-4 w-full max-w-prose" />
          <Skeleton className="h-4 w-5/6 max-w-prose" />
        </div>
      </div>
      <Skeleton className="mt-12 h-64 rounded-xl sm:mt-16" />
    </Container>
  );
}
