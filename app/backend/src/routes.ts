import { Router } from 'express';
import { loginMiddleware, authToken } from './middleware/loginMiddleware';
import * as usersController from './controllers/loginController';

const router = Router();

router.post('/login', loginMiddleware, usersController.loginController);
router.get('/login/validate', authToken, usersController.userRoleController);

export default router;
