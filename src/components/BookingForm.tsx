import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Calendar, Search, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useBooking } from '@/contexts/BookingContext';
import { stations } from '@/data/stations';
import { Station } from '@/types/booking';

const classes = [
  { code: 'all', name: 'All Classes' },
  { code: '1A', name: 'First AC' },
  { code: '2A', name: 'Second AC' },
  { code: '3A', name: 'Third AC' },
  { code: 'SL', name: 'Sleeper' },
];

const quotas = [
  { code: 'general', name: 'General' },
  { code: 'tatkal', name: 'Tatkal' },
  { code: 'ladies', name: 'Ladies' },
  { code: 'senior-citizen', name: 'Senior Citizen' },
];

function StationInput({ label, value, onChange, placeholder, icon: Icon }: {
  label: string; value: Station | null; onChange: (s: Station) => void; placeholder: string; icon: any;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = stations.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.code.toLowerCase().includes(query.toLowerCase()) ||
    s.city.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative flex-1 group">
      <div className="flex flex-col px-4 py-3 rounded-2xl bg-secondary/50 border border-border/50 group-focus-within:border-primary/50 group-focus-within:bg-background group-focus-within:shadow-sm transition-all">
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-0.5">{label}</label>
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground/40" />
          <input
            className="flex-1 bg-transparent text-foreground font-display text-lg font-bold outline-none placeholder:text-muted-foreground/30 truncate"
            placeholder={placeholder}
            value={open ? query : (value ? `${value.city} (${value.code})` : '')}
            onFocus={() => { setOpen(true); setQuery(''); }}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
          />
        </div>
      </div>
      {open && filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-[calc(100%+8px)] left-0 right-0 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden"
        >
          {filtered.map(s => (
            <button
              key={s.code}
              className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center justify-between group/item"
              onClick={() => { onChange(s); setOpen(false); setQuery(''); }}
            >
              <div>
                <div className="text-sm font-bold text-foreground">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.city}</div>
              </div>
              <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-lg group-hover/item:bg-primary group-hover/item:text-white transition-colors">{s.code}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

import { toast } from 'sonner';

export default function BookingForm() {
  const navigate = useNavigate();
  const { state, setFrom, setTo, setDate, setSelectedClass, setQuota, swapStations } = useBooking();

  const handleSearch = () => {
    if (!state.from || !state.to || !state.date) {
      toast.error('Please fill in all search details');
      return;
    }

    if (state.from.code === state.to.code) {
      toast.error('Origin and Destination cannot be the same', {
        description: `You have selected ${state.from.name} for both. Please choose a different destination.`,
        duration: 4000
      });
      return;
    }

    navigate('/search');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="bg-card border border-border/60 rounded-[32px] p-2 md:p-3 shadow-2xl">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <StationInput label="From" value={state.from} onChange={setFrom} placeholder="Origin" icon={Search} />
            
            <div className="flex items-center justify-center -my-2 md:my-0 md:-mx-2 z-10">
              <motion.button
                whileHover={{ rotate: 180, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={swapStations}
                className="w-10 h-10 rounded-full bg-background border border-border shadow-sm flex items-center justify-center text-primary"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </motion.button>
            </div>

            <StationInput label="To" value={state.to} onChange={setTo} placeholder="Destination" icon={Search} />

            <div className="flex-1 px-4 py-3 rounded-2xl bg-secondary/50 border border-border/50 hover:bg-secondary transition-all">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-0.5 block">Travel Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn(
                    "w-full text-left font-display text-lg font-bold flex items-center gap-2 outline-none",
                    !state.date && "text-muted-foreground/30"
                  )}>
                    <Calendar className="w-4 h-4 text-muted-foreground/40" />
                    {state.date ? format(state.date, 'EEE, dd MMM') : 'Departure Date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl overflow-hidden border-none shadow-2xl" align="start">
                  <CalendarUI
                    mode="single"
                    selected={state.date ?? undefined}
                    onSelect={(d) => setDate(d ?? null)}
                    disabled={(date) => date < new Date()}
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/30">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Class:</span>
                <select
                  value={state.selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  className="bg-transparent font-bold text-sm outline-none cursor-pointer"
                >
                  {classes.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/30">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Quota:</span>
                <select
                  value={state.quota}
                  onChange={e => setQuota(e.target.value)}
                  className="bg-transparent font-bold text-sm outline-none cursor-pointer"
                >
                  {quotas.map(q => <option key={q.code} value={q.code}>{q.name}</option>)}
                </select>
              </div>
            </div>

            <Button
              onClick={handleSearch}
              disabled={!state.from || !state.to || !state.date}
              className="w-full sm:w-auto min-w-[200px] h-14 text-base font-bold rounded-2xl gap-2 shadow-lg shadow-primary/25"
              size="lg"
            >
              Search Trains
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
