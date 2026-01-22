import React from 'react';
import { CheckCircle } from 'lucide-react';
import CardFornecedor from './CardFornecedor';

const SecaoSolucao = ({ solucao }) => (
  <div className="mb-8">
    <div
      className={`rounded-t-xl p-4 text-white flex items-center justify-between flex-wrap gap-2 ${
        solucao.tipoSolucao === 'GD' ? 'bg-amber-500' : 'bg-blue-500'
      }`}
    >
      <div className="flex items-center gap-2">
        <CheckCircle size={24} />
        <h3 className="text-lg font-semibold">
          {solucao.tipoSolucao === 'GD' ? 'Geração Distribuída (GD)' : 'Mercado Livre de Energia'}
        </h3>
      </div>
      <span className="text-sm opacity-90">
        {solucao.totalFornecedores} {solucao.totalFornecedores === 1 ? 'fornecedor' : 'fornecedores'}
      </span>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-white rounded-b-xl shadow-md">
      {solucao.economias.map((economia, idx) => (
        <CardFornecedor 
          key={economia.fornecedorId} 
          economia={economia} 
          isPrimeiro={idx === 0}
        />
      ))}
    </div>
  </div>
);

export default SecaoSolucao;