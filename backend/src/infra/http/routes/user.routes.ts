import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/', (request, response) =>
    response.status(201).json({ id: 'any_id' }),
);

export { userRoutes };
