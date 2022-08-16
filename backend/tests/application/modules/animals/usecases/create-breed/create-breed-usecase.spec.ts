import { IBreedsRepository } from '@application/modules/animals/repositories/breeds-repository';
import { CreateBreedUseCase } from '@application/modules/animals/usecases/create-breed/create-breed-usecase';
import { IBreed } from '@domain/entities/breed';
import { AppError } from '@infra/shared/utils/app-error';

const makeBreedsRepositoryStub = (): IBreedsRepository => {
    class BreedsRepositoryStub implements IBreedsRepository {
        findById(id: string): Promise<IBreed> {
            throw new Error('Method not implemented.');
        }

        findByName(name: string): Promise<IBreed> {
            const breed = {
                id: 'any_id',
                name: 'any_name',
                description: 'any_description',
                created_at: new Date(),
            };

            return new Promise(resolve => resolve(breed));
        }
    }

    return new BreedsRepositoryStub();
};

interface ISutTypes {
    sut: CreateBreedUseCase;
    breedsRepositoryStub: IBreedsRepository;
}

const makeSut = (): ISutTypes => {
    const breedsRepositoryStub = makeBreedsRepositoryStub();
    const sut = new CreateBreedUseCase(breedsRepositoryStub);

    return {
        sut,
        breedsRepositoryStub,
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

    it('should not be able to create a new Breed, if description field is not provided', async () => {
        const { sut } = makeSut();
        const breed = {
            name: 'any_name',
            description: '',
        };

        await expect(sut.execute(breed)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });

    it('should not be able to create a new Breed, if the breed already exists', async () => {
        const { sut } = makeSut();
        const breed = {
            name: 'any_name',
            description: 'any_description',
        };

        await expect(sut.execute(breed)).rejects.toEqual(
            new AppError('This breed already exists'),
        );
    });
});
