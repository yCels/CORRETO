import React, { useState } from 'react';
import { Cabecalho } from '../Cabecalho';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useDados } from '../../context/DadosContext';
import { Funcionario } from '../../types';

interface FuncionariosProps {
  onVoltar: () => void;
  onSair: () => void;
}

export function Funcionarios({ onVoltar, onSair }: FuncionariosProps) {
  const { dados, atualizarDados } = useDados();
  const [dialogAberto, setDialogAberto] = useState(false);
  const [novoFuncionario, setNovoFuncionario] = useState({
    id: '',
    nome: '',
    telefone: '',
    endereco: '',
    usuario: '',
    senha: '',
    nivel: '' as '1 - Admin' | '2 - Engenheiro' | '3 - Operador' | ''
  });

  const handleCadastrar = () => {
    if (!novoFuncionario.id || !novoFuncionario.nome || !novoFuncionario.telefone || 
        !novoFuncionario.endereco || !novoFuncionario.usuario || !novoFuncionario.senha || 
        !novoFuncionario.nivel) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const funcionario: Funcionario = {
      id: novoFuncionario.id,
      nome: novoFuncionario.nome,
      telefone: novoFuncionario.telefone,
      endereco: novoFuncionario.endereco,
      usuario: novoFuncionario.usuario,
      senha: novoFuncionario.senha,
      nivel: novoFuncionario.nivel as '1 - Admin' | '2 - Engenheiro' | '3 - Operador'
    };

    atualizarDados({ funcionarios: [...dados.funcionarios, funcionario] });
    setDialogAberto(false);
    setNovoFuncionario({ id: '', nome: '', telefone: '', endereco: '', usuario: '', senha: '', nivel: '' });
    alert('Funcionário cadastrado com sucesso!');
  };

  const handleExcluir = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      atualizarDados({ funcionarios: dados.funcionarios.filter(f => f.id !== id) });
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
                Cadastrar Funcionário
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Cadastrar Funcionário</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="id">ID:</Label>
                  <Input
                    id="id"
                    value={novoFuncionario.id}
                    onChange={(e) => setNovoFuncionario({ ...novoFuncionario, id: e.target.value })}
                    placeholder="Digite o ID único"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome:</Label>
                  <Input
                    id="nome"
                    value={novoFuncionario.nome}
                    onChange={(e) => setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })}
                    placeholder="Digite o nome"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone:</Label>
                  <Input
                    id="telefone"
                    value={novoFuncionario.telefone}
                    onChange={(e) => setNovoFuncionario({ ...novoFuncionario, telefone: e.target.value })}
                    placeholder="Digite o telefone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço:</Label>
                  <Input
                    id="endereco"
                    value={novoFuncionario.endereco}
                    onChange={(e) => setNovoFuncionario({ ...novoFuncionario, endereco: e.target.value })}
                    placeholder="Digite o endereço"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usuario">Nome de Usuário:</Label>
                  <Input
                    id="usuario"
                    value={novoFuncionario.usuario}
                    onChange={(e) => setNovoFuncionario({ ...novoFuncionario, usuario: e.target.value })}
                    placeholder="Digite o nome de usuário"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha de Usuário:</Label>
                  <Input
                    id="senha"
                    type="password"
                    value={novoFuncionario.senha}
                    onChange={(e) => setNovoFuncionario({ ...novoFuncionario, senha: e.target.value })}
                    placeholder="Digite a senha"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nivel">Nível:</Label>
                  <Select 
                    value={novoFuncionario.nivel} 
                    onValueChange={(value) => setNovoFuncionario({ 
                      ...novoFuncionario, 
                      nivel: value as '1 - Admin' | '2 - Engenheiro' | '3 - Operador' 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 - Admin">1 - Admin</SelectItem>
                      <SelectItem value="2 - Engenheiro">2 - Engenheiro</SelectItem>
                      <SelectItem value="3 - Operador">3 - Operador</SelectItem>
                    </SelectContent>
                  </Select>
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
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Nome de Usuário</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dados.funcionarios.map(func => (
                <TableRow key={func.id}>
                  <TableCell>{func.id}</TableCell>
                  <TableCell>{func.nome}</TableCell>
                  <TableCell>{func.telefone}</TableCell>
                  <TableCell>{func.endereco}</TableCell>
                  <TableCell>{func.usuario}</TableCell>
                  <TableCell>{func.nivel}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleExcluir(func.id)}
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
