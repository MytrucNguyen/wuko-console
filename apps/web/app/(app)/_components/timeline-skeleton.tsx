import { Skeleton } from "@/components/ui/skeleton";

function EventRowSkeleton() {
  return (
    <div className="flex items-start gap-4 border-b border-wuko-border/50 py-4 last:border-b-0">
      <div className="w-20 shrink-0 space-y-1.5">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="flex flex-1 items-center gap-2">
        <Skeleton className="size-6 shrink-0 rounded-md" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

function SectionSkeleton({ rowCount }: { rowCount: number }) {
  return (
    <section className="mb-4 overflow-hidden rounded-lg border border-wuko-border bg-wuko-card">
      <header className="flex items-baseline gap-3 border-b border-wuko-border px-4 py-2.5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </header>
      <div className="px-4">
        {Array.from({ length: rowCount }).map((_, i) => (
          <EventRowSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export function TimelineSkeleton() {
  return (
    <main className="p-8">
      <header className="mb-6 flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-40" />
        </div>
        <Skeleton className="h-4 w-20" />
      </header>

      <Skeleton className="mb-6 h-14 w-full" />

      <SectionSkeleton rowCount={4} />
      <SectionSkeleton rowCount={3} />
    </main>
  );
}