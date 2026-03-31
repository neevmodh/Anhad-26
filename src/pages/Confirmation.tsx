import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle2, Download, Share2, Train, Clock, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';

export default function Confirmation() {
  const navigate = useNavigate();
  const { state, confirmBooking, reset } = useBooking();

  const train = state.selectedTrain;
  const pnr = useMemo(() => 'PNR' + Math.random().toString(36).substring(2, 12).toUpperCase(), []);

  useEffect(() => {
    confirmBooking();
  }, []);

  const handleNewBooking = () => {
    reset();
    navigate('/');
  };

  const passengers = state.passengers.length > 0 && state.passengers[0].name 
    ? state.passengers 
    : [{ name: 'Rahul Sharma', age: 28, gender: 'M' as const, berth: 'LB' as const }];

  const totalPrice = ((train?.classes[0]?.price || 2470) * passengers.length);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-12 text-foreground">
      <Header />
      <main className="px-4 pt-24 pb-16 max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className="w-24 h-24 mx-auto rounded-[32px] bg-green-500 flex items-center justify-center mb-6 shadow-2xl shadow-green-500/20"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-black tracking-tight mb-2"
          >
            Booking Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg font-medium text-muted-foreground"
          >
            Your journey from <span className="text-foreground font-black">{train?.from.city || 'Delhi'}</span> is ready.
          </motion.p>
        </div>

        {/* Ticket Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-card border border-border/50 rounded-[40px] shadow-2xl overflow-hidden"
        >
          {/* Ticket Top - PNR & Branding */}
          <div className="bg-primary px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <Train className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">RailGo Premium</span>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-0.5">Booking PNR</div>
              <div className="font-mono text-lg font-black text-white tracking-widest">{pnr}</div>
            </div>
          </div>

          {/* Dynamic "Perforation" UI divider */}
          <div className="relative h-4 bg-card">
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-r border-border/50" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-l border-border/50" />
            <div className="absolute top-1/2 left-8 right-8 h-px border-t-2 border-dashed border-border/40" />
          </div>

          <div className="p-8 md:p-10 space-y-8">
            {/* Train details */}
            <div className="flex items-center justify-between gap-6">
              <div className="space-y-1">
                <h2 className="font-display text-2xl font-black text-foreground">{train?.name || 'Rajdhani Express'}</h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-lg">{train?.number || '12301'}</span>
                  <span className="text-xs font-black text-primary uppercase tracking-widest">{train?.classes[0].name || 'Second AC'}</span>
                </div>
              </div>
              <div className="text-right">
                 <div className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">Confirmed</div>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="flex items-center gap-8 py-6 border-y border-border/30">
              <div className="flex-1">
                <div className="font-display text-3xl font-black text-foreground mb-1">{train?.departure || '16:55'}</div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{train?.from.city || 'Delhi'}</div>
              </div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                 <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                 </div>
                 <div className="text-[10px] font-black text-muted-foreground uppercase">{train?.duration || '17h 00m'}</div>
              </div>
              <div className="flex-1 text-right">
                <div className="font-display text-3xl font-black text-foreground mb-1">{train?.arrival || '09:55'}</div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{train?.to.city || 'Kolkata'}</div>
              </div>
            </div>

            {/* Passengers & QR */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4">
              <div className="space-y-4 flex-1">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Confirmed Passengers</h3>
                <div className="space-y-3">
                  {passengers.map((p, i) => (
                    <div key={i} className="flex items-center gap-4 bg-secondary/30 rounded-2xl p-4 border border-border/20">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center font-black text-primary text-sm shadow-sm">{i+1}</div>
                      <div>
                        <div className="font-black text-foreground text-sm uppercase tracking-wide">{p.name}</div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {p.age} Yrs · {p.gender} · {p.berth} Berth
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 shrink-0 bg-background p-6 rounded-[32px] border border-border shadow-inner">
                <QRCodeSVG value={pnr} size={120} className="text-foreground" bgColor="transparent" fgColor="currentColor" />
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Scan for Coach</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Post-booking Actions */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
           <Button variant="outline" className="h-16 rounded-[24px] font-black uppercase tracking-widest border-2 border-border/60 hover:bg-secondary transition-all gap-3">
              <Download className="w-5 h-5" /> Download PDF
           </Button>
           <Button variant="outline" className="h-16 rounded-[24px] font-black uppercase tracking-widest border-2 border-border/60 hover:bg-secondary transition-all gap-3">
              <Share2 className="w-5 h-5" /> Share Ticket
           </Button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
           <Button 
              className="h-20 rounded-[32px] bg-foreground text-background hover:bg-foreground/90 font-display font-black text-xl shadow-2xl transition-all gap-4 group"
              onClick={() => navigate('/')}
           >
              Live Track Your Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
           </Button>
           
           <button 
              onClick={handleNewBooking}
              className="py-4 text-sm font-black text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
           >
              Make Another Booking
           </button>
        </div>
      </main>
    </div>
  );
}
