import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Fornecedores = sequelize.define('Fornecedores', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fornecedorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fornecedor_id',
    references: {
      model: 'fornecedores',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  tipoSolucao: {
    type: DataTypes.ENUM('GD', 'MERCADO_LIVRE'),
    allowNull: false,
    field: 'tipo_solucao'
  },
  custoKwh: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    field: 'custo_kwh',
    validate: {
      min: 0
    }
  },
  estadosAtendidos: {
    type: DataTypes.ARRAY(DataTypes.STRING(2)),
    allowNull: false,
    defaultValue: [],
    field: 'estados_atendidos'
  }
}, {
  tableName: 'fornecedor',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['fornecedor_id', 'tipo_solucao']
    }
  ]
});

export default Fornecedores;