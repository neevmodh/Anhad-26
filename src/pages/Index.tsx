import { motion } from 'framer-motion';
import { RotateCcw, ArrowRight, TrendingUp, Star } from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import QuickActions from '@/components/QuickActions';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const recentSearches = [
  { from: 'New Delhi', to: 'Mumbai', date: 'Mar 28' },
  { from: 'Bengaluru', to: 'Chennai', date: 'Apr 2' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 flex flex-col items-center">
        {/* Subtle background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-foreground leading-tight tracking-tight mb-6">
              Book your next journey
              <br />
              <span className="text-primary">in 30 seconds.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              The fastest way to book Indian Railway tickets. Smart recommendations, instant availability, and zero clutter.
            </p>
          </motion.div>

          <BookingForm />

          {/* Quick rebook */}
          {recentSearches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                <RotateCcw className="w-3.5 h-3.5" /> Recent Searches:
              </span>
              {recentSearches.map((s, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -2, backgroundColor: 'hsl(var(--primary) / 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-card border border-border/60 rounded-2xl px-4 py-2.5 text-sm font-semibold text-foreground flex items-center gap-2 hover:border-primary/30 transition-all shadow-sm"
                >
                  {s.from} <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/60" /> {s.to}
                  <span className="text-muted-foreground/60 font-medium">· {s.date}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 pb-16 -mt-8 relative z-10">
        <QuickActions />
      </section>

      {/* Travel Recommendations & Offers */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-black text-foreground uppercase tracking-tight">Handpicked for You</h2>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">Exclusive deals and popular routes</p>
            </div>
            <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[32px] bg-card border border-border/50 shadow-xl p-8"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="w-24 h-24 text-primary" />
              </div>
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">Trending Now</span>
                <h3 className="font-display text-2xl font-black text-foreground mb-2">Summer in Shimla</h3>
                <p className="text-sm text-muted-foreground font-medium mb-6 max-w-[240px]">Beat the heat with premium Vande Bharat connections starting at ₹1,240.</p>
                <Button className="rounded-xl font-bold gap-2 shadow-glow">Explore Route <ArrowRight className="w-4 h-4" /></Button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[32px] bg-primary text-white shadow-2xl p-8 shadow-primary/20"
            >
              <div className="absolute -bottom-6 -right-6 p-8 opacity-20">
                <Star className="w-32 h-32 fill-white" />
              </div>
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-4">Exclusive Member Offer</span>
                <h3 className="font-display text-2xl font-black mb-2">Flat 15% Off</h3>
                <p className="text-sm text-white/80 font-medium mb-6 max-w-[240px]">Use code <span className="font-black text-white px-2 py-0.5 bg-white/20 rounded-md">RAILGO15</span> on your first AC booking.</p>
                <Button variant="secondary" className="rounded-xl font-bold gap-2 text-primary">Claim Offer</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-4 pb-20"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
          {[
            { value: '12K+', label: 'Trains daily' },
            { value: '8K+', label: 'Stations' },
            { value: '2.3M', label: 'Happy travelers' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center py-6 rounded-2xl glass border border-border/30"
            >
              <div className="font-display text-2xl md:text-3xl font-extrabold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
