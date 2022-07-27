import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/create-user-dtos';
import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { AuthenticationUserUseCase } from '@application/modules/accounts/usecases/authentication/authentication-user-usecase';
import { IUser } from '@domain/entities/user';

const makeUsersRepositoryStub = (): IUsersRepository => {
    class UsersRepositoryStub implements IUsersRepository {
        create(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
            throw new Error('Method not implemented.');
        }

        findByEmail(email: string): Promise<IUser> {
            const user = {
                id: 'any_id',
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password_hashed',
                created_at: new Date(),
            };

            return new Promise(resolve => resolve(user));
        }
    }

    return new UsersRepositoryStub();
};

describe('Authentication User UseCase', () => {
    it('should not be able to authenticate a user, if email is not provided', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const sut = new AuthenticationUserUseCase(usersRepositoryStub);
        const credentials = {
            email: '',
            password: 'any_password',
        };

        await expect(sut.execute(credentials)).rejects.toThrow();
    });

    it('should not be able to authenticate a user, if password is not provided', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const sut = new AuthenticationUserUseCase(usersRepositoryStub);
        const credentials = {
            email: 'any_email@email.com',
            password: '',
        };

        await expect(sut.execute(credentials)).rejects.toThrow();
    });

    it('should not be able to authenticate user, if email is not exists', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const sut = new AuthenticationUserUseCase(usersRepositoryStub);
        jest.spyOn(usersRepositoryStub, 'findByEmail').mockReturnValueOnce(
            undefined,
        );
        const credentials = {
            email: 'any_email@email.com',
            password: 'any_password',
        };

        await expect(sut.execute(credentials)).rejects.toThrow();
    });

    it('should be able to authenticate a user', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const sut = new AuthenticationUserUseCase(usersRepositoryStub);
        const credentials = {
            email: 'any_email@email.com',
            password: 'any_password',
        };

        const userAuth = await sut.execute(credentials);

        expect(userAuth).toHaveProperty('token');
    });
});
