import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const RoleBasedRedirect: React.FC = () => {
  const { user, isInitialLoading } = useAuth();

  // Wait for initial loading to complete
  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  const redirectPath = user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
  return <Navigate to={redirectPath} replace />;
};