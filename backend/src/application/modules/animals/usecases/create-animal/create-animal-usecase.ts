import { UseCase } from '@application/contracts/usecase';
import { IAnimal } from '@domain/entities/animal';
import { AppError } from '@infra/shared/utils/app-error';
import { ICreateAnimalRequestDTO } from '../../dtos/create-animal-dtos';
import { IAnimalsRepository } from '../../repositories/animals-repository';
import { IBreedsRepository } from '../../repositories/breeds-repository';

class CreateAnimalUseCase extends UseCase<ICreateAnimalRequestDTO, IAnimal> {
    constructor(
        private animalsRepository: IAnimalsRepository,
        private breedsRepository: IBreedsRepository,
    ) {
        super();
    }

    async perform(data: ICreateAnimalRequestDTO): Promise<IAnimal> {
        const { name, description, breed_id, type_id, sex, isPuppy, isAdopt } =
            data;

        if (isAdopt) {
            throw new AppError('Does not register a animal already adopting');
        }

        const breedExists = await this.breedsRepository.findById(breed_id);

        if (!breedExists) {
            throw new AppError('This breed is not exists, set other breed!');
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

        const animal = await this.animalsRepository.create({
            name,
            description,
            breed_id,
            type_id,
            sex,
            isPuppy,
            isAdopt,
        });

        return animal;
    }

    async execute(data: ICreateAnimalRequestDTO): Promise<IAnimal> {
        const requiredFields = [
            'name',
            'description',
            'breed_id',
            'type_id',
            'sex',
        ];

        this.validateRequiredFields(data, requiredFields);

        return this.perform(data);
    }
}

export { CreateAnimalUseCase };
