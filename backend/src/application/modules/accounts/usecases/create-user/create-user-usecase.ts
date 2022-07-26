import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from '../../dtos/create-user-dtos';

interface IRequest extends ICreateUserRequestDTO {
    confirmPassword: string;
}

class CreateUserUseCase {
    async execute(data: IRequest): Promise<ICreateUserResponseDTO> {
        const { name, email, password, confirmPassword } = data;

        return {
            id: 'any_id',
            name,
            email,
            created_at: new Date(),
        };
    }
}

export { CreateUserUseCase };
