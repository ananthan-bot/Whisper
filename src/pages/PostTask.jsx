import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { categories } from '../lib/categories';
import StepIndicator from '../components/StepIndicator';
import { cn } from '../lib/cn';
import { generateAlias } from '../lib/utils';

import { useToast } from '../context/ToastContext';

const STEP_LABELS = ['Category', 'Describe', 'Script', 'Proof', 'Alias'];

export default function PostTask() {
  const navigate     = useNavigate();
  const addTask      = useStore((state) => state.addTask);
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();

  const [step, setStep]       = useState(1);
  const [error, setError]     = useState('');
  const [formData, setFormData] = useState({
    category:  searchParams.get('category') || '',
    description: '',
    script:      '',
    proofType:   'screenshot',
    alias:       generateAlias(),
  });

  // Auto-advance to step 2 if a category was pre-selected via URL
  useEffect(() => {
    if (searchParams.get('category') && step === 1) {
      setStep(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    if (step === 1 && !formData.category) {
      setError('Please select a category to continue.');
      return false;
    }
    if (step === 2 && !formData.description.trim()) {
      setError('Please describe the task before continuing.');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (!validate()) return;
    setStep((s) => s + 1);
  };
  const handlePrev = () => {
    setError('');
    setStep((s) => s - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    addToast('Task created successfully!', 'success');
    navigate('/helper');
  };

  const currentCategory = categories.find((c) => c.id === formData.category);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-1">Post a new task</h1>
        <p className="text-slate-500 text-sm">Fill in a few details and we'll find you a helper.</p>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={step} totalSteps={5} labels={STEP_LABELS} />

      {/* Privacy Banner */}
      <div className="bg-primary-50 text-primary-700 p-4 rounded-xl mb-6 flex items-start gap-3 border border-primary-100">
        <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" />
        <div className="text-sm leading-relaxed">
          <strong className="font-semibold block">Your identity is never revealed.</strong>
          No real names, emails, or phone numbers are ever shared. All communication is anonymous.
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden relative min-h-[380px]">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Category ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Choose a category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((c) => {
                  const Icon = c.icon;
                  const isSelected = formData.category === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => { setFormData({ ...formData, category: c.id }); setError(''); }}
                      className={cn(
                        'text-left p-4 rounded-xl border transition-all duration-200',
                        isSelected
                          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      )}
                    >
                      <div className="flex items-center gap-3 mb-1.5">
                        <Icon className={cn('w-5 h-5', isSelected ? 'text-primary-600' : 'text-slate-500')} />
                        <span className={cn('font-semibold text-sm', isSelected ? 'text-primary-700' : 'text-slate-700')}>{c.name}</span>
                      </div>
                      {isSelected && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-xs text-primary-600 leading-relaxed mt-1">
                          {c.description}
                        </motion.p>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Description ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Describe the task</h2>
              <p className="text-slate-500 text-sm mb-5">Explain in plain language what you need done.</p>
              <textarea
                value={formData.description}
                onChange={(e) => { setFormData({ ...formData, description: e.target.value }); setError(''); }}
                className="w-full h-44 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none text-sm leading-relaxed"
                placeholder={
                  currentCategory?.id === 'negotiator'
                    ? 'E.g., I need someone to call Comcast and cancel my subscription. I am on the basic plan...'
                    : 'E.g., Please book a table for 2 at Nobu for Friday evening...'
                }
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-400">{formData.description.length} chars</span>
                <span className="text-xs text-slate-400">{formData.description.trim().split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Script ── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Provide a script <span className="text-slate-400 font-normal text-base">(optional)</span></h2>
              <p className="text-slate-500 text-sm mb-5">Give your helper specific bullet points or a suggested script to follow.</p>
              <textarea
                value={formData.script}
                onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                className="w-full h-44 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none bg-slate-50 text-sm leading-relaxed font-mono"
                placeholder={"- Please say you are calling on behalf of [My Name]\n- Emphasize that I am moving out of country\n- Do not accept any retention offers"}
              />
            </motion.div>
          )}

          {/* ── Step 4: Proof ── */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Proof of completion</h2>
              <p className="text-slate-500 text-sm mb-5">How would you like the helper to prove this is done?</p>
              <div className="space-y-3">
                {[
                  { id: 'screenshot', label: 'Screenshot or Confirmation Code', desc: 'Visual proof of the outcome.' },
                  { id: 'summary',    label: 'Written Summary',                  desc: 'A short written report of what happened.' },
                  { id: 'transcript', label: 'Full Transcript',                  desc: 'A full word-for-word record of the conversation.' },
                ].map(({ id, label, desc }) => (
                  <label
                    key={id}
                    className={cn(
                      'flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200',
                      formData.proofType === id ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300'
                    )}
                  >
                    <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0', formData.proofType === id ? 'border-primary-600' : 'border-slate-300')}>
                      {formData.proofType === id && <div className="w-2 h-2 rounded-full bg-primary-600" />}
                    </div>
                    <div>
                      <input type="radio" className="sr-only" value={id} checked={formData.proofType === id} onChange={() => setFormData({ ...formData, proofType: id })} />
                      <span className="font-semibold text-slate-700 text-sm block">{label}</span>
                      <span className="text-xs text-slate-500">{desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 5: Alias ── */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Choose an alias</h2>
              <p className="text-slate-500 text-sm mb-5">We've generated one automatically, or pick your own. No real names, please.</p>
              <input
                type="text"
                value={formData.alias}
                onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg font-medium"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, alias: generateAlias() })}
                className="mt-3 text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                ↻ Generate new alias
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mx-8 mb-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-lg"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute bottom-0 left-0 w-full p-5 bg-slate-50/80 backdrop-blur-sm border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={cn('flex items-center gap-2 px-4 py-2 font-medium text-sm rounded-full transition-all', step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200')}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-full font-semibold text-sm hover:bg-primary-500 transition-colors shadow-soft"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-slate-800 transition-colors shadow-soft"
            >
              Submit Anonymously ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
