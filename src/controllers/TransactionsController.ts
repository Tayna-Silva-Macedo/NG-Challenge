import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ITransactionsService from '../interfaces/services/ITransactionsService';

export default class TransactionsController {
  constructor(private transactionsService: ITransactionsService) {}

  public create = async (req: Request, res: Response) => {
    const newTransaction = await this.transactionsService.create(
      res.locals.id,
      res.locals.username,
      req.body.username,
      req.body.value,
    );

    return res.status(StatusCodes.CREATED).json(newTransaction);
  };

  public findAll = async (req: Request, res: Response) => {
    const transactions = await this.transactionsService.findAll(res.locals.accountId);

    return res.status(StatusCodes.OK).json(transactions);
  };

  public findAllCashOut = async (req:Request, res: Response) => {
    const transactions = await this.transactionsService.findAll(res.locals.accountId, 'cashOut');

    return res.status(StatusCodes.OK).json(transactions);
  };

  public findAllCashIn = async (req:Request, res: Response) => {
    const transactions = await this.transactionsService.findAll(res.locals.accountId, 'cashIn');

    return res.status(StatusCodes.OK).json(transactions);
  };
}
