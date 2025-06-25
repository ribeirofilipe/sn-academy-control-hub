
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlunaFilters } from '@/components/AlunaFilters';
import { AlunasList } from '@/components/AlunasList';
import { CreateAlunaDialog } from '@/components/CreateAlunaDialog';
import { useAlunas } from '@/hooks/useAlunas';
import { Users } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Students = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  
  const { data: alunasPaginated, isLoading, refetch } = useAlunas(filters, currentPage, itemsPerPage);
  const alunas = alunasPaginated?.data || [];
  const totalPages = alunasPaginated?.totalPages || 1;
  const totalCount = alunasPaginated?.count || 0;

  const handleClearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleUpdate = () => {
    refetch();
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
              <div className="text-2xl font-bold">{totalCount}</div>
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
              <CardTitle className="text-sm font-medium">Com Discord</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {alunas.filter(a => a.discord_user_id).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <AlunaFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        <AlunasList 
          alunas={alunas} 
          isLoading={isLoading} 
          onUpdate={handleUpdate}
        />

        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = currentPage <= 3 
                    ? i + 1 
                    : currentPage >= totalPages - 2 
                    ? totalPages - 4 + i 
                    : currentPage - 2 + i;
                    
                  if (pageNumber < 1 || pageNumber > totalPages) return null;
                  
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <div className="text-sm text-muted-foreground text-center">
          Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, totalCount)} de {totalCount} alunas
        </div>
      </div>
    </Layout>
  );
};

export default Students;
