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

  private static filterDate(transactions: Transaction[], date: string): Transaction[] {
    return transactions.filter(
      (transaction) => transaction.createdAt.toISOString().startsWith(date),
    );
  }

  async findAll(
    accountId: number,
    date?: string | undefined,
  ): Promise<Transaction[]> {
    const transactions = await this.transactionsModel.findAll({
      where: {
        [Op.or]: [
          { debitedAccountId: accountId },
          { creditedAccountId: accountId },
        ],
      },
    });

    if (date) {
      return TransactionsService.filterDate(transactions, date);
    }

    return transactions;
  }

  async findCashOut(
    accountId: number,
    date?: string | undefined,
  ): Promise<Transaction[]> {
    const transactions = await this.transactionsModel.findAll({
      where: {
        debitedAccountId: accountId,
      },
    });

    if (date) {
      return TransactionsService.filterDate(transactions, date);
    }

    return transactions;
  }

  async findCashIn(
    accountId: number,
    date?: string | undefined,
  ): Promise<Transaction[]> {
    const transactions = await this.transactionsModel.findAll({
      where: {
        creditedAccountId: accountId,
      },
    });

    if (date) {
      return TransactionsService.filterDate(transactions, date);
    }

    return transactions;
  }
}
