import React, { useState } from 'react';
import { Cabecalho } from '../Cabecalho';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useDados } from '../../context/DadosContext';
import { Aeronave } from '../../types';

interface LinhasProducaoProps {
  onVoltar: () => void;
  onSair: () => void;
}

export function LinhasProducao({ onVoltar, onSair }: LinhasProducaoProps) {
  const { dados, atualizarDados } = useDados();
  const [aeronaveAtual, setAeronaveAtual] = useState<Aeronave | null>(null);

  const abrirLinhaProducao = (aeronave: Aeronave) => {
    setAeronaveAtual(aeronave);
  };

  const voltarLista = () => {
    setAeronaveAtual(null);
  };

  const iniciarEtapa = (etapaId: number) => {
    const etapasAtualizadas = dados.etapas.map(e => 
      e.id === etapaId ? { ...e, status: 'Em Andamento' as const } : e
    );
    atualizarDados({ etapas: etapasAtualizadas });
  };

  const finalizarEtapa = (etapaId: number) => {
    const etapasAtualizadas = dados.etapas.map(e => 
      e.id === etapaId ? { ...e, status: 'Concluída' as const } : e
    );
    atualizarDados({ etapas: etapasAtualizadas });
  };

  const formatarData = (data: string) => {
    const partes = data.split('-');
    if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
    return data;
  };

  const getStatusBadge = (status: string) => {
    const classes = {
      'Pendente': 'bg-yellow-100 text-yellow-800',
      'Em Andamento': 'bg-blue-100 text-blue-800',
      'Concluída': 'bg-green-100 text-green-800'
    };
    return <Badge className={classes[status as keyof typeof classes]}>{status}</Badge>;
  };

  const getResultadoBadge = (resultado: string) => {
    const classes = {
      'Aprovado': 'bg-green-100 text-green-800',
      'Reprovado': 'bg-red-100 text-red-800'
    };
    return <Badge className={classes[resultado as keyof typeof classes]}>{resultado}</Badge>;
  };

  if (aeronaveAtual) {
    const etapasAssociadas = dados.associacoes.etapasAeronaves
      .filter(a => a.aeronaveId === aeronaveAtual.id)
      .map(a => dados.etapas.find(e => e.id === a.etapaId))
      .filter(e => e !== undefined);

    const testesAssociados = dados.associacoes.testesAeronaves
      .filter(a => a.aeronaveId === aeronaveAtual.id)
      .map(a => dados.testes.find(t => t.id === a.testeId))
      .filter(t => t !== undefined);

    const pecasAssociadas = dados.associacoes.pecasAeronaves
      .filter(a => a.aeronaveId === aeronaveAtual.id)
      .map(a => dados.pecas.find(p => p.id === a.pecaId))
      .filter(p => p !== undefined);

    return (
      <div className="min-h-screen bg-gray-100">
        <Cabecalho onSair={onSair} />
        <div className="max-w-7xl mx-auto p-6">
          <Button onClick={voltarLista} variant="outline" className="mb-6">
            Voltar
          </Button>

          <h2 className="text-2xl mb-6 text-blue-900">Linha de Produção</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Especificações da Aeronave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Modelo:</p>
                  <p className="text-blue-900">{aeronaveAtual.modelo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo:</p>
                  <p className="text-blue-900">{aeronaveAtual.tipo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Capacidade:</p>
                  <p className="text-blue-900">{aeronaveAtual.capacidade} passageiros</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alcance:</p>
                  <p className="text-blue-900">{aeronaveAtual.alcance} km</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Etapas de Produção</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Data de Conclusão</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {etapasAssociadas.map(etapa => (
                    <TableRow key={etapa!.id}>
                      <TableCell>{etapa!.nome}</TableCell>
                      <TableCell>{formatarData(etapa!.data)}</TableCell>
                      <TableCell>{getStatusBadge(etapa!.status)}</TableCell>
                      <TableCell>
                        {etapa!.status === 'Pendente' && (
                          <Button onClick={() => iniciarEtapa(etapa!.id)} size="sm" className="bg-blue-900 hover:bg-blue-800">
                            Iniciar
                          </Button>
                        )}
                        {etapa!.status === 'Em Andamento' && (
                          <Button onClick={() => finalizarEtapa(etapa!.id)} size="sm" className="bg-blue-900 hover:bg-blue-800">
                            Finalizar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Testes Associados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Resultado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testesAssociados.map(teste => (
                    <TableRow key={teste!.id}>
                      <TableCell>{teste!.tipo}</TableCell>
                      <TableCell>{getResultadoBadge(teste!.resultado)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Peças Associadas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fornecedor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pecasAssociadas.map(peca => (
                    <TableRow key={peca!.id}>
                      <TableCell>{peca!.nome}</TableCell>
                      <TableCell>{peca!.tipo}</TableCell>
                      <TableCell>{peca!.fornecedor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Cabecalho onSair={onSair} />
      <div className="max-w-7xl mx-auto p-6">
        <Button onClick={onVoltar} variant="outline" className="mb-6">
          Voltar
        </Button>

        <h2 className="text-2xl mb-6 text-blue-900">Selecione uma Aeronave</h2>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dados.aeronaves.map(aeronave => (
                <TableRow key={aeronave.id}>
                  <TableCell>{aeronave.codigo}</TableCell>
                  <TableCell>{aeronave.modelo}</TableCell>
                  <TableCell>{aeronave.tipo}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => abrirLinhaProducao(aeronave)} 
                      size="sm"
                      className="bg-blue-900 hover:bg-blue-800"
                    >
                      Abrir Linha de Produção
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
