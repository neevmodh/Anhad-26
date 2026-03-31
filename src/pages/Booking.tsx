import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, ChevronRight, Train, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import BookingStepper from '@/components/BookingStepper';
import SeatMap from '@/components/SeatMap';
import PaymentForm from '@/components/PaymentForm';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Passenger } from '@/types/booking';
import { cn } from '@/lib/utils';

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function Booking() {
  const navigate = useNavigate();
  const { state, setPassengers, setSelectedSeats, setStep } = useBooking();
  const [step, setLocalStep] = useState(1);
  const [isAutofilling, setIsAutofilling] = useState(false);

  const train = state.selectedTrain;
  if (!train) {
    navigate('/search');
    return null;
  }

  const selectedClass = train.classes[0];
  const totalPrice = selectedClass.price * Math.max(state.passengers.length, 1);

  const updateStep = (s: number) => { setLocalStep(s); setStep(s); window.scrollTo(0, 0); };

  const updatePassenger = (index: number, field: keyof Passenger, value: string | number) => {
    const updated = [...state.passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const addPassenger = () => {
    if (state.passengers.length < 6) {
      setPassengers([...state.passengers, { name: '', age: 0, gender: 'M', berth: 'none' }]);
    }
  };

  const removePassenger = (i: number) => {
    if (state.passengers.length > 1) {
      setPassengers(state.passengers.filter((_, idx) => idx !== i));
    }
  };

  const simulateAutofill = () => {
    setIsAutofilling(true);
    setTimeout(() => {
      setPassengers([{ name: 'Rahul Sharma', age: 28, gender: 'M', berth: 'LB' }]);
      setIsAutofilling(false);
    }, 600);
  };

  const inputClass = "w-full h-12 px-4 rounded-2xl border border-border/50 bg-secondary/30 text-foreground font-semibold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30";

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      <Header />
      <main className="px-4 pt-24 pb-16 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex items-center gap-4 min-w-max">
            {[
              { id: 1, label: 'Passengers' },
              { id: 2, label: 'Seats' },
              { id: 3, label: 'Payment' }
            ].map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors",
                  step >= s.id ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                )}>
                  {s.id}
                </div>
                <span className={cn(
                  "text-sm font-bold transition-colors",
                  step >= s.id ? "text-foreground" : "text-muted-foreground"
                )}>{s.label}</span>
                {s.id < 3 && <div className={cn("w-8 h-[2px] rounded-full", step > s.id ? "bg-primary" : "bg-secondary")} />}
              </div>
            ))}
          </div>
        </div>

        {/* Train summary - Sticky-ish for context */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border/60 rounded-[32px] p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl shadow-primary/5"
        >
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Train className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="font-display font-black text-lg text-foreground">{train.name}</h2>
                <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-lg">{train.number}</span>
              </div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{train.departure} → {train.arrival} · {selectedClass.name}</p>
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Payable</div>
            <div className="font-display text-3xl font-black text-primary">₹{totalPrice.toLocaleString()}</div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-foreground">Passenger Details</h3>
                <button
                  onClick={simulateAutofill}
                  disabled={isAutofilling}
                  className="text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                >
                  {isAutofilling ? 'Autofilling...' : 'Autofill Saved'}
                </button>
              </div>

              {state.passengers.map((p, i) => (
                <div key={i} className="bg-card border border-border/50 rounded-[28px] p-6 md:p-8 space-y-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-black text-muted-foreground">P{i + 1}</div>
                      <h4 className="font-display font-bold text-foreground uppercase tracking-wider">Passenger {i + 1}</h4>
                    </div>
                    {state.passengers.length > 1 && (
                      <button onClick={() => removePassenger(i)} className="text-destructive hover:bg-destructive/10 p-2 rounded-xl transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                      <input placeholder="As per ID card" value={p.name} onChange={e => updatePassenger(i, 'name', e.target.value)} className={inputClass} />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Age</label>
                        <input type="number" placeholder="0" value={p.age || ''} onChange={e => updatePassenger(i, 'age', parseInt(e.target.value) || 0)} className={inputClass} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Gender</label>
                        <select value={p.gender} onChange={e => updatePassenger(i, 'gender', e.target.value)} className={inputClass + ' cursor-pointer'}>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="O">Other</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Berth</label>
                        <select value={p.berth} onChange={e => updatePassenger(i, 'berth', e.target.value)} className={inputClass + ' cursor-pointer'}>
                          <option value="none">No Pref</option>
                          <option value="LB">Lower</option>
                          <option value="MB">Middle</option>
                          <option value="UB">Upper</option>
                          <option value="SL">Side Lower</option>
                          <option value="SU">Side Upper</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addPassenger}
                className="w-full py-5 rounded-[24px] border-2 border-dashed border-border/80 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest"
              >
                <Plus className="w-5 h-5" /> Add Passenger
              </button>

              <div className="pt-4">
                <Button onClick={() => updateStep(2)} className="w-full h-16 rounded-[24px] font-display font-black text-xl gap-3 shadow-xl shadow-primary/25 group" size="lg">
                  Next Step: Select Seats
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="bg-card border border-border/50 rounded-[32px] p-6 md:p-10 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="font-display text-2xl font-black text-foreground mb-1">Select Seats</h3>
                    <p className="text-sm font-medium text-muted-foreground">Select <span className="text-primary font-bold">{state.passengers.length}</span> seats from the coach layout</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Available</span>
                    </div>
                  </div>
                </div>
                <SeatMap maxSeats={state.passengers.length} selectedSeats={state.selectedSeats} onSelect={setSelectedSeats} />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => updateStep(1)}
                  className="flex-1 h-14 rounded-2xl bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors"
                >
                  Back to Passengers
                </button>
                <Button 
                  onClick={() => updateStep(3)} 
                  disabled={state.selectedSeats.length < state.passengers.length} 
                  className="flex-[2] h-14 rounded-2xl font-display font-black text-lg gap-2 shadow-lg shadow-primary/20"
                >
                  Final Step: Checkout <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="bg-card border border-border/50 rounded-[32px] p-8 md:p-10 shadow-sm">
                <h3 className="font-display text-2xl font-black text-foreground mb-8">Secure Payment</h3>
                <PaymentForm amount={totalPrice} onPay={() => navigate('/confirmation')} />
              </div>
              <button
                onClick={() => updateStep(2)}
                className="w-full h-14 rounded-2xl bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors"
              >
                Back to Seat Selection
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
