export default interface IAccountsService {
  create(): Promise<number>;
  findBalanceById(id: number): Promise<number | undefined>;
}