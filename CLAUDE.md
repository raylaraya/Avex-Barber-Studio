# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Avex Barber Studio is a full-stack barbershop booking web app. The frontend is a React SPA (Vite) and the backend is an Express/Node.js API with MongoDB via Mongoose. They are deployed together on Heroku — the Express server serves the built React app from `client/dist`.

## Commands

### Root (manages deployment build)
```bash
npm start                  # Start the Express server (production)
npm run build              # Build the React client
```

### Client (React frontend) — run from `client/`
```bash
npm run dev                # Start Vite dev server at http://localhost:5173
npm run build              # Build for production into client/dist
npm run lint               # Run ESLint (zero warnings allowed)
npm run preview            # Preview the production build
```

### Server (Express backend) — run from root
```bash
node server/index.js       # Start the API server at http://localhost:3001
```

### Local development
Run both concurrently: start the Express server (`node server/index.js`) and the Vite dev server (`npm run dev` in `client/`). The Vite dev server proxies API calls since `VITE_API_URL` is set in the client's `.env`.

## Environment Variables

**Server** (`.env` in root):
- `MONGO_URL` — MongoDB connection string
- `JWT` — JWT secret
- `PORT` — defaults to 3001

**Client** (`client/.env`):
- `VITE_API_URL` — base URL for API calls (e.g., `http://localhost:3001`)

## Architecture

### Server (`server/`)
Follows a standard MVC pattern:
- `index.js` — Express app setup, MongoDB connection, middleware stack (helmet, cors, morgan, cookie-parser), route mounting, and static file serving
- `routes/` — Route definitions: `auth.js`, `users.js`, `appointments.js`
- `controllers/` — Business logic: `auth.js`, `users.js`, `appointments.js`
- `models/` — Mongoose schemas: `user.js` (User), `appointment.js` (Appointment + TimeSlot)
- `middleware/auth.js` — JWT middleware: `verifyToken`, `verifyUser`, `verifyEmployee`
- `middleware/error.js` — Error factory helper

Authentication uses HTTP-only cookies storing a JWT (`access_token`). Two user roles exist: `client` and `employee`. Employees get access to booked time slot endpoints that clients cannot access.

The `TimeSlot` model is separate from `Appointment` — a time slot tracks `isBooked` and links to an `Appointment` document when booked.

### Client (`client/src/`)
- `App.jsx` — React Router v6 route definitions, wrapped in `AuthProvider`
- `context/AuthContext.jsx` — Global auth state via React Context. Exposes `user`, `login()`, `logout()`, `setUser`. On load, calls `GET /users/verify` to restore session from cookie.
- `pages/` — Page-level components (one per route)
- `components/` — Reusable UI components, co-located with their CSS files

Key pages:
- `/` — Home
- `/appointments` — Appointment listing
- `/appointments/book` — Booking flow
- `/appointments/viewbookings` — View the user's booked appointments
- `/login`, `/signup` — Auth pages

All API calls use `axios` with `withCredentials: true` to send the auth cookie. The API base URL comes from `import.meta.env.VITE_API_URL`.
