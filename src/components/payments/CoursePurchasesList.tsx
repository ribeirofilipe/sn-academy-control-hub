import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface CoursePurchasesListProps {
  email: string;
  selectedAlunaId: string | null;
  onAlunaSelect: (alunaId: string) => void;
}

export const CoursePurchasesList = ({ email, selectedAlunaId, onAlunaSelect }: CoursePurchasesListProps) => {
  const { data: purchases, isLoading } = useQuery({
    queryKey: ['course-purchases', email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alunas_hotmart')
        .select('*')
        .eq('email', email)
        .order('data_compra', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!email,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCourseBadge = (curso: string) => {
    const courseMap = {
      'Formação Eternização de Flores': 'FEF',
      'Formação Seu Negócio de Resina': 'SNR',
      'Os Segredos da Desidratação de Flores': 'Ebook',
      'Precificando seu Artesanato': 'Precificando',
      'Fornecedores - Desidratação de Flores': 'Fornecedores',
      'SN - Técnicas Modernas Russas': 'Técnicas Russas',
    };
    
    return courseMap[curso as keyof typeof courseMap] || curso;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!purchases || purchases.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground">Nenhuma compra encontrada para este e-mail.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Compras de {email}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedAlunaId === purchase.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onAlunaSelect(purchase.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <Badge variant="outline" className="mb-1">
                  {getCourseBadge(purchase.curso)}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {formatDate(purchase.data_compra)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(purchase.valor_bruto || 0)}</p>
                <p className="text-sm text-muted-foreground">
                  Pago: {formatCurrency(purchase.valor_pago || 0)}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant={purchase.status_acesso === 'ativo' ? 'default' : 'secondary'}>
                {purchase.status_acesso || 'pendente'}
              </Badge>
              {purchase.pagamento_manual && (
                <Badge variant="destructive">Manual</Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};