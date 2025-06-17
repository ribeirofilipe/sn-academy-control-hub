import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  MessageCircle,
  Instagram as InstagramIcon,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  BookOpen,
  Send
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Mock student data - in real app this would come from API
const studentData = {
  id: '2',
  name: 'Maria Silva',
  email: 'maria@email.com',
  course: 'Curso Instagram Estratégico',
  purchase_date: '2024-01-15',
  expiry_date: '2025-01-15',
  discord_access: true,
  instagram_access: 'pending' as 'approved' | 'pending' | 'rejected' | null,
  instagram_handle: '@maria_silva_',
  access_days_remaining: 350,
};

export default function StudentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [instagramHandle, setInstagramHandle] = useState(studentData.instagram_handle || '');
  const [requestMessage, setRequestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInstagramRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Solicitação enviada!',
      description: 'Sua solicitação de acesso ao Instagram foi enviada. Aguarde a aprovação.',
    });

    setIsSubmitting(false);
  };

  const getAccessStatusIcon = (hasAccess: boolean) => {
    return hasAccess ? (
      <CheckCircle className="h-5 w-5 text-success" />
    ) : (
      <XCircle className="h-5 w-5 text-muted-foreground" />
    );
  };

  const getInstagramStatusIcon = (status: 'approved' | 'pending' | 'rejected' | null) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <XCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Olá, {user?.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Bem-vinda à sua área da aluna da SN Academy
        </p>
      </div>

      {/* Course Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Seu Curso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{studentData.course}</h3>
              <p className="text-sm text-muted-foreground">
                Adquirido em {new Date(studentData.purchase_date).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="text-right">
              <StatusBadge status="active">
                Ativo
              </StatusBadge>
              <p className="text-sm text-muted-foreground mt-1">
                {studentData.access_days_remaining} dias restantes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Status Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Discord Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Discord
            </CardTitle>
            <CardDescription>
              Acesso ao servidor Discord da SN Academy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getAccessStatusIcon(studentData.discord_access)}
                <div>
                  <p className="font-medium">
                    {studentData.discord_access ? 'Acesso Liberado' : 'Sem Acesso'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {studentData.discord_access 
                      ? 'Você já pode acessar o servidor' 
                      : 'Aguardando liberação automática'
                    }
                  </p>
                </div>
              </div>
              {studentData.discord_access && (
                <Button variant="outline" size="sm">
                  Acessar Discord
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instagram Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <InstagramIcon className="h-5 w-5" />
              Instagram Privado
            </CardTitle>
            <CardDescription>
              Acesso ao Instagram privado com conteúdo exclusivo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getInstagramStatusIcon(studentData.instagram_access)}
                <div>
                  <p className="font-medium">
                    {studentData.instagram_access === 'approved' ? 'Acesso Aprovado' :
                     studentData.instagram_access === 'pending' ? 'Aguardando Aprovação' :
                     studentData.instagram_access === 'rejected' ? 'Solicitação Rejeitada' :
                     'Não Solicitado'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {studentData.instagram_access === 'approved' ? 'Você já pode acessar @snacademy' :
                     studentData.instagram_access === 'pending' ? 'Sua solicitação está em análise' :
                     studentData.instagram_access === 'rejected' ? 'Entre em contato com o suporte' :
                     'Solicite acesso ao Instagram privado'}
                  </p>
                </div>
              </div>
              {studentData.instagram_access === 'approved' && (
                <Button variant="outline" size="sm">
                  Acessar Instagram
                </Button>
              )}
              {studentData.instagram_access === null && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      Solicitar Acesso
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Solicitar Acesso ao Instagram</DialogTitle>
                      <DialogDescription>
                        Preencha os dados abaixo para solicitar acesso ao Instagram privado da SN Academy
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleInstagramRequest} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="instagram-handle">Seu Instagram</Label>
                        <Input
                          id="instagram-handle"
                          value={instagramHandle}
                          onChange={(e) => setInstagramHandle(e.target.value)}
                          placeholder="@seu_instagram"
                          required
                        />
                        <p className="text-sm text-muted-foreground">
                          Digite seu username do Instagram (com @)
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="request-message">Mensagem (opcional)</Label>
                        <Textarea
                          id="request-message"
                          value={requestMessage}
                          onChange={(e) => setRequestMessage(e.target.value)}
                          placeholder="Conte um pouco sobre você ou deixe uma mensagem..."
                          rows={3}
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Solicitação
                          </>
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Access Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Detalhes do Acesso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Data de Compra</Label>
              <p className="text-sm font-medium">
                {new Date(studentData.purchase_date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Data de Expiração</Label>
              <p className="text-sm font-medium">
                {new Date(studentData.expiry_date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Importante:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Seu acesso ao Discord é liberado automaticamente após a compra</li>
              <li>• Para acessar o Instagram privado, você precisa solicitar e aguardar aprovação</li>
              <li>• Em caso de dúvidas, entre em contato pelo suporte@snacademy.com</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}