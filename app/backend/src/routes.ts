import { Router } from 'express';
import { loginMiddleware, authToken } from './middleware/loginMiddleware';
import * as usersController from './controllers/loginController';
import * as TeamController from './controllers/teamController';
import * as MatchController from './controllers/matcheControoler';
import MatchValidation from './middleware/matchesValidation';
import * as LeaderboardController from './controllers/leaderboardController';

const router = Router();

router.post('/login', loginMiddleware, usersController.loginController);
router.get('/login/validate', authToken, usersController.userRoleController);

router.get('/teams', TeamController.getAll);
router.get('/teams/:id', TeamController.getById);

router.get('/matches', MatchController.getAllMatch);
router.post('/matches', authToken, MatchValidation, MatchController.creatingMatch);
router.patch('/matches/:id/finish', MatchController.updateFinish);
router.patch('/matches/:id', MatchController.updatedGoals);

router.get('/leaderboard/away', LeaderboardController.getAllAway);
router.get('/leaderboard/home', LeaderboardController.getAllHome);
router.get('/leaderboard', LeaderboardController.getAll);

export default router;
