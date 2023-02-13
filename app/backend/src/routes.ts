import { Router } from 'express';
import { loginMiddleware, authToken } from './middleware/loginMiddleware';
import * as usersController from './controllers/loginController';
import * as TeamController from './controllers/teamController';

const router = Router();

router.post('/login', loginMiddleware, usersController.loginController);
router.get('/login/validate', authToken, usersController.userRoleController);
router.get('/teams', TeamController.getAll);
router.get('/teams/:id', TeamController.getById);

export default router;
