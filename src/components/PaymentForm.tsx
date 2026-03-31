import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Smartphone, CreditCard, Building2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const methods = [
  { id: 'upi', label: 'UPI', icon: Smartphone, recommended: true },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
];

interface PaymentFormProps {
  amount: number;
  onPay: () => void;
}

export default function PaymentForm({ amount, onPay }: PaymentFormProps) {
  const [selected, setSelected] = useState('upi');
  const [upiId, setUpiId] = useState('');

  const inputClass = "w-full h-14 px-5 rounded-2xl border border-border/50 bg-secondary/30 text-foreground font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30";

  return (
    <div className="space-y-8">
      {/* Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {methods.map(m => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={cn(
              "group relative p-6 rounded-[24px] border-2 transition-all flex flex-col items-center gap-3",
              selected === m.id ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-border/50 hover:border-primary/20 hover:bg-secondary/30"
            )}
          >
            {m.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap shadow-lg shadow-primary/20">
                Popular
              </span>
            )}
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
              selected === m.id ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
            )}>
              <m.icon className="w-6 h-6" />
            </div>
            <span className={cn("text-sm font-black uppercase tracking-wider", selected === m.id ? "text-foreground" : "text-muted-foreground")}>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="min-h-[100px]">
        <AnimatePresence mode="wait">
          {selected === 'upi' && (
            <motion.div key="upi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Enter UPI ID</label>
              <div className="relative">
                <input type="text" placeholder="username@bank" value={upiId} onChange={e => setUpiId(e.target.value)} className={inputClass} />
                <Smartphone className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30" />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground ml-1">Enter your VPA to receive a payment request on your UPI app.</p>
            </motion.div>
          )}

          {selected === 'card' && (
            <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Card Number</label>
                <input placeholder="0000 0000 0000 0000" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Expiry Date</label>
                  <input placeholder="MM/YY" className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">CVV</label>
                  <input placeholder="***" type="password" className={inputClass} />
                </div>
              </div>
            </motion.div>
          )}

          {selected === 'netbanking' && (
            <motion.div key="nb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Select Bank</label>
              <select className={inputClass + ' cursor-pointer'}>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust & Breakdown */}
      <div className="space-y-6 pt-4 border-t border-border/50">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 bg-secondary/30 rounded-2xl p-4">
          <Shield className="w-5 h-5 text-green-500 shrink-0" />
          <span>256-bit Secure Encryption · No hidden charges</span>
          <Lock className="w-4 h-4 text-green-500 ml-auto shrink-0" />
        </div>

        <div className="bg-secondary/20 rounded-[24px] p-6 space-y-3">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span>Ticket Fare</span>
            <span>₹{(amount * 0.95).toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span>Convenience Fee</span>
            <span>₹{(amount * 0.05).toFixed(0)}</span>
          </div>
          <div className="h-px bg-border/50 my-2" />
          <div className="flex justify-between items-end">
            <span className="text-sm font-black uppercase tracking-widest text-foreground">Total Amount</span>
            <span className="text-3xl font-black text-primary tracking-tighter">₹{amount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button onClick={onPay} className="w-full h-16 text-xl font-display font-black rounded-[24px] shadow-xl shadow-primary/25 group transition-all" size="lg">
        Pay Securely
        <Shield className="w-6 h-6 ml-2 group-hover:scale-110 transition-transform" />
      </Button>
    </div>
  );
}
