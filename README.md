# Whisper 🤫

> **Anonymous task delegation — your voice, handled for you.**

Whisper is a community platform where anyone can post tasks that require phone calls, difficult emails, or negotiations — and have them handled by community helpers, completely anonymously.

---

## ✨ Features

- **100% Anonymous** — no real names, emails, or phone numbers ever shared
- **4 Task Categories** — Negotiator, Secretary, Researcher, Wordsmith
- **Multi-Step Task Posting** — guided 5-step form with validation
- **Secure Anonymous Chat** — real-time chat between requester and helper (Socket.io)
- **Proof of Completion** — helpers submit screenshot, summary, or transcript
- **Rating System** — 5-star ratings with emoji feedback after task completion
- **Persistent State** — tasks and messages survive page refresh (localStorage)
- **Filter & Sort** — category filter chips and sort by newest/oldest

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 19 + Vite                   |
| Styling    | Tailwind CSS v4 + framer-motion   |
| State      | Zustand (with persist middleware) |
| Routing    | React Router v7                   |
| Icons      | Lucide React                      |
| Backend    | Express + Socket.io               |
| Database   | SQLite (via db.js)                |

---

## 🚀 Getting Started

### Frontend

```bash
# From the project root
npm install
npm run dev
```

The frontend runs at **http://localhost:5173**

### Backend (optional — for real-time chat)

```bash
cd server
npm install
cp .env.example .env   # add your config
node index.js
```

The server runs at **http://localhost:5000**

---

## 📁 Project Structure

```
whisper/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav with mode toggle & task badge
│   │   ├── Layout.jsx          # Page wrapper with Navbar + Outlet
│   │   ├── WhisperLogo.jsx     # Animated SVG logo
│   │   ├── StepIndicator.jsx   # Multi-step progress bar
│   │   ├── RatingWidget.jsx    # 5-star rating component
│   │   ├── TaskCard.jsx        # Reusable task card
│   │   └── EmptyState.jsx      # Generic empty state UI
│   ├── pages/
│   │   ├── Landing.jsx         # Hero + category cards + how it works
│   │   ├── PostTask.jsx        # 5-step task creation wizard
│   │   ├── HelperDashboard.jsx # Task list with filters & sorting
│   │   └── TaskView.jsx        # Task detail + chat + proof + rating
│   ├── store/
│   │   └── useStore.js         # Zustand store (tasks, messages, ratings)
│   └── lib/
│       ├── cn.js               # clsx + tailwind-merge helper
│       └── utils.js            # formatRelativeTime, generateAlias, truncate
├── server/
│   ├── routes/                 # Express route handlers
│   ├── db/                     # SQLite database
│   └── index.js                # Express + Socket.io server
└── tailwind.config.js          # Full custom design system
```

---

## 🎨 Design System

Custom Tailwind tokens:

- **Primary** (teal): `#1D9E75` (full 50–900 palette)
- **Accent** (purple): `#534AB7` (full 50–900 palette)
- **Warning** (amber): `#F59E0B`
- **Font**: Inter (400–700)
- **Animations**: float, breath, fadeInUp, pulse-slow

---

## 📄 License

MIT
