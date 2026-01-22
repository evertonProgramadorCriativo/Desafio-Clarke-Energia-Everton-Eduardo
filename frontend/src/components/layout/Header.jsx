import React from 'react';
import { Zap } from 'lucide-react';

const Header = () => (
  <header className="bg-slate-800 text-white py-6 shadow-lg">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-3">
        <Zap size={32} className="text-amber-400" />
        <h1 className="text-2xl md:text-3xl font-bold">Clarke Energia</h1>
      </div>
      <p className="mt-2 text-slate-300 text-sm md:text-base">
        Calcule sua economia com energia sustentável
      </p>
    </div>
  </header>
);

export default Header;