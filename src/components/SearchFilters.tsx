import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SearchFiltersProps {
  sortBy: string;
  onSortChange: (v: string) => void;
  classFilter: string;
  onClassChange: (v: string) => void;
}

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'fastest', label: 'Fastest' },
  { value: 'earliest', label: 'Earliest' },
];

const classOptions = [
  { value: 'all', label: 'All' },
  { value: '1A', label: '1A' },
  { value: '2A', label: '2A' },
  { value: '3A', label: '3A' },
  { value: 'SL', label: 'SL' },
];

export default function SearchFilters({ sortBy, onSortChange, classFilter, onClassChange }: SearchFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex gap-1 glass border border-border/30 rounded-xl p-1">
        {sortOptions.map(o => (
          <motion.button
            key={o.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSortChange(o.value)}
            className={cn(
              "relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              sortBy === o.value ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {sortBy === o.value && (
              <motion.div
                layoutId="sort-bg"
                className="absolute inset-0 bg-primary rounded-lg"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{o.label}</span>
          </motion.button>
        ))}
      </div>
      <div className="flex gap-1 glass border border-border/30 rounded-xl p-1">
        {classOptions.map(o => (
          <motion.button
            key={o.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClassChange(o.value)}
            className={cn(
              "relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              classFilter === o.value ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {classFilter === o.value && (
              <motion.div
                layoutId="class-bg"
                className="absolute inset-0 bg-primary rounded-lg"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{o.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
