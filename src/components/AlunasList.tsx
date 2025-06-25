
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface AlunaListProps {
  alunas: any[];
  isLoading: boolean;
}

export const AlunasList = ({ alunas, isLoading }: AlunaListProps) => {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      'ativo': { label: 'Ativo', variant: 'default' as const },
      'pendente': { label: 'Pendente', variant: 'secondary' as const },
      'cancelado': { label: 'Cancelado', variant: 'destructive' as const },
      'expirado': { label: 'Expirado', variant: 'outline' as const },
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'outline' as const };
    
    return (
      <Badge variant={statusInfo.variant}>
        {statusInfo.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Data Compra</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pagamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alunas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                Nenhuma aluna encontrada
              </TableCell>
            </TableRow>
          ) : (
            alunas.map((aluna) => (
              <TableRow key={aluna.id}>
                <TableCell className="font-medium">{aluna.nome}</TableCell>
                <TableCell>{aluna.email}</TableCell>
                <TableCell>{aluna.curso}</TableCell>
                <TableCell>{formatCurrency(aluna.valor)}</TableCell>
                <TableCell>{formatDate(aluna.data_compra)}</TableCell>
                <TableCell>{getStatusBadge(aluna.status_acesso || 'pendente')}</TableCell>
                <TableCell>
                  <Badge variant={aluna.pagamento_manual ? 'secondary' : 'outline'}>
                    {aluna.pagamento_manual ? 'Manual' : 'Automático'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
