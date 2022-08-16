import { Router } from 'express';
import { animalRoutes } from './animal.routes';
import { breedRoutes } from './breed.routes';
import { sessionRoutes } from './session.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/animals', animalRoutes);
routes.use('/breeds', breedRoutes);
routes.use(sessionRoutes);

export { routes };
