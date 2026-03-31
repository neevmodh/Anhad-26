import { motion } from 'framer-motion';
import { Search, MapPin, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function QuickActions() {
  const navigate = useNavigate();
  
  const actions = [
    { label: 'PNR Status', icon: Search, desc: 'Check booking', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Live Train', icon: MapPin, desc: 'Track location', color: 'text-success', bg: 'bg-success/10' },
    { label: 'My Bookings', icon: Ticket, desc: 'View tickets', color: 'text-warning', bg: 'bg-warning/10' },
  ];

  const handleClick = (label: string) => {
    if (label === 'My Bookings') {
      navigate('/bookings');
    } else {
      toast.info(`${label} feature coming soon!`, {
        description: 'We are working hard to bring this feature to RailGo.',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
      {actions.map((a, i) => (
        <motion.button
          key={a.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
          whileHover={{ y: -5, backgroundColor: 'hsl(var(--card) / 0.8)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClick(a.label)}
          className="group flex items-center gap-4 p-5 rounded-[24px] bg-card border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all text-left w-full"
        >
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3", a.bg)}>
            <a.icon className={cn("w-6 h-6", a.color)} />
          </div>
          <div>
            <div className="font-display font-bold text-foreground text-sm uppercase tracking-wider">{a.label}</div>
            <div className="text-xs text-muted-foreground font-medium">{a.desc}</div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
