
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useUpdateAlunaStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from('alunas_hotmart')
        .update({ status_acesso: status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alunas'] });
      queryClient.invalidateQueries({ queryKey: ['alunas-stats'] });
      toast.success('Status da aluna atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Error updating aluna status:', error);
      toast.error('Erro ao atualizar status da aluna');
    },
  });
};
