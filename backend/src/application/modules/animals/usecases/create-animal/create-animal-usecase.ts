import { UseCase } from '@application/contracts/usecase';
import { ICreateAnimalRequestDTO } from '../../dtos/create-animal-dtos';

class CreateAnimalUseCase extends UseCase {
    async perform(data: ICreateAnimalRequestDTO): Promise<any> {}
}

export { CreateAnimalUseCase };
