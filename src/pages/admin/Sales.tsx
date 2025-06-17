import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter } from 'lucide-react';

// Mock sales data
const salesData = [
  {
    id: '1',
    transaction_id: 'HP123456789',
    buyer_name: 'Ana Silva',
    buyer_email: 'ana@email.com',
    product_name: 'Curso Instagram Estratégico',
    final_price: 497.00,
    affiliate_name: 'Parceiro Premium',
    affiliate_code: 'PREM001',
    approved_date: '2024-01-15T10:30:00Z',
    status: 'completed' as const,
    payment_method: 'credit_card',
  },
  {
    id: '2',
    transaction_id: 'HP123456790',
    buyer_name: 'Carla Santos',
    buyer_email: 'carla@email.com',
    product_name: 'Mentoria 1:1',
    final_price: 997.00,
    affiliate_name: 'SN Academy',
    affiliate_code: 'DIRECT',
    approved_date: '2024-01-14T15:45:00Z',
    status: 'completed' as const,
    payment_method: 'pix',
  },
  {
    id: '3',
    transaction_id: 'HP123456791',
    buyer_name: 'Julia Costa',
    buyer_email: 'julia@email.com',
    product_name: 'Curso Instagram Estratégico',
    final_price: 497.00,
    affiliate_name: 'Parceiro Gold',
    affiliate_code: 'GOLD002',
    approved_date: '2024-01-14T09:15:00Z',
    status: 'pending' as const,
    payment_method: 'boleto',
  },
  {
    id: '4',
    transaction_id: 'HP123456792',
    buyer_name: 'Mariana Oliveira',
    buyer_email: 'mariana@email.com',
    product_name: 'Workshop Reels Virais',
    final_price: 197.00,
    affiliate_name: 'SN Academy',
    affiliate_code: 'DIRECT',
    approved_date: '2024-01-13T14:20:00Z',
    status: 'completed' as const,
    payment_method: 'credit_card',
  },
];

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [affiliateFilter, setAffiliateFilter] = useState('all');

  const filteredSales = salesData.filter((sale) => {
    const matchesSearch = 
      sale.buyer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.buyer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.transaction_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    
    const matchesAffiliate = affiliateFilter === 'all' || sale.affiliate_name === affiliateFilter;
    
    return matchesSearch && matchesStatus && matchesAffiliate;
  });

  const totalValue = filteredSales.reduce((sum, sale) => sum + sale.final_price, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestão de Vendas</h1>
        <p className="text-muted-foreground">
          Gerencie todas as vendas processadas pela Hotmart
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou ID da transação..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="completed">Concluídas</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={affiliateFilter} onValueChange={setAffiliateFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Afiliado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os afiliados</SelectItem>
                <SelectItem value="SN Academy">SN Academy</SelectItem>
                <SelectItem value="Parceiro Premium">Parceiro Premium</SelectItem>
                <SelectItem value="Parceiro Gold">Parceiro Gold</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {filteredSales.length}
            </div>
            <p className="text-sm text-muted-foreground">Total de vendas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-muted-foreground">Valor total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              R$ {(totalValue / filteredSales.length || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-muted-foreground">Ticket médio</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendas</CardTitle>
          <CardDescription>
            {filteredSales.length} vendas encontradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transação</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Afiliado</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-mono text-sm">
                    {sale.transaction_id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.buyer_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {sale.buyer_email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{sale.product_name}</TableCell>
                  <TableCell className="font-medium">
                    R$ {sale.final_price.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 2 
                    })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.affiliate_name}</div>
                      <Badge variant="outline" className="text-xs">
                        {sale.affiliate_code}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(sale.approved_date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {sale.payment_method === 'credit_card' ? 'Cartão' :
                       sale.payment_method === 'pix' ? 'PIX' : 'Boleto'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={sale.status}>
                      {sale.status === 'completed' ? 'Concluída' : 
                       sale.status === 'pending' ? 'Pendente' : 'Cancelada'}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}