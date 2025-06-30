
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateAlunaStatus } from '@/hooks/useUpdateAlunaStatus';

interface StatusSelectProps {
  currentStatus: string;
  alunaId: string;
}

export const StatusSelect = ({ currentStatus, alunaId }: StatusSelectProps) => {
  const updateStatus = useUpdateAlunaStatus();

  const handleStatusChange = (newStatus: string) => {
    updateStatus.mutate({ id: alunaId, status: newStatus });
  };

  const getStatusLabel = (status: string) => {
    const statusMap = {
      'ativo': 'ATIVO',
      'pendente': 'PENDENTE',
      'cancelado': 'CANCELADO',
      'expirado': 'EXPIRADO',
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  return (
    <Select
      value={currentStatus}
      onValueChange={handleStatusChange}
      disabled={updateStatus.isPending}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue>{getStatusLabel(currentStatus)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ativo">ATIVO</SelectItem>
        <SelectItem value="pendente">PENDENTE</SelectItem>
        <SelectItem value="cancelado">CANCELADO</SelectItem>
        <SelectItem value="expirado">EXPIRADO</SelectItem>
      </SelectContent>
    </Select>
  );
};
