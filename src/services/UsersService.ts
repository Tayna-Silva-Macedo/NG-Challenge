import { StatusCodes } from 'http-status-codes';
import User from '../database/models/User';
import Bcryptjs from '../helpers/Bcryptjs';
import HttpException from '../helpers/HttpException';
import Token from '../helpers/Token';
import IPayload from '../interfaces/IPayload';
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
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!regexPassword.test(password))
      throw new HttpException(StatusCodes.BAD_REQUEST, 'invalid password');
  }

  private async findByUsername(
    username: string,
    returnUser: boolean
  ): Promise<User | null> {
    const user = await this.usersModel.findOne({ where: { username } });

    if (user && !returnUser)
      throw new HttpException(StatusCodes.CONFLICT, 'user already registered');

    return user;
  }

  async create(obj: IUser): Promise<IUser> {
    UsersService.validUsername(obj.username);
    UsersService.validPassword(obj.password);
    await this.findByUsername(obj.username, false);

    const accountId = await this.accountsService.create();

    const passwordHash = Bcryptjs.generate(obj.password);

    const newUser = await this.usersModel.create({
      username: obj.username,
      password: passwordHash,
      accountId,
    });

    return newUser;
  }

  async login(obj: IUser): Promise<string> {
    const user = await this.findByUsername(obj.username, true);

    if (!user || !Bcryptjs.compare(obj.password, user.password)) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        'Incorrect email or password'
      );
    }

    const payload: IPayload = {
      id: user.id,
      username: user.username,
      accountId: user.accountId,
    };

    const token = Token.create(payload);

    return token;
  }
}