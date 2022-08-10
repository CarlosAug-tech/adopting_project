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

    it('should not be able to create a new animal, if breed_id is not provided', async () => {
        const response = await request(app)
            .post('/animals')
            .send({
                name: 'any_name',
                description: 'any_description',
                sex: 'any_sex',
                breed_id: '',
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

    it('should not be able to create a new animal, if type_id is not provided', async () => {
        const response = await request(app)
            .post('/animals')
            .send({
                name: 'any_name',
                description: 'any_description',
                sex: 'any_sex',
                breed_id: idBreedGeneric,
                type_id: '',
                isPuppy: true,
                isAdopt: false,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('This field is required!');
    });

    it('should not be able to create a new animal, if the animal already was adopt', async () => {
        const response = await request(app)
            .post('/animals')
            .send({
                name: 'any_name',
                description: 'any_description',
                sex: 'any_sex',
                breed_id: idBreedGeneric,
                type_id: idTypeGeneric,
                isPuppy: true,
                isAdopt: true,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual(
            'Does not register a animal already adopting',
        );
    });

    it('should not be able to create a new animal, if the breed is not exists', async () => {
        const response = await request(app)
            .post('/animals')
            .send({
                name: 'any_name',
                description: 'any_description',
                sex: 'any_sex',
                breed_id: v4(),
                type_id: idTypeGeneric,
                isPuppy: true,
                isAdopt: false,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual(
            'This breed is not exists, set other breed!',
        );
    });

    it('should not be able to create a new animal, if already exists a animal with breed and name already register', async () => {
        await connection.query(`INSERT INTO ANIMALS(id, name, description, breed_id, type_id, sex, "isPuppy", "isAdopt", created_at)
        values('${v4()}', 'name_already_register', 'any_description', '${idBreedGeneric}', '${idTypeGeneric}', 'any_sex', 'false', 'false',  'now()')
        `);

        const response = await request(app)
            .post('/animals')
            .send({
                name: 'name_already_register',
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
        expect(response.body.message).toEqual(
            'This animal already register, change name please!',
        );
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
