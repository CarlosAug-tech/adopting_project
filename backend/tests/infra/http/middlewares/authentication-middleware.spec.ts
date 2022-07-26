import request from 'supertest';
import { sign } from 'jsonwebtoken';

import authenticationMiddleware from '@infra/http/middlewares/authentication-middleware';

import { app } from '@infra/http/app';

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

    it('should not be access private route, if token is not provided', async () => {
        const response = await request(app).get(
            '/test-middleware-authentication',
        );

        expect(response.statusCode).toBe(403);
    });

    it('should not be able access private route, if token is invalid', async () => {
        const response = await request(app)
            .get('/test-middleware-authentication')
            .set({
                Authorization: `Bearer invalid_token`,
            });

        expect(response.statusCode).toBe(401);
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
