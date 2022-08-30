import { CreateTypeController } from '@application/modules/animals/usecases/create-type/create-type-controller';
import { Router } from 'express';
import authenticationMiddleware from '../middlewares/authentication-middleware';
import ensureAdmin from '../middlewares/ensure-admin-middleware';

const typeRoutes = Router();
const createTypeController = new CreateTypeController();

typeRoutes.post(
    '/',
    authenticationMiddleware,
    ensureAdmin,
    createTypeController.handle,
);

export { typeRoutes };
