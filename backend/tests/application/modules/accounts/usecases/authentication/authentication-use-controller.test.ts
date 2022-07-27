import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 } from 'uuid';
import { hash } from 'bcrypt';

import { IAuthenticationUserRequestDTO } from '@application/modules/accounts/dtos/authentication-user-dtos';

import { app } from '@infra/http/app';
import createConnection from '@infra/database/typeorm';

let connection: Connection;
let passwordUserGenericHash: string;
let idUserGeneric: string;
const hashSalt: number = 12;

const user: IAuthenticationUserRequestDTO = {
    email: 'any_email@email.com',
    password: 'any_password',
};

describe('Authentication User Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        idUserGeneric = v4();
        passwordUserGenericHash = await hash(user.password, hashSalt);

        await connection.query(`INSERT INTO USERS(id, name, email, password, created_at)
        values('${idUserGeneric}', 'any_name', '${user.email}', '${passwordUserGenericHash}', 'now()')
        `);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should be able to authenticate a user and return token and 200 (SUCCESS)', async () => {
        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: user.password,
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
