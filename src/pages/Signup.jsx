import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, UserPlus } from 'lucide-react';
import { apiClient } from '../lib/apiClient';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';
import { generateAlias } from '../lib/utils';

export default function Signup() {
  const navigate = useNavigate();
  const setAuth = useStore((state) => state.setAuth);
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alias, setAlias] = useState(generateAlias());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password || !alias.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.signup(email.trim(), password, alias.trim());
      setAuth(res.user, res.token);
      addToast(`Welcome to Whisper, ${res.user.alias}!`, 'success');
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-soft"
      >
        <h1 className="text-2xl font-semibold text-slate-800 mb-1">Create your account</h1>
        <p className="text-slate-500 text-sm mb-6">No real names needed - pick an alias.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Alias</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="flex-1 p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
              <button
                type="button"
                onClick={() => setAlias(generateAlias())}
                className="px-3 text-xs text-primary-600 hover:text-primary-700 font-medium whitespace-nowrap"
              >
                New
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 py-3 bg-primary-600 text-white rounded-full font-semibold text-sm hover:bg-primary-500 transition-colors disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
