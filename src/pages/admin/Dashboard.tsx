import { MetricCard } from '@/components/MetricCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { DollarSign, Users, TrendingUp, Clock, Eye } from 'lucide-react';
import { Layout } from '@/components/Layout';

// Mock data
const recentSales = [
  {
    id: '1',
    buyer_name: 'Ana Silva',
    buyer_email: 'ana@email.com',
    product_name: 'Curso Instagram Estratégico',
    final_price: 497.00,
    approved_date: '2024-01-15',
    status: 'completed' as const,
  },
  {
    id: '2',
    buyer_name: 'Carla Santos',
    buyer_email: 'carla@email.com',
    product_name: 'Mentoria 1:1',
    final_price: 997.00,
    approved_date: '2024-01-14',
    status: 'completed' as const,
  },
  {
    id: '3',
    buyer_name: 'Julia Costa',
    buyer_email: 'julia@email.com',
    product_name: 'Curso Instagram Estratégico',
    final_price: 497.00,
    approved_date: '2024-01-14',
    status: 'pending' as const,
  },
];

export default function AdminDashboard() {
  return (
    <Layout>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da SN Academy
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Vendas deste mês"
          value="R$ 12.450"
          description="Valor total de vendas"
          icon={DollarSign}
          trend={{ value: 12.5, positive: true }}
        />
        <MetricCard
          title="Vendas hoje"
          value="3"
          description="Novas vendas hoje"
          icon={TrendingUp}
          trend={{ value: 8.2, positive: true }}
        />
        <MetricCard
          title="Alunas ativas"
          value="127"
          description="Com acesso liberado"
          icon={Users}
          trend={{ value: 5.1, positive: true }}
        />
        <MetricCard
          title="Solicitações pendentes"
          value="8"
          description="Instagram privado"
          icon={Clock}
        />
      </div>

      {/* Recent Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendas Recentes</CardTitle>
          <CardDescription>
            Últimas vendas processadas pela Hotmart
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.buyer_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {sale.buyer_email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{sale.product_name}</TableCell>
                  <TableCell>
                    R$ {sale.final_price.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 2 
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(sale.approved_date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={sale.status}>
                      {sale.status === 'completed' ? 'Concluída' : 'Pendente'}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </Layout>
  );
}