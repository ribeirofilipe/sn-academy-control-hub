import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Instagram as InstagramIcon,
  MessageCircle,
  Clock
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock students data
const studentsData = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@email.com',
    purchase_date: '2024-01-15',
    expiry_date: '2025-01-15',
    status: 'active' as const,
    discord_access: true,
    instagram_access: 'approved' as const,
    instagram_handle: '@ana_silva_',
    course: 'Curso Instagram Estratégico',
  },
  {
    id: '2',
    name: 'Carla Santos',
    email: 'carla@email.com',
    purchase_date: '2024-01-14',
    expiry_date: '2025-01-14',
    status: 'active' as const,
    discord_access: true,
    instagram_access: 'pending' as const,
    instagram_handle: '@carla_santos',
    course: 'Mentoria 1:1',
  },
  {
    id: '3',
    name: 'Julia Costa',
    email: 'julia@email.com',
    purchase_date: '2024-01-14',
    expiry_date: '2025-01-14',
    status: 'active' as const,
    discord_access: false,
    instagram_access: null,
    instagram_handle: null,
    course: 'Curso Instagram Estratégico',
  },
  {
    id: '4',
    name: 'Mariana Oliveira',
    email: 'mariana@email.com',
    purchase_date: '2023-12-01',
    expiry_date: '2024-12-01',
    status: 'expired' as const,
    discord_access: false,
    instagram_access: 'rejected' as const,
    instagram_handle: '@mari_oli',
    course: 'Workshop Reels Virais',
  },
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [accessFilter, setAccessFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<typeof studentsData[0] | null>(null);
  const { toast } = useToast();

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    const matchesAccess = accessFilter === 'all' || 
      (accessFilter === 'discord' && student.discord_access) ||
      (accessFilter === 'instagram' && student.instagram_access === 'approved') ||
      (accessFilter === 'none' && !student.discord_access && !student.instagram_access);
    
    return matchesSearch && matchesStatus && matchesAccess;
  });

  const handleDiscordToggle = (studentId: string, currentStatus: boolean) => {
    // Implementation for Discord access toggle
    toast({
      title: currentStatus ? 'Acesso Discord removido' : 'Acesso Discord liberado',
      description: `O acesso foi ${currentStatus ? 'removido' : 'liberado'} com sucesso.`,
    });
  };

  const handleInstagramApproval = (studentId: string, action: 'approve' | 'reject') => {
    // Implementation for Instagram approval
    toast({
      title: action === 'approve' ? 'Solicitação aprovada' : 'Solicitação rejeitada',
      description: `A solicitação de Instagram foi ${action === 'approve' ? 'aprovada' : 'rejeitada'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestão de Alunas</h1>
        <p className="text-muted-foreground">
          Gerencie o acesso e status das alunas
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativas</SelectItem>
                <SelectItem value="expired">Expiradas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={accessFilter} onValueChange={setAccessFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Acesso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os acessos</SelectItem>
                <SelectItem value="discord">Com Discord</SelectItem>
                <SelectItem value="instagram">Com Instagram</SelectItem>
                <SelectItem value="none">Sem acessos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{filteredStudents.length}</div>
            <p className="text-sm text-muted-foreground">Total de alunas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {filteredStudents.filter(s => s.status === 'active').length}
            </div>
            <p className="text-sm text-muted-foreground">Alunas ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {filteredStudents.filter(s => s.discord_access).length}
            </div>
            <p className="text-sm text-muted-foreground">Com Discord</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {filteredStudents.filter(s => s.instagram_access === 'approved').length}
            </div>
            <p className="text-sm text-muted-foreground">Com Instagram</p>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alunas</CardTitle>
          <CardDescription>
            {filteredStudents.length} alunas encontradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluna</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Data Compra</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Discord</TableHead>
                <TableHead>Instagram</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {student.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>
                    {new Date(student.purchase_date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={student.status}>
                      {student.status === 'active' ? 'Ativa' : 'Expirada'}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {student.discord_access ? (
                        <Badge className="bg-success/10 text-success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Ativo
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <XCircle className="h-3 w-3 mr-1" />
                          Inativo
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDiscordToggle(student.id, student.discord_access)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {student.instagram_access === 'approved' && (
                        <Badge className="bg-success/10 text-success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Aprovado
                        </Badge>
                      )}
                      {student.instagram_access === 'pending' && (
                        <Badge className="bg-warning/10 text-warning">
                          <Clock className="h-3 w-3 mr-1" />
                          Pendente
                        </Badge>
                      )}
                      {student.instagram_access === 'rejected' && (
                        <Badge variant="outline">
                          <XCircle className="h-3 w-3 mr-1" />
                          Rejeitado
                        </Badge>
                      )}
                      {student.instagram_access === null && (
                        <Badge variant="outline">
                          Não solicitado
                        </Badge>
                      )}
                      {student.instagram_access === 'pending' && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleInstagramApproval(student.id, 'approve')}
                          >
                            <CheckCircle className="h-4 w-4 text-success" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleInstagramApproval(student.id, 'reject')}
                          >
                            <XCircle className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(student)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Aluna</DialogTitle>
                          <DialogDescription>
                            Gerencie os acessos e informações da aluna
                          </DialogDescription>
                        </DialogHeader>
                        {selectedStudent && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium">{selectedStudent.name}</h4>
                              <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Discord</label>
                                <div className="flex items-center gap-2 mt-1">
                                  <StatusBadge status={selectedStudent.discord_access ? 'active' : 'expired'}>
                                    {selectedStudent.discord_access ? 'Ativo' : 'Inativo'}
                                  </StatusBadge>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Instagram</label>
                                <div className="flex items-center gap-2 mt-1">
                                  {selectedStudent.instagram_access && (
                                    <StatusBadge status={selectedStudent.instagram_access}>
                                      {selectedStudent.instagram_access === 'approved' ? 'Aprovado' :
                                       selectedStudent.instagram_access === 'pending' ? 'Pendente' : 'Rejeitado'}
                                    </StatusBadge>
                                  )}
                                  {selectedStudent.instagram_handle && (
                                    <span className="text-sm text-muted-foreground">
                                      {selectedStudent.instagram_handle}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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