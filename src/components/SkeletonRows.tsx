import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonRowsProps {
  rows?: number;
  columns?: number;
}

const SkeletonRows = ({ rows = 5, columns = 5 }: SkeletonRowsProps) => (
  <div className="rounded-xl border border-border overflow-hidden">
    <div className="divide-y divide-border">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-4 py-3">
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton
              key={c}
              className={`h-4 ${c === 0 ? "w-6" : c === 1 ? "flex-1" : "w-20"} rounded`}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonRows;
