
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Database, Users, BarChart3, Code, GitBranch } from "lucide-react";

const Index = () => {
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResult, setQueryResult] = useState("");

  // Dados simulados baseados na estrutura real
  const sampleLeads = [
    { 
      id: 1, 
      name: "João Silva - Projeto ERP", 
      price: 25000.00, 
      responsible_user_id: 1, 
      group_id: 1, 
      status_id: 1, 
      pipeline_id: 1, 
      created_by: 1, 
      created_at: "2024-01-15 10:30:00",
      account_id: 1
    },
    { 
      id: 2, 
      name: "Maria Santos - Sistema CRM", 
      price: 45000.00, 
      responsible_user_id: 2, 
      group_id: 1, 
      status_id: 2, 
      pipeline_id: 1, 
      created_by: 1, 
      created_at: "2024-01-20 14:15:00",
      account_id: 1
    },
    { 
      id: 3, 
      name: "Pedro Costa - App Mobile", 
      price: 80000.00, 
      responsible_user_id: 1, 
      group_id: 2, 
      status_id: 3, 
      pipeline_id: 1, 
      created_by: 2, 
      created_at: "2024-01-25 09:45:00",
      account_id: 1
    }
  ];

  const executeQuery = () => {
    if (sqlQuery.toLowerCase().includes("select") && sqlQuery.toLowerCase().includes("leads")) {
      setQueryResult(JSON.stringify(sampleLeads, null, 2));
    } else if (sqlQuery.toLowerCase().includes("select") && sqlQuery.toLowerCase().includes("users")) {
      const sampleUsers = [
        { id: 1, name: "Ana Silva", email: "ana@empresa.com", group_id: 1, role_id: 1 },
        { id: 2, name: "Carlos Santos", email: "carlos@empresa.com", group_id: 1, role_id: 2 }
      ];
      setQueryResult(JSON.stringify(sampleUsers, null, 2));
    } else {
      setQueryResult("Execute uma query SELECT em uma das tabelas para ver os resultados simulados.");
    }
  };

  const databaseTables = [
    {
      name: "leads",
      description: "Tabela principal de oportunidades de venda",
      fields: [
        { name: "id", type: "BIGINT PRIMARY KEY" },
        { name: "name", type: "TEXT" },
        { name: "price", type: "DECIMAL(10,2)" },
        { name: "responsible_user_id", type: "BIGINT" },
        { name: "group_id", type: "BIGINT" },
        { name: "status_id", type: "BIGINT" },
        { name: "pipeline_id", type: "BIGINT" },
        { name: "loss_reason_id", type: "BIGINT NULL" },
        { name: "created_by", type: "BIGINT" },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "account_id", type: "BIGINT" }
      ]
    },
    {
      name: "users",
      description: "Usuários do sistema",
      fields: [
        { name: "id", type: "BIGINT PRIMARY KEY" },
        { name: "name", type: "TEXT NOT NULL" },
        { name: "email", type: "TEXT NOT NULL UNIQUE" },
        { name: "group_id", type: "BIGINT NULL" },
        { name: "role_id", type: "BIGINT NULL" }
      ]
    },
    {
      name: "pipelines",
      description: "Funis de vendas",
      fields: [
        { name: "id", type: "BIGINT PRIMARY KEY" },
        { name: "name", type: "TEXT NOT NULL" }
      ]
    },
    {
      name: "statuses",
      description: "Status dos leads por pipeline",
      fields: [
        { name: "id", type: "BIGINT PRIMARY KEY" },
        { name: "name", type: "TEXT NOT NULL" },
        { name: "pipeline_id", type: "BIGINT" }
      ]
    },
    {
      name: "contacts",
      description: "Contatos associados aos leads",
      fields: [
        { name: "id", type: "BIGINT PRIMARY KEY" },
        { name: "name", type: "TEXT NOT NULL" },
        { name: "created_at", type: "TIMESTAMP NOT NULL" },
        { name: "created_by", type: "BIGINT NOT NULL" },
        { name: "phone_number", type: "TEXT NULL" }
      ]
    },
    {
      name: "events",
      description: "Log de eventos do sistema",
      fields: [
        { name: "id", type: "TEXT PRIMARY KEY" },
        { name: "entity_id", type: "INT" },
        { name: "type", type: "TEXT" },
        { name: "entity_type", type: "TEXT" },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "created_by", type: "INT" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Database className="text-blue-600" size={40} />
            Sistema CRM - Teste Técnico
          </h1>
          <p className="text-xl text-gray-600">
            Estrutura completa do banco de dados para análise e desenvolvimento de queries SQL
          </p>
        </div>

        <Tabs defaultValue="estrutura" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="estrutura" className="flex items-center gap-2">
              <Database size={16} />
              Estrutura DB
            </TabsTrigger>
            <TabsTrigger value="relacionamentos" className="flex items-center gap-2">
              <GitBranch size={16} />
              Relacionamentos
            </TabsTrigger>
            <TabsTrigger value="dados" className="flex items-center gap-2">
              <Users size={16} />
              Dados Exemplo
            </TabsTrigger>
            <TabsTrigger value="sql" className="flex items-center gap-2">
              <Code size={16} />
              Editor SQL
            </TabsTrigger>
            <TabsTrigger value="queries" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Queries Úteis
            </TabsTrigger>
          </TabsList>

          {/* Estrutura do Banco */}
          <TabsContent value="estrutura">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {databaseTables.map((table) => (
                <Card key={table.name} className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-blue-700">{table.name}</CardTitle>
                    <CardDescription>{table.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {table.fields.map((field) => (
                        <div key={field.name} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                          <span className="font-mono">{field.name}</span>
                          <Badge variant="outline" className="text-xs">{field.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Relacionamentos */}
          <TabsContent value="relacionamentos">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-green-700">Relacionamentos Principais</CardTitle>
                  <CardDescription>Foreign Keys e conexões entre tabelas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">leads → users</h4>
                      <p className="text-sm text-gray-600">responsible_user_id, created_by</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">leads → statuses</h4>
                      <p className="text-sm text-gray-600">status_id</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">statuses → pipelines</h4>
                      <p className="text-sm text-gray-600">pipeline_id (FK com CASCADE)</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">users → roles</h4>
                      <p className="text-sm text-gray-600">role_id (FK com SET NULL)</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">lead_custom_fields → leads</h4>
                      <p className="text-sm text-gray-600">lead_id (Campos customizados)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo-700">Tabelas de Apoio</CardTitle>
                  <CardDescription>Tabelas auxiliares e de log</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <h4 className="font-semibold text-indigo-800 mb-2">lead_tags</h4>
                      <p className="text-sm text-gray-600">Tags associadas aos leads</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg">
                      <h4 className="font-semibold text-teal-800 mb-2">events</h4>
                      <p className="text-sm text-gray-600">Log de eventos por entidade</p>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg">
                      <h4 className="font-semibold text-cyan-800 mb-2">events_values</h4>
                      <p className="text-sm text-gray-600">Valores antes/depois dos eventos</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">update_log</h4>
                      <p className="text-sm text-gray-600">Controle de atualizações por tabela</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Dados de Exemplo */}
          <TabsContent value="dados">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Dados de Exemplo - Leads</CardTitle>
                <CardDescription>Amostra baseada na estrutura real do teste técnico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">ID</th>
                        <th className="border border-gray-300 p-2 text-left">Nome</th>
                        <th className="border border-gray-300 p-2 text-left">Preço</th>
                        <th className="border border-gray-300 p-2 text-left">Responsável</th>
                        <th className="border border-gray-300 p-2 text-left">Status</th>
                        <th className="border border-gray-300 p-2 text-left">Pipeline</th>
                        <th className="border border-gray-300 p-2 text-left">Criado em</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2">{lead.id}</td>
                          <td className="border border-gray-300 p-2">{lead.name}</td>
                          <td className="border border-gray-300 p-2">R$ {lead.price.toLocaleString()}</td>
                          <td className="border border-gray-300 p-2">{lead.responsible_user_id}</td>
                          <td className="border border-gray-300 p-2">{lead.status_id}</td>
                          <td className="border border-gray-300 p-2">{lead.pipeline_id}</td>
                          <td className="border border-gray-300 p-2">{lead.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Editor SQL */}
          <TabsContent value="sql">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-700">Editor de Query SQL</CardTitle>
                  <CardDescription>Teste suas queries baseadas na estrutura real</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="-- Exemplo:
SELECT 
    l.name,
    l.price,
    u.name as responsavel,
    s.name as status
FROM leads l
JOIN users u ON l.responsible_user_id = u.id
JOIN statuses s ON l.status_id = s.id
ORDER BY l.price DESC;"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    className="font-mono min-h-[250px]"
                  />
                  <Button onClick={executeQuery} className="w-full bg-purple-600 hover:bg-purple-700">
                    Executar Query
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-green-700">Resultado da Query</CardTitle>
                  <CardDescription>Resultado simulado baseado na estrutura</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm min-h-[250px]">
                    {queryResult || "Execute uma query para ver os resultados aqui..."}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Queries Úteis */}
          <TabsContent value="queries">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Total de Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{sampleLeads.length}</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-green-700">Valor Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      R$ {sampleLeads.reduce((sum, lead) => sum + lead.price, 0).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Ticket Médio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">
                      R$ {Math.round(sampleLeads.reduce((sum, lead) => sum + lead.price, 0) / sampleLeads.length).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Exemplos de Queries para Teste Técnico</CardTitle>
                  <CardDescription>Queries comuns baseadas na estrutura real do banco</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">1. Leads com informações do responsável:</h4>
                      <code className="text-sm bg-white p-2 rounded block">
                        SELECT l.name, l.price, u.name as responsavel, u.email 
                        FROM leads l 
                        JOIN users u ON l.responsible_user_id = u.id;
                      </code>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">2. Leads por status com nome do pipeline:</h4>
                      <code className="text-sm bg-white p-2 rounded block">
                        SELECT s.name as status, p.name as pipeline, COUNT(l.id) as quantidade
                        FROM leads l 
                        JOIN statuses s ON l.status_id = s.id
                        JOIN pipelines p ON s.pipeline_id = p.id
                        GROUP BY s.name, p.name;
                      </code>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">3. Histórico de eventos por lead:</h4>
                      <code className="text-sm bg-white p-2 rounded block">
                        SELECT l.name, e.type, e.created_at, ev.value_before, ev.value_after
                        FROM leads l
                        JOIN events e ON l.id = e.entity_id AND e.entity_type = 'lead'
                        LEFT JOIN events_values ev ON e.id = ev.event_id
                        ORDER BY e.created_at DESC;
                      </code>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">4. Performance por usuário:</h4>
                      <code className="text-sm bg-white p-2 rounded block">
                        SELECT u.name, COUNT(l.id) as total_leads, 
                        SUM(l.price) as valor_total,
                        AVG(l.price) as ticket_medio
                        FROM users u
                        LEFT JOIN leads l ON u.id = l.responsible_user_id
                        GROUP BY u.id, u.name;
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
