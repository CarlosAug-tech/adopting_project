import { CreateTypeController } from '@application/modules/animals/usecases/create-type/create-type-controller';
import { Router } from 'express';
import authenticationMiddleware from '../middlewares/authentication-middleware';

const typeRoutes = Router();
const createTypeController = new CreateTypeController();

typeRoutes.post('/', authenticationMiddleware, createTypeController.handle);

export { typeRoutes };
