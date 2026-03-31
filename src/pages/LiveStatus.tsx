import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Clock, Train, AlertCircle, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const MOCK_TRAINS = [
  { id: '12301', name: 'Rajdhani Express', from: 'NDLS', to: 'HWH', status: 'On Time' },
  { id: '12952', name: 'Mumbai Rajdhani', from: 'MMCT', to: 'NDLS', status: 'Delayed 15m' },
];

const MOCK_TIMELINE = [
  { station: 'New Delhi', code: 'NDLS', arrival: '--:--', departure: '16:55', platform: '1', status: 'departed' },
  { station: 'Kanpur Central', code: 'CNB', arrival: '21:35', departure: '21:40', platform: '9', status: 'current' },
  { station: 'Prayagraj Jn.', code: 'PRYJ', arrival: '23:50', departure: '23:55', platform: '4', status: 'upcoming' },
  { station: 'Howrah Jn.', code: 'HWH', arrival: '04:50', departure: '--:--', platform: '12', status: 'upcoming' },
];

export default function LiveStatus() {
  const navigate = useNavigate();
  const [trainNo, setTrainNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);

  const handleSearch = () => {
    if (!trainNo) {
      toast.error('Please enter a train number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus({
        train: MOCK_TRAINS[0],
        timeline: MOCK_TIMELINE,
        currentStation: 'Kanpur Central',
        lastUpdated: '2 mins ago'
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 pt-24 pb-16 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display text-3xl font-black text-foreground uppercase tracking-tight">Live Status</h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">Real-time tracking</p>
          </div>
        </motion.div>

        <div className="bg-card border border-border/50 rounded-[32px] p-8 shadow-xl mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={trainNo}
              onChange={(e) => setTrainNo(e.target.value)}
              placeholder="Enter Train Number (e.g. 12301)"
              className="h-14 pl-12 pr-4 rounded-2xl bg-secondary/30 border-none font-bold text-lg focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={loading}
            className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-sm shadow-glow"
          >
            {loading ? 'Finding Train...' : 'Track Live Location'}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {status && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-primary rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Train className="w-32 h-32" />
                </div>
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black mb-1">{status.train.name}</h2>
                    <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">{status.train.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-primary text-[10px] font-black uppercase tracking-widest mb-2">
                       <CheckCircle2 className="w-3 h-3" /> {status.train.status}
                    </span>
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Last updated {status.lastUpdated}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-[40px] p-10 shadow-xl overflow-hidden relative">
                <div className="absolute left-[59px] top-10 bottom-10 w-0.5 bg-border/40" />
                
                <div className="space-y-12">
                  {status.timeline.map((item: any, i: number) => (
                    <motion.div
                      key={item.code}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative flex items-start pl-16 group"
                    >
                      <div className={`absolute left-[54px] top-1.5 w-3 h-3 rounded-full border-2 border-card z-10 
                        ${item.status === 'departed' ? 'bg-primary' : item.status === 'current' ? 'bg-success shadow-[0_0_12px_hsl(var(--success))]' : 'bg-muted-foreground/30'}`} 
                      />
                      
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <h4 className={`text-lg font-black tracking-tight ${item.status === 'upcoming' ? 'text-muted-foreground font-bold' : 'text-foreground'}`}>
                            {item.station}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.code}</span>
                            <span className="text-[10px] font-bold text-muted-foreground/40 italic">Platform {item.platform}</span>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center justify-end gap-2 text-xs font-black">
                             <Clock className="w-3 h-3 opacity-40" /> {item.arrival !== '--:--' ? item.arrival : item.departure}
                          </div>
                          {item.status === 'current' && (
                            <span className="text-[10px] font-black text-success uppercase tracking-widest animate-pulse">At Station</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
