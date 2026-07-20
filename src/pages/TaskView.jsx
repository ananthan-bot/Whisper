import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ShieldAlert, CheckCircle, Send } from 'lucide-react';
import { categories } from '../lib/categories';
import { motion, AnimatePresence } from 'framer-motion';
import RatingWidget from '../components/RatingWidget';
import { formatRelativeTime } from '../lib/utils';
import { cn } from '../lib/cn';

export default function TaskView() {
  const { id } = useParams();
  const { tasks, claimTask, messages, addMessage, viewMode, submitProof, acceptTask, ratings } = useStore();
  const task = tasks.find((t) => t.id === id);
  const taskMessages = messages.filter((m) => m.taskId === id);

  const [chatInput,  setChatInput]  = useState('');
  const [proofInput, setProofInput] = useState('');

  // Auto-scroll to bottom when messages update
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [taskMessages.length]);

  if (!task) return (
    <div className="text-center py-20 text-slate-500">
      <div className="text-xl font-semibold text-slate-800 mb-2">Quiet room</div>
      <p>This task doesn't exist or has been removed.</p>
    </div>
  );

  const isRequester = viewMode === 'requester';
  const handleClaim = () => claimTask(task.id);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    addMessage(task.id, isRequester ? 'requester' : 'helper', chatInput.trim());
    setChatInput('');
  };

  const handleUploadProof = () => {
    if (!proofInput.trim()) return;
    submitProof(task.id, proofInput.trim());
  };

  const isCompleted = task.status === 'completed';
  const isAccepted  = task.status === 'accepted';
  const isClaimed   = task.status === 'claimed' || isCompleted || isAccepted;

  const category     = categories.find((c) => c.id === task.category);
  const CategoryIcon = category?.icon;
  const alreadyRated = !!ratings?.[task.id];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-6">

      {/* ─── Left Column: Task Details ─────────────────────────── */}
      <div className="w-full md:w-1/3 flex flex-col gap-5">

        {/* Task Info Card */}
        <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-soft">
          {/* Category + ID row */}
          <div className="flex items-center justify-between mb-4">
            {category ? (
              <div className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold', category.colorClass)}>
                {CategoryIcon && <CategoryIcon className="w-3.5 h-3.5" />}
                {category.name}
              </div>
            ) : null}
            <div className="text-xs text-slate-400 font-mono">{task.id}</div>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-2 mb-5">
            <div className={cn('w-2 h-2 rounded-full shrink-0',
              task.status === 'open'      ? 'bg-slate-400' :
              task.status === 'claimed'   ? 'bg-warning-500 animate-pulse-slow' :
              isCompleted                 ? 'bg-primary-500' : 'bg-primary-500'
            )} />
            <span className="text-xs font-semibold text-slate-600 capitalize">
              {task.status === 'accepted' ? 'Completed' : task.status === 'completed' ? 'Awaiting Review' : task.status}
            </span>
            <span className="ml-auto text-xs text-slate-400">{formatRelativeTime(task.createdAt)}</span>
          </div>

          {/* Posted by */}
          <p className="text-xs text-slate-400 mb-4">
            Posted by <span className="font-semibold text-slate-600">{task.alias}</span>
          </p>

          <h2 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Description</h2>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">{task.description}</p>

          {task.script && (
            <>
              <h2 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Script Vault</h2>
              <div className="bg-slate-50 text-sm text-slate-600 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap leading-relaxed shadow-inner font-mono text-xs">
                {task.script}
              </div>
            </>
          )}
        </div>

        {/* Claim Button */}
        {!isRequester && task.status === 'open' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClaim}
            className="w-full py-3.5 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-500 shadow-glow transition-colors text-sm"
          >
            Claim This Task
          </motion.button>
        )}

        {/* Proof Panel */}
        {isClaimed && !isAccepted && (
          <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-soft">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Proof of Completion</h2>
            {task.status === 'claimed' ? (
              isRequester ? (
                <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-slow mb-3" />
                  <p className="text-sm text-slate-500">
                    Waiting for helper to upload{' '}
                    <span className="font-semibold text-slate-700 capitalize">{task.proofType}</span>…
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-slate-500 mb-1">
                    Requester asked for:{' '}
                    <strong className="text-slate-700 capitalize">{task.proofType}</strong>
                  </p>
                  <textarea
                    value={proofInput}
                    onChange={(e) => setProofInput(e.target.value)}
                    className="w-full h-28 p-3 text-sm border border-slate-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50"
                    placeholder="Paste link or text proof here…"
                  />
                  <button
                    onClick={handleUploadProof}
                    disabled={!proofInput.trim()}
                    className="py-3 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors"
                  >
                    Submit Proof
                  </button>
                </div>
              )
            ) : (
              isCompleted && (
                <div className="flex flex-col gap-4">
                  <div className="p-4 bg-primary-50 text-primary-800 rounded-xl text-sm break-all border border-primary-100 border-dashed">
                    <span className="font-semibold block mb-1">Proof Provided:</span>
                    {task.proof}
                  </div>
                  {isRequester && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => acceptTask(task.id)}
                      className="w-full py-3 bg-primary-600 text-white rounded-full text-sm font-semibold hover:bg-primary-500 flex justify-center items-center gap-2 shadow-soft transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" /> Accept & Complete
                    </motion.button>
                  )}
                  {!isRequester && (
                    <div className="text-sm text-slate-500 text-center">Waiting for requester to review.</div>
                  )}
                </div>
              )
            )}
          </div>
        )}

        {/* Task Accepted + Rating */}
        {isAccepted && (
          <div className="bg-white border border-primary-200 rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-primary-50 text-primary-700 p-5 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 shrink-0" />
              <span className="font-semibold text-base">Task Completed!</span>
            </div>
            {isRequester && !alreadyRated && (
              <div className="p-5 border-t border-primary-100">
                <RatingWidget taskId={task.id} />
              </div>
            )}
            {isRequester && alreadyRated && (
              <div className="p-5 border-t border-primary-100">
                <RatingWidget taskId={task.id} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── Right Column: Chat ────────────────────────────────── */}
      {isClaimed ? (
        <div className="w-full md:w-2/3 bg-white border border-slate-200 rounded-2xl shadow-soft flex flex-col overflow-hidden h-[580px]">

          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/90 backdrop-blur-sm flex items-center gap-3">
            <div className={cn('w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-slate-100',
              isRequester ? 'bg-white text-slate-700' : 'bg-primary-50 text-primary-700'
            )}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Secure Chat</h3>
              <p className="text-xs text-slate-500">End-to-end masked identities</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-slow" />
              {isAccepted
                ? <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Closed</span>
                : <span className="text-xs text-primary-700 font-medium bg-primary-50 px-2 py-1 rounded-md">Live</span>
              }
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-[#FAFAFA]">
            {/* System message */}
            <div className="text-center">
              <span className="bg-slate-200 text-slate-600 text-xs px-4 py-1.5 rounded-full font-medium shadow-sm">
                Task claimed. You can now chat securely.
              </span>
            </div>

            <AnimatePresence initial={false}>
              {taskMessages.map((msg, i) => {
                const isMine = (isRequester && msg.sender === 'requester') || (!isRequester && msg.sender === 'helper');
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={cn('flex flex-col max-w-[78%]', isMine ? 'items-end ml-auto' : 'items-start mr-auto')}
                  >
                    <div className="text-[11px] font-semibold text-slate-400 mb-1 px-2 capitalize tracking-wide">
                      {msg.sender === 'requester' ? 'The Initiator' : 'The Helper'}
                    </div>
                    <div className={cn(
                      'px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm',
                      isMine
                        ? 'bg-primary-600 text-white rounded-tr-sm'
                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm'
                    )}>
                      {msg.text}
                    </div>
                    <div className="text-[10px] text-slate-400 px-2 mt-1">
                      {formatRelativeTime(msg.timestamp)}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Auto-scroll anchor */}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isAccepted && handleSend()}
                disabled={isAccepted}
                placeholder={isAccepted ? 'Chat closed.' : 'Type a quiet message…'}
                className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-50 rounded-full text-sm outline-none transition-all disabled:opacity-50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!chatInput.trim() || isAccepted}
                className="p-3 bg-primary-600 text-white rounded-full disabled:opacity-50 hover:bg-primary-500 transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-2/3 bg-slate-50 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center p-12 text-slate-500">
          <ShieldAlert className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Chat starts when claimed</h3>
          <p className="text-sm max-w-sm">The secure, anonymous chat opens once a helper picks up this task.</p>
        </div>
      )}
    </div>
  );
}
