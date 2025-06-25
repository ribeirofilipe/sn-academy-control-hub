
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlunaFilters } from '@/components/AlunaFilters';
import { AlunasList } from '@/components/AlunasList';
import { CreateAlunaDialog } from '@/components/CreateAlunaDialog';
import { useAlunas } from '@/hooks/useAlunas';
import { Users } from 'lucide-react';

const Students = () => {
  const [filters, setFilters] = useState({});
  
  const { data: alunas = [], isLoading } = useAlunas(filters);

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Alunas</h1>
            <p className="text-muted-foreground">
              Gerencie as alunas cadastradas no sistema
            </p>
          </div>
          <CreateAlunaDialog />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Alunas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alunas.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alunas Ativas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {alunas.filter(a => a.status_acesso === 'ativo').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagamento Manual</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {alunas.filter(a => a.pagamento_manual).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {alunas.filter(a => a.status_acesso === 'pendente').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <AlunaFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />

        <AlunasList alunas={alunas} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default Students;
