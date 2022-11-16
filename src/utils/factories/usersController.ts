import UsersController from '../../controllers/UsersController';
import Account from '../../database/models/Account';
import User from '../../database/models/User';
import UsersService from '../../services/UsersService';

const usersController = (): UsersController => {
  const usersService = new UsersService(User, Account);

  return new UsersController(usersService);
};

export default usersController();
