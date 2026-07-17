import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ShieldAlert, CheckCircle } from 'lucide-react';
import { categories } from './Landing';

export default function TaskView() {
  const { id } = useParams();
  const { tasks, claimTask, messages, addMessage, viewMode, submitProof, acceptTask } = useStore();
  const task = tasks.find(t => t.id === id);
  const taskMessages = messages.filter(m => m.taskId === id);

  const [chatInput, setChatInput] = useState('');
  const [proofInput, setProofInput] = useState('');

  if (!task) return (
    <div className="text-center py-20 text-slate-500">
      <div className="text-xl font-medium text-slate-800 mb-2">Quiet room</div>
      <p>This task doesn't exist.</p>
    </div>
  );

  const isRequester = viewMode === 'requester';
  const handleClaim = () => claimTask(task.id);
  
  const handleSend = () => {
    if(!chatInput.trim()) return;
    addMessage(task.id, isRequester ? 'requester' : 'helper', chatInput.trim());
    setChatInput('');
  };

  const handleUploadProof = () => {
    if(!proofInput.trim()) return;
    submitProof(task.id, proofInput.trim());
  };

  const isCompleted = task.status === 'completed';
  const isAccepted = task.status === 'accepted';
  const isClaimed = task.status === 'claimed' || isCompleted || isAccepted;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-8">
      {/* Left Column: Details */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
         <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
           <div className="flex items-center justify-between mb-4">
             <div className="text-xs text-slate-400 font-medium">{task.id}</div>
             <div className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium capitalize flex items-center justify-center gap-1.5 border border-slate-200">
               {task.status === 'open' && <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>}
               {task.status === 'claimed' && <div className="w-1.5 h-1.5 rounded-full bg-warning-500 animate-pulse-slow"></div>}
               {isCompleted && <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>}
               {isAccepted && <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>}
               {task.status}
             </div>
           </div>
           
           <h2 className="text-lg font-medium text-slate-800 mb-2">Description</h2>
           <p className="text-sm text-slate-600 mb-6 leading-relaxed">{task.description}</p>
           
           {task.script && (
             <>
               <h2 className="text-lg font-medium text-slate-800 mb-2">Script Vault</h2>
               <div className="bg-slate-50 text-sm text-slate-600 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap leading-relaxed shadow-inner">
                 {task.script}
               </div>
             </>
           )}
         </div>

         {!isRequester && task.status === 'open' && (
           <button onClick={handleClaim} className="w-full py-3.5 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-500 shadow-sm transition-colors text-sm">
             Claim Task
           </button>
         )}

         {/* Proof Panel */}
         {isClaimed && !isAccepted && (
           <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
             <h2 className="text-lg font-medium text-slate-800 mb-4">Proof of Completion</h2>
             {task.status === 'claimed' ? (
               isRequester ? (
                 <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                   <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-slow mb-3"></div>
                   <p className="text-sm text-slate-500">Waiting for helper to upload {task.proofType}...</p>
                 </div>
               ) : (
                 <div className="flex flex-col gap-3">
                   <p className="text-sm text-slate-500 mb-2">Requester asked for: <strong className="text-slate-700 capitalize">{task.proofType}</strong></p>
                   <textarea value={proofInput} onChange={e=>setProofInput(e.target.value)} className="w-full h-24 p-4 text-sm border rounded-xl resize-none outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50" placeholder="Paste link or text proof here..."></textarea>
                   <button onClick={handleUploadProof} disabled={!proofInput.trim()} className="py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors">Submit Proof</button>
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
                     <button onClick={()=>acceptTask(task.id)} className="w-full py-3 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-500 flex justify-center items-center gap-2 shadow-sm transition-colors">
                       <CheckCircle className="w-4 h-4" /> Accept & Complete
                     </button>
                   )}
                   {!isRequester && (
                     <div className="text-sm text-slate-500 text-center">Waiting for requester to review.</div>
                   )}
                 </div>
               )
             )}
           </div>
         )}
         
         {isAccepted && (
           <div className="bg-primary-50 text-primary-700 p-6 border border-primary-200 rounded-2xl shadow-sm flex items-center justify-center gap-3">
             <CheckCircle className="w-6 h-6" />
             <span className="font-medium text-lg">Task Completed</span>
           </div>
         )}
      </div>

      {/* Right Column: Chat */}
      {isClaimed ? (
        <div className="w-full md:w-2/3 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden h-[600px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-slate-100 ${isRequester ? 'bg-white text-slate-700' : 'bg-primary-50 text-primary-700'}`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800 text-sm">Secure Chat</h3>
              <p className="text-xs text-slate-500">End-to-end masked identities</p>
            </div>
            <div className="m-auto"></div>
             {isAccepted && <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">Closed</span>}
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 bg-[#FAFAFA]">
            <div className="text-center group mb-4">
               <span className="bg-slate-200 text-slate-600 text-xs px-4 py-1.5 rounded-full font-medium shadow-sm">Task claimed. You can now chat securely.</span>
            </div>
            {taskMessages.map((msg, i) => {
              const isMine = (isRequester && msg.sender === 'requester') || (!isRequester && msg.sender === 'helper');
              return (
                <div key={i} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[80%]? ${isMine ? 'ml-auto' : 'mr-auto'}`}>
                  <div className={`text-[11px] font-medium text-slate-400 mb-1 px-2 capitalize tracking-wide`}>{msg.sender === 'requester' ? 'The Initiator' : 'The Helper'}</div>
                  <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm max-w-md ${isMine ? 'bg-primary-600 text-white rounded-tr-sm' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                value={chatInput}
                onChange={e=>setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !isAccepted && handleSend()}
                disabled={isAccepted}
                placeholder={isAccepted ? "Chat closed." : "Type a quiet message..."}
                className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-50 rounded-full text-sm outline-none transition-all disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={!chatInput.trim() || isAccepted}
                className="px-6 py-3 bg-primary-600 text-white rounded-full text-sm font-medium disabled:opacity-50 hover:bg-primary-500 transition-all shadow-sm active:scale-95"
               >Send</button>
            </div>
          </div>
        </div>
      ) : (
         <div className="w-full md:w-2/3 bg-slate-50 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center p-12 text-slate-500">
           <ShieldAlert className="w-12 h-12 text-slate-300 mb-4" />
           <h3 className="text-lg font-medium text-slate-700 mb-2">Chat starts when claimed</h3>
           <p className="text-sm max-w-sm">The secure, anonymous chat will open up once a helper picks up this task.</p>
         </div>
      )}
    </div>
  )
}
