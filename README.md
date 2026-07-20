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

---

## 🗄️ Backend API Reference

The Express server runs on **http://localhost:5000** and exposes a REST API backed by PostgreSQL (via Neon).

### Authentication — `/api/auth`

| Method | Endpoint       | Auth | Description                               |
|--------|----------------|------|-------------------------------------------|
| POST   | `/signup`      | —    | Create account (`email`, `password`, `alias`). Password ≥ 6 chars. |
| POST   | `/login`       | —    | Authenticate and receive JWT token.       |

All protected routes require `Authorization: Bearer <token>`.

### Tasks — `/api/tasks`

| Method | Endpoint           | Auth | Description                                          |
|--------|--------------------|------|------------------------------------------------------|
| GET    | `/`                | —    | Retrieve all tasks (newest first).                   |
| GET    | `/:id`             | —    | Retrieve a single task by ID.                        |
| POST   | `/`                | ✅   | Create task (`category`, `description`, `proof_type`, `alias`, `script`). |
| PATCH  | `/:id/claim`       | ✅   | Claim an open task. Rejects non-open tasks (409).    |
| PATCH  | `/:id/proof`       | ✅   | Submit proof on a claimed task. Rejects otherwise.   |
| PATCH  | `/:id/accept`      | ✅   | Accept a completed task. Rejects otherwise.          |

**Valid categories:** `negotiator`, `secretary`, `researcher`, `wordsmith`  
**Valid proof types:** `screenshot`, `summary`, `transcript`

### Messages — `/api/messages`

| Method | Endpoint       | Auth | Description                                   |
|--------|----------------|------|-----------------------------------------------|
| GET    | `/:taskId`     | ✅   | Retrieve all messages for a task (chronological). |
| POST   | `/`            | ✅   | Send a message (`task_id`, `sender_role`, `text`). |

### Ratings — `/api/ratings`

| Method | Endpoint             | Auth | Description                                 |
|--------|----------------------|------|---------------------------------------------|
| POST   | `/`                  | ✅   | Submit a rating (`task_id`, `helper_id`, `rating` 1-5, `review`). |
| GET    | `/helper/:helperId`  | —    | Get average rating and total count for a helper. |

---

## 🧪 Running Tests

The project uses Node's built-in test runner — **no external test framework required**.

### Frontend Tests

```bash
# From project root

# All utils helpers (formatRelativeTime, truncate, generateAlias)
node --test src/lib/utils.test.js

# Class-merging cn() helper
node --test src/lib/cn.test.js

# Zustand store action logic (tasks, messages, ratings, viewMode)
node --test src/store/useStore.test.js

# Run all frontend tests at once
node --test src/lib/utils.test.js src/lib/cn.test.js src/store/useStore.test.js
```

### Backend Tests

```bash
# From project root

# JWT auth middleware (valid, expired, wrong secret, missing token)
node --test server/tests/auth.test.js

# Auth route logic (signup + login validation)
node --test server/tests/routes/auth.test.js

# Task CRUD + state transition handlers
node --test server/tests/routes/tasks.test.js

# Message route handlers
node --test server/tests/routes/messages.test.js

# Ratings route handlers
node --test server/tests/routes/ratings.test.js

# Run all backend tests at once
node --test server/tests/auth.test.js server/tests/routes/auth.test.js server/tests/routes/tasks.test.js server/tests/routes/messages.test.js server/tests/routes/ratings.test.js
```

### Test Coverage Summary

| Suite                         | Tests |
|-------------------------------|-------|
| `utils.test.js`               | 18    |
| `cn.test.js`                  | 12    |
| `useStore.test.js`            | 26    |
| `server/tests/auth.test.js`   | 5     |
| `routes/auth.test.js`         | 10    |
| `routes/tasks.test.js`        | 17    |
| `routes/messages.test.js`     | 8     |
| `routes/ratings.test.js`      | 11    |
| **Total**                     | **107** |

---

## 🗃️ Database Schema

```sql
users       (id, alias, email, password, created_at)
tasks       (id, user_id, category, description, script, proof_type, alias, status, proof, helper_id, created_at)
messages    (id, task_id, sender_id, sender_role, text, created_at)
ratings     (id, task_id, helper_id, rating, review, created_at)
```

To initialise the schema on a fresh database:

```bash
cd server
node db/init.js
```

---

## 📄 License

MIT
