import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useCreateManualPurchase, useGetExistingStudentName } from '@/hooks/useManualPurchases';
import { useCreatePagamento } from '@/hooks/usePayments';
import { toast } from 'sonner';

interface CreateManualPurchaseFormProps {
  onPurchaseCreated: (email: string, alunaId: string) => void;
}

export const CreateManualPurchaseForm = ({ onPurchaseCreated }: CreateManualPurchaseFormProps) => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [dataCompra, setDataCompra] = useState(new Date().toISOString().split('T')[0]);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [gerarParcelas, setGerarParcelas] = useState(false);
  const [numeroParcelas, setNumeroParcelas] = useState(1);
  const [valorParcela, setValorParcela] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [formaPagamentoParcela, setFormaPagamentoParcela] = useState('');

  const createPurchase = useCreateManualPurchase();
  const createPagamento = useCreatePagamento();
  const { data: existingName } = useGetExistingStudentName(email);

  useEffect(() => {
    if (existingName && !nome) {
      setNome(existingName);
    }
  }, [existingName, nome]);

  const cursos = [
    'Mentoria Presencial Plantas',
    'Ebook Plantas 7 Dias',
    'Curso Completo Plantas',
    'Mentoria Online Plantas',
    'Curso Básico Plantas'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !nome || !curso || !formaPagamento) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (gerarParcelas && (!valorParcela || !dataVencimento || !formaPagamentoParcela)) {
      toast.error('Preencha todos os campos das parcelas');
      return;
    }

    try {
      // Criar a compra
      const newPurchase = await createPurchase.mutateAsync({
        email,
        nome,
        curso,
        data_compra: dataCompra,
        forma_pagamento: formaPagamento,
        valor_liquido: valorTotal ? parseFloat(valorTotal) : undefined,
        observacoes: observacoes || undefined
      });

      // Se deve gerar parcelas, criar elas também
      if (gerarParcelas) {
        const valor = parseFloat(valorParcela);
        const dataBase = new Date(dataVencimento);

        for (let i = 0; i < numeroParcelas; i++) {
          const dataVencimentoParcela = new Date(dataBase);
          dataVencimentoParcela.setMonth(dataBase.getMonth() + i);

          await createPagamento.mutateAsync({
            aluna_id: newPurchase.id,
            numero_parcela: i + 1,
            valor: valor,
            data_vencimento: dataVencimentoParcela.toISOString().split('T')[0],
            forma_pagamento: formaPagamentoParcela,
            status: 'pendente'
          });
        }
      }

      toast.success(
        gerarParcelas 
          ? `Compra criada com ${numeroParcelas} parcela(s)!`
          : 'Compra criada com sucesso!'
      );
      
      // Reset form
      setEmail('');
      setNome('');
      setCurso('');
      setDataCompra(new Date().toISOString().split('T')[0]);
      setFormaPagamento('');
      setValorTotal('');
      setObservacoes('');
      setGerarParcelas(false);
      setNumeroParcelas(1);
      setValorParcela('');
      setDataVencimento('');
      setFormaPagamentoParcela('');

      // Selecionar a compra criada
      onPurchaseCreated(email, newPurchase.id);
    } catch (error) {
      console.error('Error creating manual purchase:', error);
      toast.error('Erro ao criar compra manual');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Compra Manual</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="aluna@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Nome da aluna"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            {existingName && (
              <p className="text-sm text-muted-foreground mt-1">
                Nome encontrado: {existingName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="curso">Curso *</Label>
            <Select value={curso} onValueChange={setCurso} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o curso..." />
              </SelectTrigger>
              <SelectContent>
                {cursos.map((cursoOption) => (
                  <SelectItem key={cursoOption} value={cursoOption}>
                    {cursoOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dataCompra">Data da Compra</Label>
            <Input
              id="dataCompra"
              type="date"
              value={dataCompra}
              onChange={(e) => setDataCompra(e.target.value)}
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
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="valorTotal">Valor Total (opcional)</Label>
            <Input
              id="valorTotal"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={valorTotal}
              onChange={(e) => setValorTotal(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações sobre a compra..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="gerarParcelas"
              checked={gerarParcelas}
              onCheckedChange={setGerarParcelas}
            />
            <Label htmlFor="gerarParcelas">Gerar parcelas agora</Label>
          </div>

          {gerarParcelas && (
            <div className="border-t pt-4 space-y-4">
              <h3 className="font-medium">Configuração das Parcelas</h3>
              
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
                <Label htmlFor="formaPagamentoParcela">Forma de Pagamento das Parcelas *</Label>
                <Select value={formaPagamentoParcela} onValueChange={setFormaPagamentoParcela} required>
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

              {numeroParcelas > 1 && dataVencimento && (
                <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  <strong>Datas de vencimento:</strong>
                  {Array.from({ length: numeroParcelas }, (_, i) => {
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
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={createPurchase.isPending || createPagamento.isPending}
          >
            {createPurchase.isPending || createPagamento.isPending 
              ? 'Criando...' 
              : gerarParcelas 
                ? `Criar Compra + ${numeroParcelas} Parcela(s)`
                : 'Criar Compra'
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};