import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  balance!: number;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DECIMAL,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

export default Account;
