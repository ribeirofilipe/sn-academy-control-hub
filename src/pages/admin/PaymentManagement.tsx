import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PaymentManagementDialog } from '@/components/PaymentManagementDialog';
import { useAlunasPagamentoManual, usePagamentosManuais, useUpdatePagamento, useDeletePagamento } from '@/hooks/usePayments';
import { toast } from 'sonner';
import { CreditCard, DollarSign, Calendar, AlertCircle, MessageSquare, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const PaymentManagement = () => {
  const { data: alunas = [], isLoading: loadingAlunas } = useAlunasPagamentoManual();
  const { data: pagamentos = [], isLoading: loadingPagamentos } = usePagamentosManuais();
  const updatePagamento = useUpdatePagamento();
  const deletePagamento = useDeletePagamento();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
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

  const handleMarcarComoPago = async (pagamentoId: string) => {
    try {
      await updatePagamento.mutateAsync({
        id: pagamentoId,
        status: 'pago',
        data_pagamento: new Date().toISOString().split('T')[0]
      });
      toast.success('Pagamento marcado como pago!');
    } catch (error) {
      toast.error('Erro ao atualizar pagamento');
    }
  };

  const handleDeleteParcela = async (pagamentoId: string) => {
    try {
      await deletePagamento.mutateAsync(pagamentoId);
      toast.success('Parcela deletada com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar parcela');
    }
  };

  const handleEnviarNotificacao = async (pagamento: any) => {
    // TODO: Implement Z-API integration
    toast.info('Funcionalidade de envio via WhatsApp será implementada em breve');
  };

  const totalPendente = pagamentos
    .filter(p => p.status !== 'pago')
    .reduce((sum, p) => sum + p.valor_parcela, 0);

  const totalVencido = pagamentos
    .filter(p => {
      const hoje = new Date();
      const vencimento = new Date(p.data_vencimento);
      return p.status !== 'pago' && vencimento < hoje;
    })
    .reduce((sum, p) => sum + p.valor_parcela, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gerenciar Pagamentos</h1>
            <p className="text-muted-foreground">
              Controle de pagamentos manuais e notificações
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alunas Pagamento Manual</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alunas.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalPendente)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vencido</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalVencido)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parcelas Totais</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pagamentos.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alunas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="alunas">Alunas</TabsTrigger>
            <TabsTrigger value="pagamentos">Parcelas</TabsTrigger>
          </TabsList>

          <TabsContent value="alunas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alunas com Pagamento Manual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Curso</TableHead>
                        <TableHead>Valor Total</TableHead>
                        <TableHead>Data Compra</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loadingAlunas ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                          </TableCell>
                        </TableRow>
                      ) : alunas.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            Nenhuma aluna com pagamento manual encontrada
                          </TableCell>
                        </TableRow>
                      ) : (
                        alunas.map((aluna) => (
                          <TableRow key={aluna.id}>
                            <TableCell className="font-medium">{aluna.nome}</TableCell>
                            <TableCell>{aluna.email}</TableCell>
                            <TableCell>{aluna.curso}</TableCell>
                            <TableCell>{formatCurrency(aluna.valor_liquido)}</TableCell>
                            <TableCell>{formatDate(aluna.data_compra)}</TableCell>
                            <TableCell>
                              <PaymentManagementDialog aluna={aluna} />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pagamentos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Parcelas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aluna</TableHead>
                        <TableHead>Parcela</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Vencimento</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Forma Pgto</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loadingPagamentos ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                          </TableCell>
                        </TableRow>
                      ) : pagamentos.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            Nenhuma parcela encontrada
                          </TableCell>
                        </TableRow>
                      ) : (
                        pagamentos.map((pagamento) => (
                          <TableRow key={pagamento.id}>
                            <TableCell className="font-medium">
                              {pagamento.alunas_hotmart?.nome}
                            </TableCell>
                            <TableCell>{pagamento.numero_parcela}</TableCell>
                            <TableCell>{formatCurrency(pagamento.valor_parcela)}</TableCell>
                            <TableCell>{formatDate(pagamento.data_vencimento)}</TableCell>
                            <TableCell>
                              {getStatusBadge(pagamento.status, pagamento.data_vencimento)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {pagamento.forma_pagamento?.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {pagamento.status !== 'pago' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleMarcarComoPago(pagamento.id)}
                                    disabled={updatePagamento.isPending}
                                  >
                                    Pago
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEnviarNotificacao(pagamento)}
                                  className="flex items-center gap-1"
                                >
                                  <MessageSquare className="h-3 w-3" />
                                  WhatsApp
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-1"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                      Deletar
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Deletar Parcela</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Tem certeza que deseja deletar esta parcela? Esta ação não pode ser desfeita.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteParcela(pagamento.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        disabled={deletePagamento.isPending}
                                      >
                                        Deletar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PaymentManagement;
