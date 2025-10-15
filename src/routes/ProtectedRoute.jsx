import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('user-id');

  if (userId === '0') {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
