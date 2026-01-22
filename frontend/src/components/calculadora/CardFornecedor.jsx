import React from 'react';
import { Star, Users, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const CardFornecedor = ({ economia, isPrimeiro }) => (
  <div
    className={`border-2 rounded-xl p-6 relative transition-all hover:shadow-lg hover:-translate-y-1 ${
      isPrimeiro ? 'border-green-600 bg-green-50' : 'border-slate-200 bg-white'
    }`}
  >
    {isPrimeiro && (
      <div className="absolute -top-3 right-4 bg-green-600 
      text-white px-3 py-1 rounded-full text-xs font-bold">
        MELHOR OPÇÃO
      </div>
    )}

    {/* Header do Card */}
    <div className="flex items-center gap-4 mb-4">
      <div className="text-4xl">{economia.fornecedorLogo}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-semibold text-slate-800 truncate">
          {economia.fornecedorNome}
        </h4>
        <div className="flex items-center gap-2 text-sm text-slate-600 flex-wrap">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span>{economia.fornecedorAvaliacao.toFixed(1)}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{economia.fornecedorClientes.toLocaleString()} clientes</span>
          </div>
        </div>
      </div>
    </div>

    {/* Comparação de Custos */}
    <div className="bg-slate-100 rounded-lg p-4 mb-4 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-600">Custo Atual</span>
        <span className="font-semibold text-red-600">
          {formatCurrency(economia.custoBase)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-600">Novo Custo</span>
        <span className="font-semibold text-green-600">
          {formatCurrency(economia.custoFornecedor)}
        </span>
      </div>
    </div>

    {/* Economia */}
    <div
      className={`rounded-lg p-4 text-center text-white ${
        economia.temEconomia ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <TrendingDown size={20} />
        <span className="text-sm font-semibold">
          {economia.temEconomia ? 'Economia Mensal' : 'Sem Economia'}
        </span>
      </div>
      <div className="text-3xl font-bold">
        {formatCurrency(economia.economiaValor)}
      </div>
      <div className="text-sm opacity-90">
        {economia.economiaPercentual.toFixed(1)}% {economia.temEconomia ? 'de desconto' : 'mais caro'}
      </div>
    </div>

    {/* Economia Anual */}
    {economia.temEconomia && (
      <div className="mt-4 bg-green-100 rounded-lg p-3 text-center text-sm text-slate-800">
        Economia anual: <strong>{formatCurrency(economia.economiaValor * 12)}</strong>
      </div>
    )}
  </div>
);

export default CardFornecedor;