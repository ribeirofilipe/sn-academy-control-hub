import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Instagram,
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react';

const adminMenuItems = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Vendas',
    url: '/admin/sales',
    icon: DollarSign,
  },
  {
    title: 'Alunas',
    url: '/admin/students',
    icon: Users,
  },
  {
    title: 'Solicitações Instagram',
    url: '/admin/instagram-requests',
    icon: Instagram,
  },
  {
    title: 'Configurações',
    url: '/admin/settings',
    icon: Settings,
  },
];

const studentMenuItems = [
  {
    title: 'Minha Área',
    url: '/student/dashboard',
    icon: GraduationCap,
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = user?.role === 'ADMIN' ? adminMenuItems : studentMenuItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">SN Academy</h1>
            <p className="text-sm text-sidebar-foreground/60">
              {user.role === 'ADMIN' ? 'Área Administrativa' : 'Área da Aluna'}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={user.avatar || `https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face`}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user.name}
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {user.email}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}