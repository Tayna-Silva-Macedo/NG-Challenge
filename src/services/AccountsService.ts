import Account from "../database/models/Account";
import IAccountsService from "../interfaces/services/IAccountsService";

export default class AccountsService implements IAccountsService {
  constructor(private accountsModel: typeof Account) {}
  
  async create(): Promise<number> {
    const newAccount = await this.accountsModel.create({balance: 100});
    return newAccount.id;
  }

  async findBalanceById(id: number): Promise<number | undefined> {
    const account = await this.accountsModel.findByPk(id);
    return account?.balance;
  }
}