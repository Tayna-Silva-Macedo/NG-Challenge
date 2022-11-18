import { StatusCodes } from 'http-status-codes';
import Account from '../database/models/Account';
import User from '../database/models/User';
import Bcryptjs from '../helpers/Bcryptjs';
import HttpException from '../helpers/HttpException';
import Token from '../helpers/Token';
import IPayload from '../interfaces/IPayload';
import IUser from '../interfaces/IUser';
import IUsersService from '../interfaces/services/IUsersService';

export default class UsersService implements IUsersService {
  constructor(
    private usersModel: typeof User,
    private accountsModel: typeof Account,
  ) {}

  private async findByUsername(username: string): Promise<User | null> {
    const user = await this.usersModel.findOne({ where: { username } });

    return user;
  }

  private async validateUsername(username: string): Promise<void> {
    if (username.length < 3) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        'username must be at least 3 characters',
      );
    }

    const user = await this.findByUsername(username);

    if (user) {
      throw new HttpException(StatusCodes.CONFLICT, 'user already registered');
    }
  }

  private static validatePassword(password: string): void {
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!regexPassword.test(password)) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'invalid password');
    }
  }

  async create(obj: IUser): Promise<User> {
    UsersService.validatePassword(obj.password);
    await this.validateUsername(obj.username);

    const newAccount = await this.accountsModel.create({ balance: 100 });
    const accountId = newAccount.id;

    const passwordHash = Bcryptjs.generate(obj.password);

    const newUser = await this.usersModel.create({
      username: obj.username,
      password: passwordHash,
      accountId,
    });

    return newUser;
  }

  async login(obj: IUser): Promise<string> {
    const user = await this.findByUsername(obj.username);

    if (!user || !Bcryptjs.compare(obj.password, user.password)) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        'Incorrect email or password',
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
