import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};