
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
  Instagram as InstagramIcon
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useInstagramRequests, useApproveInstagramRequest } from '@/hooks/useInstagramRequests';
import { Layout } from '@/components/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function InstagramRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  
  const { data: instagramRequests = [], isLoading, refetch } = useInstagramRequests();
  const approveMutation = useApproveInstagramRequest();

  const filteredRequests = instagramRequests
    .filter((request) => request.status === statusFilter)
    .filter((request) => {
      const search = searchTerm.toLowerCase();
      return (
        request.student_name.toLowerCase().includes(search) ||
        request.student_email.toLowerCase().includes(search) ||
        request.instagram_handle.toLowerCase().includes(search)
      );
  });


  const pendingRequests = filteredRequests.filter(r => r.status === 'pending');
  const approvedRequests = filteredRequests.filter(r => r.status === 'approved');
  const rejectedRequests = filteredRequests.filter(r => r.status === 'rejected');

  const handleApproval = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      await approveMutation.mutateAsync({ requestId, action });
      toast.success(
        action === 'approve' 
          ? 'Solicitação aprovada com sucesso!' 
          : 'Solicitação rejeitada com sucesso!'
      );
      refetch();
    } catch (error) {
      console.error('Error handling approval:', error);
      toast.error('Erro ao processar solicitação');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Campo de busca */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou Instagram..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtro por status */}
              <div className="w-full md:w-48">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="approved">Aprovado</SelectItem>
                    <SelectItem value="rejected">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma solicitação encontrada
              </div>
            ) : (
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
                          {request.instagram_url && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={request.instagram_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{request.course || '-'}</TableCell>
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
                                disabled={approveMutation.isPending}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApproval(request.id, 'reject')}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                disabled={approveMutation.isPending}
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
                                      <p className="mt-1">{selectedRequest.course || '-'}</p>
                                    </div>
                                  </div>

                                  {selectedRequest.message && (
                                    <div>
                                      <label className="text-sm font-medium">Mensagem</label>
                                      <p className="mt-1 text-sm text-muted-foreground">{selectedRequest.message}</p>
                                    </div>
                                  )}

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
                                        disabled={approveMutation.isPending}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Aprovar
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        onClick={() => handleApproval(selectedRequest.id, 'reject')}
                                        className="flex-1"
                                        disabled={approveMutation.isPending}
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
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
