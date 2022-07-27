import { Router } from 'express';
import { sessionRoutes } from './session.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use(sessionRoutes);

export { routes };
