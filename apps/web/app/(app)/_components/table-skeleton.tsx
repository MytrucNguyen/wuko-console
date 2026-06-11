import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({
  columnCount = 6,
  rowCount = 8,
}: {
  columnCount?: number;
  rowCount?: number;
}) {
  return (
    <main className="p-8">
      <header className="mb-6 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </header>

      <div className="mb-4 flex items-center justify-between gap-2">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="overflow-hidden rounded-lg border border-wuko-border">
        <div className="flex items-center gap-4 border-b border-wuko-border bg-wuko-card/40 px-4 py-3">
          {Array.from({ length: columnCount }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>

        {Array.from({ length: rowCount }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="flex items-center gap-4 border-b border-wuko-border/50 px-4 py-3 last:border-b-0"
          >
            {Array.from({ length: columnCount }).map((_, colIdx) => (
              <Skeleton key={colIdx} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </main>
  );
}