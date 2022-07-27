import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { AuthenticationUserUseCase } from '@application/modules/accounts/usecases/authentication/authentication-user-usecase';
import { IEncryptProvider } from '@application/providers/contracts/encrypt-provider';
import { AppError } from '@infra/shared/utils/app-error';
import {
    makeBcryptProviderStub,
    makeUsersRepositoryStub,
} from '../../__mocks__/users-repository-mocks';

interface ISutTypes {
    usersRepositoryStub: IUsersRepository;
    bcryptProviderStub: IEncryptProvider;
    sut: AuthenticationUserUseCase;
}

const makeSut = (): ISutTypes => {
    const usersRepositoryStub = makeUsersRepositoryStub();
    const bcryptProviderStub = makeBcryptProviderStub();
    const sut = new AuthenticationUserUseCase(
        usersRepositoryStub,
        bcryptProviderStub,
    );

    return {
        sut,
        usersRepositoryStub,
        bcryptProviderStub,
    };
};

describe('Authentication User UseCase', () => {
    it('should not be able to authenticate a user, if email is not provided', async () => {
        const { sut } = makeSut();
        const credentials = {
            email: '',
            password: 'any_password',
        };

        await expect(sut.execute(credentials)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });

    it('should not be able to authenticate a user, if password is not provided', async () => {
        const { sut } = makeSut();
        const credentials = {
            email: 'any_email@email.com',
            password: '',
        };

        await expect(sut.execute(credentials)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });

    it('should not be able to authenticate user, if email is not exists', async () => {
        const { sut, usersRepositoryStub } = makeSut();
        jest.spyOn(usersRepositoryStub, 'findByEmail').mockReturnValueOnce(
            undefined,
        );
        const credentials = {
            email: 'any_email@email.com',
            password: 'any_password',
        };

        await expect(sut.execute(credentials)).rejects.toEqual(
            new AppError('Email or password invalid!'),
        );
    });

    it('should not be able to authenticate a user, if password is invalid', async () => {
        const { sut, bcryptProviderStub } = makeSut();
        jest.spyOn(bcryptProviderStub, 'compare').mockReturnValueOnce(
            new Promise(resolve => resolve(false)),
        );

        const credentials = {
            email: 'any_email@email.com',
            password: 'any_password_invalid',
        };

        await expect(sut.execute(credentials)).rejects.toEqual(
            new AppError('Email or password invalid!'),
        );
    });

    it('should be able to authenticate a user', async () => {
        const { sut } = makeSut();
        const credentials = {
            email: 'any_email@email.com',
            password: 'any_password',
        };

        const userAuth = await sut.execute(credentials);

        expect(userAuth).toHaveProperty('token');
    });
});
