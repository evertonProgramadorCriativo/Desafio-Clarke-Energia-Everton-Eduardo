/**
 * Formata valor para moeda brasileira
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formata número com separador de milhares
 */
export const formatNumber = (value) => {
  return new Intl.NumberFormat('pt-BR').format(value);
};