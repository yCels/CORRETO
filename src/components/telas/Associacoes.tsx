import React, { useState } from 'react';
import { Cabecalho } from '../Cabecalho';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { useDados } from '../../context/DadosContext';

interface AssociacoesProps {
  onVoltar: () => void;
  onSair: () => void;
}

export function Associacoes({ onVoltar, onSair }: AssociacoesProps) {
  const { dados, atualizarDados } = useDados();
  
  const [pecaSelecionada, setPecaSelecionada] = useState('');
  const [aeronaveParaPeca, setAeronaveParaPeca] = useState('');
  
  const [etapaSelecionada, setEtapaSelecionada] = useState('');
  const [aeronaveParaEtapa, setAeronaveParaEtapa] = useState('');
  
  const [testeSelecionado, setTesteSelecionado] = useState('');
  const [aeronaveParaTeste, setAeronaveParaTeste] = useState('');
  
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');
  const [etapaParaFunc, setEtapaParaFunc] = useState('');

  const associarPecaAeronave = () => {
    if (!pecaSelecionada || !aeronaveParaPeca) {
      alert('Por favor, selecione uma peça e uma aeronave!');
      return;
    }

    const jaExiste = dados.associacoes.pecasAeronaves.find(
      a => a.pecaId === parseInt(pecaSelecionada) && a.aeronaveId === parseInt(aeronaveParaPeca)
    );

    if (jaExiste) {
      alert('Esta associação já existe!');
      return;
    }

    atualizarDados({
      associacoes: {
        ...dados.associacoes,
        pecasAeronaves: [
          ...dados.associacoes.pecasAeronaves,
          { pecaId: parseInt(pecaSelecionada), aeronaveId: parseInt(aeronaveParaPeca) }
        ]
      }
    });

    setPecaSelecionada('');
    setAeronaveParaPeca('');
    alert('Peça associada à aeronave com sucesso!');
  };

  const associarEtapaAeronave = () => {
    if (!etapaSelecionada || !aeronaveParaEtapa) {
      alert('Por favor, selecione uma etapa e uma aeronave!');
      return;
    }

    const jaExiste = dados.associacoes.etapasAeronaves.find(
      a => a.etapaId === parseInt(etapaSelecionada) && a.aeronaveId === parseInt(aeronaveParaEtapa)
    );

    if (jaExiste) {
      alert('Esta associação já existe!');
      return;
    }

    atualizarDados({
      associacoes: {
        ...dados.associacoes,
        etapasAeronaves: [
          ...dados.associacoes.etapasAeronaves,
          { etapaId: parseInt(etapaSelecionada), aeronaveId: parseInt(aeronaveParaEtapa) }
        ]
      }
    });

    setEtapaSelecionada('');
    setAeronaveParaEtapa('');
    alert('Etapa associada à aeronave com sucesso!');
  };

  const associarTesteAeronave = () => {
    if (!testeSelecionado || !aeronaveParaTeste) {
      alert('Por favor, selecione um teste e uma aeronave!');
      return;
    }

    const jaExiste = dados.associacoes.testesAeronaves.find(
      a => a.testeId === parseInt(testeSelecionado) && a.aeronaveId === parseInt(aeronaveParaTeste)
    );

    if (jaExiste) {
      alert('Esta associação já existe!');
      return;
    }

    atualizarDados({
      associacoes: {
        ...dados.associacoes,
        testesAeronaves: [
          ...dados.associacoes.testesAeronaves,
          { testeId: parseInt(testeSelecionado), aeronaveId: parseInt(aeronaveParaTeste) }
        ]
      }
    });

    setTesteSelecionado('');
    setAeronaveParaTeste('');
    alert('Teste associado à aeronave com sucesso!');
  };

  const associarFuncionarioEtapa = () => {
    if (!funcionarioSelecionado || !etapaParaFunc) {
      alert('Por favor, selecione um funcionário e uma etapa!');
      return;
    }

    const jaExiste = dados.associacoes.funcionariosEtapas.find(
      a => a.funcionarioId === funcionarioSelecionado && a.etapaId === parseInt(etapaParaFunc)
    );

    if (jaExiste) {
      alert('Esta associação já existe!');
      return;
    }

    atualizarDados({
      associacoes: {
        ...dados.associacoes,
        funcionariosEtapas: [
          ...dados.associacoes.funcionariosEtapas,
          { funcionarioId: funcionarioSelecionado, etapaId: parseInt(etapaParaFunc) }
        ]
      }
    });

    setFuncionarioSelecionado('');
    setEtapaParaFunc('');
    alert('Funcionário associado à etapa com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Cabecalho onSair={onSair} />
      <div className="max-w-7xl mx-auto p-6">
        <Button onClick={onVoltar} variant="outline" className="mb-6">
          Voltar
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Associar Peça a Aeronave</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Peça:</Label>
                <Select value={pecaSelecionada} onValueChange={setPecaSelecionada}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma peça..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dados.pecas.map(peca => (
                      <SelectItem key={peca.id} value={peca.id.toString()}>
                        {peca.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Aeronave:</Label>
                <Select value={aeronaveParaPeca} onValueChange={setAeronaveParaPeca}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma aeronave..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dados.aeronaves.map(aeronave => (
                      <SelectItem key={aeronave.id} value={aeronave.id.toString()}>
                        {aeronave.codigo} - {aeronave.modelo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={associarPecaAeronave} className="w-full bg-blue-900 hover:bg-blue-800">
                Associar
              </Button>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                <h4 className="mb-2">Associações Realizadas:</h4>
                {dados.associacoes.pecasAeronaves.map((assoc, idx) => {
                  const peca = dados.pecas.find(p => p.id === assoc.pecaId);
                  const aeronave = dados.aeronaves.find(a => a.id === assoc.aeronaveId);
                  return (
                    <div key={idx} className="p-2 mb-2 bg-white rounded border-l-4 border-blue-900">
                      {peca?.nome} → {aeronave?.codigo} ({aeronave?.modelo})
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Associar Etapa a Aeronave</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Etapa:</Label>
                <Select value={etapaSelecionada} onValueChange={setEtapaSelecionada}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma etapa..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dados.etapas.map(etapa => (
                      <SelectItem key={etapa.id} value={etapa.id.toString()}>
                        {etapa.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Aeronave:</Label>
                <Select value={aeronaveParaEtapa} onValueChange={setAeronaveParaEtapa}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma aeronave..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dados.aeronaves.map(aeronave => (
                      <SelectItem key={aeronave.id} value={aeronave.id.toString()}>
                        {aeronave.codigo} - {aeronave.modelo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={associarEtapaAeronave} className="w-full bg-blue-900 hover:bg-blue-800">
                Associar
              </Button>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                <h4 className="mb-2">Associações Realizadas:</h4>
                {dados.associacoes.etapasAeronaves.map((assoc, idx) => {
                  const etapa = dados.etapas.find(e => e.id === assoc.etapaId);
                  const aeronave = dados.aeronaves.find(a => a.id === assoc.aeronaveId);
                  return (
                    <div key={idx} className="p-2 mb-2 bg-white rounded border-l-4 border-blue-900">
                      {etapa?.nome} → {aeronave?.codigo} ({aeronave?.modelo})
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Associar Teste a Aeronave</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Teste:</Label>
                <Select value={testeSelecionado} onValueChange={setTesteSelecionado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um teste..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dados.testes.map(teste => (
                      <SelectItem key={teste.id} value={teste.id.toString()}>
                        {teste.tipo} - {teste.resultado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Aeronave:</Label>
                <Select value={aeronaveParaTeste} onValueChange={setAeronaveParaTeste}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma aeronave..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dados.aeronaves.map(aeronave => (
                      <SelectItem key={aeronave.id} value={aeronave.id.toString()}>
                        {aeronave.codigo} - {aeronave.modelo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={associarTesteAeronave} className="w-full bg-blue-900 hover:bg-blue-800">
                Associar
              </Button>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                <h4 className="mb-2">Associações Realizadas:</h4>
                {dados.associacoes.testesAeronaves.map((assoc, idx) => {
                  const teste = dados.testes.find(t => t.id === assoc.testeId);
                  const aeronave = dados.aeronaves.find(a => a.id === assoc.aeronaveId);
                  return (
                    <div key={idx} className="p-2 mb-2 bg-white rounded border-l-4 border-blue-900">
                      {teste?.tipo} ({teste?.resultado}) → {aeronave?.codigo} ({aeronave?.modelo})
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Associar Funcionário a Etapa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Funcionário:</Label>
                <Select value={funcionarioSelecionado} onValueChange={setFuncionarioSelecionado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um funcionário..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dados.funcionarios.map(func => (
                      <SelectItem key={func.id} value={func.id}>
                        {func.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Etapa:</Label>
                <Select value={etapaParaFunc} onValueChange={setEtapaParaFunc}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma etapa..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dados.etapas.map(etapa => (
                      <SelectItem key={etapa.id} value={etapa.id.toString()}>
                        {etapa.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={associarFuncionarioEtapa} className="w-full bg-blue-900 hover:bg-blue-800">
                Associar
              </Button>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                <h4 className="mb-2">Associações Realizadas:</h4>
                {dados.associacoes.funcionariosEtapas.map((assoc, idx) => {
                  const func = dados.funcionarios.find(f => f.id === assoc.funcionarioId);
                  const etapa = dados.etapas.find(e => e.id === assoc.etapaId);
                  return (
                    <div key={idx} className="p-2 mb-2 bg-white rounded border-l-4 border-blue-900">
                      {func?.nome} → {etapa?.nome}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
