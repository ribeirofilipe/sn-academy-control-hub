import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AlunaFilters } from './useAlunas';

export interface AggregatedAluna {
  email: string;
  nome: string;
  cursos: Array<{
    id: string;
    curso: string;
    status_acesso: string;
    valor_liquido: number;
    valor_pago: number;
    data_compra: string;
  }>;
  discord_user_id: string | null;
  telefone: string | null;
}

export const useAlunasAggregated = (filters: AlunaFilters = {}, page: number = 1, limit: number = 50) => {
  return useQuery({
    queryKey: ['alunas-aggregated', filters, page, limit],
    queryFn: async () => {
      let query = supabase
        .from('alunas_hotmart')
        .select('*')
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

      if (filters.query) {
        const q = filters.query.toLowerCase();
        query = query.or(
          `email.ilike.*${q}*,nome.ilike.*${q}*,transacao.ilike.*${q}*`
        );
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching alunas:', error);
        throw error;
      }

      // Group by email
      const grouped = (data || []).reduce((acc, aluna) => {
        if (!acc[aluna.email]) {
          acc[aluna.email] = {
            email: aluna.email,
            nome: aluna.nome,
            discord_user_id: aluna.discord_user_id,
            telefone: aluna.telefone,
            cursos: []
          };
        }
        
        acc[aluna.email].cursos.push({
          id: aluna.id,
          curso: aluna.curso,
          status_acesso: aluna.status_acesso,
          valor_liquido: aluna.valor_liquido,
          valor_pago: aluna.valor_pago,
          data_compra: aluna.data_compra
        });

        return acc;
      }, {} as Record<string, AggregatedAluna>);

      const aggregatedData = Object.values(grouped);
      const count = aggregatedData.length;
      
      // Apply pagination to aggregated data
      const from = (page - 1) * limit;
      const to = from + limit;
      const paginatedData = aggregatedData.slice(from, to);
      
      return {
        data: paginatedData,
        count,
        totalPages: Math.ceil(count / limit)
      };
    },
  });
};