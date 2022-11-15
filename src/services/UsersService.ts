import { StatusCodes } from 'http-status-codes';
import User from '../database/models/User';
import HttpException from '../helpers/HttpException';
import IUser from '../interfaces/IUser';
import IUsersService from '../interfaces/services/IUsersService';
import AccountsService from './AccountsService';

export default class UsersService implements IUsersService {
  constructor(
    private usersModel: typeof User,
    private accountsService: AccountsService
  ) {}

  private static validUsername(username: string): void {
    if (username.length < 3)
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        'username must be at least 3 characters'
      );
  }

  private static validPassword(password: string): void {
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/

    if(!regexPassword.test(password)) throw new HttpException(StatusCodes.BAD_REQUEST, 'invalid password')
  }

  private async usernameExists(username: string): Promise<void> {
    const user = await this.usersModel.findOne({ where: { username } });    

    if (user)
      throw new HttpException(StatusCodes.CONFLICT, 'user already registered');
  }

  async create(obj: IUser): Promise<IUser> {    
    UsersService.validUsername(obj.username);
    UsersService.validPassword(obj.password);
    await this.usernameExists(obj.username); 

    const accountId = await this.accountsService.create();

    const newUser = await this.usersModel.create({
      username: obj.username,
      password: obj.password,
      accountId,
    });

    return newUser;
  }
}
