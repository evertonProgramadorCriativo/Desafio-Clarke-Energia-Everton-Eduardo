import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 mb-4">
    <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
    <span className="text-red-800 text-sm">{message}</span>
  </div>
);

export default ErrorAlert;