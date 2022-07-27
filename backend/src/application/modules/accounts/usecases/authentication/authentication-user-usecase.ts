import {
    IAuthenticationUserRequestDTO,
    IAuthenticationUserResponseDTO,
} from '../../dtos/authentication-user-dtos';

class AuthenticationUserUseCase {
    async execute(
        data: IAuthenticationUserRequestDTO,
    ): Promise<IAuthenticationUserResponseDTO> {
        const { email, password } = data;

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
