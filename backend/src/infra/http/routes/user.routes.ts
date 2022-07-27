import { CreateUserController } from '@application/modules/accounts/usecases/create-user/create-user-controller';
import { Router } from 'express';

const userRoutes = Router();
const createUserController = new CreateUserController();

userRoutes.post('/', createUserController.handle);

export { userRoutes };
