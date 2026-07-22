import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { useStore } from "../store/useStore";
import { categories } from "./Landing";

export default function PostTask() {
  const navigate = useNavigate();
  const addTask = useStore((state) => state.addTask);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    script: "",
    proof_type: "screenshot",
    alias: `User #${Math.floor(1000 + Math.random() * 9000)}`,
  });

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTask(formData);
      navigate("/helper");
    } catch (err) {
      alert("Failed to post task. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-slate-800">Post a new task</h1>
        <div className="text-sm font-medium text-slate-400">Step {step} of 5</div>
      </div>

      <div className="bg-primary-50 text-primary-700 p-4 rounded-xl mb-8 flex items-start gap-3 border border-primary-100">
        <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" />
        <div className="text-sm leading-relaxed">
          <strong className="font-semibold block">Your identity is never revealed.</strong>
          No real names, emails, or phone numbers are ever shared between users.
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h2 className="text-xl font-medium text-slate-800 mb-6">Choose a category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((c) => {
                  const Icon = c.icon;
                  const isSelected = formData.category === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setFormData({ ...formData, category: c.id })}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                        isSelected ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? "text-primary-600" : "text-slate-500"}`} />
                        <span className={`font-medium ${isSelected ? "text-primary-700" : "text-slate-700"}`}>{c.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h2 className="text-xl font-medium text-slate-800 mb-6">Describe the task</h2>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-40 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                placeholder="E.g., I need someone to call Comcast and cancel my subscription."
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h2 className="text-xl font-medium text-slate-800 mb-6">Provide a script (optional)</h2>
              <textarea
                value={formData.script}
                onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                className="w-full h-40 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none bg-slate-50"
                placeholder="- Please say you are calling on behalf of me&#10;- Do not accept any retention offers"
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h2 className="text-xl font-medium text-slate-800 mb-6">Proof of completion</h2>
              <div className="space-y-3">
                {["screenshot", "summary", "transcript"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer ${
                      formData.proof_type === type ? "border-primary-500 bg-primary-50" : "border-slate-200"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.proof_type === type ? "border-primary-600" : "border-slate-300"}`}>
                      {formData.proof_type === type && <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
                    </div>
                    <input type="radio" className="hidden" checked={formData.proof_type === type} onChange={() => setFormData({ ...formData, proof_type: type })} />
                    <span className="capitalize font-medium text-slate-700">
                      {type === "screenshot" ? "Screenshot or Confirmation Code" : type === "summary" ? "Written Summary" : "Full Transcript"}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h2 className="text-xl font-medium text-slate-800 mb-6">Choose an alias</h2>
              <input
                type="text"
                value={formData.alias}
                onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 w-full p-6 bg-slate-50 border-t border-slate-100 flex items-center gap-4 justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center gap-2 px-4 py-2 font-medium ${step === 1 ? "opacity-0 pointer-events-none" : "text-slate-500 hover:text-slate-800"}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < 5 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 && !formData.category}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-500 transition-colors disabled:opacity-50"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Anonymously"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
