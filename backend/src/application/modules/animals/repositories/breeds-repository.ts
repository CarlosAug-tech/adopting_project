import { IBreed } from '@domain/entities/breed';

interface IBreedsRepository {
    findById(id: string): Promise<IBreed>;
    findByName(name: string): Promise<IBreed>;
}

export { IBreedsRepository };
