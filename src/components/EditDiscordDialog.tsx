
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Edit2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface EditDiscordDialogProps {
  aluna: { email: string; nome: string; discord_user_id?: string | null };
  onUpdate: () => void;
}

export const EditDiscordDialog = ({ aluna, onUpdate }: EditDiscordDialogProps) => {
  const [open, setOpen] = useState(false);
  const [discordUser, setDiscordUser] = useState(aluna.discord_user_id || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('alunas_hotmart')
        .update({ discord_user_id: discordUser })
        .eq('email', aluna.email);

      if (error) throw error;

      toast.success('Discord atualizado com sucesso para todos os cursos desta aluna!');
      setOpen(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating discord:', error);
      toast.error('Erro ao atualizar Discord');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Discord User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome da Aluna</Label>
            <Input
              value={aluna.nome}
              disabled
              className="bg-gray-100"
            />
          </div>

          <div>
            <Label htmlFor="discord_user">Discord User ID</Label>
            <Input
              id="discord_user"
              value={discordUser}
              onChange={(e) => setDiscordUser(e.target.value)}
              placeholder="Ex: usuario#1234 ou ID numérico"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
