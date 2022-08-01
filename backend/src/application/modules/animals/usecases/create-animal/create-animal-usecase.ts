import { UseCase } from '@application/contracts/usecase';
import { AppError } from '@infra/shared/utils/app-error';
import { ICreateAnimalRequestDTO } from '../../dtos/create-animal-dtos';
import { IAnimalsRepository } from '../../repositories/animals-repository';

class CreateAnimalUseCase extends UseCase<ICreateAnimalRequestDTO> {
    constructor(private animalsRepository: IAnimalsRepository) {
        super();
    }

    async perform(data: ICreateAnimalRequestDTO): Promise<any> {
        const { name, breed_id, isAdopt } = data;

        if (isAdopt) {
            throw new AppError('Does not register a animal already adopting');
        }

        const animalExists = await this.animalsRepository.findByNameAndBreed(
            name,
            breed_id,
        );

        if (animalExists) {
            throw new AppError(
                'This animal already register, change name please!',
            );
        }
    }

    async execute(data: ICreateAnimalRequestDTO): Promise<any> {
        const requiredFields = ['name', 'description', 'breed_id', 'sex'];

        this.validateRequiredFields(data, requiredFields);

        await this.perform(data);
    }
}

export { CreateAnimalUseCase };
