import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CreateManualPurchaseData {
  email: string;
  nome: string;
  curso: string;
  data_compra: string;
  forma_pagamento: string;
  valor_liquido?: number;
  observacoes?: string;
}

export const useCreateManualPurchase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (purchaseData: CreateManualPurchaseData) => {
      const { data, error } = await supabase
        .from('alunas_hotmart')
        .insert({
          ...purchaseData,
          pagamento_manual: true,
          origin: 'manual',
          status_acesso: 'pendente',
          valor_pago: 0,
          acesso_discord: false,
          acesso_instagram: false
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alunas-pagamento-manual'] });
      queryClient.invalidateQueries({ queryKey: ['alunas-aggregated'] });
    },
  });
};

export const useGetExistingStudentName = (email: string) => {
  return useQuery({
    queryKey: ['existing-student-name', email],
    queryFn: async () => {
      if (!email || email.length < 3) return null;
      
      const { data, error } = await supabase
        .from('alunas_hotmart')
        .select('nome')
        .eq('email', email)
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data?.nome || null;
    },
    enabled: !!email && email.length >= 3,
  });
};