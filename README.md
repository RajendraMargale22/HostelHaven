# HostelHaven

> A full-stack student accommodation platform for Pune — find, list, and book verified hostels and PGs.

![HostelHaven](https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80)

---

## Live Demo

| Service | URL |
|---|---|
| Frontend | [hostel-haven-blush.vercel.app](https://hostel-haven-blush.vercel.app/) |
| Backend API | [hostelhaven-backend.onrender.com](https://hostelhaven-backend.onrender.com) |

---

## Features

**For Students**
- Browse verified hostels with filters — location, price range, type (boys / girls / co-ed)
- View hostel details with photo gallery, amenities, and Google Maps link
- Create a free account and submit booking requests
- Track your bookings

**For Hostel Owners**
- List your hostel with photos, amenities, and pricing
- Edit or remove your own listing

**For Admins**
- Dashboard with live stats — total users, hostels, bookings, pending requests
- Confirm or reject bookings
- View and manage contact form messages
- Delete users and listings

---

## Tech Stack

### Frontend
| | |
|---|---|
| Framework | [React 18](https://react.dev) |
| Build | [Vite 5](https://vitejs.dev) |
| Routing | [React Router v6](https://reactrouter.com) |
| HTTP | [Axios](https://axios-http.com) |
| Slider | [Swiper.js](https://swiperjs.com) |
| Datepicker | [Flatpickr](https://flatpickr.js.org) |
| Icons | [Font Awesome 6](https://fontawesome.com) |
| Hosting | [Vercel](https://vercel.com) |

### Backend
| | |
|---|---|
| Runtime | [Node.js](https://nodejs.org) 18+ |
| Framework | [Express.js](https://expressjs.com) |
| Database | [MongoDB Atlas](https://cloud.mongodb.com) |
| ODM | [Mongoose](https://mongoosejs.com) |
| Auth | JWT + bcryptjs |
| Email | [Nodemailer](https://nodemailer.com) + [Brevo](https://www.brevo.com) |
| Hosting | [Render](https://render.com) |

---

## Project Structure

```
hostelhaven/
├── backend/                  ← Express + MongoDB API
│   ├── config/db.js
│   ├── controllers/          ← Business logic (MNC pattern)
│   ├── middleware/            ← Auth guard, error handler
│   ├── models/               ← Mongoose schemas
│   ├── routes/               ← Thin route files
│   ├── utils/sendEmail.js
│   ├── seed.js
│   └── server.js
│
├── frontend/                 ← React + Vite SPA
│   ├── public/               ← favicon.svg, logo.svg
│   └── src/
│       ├── api/              ← Axios instance + per-resource files
│       ├── components/       ← layout/, ui/, auth/, hostel/, booking/, home/
│       ├── context/          ← AuthContext, ToastContext
│       ├── hooks/            ← useAuth, useToast, useHostels
│       ├── pages/            ← HomePage, HostelsPage, HostelDetailPage, AdminPage
│       ├── styles/           ← CSS design tokens + per-feature styles
│       └── utils/            ← constants, formatters, fallbackData
│
├── .gitignore
├── render.yaml               ← Render auto-deploy config
└── README.md
```

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org) v18 or higher
- [MongoDB Atlas](https://cloud.mongodb.com) free cluster
- [Brevo](https://www.brevo.com) free account (for email)

### 1. Clone the repository
```bash
git clone https://github.com/RajendraMargale22/HostelHaven
cd hostelhaven
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# Open .env and fill in MONGO_URI, JWT_SECRET, and email credentials
npm run seed      # optional — adds 9 sample hostels
npm run dev       # starts on http://localhost:5000
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
cp .env.example .env
# VITE_API_URL is only needed for production — leave empty for local dev
npm run dev       # starts on http://localhost:3000
```

Both servers must be running simultaneously. Vite proxies all `/api` requests to port 5000 automatically.

---

## Deployment

### Deploy Backend to Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set **Root Directory** to `backend`
5. **Build Command:** `npm install`
6. **Start Command:** `npm start`
7. Add environment variables (see `backend/.env.example`)
8. Deploy — copy the generated URL

> The `render.yaml` at the project root pre-fills most of this configuration automatically.

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. **Framework Preset:** Vite
5. Add environment variable:
   - `VITE_API_URL` = `https://your-render-app.onrender.com/api`
6. Deploy

> `frontend/vercel.json` ensures all routes (e.g. `/hostels/123`) resolve correctly as a SPA.

### After Deploying Both

Update `server.js` CORS config to include your Vercel URL:
```js
origin: [
  'http://localhost:3000',
  'https://your-app.vercel.app',   // ← add this
],
```

---

## Creating an Admin Account

1. Register normally through the app
2. Open [MongoDB Atlas](https://cloud.mongodb.com) → your cluster → Collections → `users`
3. Find your user and update `role` from `"user"` to `"admin"`
4. Log out and log back in — the Admin Panel link will appear in the navbar

---

## API Reference

Full API documentation lives in the [backend README](./backend/README.md).

Quick reference:

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/hostels
GET    /api/hostels/:id
POST   /api/hostels              (auth)
PUT    /api/hostels/:id          (owner/admin)
DELETE /api/hostels/:id          (owner/admin)

POST   /api/bookings             (auth)
GET    /api/bookings/my          (auth)
PATCH  /api/bookings/:id/cancel  (auth)

POST   /api/contact

GET    /api/admin/stats          (admin)
GET    /api/admin/bookings       (admin)
PATCH  /api/admin/bookings/:id/status  (admin)
GET    /api/admin/contacts       (admin)
```

---

## Contributing

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit — `git commit -m "Add your feature"`
4. Push — `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

[MIT](https://opensource.org/licenses/MIT)

---

## Author

Built by a student, for students. If this project helped you, leave a ⭐ on [GitHub](https://github.com/RajendraMargale22/HostelHaven).