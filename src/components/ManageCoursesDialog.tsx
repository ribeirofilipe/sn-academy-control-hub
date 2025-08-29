import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusSelect } from './StatusSelect';
import { Settings } from 'lucide-react';

interface ManageCoursesDialogProps {
  email: string;
  nome: string;
}

export const ManageCoursesDialog = ({ email, nome }: ManageCoursesDialogProps) => {
  const [open, setOpen] = useState(false);

  const { data: cursos, isLoading } = useQuery({
    queryKey: ['aluna-cursos', email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alunas_hotmart')
        .select('*')
        .eq('email', email)
        .order('data_compra', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: open,
  });

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gerenciar Cursos - {nome}</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {cursos?.map((curso) => (
              <div key={curso.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {getCourseBadge(curso.curso)}
                    </Badge>
                    {curso.pagamento_manual && (
                      <Badge variant="destructive">Manual</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Compra: {formatDate(curso.data_compra)}
                  </p>
                </div>
                <StatusSelect 
                  currentStatus={curso.status_acesso || 'pendente'} 
                  alunaId={curso.id}
                />
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};