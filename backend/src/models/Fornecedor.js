import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Fornecedor = sequelize.define('Fornecedor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  logoUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'logo_url'
  },
  estadoOrigem: {
    type: DataTypes.STRING(2),
    allowNull: false,
    field: 'estado_origem',
    validate: {
      len: [2, 2]
    }
  },
  numeroClientes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'numero_clientes',
    validate: {
      min: 0
    }
  },
  avaliacaoMedia: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    defaultValue: 0.00,
    field: 'avaliacao_media',
    validate: {
      min: 0,
      max: 5
    }
  }
}, {
  tableName: 'fornecedores',
  timestamps: true,
  underscored: true
});

export default Fornecedor;