# GS MotorX 🚗⚡️

**Cinematic Automotive Service Platform** – A next-gen smart vehicle concierge for cars and bikes with AI-powered predictive maintenance, gamification, mechanic recommendations, and premium UI/UX.

---

## 🔥 Core Features

### 🤖 AI Predictive Maintenance
- **Part Failure Prediction**: Advanced AI analyzes vehicle model, age, mileage, and service history
- **Severity Classification**: Critical, High, Medium, and Low priority alerts
- **Cost Estimation**: Accurate cost predictions for upcoming maintenance
- **Confidence Scores**: AI confidence levels (75-100%) for each prediction
- **Proactive Alerts**: Early warnings before parts fail
- **Detailed Recommendations**: Specific action items for each prediction

### 🎮 Gamification & Rewards System
- **Achievement Badges**: 12+ achievements across Bronze, Silver, Gold, and Platinum tiers
- **Loyalty Points**: Earn points for services, reviews, and referrals
- **Tier System**: Starter → Pro → Expert → Master progression
- **Leaderboard**: Regional rankings based on points, km tracked, and services
- **Progress Tracking**: Visual progress bars and unlock animations
- **Redemption System**: Use points for discounts and premium features

### 🏪 AI-Powered Garage Finder
- **Smart Recommendations**: AI matches garages based on vehicle type, location, and ratings
- **Rating & Reviews**: User-generated reviews with helpful voting
- **Advanced Filters**: Filter by vehicle type, price range, and specialization
- **Distance Calculation**: Real-time distance from user location
- **Verified Badges**: Trusted garage verification system
- **Service Listings**: Detailed service offerings per garage

### 🚗 Complete Vehicle Management
- **Multi-Vehicle Support**: Track cars and bikes with distinct icons
- **Health Monitoring**: Real-time vehicle health scores (0-100%)
- **Service History**: Complete timeline of past services with costs and parts
- **Dynamic Health Calculation**: Updates based on predictions and maintenance
- **Mileage Tracking**: Current km and service intervals
- **Fuel Type & Details**: Comprehensive vehicle information

### 📅 Smart Booking System
- **Vehicle Selection**: Choose from your garage
- **Garage Picker**: Browse AI-recommended garages
- **Service Types**: 8+ service categories from regular to major repairs
- **Date & Time Slots**: Flexible scheduling with available slots
- **Status Tracking**: Pending, Confirmed, Completed states
- **Notes & Requests**: Add custom instructions for mechanics

### 🎨 Premium UI/UX
- **Cinematic Splash Screen**: Animated logo with rotating gradients and progress bar
- **Glassmorphism & Neumorphism**: Premium card designs with blur effects
- **Dark + Light Mode**: System-aware theme switching
- **Framer Motion Animations**: Smooth page transitions and micro-interactions
- **Custom Design Tokens**: Accent gradients (cyan, blue, magenta)
- **Progress Ring Animations**: Circular health indicators with gradients
- **Responsive Design**: Mobile-first approach with breakpoints

---

## 📱 Pages & Features

### 1. Dashboard (`/dashboard`)
- Vehicle cards with health rings and predictions
- AI predictive maintenance alert banner
- Quick stats (vehicles, reminders, estimated costs)
- Upcoming reminders timeline
- Loyalty points display
- Direct links to all features

### 2. Predictions (`/predictions`)
- AI-powered maintenance forecast page
- Summary cards (Critical, High, Medium issues)
- Detailed prediction cards with severity badges
- KM remaining, cost estimates, and confidence scores
- Recommendations and action items
- Quick booking links for urgent issues

### 3. Profile (`/profile`)
- User avatar and account info
- Loyalty points balance
- Tier progress bar (Starter → Master)
- Achievement showcase (unlocked/locked)
- Badge animations and descriptions
- Leaderboard access

### 4. Leaderboard (`/leaderboard`)
- Top 3 podium with medals
- Regional rankings
- Points, KM, and services stats
- Tier badges for each user
- Current user highlight
- Motivational UI

### 5. Garages (`/garages`)
- AI-recommended garage grid
- Filters: Vehicle type, price range
- Star ratings and review counts
- Distance from location
- Verified badges
- Reviews modal with write functionality
- Direct booking links

### 6. Vehicles (`/vehicles`)
- Vehicle grid with health indicators
- Add vehicle button (functional)
- Dynamic health calculation
- Service history links
- Book now functionality
- Fuel type and mileage display

### 7. Vehicle Details (`/vehicles/[id]`)
- Complete vehicle information
- Health ring with percentage
- Maintenance predictions section
- Service history timeline
- Quick action buttons
- AI assistant link

### 8. Bookings (`/bookings`)
- Active and past bookings
- Status badges (confirmed, pending, completed)
- Garage and vehicle details
- Date, time, and location
- Cancel and review buttons
- New booking CTA

### 9. New Booking (`/bookings/new`)
- Vehicle selector dropdown
- Garage selector with recommendations
- Service type selection (8+ options)
- Date picker (future dates only)
- Time slot selector
- Additional notes textarea
- Confirmation animation

