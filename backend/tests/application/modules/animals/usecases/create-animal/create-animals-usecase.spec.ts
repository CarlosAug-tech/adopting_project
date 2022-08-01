import { CreateAnimalUseCase } from '@application/modules/animals/usecases/create-animal/create-animal-usecase';
import { AppError } from '@infra/shared/utils/app-error';

describe('Create Animal UseCase', () => {
    it('should not be able to create a animal, if name is not provided', async () => {
        const sut = new CreateAnimalUseCase();
        const animal = {
            name: '',
            description: 'any_descrption',
            breed_id: 'any_id',
            isPuppy: false,
            isAdopt: false,
        };

        await expect(sut.execute(animal)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });
});
