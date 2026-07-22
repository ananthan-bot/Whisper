import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function ProtectedRoute({ children }) {
  const token = useStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
