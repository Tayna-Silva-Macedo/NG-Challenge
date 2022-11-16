import { Router } from 'express';
import usersController from '../utils/factories/usersController';

const router = Router();

router.post('/', usersController.create);

export default router;
