import { IAnimal } from '@domain/entities/animal';
import { ICreateAnimalRequestDTO } from '../dtos/create-animal-dtos';

interface IAnimalsRepository {
    create(data: ICreateAnimalRequestDTO): Promise<IAnimal>;
    findByNameAndBreed(name: string, breed_id: string): Promise<IAnimal>;
}

export { IAnimalsRepository };
