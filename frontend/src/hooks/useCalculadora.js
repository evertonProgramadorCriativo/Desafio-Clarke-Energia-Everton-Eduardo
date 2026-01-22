import { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ESTADOS, CALCULAR_ECONOMIA } from '../graphql/queries';

export const useCalculadora = () => {
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [consumoKwh, setConsumoKwh] = useState('');

  // Query para buscar estados
  const { data: estadosData, loading: loadingEstados, error: errorEstados } = useQuery(GET_ESTADOS);

  // Lazy Query para calcular economia
  const [calcularEconomiaQuery, 
    { data: resultadosData, 
      loading: calculando,
       error: errorCalculo }]
        = useLazyQuery(
    CALCULAR_ECONOMIA,
    { fetchPolicy: 'network-only' }
  );

  const handleCalcular = () => {
    if (!estadoSelecionado || !consumoKwh || parseFloat(consumoKwh) <= 0) {
      alert('Por favor, selecione um estado e informe um consumo válido');
      return;
    }

    calcularEconomiaQuery({
      variables: {
        uf: estadoSelecionado,
        consumoKwh: parseFloat(consumoKwh),
      },
    });
  };

  const handleResetar = () => {
    setEstadoSelecionado('');
    setConsumoKwh('');
  };

  return {
    // Estado
    estadoSelecionado,
    setEstadoSelecionado,
    consumoKwh,
    setConsumoKwh,
    
    // Dados
    estados: estadosData?.estados || [],
    resultados: resultadosData?.calcularEconomia || [],
    
    // Loading e Erros
    loadingEstados,
    calculando,
    errorEstados,
    errorCalculo,
    
    // Ações
    handleCalcular,
    handleResetar,
  };
};