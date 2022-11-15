import UsersController from '../../controllers/UsersController';
import Account from '../../database/models/Account';
import User from '../../database/models/User';
import AccountsService from '../../services/AccountsService';
import UsersService from '../../services/UsersService';

const usersController = (): UsersController => {
  const accountsService = new AccountsService(Account);
  const usersService = new UsersService(User, accountsService);

  return new UsersController(usersService);
};

export default usersController();
