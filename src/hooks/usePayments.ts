
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useAlunasPagamentoManual = () => {
  return useQuery({
    queryKey: ['alunas-pagamento-manual'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alunas_hotmart')
        .select('*')
        .eq('pagamento_manual', true)
        .order('data_compra', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const usePagamentosManuais = (alunaId?: string) => {
  return useQuery({
    queryKey: ['pagamentos-manuais', alunaId],
    queryFn: async () => {
      let query = supabase
        .from('pagamentos_manuais')
        .select(`
          *,
          alunas_hotmart (
            nome,
            email,
            curso
          )
        `)
        .order('data_vencimento', { ascending: true });

      if (alunaId) {
        query = query.eq('aluna_id', alunaId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreatePagamento = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (pagamento: any) => {
      const { data, error } = await supabase
        .from('pagamentos_manuais')
        .insert(pagamento)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagamentos-manuais'] });
    },
  });
};

export const useUpdatePagamento = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase
        .from('pagamentos_manuais')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagamentos-manuais'] });
    },
  });
};
