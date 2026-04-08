<div align="center">

# 🎓 FOSSEE Workshop Booking Platform

### A clean, responsive workshop booking interface built with React + Tailwind CSS

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-indigo?style=for-the-badge)](https://fossee-workshop-booking.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)

</div>

---

## ✨ Features

- 🔍 **Live search and filtering** — filter by tool category, sort by date, seats, or name
- 📋 **Workshop detail pages** — instructor, prerequisites, topics, seat availability
- 📝 **Booking form with validation** — full client-side validation with real-time feedback
- ✅ **Booking confirmation** — booking ID, calendar export (.ics), copy-to-clipboard
- 📁 **My Bookings** — view and cancel confirmed registrations
- 🔔 **Toast notifications** — custom animated feedback system
- 📱 **Fully responsive** — mobile-first layout, touch-friendly targets
- ⚡ **Skeleton loading** — shimmer states for perceived performance
- 💾 **localStorage persistence** — bookings survive page refresh

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Build tool |
| Tailwind CSS | 4 | Styling |
| React Router DOM | 7 | Client-side routing |
| nanoid | 5 | Unique booking IDs |

---

## 🚀 Getting Started

```bash
git clone https://github.com/tanmay-alpha/fossee-workshop-booking
cd fossee-workshop-booking
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── shared/        # ErrorBoundary, Toast
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── WorkshopCard.jsx
├── context/
│   └── AppContext.jsx  # Global state (bookings, seats, user)
├── data/
│   └── workshops.js   # Catalog of 12 workshops
├── hooks/
│   ├── useAnalytics.js
│   └── useToast.js
├── pages/
│   ├── HomePage.jsx
│   ├── WorkshopsPage.jsx
│   ├── WorkshopDetailPage.jsx
│   ├── BookingPage.jsx
│   ├── BookingSuccessPage.jsx
│   ├── MyBookingsPage.jsx
│   └── NotFoundPage.jsx
├── utils/
│   ├── calendarExport.js
│   ├── storage.js
│   └── workshopHelpers.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🗺️ User Flow

```
Home → Browse Workshops → Workshop Detail → Book → Booking Success → My Bookings
```

---

Built for FOSSEE Summer Fellowship 2026 — IIT Bombay
