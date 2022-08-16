import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@infra/database/typeorm';
import { app } from '@infra/http/app';
import { sign } from 'jsonwebtoken';

let connection: Connection;
let token: string;

describe('Create Breed Controller', () => {
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

    it('should not be able to create a new Breed, if name field is not provided and return status 400 (BADREQUEST)', async () => {
        const response = await request(app)
            .post('/breeds')
            .send({
                name: '',
                description: 'any_description',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('This field is required!');
    });
});
