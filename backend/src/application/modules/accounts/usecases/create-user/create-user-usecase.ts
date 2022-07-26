import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from '../../dtos/create-user-dtos';
import { IUsersRepository } from '../../repositories/users-repository';

interface IRequest extends ICreateUserRequestDTO {
    confirmPassword: string;
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute(data: IRequest): Promise<ICreateUserResponseDTO> {
        const { name, email, password, confirmPassword } = data;
        const requiredFields = ['name', 'email', 'password', 'confirmPassword'];

        for (const field of requiredFields) {
            if (!data[field]) {
                throw new Error('This is field not provided');
            }
        }

        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new Error('User already exists');
        }

        const { id, created_at } = await this.usersRepository.create({
            name,
            email,
            password,
        });

        return {
            id,
            name,
            email,
            created_at,
        };
    }
}

export { CreateUserUseCase };
