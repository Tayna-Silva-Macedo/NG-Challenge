import { StatusCodes } from 'http-status-codes';
import Account from '../database/models/Account';
import HttpException from '../helpers/HttpException';
import IAccountsService from '../interfaces/services/IAccountsService';

export default class AccountsService implements IAccountsService {
  constructor(
    private accountsModel: typeof Account,
  ) {}

  async findBalanceById(id: number): Promise<number> {
    const account = await this.accountsModel.findByPk(id);

    if (!account) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'account not found');
    }

    return account.balance;
  }
}
