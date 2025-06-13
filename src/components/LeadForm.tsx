
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Lead, User, Status, Pipeline } from "@/services/api";

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lead: Omit<Lead, 'id' | 'created_at'>) => void;
  users: User[];
  statuses: Status[];
  pipelines: Pipeline[];
  lead?: Lead;
}

export const LeadForm = ({ isOpen, onClose, onSubmit, users, statuses, pipelines, lead }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    name: lead?.name || '',
    price: lead?.price || 0,
    responsible_user_id: lead?.responsible_user_id || 0,
    group_id: lead?.group_id || 1,
    status_id: lead?.status_id || 0,
    pipeline_id: lead?.pipeline_id || 0,
    account_id: lead?.account_id || 1,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.price <= 0 || !formData.responsible_user_id || !formData.status_id || !formData.pipeline_id) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
    onClose();
    setFormData({
      name: '',
      price: 0,
      responsible_user_id: 0,
      group_id: 1,
      status_id: 0,
      pipeline_id: 0,
      account_id: 1,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{lead ? 'Editar Lead' : 'Novo Lead'}</SheetTitle>
          <SheetDescription>
            Preencha os dados do lead abaixo.
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="name">Nome do Lead *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: João Silva - Projeto ERP"
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Valor (R$) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              placeholder="0"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <Label htmlFor="responsible">Responsável *</Label>
            <Select 
              value={formData.responsible_user_id.toString()} 
              onValueChange={(value) => setFormData({ ...formData, responsible_user_id: Number(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um responsável" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pipeline">Pipeline *</Label>
            <Select 
              value={formData.pipeline_id.toString()} 
              onValueChange={(value) => setFormData({ ...formData, pipeline_id: Number(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um pipeline" />
              </SelectTrigger>
              <SelectContent>
                {pipelines.map((pipeline) => (
                  <SelectItem key={pipeline.id} value={pipeline.id.toString()}>
                    {pipeline.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status *</Label>
            <Select 
              value={formData.status_id.toString()} 
              onValueChange={(value) => setFormData({ ...formData, status_id: Number(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                {statuses
                  .filter(status => status.pipeline_id === formData.pipeline_id)
                  .map((status) => (
                    <SelectItem key={status.id} value={status.id.toString()}>
                      {status.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {lead ? 'Atualizar' : 'Criar'} Lead
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
