import Transaction from '../../database/models/Transaction';

export default interface ITransactionsService {
  create(
    accountId: number,
    usernameCashOut: string,
    usernameCashIn: string,
    value: number
  ): Promise<Transaction>;
  findAll(accountId: number, date: string | undefined): Promise<Transaction[]>;
  findCashOut(accountId: number, date: string | undefined): Promise<Transaction[]>;
  findCashIn(accountId: number, date: string | undefined): Promise<Transaction[]>;
}
