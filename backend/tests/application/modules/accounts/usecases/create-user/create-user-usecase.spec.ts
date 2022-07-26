import { CreateUserUseCase } from '@application/modules/accounts/usecases/create-user/create-user-usecase';

describe('Create User UseCase', () => {
    it('should not be able to create a new User, if name is not provided', async () => {
        const sut = new CreateUserUseCase();
        const user = {
            name: '',
            email: 'any_email@email.com',
            password: 'any_password',
            confirmPassword: 'any_password',
        };

        await expect(sut.execute(user)).rejects.toThrow();
    });

    it('should not be able to create a new User, if email is not provided', async () => {
        const sut = new CreateUserUseCase();
        const user = {
            name: 'any_name',
            email: '',
            password: 'any_password',
            confirmPassword: 'any_password',
        };

        await expect(sut.execute(user)).rejects.toThrow();
    });

    it('should be able to create a new User', async () => {
        const sut = new CreateUserUseCase();
        const user = {
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
            confirmPassword: 'any_password',
        };

        const response = await sut.execute(user);

        expect(response).toHaveProperty('id');
    });
});
