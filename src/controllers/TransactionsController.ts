import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ITransactionsService from '../interfaces/services/ITransactionsService';

export default class TransactionsController {
  constructor(private transactionsService: ITransactionsService) {}

  public create = async (req: Request, res: Response) => {
    const newTransaction = await this.transactionsService.create(
      res.locals.accountId,
      res.locals.username,
      req.body.username,
      req.body.value,
    );

    return res.status(StatusCodes.CREATED).json(newTransaction);
  };

  public findAll = async (req: Request, res: Response) => {
    const transactions = await this.transactionsService.findAll(
      res.locals.accountId,
      req.query.date as string | undefined,
    );

    return res.status(StatusCodes.OK).json(transactions);
  };

  public findCashOut = async (req: Request, res: Response) => {
    const transactions = await this.transactionsService.findCashOut(
      res.locals.accountId,
      req.query.date as string | undefined,
    );

    return res.status(StatusCodes.OK).json(transactions);
  };

  public findCashIn = async (req: Request, res: Response) => {
    const transactions = await this.transactionsService.findCashIn(
      res.locals.accountId,
      req.query.date as string | undefined,
    );

    return res.status(StatusCodes.OK).json(transactions);
  };
}
