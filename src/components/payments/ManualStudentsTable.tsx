import { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAlunasPagamentoManual } from '@/hooks/usePayments';
import { formatCurrency } from '@/lib/utils';

interface ManualStudentsTableProps {
  onSelect: (email: string, alunaId: string) => void;
  selectedAlunaId?: string | null;
}

export const ManualStudentsTable = ({ onSelect, selectedAlunaId }: ManualStudentsTableProps) => {
  const { data, isLoading } = useAlunasPagamentoManual();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!data) return [];
    const s = search.trim().toLowerCase();
    if (!s) return data;
    return data.filter((a) =>
      [a.nome, a.email, a.curso].some((v) => (v || '').toLowerCase().includes(s))
    );
  }, [data, search]);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Buscar por nome, e-mail ou curso"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Data compra</TableHead>
              <TableHead>Forma</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">Carregando...</TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhuma aluna encontrada</TableCell>
              </TableRow>
            ) : (
              filtered.map((aluna) => (
                <TableRow
                  key={aluna.id}
                  className={selectedAlunaId === aluna.id ? 'bg-muted/40' : ''}
                >
                  <TableCell className="font-medium">{aluna.nome}</TableCell>
                  <TableCell className="truncate max-w-[220px]">{aluna.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{aluna.curso}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(aluna.data_compra as unknown as string)}</TableCell>
                  <TableCell className="uppercase text-xs text-muted-foreground">{aluna.forma_pagamento}</TableCell>
                  <TableCell>{formatCurrency(Number(aluna.valor_liquido) || 0)}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => onSelect(aluna.email, aluna.id)}>
                      Selecionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
