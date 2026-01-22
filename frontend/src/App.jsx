import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Header, Footer } from './components/layout';
import { FormularioCalculo, SecaoSolucao, EstadoVazio } from './components/calculadora';
import { useCalculadora } from './hooks/useCalculadora';

function App() {
  const {
    estadoSelecionado,
    setEstadoSelecionado,
    consumoKwh,
    setConsumoKwh,
    estados,
    resultados,
    loadingEstados,
    calculando,
    errorEstados,
    errorCalculo,
    handleCalcular,
    handleResetar,
  } = useCalculadora();

  // Erro ao conectar com backend
  if (errorEstados) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Erro ao conectar com o servidor</h2>
          <p className="text-slate-600 mb-1">Verifique se o backend está rodando</p>
          <code className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded">
            http://localhost:4000/graphql
          </code>
          <p className="text-sm text-slate-500 mt-4">{errorEstados.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Formulário de Cálculo */}
        <FormularioCalculo
          estadoSelecionado={estadoSelecionado}
          setEstadoSelecionado={setEstadoSelecionado}
          consumoKwh={consumoKwh}
          setConsumoKwh={setConsumoKwh}
          onCalcular={handleCalcular}
          onResetar={handleResetar}
          estados={estados}
          loadingEstados={loadingEstados}
          calculando={calculando}
          errorCalculo={errorCalculo}
          temResultados={resultados.length > 0}
        />

        {/* Resultados */}
        <div className="mt-8">
          {resultados.length > 0 ? (
            resultados.map((solucao) => (
              <SecaoSolucao key={solucao.tipoSolucao} solucao={solucao} />
            ))
          ) : !calculando ? (
            <EstadoVazio />
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;