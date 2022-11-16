export default interface IAccountsService {
  findBalanceById(id: number): Promise<number>;
}
