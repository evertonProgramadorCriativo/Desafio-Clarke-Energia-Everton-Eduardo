import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Estado = sequelize.define('Estado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uf: {
    type: DataTypes.STRING(2),
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 2],
      isUppercase: true
    }
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tarifaBaseKwh: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    field: 'tarifa_base_kwh',
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'estados',
  timestamps: true,
  underscored: true
});

export default Estado;