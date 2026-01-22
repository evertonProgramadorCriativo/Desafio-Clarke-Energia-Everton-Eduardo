import React, { useState } from 'react';
import { MapPin, Zap, Calculator, Loader } from 'lucide-react';

const estadosMock = [
  { uf: 'SP', nome: 'São Paulo', tarifa: 0.75 },
  { uf: 'RJ', nome: 'Rio de Janeiro', tarifa: 0.72 },
  { uf: 'MG', nome: 'Minas Gerais', tarifa: 0.70 },
  { uf: 'SC', nome: 'Santa Catarina', tarifa: 0.65 }
];

const FormularioCalculo = () => {
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [consumoKwh, setConsumoKwh] = useState('');
  const [calculando, setCalculando] = useState(false);
  const [temResultados, setTemResultados] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [errorCalculo, setErrorCalculo] = useState(null);

  const loadingEstados = false;
  const estados = estadosMock;

  const onCalcular = () => {
    setCalculando(true);
    setErrorCalculo(null);

    setTimeout(() => {
      const estado = estados.find(e => e.uf === estadoSelecionado);

      if (!estado) {
        setErrorCalculo({ message: 'Estado inválido' });
        setCalculando(false);
        return;
      }

      const valorAtual = consumoKwh * estado.tarifa;
      const economia = valorAtual * 0.2; // 20% de economia simulada

      setResultado({
        valorAtual,
        economia,
        valorComEconomia: valorAtual - economia
      });

      setTemResultados(true);
      setCalculando(false);
    }, 1000);
  };

  const onResetar = () => {
    setEstadoSelecionado('');
    setConsumoKwh('');
    setResultado(null);
    setTemResultados(false);
    setErrorCalculo(null);
  };

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
        <h2 className="text-xl font-semibold text-slate-800">
          Simulação de Economia
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 font-semibold text-slate-700 text-sm">
            <MapPin size={16} className="inline mr-1" />
            Estado
          </label>
          <select
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
            className="w-full p-3 border-2 rounded-lg"
          >
            <option value="">Selecione um estado</option>
            {estados.map(estado => (
              <option key={estado.uf} value={estado.uf}>
                {estado.nome} ({estado.uf})
              </option>
            ))}
          </select>
        </div>

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
            className="w-full p-3 border-2 rounded-lg"
          />
        </div>
      </div>

      {errorCalculo && (
        <p className="text-red-600 mb-4">{errorCalculo.message}</p>
      )}

      <div className="flex gap-3 mb-6">
        <button
          onClick={onCalcular}
          disabled={calculando || !estadoSelecionado || !consumoKwh}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg"
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
            className="bg-slate-500 text-white px-6 py-3 rounded-lg"
          >
            Nova Simulação
          </button>
        )}
      </div>

      {resultado && (
        <div className="bg-slate-100 p-4 rounded-lg">
          <p> Valor atual: R$ {resultado.valorAtual.toFixed(2)}</p>
          <p> Economia estimada: R$ {resultado.economia.toFixed(2)}</p>
          <p className="font-bold">
            Novo valor: R$ {resultado.valorComEconomia.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormularioCalculo;
