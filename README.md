# Whisper 🤫

**An anonymous task-relay platform for introverts and socially anxious users.**

Whisper lets people post tasks they find socially uncomfortable — negotiating with a landlord, booking an appointment, or drafting a difficult email — and volunteer Helpers pick them up and complete it on their behalf, fully anonymously.

---

## 💡 What Problem Does It Solve?

Many people avoid tasks that require awkward conversations, phone calls, or confrontations. Whisper removes that barrier by connecting **Requesters** (people who need help) with **Helpers** (volunteers willing to act on their behalf), while keeping both sides anonymous throughout.

---

## ✨ Features

### 🎭 Dual Roles
- Switch between **Requester Mode** and **Helper Mode** from the navbar
- Each mode shows a tailored experience and navigation

### 📋 4 Task Categories
| Category | What it covers |
|----------|---------------|
| **The Negotiator** | Calls to landlords, billing departments, dispute resolution |
| **The Secretary** | Booking appointments, reservations, joining waitlists |
| **The Researcher** | Quick informational calls — stock checks, business hours |
| **The Wordsmith** | Drafting difficult emails, formal complaints, awkward follow-ups |

### 📝 5-Step Task Posting Wizard
1. Choose a category
2. Describe the task in plain language
3. Optionally provide a script for the Helper to follow
4. Choose proof of completion type (Screenshot / Written Summary / Full Transcript)
5. Pick an anonymous alias (auto-generated or custom)

### 🔒 Anonymous Chat
- Secure in-app chat unlocks once a Helper claims the task
- Identities shown only as **"The Initiator"** and **"The Helper"**
- Chat closes automatically after task completion

### ✅ Proof & Completion Flow
- Helper submits proof based on the Requester's chosen format
- Requester reviews and clicks **Accept & Complete** to close the task
- Task status tracks through: `Open → Claimed → Completed → Accepted`

### 🗂️ Helper Dashboard
- Browse all open tasks in a card grid
- See task category, description preview, and alias
- Click through to view full task details and claim

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Bundler | Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State Management | Zustand |
| Routing | React Router DOM v7 |
| Icons | Lucide React |

> **Note:** This is a frontend-only build. All state is managed in-memory via Zustand — no backend or database is connected. Designed as a UI/UX prototype demonstrating the full user flow.

---

## 📁 Project Structure

```
whisper/
├── public/
└── src/
    ├── assets/
    ├── components/
    │   ├── Layout.jsx        # App shell with Navbar + Outlet
    │   ├── Navbar.jsx        # Sticky nav with role toggle
    │   └── WhisperLogo.jsx   # Custom SVG logo
    ├── pages/
    │   ├── Landing.jsx          # Hero + category showcase
    │   ├── PostTask.jsx         # 5-step task posting wizard
    │   ├── TaskView.jsx         # Task detail, chat, proof flow
    │   └── HelperDashboard.jsx  # Browse & claim open tasks
    ├── store/
    │   └── useStore.js       # Zustand global state
    ├── App.jsx
    └── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/ananthan-bot/whisper.git
cd whisper
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Try the Demo Flow
1. Click **Post a task** → go through the 5-step wizard → submit
2. Switch to **Helper Mode** from the navbar
3. Click **View Tasks** → open a task → click **Claim Task**
4. Chat anonymously → submit proof → Requester accepts

---

## 🔮 Future Scope

- Backend integration with Node.js/Express + PostgreSQL
- Real-time WebSocket chat
- Helper rating & trust system
- AI-powered script suggestions for Requesters

---

## 👤 Author

Built by [Ananthan](https://github.com/ananthan-bot)

## 📄 License

MIT
