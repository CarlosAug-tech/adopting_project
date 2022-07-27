import {
    IAuthenticationUserRequestDTO,
    IAuthenticationUserResponseDTO,
} from '../../dtos/authentication-user-dtos';
import { IUsersRepository } from '../../repositories/users-repository';

class AuthenticationUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute(
        data: IAuthenticationUserRequestDTO,
    ): Promise<IAuthenticationUserResponseDTO> {
        const { email, password } = data;
        const requiredFields = ['email', 'password'];

        for (const field of requiredFields) {
            if (!data[field]) {
                throw new Error('This is field is required!');
            }
        }

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('Email or password invalid!');
        }

        return {
            user: {
                id: 'any_id',
                name: 'any_name',
                email,
            },
            token: 'any_token',
        };
    }
}

export { AuthenticationUserUseCase };
