import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/create-user-dtos';
import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { IUser } from '@domain/entities/user';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        email,
        password,
    }: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
        const user = this.repository.create({
            name,
            email,
            password,
        });

        const { id, created_at } = await this.repository.save(user);

        return {
            id,
            name,
            email,
            created_at,
        };
    }

    async findByEmail(email: string): Promise<IUser> {
        const user = await this.repository.findOne({ email });

        return user;
    }

    async findById(id: string): Promise<IUser> {
        const user = await this.repository.findOne(id);

        return user;
    }
}

export { UsersRepository };
