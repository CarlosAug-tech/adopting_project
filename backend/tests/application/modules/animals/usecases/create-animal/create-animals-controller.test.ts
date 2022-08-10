import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@infra/http/app';
import createConnection from '@infra/database/typeorm';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

let connection: Connection;
let token: string;
let idBreedGeneric: string;
let idTypeGeneric: string;

describe('Create animals controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        idBreedGeneric = v4();
        idTypeGeneric = v4();

        await connection.query(`INSERT INTO BREEDS(id, name, description, created_at)
        values('${idBreedGeneric}', 'any_name', 'any_description', 'now()')
        `);

        await connection.query(`INSERT INTO TYPES(id, name, created_at)
        values('${idTypeGeneric}', 'any_name', 'now()')
        `);

        token = sign({}, 'any_token_secret', {
            subject: 'any_id',
        });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should not be able to create a new animal, if name is not provided', async () => {
        const response = await request(app)
            .post('/animals')
            .send({
                name: '',
                description: 'any_description',
                sex: 'any_sex',
                breed_id: idBreedGeneric,
                type_id: idTypeGeneric,
                isPuppy: true,
                isAdopt: false,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('This field is required!');
    });

    it('should not be able to create a new animal, if description is not provided', async () => {
        const response = await request(app)
            .post('/animals')
            .send({
                name: 'any_name',
                description: '',
                sex: 'any_sex',
                breed_id: idBreedGeneric,
                type_id: idTypeGeneric,
                isPuppy: true,
                isAdopt: false,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('This field is required!');
    });

    it('should not be able to create a new animal, if sex is not provided', async () => {
        const response = await request(app)
            .post('/animals')
            .send({
                name: 'any_name',
                description: 'any_description',
                sex: '',
                breed_id: idBreedGeneric,
                type_id: idTypeGeneric,
                isPuppy: true,
                isAdopt: false,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('This field is required!');
    });

    it('it should be able to create a new animal and return status 201(CREATED)', async () => {
        const response = await request(app)
            .post('/animals')
            .send({
                name: 'any_name',
                description: 'any_description',
                sex: 'any_sex',
                breed_id: idBreedGeneric,
                type_id: idTypeGeneric,
                isPuppy: true,
                isAdopt: false,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
});
