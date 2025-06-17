import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Clock,
  Instagram as InstagramIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Mock Instagram requests data
const instagramRequests = [
  {
    id: '1',
    student_name: 'Carla Santos',
    student_email: 'carla@email.com',
    instagram_handle: '@carla_santos',
    instagram_url: 'https://instagram.com/carla_santos',
    request_date: '2024-01-15T10:30:00Z',
    status: 'pending' as const,
    course: 'Mentoria 1:1',
    message: 'Olá! Gostaria de ter acesso ao Instagram privado para acompanhar o conteúdo exclusivo.',
  },
  {
    id: '2',
    student_name: 'Fernanda Lima',
    student_email: 'fernanda@email.com',
    instagram_handle: '@fe_lima_oficial',
    instagram_url: 'https://instagram.com/fe_lima_oficial',
    request_date: '2024-01-14T15:45:00Z',
    status: 'pending' as const,
    course: 'Curso Instagram Estratégico',
    message: 'Oi! Comprei o curso e gostaria de acessar o Instagram privado.',
  },
  {
    id: '3',
    student_name: 'Ana Silva',
    student_email: 'ana@email.com',
    instagram_handle: '@ana_silva_',
    instagram_url: 'https://instagram.com/ana_silva_',
    request_date: '2024-01-13T09:15:00Z',
    status: 'approved' as const,
    course: 'Curso Instagram Estratégico',
    message: 'Solicitando acesso ao conteúdo exclusivo do Instagram.',
  },
  {
    id: '4',
    student_name: 'Patricia Costa',
    student_email: 'patricia@email.com',
    instagram_handle: '@patcosta',
    instagram_url: 'https://instagram.com/patcosta',
    request_date: '2024-01-12T14:20:00Z',
    status: 'rejected' as const,
    course: 'Workshop Reels Virais',
    message: 'Gostaria de ter acesso ao Instagram privado.',
  },
];

export default function InstagramRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<typeof instagramRequests[0] | null>(null);
  const { toast } = useToast();

  const filteredRequests = instagramRequests.filter((request) => {
    const matchesSearch = 
      request.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.student_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.instagram_handle.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const pendingRequests = filteredRequests.filter(r => r.status === 'pending');
  const approvedRequests = filteredRequests.filter(r => r.status === 'approved');
  const rejectedRequests = filteredRequests.filter(r => r.status === 'rejected');

  const handleApproval = (requestId: string, action: 'approve' | 'reject') => {
    // Implementation for request approval/rejection
    toast({
      title: action === 'approve' ? 'Solicitação aprovada' : 'Solicitação rejeitada',
      description: `A solicitação foi ${action === 'approve' ? 'aprovada' : 'rejeitada'} com sucesso.`,
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Solicitações Instagram</h1>
        <p className="text-muted-foreground">
          Gerencie as solicitações de acesso ao Instagram privado
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou Instagram..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{filteredRequests.length}</div>
            <p className="text-sm text-muted-foreground">Total de solicitações</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-warning">{pendingRequests.length}</div>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success">{approvedRequests.length}</div>
            <p className="text-sm text-muted-foreground">Aprovadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-destructive">{rejectedRequests.length}</div>
            <p className="text-sm text-muted-foreground">Rejeitadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <InstagramIcon className="h-5 w-5" />
            Solicitações
          </CardTitle>
          <CardDescription>
            {filteredRequests.length} solicitações encontradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluna</TableHead>
                <TableHead>Instagram</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Data Solicitação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10">
                          {getInitials(request.student_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.student_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {request.student_email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <InstagramIcon className="h-4 w-4 text-pink-600" />
                      <span className="font-medium">{request.instagram_handle}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={request.instagram_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{request.course}</TableCell>
                  <TableCell>
                    {new Date(request.request_date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={request.status}>
                      {request.status === 'pending' ? 'Pendente' :
                       request.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApproval(request.id, 'approve')}
                            className="text-success hover:text-success hover:bg-success/10"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApproval(request.id, 'reject')}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedRequest(request)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalhes da Solicitação</DialogTitle>
                            <DialogDescription>
                              Informações completas da solicitação de acesso
                            </DialogDescription>
                          </DialogHeader>
                          {selectedRequest && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback className="bg-primary/10">
                                    {getInitials(selectedRequest.student_name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{selectedRequest.student_name}</h4>
                                  <p className="text-sm text-muted-foreground">{selectedRequest.student_email}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Instagram</label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <InstagramIcon className="h-4 w-4 text-pink-600" />
                                    <span>{selectedRequest.instagram_handle}</span>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Curso</label>
                                  <p className="mt-1">{selectedRequest.course}</p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Mensagem</label>
                                <p className="mt-1 text-sm text-muted-foreground">{selectedRequest.message}</p>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Status</label>
                                <div className="mt-1">
                                  <StatusBadge status={selectedRequest.status}>
                                    {selectedRequest.status === 'pending' ? 'Pendente' :
                                     selectedRequest.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                                  </StatusBadge>
                                </div>
                              </div>

                              {selectedRequest.status === 'pending' && (
                                <div className="flex gap-2 pt-4">
                                  <Button
                                    onClick={() => handleApproval(selectedRequest.id, 'approve')}
                                    className="flex-1"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Aprovar
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleApproval(selectedRequest.id, 'reject')}
                                    className="flex-1"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Rejeitar
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}