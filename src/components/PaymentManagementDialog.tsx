
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreatePagamento } from '@/hooks/usePayments';
import { toast } from 'sonner';
import { CreditCard } from 'lucide-react';

interface PaymentManagementDialogProps {
  aluna: any;
}

export const PaymentManagementDialog = ({ aluna }: PaymentManagementDialogProps) => {
  const [open, setOpen] = useState(false);
  const [parcelas, setParcelas] = useState('1');
  const [valorParcela, setValorParcela] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');

  const createPagamento = useCreatePagamento();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const numParcelas = parseInt(parcelas);
    const valor = parseFloat(valorParcela);
    
    if (!numParcelas || !valor || !dataVencimento || !formaPagamento) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      // Create installments
      const parcelsToCreate = [];
      const baseDate = new Date(dataVencimento);
      
      for (let i = 0; i < numParcelas; i++) {
        const vencimento = new Date(baseDate);
        vencimento.setMonth(vencimento.getMonth() + i);
        
        parcelsToCreate.push({
          aluna_id: aluna.id,
          numero_parcela: i + 1,
          valor_parcela: valor,
          data_vencimento: vencimento.toISOString().split('T')[0],
          forma_pagamento: formaPagamento,
          status: 'pendente'
        });
      }

      // Create all installments
      for (const parcela of parcelsToCreate) {
        await createPagamento.mutateAsync(parcela);
      }

      toast.success(`${numParcelas} parcela(s) criada(s) com sucesso!`);
      setOpen(false);
      setParcelas('1');
      setValorParcela('');
      setDataVencimento('');
      setFormaPagamento('');
    } catch (error) {
      console.error('Error creating payment:', error);
      toast.error('Erro ao criar parcelas');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Gerenciar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Gerenciar Pagamento - {aluna.nome}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="parcelas">Número de Parcelas *</Label>
            <Input
              id="parcelas"
              type="number"
              min="1"
              max="12"
              value={parcelas}
              onChange={(e) => setParcelas(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="valor">Valor por Parcela *</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              value={valorParcela}
              onChange={(e) => setValorParcela(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="forma">Forma de Pagamento *</Label>
            <Select value={formaPagamento} onValueChange={setFormaPagamento}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="cartao">Cartão</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="vencimento">Data do Primeiro Vencimento *</Label>
            <Input
              id="vencimento"
              type="date"
              value={dataVencimento}
              onChange={(e) => setDataVencimento(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createPagamento.isPending}>
              {createPagamento.isPending ? 'Criando...' : 'Criar Parcelas'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
