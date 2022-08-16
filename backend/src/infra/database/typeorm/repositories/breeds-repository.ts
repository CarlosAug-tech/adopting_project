import { IBreedsRepository } from '@application/modules/animals/repositories/breeds-repository';
import { IBreed } from '@domain/entities/breed';
import { getRepository, Repository } from 'typeorm';
import { Breed } from '../entities/breed';

class BreedsRepository implements IBreedsRepository {
    private repository: Repository<Breed>;

    constructor() {
        this.repository = getRepository(Breed);
    }

    async findById(id: string): Promise<IBreed> {
        const breed = await this.repository.findOne({ id });

        return breed;
    }

    async findByName(name: string): Promise<IBreed> {
        const breed = await this.repository.findOne({
            where: { name },
        });

        return breed;
    }
}

export { BreedsRepository };
