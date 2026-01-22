import React from 'react';
import { Zap } from 'lucide-react';

const EstadoVazio = () => (
  <div className="bg-white rounded-xl p-12 text-center shadow-md">
    <Zap size={64} className="text-slate-300 mx-auto mb-4" />
    <h3 className="text-xl text-slate-600 mb-2">Pronto para economizar?</h3>
    <p className="text-slate-500">
      Selecione seu estado e informe seu consumo mensal para descobrir quanto você pode economizar
    </p>
  </div>
);

export default EstadoVazio;