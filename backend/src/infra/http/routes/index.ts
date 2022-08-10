import { Router } from 'express';
import { animalRoutes } from './animal.routes';
import { sessionRoutes } from './session.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/animals', animalRoutes);
routes.use(sessionRoutes);

export { routes };
