import { Router } from 'express';
import { UserController } from '../controllers/User';
import { ValidateUser } from '../middlewares/ValidateUser';

const userController = new UserController();

export const userRouter = Router();

userRouter.get('/getAll', userController.getAll);
userRouter.post('/create', ValidateUser, userController.createUser);
userRouter.get('/:userId', userController.getById);
