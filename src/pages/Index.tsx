import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const redirectPath = user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
      navigate(redirectPath, { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecionando...</h1>
      </div>
    </div>
  );
};

export default Index;
