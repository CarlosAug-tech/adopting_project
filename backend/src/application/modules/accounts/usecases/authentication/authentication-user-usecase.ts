import { sign } from 'jsonwebtoken';
import { IEncryptProvider } from '@application/providers/contracts/encrypt-provider';
import { inject, injectable } from 'tsyringe';
import {
    IAuthenticationUserRequestDTO,
    IAuthenticationUserResponseDTO,
} from '../../dtos/authentication-user-dtos';
import { IUsersRepository } from '../../repositories/users-repository';

@injectable()
class AuthenticationUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('BcryptProvider')
        private bcryptProvider: IEncryptProvider,
    ) {}

    async execute(
        data: IAuthenticationUserRequestDTO,
    ): Promise<IAuthenticationUserResponseDTO> {
        const { email, password } = data;
        const requiredFields = ['email', 'password'];
        const tokenSecret = 'any_secret_token';

        for (const field of requiredFields) {
            if (!data[field]) {
                throw new Error('This is field is required!');
            }
        }

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('Email or password invalid!');
        }

        const passwordIsMatch = await this.bcryptProvider.compare(
            password,
            user.password,
        );

        if (!passwordIsMatch) {
            throw new Error('Email or password invalid!');
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
