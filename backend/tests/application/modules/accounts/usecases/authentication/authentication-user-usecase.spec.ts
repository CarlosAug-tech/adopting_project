import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/create-user-dtos';
import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { AuthenticationUserUseCase } from '@application/modules/accounts/usecases/authentication/authentication-user-usecase';
import { IEncryptProvider } from '@application/providers/contracts/encrypt-provider';
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

const makeBcryptProviderStub = (): IEncryptProvider => {
    class BcryptProviderStub implements IEncryptProvider {
        hash(password: string, hashSalt: number): Promise<string> {
            throw new Error('Method not implemented.');
        }

        compare(password: string, password_hash: string): Promise<boolean> {
            return new Promise(resolve => resolve(true));
        }
    }

    return new BcryptProviderStub();
};

describe('Authentication User UseCase', () => {
    it('should not be able to authenticate a user, if email is not provided', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const bcryptProviderStub = makeBcryptProviderStub();
        const sut = new AuthenticationUserUseCase(
            usersRepositoryStub,
            bcryptProviderStub,
        );
        const credentials = {
            email: '',
            password: 'any_password',
        };

        await expect(sut.execute(credentials)).rejects.toThrow();
    });

    it('should not be able to authenticate a user, if password is not provided', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const bcryptProviderStub = makeBcryptProviderStub();
        const sut = new AuthenticationUserUseCase(
            usersRepositoryStub,
            bcryptProviderStub,
        );
        const credentials = {
            email: 'any_email@email.com',
            password: '',
        };

        await expect(sut.execute(credentials)).rejects.toThrow();
    });

    it('should not be able to authenticate user, if email is not exists', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const bcryptProviderStub = makeBcryptProviderStub();
        const sut = new AuthenticationUserUseCase(
            usersRepositoryStub,
            bcryptProviderStub,
        );
        jest.spyOn(usersRepositoryStub, 'findByEmail').mockReturnValueOnce(
            undefined,
        );
        const credentials = {
            email: 'any_email@email.com',
            password: 'any_password',
        };

        await expect(sut.execute(credentials)).rejects.toThrow();
    });

    it('should not be able to authenticate a user, if password is invalid', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const bcryptProviderStub = makeBcryptProviderStub();
        jest.spyOn(bcryptProviderStub, 'compare').mockReturnValueOnce(
            new Promise(resolve => resolve(false)),
        );
        const sut = new AuthenticationUserUseCase(
            usersRepositoryStub,
            bcryptProviderStub,
        );

        const credentials = {
            email: 'any_email@email.com',
            password: 'any_password_invalid',
        };

        await expect(sut.execute(credentials)).rejects.toThrow();
    });

    it('should be able to authenticate a user', async () => {
        const usersRepositoryStub = makeUsersRepositoryStub();
        const bcryptProviderStub = makeBcryptProviderStub();
        const sut = new AuthenticationUserUseCase(
            usersRepositoryStub,
            bcryptProviderStub,
        );
        const credentials = {
            email: 'any_email@email.com',
            password: 'any_password',
        };

        const userAuth = await sut.execute(credentials);

        expect(userAuth).toHaveProperty('token');
    });
});
