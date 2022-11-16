import TransactionsController from '../../controllers/TransactionsController';
import Account from '../../database/models/Account';
import Transaction from '../../database/models/Transaction';
import User from '../../database/models/User';
import TransactionsService from '../../services/TransactionsService';

const transactionsController = (): TransactionsController => {
  const transactionsService = new TransactionsService(Transaction, Account, User);
  return new TransactionsController(transactionsService);
};

export default transactionsController();
