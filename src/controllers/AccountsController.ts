import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IAccountsService from '../interfaces/services/IAccountsService';

export default class AccountsController {
  constructor(private accountsService: IAccountsService) {}

  public findBalanceById = async (req: Request, res: Response) => {
    const balance = await this.accountsService.findBalanceById(
      res.locals.accountId
    );

    return res.status(StatusCodes.OK).json({ balance });
  };
}
