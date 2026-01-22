import React from 'react';
import { MapPin, Zap, Calculator, Loader } from 'lucide-react';
import { ErrorAlert } from '../common';

const FormularioCalculo = ({ 
  estadoSelecionado, 
  setEstadoSelecionado, 
  consumoKwh, 
  setConsumoKwh,
  onCalcular,
  onResetar,
  estados,
  loadingEstados,
  calculando,
  errorCalculo,
  temResultados
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onCalcular();
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Calculator size={24} className="text-slate-700" />
        <h2 className="text-xl font-semibold text-slate-800">Simulação de Economia</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Seletor de Estado */}
        <div>
          <label className="block mb-2 font-semibold text-slate-700 text-sm">
            <MapPin size={16} className="inline mr-1" />
            Estado
          </label>
          <select
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
            disabled={loadingEstados}
            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 
            focus:outline-none transition-colors"
          >
            <option value="">{loadingEstados ? 'Carregando...' : 'Selecione um estado'}</option>
            {estados.map(estado => (
              <option key={estado.uf} value={estado.uf}>
                {estado.nome} ({estado.uf})
              </option>
            ))}
          </select>
        </div>

        {/* Input de Consumo */}
        <div>
          <label className="block mb-2 font-semibold text-slate-700 text-sm">
            <Zap size={16} className="inline mr-1" />
            Consumo Mensal (kWh)
          </label>
          <input
            type="number"
            value={consumoKwh}
            onChange={(e) => setConsumoKwh(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ex: 500"
            min="1"
            className="w-full p-3 border-2 border-slate-200 rounded-lg 
            focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Mensagem de Erro */}
      {errorCalculo && <ErrorAlert message={errorCalculo.message} />}

      {/* Botões */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onCalcular}
          disabled={calculando || !estadoSelecionado || !consumoKwh}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3
           rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50
            disabled:cursor-not-allowed transition-colors"
        >
          {calculando ? (
            <>
              <Loader size={18} className="animate-spin" />
              Calculando...
            </>
          ) : (
            <>
              <Calculator size={18} />
              Calcular Economia
            </>
          )}
        </button>

        {temResultados && (
          <button
            onClick={onResetar}
            className="bg-slate-500 text-white px-6 py-3 rounded-lg font-semibold 
            hover:bg-slate-600 transition-colors"
          >
            Nova Simulação
          </button>
        )}
      </div>
    </div>
  );
};

export default FormularioCalculo;