import { CreateAnimalController } from '@application/modules/animals/usecases/create-animal/create-animal-controller';
import { Router } from 'express';
import authenticationMiddleware from '../middlewares/authentication-middleware';

const animalRoutes = Router();
const createAnimalController = new CreateAnimalController();

animalRoutes.post('/', authenticationMiddleware, createAnimalController.handle);

export { animalRoutes };