### 10. AI Assistant (`/assistant`)
- Chat interface with AI bot
- Service recommendations
- Cost estimation queries
- Maintenance tips
- Conversational UI
- Mock Gemini API integration

### 11. Notifications (`/notifications`)
- Reminders (service, insurance, pollution)
- Achievement unlocks
- Booking confirmations
- Icon-based categorization
- Date and message display

### 12. Marketplace (`/marketplace`)
- Spare parts catalog
- Price display and ratings
- External store links
- Brand information

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS (custom design tokens)
- **Animation:** Framer Motion, GSAP
- **State Management:** React Hooks, Context API
- **Backend:** Supabase (auth/database placeholders)
- **AI:** Google Gemini API (free tier stub)
- **Maps:** Google Maps API (placeholder for distance calc)
- **Fonts:** Space Grotesk (body), Oxanium (display)

---

## 🚀 Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Environment Variables

Copy \`.env.example\` to \`.env.local\` and fill in your keys:

\`\`\`bash
cp .env.example .env.local
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 4. Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

---

## 📁 Project Structure

\`\`\`
gs-motorx/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Cinematic splash screen
│   │   ├── dashboard/                   # Main dashboard
│   │   ├── predictions/                 # AI predictions page
│   │   ├── profile/                     # User profile & achievements
│   │   ├── leaderboard/                 # Regional rankings
│   │   ├── garages/                     # Garage finder with AI
│   │   ├── vehicles/                    # Vehicle list
│   │   │   └── [id]/                    # Vehicle details (dynamic)
│   │   ├── bookings/                    # Bookings list
│   │   │   └── new/                     # New booking form
│   │   ├── assistant/                   # AI chat assistant
│   │   ├── notifications/               # Notifications & rewards
│   │   ├── marketplace/                 # Spare parts
│   │   └── api/                         # API routes (stubs)
│   ├── components/
│   │   ├── layout/                      # Navbar, ThemeToggle
│   │   └── ui/                          # Reusable components
│   │       ├── glass-card.tsx           # Glassmorphism card
│   │       ├── progress-ring.tsx        # Circular progress
│   │       ├── modal.tsx                # Modal dialog
│   │       ├── badge.tsx                # Achievement badge
│   │       ├── star-rating.tsx          # Star rating display
│   │       └── animated-container.tsx   # Fade-up animation
│   ├── lib/
│   │   ├── utils.ts                     # Utility functions
│   │   ├── ai/                          # AI engines
│   │   │   ├── predictive-maintenance.ts   # Part failure prediction
│   │   │   ├── gamification.ts             # Achievement system
│   │   │   └── garage-recommendations.ts   # Garage matching
│   │   └── data/
│   │       └── mock-data.ts             # Mock database
│   └── types/
│       └── index.ts                     # TypeScript types
├── .env.example                         # Environment template
├── tailwind.config.ts                   # Custom design tokens
└── package.json
\`\`\`

---

## 🧠 AI Systems

### Predictive Maintenance Engine
- Analyzes 13+ critical parts (oil, brakes, battery, etc.)
- Calculates lifespan based on vehicle data
- Considers age factor (5+ years adds weight)
- Generates severity-based recommendations
- Estimates repair costs with confidence scores

### Gamification Engine
- Tracks 12+ achievements across 4 tiers
- Calculates tier progression automatically
- Awards points for actions (services, reviews, referrals)
- Unlock conditions based on user behavior

### Garage Recommendation Engine
- Scores garages on multiple factors:
  - Vehicle type match (40 points)
  - Rating score (0-30 points)
  - Review count/social proof (0-15 points)
  - Verified badge (10 points)
  - Distance proximity (0-5 points)
- Filters by price, distance, rating
- Sorts by composite score

---

## 🎯 Future Enhancements

- [ ] Real Gemini API integration for AI assistant
- [ ] Google Maps integration for garage locations
- [ ] Supabase auth + database for persistence
- [ ] 3D car model viewer (Three.js/React Three Fiber)
- [ ] PWA support with offline mode
- [ ] Push notifications for reminders
- [ ] Referral system with rewards
- [ ] Payment integration for bookings
- [ ] Service provider dashboard
- [ ] Advanced analytics and insights

---

## 📦 Scripts

- \`npm run dev\` – Start dev server
- \`npm run build\` – Build for production  
- \`npm run start\` – Start production server
- \`npm run lint\` – Run ESLint
- \`npm run format\` – Check code formatting
- \`npm run format:write\` – Auto-fix formatting

---

## 🎓 Credits

**Project:** GS MotorX  
**Built with:** Next.js 14, Tailwind CSS, Framer Motion, GSAP  
**Design Inspiration:** Tesla, Apple, BMW automotive UX  
**AI Powered:** Predictive maintenance, smart recommendations, gamification

---

## 📄 License

This project is for educational and demo purposes.

---

**Enjoy the ride! 🚗💨**
