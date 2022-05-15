import { Navigate, Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const ProtectedRoute = () => {
  const [accessToken, _] = useLocalStorage('accessToken', null);
  if (!accessToken) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
