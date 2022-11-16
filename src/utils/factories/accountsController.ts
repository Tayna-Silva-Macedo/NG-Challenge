import AccountsController from '../../controllers/AccountsController';
import Account from '../../database/models/Account';
import AccountsService from '../../services/AccountsService';

const accountsController = (): AccountsController => {
  const accountsService = new AccountsService(Account);
  return new AccountsController(accountsService);
};

export default accountsController();
