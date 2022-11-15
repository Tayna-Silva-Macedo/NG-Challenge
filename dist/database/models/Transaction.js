"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Account_1 = __importDefault(require("./Account"));
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    debitedAccountId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    creditedAccountId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    value: {
        type: sequelize_1.DECIMAL,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DATE,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    modelName: 'transactions',
    timestamps: true,
    updatedAt: false,
});
Transaction.belongsTo(Account_1.default, {
    foreignKey: 'debitedAccountId',
    as: 'debitedAccount',
});
Transaction.belongsTo(Account_1.default, {
    foreignKey: 'creditedAccountId',
    as: 'creditedAccount',
});
exports.default = Transaction;
