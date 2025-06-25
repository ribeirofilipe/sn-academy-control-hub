import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Settings as SettingsIcon, 
  Webhook, 
  MessageCircle, 
  Instagram as InstagramIcon,
  Bell,
  Shield,
  Palette
} from 'lucide-react';
import { Layout } from '@/components/Layout';

export default function Settings() {
  const [webhookUrl, setWebhookUrl] = useState('https://api.snacademy.com/webhook/hotmart');
  const [discordBotToken, setDiscordBotToken] = useState('');
  const [discordServerId, setDiscordServerId] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('@snacademy');
  const [expiryDays, setExpiryDays] = useState('365');
  const [autoApproveDiscord, setAutoApproveDiscord] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: 'Configurações salvas',
      description: `As configurações de ${section} foram salvas com sucesso.`,
    });
  };

  return (
    <Layout>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Configure a integração e comportamento da plataforma
        </p>
      </div>

      <Tabs defaultValue="webhook" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="webhook" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhook
          </TabsTrigger>
          <TabsTrigger value="discord" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Discord
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <InstagramIcon className="h-4 w-4" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            Geral
          </TabsTrigger>
        </TabsList>

        <TabsContent value="webhook" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Configuração Webhook Hotmart
              </CardTitle>
              <CardDescription>
                Configure o endpoint para receber os webhooks da Hotmart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL do Webhook</Label>
                <Input
                  id="webhook-url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://api.snacademy.com/webhook/hotmart"
                />
                <p className="text-sm text-muted-foreground">
                  Esta URL deve ser configurada no painel da Hotmart
                </p>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Importante:</strong> Configure a validação de token/assinatura para garantir a segurança dos webhooks.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label>Eventos Configurados</Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                    PURCHASE_COMPLETED
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                    PURCHASE_APPROVED
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                    PURCHASE_CANCELLED
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                    SUBSCRIPTION_CANCELLATION
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave('webhook')}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discord" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Configuração Discord
              </CardTitle>
              <CardDescription>
                Configure a integração com o Discord para liberação automática de acessos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="discord-token">Token do Bot Discord</Label>
                <Input
                  id="discord-token"
                  type="password"
                  value={discordBotToken}
                  onChange={(e) => setDiscordBotToken(e.target.value)}
                  placeholder="MTk4NjIyNDgzNDcxNDI1NTg3Mg.YnT7wA.iI0HjCxdGLQ4GDJ6x8K1-JJpJKs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discord-server">ID do Servidor</Label>
                <Input
                  id="discord-server"
                  value={discordServerId}
                  onChange={(e) => setDiscordServerId(e.target.value)}
                  placeholder="123456789012345678"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Liberação Automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Liberar acesso automaticamente após compra aprovada
                  </p>
                </div>
                <Switch
                  checked={autoApproveDiscord}
                  onCheckedChange={setAutoApproveDiscord}
                />
              </div>

              <Alert>
                <MessageCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tutorial:</strong> Vá em Discord Developer Portal → New Application → Bot → Copy Token
                </AlertDescription>
              </Alert>

              <Button onClick={() => handleSave('Discord')}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InstagramIcon className="h-5 w-5" />
                Configuração Instagram
              </CardTitle>
              <CardDescription>
                Configure as informações do Instagram privado da SN Academy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagram-username">Username do Instagram</Label>
                <Input
                  id="instagram-username"
                  value={instagramUsername}
                  onChange={(e) => setInstagramUsername(e.target.value)}
                  placeholder="@snacademy"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram-welcome">Mensagem de Boas-vindas</Label>
                <Textarea
                  id="instagram-welcome"
                  placeholder="Olá {nome}! Bem-vinda ao Instagram privado da SN Academy..."
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  Use {"{nome}"} para personalizar com o nome da aluna
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram-rules">Regras do Instagram</Label>
                <Textarea
                  id="instagram-rules"
                  placeholder="📋 Regras do Instagram Privado:\n1. Não compartilhe o conteúdo\n2. Respeite outras alunas..."
                  rows={6}
                />
              </div>

              <Button onClick={() => handleSave('Instagram')}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificação
              </CardTitle>
              <CardDescription>
                Configure como e quando receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber emails sobre novas vendas e solicitações
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações Slack</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar notificações para canal do Slack
                    </p>
                  </div>
                  <Switch
                    checked={slackNotifications}
                    onCheckedChange={setSlackNotifications}
                  />
                </div>
              </div>

              {emailNotifications && (
                <div className="space-y-2">
                  <Label htmlFor="notification-email">Email para Notificações</Label>
                  <Input
                    id="notification-email"
                    type="email"
                    placeholder="admin@snacademy.com"
                  />
                </div>
              )}

              {slackNotifications && (
                <div className="space-y-2">
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input
                    id="slack-webhook"
                    placeholder="https://hooks.slack.com/services/..."
                  />
                </div>
              )}

              <Button onClick={() => handleSave('notificações')}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>
                Configurações gerais da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-days">Dias para Expiração do Acesso</Label>
                <Input
                  id="expiry-days"
                  type="number"
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(e.target.value)}
                  placeholder="365"
                />
                <p className="text-sm text-muted-foreground">
                  Número de dias após a compra para expirar o acesso
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-name">Nome da Plataforma</Label>
                <Input
                  id="platform-name"
                  defaultValue="SN Academy"
                  placeholder="SN Academy"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-email">Email de Suporte</Label>
                <Input
                  id="support-email"
                  type="email"
                  placeholder="suporte@snacademy.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome-message">Mensagem de Boas-vindas</Label>
                <Textarea
                  id="welcome-message"
                  placeholder="Olá {nome}! Bem-vinda à SN Academy. Seu acesso foi liberado..."
                  rows={4}
                />
              </div>

              <Button onClick={() => handleSave('configurações gerais')}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </Layout>
  );
}