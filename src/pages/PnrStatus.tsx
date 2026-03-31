import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, User, Train, Bookmark, BadgeCheck, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function PnrStatus() {
  const navigate = useNavigate();
  const [pnr, setPnr] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);

  const handleSearch = () => {
    if (!pnr || pnr.length < 5) {
      toast.error('Please enter a valid 10-digit PNR');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus({
        pnr: pnr,
        train: { id: '12301', name: 'Rajdhani Express', date: 'Fri, 28 Mar' },
        passengers: [
          { name: 'John Doe', status: 'CNF', coach: 'B1', berth: '12' },
          { name: 'Jane Doe', status: 'CNF', coach: 'B1', berth: '15' }
        ],
        class: '3A',
        quota: 'General'
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background pb-12">
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
            <h1 className="font-display text-3xl font-black text-foreground uppercase tracking-tight">PNR Status</h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">Check booking details</p>
          </div>
        </motion.div>

        <div className="bg-card border border-border/50 rounded-[32px] p-8 shadow-xl mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              placeholder="Enter 10-digit PNR Number"
              className="h-14 pl-12 pr-4 rounded-2xl bg-secondary/30 border-none font-bold text-lg focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={loading}
            className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-sm shadow-glow"
          >
            {loading ? 'Retrieving Info...' : 'Check Status'}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {status && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-primary rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Bookmark className="w-32 h-32" />
                </div>
                <div className="relative z-10 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Booking ID</span>
                    <h2 className="text-2xl font-black">{status.pnr}</h2>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                       Confirmed Journey
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-[40px] shadow-xl overflow-hidden">
                <div className="p-8 border-b border-border/30">
                  <div className="flex items-center gap-4">
                    <Train className="w-10 h-10 text-primary opacity-40 shrink-0" />
                    <div>
                      <h3 className="font-display font-black text-xl text-foreground">{status.train.name}</h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{status.train.id} · {status.train.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-10 space-y-8">
                  {status.passengers.map((p: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-2xl bg-secondary/20 hover:bg-secondary/40 transition-all border border-transparent hover:border-primary/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-foreground uppercase tracking-tight">{p.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Adult · {status.quota}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-12 sm:text-right">
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Status</p>
                          <span className="text-sm font-black text-success uppercase">{p.status}</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Coach</p>
                          <span className="text-sm font-black text-foreground uppercase">{p.coach}</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Seat</p>
                          <span className="text-sm font-black text-foreground uppercase">{p.berth}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Class of Travel</div>
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-primary" />
                        <span className="text-sm font-black text-primary uppercase">{status.class}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-6 rounded-2xl bg-secondary/30">
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Total Amount</div>
                      <span className="text-lg font-black text-foreground">₹2,450.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
