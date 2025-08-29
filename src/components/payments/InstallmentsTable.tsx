import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Trash2, MessageCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { usePagamentosManuais, useUpdatePagamento, useDeletePagamento } from '@/hooks/usePayments';
import { toast } from 'sonner';

interface InstallmentsTableProps {
  alunaId: string | null;
}

export const InstallmentsTable = ({ alunaId }: InstallmentsTableProps) => {
  const { data: pagamentos, isLoading } = usePagamentosManuais(alunaId || undefined);
  const updatePagamento = useUpdatePagamento();
  const deletePagamento = useDeletePagamento();

  const handleMarcarComoPago = async (pagamentoId: string) => {
    try {
      await updatePagamento.mutateAsync({
        id: pagamentoId,
        status: 'pago',
        data_pagamento: new Date().toISOString()
      });
      toast.success('Pagamento marcado como pago!');
    } catch (error) {
      toast.error('Erro ao marcar pagamento como pago');
    }
  };

  const handleDeleteParcela = async (pagamentoId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta parcela?')) return;
    
    try {
      await deletePagamento.mutateAsync(pagamentoId);
      toast.success('Parcela deletada com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar parcela');
    }
  };

  const getStatusBadge = (status: string, dataVencimento: string) => {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    
    if (status === 'pago') {
      return <Badge variant="default">Pago</Badge>;
    }
    
    if (vencimento < hoje) {
      return <Badge variant="destructive">Vencido</Badge>;
    }
    
    return <Badge variant="secondary">Pendente</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (!alunaId) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Selecione uma compra para visualizar as parcelas
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pagamentos || pagamentos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhuma parcela encontrada para esta compra
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Parcelas da Compra</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parcela</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagamentos.map((pagamento) => (
              <TableRow key={pagamento.id}>
                <TableCell>{pagamento.numero_parcela}</TableCell>
                <TableCell>{formatCurrency(pagamento.valor_parcela)}</TableCell>
                <TableCell>{formatDate(pagamento.data_vencimento)}</TableCell>
                <TableCell>
                  {getStatusBadge(pagamento.status, pagamento.data_vencimento)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {pagamento.status !== 'pago' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarcarComoPago(pagamento.id)}
                        disabled={updatePagamento.isPending}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {/* TODO: Implementar WhatsApp */}}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteParcela(pagamento.id)}
                      disabled={deletePagamento.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};