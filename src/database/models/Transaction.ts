import { Model, INTEGER, DECIMAL, DATE } from 'sequelize';
import db from '.';
import Account from './Account';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transaction.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    debitedAccountId: {
      type: INTEGER,
      allowNull: false,
    },
    creditedAccountId: {
      type: INTEGER,
      allowNull: false,
    },
    value: {
      type: DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'transactions',
    timestamps: true,
    updatedAt: false,
  }
);

Transaction.belongsTo(Account, {
  foreignKey: 'debitedAccountId',
  as: 'debitedAccount',
});
Transaction.belongsTo(Account, {
  foreignKey: 'creditedAccountId',
  as: 'creditedAccount',
});

export default Transaction;
