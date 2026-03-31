<p align="center">
  <img src="https://raw.githubusercontent.com/neevmodh/Anhad-26/main/public/banner.svg" width="1000" alt="RailGo Banner" />
</p>

# <p align="center">🚄 Anhad-26 | RailGo</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-5.4-indigo?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Framer--Motion-11-ff0055?style=for-the-badge&logo=framer" />
</p>

---

# 📖 Project Overview
**RailGo** is a radical reimagining of the Indian Railways booking experience. Designed for the **Anhad '26 Hackathon**, it transforms a complex, friction-heavy process into a fluid, cinematic journey. Our mission: **Booking a ticket in under 30 seconds with zero cognitive load.**

---

# 🚀 Key Features

### 🚄 30-Second Express Booking
A streamlined 3-step checkout that merges redundant screens (Passengers → Seats → Payment).
- **Architecture**: Powered by a centralized `BookingContext` providing atomic state management.
- **UX**: 60fps transitions using Framer Motion constants.

### 🛋️ High-Fidelity Interactive Seat Maps
Real-time coach visualizations with status indicators.
- **Seat Types**: 1A, 2A, 3A, SL, 2S.
- **Validation**: Intelligent seat selection logic that ensures your group sits together.

### 🛰️ Live Intelligence Hub
Tracking tools that give you more than just numbers.
- **Live Status**: A vertical interactive timeline with animated station markers.
- **PNR Checker**: retrieval of booking status with high-fidelity ticket views.

---

# 🛠️ Technical Deep Dive (Code Details)

<details>
<summary><b>🧠 Smart Form Validation Logic</b></summary>

```typescript
// BookingForm station redundancy check
if (state.from.code === state.to.code) {
  toast.error('Origin and Destination cannot be the same', {
     description: `You have selected ${state.from.name} for both.`,
     duration: 4000
  });
  return;
}
```
</details>

<details>
<summary><b>📊 State Management Strategy</b></summary>

```typescript
// Centralized BookingContext for atomic updates
const [state, setState] = useState<BookingState>(initialState);

const updateField = (field: keyof BookingState, value: any) => {
  setState(prev => ({ ...prev, [field]: value }));
};
```
</details>

<details>
<summary><b>🎨 Premium UI Glassmorphism</b></summary>

```css
/* Custom Glass Utilities in index.css */
.glass-panel {
  @apply bg-card/60 backdrop-blur-xl border border-white/10 shadow-glow;
}
```
</details>

---

# 🎨 Design Ethics: The Indigo aesthetic
- **Glassmorphism**: 16px blur radius with 10% white borders for a sophisticated modern depth.
- **8pt Grid**: Pixel-perfect spacing ensuring visual balance across all resolutions.
- **Shimmer Effects**: Custom `@keyframes` for skeleton loaders and CTA glows.

---

# 🚀 Setup & Launch

1. **Clone & Enter**:
   ```bash
   git clone https://github.com/neevmodh/Anhad-26.git
   cd Anhad-26
   ```
2. **Ignite Dependencies**:
   ```bash
   npm install
   ```
3. **Launch Engine**:
   ```bash
   npm run dev
   ```

---

<p align="center">
  <b>Developed for the Anhad '26 Hackathon.</b><br/>
  <i>Engineered for Speed. Designed for Impact.</i>
</p>
