import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchByEmail } from '@/components/payments/SearchByEmail';
import { EmailResults } from '@/components/payments/EmailResults';
import { CoursePurchasesList } from '@/components/payments/CoursePurchasesList';
import { InstallmentsTable } from '@/components/payments/InstallmentsTable';
import { CreateInstallmentsForm } from '@/components/payments/CreateInstallmentsForm';
import { useAlunasPagamentoManual, usePagamentosManuais } from '@/hooks/usePayments';
import { Users, DollarSign, AlertTriangle, FileText } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const PaymentManagement = () => {
  const [searchEmails, setSearchEmails] = useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [selectedAlunaId, setSelectedAlunaId] = useState<string | null>(null);

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
            <p className="text-muted-foreground">
              Busque por e-mail para gerenciar parcelas de forma simples
            </p>
          </div>
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

        {/* Layout 3 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Busca e Resultados */}
          <div className="space-y-4">
            <SearchByEmail onEmailSelect={setSearchEmails} />
            {searchEmails.length > 0 && (
              <EmailResults 
                emails={searchEmails}
                selectedEmail={selectedEmail}
                onEmailSelect={setSelectedEmail}
              />
            )}
            {selectedEmail && (
              <CoursePurchasesList
                email={selectedEmail}
                selectedAlunaId={selectedAlunaId}
                onAlunaSelect={setSelectedAlunaId}
              />
            )}
          </div>

          {/* Coluna 2: Parcelas */}
          <div>
            <Card>
              <CardContent className="p-6">
                <InstallmentsTable alunaId={selectedAlunaId} />
              </CardContent>
            </Card>
          </div>

          {/* Coluna 3: Criar Parcelas */}
          <div>
            <CreateInstallmentsForm alunaId={selectedAlunaId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentManagement;