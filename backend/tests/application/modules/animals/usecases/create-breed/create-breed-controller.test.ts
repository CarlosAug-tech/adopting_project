import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@infra/database/typeorm';
import { app } from '@infra/http/app';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

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

    it('should not be able to create a new Breed, if description field is not provided and return status 400 (BADREQUEST)', async () => {
        const response = await request(app)
            .post('/breeds')
            .send({
                name: 'any_name',
                description: '',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('This field is required!');
    });

    it('should not be able to create a new Breed, if breed already exists and return status 400 (BADREQUEST)', async () => {
        await connection.query(`INSERT INTO BREEDS(id, name, description, created_at)
        values('${v4()}', 'name_already_register', 'any_description', 'now()')
        `);

        const response = await request(app)
            .post('/breeds')
            .send({
                name: 'name_already_register',
                description: 'any_description',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('This breed already exists');
    });
});
