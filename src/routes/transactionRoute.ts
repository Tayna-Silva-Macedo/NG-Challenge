import { Router } from 'express';
import auth from '../middlewares/auth';
import transactionsController from '../utils/factories/transactionsController';

const router = Router();

router.post('/', auth, transactionsController.create);
router.get('/', auth, transactionsController.findAll);

export default router;
