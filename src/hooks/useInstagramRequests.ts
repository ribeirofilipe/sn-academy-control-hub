
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface InstagramRequest {
  id: string;
  student_name: string;
  student_email: string;
  instagram_handle: string;
  instagram_url?: string;
  request_date: string;
  status: 'pending' | 'approved' | 'rejected';
  course?: string;
  message?: string;
  aluna_id?: string;
  created_at: string;
  updated_at: string;
}

export const useInstagramRequests = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['instagram-requests', page, pageSize],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from('instagram_requests')
        .select('*', { count: 'exact' })
        .order('request_date', { ascending: false })
        .range(from, to);

      if (error) {
        console.error('Error fetching instagram requests:', error);
        throw error;
      }

      return {
        data: data as InstagramRequest[],
        count: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize)
      };
    },
  });
};

export const useApproveInstagramRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ requestId, action }: { requestId: string; action: 'approve' | 'reject' }) => {
      if (action === 'approve') {
        // Buscar a solicitação
        const { data: request, error: requestError } = await supabase
          .from('instagram_requests')
          .select('*')
          .eq('id', requestId)
          .single();

        if (requestError) throw requestError;

        // Buscar aluna por email
        const { data: aluna, error: alunaError } = await supabase
          .from('alunas_hotmart')
          .select('id')
          .eq('email', request.student_email)
          .maybeSingle();

        if (alunaError) throw alunaError;

        if (aluna) {
          // Atualizar aluna com instagram_username
          const { error: updateError } = await supabase
            .from('alunas_hotmart')
            .update({ 
              instagram_username: request.instagram_handle,
              acesso_instagram: true,
              atualizado_em: new Date().toISOString()
            })
            .eq('id', aluna.id);

          if (updateError) throw updateError;

          // Atualizar solicitação para aprovada e linkar com aluna
          const { error: requestUpdateError } = await supabase
            .from('instagram_requests')
            .update({ 
              status: 'approved',
              aluna_id: aluna.id
            })
            .eq('id', requestId);

          if (requestUpdateError) throw requestUpdateError;
        } else {
          // Se não encontrou aluna, apenas aprovar a solicitação
          const { error: requestUpdateError } = await supabase
            .from('instagram_requests')
            .update({ status: 'approved' })
            .eq('id', requestId);

          if (requestUpdateError) throw requestUpdateError;
        }
      } else {
        // Rejeitar solicitação
        const { error } = await supabase
          .from('instagram_requests')
          .update({ status: 'rejected' })
          .eq('id', requestId);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instagram-requests'] });
      queryClient.invalidateQueries({ queryKey: ['alunas'] });
    },
  });
};

export const useCreateInstagramRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (request: Omit<InstagramRequest, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('instagram_requests')
        .insert(request)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instagram-requests'] });
    },
  });
};
