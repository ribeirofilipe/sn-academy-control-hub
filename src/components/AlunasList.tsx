
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { EditDiscordDialog } from './EditDiscordDialog';
import { StatusSelect } from './StatusSelect';

interface AlunaListProps {
  alunas: any[];
  isLoading: boolean;
  onUpdate?: () => void;
}

export const AlunasList = ({ alunas, isLoading, onUpdate }: AlunaListProps) => {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      'ativo': { label: 'ATIVO', variant: 'default' as const },
      'pendente': { label: 'PENDENTE', variant: 'secondary' as const },
      'cancelado': { label: 'CANCELADO', variant: 'destructive' as const },
      'expirado': { label: 'Expirado', variant: 'outline' as const },
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'outline' as const };
    
    return (
      <Badge variant={statusInfo.variant}>
        {statusInfo.label}
      </Badge>
    );
  };

  const getCourseName = (name: string) => {
    const statusMap = {
      'Formação Eternização de Flores': { label: 'FEF', variant: 'default' as const },
      'Formação Seu Negócio de Resina': { label: 'SNR', variant: 'secondary' as const },
      'Os Segredos da Desidratação de Flores': { label: 'Ebook', variant: 'destructive' as const },
      'Precificando seu Artesanato': { label: 'Precificando', variant: 'outline' as const },
      'Fornecedores - Desidratação de Flores': { label: 'Fornecedores', variant: 'outline' as const },
      'SN - Técnicas Modernas Russas': { label: 'Técnicas Russas', variant: 'outline' as const },
    };

    const courseInfo = statusMap[name as keyof typeof statusMap] || { label: name, variant: 'outline' as const };;

    return (
      <Badge variant={courseInfo.variant}>
        {courseInfo.label}
      </Badge>
    );
  }

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
            <TableHead>Líquido</TableHead>
            <TableHead>Pago</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Discord</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alunas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                Nenhuma aluna encontrada
              </TableCell>
            </TableRow>
          ) : (
            alunas.map((aluna) => (
              <TableRow key={aluna.id}>
                <TableCell className="font-medium">{aluna.nome}</TableCell>
                <TableCell>{aluna.email}</TableCell>
                <TableCell>{getCourseName(aluna.curso)}</TableCell>
                <TableCell>{formatCurrency(aluna.valor_liquido || 0)}</TableCell>
                <TableCell>{formatCurrency(aluna.valor_pago || 0)}</TableCell>
                <TableCell>{formatDate(aluna.data_compra)}</TableCell>
                <TableCell>
                  <StatusSelect 
                    currentStatus={aluna.status_acesso || 'pendente'} 
                    alunaId={aluna.id} 
                  />
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {aluna.discord_user_id || 'Não definido'}
                  </span>
                </TableCell>
                <TableCell>
                  <EditDiscordDialog 
                    aluna={aluna} 
                    onUpdate={onUpdate || (() => {})} 
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
