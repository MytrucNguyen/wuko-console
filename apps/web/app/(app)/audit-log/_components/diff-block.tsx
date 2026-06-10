export function DiffBlock({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  return (
    <div className="mt-2 ml-8 flex items-center gap-2 text-xs">
      <span className="text-wuko-text-muted">change</span>
      <div className="overflow-hidden rounded-md font-mono">
        <div className="bg-wuko-danger-fg/15 px-2 py-0.5 text-wuko-danger-fg">
          - {before}
        </div>
        <div className="bg-wuko-success-fg/15 px-2 py-0.5 text-wuko-success-fg">
          + {after}
        </div>
      </div>
    </div>
  );
}