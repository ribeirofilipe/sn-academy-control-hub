
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Instagram,
  Settings,
  CreditCard,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Alunas",
    href: "/admin/students",
    icon: Users,
  },
  {
    title: "Vendas",
    href: "/admin/sales",
    icon: DollarSign,
  },
  {
    title: "Gerenciar Pagamentos",
    href: "/admin/payment-management",
    icon: CreditCard,
  },
  {
    title: "Solicitações Instagram",
    href: "/admin/instagram-requests",
    icon: Instagram,
  },
  {
    title: "Configurações",
    href: "/admin/settings",
    icon: Settings,
  },
];

const studentNavItems = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = user?.role === 'ADMIN' ? adminNavItems : studentNavItems;

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            SN Resina
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    location.pathname === item.href && "bg-secondary"
                  )}
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
