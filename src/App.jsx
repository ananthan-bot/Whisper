import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import PostTask from './pages/PostTask';
import HelperDashboard from './pages/HelperDashboard';
import TaskView from './pages/TaskView';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Landing has its own full-width layout with embedded Navbar */}
      <Route index element={<Landing />} />

      {/* All other pages use the shared Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="post-task" element={<ProtectedRoute><PostTask /></ProtectedRoute>} />
        <Route path="helper" element={<ProtectedRoute><HelperDashboard /></ProtectedRoute>} />
        <Route path="task/:id" element={<ProtectedRoute><TaskView /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
