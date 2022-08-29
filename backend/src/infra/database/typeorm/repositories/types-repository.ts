import { ICreateTypeRequestDTO } from '@application/modules/animals/dtos/create-type-dtos';
import { ITypesRepository } from '@application/modules/animals/repositories/types-repository';
import { IType } from '@domain/entities/type';
import { getRepository, Repository } from 'typeorm';
import { Type } from '../entities/type';

class TypesRepository implements ITypesRepository {
    private repository: Repository<Type>;

    constructor() {
        this.repository = getRepository(Type);
    }

    async findByName(name: string): Promise<IType> {
        const type = await this.repository.findOne({
            where: { name },
        });

        return type;
    }

    async create({ name }: ICreateTypeRequestDTO): Promise<IType> {
        const type = this.repository.create({ name });

        await this.repository.save(type);

        return type;
    }
}

export { TypesRepository };
