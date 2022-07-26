import { app } from '@infra/http/app';
import request from 'supertest';

describe('Create User Controller', () => {
    it('should be able to create a new User and return 201 (CREATED)', async () => {
        const user = {
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
            confirmPassword: 'any_password',
        };

        const response = await request(app).post('/users').send(user);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
});
