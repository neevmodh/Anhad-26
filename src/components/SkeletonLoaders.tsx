import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonTrainCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn("bg-card rounded-2xl shadow-card p-5 md:p-6 space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 rounded-full animate-shimmer" />
        <div className="h-5 w-24 rounded-full animate-shimmer" />
      </div>
      {/* Name */}
      <div className="h-6 w-48 rounded-lg animate-shimmer" />
      {/* Timeline */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-16 rounded-lg animate-shimmer" />
        <div className="flex-1 h-px bg-border" />
        <div className="h-6 w-20 rounded-full animate-shimmer" />
        <div className="flex-1 h-px bg-border" />
        <div className="h-8 w-16 rounded-lg animate-shimmer" />
      </div>
      {/* Classes */}
      <div className="flex gap-3">
        <div className="h-5 w-28 rounded-full animate-shimmer" />
        <div className="h-5 w-28 rounded-full animate-shimmer" />
        <div className="h-5 w-28 rounded-full animate-shimmer" />
      </div>
    </div>
  );
}

export function SkeletonSearchResults() {
  return (
    <div className="space-y-4">
      {[0, 1, 2, 3].map(i => (
        <SkeletonTrainCard key={i} className={i > 0 ? 'opacity-' + (90 - i * 20) : ''} />
      ))}
    </div>
  );
}
