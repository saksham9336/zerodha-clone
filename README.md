# TradeVista — Full Stack Trading Platform

A full-stack investment & trading platform built with the MERN stack, featuring a marketing website, a secure authentication system, and a fully functional trading dashboard with real-time-style market simulation.

🔗 **Live Demo:** 
---

## Overview

This project replicates Zerodha's product ecosystem across three independent applications working together:

- **Frontend** — Marketing/landing website (Home, About, Products, Pricing, Support, Login, Signup)
- **Dashboard** — The trading terminal (Watchlist, Orders, Holdings, Positions, Funds)
- **Backend** — REST API powering authentication, orders, holdings, positions, and funds management

---

## Features

### Authentication
- Secure signup and login with JWT-based authentication
- Passwords hashed using bcrypt
- Forgot password / reset password flow
- Protected dashboard routes — unauthenticated users are redirected to login
- Persistent sessions using token-based auth passed securely between subdomains

### Trading Dashboard
- Live-style watchlist with Buy/Sell order actions
- Real-time order placement, stored per authenticated user
- Holdings page with P&L calculation, current value, and investment summary
- Positions page with live profit/loss tracking
- Order history with timestamps and Buy/Sell indicators
- Funds management — Add Funds, Withdraw Funds, and Open Commodity Account flows backed by a real funds API
- Dynamic, fluctuating NIFTY 50 / SENSEX ticker for a realistic market feel
- Clean profile dropdown with logout

### Marketing Site
- Zerodha-inspired landing pages: Home, About, Products, Pricing, Support
- Fully wired navigation and CTAs (Signup buttons across multiple pages all route correctly)
- Responsive Navbar with Login/Signup actions styled to match Zerodha's design language

---

## Tech Stack

**Frontend & Dashboard**
- React.js (Create React App)
- React Router v6
- Axios
- Chart.js / Recharts (for holdings visualization)
- Material UI (icons & tooltips)

**Backend**
- Node.js + Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt.js for password hashing
- CORS, dotenv, body-parser

**Database**
- MongoDB Atlas (cloud-hosted)

---

## Project Structure

```
zerodha-clone/
├── frontend/          # Marketing website (Home, Login, Signup, About, Products, Pricing, Support)
│   └── src/
│       ├── landing_page/
│       ├── Navbar.js
│       └── Footer.js
│
├── dashboard/         # Trading dashboard
│   └── src/
│       └── components/
│           ├── WatchList.js
│           ├── Orders.js
│           ├── Holdings.js
│           ├── Positions.js
│           ├── Funds.js
│           ├── Menu.js
│           └── TopBar.js
│
└── backend/           # REST API
    ├── model/
    ├── schemas/
    ├── routes/
    │   ├── auth.js
    │   └── funds.js
    ├── middleware/
    │   └── authMiddleware.js
    └── index.js
```

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/saksham9336/zerodha-clone.git
cd zerodha-clone
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3002
```

Start the backend:
```bash
node index.js
```
Backend runs on `http://localhost:3002`

### 3. Frontend Setup (Marketing site)
```bash
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000`

### 4. Dashboard Setup (Trading terminal)
```bash
cd dashboard
npm install
npm start
```
Dashboard runs on `http://localhost:3001`

> **Note:** All three apps run independently and must be started separately for the full flow (Signup → Login → Dashboard) to work.

---

## API Endpoints

| Method | Endpoint                | Description                          | Auth Required |
|--------|--------------------------|---------------------------------------|----------------|
| POST   | `/auth/signup`            | Register a new user                  | No             |
| POST   | `/auth/login`              | Login and receive JWT token          | No             |
| POST   | `/auth/reset-password`     | Reset password by email              | No             |
| GET    | `/allHoldings`             | Fetch all holdings                   | No             |
| GET    | `/allPositions`            | Fetch all positions                  | No             |
| POST   | `/newOrder`                | Place a new Buy/Sell order           | Yes            |
| GET    | `/allOrders`                | Fetch orders for logged-in user      | Yes            |
| GET    | `/funds`                    | Get available/used margin            | Yes            |
| POST   | `/funds/add`                | Add funds to account                 | Yes            |
| POST   | `/funds/withdraw`           | Withdraw funds from account          | Yes            |

---

## Key Highlights for Recruiters

- Built a complete **authentication system** from scratch (JWT, bcrypt, protected routes, password reset)
- Designed and implemented a **multi-app architecture** — separate frontend, dashboard, and backend communicating via REST APIs
- Implemented **real CRUD operations** for orders, funds, and user data — not static mock data
- Solved real-world cross-origin/session challenges (passing auth tokens across different ports/subdomains)
- Debugged and fixed schema mismatches, broken UI flows, and React state management issues across the full stack
- Polished UI/UX to closely match a production fintech product (Zerodha)

---

## Future Improvements

- Integrate a live stock market data API for real NIFTY/SENSEX prices
- Add email-based OTP verification for password reset
- Add charting library for candlestick/technical analysis on individual stocks
- Deploy frontend, dashboard, and backend to production (Vercel/Render)
- Add unit and integration tests

---

## Author

**Saksham singh**
GitHub: [@saksham9336](https://github.com/saksham9336)