import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@infra/http/app';
import createConnection from '@infra/database/typeorm';

let token: string;
let connection: Connection;

describe('Create Type Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        token = sign({}, 'any_token_secret', {
            subject: 'any_id',
        });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should not be able to create a new type, if name field is not provided and return 400 (BAD REQUEST)', async () => {
        const response = await request(app)
            .post('/types')
            .send({
                name: '',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
