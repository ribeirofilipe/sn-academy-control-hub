
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X } from 'lucide-react';
import { useCursos } from '@/hooks/useAlunas';

export interface AlunaFiltersProps {
  filters: {
    curso?: string;
    dataInicio?: string;
    dataFim?: string;
    query?: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

export const AlunaFilters = ({ filters, onFiltersChange, onClearFilters }: AlunaFiltersProps) => {
  const { data: cursos } = useCursos();

  const hasActiveFilters = filters.curso || filters.dataInicio || filters.dataFim;

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 🔍 Filtro por texto */}
            <div>
              <label className="text-sm font-medium mb-2 block">Buscar aluna</label>
              <Input
                type="text"
                placeholder="Nome, email ou transação"
                value={filters.query || ""}
                onChange={(e) =>
                  onFiltersChange({ ...filters, query: e.target.value || undefined })
                }
              />
            </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Curso</label>
            <Select
              value={filters.curso || ""}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, curso: value || undefined })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os cursos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os cursos</SelectItem>
                {cursos?.map((curso) => (
                  <SelectItem key={curso} value={curso}>
                    {curso}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Data início</label>
            <Input
              type="date"
              value={filters.dataInicio || ""}
              onChange={(e) => 
                onFiltersChange({ ...filters, dataInicio: e.target.value || undefined })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Data fim</label>
            <Input
              type="date"
              value={filters.dataFim || ""}
              onChange={(e) => 
                onFiltersChange({ ...filters, dataFim: e.target.value || undefined })
              }
            />
          </div>

          <div className="flex items-end gap-2">
            <Button
              variant="outline"
              onClick={onClearFilters}
              disabled={!hasActiveFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Limpar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
