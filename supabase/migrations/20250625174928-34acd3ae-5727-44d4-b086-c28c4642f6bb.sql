
-- Criar tabela para solicitações do Instagram vindas do Google Forms
CREATE TABLE public.instagram_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name text NOT NULL,
  student_email text NOT NULL,
  instagram_handle text NOT NULL,
  instagram_url text,
  request_date timestamp with time zone NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending',
  course text,
  message text,
  aluna_id uuid REFERENCES public.alunas_hotmart(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Adicionar RLS (Row Level Security)
ALTER TABLE public.instagram_requests ENABLE ROW LEVEL SECURITY;

-- Política para permitir acesso completo (assumindo que é uma área admin)
CREATE POLICY "Allow all operations for instagram_requests" 
  ON public.instagram_requests 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_instagram_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_instagram_requests_updated_at
  BEFORE UPDATE ON public.instagram_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_instagram_requests_updated_at();
