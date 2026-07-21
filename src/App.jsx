import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Landing         = lazy(() => import('./pages/Landing'));
const PostTask        = lazy(() => import('./pages/PostTask'));
const HelperDashboard = lazy(() => import('./pages/HelperDashboard'));
const TaskView        = lazy(() => import('./pages/TaskView'));

function PageFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="post-task" element={<PostTask />} />
          <Route path="helper" element={<HelperDashboard />} />
          <Route path="task/:id" element={<TaskView />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
