# 🚄 Anhad-26 | RailGo

**RailGo** is a next-generation railway booking platform reimagined for the modern traveler. Built exclusively for the **Anhad '26 Hackathon**, this project solves the critical friction points of traditional railway interfaces by prioritizing radical simplification, high-fidelity visual design, and instantaneous user feedback.

---

## 🌟 The Vision: One-Tap Travel
Traditional railway booking is often cluttered with unnecessary complexity. **RailGo** transforms this into a cinematic, 30-second experience. By merging redundant steps and utilizing smart automation, we've created a platform where booking a ticket feels as fluid as booking a premium airline seat.

---

## ✨ Core Features & Innovations

### 🚀 30-Second Express Booking
Our hyper-optimized 3-step checkout (Passengers → Seats → Payment) eliminates cognitive load. Using `Framer Motion`, we ensure every transition feels intentional and premium.
- **Auto-Fill Logic**: Smart defaults based on previous search trends.
- **One-Tap Selection**: Minimized clicks for class and quota choices.

### 🛋️ High-Fidelity Interactive Seat Maps
A complete departure from generic seat lists. Our interactive coach visualizations (1A, 2A, 3A, SL) provide:
- **Spatial Awareness**: Clear visualization of berth positions (Upper, Lower, Side).
- **Real-Time Availability**: Color-coded status badges for instant decision-making.
- **Mobile-First UX**: Large touch targets optimized for booking on the go.

### 🛰️ Live Train Intelligence & PNR Checker
Integrated tracking tools built with a professional vertical timeline interface.
- **Live Status**: Track delays, current stations, and platform numbers in real-time.
- **PNR Checker**: High-fidelity retrieval of booking status, coach details, and confirmability.

### 🛡️ Smart Route & Submission Validation
Built-in intelligence to prevent common booking errors.
- **Station Redundancy Check**: Prevents searches where origin and destination are the same.
- **Real-Time Sonner Toasts**: Instant, tactile feedback for any invalid input.

### 📊 Persistent Journey Dashboard
The "My Bookings" page is a hub for your travel history.
- **Local Persistence**: All confirmed bookings are saved to your session history.
- **QR Ticket Generation**: Instant, high-fidelity ticket views with scan-ready QR codes.

---

## 🎨 Design System: The Indigo aesthetic
**RailGo** follows a strict, premium design language:
- **Glassmorphism**: Sophisticated backdrop-blur effects and subtle border glows.
- **8pt Grid Consistency**: Pixel-perfect spacing ensuring visual balance.
- **Dynamic Micro-animations**: Shimmer effects, hover scaling, and magnetic interactions that make the app feel alive.
- **Custom Typography**: Utilizing modern sans-serif fonts for maximum readability.

---

## 🛠️ Technology Stack
- **Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Feedback System**: [Sonner](https://sonner.stevenlyui.com/) (Toasts)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/neevmodh/Anhad-26.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```

### Deployment Readiness
The project includes pre-configured settings for [Vercel](https://vercel.com/) and [Netlify](https://www.netlify.com/), including SPA routing rewrites and build optimizations in `vite.config.ts`.

---

## 🛣️ Roadmap
- [ ] AI-Powered Confirmation Probability engine.
- [ ] Multi-lingual support (Hindi, Marathi, Bengali).
- [ ] Offline-first "My Bookings" with PWA support.
- [ ] Native integration for seat availability notifications.

---

Developed with ❤️ for the **Anhad '26 Hackathon**.
