
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { EditDiscordDialog } from './EditDiscordDialog';
import { ManageCoursesDialog } from './ManageCoursesDialog';
import { AggregatedAluna } from '@/hooks/useAlunasAggregated';

interface AlunaListProps {
  alunas: AggregatedAluna[];
  isLoading: boolean;
  onUpdate?: () => void;
}

export const AlunasList = ({ alunas, isLoading, onUpdate }: AlunaListProps) => {

  const getCourseBadge = (name: string) => {
    const courseMap = {
      'Formação Eternização de Flores': 'FEF',
      'Formação Seu Negócio de Resina': 'SNR',
      'Os Segredos da Desidratação de Flores': 'Ebook',
      'Precificando seu Artesanato': 'Precificando',
      'Fornecedores - Desidratação de Flores': 'Fornecedores',
      'SN - Técnicas Modernas Russas': 'Técnicas Russas',
    };
    
    return courseMap[name as keyof typeof courseMap] || name;
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
            <TableHead>Cursos</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Discord</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alunas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                Nenhuma aluna encontrada
              </TableCell>
            </TableRow>
          ) : (
            alunas.map((aluna) => (
              <TableRow key={aluna.email}>
                <TableCell className="font-medium">{aluna.nome}</TableCell>
                <TableCell>{aluna.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {aluna.cursos.map((curso, index) => (
                      <Badge key={index} variant="outline">
                        {getCourseBadge(curso.curso)}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {formatCurrency(aluna.cursos.reduce((sum, curso) => sum + (curso.valor_liquido || 0), 0))}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {aluna.discord_user_id || 'Não definido'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <EditDiscordDialog 
                      aluna={aluna} 
                      onUpdate={onUpdate || (() => {})} 
                    />
                    <ManageCoursesDialog 
                      email={aluna.email}
                      nome={aluna.nome}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
