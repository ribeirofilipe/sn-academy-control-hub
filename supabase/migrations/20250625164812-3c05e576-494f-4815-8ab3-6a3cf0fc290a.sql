
-- Ensure alunas_hotmart table has all necessary columns and create payment management table
-- Add any missing columns to alunas_hotmart if needed
ALTER TABLE alunas_hotmart 
ADD COLUMN IF NOT EXISTS pagamento_manual boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS tipo_pagamento text,
ADD COLUMN IF NOT EXISTS parcelas_total integer,
ADD COLUMN IF NOT EXISTS parcelas_pagas integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS valor_parcela numeric,
ADD COLUMN IF NOT EXISTS proximo_vencimento date,
ADD COLUMN IF NOT EXISTS observacoes_pagamento text;

-- Create payment management table for detailed payment tracking
CREATE TABLE IF NOT EXISTS pagamentos_manuais (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  aluna_id uuid REFERENCES alunas_hotmart(id) NOT NULL,
  numero_parcela integer NOT NULL,
  valor_parcela numeric NOT NULL,
  data_vencimento date NOT NULL,
  data_pagamento date,
  status text NOT NULL DEFAULT 'pendente', -- pendente, pago, vencido
  forma_pagamento text, -- boleto, pix, cartao
  observacoes text,
  notificacao_enviada boolean DEFAULT false,
  data_notificacao timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on new table
ALTER TABLE pagamentos_manuais ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for pagamentos_manuais (assuming admin access for now)
CREATE POLICY "Allow all operations for authenticated users" ON pagamentos_manuais
  FOR ALL USING (true);

-- Add trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_pagamentos()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pagamentos_manuais_updated_at
  BEFORE UPDATE ON pagamentos_manuais
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_pagamentos();
