import IUser from '../IUser';

export default interface IUsersService {
  create(obj: IUser): Promise<IUser>;
}
