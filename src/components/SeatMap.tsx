import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Seat } from '@/types/booking';
import { generateSeats } from '@/data/trains';
import { ArrowRight } from 'lucide-react';

interface SeatMapProps {
  onSelect: (seats: Seat[]) => void;
  maxSeats: number;
  selectedSeats: Seat[];
}

export default function SeatMap({ onSelect, maxSeats, selectedSeats }: SeatMapProps) {
  const [activeCoach, setActiveCoach] = useState('B1');
  const coaches = ['A1', 'B1', 'B2', 'B3'];

  const seats = useMemo(() => generateSeats(activeCoach), [activeCoach]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'booked') return;
    const exists = selectedSeats.find(s => s.id === seat.id);
    if (exists) {
      onSelect(selectedSeats.filter(s => s.id !== seat.id));
    } else if (selectedSeats.length < maxSeats) {
      onSelect([...selectedSeats, seat]);
    }
  };

  const getSeatStyles = (seat: Seat) => {
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    if (isSelected) return 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105';
    if (seat.status === 'booked') return 'bg-secondary/50 text-muted-foreground/30 border-transparent cursor-not-allowed';
    if (seat.status === 'limited') return 'bg-amber-500/10 text-amber-600 border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/20 hover:scale-105';
    return 'bg-green-500/10 text-green-600 border-green-500/20 hover:border-green-500/40 hover:bg-green-500/20 hover:scale-105';
  };

  return (
    <div className="space-y-8">
      {/* Coach selection */}
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Select Coach</label>
        <div className="flex p-1.5 bg-secondary/50 rounded-2xl w-fit">
          {coaches.map(c => (
            <button
              key={c}
              onClick={() => setActiveCoach(c)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-black transition-all",
                c === activeCoach ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Coach visualization */}
      <div className="relative p-6 md:p-8 bg-secondary/20 rounded-[32px] border border-border/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-border/50 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
           Entrance <ArrowRight className="w-3 h-3" />
        </div>

        <motion.div
          key={activeCoach}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-6 sm:grid-cols-10 gap-3"
        >
          {seats.map((seat, i) => (
            <button
              key={seat.id}
              onClick={() => toggleSeat(seat)}
              disabled={seat.status === 'booked'}
              className={cn(
                "aspect-square rounded-xl border flex flex-col items-center justify-center transition-all duration-300",
                getSeatStyles(seat)
              )}
            >
              <span className="text-xs font-black">{seat.number}</span>
              <span className="text-[8px] font-bold uppercase tracking-tighter opacity-60">{seat.type}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Legend & Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Available', color: 'bg-green-500/20 border-green-500/30' },
            { label: 'Booked', color: 'bg-secondary/50 border-transparent' },
            { label: 'Selected', color: 'bg-primary' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className={cn("w-4 h-4 rounded-lg border", l.color)} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>

        {selectedSeats.length > 0 && (
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-black border border-primary/20">
            {selectedSeats.length} of {maxSeats} seats selected: {selectedSeats.map(s => s.number).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
