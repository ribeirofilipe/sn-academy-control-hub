import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'expired' | 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  children: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const variants = {
    active: 'bg-success/10 text-success hover:bg-success/20',
    expired: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
    pending: 'bg-warning/10 text-warning hover:bg-warning/20',
    approved: 'bg-success/10 text-success hover:bg-success/20',
    rejected: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
    completed: 'bg-success/10 text-success hover:bg-success/20',
    cancelled: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
  };

  return (
    <Badge variant="secondary" className={cn(variants[status])}>
      {children}
    </Badge>
  );
}