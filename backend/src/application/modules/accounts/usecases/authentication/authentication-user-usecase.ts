import 'reflect-metadata';
import { sign } from 'jsonwebtoken';
import { IEncryptProvider } from '@application/providers/contracts/encrypt-provider';
import { inject, injectable } from 'tsyringe';
import { UseCase } from '@application/contracts/usecase';
import { AppError } from '@infra/shared/utils/app-error';
import {
    IAuthenticationUserRequestDTO,
    IAuthenticationUserResponseDTO,
} from '../../dtos/authentication-user-dtos';
import { IUsersRepository } from '../../repositories/users-repository';

@injectable()
class AuthenticationUserUseCase extends UseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('BcryptProvider')
        private bcryptProvider: IEncryptProvider,
    ) {
        super();
    }

    async perform(
        data: IAuthenticationUserRequestDTO,
    ): Promise<IAuthenticationUserResponseDTO> {
        const { email, password } = data;
        const tokenSecret = 'any_secret_token';

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password invalid!');
        }

        const passwordIsMatch = await this.bcryptProvider.compare(
            password,
            user.password,
        );

        if (!passwordIsMatch) {
            throw new AppError('Email or password invalid!');
        }

        const { id, name } = user;

        const token = sign({}, tokenSecret, {
            subject: id,
        });

        return {
            user: {
                id,
                name,
                email,
            },
            token,
        };
    }
}

export { AuthenticationUserUseCase };
