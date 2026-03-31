import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/Header';
import TrainCard from '@/components/TrainCard';
import SearchFilters from '@/components/SearchFilters';
import { SkeletonSearchResults } from '@/components/SkeletonLoaders';
import { useBooking } from '@/contexts/BookingContext';
import { sampleTrains } from '@/data/trains';
import { Train } from '@/types/booking';

export default function SearchResults() {
  const navigate = useNavigate();
  const { state, setSelectedTrain, setStep } = useBooking();
  const [sortBy, setSortBy] = useState('recommended');
  const [classFilter, setClassFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const trains = useMemo(() => {
    let list = [...sampleTrains];
    if (classFilter !== 'all') {
      list = list.filter(t => t.classes.some(c => c.code === classFilter));
    }
    switch (sortBy) {
      case 'cheapest':
        list.sort((a, b) => Math.min(...a.classes.map(c => c.price)) - Math.min(...b.classes.map(c => c.price)));
        break;
      case 'fastest':
        list.sort((a, b) => a.duration.localeCompare(b.duration));
        break;
      case 'earliest':
        list.sort((a, b) => a.departure.localeCompare(b.departure));
        break;
      default:
        list.sort((a, b) => (b.isBestOption ? 1 : 0) - (a.isBestOption ? 1 : 0));
    }
    return list;
  }, [sortBy, classFilter]);

  const handleSelect = (train: Train) => {
    setSelectedTrain(train);
    setStep(1);
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Header />
      <main className="px-4 pt-24 pb-16 max-w-5xl mx-auto">
        {/* Route summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => navigate('/')}
              className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/70 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-display text-2xl font-black text-foreground">{state.from?.city || 'Delhi'}</span>
                <ArrowRight className="w-5 h-5 text-primary" />
                <span className="font-display text-2xl font-black text-foreground">{state.to?.city || 'Kolkata'}</span>
              </div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                {state.date ? format(state.date, 'EEE, dd MMM yyyy') : 'Tomorrow'} · {trains.length} trains found
              </p>
            </div>
          </motion.div>

          <SearchFilters sortBy={sortBy} onSortChange={setSortBy} classFilter={classFilter} onClassChange={setClassFilter} />
        </div>

        {/* AI recommendation banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-[28px] bg-primary/5 border border-primary/10 flex flex-col md:flex-row md:items-center gap-4 shadow-sm"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Zap className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-foreground mb-0.5">Best Option Selected</p>
            <p className="text-sm text-muted-foreground font-medium">Rajdhani Express (12301) is the fastest train on this route with a 94% confirmation probability and premium service.</p>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all whitespace-nowrap">
            Book Best Train
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="skeleton" exit={{ opacity: 0 }}>
              <SkeletonSearchResults />
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6">
              {trains.map((train, i) => (
                <TrainCard key={train.id} train={train} onSelect={handleSelect} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
