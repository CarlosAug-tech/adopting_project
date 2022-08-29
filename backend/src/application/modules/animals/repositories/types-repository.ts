import { IType } from '@domain/entities/type';

interface ITypesRepository {
    findByName(name: string): Promise<IType>;
}

export { ITypesRepository };
