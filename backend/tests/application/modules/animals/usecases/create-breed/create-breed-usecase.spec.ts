import { CreateBreedUseCase } from '@application/modules/animals/usecases/create-breed/create-breed-usecase';
import { AppError } from '@infra/shared/utils/app-error';

interface ISutTypes {
    sut: CreateBreedUseCase;
}

const makeSut = (): ISutTypes => {
    const sut = new CreateBreedUseCase();

    return {
        sut,
    };
};

describe('Create Breed UseCase', () => {
    it('should not be able to create a new Breed, if name field is not provided', async () => {
        const { sut } = makeSut();
        const breed = {
            name: '',
            description: 'any_description',
        };

        await expect(sut.execute(breed)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });
});
