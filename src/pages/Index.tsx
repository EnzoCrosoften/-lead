import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { useCrmData } from "@/hooks/useCrmData";
import { LeadForm } from "@/components/LeadForm";
import { Lead } from "@/services/api";

const Index = () => {
  const {
    leads,
    users,
    pipelines,
    statuses,
    isLoading,
    createLead,
    updateLead,
    deleteLead,
  } = useCrmData();

  const [searchTerm, setSearchTerm] = useState("");
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | undefined>(undefined);

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = leads.reduce((sum, lead) => sum + lead.price, 0);
  const averageTicket = leads.length > 0 ? totalValue / leads.length : 0;

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `Usuário ${userId}`;
  };

  const getStatusName = (statusId: number) => {
    const status = statuses.find(s => s.id === statusId);
    return status ? status.name : `Status ${statusId}`;
  };

  const handleCreateLead = (leadData: Omit<Lead, 'id' | 'created_at'>) => {
    createLead(leadData);
  };

  const handleUpdateLead = (leadData: Omit<Lead, 'id' | 'created_at'>) => {
    if (editingLead) {
      updateLead({ id: editingLead.id, data: leadData });
      setEditingLead(undefined);
    }
  };

  const handleDeleteLead = (id: number) => {
    deleteLead(id);
  };

  const openEditForm = (lead: Lead) => {
    setEditingLead(lead);
    setIsLeadFormOpen(true);
  };

  const closeForm = () => {
    setIsLeadFormOpen(false);
    setEditingLead(undefined);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Carregando dados do CRM...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema CRM - Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Gestão completa de leads e oportunidades
          </p>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
              <p className="text-xs text-muted-foreground">
                {leads.length > 0 ? "+12% desde o último mês" : "Nenhum lead ainda"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Pipeline de vendas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {Math.round(averageTicket).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Por oportunidade
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
            <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          {/* Aba de Leads */}
          <TabsContent value="leads">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gerenciar Leads</CardTitle>
                    <CardDescription>
                      Lista de todas as oportunidades de venda
                    </CardDescription>
                  </div>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => setIsLeadFormOpen(true)}
                  >
                    <Plus size={16} />
                    Novo Lead
                  </Button>
                </div>
                
                {/* Barra de pesquisa */}
                <div className="flex gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Pesquisar leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    Filtros
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Nome</th>
                        <th className="text-left p-3">Valor</th>
                        <th className="text-left p-3">Responsável</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Criado em</th>
                        <th className="text-left p-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{lead.name}</td>
                          <td className="p-3">R$ {lead.price.toLocaleString()}</td>
                          <td className="p-3">{getUserName(lead.responsible_user_id)}</td>
                          <td className="p-3">
                            <Badge variant="outline">
                              {getStatusName(lead.status_id)}
                            </Badge>
                          </td>
                          <td className="p-3">
                            {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye size={14} />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => openEditForm(lead)}
                              >
                                <Edit size={14} />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Trash2 size={14} />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir o lead "{lead.name}"? 
                                      Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteLead(lead.id)}
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Usuários */}
          <TabsContent value="usuarios">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Usuários do Sistema</CardTitle>
                <CardDescription>
                  Gerenciar usuários e permissões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Nome</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Grupo</th>
                        <th className="text-left p-3">Role</th>
                        <th className="text-left p-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{user.name}</td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">Grupo {user.group_id}</td>
                          <td className="p-3">Role {user.role_id}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit size={14} />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Pipelines */}
          <TabsContent value="pipelines">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Pipelines de Venda</CardTitle>
                <CardDescription>
                  Configurar funis e status de venda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelines.map((pipeline) => (
                    <div key={pipeline.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">{pipeline.name}</h3>
                      <div className="flex gap-2 flex-wrap">
                        {statuses
                          .filter(status => status.pipeline_id === pipeline.id)
                          .map((status) => (
                            <Badge key={status.id} variant="secondary">
                              {status.name}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Relatórios */}
          <TabsContent value="relatorios">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Relatórios e Análises</CardTitle>
                <CardDescription>
                  Insights sobre performance de vendas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Conversão por Status</h4>
                    <div className="space-y-2">
                      {statuses.map((status) => {
                        const leadsInStatus = leads.filter(l => l.status_id === status.id).length;
                        const percentage = leads.length > 0 ? (leadsInStatus / leads.length) * 100 : 0;
                        return (
                          <div key={status.id} className="flex justify-between">
                            <span>{status.name}</span>
                            <span>{percentage.toFixed(1)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Performance por Usuário</h4>
                    <div className="space-y-2">
                      {users.map((user) => {
                        const userLeads = leads.filter(l => l.responsible_user_id === user.id);
                        const userValue = userLeads.reduce((sum, lead) => sum + lead.price, 0);
                        return (
                          <div key={user.id} className="flex justify-between">
                            <span>{user.name}</span>
                            <span>R$ {userValue.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Lead Form */}
        <LeadForm
          isOpen={isLeadFormOpen}
          onClose={closeForm}
          onSubmit={editingLead ? handleUpdateLead : handleCreateLead}
          users={users}
          statuses={statuses}
          pipelines={pipelines}
          lead={editingLead}
        />
      </div>
    </div>
  );
};

export default Index;
