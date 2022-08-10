import { ICreateAnimalRequestDTO } from '@application/modules/animals/dtos/create-animal-dtos';
import { IAnimalsRepository } from '@application/modules/animals/repositories/animals-repository';
import { IAnimal } from '@domain/entities/animal';
import { getRepository, Repository } from 'typeorm';
import { Animal } from '../entities/animal';

class AnimalsRepository implements IAnimalsRepository {
    private repository: Repository<Animal>;

    constructor() {
        this.repository = getRepository(Animal);
    }

    async create({
        name,
        description,
        sex,
        breed_id,
        type_id,
        isAdopt,
        isPuppy,
    }: ICreateAnimalRequestDTO): Promise<IAnimal> {
        const animal = this.repository.create({
            name,
            description,
            sex,
            breed_id,
            type_id,
            isAdopt,
            isPuppy,
        });

        await this.repository.save(animal);

        return animal;
    }

    async findByNameAndBreed(name: string, breed_id: string): Promise<IAnimal> {
        const animal = await this.repository.findOne({
            where: {
                breed_id,
                name,
            },
        });

        return animal;
    }
}

export { AnimalsRepository };
