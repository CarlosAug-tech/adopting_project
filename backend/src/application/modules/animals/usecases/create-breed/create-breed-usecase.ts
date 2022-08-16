import { UseCase } from '@application/contracts/usecase';
import { ICreateBreedRequestDTO } from '../../dtos/create-breed-dtos';

class CreateBreedUseCase extends UseCase<ICreateBreedRequestDTO> {
    async perform(data?: ICreateBreedRequestDTO): Promise<any> {
        return '';
    }
}

export { CreateBreedUseCase };
