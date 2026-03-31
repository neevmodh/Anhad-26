import { motion } from 'framer-motion';
import { Zap, TrendingDown, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricePredictionProps {
  trend: 'rising' | 'falling' | 'stable';
  className?: string;
}

export function PricePrediction({ trend, className }: PricePredictionProps) {
  const config = {
    rising: { icon: AlertTriangle, text: 'Price likely to increase', color: 'text-warning bg-warning/10' },
    falling: { icon: TrendingDown, text: 'Price may drop soon', color: 'text-success bg-success/10' },
    stable: { icon: Zap, text: 'Best price right now', color: 'text-primary bg-primary/10' },
  };
  const c = config[trend];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full", c.color, className)}
    >
      <c.icon className="w-3 h-3" />
      {c.text}
    </motion.div>
  );
}

interface ConfirmationGaugeProps {
  probability: number;
  size?: 'sm' | 'md';
}

export function ConfirmationGauge({ probability, size = 'sm' }: ConfirmationGaugeProps) {
  const radius = size === 'sm' ? 16 : 24;
  const stroke = size === 'sm' ? 3 : 4;
  const circumference = 2 * Math.PI * radius;
  const progress = (probability / 100) * circumference;
  const color = probability >= 80 ? 'hsl(142, 71%, 45%)' : probability >= 50 ? 'hsl(32, 95%, 52%)' : 'hsl(0, 84%, 60%)';
  const dim = (radius + stroke) * 2;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={dim} height={dim} className="-rotate-90">
        <circle cx={radius + stroke} cy={radius + stroke} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} />
        <motion.circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </svg>
      <span className={cn("absolute font-display font-bold", size === 'sm' ? 'text-[10px]' : 'text-xs')}>
        {probability}%
      </span>
    </div>
  );
}
