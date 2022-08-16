import { UseCase } from '@application/contracts/usecase';
import { AppError } from '@infra/shared/utils/app-error';
import { ICreateBreedRequestDTO } from '../../dtos/create-breed-dtos';
import { IBreedsRepository } from '../../repositories/breeds-repository';

class CreateBreedUseCase extends UseCase<ICreateBreedRequestDTO> {
    constructor(private breedsRepository: IBreedsRepository) {
        super();
    }

    async perform(data?: ICreateBreedRequestDTO): Promise<any> {
        const { name, description } = data;

        const breedExists = await this.breedsRepository.findByName(name);

        if (breedExists) {
            throw new AppError('This breed already exists');
        }

        return '';
    }
}

export { CreateBreedUseCase };
