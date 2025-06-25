import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import Students from "@/pages/admin/Students";
import PaymentManagement from "@/pages/admin/PaymentManagement";
import InstagramRequests from "@/pages/admin/InstagramRequests";
import Settings from "@/pages/admin/Settings";
import StudentDashboard from "@/pages/student/Dashboard";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleBasedRedirect } from "@/components/RoleBasedRedirect";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <Routes>
                      <Route index element={<Navigate to="/admin/dashboard" replace />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="students" element={<Students />} />
                      <Route path="payment-management" element={<PaymentManagement />} />
                      <Route path="instagram-requests" element={<InstagramRequests />} />
                      <Route path="settings" element={<Settings />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
              
              {/* Student Routes */}
              <Route
                path="/student/*"
                element={
                  <ProtectedRoute allowedRoles={['STUDENT']}>
                    <Routes>
                      <Route index element={<Navigate to="/student/dashboard" replace />} />
                      <Route path="dashboard" element={<StudentDashboard />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
              
              {/* Role-based redirect */}
              <Route path="/dashboard" element={<RoleBasedRedirect />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
