import { IUser } from '@domain/entities/user';
import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from '../dtos/create-user-dtos';

interface IUsersRepository {
    create(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO>;
    findByEmail(email: string): Promise<IUser>;
}

export { IUsersRepository };
