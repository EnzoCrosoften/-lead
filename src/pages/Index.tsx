
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Database, Users, BarChart3, Code } from "lucide-react";

const Index = () => {
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResult, setQueryResult] = useState("");

  // Dados simulados de leads
  const sampleLeads = [
    { id: 1, nome: "João Silva", email: "joao@email.com", status: "Novo", origem: "Website", valor_potencial: 5000 },
    { id: 2, nome: "Maria Santos", email: "maria@email.com", status: "Qualificado", origem: "LinkedIn", valor_potencial: 8000 },
    { id: 3, nome: "Pedro Costa", email: "pedro@email.com", status: "Negociação", origem: "Referência", valor_potencial: 12000 },
    { id: 4, nome: "Ana Lima", email: "ana@email.com", status: "Convertido", origem: "Google Ads", valor_potencial: 15000 },
  ];

  const executeQuery = () => {
    if (sqlQuery.toLowerCase().includes("select") && sqlQuery.toLowerCase().includes("leads")) {
      setQueryResult(JSON.stringify(sampleLeads, null, 2));
    } else {
      setQueryResult("Execute uma query SELECT na tabela 'leads' para ver os resultados.");
    }
  };

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
            Ferramenta para análise e desenvolvimento de queries SQL para gerenciamento de leads
          </p>
        </div>

        <Tabs defaultValue="estrutura" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="estrutura" className="flex items-center gap-2">
              <Database size={16} />
              Estrutura DB
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users size={16} />
              Dados Leads
            </TabsTrigger>
            <TabsTrigger value="sql" className="flex items-center gap-2">
              <Code size={16} />
              Editor SQL
            </TabsTrigger>
            <TabsTrigger value="analise" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Análise
            </TabsTrigger>
          </TabsList>

          {/* Estrutura do Banco */}
          <TabsContent value="estrutura">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-blue-700">Tabela: leads</CardTitle>
                  <CardDescription>Estrutura principal para gerenciamento de leads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="font-mono">id</span>
                      <Badge variant="outline">INT PRIMARY KEY</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-mono">nome</span>
                      <Badge variant="outline">VARCHAR(100)</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-mono">email</span>
                      <Badge variant="outline">VARCHAR(150)</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-mono">telefone</span>
                      <Badge variant="outline">VARCHAR(20)</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-mono">status</span>
                      <Badge variant="outline">ENUM</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-mono">origem</span>
                      <Badge variant="outline">VARCHAR(50)</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-mono">valor_potencial</span>
                      <Badge variant="outline">DECIMAL(10,2)</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-mono">data_criacao</span>
                      <Badge variant="outline">DATETIME</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-green-700">Status dos Leads</CardTitle>
                  <CardDescription>Possíveis valores para o campo status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Novo</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Em Contato</Badge>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Qualificado</Badge>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Proposta</Badge>
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Negociação</Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Convertido</Badge>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Perdido</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Dados dos Leads */}
          <TabsContent value="leads">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Dados de Exemplo - Leads</CardTitle>
                <CardDescription>Amostra de dados para análise e desenvolvimento de queries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">ID</th>
                        <th className="border border-gray-300 p-2 text-left">Nome</th>
                        <th className="border border-gray-300 p-2 text-left">Email</th>
                        <th className="border border-gray-300 p-2 text-left">Status</th>
                        <th className="border border-gray-300 p-2 text-left">Origem</th>
                        <th className="border border-gray-300 p-2 text-left">Valor Potencial</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-2">{lead.id}</td>
                          <td className="border border-gray-300 p-2">{lead.nome}</td>
                          <td className="border border-gray-300 p-2">{lead.email}</td>
                          <td className="border border-gray-300 p-2">
                            <Badge variant="outline">{lead.status}</Badge>
                          </td>
                          <td className="border border-gray-300 p-2">{lead.origem}</td>
                          <td className="border border-gray-300 p-2">R$ {lead.valor_potencial.toLocaleString()}</td>
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
                  <CardDescription>Escreva e teste suas queries aqui</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="-- Exemplo:
SELECT nome, email, status, valor_potencial 
FROM leads 
WHERE status = 'Convertido' 
ORDER BY valor_potencial DESC;"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    className="font-mono min-h-[200px]"
                  />
                  <Button onClick={executeQuery} className="w-full bg-purple-600 hover:bg-purple-700">
                    Executar Query
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-green-700">Resultado da Query</CardTitle>
                  <CardDescription>Resultado simulado baseado nos dados de exemplo</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {queryResult || "Execute uma query para ver os resultados aqui..."}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Análise */}
          <TabsContent value="analise">
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
                  <CardTitle className="text-green-700">Taxa de Conversão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round((sampleLeads.filter(lead => lead.status === 'Convertido').length / sampleLeads.length) * 100)}%
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-purple-700">Valor Total Potencial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">
                    R$ {sampleLeads.reduce((sum, lead) => sum + lead.valor_potencial, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm shadow-lg mt-6">
              <CardHeader>
                <CardTitle>Exemplos de Queries Úteis para CRM</CardTitle>
                <CardDescription>Queries comuns para análise de leads e vendas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">1. Leads por Status:</h4>
                    <code className="text-sm bg-white p-2 rounded block">
                      SELECT status, COUNT(*) as quantidade FROM leads GROUP BY status;
                    </code>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">2. Top 5 Leads por Valor:</h4>
                    <code className="text-sm bg-white p-2 rounded block">
                      SELECT nome, valor_potencial FROM leads ORDER BY valor_potencial DESC LIMIT 5;
                    </code>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">3. Taxa de Conversão por Origem:</h4>
                    <code className="text-sm bg-white p-2 rounded block">
                      SELECT origem, COUNT(*) as total, 
                      SUM(CASE WHEN status = 'Convertido' THEN 1 ELSE 0 END) as convertidos
                      FROM leads GROUP BY origem;
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
