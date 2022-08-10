import { IBreed } from '@domain/entities/breed';

interface IBreedsRepository {
    findById(id: string): Promise<IBreed>;
}

export { IBreedsRepository };
