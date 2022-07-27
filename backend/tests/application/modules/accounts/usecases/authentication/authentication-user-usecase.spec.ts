import { AuthenticationUserUseCase } from '@application/modules/accounts/usecases/authentication/authentication-user-usecase';

describe('Authentication User UseCase', () => {
    it('should not be able to authenticate a user, if email is not provided', async () => {
        const sut = new AuthenticationUserUseCase();
        const credentials = {
            email: '',
            password: 'any_password',
        };

        await expect(sut.execute(credentials)).rejects.toThrow();
    });

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
