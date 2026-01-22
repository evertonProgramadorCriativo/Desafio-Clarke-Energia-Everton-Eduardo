import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ size = 48, message = 'Carregando...' }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <Loader size={size} className="animate-spin text-blue-600 mb-4" />
    <p className="text-slate-600">{message}</p>
  </div>
);

export default LoadingSpinner;