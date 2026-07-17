import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import PostTask from './pages/PostTask';
import HelperDashboard from './pages/HelperDashboard';
import TaskView from './pages/TaskView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="post-task" element={<PostTask />} />
        <Route path="helper" element={<HelperDashboard />} />
        <Route path="task/:id" element={<TaskView />} />
      </Route>
    </Routes>
  );
}

export default App;
