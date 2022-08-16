import { IBreed } from '@domain/entities/breed';
import { ICreateBreedRequestDTO } from '../dtos/create-breed-dtos';

interface IBreedsRepository {
    create(data: ICreateBreedRequestDTO): Promise<IBreed>;
    findById(id: string): Promise<IBreed>;
    findByName(name: string): Promise<IBreed>;
}

export { IBreedsRepository };
