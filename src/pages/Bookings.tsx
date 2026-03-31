import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Search, Ticket, ArrowLeft, Train, Download, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';

export default function Bookings() {
  const navigate = useNavigate();
  const { state } = useBooking();

  return (
    <div className="min-h-screen bg-background pb-12">
      <Header />
      <main className="px-4 pt-24 pb-16 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <button
            onClick={() => navigate('/')}
            className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display text-3xl font-black text-foreground uppercase tracking-tight">My Bookings</h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">Manage your journeys</p>
          </div>
        </motion.div>

        {state.pastBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-card border border-border/50 rounded-[40px] shadow-xl"
          >
            <div className="w-24 h-24 rounded-[32px] bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-black text-foreground mb-2">No bookings found</h2>
            <p className="text-muted-foreground mb-8">You haven't made any train bookings yet.</p>
            <Button onClick={() => navigate('/')} className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest gap-2">
              Book Your First Journey <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-10">
            {state.pastBookings.map((booking, idx) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-card border border-border/50 rounded-[40px] shadow-2xl overflow-hidden hover:border-primary/20 transition-all"
              >
                {/* Status Bar */}
                <div className="bg-primary px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Train className="w-5 h-5 text-white/80" />
                    <span className="font-display font-black text-white text-sm uppercase tracking-widest">Journey Confirmed</span>
                  </div>
                  <span className="font-mono text-sm font-black text-white/90 tracking-widest">{booking.pnr}</span>
                </div>

                {/* Perforation */}
                <div className="relative h-4 bg-card">
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-r border-border/50" />
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-l border-border/50" />
                  <div className="absolute top-1/2 left-8 right-8 h-px border-t-2 border-dashed border-border/40" />
                </div>

                <div className="p-8 space-y-8">
                  <div className="flex items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h2 className="font-display text-2xl font-black text-foreground">{booking.train.name}</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-lg">{booking.train.number}</span>
                        <span className="text-xs font-black text-primary uppercase tracking-widest">{booking.train.classes[0].name}</span>
                      </div>
                    </div>
                    <div className="bg-background p-2 rounded-xl border border-border/40 shrink-0">
                      <QRCodeSVG value={booking.pnr} size={50} />
                    </div>
                  </div>

                  <div className="flex items-center gap-8 py-6 border-y border-border/30">
                    <div className="flex-1">
                      <div className="font-display text-2xl font-black text-foreground mb-1">{booking.train.departure}</div>
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{booking.train.from.city}</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <Clock className="w-5 h-5 text-primary opacity-40" />
                      <div className="text-[10px] font-black text-muted-foreground uppercase">{booking.train.duration}</div>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="font-display text-2xl font-black text-foreground mb-1">{booking.train.arrival}</div>
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{booking.train.to.city}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Travel Date</div>
                      <div className="text-sm font-black text-foreground">{format(booking.date, 'EEE, dd MMM yyyy')}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Paid</div>
                      <div className="text-lg font-black text-primary">₹{booking.totalPrice.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1 h-12 rounded-2xl gap-2 font-black uppercase text-[10px] tracking-widest border-2">
                      <Download className="w-4 h-4" /> Ticket
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 rounded-2xl gap-2 font-black uppercase text-[10px] tracking-widest border-2">
                      <Share2 className="w-4 h-4" /> Share
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
