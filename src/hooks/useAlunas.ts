import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AlunaFilters {
  curso?: string;
  dataInicio?: string;
  dataFim?: string;
}

export const useAlunas = (filters: AlunaFilters = {}, page: number = 1, limit: number = 50) => {
  return useQuery({
    queryKey: ['alunas', filters, page, limit],
    queryFn: async () => {
      let query = supabase
        .from('alunas_hotmart')
        .select('*', { count: 'exact' })
        .order('data_compra', { ascending: false });

      if (filters.curso) {
        query = query.eq('curso', filters.curso);
      }

      if (filters.dataInicio) {
        query = query.gte('data_compra', filters.dataInicio);
      }

      if (filters.dataFim) {
        query = query.lte('data_compra', filters.dataFim);
      }

      // Add pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;
      
      if (error) {
        console.error('Error fetching alunas:', error);
        throw error;
      }
      
      return {
        data: data || [],
        count: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      };
    },
  });
};

export const useCursos = () => {
  return useQuery({
    queryKey: ['cursos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alunas_hotmart')
        .select('curso')
        .not('curso', 'is', null);

      if (error) throw error;

      const cursos = [...new Set(data?.map(item => item.curso).filter(Boolean))];
      return cursos;
    },
  });
};

export const useCreateAluna = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (aluna: any) => {
      const { data, error } = await supabase
        .from('alunas_hotmart')
        .insert(aluna)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alunas'] });
    },
  });
};
