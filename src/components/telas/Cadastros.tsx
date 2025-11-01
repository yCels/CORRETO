import React, { useState } from 'react';
import { Cabecalho } from '../Cabecalho';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useDados } from '../../context/DadosContext';
import { Aeronave, Peca, Etapa, Teste } from '../../types';

interface CadastrosProps {
  onVoltar: () => void;
  onSair: () => void;
}

export function Cadastros({ onVoltar, onSair }: CadastrosProps) {
  const { dados, atualizarDados } = useDados();
  const [dialogAeronave, setDialogAeronave] = useState(false);
  const [dialogPeca, setDialogPeca] = useState(false);
  const [dialogEtapa, setDialogEtapa] = useState(false);
  const [dialogTeste, setDialogTeste] = useState(false);

  const [novaAeronave, setNovaAeronave] = useState({
    codigo: '', modelo: '', tipo: '' as 'Comercial' | 'Militar' | '', capacidade: '', alcance: ''
  });
  const [novaPeca, setNovaPeca] = useState({
    nome: '', tipo: '' as 'Nacional' | 'Importada' | '', fornecedor: ''
  });
  const [novaEtapa, setNovaEtapa] = useState({ nome: '', data: '' });
  const [novoTeste, setNovoTeste] = useState({
    tipo: '' as 'Elétrico' | 'Hidráulico' | 'Aerodinâmico' | '',
    resultado: '' as 'Aprovado' | 'Reprovado' | ''
  });

  const handleCadastrarAeronave = () => {
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
    setDialogAeronave(false);
    setNovaAeronave({ codigo: '', modelo: '', tipo: '', capacidade: '', alcance: '' });
    alert('Aeronave cadastrada com sucesso!');
  };

  const handleCadastrarPeca = () => {
    if (!novaPeca.nome || !novaPeca.tipo || !novaPeca.fornecedor) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    const peca: Peca = {
      id: Date.now(),
      nome: novaPeca.nome,
      tipo: novaPeca.tipo as 'Nacional' | 'Importada',
      fornecedor: novaPeca.fornecedor
    };
    atualizarDados({ pecas: [...dados.pecas, peca] });
    setDialogPeca(false);
    setNovaPeca({ nome: '', tipo: '', fornecedor: '' });
    alert('Peça cadastrada com sucesso!');
  };

  const handleCadastrarEtapa = () => {
    if (!novaEtapa.nome || !novaEtapa.data) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    const etapa: Etapa = {
      id: Date.now(),
      nome: novaEtapa.nome,
      data: novaEtapa.data,
      status: 'Pendente'
    };
    atualizarDados({ etapas: [...dados.etapas, etapa] });
    setDialogEtapa(false);
    setNovaEtapa({ nome: '', data: '' });
    alert('Etapa cadastrada com sucesso!');
  };

  const handleCadastrarTeste = () => {
    if (!novoTeste.tipo || !novoTeste.resultado) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    const teste: Teste = {
      id: Date.now(),
      tipo: novoTeste.tipo as 'Elétrico' | 'Hidráulico' | 'Aerodinâmico',
      resultado: novoTeste.resultado as 'Aprovado' | 'Reprovado'
    };
    atualizarDados({ testes: [...dados.testes, teste] });
    setDialogTeste(false);
    setNovoTeste({ tipo: '', resultado: '' });
    alert('Teste cadastrado com sucesso!');
  };

  const formatarData = (data: string) => {
    const partes = data.split('-');
    if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
    return data;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Cabecalho onSair={onSair} />
      <div className="max-w-7xl mx-auto p-6">
        <Button onClick={onVoltar} variant="outline" className="mb-6">
          Voltar
        </Button>

        <Tabs defaultValue="aeronaves" className="bg-white rounded-lg shadow p-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="aeronaves">Aeronaves</TabsTrigger>
            <TabsTrigger value="pecas">Peças</TabsTrigger>
            <TabsTrigger value="etapas">Etapas</TabsTrigger>
            <TabsTrigger value="testes">Testes</TabsTrigger>
          </TabsList>

          <TabsContent value="aeronaves" className="space-y-4">
            <Dialog open={dialogAeronave} onOpenChange={setDialogAeronave}>
              <DialogTrigger asChild>
                <Button className="bg-blue-900 hover:bg-blue-800">Cadastrar Aeronave</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Aeronave</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Código:</Label>
                    <Input value={novaAeronave.codigo} onChange={(e) => setNovaAeronave({ ...novaAeronave, codigo: e.target.value })} placeholder="Digite o código" />
                  </div>
                  <div className="space-y-2">
                    <Label>Modelo:</Label>
                    <Input value={novaAeronave.modelo} onChange={(e) => setNovaAeronave({ ...novaAeronave, modelo: e.target.value })} placeholder="Digite o modelo" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo:</Label>
                    <Select value={novaAeronave.tipo} onValueChange={(value) => setNovaAeronave({ ...novaAeronave, tipo: value as 'Comercial' | 'Militar' })}>
                      <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Comercial">Comercial</SelectItem>
                        <SelectItem value="Militar">Militar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Capacidade de Passageiros:</Label>
                    <Input type="number" value={novaAeronave.capacidade} onChange={(e) => setNovaAeronave({ ...novaAeronave, capacidade: e.target.value })} placeholder="Digite a capacidade" />
                  </div>
                  <div className="space-y-2">
                    <Label>Alcance (km):</Label>
                    <Input type="number" value={novaAeronave.alcance} onChange={(e) => setNovaAeronave({ ...novaAeronave, alcance: e.target.value })} placeholder="Digite o alcance" />
                  </div>
                  <Button onClick={handleCadastrarAeronave} className="w-full bg-blue-900 hover:bg-blue-800">Cadastrar</Button>
                </div>
              </DialogContent>
            </Dialog>
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
                      <Button onClick={() => atualizarDados({ aeronaves: dados.aeronaves.filter(a => a.id !== aeronave.id) })} variant="destructive" size="sm">Excluir</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="pecas" className="space-y-4">
            <Dialog open={dialogPeca} onOpenChange={setDialogPeca}>
              <DialogTrigger asChild>
                <Button className="bg-blue-900 hover:bg-blue-800">Cadastrar Peça</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Peça</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome:</Label>
                    <Input value={novaPeca.nome} onChange={(e) => setNovaPeca({ ...novaPeca, nome: e.target.value })} placeholder="Digite o nome da peça" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo:</Label>
                    <Select value={novaPeca.tipo} onValueChange={(value) => setNovaPeca({ ...novaPeca, tipo: value as 'Nacional' | 'Importada' })}>
                      <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nacional">Nacional</SelectItem>
                        <SelectItem value="Importada">Importada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nome do Fornecedor:</Label>
                    <Input value={novaPeca.fornecedor} onChange={(e) => setNovaPeca({ ...novaPeca, fornecedor: e.target.value })} placeholder="Digite o nome do fornecedor" />
                  </div>
                  <Button onClick={handleCadastrarPeca} className="w-full bg-blue-900 hover:bg-blue-800">Cadastrar</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados.pecas.map(peca => (
                  <TableRow key={peca.id}>
                    <TableCell>{peca.id}</TableCell>
                    <TableCell>{peca.nome}</TableCell>
                    <TableCell>{peca.tipo}</TableCell>
                    <TableCell>{peca.fornecedor}</TableCell>
                    <TableCell>
                      <Button onClick={() => atualizarDados({ pecas: dados.pecas.filter(p => p.id !== peca.id) })} variant="destructive" size="sm">Excluir</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="etapas" className="space-y-4">
            <Dialog open={dialogEtapa} onOpenChange={setDialogEtapa}>
              <DialogTrigger asChild>
                <Button className="bg-blue-900 hover:bg-blue-800">Cadastrar Etapa</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Etapa</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome da Etapa:</Label>
                    <Input value={novaEtapa.nome} onChange={(e) => setNovaEtapa({ ...novaEtapa, nome: e.target.value })} placeholder="Digite o nome da etapa" />
                  </div>
                  <div className="space-y-2">
                    <Label>Data de Conclusão:</Label>
                    <Input type="date" value={novaEtapa.data} onChange={(e) => setNovaEtapa({ ...novaEtapa, data: e.target.value })} />
                  </div>
                  <Button onClick={handleCadastrarEtapa} className="w-full bg-blue-900 hover:bg-blue-800">Cadastrar</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data de Conclusão</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados.etapas.map(etapa => (
                  <TableRow key={etapa.id}>
                    <TableCell>{etapa.id}</TableCell>
                    <TableCell>{etapa.nome}</TableCell>
                    <TableCell>{formatarData(etapa.data)}</TableCell>
                    <TableCell>
                      <Button onClick={() => atualizarDados({ etapas: dados.etapas.filter(e => e.id !== etapa.id) })} variant="destructive" size="sm">Excluir</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="testes" className="space-y-4">
            <Dialog open={dialogTeste} onOpenChange={setDialogTeste}>
              <DialogTrigger asChild>
                <Button className="bg-blue-900 hover:bg-blue-800">Cadastrar Teste</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Teste</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tipo de Teste:</Label>
                    <Select value={novoTeste.tipo} onValueChange={(value) => setNovoTeste({ ...novoTeste, tipo: value as 'Elétrico' | 'Hidráulico' | 'Aerodinâmico' })}>
                      <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Elétrico">Elétrico</SelectItem>
                        <SelectItem value="Hidráulico">Hidráulico</SelectItem>
                        <SelectItem value="Aerodinâmico">Aerodinâmico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Resultado:</Label>
                    <Select value={novoTeste.resultado} onValueChange={(value) => setNovoTeste({ ...novoTeste, resultado: value as 'Aprovado' | 'Reprovado' })}>
                      <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aprovado">Aprovado</SelectItem>
                        <SelectItem value="Reprovado">Reprovado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCadastrarTeste} className="w-full bg-blue-900 hover:bg-blue-800">Cadastrar</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Resultado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados.testes.map(teste => (
                  <TableRow key={teste.id}>
                    <TableCell>{teste.id}</TableCell>
                    <TableCell>{teste.tipo}</TableCell>
                    <TableCell>{teste.resultado}</TableCell>
                    <TableCell>
                      <Button onClick={() => atualizarDados({ testes: dados.testes.filter(t => t.id !== teste.id) })} variant="destructive" size="sm">Excluir</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
