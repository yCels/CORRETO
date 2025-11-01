import React, { useState } from 'react';
import { Cabecalho } from '../Cabecalho';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useDados } from '../../context/DadosContext';
import { Aeronave } from '../../types';

interface AeronavesProps {
  onVoltar: () => void;
  onSair: () => void;
}

export function Aeronaves({ onVoltar, onSair }: AeronavesProps) {
  const { dados, atualizarDados } = useDados();
  const [dialogAberto, setDialogAberto] = useState(false);
  const [novaAeronave, setNovaAeronave] = useState({
    codigo: '',
    modelo: '',
    tipo: '' as 'Comercial' | 'Militar' | '',
    capacidade: '',
    alcance: ''
  });

  const handleCadastrar = () => {
    if (!novaAeronave.codigo || !novaAeronave.modelo || !novaAeronave.tipo || 
        !novaAeronave.capacidade || !novaAeronave.alcance) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const aeronave: Aeronave = {
      id: Date.now(),
      codigo: novaAeronave.codigo,
      modelo: novaAeronave.modelo,
      tipo: novaAeronave.tipo as 'Comercial' | 'Militar',
      capacidade: parseInt(novaAeronave.capacidade),
      alcance: parseInt(novaAeronave.alcance)
    };

    atualizarDados({ aeronaves: [...dados.aeronaves, aeronave] });
    setDialogAberto(false);
    setNovaAeronave({ codigo: '', modelo: '', tipo: '', capacidade: '', alcance: '' });
    alert('Aeronave cadastrada com sucesso!');
  };

  const handleExcluir = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta aeronave?')) {
      atualizarDados({ aeronaves: dados.aeronaves.filter(a => a.id !== id) });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Cabecalho onSair={onSair} />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={onVoltar} variant="outline">
            Voltar
          </Button>
          <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
            <DialogTrigger asChild>
              <Button className="bg-blue-900 hover:bg-blue-800">
                Cadastrar Aeronave
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Aeronave</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código:</Label>
                  <Input
                    id="codigo"
                    value={novaAeronave.codigo}
                    onChange={(e) => setNovaAeronave({ ...novaAeronave, codigo: e.target.value })}
                    placeholder="Digite o código"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo:</Label>
                  <Input
                    id="modelo"
                    value={novaAeronave.modelo}
                    onChange={(e) => setNovaAeronave({ ...novaAeronave, modelo: e.target.value })}
                    placeholder="Digite o modelo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo:</Label>
                  <Select value={novaAeronave.tipo} onValueChange={(value) => setNovaAeronave({ ...novaAeronave, tipo: value as 'Comercial' | 'Militar' })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Militar">Militar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacidade">Capacidade de Passageiros:</Label>
                  <Input
                    id="capacidade"
                    type="number"
                    value={novaAeronave.capacidade}
                    onChange={(e) => setNovaAeronave({ ...novaAeronave, capacidade: e.target.value })}
                    placeholder="Digite a capacidade"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alcance">Alcance (km):</Label>
                  <Input
                    id="alcance"
                    type="number"
                    value={novaAeronave.alcance}
                    onChange={(e) => setNovaAeronave({ ...novaAeronave, alcance: e.target.value })}
                    placeholder="Digite o alcance"
                  />
                </div>
                <Button onClick={handleCadastrar} className="w-full bg-blue-900 hover:bg-blue-800">
                  Cadastrar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Capacidade</TableHead>
                <TableHead>Alcance (km)</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dados.aeronaves.map(aeronave => (
                <TableRow key={aeronave.id}>
                  <TableCell>{aeronave.codigo}</TableCell>
                  <TableCell>{aeronave.modelo}</TableCell>
                  <TableCell>{aeronave.tipo}</TableCell>
                  <TableCell>{aeronave.capacidade} passageiros</TableCell>
                  <TableCell>{aeronave.alcance} km</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleExcluir(aeronave.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
