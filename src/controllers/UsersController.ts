import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUsersService from '../interfaces/services/IUsersService';

export default class UsersController {
  constructor(private usersService: IUsersService) {}

  public create = async (req: Request, res: Response) => {
    const newUser = await this.usersService.create(req.body);

    return res.status(StatusCodes.CREATED).json(newUser);
  };

  public login = async (req: Request, res: Response) => {
    const token = await this.usersService.login(req.body);

    return res.status(StatusCodes.OK).json({ token });
  };
}
