import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = ['Select Train', 'Passengers', 'Seats', 'Payment'];

export default function BookingStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-3 mb-8">
      {steps.map((label, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isDone = step < currentStep;
        return (
          <div key={label} className="flex items-center gap-1 md:gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                }}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300",
                  isDone ? "bg-success text-success-foreground shadow-[0_0_12px_-2px_hsl(142,71%,45%,0.4)]" :
                  isActive ? "bg-primary text-primary-foreground shadow-glow" :
                  "bg-muted text-muted-foreground"
                )}
              >
                {isDone ? <Check className="w-4 h-4" /> : step}
              </motion.div>
              <span className={cn(
                "text-sm font-medium hidden md:block transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <motion.div
                animate={{ backgroundColor: isDone ? 'hsl(var(--success))' : 'hsl(var(--border))' }}
                className="w-6 md:w-12 h-0.5 rounded-full"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
