import User from "../database/models/User";
import IUser from "../interfaces/IUser";
import IUsersService from "../interfaces/services/IUsersService";
import AccountsService from "./AccountsService";

export default class UsersService implements IUsersService {
  constructor(private usersModel: typeof User, private accountsService: AccountsService) {}

  async create(obj: IUser): Promise<IUser> {
    const accountId = await this.accountsService.create();

    const newUser = await this.usersModel.create({username: obj.username, password: obj.password, accountId});
    
    return newUser;
  }
}