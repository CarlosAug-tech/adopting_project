import { AuthenticationUserUseCase } from '@application/modules/accounts/usecases/authentication/authentication-user-usecase';

describe('Authentication User UseCase', () => {
    it('should be able to authenticate a user', async () => {
        const sut = new AuthenticationUserUseCase();
        const credentials = {
            email: 'any_email@email.com',
            password: 'any_password',
        };

        const userAuth = await sut.execute(credentials);

        expect(userAuth).toHaveProperty('token');
    });
});
