import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { categories } from './Landing';
import { motion } from 'framer-motion';

export default function HelperDashboard() {
  const tasks = useStore(state => state.tasks);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-slate-800">Available Tasks</h1>
        <p className="text-slate-500">Pick up a task and help someone out quietly.</p>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-pulse-slow"></div>
          </div>
          <p className="text-lg mb-2 text-slate-800 font-medium">Nothing here yet</p>
          <p>Your tasks will appear when someone posts them.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map(task => {
             const category = categories.find(c => c.id === task.category);
             const Icon = category?.icon;
             return (
               <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} key={task.id} className={`bg-white p-6 rounded-2xl border ${task.status === 'open' ? 'border-slat-200 hover:border-slate-300' : 'border-slate-100 opacity-70'} shadow-sm flex flex-col transition-all group`}>
                 <div className="flex items-center justify-between mb-4">
                   {category && (
                     <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${category.colorClass}`}>
                       <Icon className="w-3.5 h-3.5" /> {category.name}
                     </div>
                   )}
                   <div className="text-xs text-slate-400 font-medium">{task.id}</div>
                 </div>
                 <p className="text-slate-700 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{task.description}</p>
                 <div className="flex items-center justify-between mt-auto">
                   <div className="text-sm text-slate-500">By {task.alias}</div>
                   <Link
                     to={`/task/${task.id}`}
                     className="px-4 py-2 bg-slate-50 font-medium text-slate-700 text-sm rounded-full group-hover:bg-slate-100 transition-colors border border-slate-200"
                   >
                     View Task
                   </Link>
                 </div>
               </motion.div>
             )
          })}
        </div>
      )}
    </div>
  );
}
