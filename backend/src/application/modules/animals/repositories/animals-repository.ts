import { IAnimal } from '@domain/entities/animal';

interface IAnimalsRepository {
    findByNameAndBreed(name: string, breed_id: string): Promise<IAnimal>;
}

export { IAnimalsRepository };
