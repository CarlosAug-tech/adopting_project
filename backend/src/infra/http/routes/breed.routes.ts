import { Router } from 'express';
import { CreateBreedController } from '@application/modules/animals/usecases/create-breed/create-breed-controller';
import authenticationMiddleware from '../middlewares/authentication-middleware';

const breedRoutes = Router();
const createBreedController = new CreateBreedController();

breedRoutes.post('/', authenticationMiddleware, createBreedController.handle);

export { breedRoutes };
