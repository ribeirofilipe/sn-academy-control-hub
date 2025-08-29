import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreatePagamento } from '@/hooks/usePayments';
import { toast } from 'sonner';

interface CreateInstallmentsFormProps {
  alunaId: string | null;
}

export const CreateInstallmentsForm = ({ alunaId }: CreateInstallmentsFormProps) => {
  const [numeroParcelas, setNumeroParcelas] = useState(1);
  const [valorParcela, setValorParcela] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');

  const createPagamento = useCreatePagamento();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!alunaId) {
      toast.error('Selecione uma compra primeiro');
      return;
    }

    if (!valorParcela || !dataVencimento || !formaPagamento) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const valor = parseFloat(valorParcela);
      const dataBase = new Date(dataVencimento);

      for (let i = 0; i < numeroParcelas; i++) {
        const dataVencimentoParcela = new Date(dataBase);
        dataVencimentoParcela.setMonth(dataBase.getMonth() + i);

        await createPagamento.mutateAsync({
          aluna_id: alunaId,
          numero_parcela: i + 1,
          valor: valor,
          data_vencimento: dataVencimentoParcela.toISOString().split('T')[0],
          forma_pagamento: formaPagamento,
          status: 'pendente'
        });
      }

      toast.success(`${numeroParcelas} parcela(s) criada(s) com sucesso!`);
      
      // Reset form
      setNumeroParcelas(1);
      setValorParcela('');
      setDataVencimento('');
      setFormaPagamento('');
    } catch (error) {
      console.error('Error creating installments:', error);
      toast.error('Erro ao criar parcelas');
    }
  };

  if (!alunaId) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Selecione uma compra para criar parcelas
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Parcelas</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="numeroParcelas">Número de Parcelas</Label>
            <Input
              id="numeroParcelas"
              type="number"
              min="1"
              max="12"
              value={numeroParcelas}
              onChange={(e) => setNumeroParcelas(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <Label htmlFor="valorParcela">Valor da Parcela *</Label>
            <Input
              id="valorParcela"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={valorParcela}
              onChange={(e) => setValorParcela(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
            <Select value={formaPagamento} onValueChange={setFormaPagamento} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="cartao">Cartão</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dataVencimento">1º Vencimento *</Label>
            <Input
              id="dataVencimento"
              type="date"
              value={dataVencimento}
              onChange={(e) => setDataVencimento(e.target.value)}
              required
            />
          </div>

          {numeroParcelas > 1 && (
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              <strong>Datas de vencimento:</strong>
              {Array.from({ length: numeroParcelas }, (_, i) => {
                if (!dataVencimento) return null;
                const data = new Date(dataVencimento);
                data.setMonth(data.getMonth() + i);
                return (
                  <div key={i}>
                    Parcela {i + 1}: {data.toLocaleDateString('pt-BR')}
                  </div>
                );
              })}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={createPagamento.isPending}
          >
            {createPagamento.isPending ? 'Criando...' : `Criar ${numeroParcelas} Parcela(s)`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};