import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/create-user-dtos';
import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { IEncryptProvider } from '@application/providers/contracts/encrypt-provider';
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
                isAdmin: false,
                created_at: new Date(),
            };

            return new Promise(resolve => resolve(user));
        }

        findById(id: string): Promise<IUser> {
            const user = {
                id: 'any_id',
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                isAdmin: false,
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
            return new Promise(resolve => resolve('any_password_hashed'));
        }

        compare(password: string, password_hash: string): Promise<boolean> {
            return new Promise(resolve => resolve(true));
        }
    }

    return new BcryptProviderStub();
};

export { makeBcryptProviderStub, makeUsersRepositoryStub };
