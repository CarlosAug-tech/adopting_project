import { AuthenticationUserController } from '@application/modules/accounts/usecases/authentication/authentication-user-controller';
import { Router } from 'express';

const sessionRoutes = Router();
const authenticationUserController = new AuthenticationUserController();

sessionRoutes.post('/sessions', authenticationUserController.handle);

export { sessionRoutes };
