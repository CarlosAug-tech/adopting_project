import request from 'supertest';
import { app } from '@infra/http/app';
import authenticationMiddleware from '@infra/http/middlewares/authentication-middleware';
import ensureAdmin from '@infra/http/middlewares/ensure-admin-middleware';
import { Connection } from 'typeorm';

import createConnection from '@infra/database/typeorm/';
import { v4 } from 'uuid';
import { sign } from 'jsonwebtoken';

let connection: Connection;
let idGenericAdmin: string;
let idGenericUser: string;
let token: string;
let tokenGenericUser: string;

describe('Ensure Admin Middleware', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        idGenericAdmin = v4();
        idGenericUser = v4();

        await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at)
    values('${idGenericAdmin}', 'any_admin_name', 'any_admin_email@email.com', 'any_password', true, 'now()')
    `);

        await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at)
    values('${idGenericUser}', 'any_name', 'any_email@email.com', 'any_password', false, 'now()')
    `);

        app.get(
            '/test-admin-middleware',
            authenticationMiddleware,
            ensureAdmin,
            (req, res) => res.status(200).json({ ok: 'ok' }),
        );

        token = sign({}, 'any_token_secret', {
            subject: idGenericAdmin,
        });

        tokenGenericUser = sign({}, 'any_token_secret', {
            subject: idGenericUser,
        });
    });

    it('should not be able to pass if the user is not a Admin', async () => {
        const response = await request(app)
            .get('/test-admin-middleware')
            .set({
                Authorization: `Bearer ${tokenGenericUser}`,
            });

        expect(response.status).toBe(401);
    });

    it('should be able pass if the user is a Admin', async () => {
        const response = await request(app)
            .get('/test-admin-middleware')
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('ok');
    });
});
