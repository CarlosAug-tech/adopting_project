import { IType } from '@domain/entities/type';
import { ICreateTypeRequestDTO } from '../dtos/create-type-dtos';

interface ITypesRepository {
    findByName(name: string): Promise<IType>;
    create(data: ICreateTypeRequestDTO): Promise<IType>;
}

export { ITypesRepository };
