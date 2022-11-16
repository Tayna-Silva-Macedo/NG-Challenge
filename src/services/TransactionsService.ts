import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import Account from '../database/models/Account';
import Transaction from '../database/models/Transaction';
import User from '../database/models/User';
import HttpException from '../helpers/HttpException';
import ITransactionsService from '../interfaces/services/ITransactionsService';

export default class TransactionsService implements ITransactionsService {
  constructor(
    private transactionsModel: typeof Transaction,
    private accountsModel: typeof Account,
    private usersModel: typeof User,
  ) {}

  private static async validUsername(
    usernameCashOut: string,
    usernameCashIn: string,
  ): Promise<void> {
    if (usernameCashIn === usernameCashOut) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        'cannot transfer to self',
      );
    }
  }

  private async validBalance(id: number, value: number): Promise<void> {
    const account = await this.accountsModel.findByPk(id);

    if (!account) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'account not found');
    }

    const { balance } = account;

    if (balance < value) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'insufficient funds');
    }
  }

  private async findIdCashIn(usernameCashIn: string): Promise<number> {
    const user = await this.usersModel.findOne({
      where: { username: usernameCashIn },
    });

    if (!user) throw new HttpException(StatusCodes.NOT_FOUND, 'user not found');

    return user.id;
  }

  async create(
    id: number,
    usernameCashOut: string,
    usernameCashIn: string,
    value: number,
  ): Promise<Transaction> {
    await TransactionsService.validUsername(usernameCashOut, usernameCashIn);
    await this.validBalance(id, value);

    const idCashOut = id;
    const idCashIn = await this.findIdCashIn(usernameCashIn);

    await this.accountsModel.decrement({ balance: value }, { where: { id: idCashOut } });
    await this.accountsModel.increment({ balance: value }, { where: { id: idCashIn } });

    const newTransaction = await this.transactionsModel.create({
      debitedAccountId: idCashOut,
      creditedAccountId: idCashIn,
      value,
    });

    return newTransaction;
  }

  async findAll(accountId: number, filter?: string): Promise<Transaction[]> {
    const transactions = await this.transactionsModel.findAll({
      where: {
        [Op.or]: [{ debitedAccountId: accountId }, { creditedAccountId: accountId }],
      },
    });

    if (filter === 'cashOut') {
      return transactions.filter((transaction) => transaction.debitedAccountId === accountId);
    }

    if (filter === 'cashIn') {
      return transactions.filter((transaction) => transaction.creditedAccountId === accountId);
    }

    return transactions;
  }
}
