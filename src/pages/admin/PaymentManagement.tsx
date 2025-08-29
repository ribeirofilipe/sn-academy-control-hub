import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InstallmentsTable } from '@/components/payments/InstallmentsTable';
import { CreateInstallmentsForm } from '@/components/payments/CreateInstallmentsForm';
import { CreateManualPurchaseForm } from '@/components/payments/CreateManualPurchaseForm';
import { useAlunasPagamentoManual, usePagamentosManuais } from '@/hooks/usePayments';
import { Users, DollarSign, AlertTriangle, FileText } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { ManualStudentsTable } from '@/components/payments/ManualStudentsTable';

const PaymentManagement = () => {
  
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [selectedAlunaId, setSelectedAlunaId] = useState<string | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  const { data: alunasPagamentoManual } = useAlunasPagamentoManual();
  const { data: allPagamentos } = usePagamentosManuais();

  // Calcular totais para os cards de resumo
  const totalPendente = allPagamentos?.filter(p => p.status !== 'pago').reduce((sum, p) => sum + (p.valor_parcela || 0), 0) || 0;
  const totalVencido = allPagamentos?.filter(p => {
    const hoje = new Date();
    const vencimento = new Date(p.data_vencimento);
    return p.status !== 'pago' && vencimento < hoje;
  }).reduce((sum, p) => sum + (p.valor_parcela || 0), 0) || 0;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gerenciar Pagamentos</h1>
            <p className="text-muted-foreground">Tabela de alunas (pagamento manual) com criação simples via diálogo</p>
          </div>
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button variant="default">Nova aluna</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova compra manual</DialogTitle>
              </DialogHeader>
              <CreateManualPurchaseForm
                onPurchaseCreated={(email, alunaId) => {
                  setSelectedEmail(email);
                  setSelectedAlunaId(alunaId);
                  setOpenCreate(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Cards de resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alunas com Pagamento Manual</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alunasPagamentoManual?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(totalPendente)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vencido</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(totalVencido)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parcelas Totais</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allPagamentos?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Nova compra via diálogo no header */}

        {/* Layout 2 colunas simples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna 1: Tabela de alunas com pagamento manual */}
          <div className="space-y-4">
            <ManualStudentsTable
              selectedAlunaId={selectedAlunaId}
              onSelect={(email, alunaId) => {
                setSelectedEmail(email);
                setSelectedAlunaId(alunaId);
              }}
            />
          </div>

          {/* Coluna 2: Parcelas + Criar Parcelas */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <InstallmentsTable alunaId={selectedAlunaId} />
              </CardContent>
            </Card>
            <CreateInstallmentsForm alunaId={selectedAlunaId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentManagement;