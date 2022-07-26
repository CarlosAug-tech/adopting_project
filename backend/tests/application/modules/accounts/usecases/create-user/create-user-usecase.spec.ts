import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/create-user-dtos';
import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { CreateUserUseCase } from '@application/modules/accounts/usecases/create-user/create-user-usecase';
import { IUser } from '@domain/entities/user';

const makeUsersRepositoryStub = (): IUsersRepository => {
    class UsersRepositoryStub implements IUsersRepository {
        create(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
            const user = {
                id: 'any_id',
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                created_at: new Date(),
            };

            return new Promise(resolve => resolve(user));
        }

        findByEmail(email: string): Promise<IUser> {
            const user = {
                id: 'any_id',
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                created_at: new Date(),
            };

            return new Promise(resolve => resolve(user));
        }
    }

    return new UsersRepositoryStub();
};

describe('Create User UseCase', () => {
    it('should not be able to create a new User, if name is not provided', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const sut = new CreateUserUseCase(usersRepositoryStub);
        jest.spyOn(usersRepositoryStub, 'findByEmail').mockReturnValueOnce(
            undefined,
        );
        const user = {
            name: '',
            email: 'any_email@email.com',
            password: 'any_password',
            confirmPassword: 'any_password',
        };

        await expect(sut.execute(user)).rejects.toThrow();
    });

    it('should not be able to create a new User, if email is not provided', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const sut = new CreateUserUseCase(usersRepositoryStub);
        jest.spyOn(usersRepositoryStub, 'findByEmail').mockReturnValueOnce(
            undefined,
        );
        const user = {
            name: 'any_name',
            email: '',
            password: 'any_password',
            confirmPassword: 'any_password',
        };

        await expect(sut.execute(user)).rejects.toThrow();
    });

    it('should not be able to create a new User, if password is not provided', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const sut = new CreateUserUseCase(usersRepositoryStub);
        jest.spyOn(usersRepositoryStub, 'findByEmail').mockReturnValueOnce(
            undefined,
        );
        const user = {
            name: 'any_name',
            email: 'any_email@email.com',
            password: '',
            confirmPassword: 'any_password',
        };

        await expect(sut.execute(user)).rejects.toThrow();
    });

    it('should not be able to create a new User, if confirmPassword is not provided', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const sut = new CreateUserUseCase(usersRepositoryStub);
        jest.spyOn(usersRepositoryStub, 'findByEmail').mockReturnValueOnce(
            undefined,
        );
        const user = {
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
            confirmPassword: '',
        };

        await expect(sut.execute(user)).rejects.toThrow();
    });

    it('should not be able to create a new User, if email already exists', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const sut = new CreateUserUseCase(usersRepositoryStub);
        const user = {
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
            confirmPassword: 'any_password',
        };

        await expect(sut.execute(user)).rejects.toThrow();
    });

    it('should be able to create a new User', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const sut = new CreateUserUseCase(usersRepositoryStub);
        jest.spyOn(usersRepositoryStub, 'findByEmail').mockReturnValueOnce(
            undefined,
        );
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
