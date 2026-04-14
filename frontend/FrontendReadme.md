# HostelHaven — Frontend

React + Vite frontend for the HostelHaven student accommodation platform.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev) |
| Build Tool | [Vite 5](https://vitejs.dev) |
| Routing | [React Router v6](https://reactrouter.com) |
| HTTP Client | [Axios](https://axios-http.com) |
| Slider | [Swiper.js](https://swiperjs.com) |
| Date Picker | [Flatpickr](https://flatpickr.js.org) |
| Icons | [Font Awesome 6](https://fontawesome.com) |
| Fonts | [Outfit + DM Sans](https://fonts.google.com) via Google Fonts |

---

## Project Structure

```
frontend/
├── public/
│   ├── favicon.svg
│   └── logo.svg
├── src/
│   ├── api/                    ← One file per API resource
│   │   ├── index.js            ← Axios instance + JWT interceptor
│   │   ├── authApi.js
│   │   ├── hostelApi.js
│   │   ├── bookingApi.js
│   │   ├── contactApi.js
│   │   └── adminApi.js
│   ├── components/
│   │   ├── auth/               ← AuthModal, AddHostelModal
│   │   ├── booking/            ← BookingForm, BookingCard
│   │   ├── home/               ← HeroSection, SearchBox, etc.
│   │   ├── hostel/             ← HostelCard, HostelGrid, AmenityChip
│   │   ├── layout/             ← Navbar, Footer, PageWrapper, ScrollToTop
│   │   └── ui/                 ← Button, Badge, Modal, Spinner, EmptyState, Toast
│   ├── context/
│   │   ├── AuthContext.jsx     ← Global auth state
│   │   └── ToastContext.jsx    ← Global toast notifications
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useToast.js
│   │   └── useHostels.js       ← Fetch + filter + sort logic
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HostelsPage.jsx
│   │   ├── HostelDetailPage.jsx
│   │   ├── AdminPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── styles/                 ← CSS per feature area
│   ├── utils/
│   │   ├── constants.js        ← All app-wide constants
│   │   ├── formatters.js       ← formatPrice, formatDate, etc.
│   │   └── fallbackData.js     ← Offline fallback hostel data
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx              ← All route definitions
├── index.html
├── vite.config.js
├── vercel.json
└── .env.example
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Hero, search, featured hostels, why us, gallery, about, contact |
| `/hostels` | HostelsPage | Filter sidebar + full hostel grid |
| `/hostels/:id` | HostelDetailPage | Photo swiper, amenities, booking form |
| `/admin` | AdminPage | Protected dashboard — stats, bookings, users, messages |
| `*` | NotFoundPage | 404 fallback |

---

## Local Setup

**1. Install dependencies**
```bash
cd frontend
npm install
```

**2. Environment variables**
```bash
cp .env.example .env
# For local dev the Vite proxy handles /api → localhost:5000
# Only set VITE_API_URL when deploying to Vercel
```

**3. Start dev server**
```bash
npm run dev
# App running at http://localhost:3000
```

> The Vite proxy automatically forwards `/api/*` requests to `http://localhost:5000` during development, so you don't need CORS configuration locally.

**4. Build for production**
```bash
npm run build
# Output in dist/
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Production only | Full backend URL e.g. `https://your-app.onrender.com/api` |

---

## Deploying to Vercel

**Option A — Vercel CLI**
```bash
npm install -g vercel
cd frontend
vercel
```

**Option B — Vercel Dashboard**
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo, set **Root Directory** to `frontend`
4. **Framework Preset:** Vite
5. Add environment variable: `VITE_API_URL` = your Render backend URL
6. Deploy

> The `vercel.json` in the frontend folder handles SPA routing so `/hostels/123` and other deep routes work correctly after deploy.

---

## Key Design Decisions

**Axios interceptor** — The instance in `src/api/index.js` automatically attaches the JWT `Authorization` header to every request. You never need to pass tokens manually.

**Fallback data** — Every API call has a catch block that falls back to `utils/fallbackData.js`. The app works even when the backend is cold-starting on Render.

**Context + Hooks** — `useAuth` and `useToast` are imported from `hooks/` not directly from `context/`. This keeps component imports clean and makes the context location transparent.

**CSS architecture** — No CSS framework. Pure custom CSS with design tokens in `variables.css`. Each page/feature has its own CSS file imported only where needed.