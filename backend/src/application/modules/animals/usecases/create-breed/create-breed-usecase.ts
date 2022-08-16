import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { UseCase } from '@application/contracts/usecase';
import { IBreed } from '@domain/entities/breed';
import { AppError } from '@infra/shared/utils/app-error';
import { ICreateBreedRequestDTO } from '../../dtos/create-breed-dtos';
import { IBreedsRepository } from '../../repositories/breeds-repository';

@injectable()
class CreateBreedUseCase extends UseCase<ICreateBreedRequestDTO> {
    constructor(
        @inject('BreedsRepository')
        private breedsRepository: IBreedsRepository,
    ) {
        super();
    }

    async perform(data?: ICreateBreedRequestDTO): Promise<IBreed> {
        const { name, description } = data;

        const breedExists = await this.breedsRepository.findByName(name);

        if (breedExists) {
            throw new AppError('This breed already exists');
        }

        const breed = await this.breedsRepository.create({
            name,
            description,
        });

        return breed;
    }
}

export { CreateBreedUseCase };
