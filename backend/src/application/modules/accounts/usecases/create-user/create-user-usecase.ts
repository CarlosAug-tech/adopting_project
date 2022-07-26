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
        const requiredFields = ['name', 'email', 'password', 'confirmPassword'];

        for (const field of requiredFields) {
            if (!data[field]) {
                throw new Error('This is field not provided');
            }
        }

        return {
            id: 'any_id',
            name,
            email,
            created_at: new Date(),
        };
    }
}

export { CreateUserUseCase };
