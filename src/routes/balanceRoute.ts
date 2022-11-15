import { Router } from 'express';
import accountsController from '../utils/factories/accountsController';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth, accountsController.findBalanceById);

export default router;
