
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleBasedRedirect } from '@/components/RoleBasedRedirect';
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import Sales from "./pages/admin/Sales";
import InstagramRequests from "./pages/admin/InstagramRequests";
import Settings from "./pages/admin/Settings";
import PaymentManagement from "./pages/admin/PaymentManagement";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Root redirect based on role */}
              <Route path="/" element={<RoleBasedRedirect />} />
              
              {/* Protected Admin routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/students" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <Students />
                </ProtectedRoute>
              } />
              <Route path="/admin/sales" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <Sales />
                </ProtectedRoute>
              } />
              <Route path="/admin/instagram-requests" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <InstagramRequests />
                </ProtectedRoute>
              } />
              <Route path="/admin/payment-management" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PaymentManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* Protected Student routes */}
              <Route path="/student/dashboard" element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              
              {/* Fallback routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
