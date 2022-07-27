import request from 'supertest';
import { sign } from 'jsonwebtoken';
import { app } from '@infra/http/app';

import authenticationMiddleware from '@infra/http/middlewares/authentication-middleware';

let token: string;

describe('Middleware Authentication', () => {
    beforeAll(async () => {
        app.get(
            '/test-middleware-authentication',
            authenticationMiddleware,
            (req, res) => res.status(200).json({ ok: 'ok' }),
        );

        token = sign({}, 'any_token_secret', {
            subject: 'any_id',
        });
    });

    it('should be verify if token is provided', async () => {
        const response = await request(app)
            .get('/test-middleware-authentication')
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.statusCode).toBe(200);
    });
});
