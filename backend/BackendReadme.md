# HostelHaven — Backend API

Node.js + Express + MongoDB REST API for the HostelHaven student accommodation platform.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | [Node.js](https://nodejs.org) v18+ |
| Framework | [Express.js](https://expressjs.com) v4 |
| Database | [MongoDB Atlas](https://cloud.mongodb.com) via [Mongoose](https://mongoosejs.com) |
| Auth | [JWT](https://jwt.io) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| Email | [Nodemailer](https://nodemailer.com) + [Brevo SMTP](https://www.brevo.com) |
| Validation | [express-validator](https://express-validator.github.io) |

---

## Architecture — MNC Pattern

```
backend/
├── config/
│   └── db.js                 ← MongoDB connection
├── controllers/
│   ├── authController.js     ← Register, login logic
│   ├── hostelController.js   ← CRUD for hostels
│   ├── bookingController.js  ← Booking lifecycle
│   ├── contactController.js  ← Contact form + email
│   └── adminController.js    ← Stats, user/booking management
├── middleware/
│   ├── authMiddleware.js     ← JWT protect + adminOnly guards
│   └── errorHandler.js       ← Centralized error handling
├── models/
│   ├── User.js
│   ├── Hostel.js
│   ├── Booking.js
│   └── Contact.js
├── routes/
│   ├── auth.js               ← POST /api/auth/register|login
│   ├── hostels.js            ← GET|POST|PUT|DELETE /api/hostels
│   ├── bookings.js           ← POST|GET|PATCH /api/bookings
│   ├── contact.js            ← POST /api/contact
│   └── admin.js              ← GET|PATCH|DELETE /api/admin/*
├── utils/
│   └── sendEmail.js          ← Brevo SMTP wrapper
├── .env.example
├── seed.js                   ← Seed 9 sample hostels
└── server.js
```

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login, returns JWT |

### Hostels
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/hostels` | Public | List all (supports `?location`, `?type`, `?minPrice`, `?maxPrice`) |
| GET | `/api/hostels/:id` | Public | Single hostel |
| POST | `/api/hostels` | Auth | Create listing |
| PUT | `/api/hostels/:id` | Owner/Admin | Update listing |
| DELETE | `/api/hostels/:id` | Owner/Admin | Delete listing |

### Bookings
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/bookings` | Auth | Create booking |
| GET | `/api/bookings/my` | Auth | My bookings |
| PATCH | `/api/bookings/:id/cancel` | Owner | Cancel booking |
| DELETE | `/api/bookings/:id` | Admin | Hard delete |

### Contact
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/contact` | Public | Submit message (saves to DB + sends email) |

### Admin (all require admin JWT)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/stats` | Dashboard counts |
| GET | `/api/admin/users` | All users |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/bookings` | All bookings |
| PATCH | `/api/admin/bookings/:id/status` | Update booking status |
| GET | `/api/admin/contacts` | All messages |
| PATCH | `/api/admin/contacts/:id/read` | Mark as read |
| DELETE | `/api/admin/contacts/:id` | Delete message |

---

## Local Setup

**1. Clone and install**
```bash
cd backend
npm install
```

**2. Environment variables**
```bash
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, email credentials
```

**3. Seed sample data (optional)**
```bash
npm run seed
```

**4. Start development server**
```bash
npm run dev
# API running at http://localhost:5000
```

**5. Health check**
```
GET http://localhost:5000/api/health
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default 5000) |
| `NODE_ENV` | No | `development` or `production` |
| `MONGO_URI` | **Yes** | MongoDB Atlas connection string |
| `JWT_SECRET` | **Yes** | Secret for signing JWT tokens |
| `ADMIN_EMAIL` | Yes | Receives contact form emails |
| `EMAIL_USER` | Yes | Brevo SMTP login |
| `EMAIL_PASS` | Yes | Brevo SMTP password |
| `CLIENT_URL` | Yes | Frontend URL for CORS |

---

## Deploying to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo, set **Root Directory** to `backend`
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. Add all environment variables from `.env.example` in the Render dashboard
7. Copy your Render URL and add it to the frontend's `VITE_API_URL`

> The `render.yaml` in the project root automates this configuration.

---

## Creating an Admin User

After registering a normal user, open MongoDB Atlas and manually update that user's `role` field from `"user"` to `"admin"`.

```js
// In MongoDB Atlas Data Explorer or Compass
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```