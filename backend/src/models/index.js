import Estado from './Estado.js';
import Fornecedor from './Fornecedor.js';
import Fornecedores from './Fornecedores.js';

// Definir associações
Fornecedor.hasMany(Fornecedores, {
  foreignKey: 'fornecedorId',
  as: 'solucoes'
});

Fornecedores.belongsTo(Fornecedor, {
  foreignKey: 'fornecedorId',
  as: 'fornecedor'
});


export {
  Estado,
  Fornecedor,
  Fornecedores
};