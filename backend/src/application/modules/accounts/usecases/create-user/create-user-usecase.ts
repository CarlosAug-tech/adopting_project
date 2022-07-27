import { UseCase } from '@application/contracts/usecase';
import { IEncryptProvider } from '@application/providers/contracts/encrypt-provider';
import { AppError } from '@infra/shared/utils/app-error';
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
class CreateUserUseCase extends UseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('BcryptProvider')
        private bcryptProvider: IEncryptProvider,
    ) {
        super();
    }

    async perform(data: IRequest): Promise<ICreateUserResponseDTO> {
        const { name, email, password, confirmPassword } = data;
        const hashSalt = 12;

        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('User already exists');
        }

        if (password !== confirmPassword) {
            throw new AppError('Passwords does not match!');
        }

        const passwordHash = await this.bcryptProvider.hash(password, hashSalt);

        const { id, created_at } = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
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
