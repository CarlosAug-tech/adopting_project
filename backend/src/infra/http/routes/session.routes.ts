import { Router } from 'express';

const sessionRoutes = Router();

sessionRoutes.post('/sessions', (request, response) =>
    response.status(200).json({
        token: 'any_token',
    }),
);

export { sessionRoutes };
