
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateAluna } from '@/hooks/useAlunas';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

export const CreateAlunaDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    curso: '',
    valor_pago: 0,
    valor_liquido: 0,
    valor_bruto: 0,
    forma_pagamento: '',
    status_acesso: 'pendente',
    data_compra: new Date().toISOString().split('T')[0],
  });

  const createAluna = useCreateAluna();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createAluna.mutateAsync({
        ...formData,
        valor_bruto: formData.valor_bruto,
        valor_pago: formData.valor_bruto,
        pagamento_manual: true, // Sempre define como pagamento manual
        forma_pagamento: 'manual', // Adiciona tipo de pagamento manual
        parcelas_total: 1, // Define padrão de 1 parcela
        parcelas_pagas: 0, // Inicia com 0 parcelas pagas
      });
      
      toast.success('Aluna adicionada com sucesso! Ela aparecerá na aba "Gerenciar Pagamentos" para controle manual.');
      setOpen(false);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        curso: '',
        valor_bruto: 0,
        valor_liquido: 0,
        valor_pago: 0,
        forma_pagamento: '',
        status_acesso: 'pendente',
        data_compra: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error creating aluna:', error);
      toast.error('Erro ao adicionar aluna');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Adicionar Aluna
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Adicionar Nova Aluna (Manual)</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>
  
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
  
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            />
          </div>
  
          <div>
            <Label htmlFor="curso">Curso *</Label>
            <Input
              id="curso"
              value={formData.curso}
              onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
              required
            />
          </div>
  
          <div>
            <Label htmlFor="valor_bruto">Valor Bruto *</Label>
            <Input
              id="valor_bruto"
              type="number"
              step="0.01"
              value={formData.valor_bruto}
              onChange={(e) => setFormData({ ...formData, valor_bruto: e.target.value })}
              required
            />
          </div>
  
          <div>
            <Label htmlFor="forma_pagamento">Forma de Pagamento</Label>
            <Select
              value={formData.forma_pagamento}
              onValueChange={(value) => setFormData({ ...formData, forma_pagamento: value })}
            >
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
            <Label htmlFor="data_compra">Data da Compra *</Label>
            <Input
              id="data_compra"
              type="date"
              value={formData.data_compra}
              onChange={(e) => setFormData({ ...formData, data_compra: e.target.value })}
              required
            />
          </div>
        </div>
  
        <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
          <strong>Nota:</strong> Esta aluna será marcada como "Pagamento Manual" e aparecerá na aba "Gerenciar Pagamentos" para controle das parcelas.
        </div>
  
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" disabled={createAluna.isPending}>
            {createAluna.isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
  );
};
