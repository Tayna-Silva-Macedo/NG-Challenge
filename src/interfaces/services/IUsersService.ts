import User from '../../database/models/User';
import IUser from '../IUser';

export default interface IUsersService {
  create(obj: IUser): Promise<User>;
  login(obj: IUser): Promise<string>;
}
