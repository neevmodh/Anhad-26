import { motion } from 'framer-motion';
import { Clock, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Train } from '@/types/booking';
import { cn } from '@/lib/utils';
import { ConfirmationGauge, PricePrediction } from '@/components/SmartIndicators';

function StatusBadge({ status, count }: { status: string; count: number }) {
  const styles: Record<string, string> = {
    available: 'bg-green-500/10 text-green-600 dark:text-green-400',
    rac: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    waitlist: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    limited: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    none: 'bg-muted text-muted-foreground',
  };
  const labels: Record<string, string> = { available: 'Available', rac: 'RAC', waitlist: 'WL', limited: 'Limited', none: 'N/A' };
  return (
    <span className={cn('text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg', styles[status])}>
      {labels[status]} {count > 0 ? count : ''}
    </span>
  );
}

interface TrainCardProps {
  train: Train;
  onSelect: (train: Train) => void;
  index: number;
}

export default function TrainCard({ train, onSelect, index }: TrainCardProps) {
  const lowestPrice = Math.min(...train.classes.map(c => c.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "group relative bg-card border border-border/50 rounded-[32px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30 cursor-pointer",
        train.isBestOption && "border-primary/20 shadow-lg shadow-primary/5"
      )}
      onClick={() => onSelect(train)}
    >
      {train.isBestOption && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
      )}

      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-xl font-black text-foreground group-hover:text-primary transition-colors">{train.name}</h3>
              <span className="text-xs font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-lg">{train.number}</span>
            </div>
            <div className="flex gap-1.5">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                <span key={d} className={cn(
                  "text-[10px] font-bold uppercase tracking-tighter",
                  train.daysOfWeek.includes(d) ? "text-primary" : "text-muted-foreground/20"
                )}>{d.charAt(0)}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="font-display text-2xl font-black text-foreground">{train.departure}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{train.from.city}</div>
            </div>
            
            <div className="flex flex-col items-center gap-1 min-w-[100px]">
              <div className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-tighter flex items-center gap-1">
                <Clock className="w-3 h-3" /> {train.duration}
              </div>
              <div className="w-full h-px bg-border relative">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-border" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
            </div>

            <div>
              <div className="font-display text-2xl font-black text-foreground">{train.arrival}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{train.to.city}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {train.classes.map(c => (
            <div 
              key={c.code}
              className="flex flex-col gap-2 p-4 rounded-2xl bg-secondary/30 border border-transparent hover:border-primary/20 hover:bg-secondary/50 transition-all group/class"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-foreground">{c.code}</span>
                <span className="text-sm font-bold text-primary">₹{c.price}</span>
              </div>
              <StatusBadge status={c.status} count={c.available} />
            </div>
          ))}
          
          <div className="hidden sm:flex flex-col items-center justify-center p-4 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-[1.02] transition-transform">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5">Starting at</span>
            <span className="text-xl font-black tracking-tight">₹{lowestPrice}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
