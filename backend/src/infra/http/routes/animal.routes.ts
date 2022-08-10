import { Router } from 'express';
import authenticationMiddleware from '../middlewares/authentication-middleware';

const animalRoutes = Router();

animalRoutes.post('/', authenticationMiddleware, (req, res) =>
    res.status(201).json({ id: 'any_id' }),
);

export { animalRoutes };
