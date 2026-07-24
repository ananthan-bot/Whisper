import { Link, useNavigate } from 'react-router-dom';
import {
  motion, useInView, AnimatePresence,
  useMotionValue, useSpring, useTransform,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight, Sparkles, Shield, Zap, Star,
  Lock, FileText, Search, PenTool,
  LogOut, User, Menu, X, ChevronRight,
  Phone, Mail, Clock, CheckCircle2,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/cn';
import { categories } from '../lib/categories';
import WhisperLogo from '../components/WhisperLogo';
import NotificationCenter from '../components/NotificationCenter';
import UserProfileModal from '../components/UserProfileModal';

/* ─────────────────────────────────────────────
   Reusable scroll-reveal wrapper
───────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   🧲 SURPRISE #1 — Magnetic Button
   The button physically leans toward the cursor
───────────────────────────────────────────── */
function MagneticButton({ children, className, onClick, id, strength = 0.35 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   📊 SURPRISE #2 — Animated Count-Up Stat
   Numbers tick up from 0 when entering viewport
───────────────────────────────────────────── */
function CountUp({ target, suffix = '', prefix = '', duration = 1.6 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const isFloat = String(target).includes('.');
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    if (isNaN(numeric)) return;

    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = eased * numeric;
      setDisplayed(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayed}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   👻 SURPRISE #3 — Floating Ghost Whisper Cards
   Translucent task previews drift through the hero
───────────────────────────────────────────── */
const GHOST_TASKS = [
  { icon: Phone,        text: 'Call landlord about deposit refund',     tag: 'Negotiator', color: 'text-emerald-600', bg: 'bg-emerald-50',   border: 'border-emerald-200' },
  { icon: Mail,         text: 'Draft formal complaint to airline',       tag: 'Wordsmith',  color: 'text-pink-600',    bg: 'bg-pink-50',      border: 'border-pink-200'   },
  { icon: Clock,        text: 'Book eye doctor appointment for Friday',  tag: 'Secretary',  color: 'text-violet-600',  bg: 'bg-violet-50',    border: 'border-violet-200' },
  { icon: Search,       text: 'Check if pharmacy has my prescription',   tag: 'Researcher', color: 'text-amber-600',   bg: 'bg-amber-50',     border: 'border-amber-200'  },
  { icon: CheckCircle2, text: 'Negotiate lower rate with ISP',           tag: 'Negotiator', color: 'text-emerald-600', bg: 'bg-emerald-50',   border: 'border-emerald-200'},
  { icon: Mail,         text: 'Follow up on job application politely',   tag: 'Wordsmith',  color: 'text-pink-600',    bg: 'bg-pink-50',      border: 'border-pink-200'   },
];

// Each card has its own random-ish float path
const FLOAT_CONFIGS = [
  { x: -420, y:  60, delay: 0,    duration: 18 },
  { x:  380, y: 140, delay: 3.5,  duration: 22 },
  { x: -340, y: 280, delay: 7,    duration: 20 },
  { x:  420, y: 320, delay: 1.5,  duration: 25 },
  { x: -260, y: 460, delay: 10,   duration: 19 },
  { x:  300, y: 480, delay: 5,    duration: 21 },
];

function FloatingGhostCard({ task, config, index }) {
  const Icon = task.icon;
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        'absolute pointer-events-none select-none',
        'bg-white/70 backdrop-blur-sm border rounded-2xl px-4 py-3',
        'shadow-[0_4px_24px_rgba(0,0,0,0.06)] w-56',
        task.border,
      )}
      style={{ left: '50%', top: '50%' }}
      initial={{ opacity: 0, x: config.x, y: config.y, rotate: index % 2 === 0 ? -4 : 4 }}
      animate={{
        opacity: [0, 0.72, 0.72, 0],
        x: [config.x, config.x + (index % 2 === 0 ? 14 : -14), config.x],
        y: [config.y, config.y - 22, config.y],
        rotate: index % 2 === 0 ? [-4, -2, -4] : [4, 2, 4],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.15, 0.85, 1],
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center shrink-0', task.bg)}>
          <Icon className={cn('w-3.5 h-3.5', task.color)} />
        </div>
        <span className={cn('text-[10px] font-bold uppercase tracking-wider', task.color)}>{task.tag}</span>
      </div>
      <p className="text-xs text-slate-600 font-medium leading-snug">{task.text}</p>
      <div className="mt-2 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] text-slate-400">Being whispered…</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Animated squiggle underline
───────────────────────────────────────────── */
function Squiggle() {
  return (
    <svg
      className="absolute -bottom-2.5 left-0 w-full overflow-visible"
      viewBox="0 0 320 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.path
        d="M3 10 Q 40 2 80 9 T 160 7 T 240 9 T 317 6"
        stroke="#10b981"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.8, ease: 'easeOut' }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Animated background orbs
───────────────────────────────────────────── */
function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      <motion.div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-20 -right-24 w-[480px] h-[480px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,91,255,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)' }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Inline Navbar (standalone, full-width)
───────────────────────────────────────────── */
function LandingNavbar() {
  const {
    user, logout, tasks, ratings, notifications,
    markNotificationAsRead, markAllNotificationsAsRead, clearNotifications,
  } = useStore();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openTaskCount = tasks.filter((t) => t.status === 'open').length;
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
            : 'bg-white/80 backdrop-blur-md border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <WhisperLogo className="w-8 h-8" />
            </motion.div>
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">
              Whisper
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {user && (
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={markNotificationAsRead}
                onMarkAllAsRead={markAllNotificationsAsRead}
                onClearAll={clearNotifications}
                onNotificationClick={(taskId) => navigate(`/task/${taskId}`)}
              />
            )}
            {user && (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="relative">
                <Link
                  to="/helper"
                  id="nav-view-tasks"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
                >
                  View Tasks
                  {openTaskCount > 0 && (
                    <motion.span
                      key={openTaskCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center justify-center w-5 h-5 bg-emerald-500 text-white text-[10px] font-bold rounded-full"
                    >
                      {openTaskCount > 9 ? '9+' : openTaskCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            )}
            {user && (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/post-task"
                  id="nav-post-task"
                  className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-sm font-semibold shadow-[0_2px_12px_rgba(16,185,129,0.35)] transition-all"
                >
                  Post a task <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            )}
            {user ? (
              <div className="flex items-center gap-2 pl-3 ml-1 border-l border-slate-200">
                <button
                  type="button"
                  id="nav-user-avatar"
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {user.alias ? user.alias.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{user.alias}</span>
                </button>
                <button
                  onClick={handleLogout}
                  id="nav-logout"
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer rounded-full hover:bg-rose-50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 ml-1 border-l border-slate-200">
                <Link to="/login" id="nav-login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100">
                  Log in
                </Link>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link to="/signup" id="nav-signup" className="px-5 py-2 bg-slate-900 hover:bg-slate-700 text-white rounded-full text-sm font-semibold transition-colors">
                    Get started
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          <button
            id="nav-mobile-menu"
            className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-slate-100 bg-white"
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link to="/helper" className="py-2 text-sm font-medium text-slate-700 hover:text-emerald-600" onClick={() => setMobileOpen(false)}>View Tasks</Link>
                    <Link to="/post-task" className="py-2.5 text-center bg-emerald-600 text-white rounded-full text-sm font-semibold" onClick={() => setMobileOpen(false)}>Post a task</Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="py-2 text-sm text-rose-500 font-medium">Log out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="py-2 text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>Log in</Link>
                    <Link to="/signup" className="py-2.5 text-center bg-slate-900 text-white rounded-full text-sm font-semibold" onClick={() => setMobileOpen(false)}>Get started</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {user && (
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          tasks={tasks}
          ratings={ratings}
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   Stats row (count-up on scroll)
───────────────────────────────────────────── */
const STATS = [
  { target: 2400, suffix: '+',  prefix: '',  label: 'tasks whispered' },
  { target: 98,   suffix: '%',  prefix: '',  label: 'satisfaction rate' },
  { target: 1.8,  suffix: 'hrs',prefix: '<', label: 'avg. completion' },
  { target: 100,  suffix: '%',  prefix: '',  label: 'anonymous' },
];

function StatsTicker() {
  return (
    <FadeUp delay={0.45}>
      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-14">
        {STATS.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              <CountUp target={s.target} suffix={s.suffix} prefix={s.prefix} />
            </span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">{s.label}</span>
          </div>
        ))}
      </div>
    </FadeUp>
  );
}

/* ─────────────────────────────────────────────
   Trust bar
───────────────────────────────────────────── */
function TrustBar() {
  const FEATURES = [
    { icon: Shield, label: 'End-to-end anonymity' },
    { icon: Zap,    label: 'Fast turnaround' },
    { icon: Lock,   label: 'Escrow-secured bounties' },
    { icon: Star,   label: '5-star rated helpers' },
  ];
  return (
    <FadeUp delay={0.1} className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        {FEATURES.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full shadow-[0_1px_8px_rgba(0,0,0,0.05)] text-sm font-medium text-slate-600"
          >
            <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
            {label}
          </motion.div>
        ))}
      </div>
    </FadeUp>
  );
}

/* ─────────────────────────────────────────────
   How it works
───────────────────────────────────────────── */
const HOW_IT_WORKS = [
  {
    step: '01', title: 'Post a Task',
    desc: 'Describe what you need done — a call, an email, a negotiation. Stay completely anonymous.',
    gradient: 'from-emerald-50 to-emerald-100/60', border: 'border-emerald-200/60', num: 'text-emerald-600 bg-emerald-100',
  },
  {
    step: '02', title: 'A Helper Claims It',
    desc: 'A vetted community helper picks up your task and connects via secure anonymous chat.',
    gradient: 'from-violet-50 to-violet-100/60', border: 'border-violet-200/60', num: 'text-violet-600 bg-violet-100',
  },
  {
    step: '03', title: 'Done & Delivered',
    desc: 'They submit proof of completion. You review, accept, and rate — all anonymously.',
    gradient: 'from-pink-50 to-pink-100/60', border: 'border-pink-200/60', num: 'text-pink-600 bg-pink-100',
  },
];

function HowItWorks() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-24" aria-labelledby="how-it-works-heading">
      <FadeUp>
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">The Process</span>
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">Three steps to silence</h2>
          <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">No awkward calls. No explaining yourself. Just results, delivered quietly.</p>
        </div>
      </FadeUp>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <div className="hidden md:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-emerald-200 via-violet-200 to-pink-200 z-0" />
        {HOW_IT_WORKS.map((item, i) => (
          <FadeUp key={item.step} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
              className={cn('relative bg-gradient-to-br p-7 rounded-3xl border shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-shadow cursor-default z-10', item.gradient, item.border)}
            >
              <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black mb-5', item.num)}>{item.step}</div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Testimonials
───────────────────────────────────────────── */
const TESTIMONIALS = [
  { quote: "Got my landlord dispute resolved in under 2 hours. Didn't have to say a word.", name: 'quiet_owl_42',  role: 'Requester', avatar: 'Q' },
  { quote: "As a helper, this is the most satisfying side hustle. You actually help people.",  name: 'NightHelper_X', role: 'Helper',    avatar: 'N' },
  { quote: "I have severe phone anxiety. Whisper changed everything for me.",                  name: 'anon_user_99', role: 'Requester', avatar: 'A' },
];

function Testimonials() {
  return (
    <section className="w-full bg-slate-900 py-20 px-4" aria-labelledby="testimonials-heading">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3">Stories</span>
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Quietly loved by thousands</h2>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center text-xs font-bold">{t.avatar}</div>
                  <div>
                    <div className="text-white text-xs font-semibold">{t.name}</div>
                    <div className="text-slate-500 text-[11px]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA Banner (with magnetic buttons)
───────────────────────────────────────────── */
function CTABanner({ onPostTask, onBecomeHelper }) {
  return (
    <section className="w-full px-4 py-20">
      <FadeUp>
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-emerald-50 via-white to-violet-50 border border-emerald-100 rounded-[2.5rem] p-12 shadow-[0_8px_48px_rgba(16,185,129,0.10)]">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl mb-5 inline-block"
          >
            🤫
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Ready to delegate quietly?</h2>
          <p className="text-slate-500 text-base mb-8 max-w-sm mx-auto leading-relaxed">
            Post your first task in under 60 seconds. No account required to browse.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              id="cta-post-task"
              onClick={onPostTask}
              className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.30)] transition-colors"
              strength={0.4}
            >
              Post a task <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              id="cta-become-helper"
              onClick={onBecomeHelper}
              className="flex items-center gap-2 px-8 py-3.5 bg-white text-slate-700 font-semibold rounded-full border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all"
              strength={0.3}
            >
              Become a helper
            </MagneticButton>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <WhisperLogo className="w-5 h-5" />
          <span className="font-semibold text-slate-600">Whisper</span>
          <span>— Anonymous Task Delegation</span>
        </div>
        <span>© {new Date().getFullYear()} Whisper. Made with 🤫</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   MAIN LANDING PAGE
───────────────────────────────────────────── */
export default function Landing() {
  const { setViewMode, tasks } = useStore();
  const navigate = useNavigate();

  const completedCount = tasks.filter((t) => t.status === 'accepted').length;

  const handlePostTask = () => { setViewMode('requester'); navigate('/post-task'); };
  const handleBecomeHelper = () => { setViewMode('helper'); navigate('/helper'); };
  const handleCategoryClick = (categoryId) => { setViewMode('requester'); navigate(`/post-task?category=${categoryId}`); };

  const heroContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const heroItem = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="w-full bg-white min-h-screen font-sans antialiased">
      <LandingNavbar />

      {/* ── HERO ────────────────────────────────── */}
      <section
        className="relative w-full min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <HeroBg />

        {/* 👻 Floating ghost task cards */}
        {GHOST_TASKS.map((task, i) => (
          <FloatingGhostCard key={i} task={task} config={FLOAT_CONFIGS[i]} index={i} />
        ))}

        <motion.div
          className="relative w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          {/* Pill badge */}
          <motion.div variants={heroItem} className="mb-8">
            <motion.span
              id="hero-badge"
              animate={{
                boxShadow: [
                  '0 0 0 0px rgba(16,185,129,0.3)',
                  '0 0 0 10px rgba(16,185,129,0)',
                  '0 0 0 0px rgba(16,185,129,0)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              100% anonymous · no calls required
              {completedCount > 0 && (
                <span className="ml-1 flex items-center gap-1 text-emerald-600 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> {completedCount} whispered ✓
                </span>
              )}
            </motion.span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            variants={heroItem}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.05] mb-6"
          >
            Your voice,
            <br />
            <span className="relative inline-block text-emerald-600">
              handled for you.
              <Squiggle />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={heroItem}
            className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed"
          >
            A quiet space to delegate phone calls, difficult emails, and negotiations to vetted helpers.
            Done discreetly, on your behalf.
          </motion.p>

          {/* 🧲 Magnetic CTA buttons */}
          <motion.div variants={heroItem} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <MagneticButton
              id="hero-post-task"
              onClick={handlePostTask}
              strength={0.45}
              className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full text-base shadow-[0_4px_24px_rgba(16,185,129,0.30)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.45)] transition-all"
            >
              Post a task <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              id="hero-become-helper"
              onClick={handleBecomeHelper}
              strength={0.35}
              className="flex items-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-full text-base border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all"
            >
              Become a helper
            </MagneticButton>
          </motion.div>

          {/* 📊 Count-up stats */}
          <StatsTicker />
        </motion.div>
      </section>

      {/* ── TRUST BAR ───────────────────────────── */}
      <section className="w-full py-10 bg-slate-50 border-y border-slate-100" aria-label="Platform features">
        <TrustBar />
      </section>

      {/* ── CATEGORIES ──────────────────────────── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-24" aria-labelledby="categories-heading">
        <FadeUp>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">Categories</span>
            <h2 id="categories-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
              What do you need handled?
            </h2>
            <p className="text-slate-500 text-base max-w-sm mx-auto">
              Pick a category and we'll match you with the right helper instantly.
            </p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <FadeUp key={category.id} delay={i * 0.09}>
                <motion.button
                  id={`category-${category.id}`}
                  whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(0,0,0,0.10)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className={cn(
                    'w-full text-left p-7 rounded-3xl bg-white border shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-all duration-300 group cursor-pointer relative overflow-hidden',
                    category.borderClass,
                    category.hoverClass,
                  )}
                >
                  <div className={cn('absolute top-0 right-0 w-24 h-24 rounded-bl-[3rem] opacity-20', category.colorClass)} />
                  <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3', category.colorClass, category.iconBg)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900">{category.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{category.description}</p>
                  <div className={cn('flex items-center gap-1 text-xs font-bold transition-all translate-x-0 group-hover:translate-x-1', category.colorClass.split(' ').find(c => c.startsWith('text-')) || 'text-emerald-600')}>
                    Get started <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.button>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────── */}
      <div className="bg-slate-50/60 border-y border-slate-100">
        <HowItWorks />
      </div>

      {/* ── TESTIMONIALS ────────────────────────── */}
      <Testimonials />

      {/* ── CTA BANNER (magnetic) ───────────────── */}
      <CTABanner onPostTask={handlePostTask} onBecomeHelper={handleBecomeHelper} />

      {/* ── FOOTER ──────────────────────────────── */}
      <Footer />
    </div>
  );
}
