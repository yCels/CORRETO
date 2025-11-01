import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DadosSistema } from '../types';

interface DadosContextType {
  dados: DadosSistema;
  atualizarDados: (novosDados: Partial<DadosSistema>) => void;
}

const DadosContext = createContext<DadosContextType | undefined>(undefined);

const dadosIniciais: DadosSistema = {
  aeronaves: [],
  pecas: [],
  etapas: [],
  testes: [],
  funcionarios: [],
  associacoes: {
    pecasAeronaves: [],
    etapasAeronaves: [],
    testesAeronaves: [],
    funcionariosEtapas: []
  }
};

export function DadosProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<DadosSistema>(() => {
    const dadosSalvos = localStorage.getItem('aerocodeDados');
    return dadosSalvos ? JSON.parse(dadosSalvos) : dadosIniciais;
  });

  useEffect(() => {
    localStorage.setItem('aerocodeDados', JSON.stringify(dados));
  }, [dados]);

  const atualizarDados = (novosDados: Partial<DadosSistema>) => {
    setDados(prev => ({ ...prev, ...novosDados }));
  };

  return (
    <DadosContext.Provider value={{ dados, atualizarDados }}>
      {children}
    </DadosContext.Provider>
  );
}

export function useDados() {
  const context = useContext(DadosContext);
  if (!context) {
    throw new Error('useDados deve ser usado dentro de DadosProvider');
  }
  return context;
}
