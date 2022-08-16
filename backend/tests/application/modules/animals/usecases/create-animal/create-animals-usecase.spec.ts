import { ICreateAnimalRequestDTO } from '@application/modules/animals/dtos/create-animal-dtos';
import { ICreateBreedRequestDTO } from '@application/modules/animals/dtos/create-breed-dtos';
import { IAnimalsRepository } from '@application/modules/animals/repositories/animals-repository';
import { IBreedsRepository } from '@application/modules/animals/repositories/breeds-repository';
import { CreateAnimalUseCase } from '@application/modules/animals/usecases/create-animal/create-animal-usecase';
import { IAnimal } from '@domain/entities/animal';
import { IBreed } from '@domain/entities/breed';
import { AppError } from '@infra/shared/utils/app-error';

const makeAnimalsRepositoryStub = (): IAnimalsRepository => {
    class AnimalsRepositoryStub implements IAnimalsRepository {
        create(data: ICreateAnimalRequestDTO): Promise<IAnimal> {
            const animal = {
                id: 'any_id',
                name: 'any_name',
                description: 'any_descirption',
                breed_id: 'any_breed',
                type_id: 'any_type',
                sex: 'any_sex',
                isPuppy: false,
                isAdopt: false,
                created_at: new Date(),
            };

            return new Promise(resolve => resolve(animal));
        }

        findByNameAndBreed(name: string, breed_id: string): Promise<IAnimal> {
            const animal = {
                id: 'any_id',
                name: 'any_name',
                description: 'any_descirption',
                breed_id: 'any_breed',
                type_id: 'any_type',
                sex: 'any_sex',
                isPuppy: false,
                isAdopt: false,
                created_at: new Date(),
            };

            return new Promise(resolve => resolve(animal));
        }
    }

    return new AnimalsRepositoryStub();
};

const makeBreedsRepositoryStub = (): IBreedsRepository => {
    class BreedsRepositoryStub implements IBreedsRepository {
        create(data: ICreateBreedRequestDTO): Promise<IBreed> {
            throw new Error('Method not implemented.');
        }

        async findById(id: string): Promise<IBreed> {
            const breed = {
                id: 'any_id',
                name: 'any_name',
                description: 'any_description',
                created_at: new Date(),
            };

            return new Promise(resolve => resolve(breed));
        }

        findByName(name: string): Promise<IBreed> {
            throw new Error('Method not implemented.');
        }
    }

    return new BreedsRepositoryStub();
};

interface ISutTypes {
    animalsRepositoryStub: IAnimalsRepository;
    breedsRepositoryStub: IBreedsRepository;
    sut: CreateAnimalUseCase;
}

const makeSut = (): ISutTypes => {
    const animalsRepositoryStub = makeAnimalsRepositoryStub();
    const breedsRepositoryStub = makeBreedsRepositoryStub();
    const sut = new CreateAnimalUseCase(
        animalsRepositoryStub,
        breedsRepositoryStub,
    );

    return { sut, animalsRepositoryStub, breedsRepositoryStub };
};

describe('Create Animal UseCase', () => {
    it('should not be able to create a animal, if name is not provided', async () => {
        const { sut } = makeSut();
        const animal = {
            name: '',
            description: 'any_descrption',
            breed_id: 'any_id',
            type_id: 'any_type',
            sex: 'any_sex',
            isPuppy: false,
            isAdopt: false,
        };

        await expect(sut.execute(animal)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });

    it('should not be able to create a animal, if description is not provided', async () => {
        const { sut } = makeSut();
        const animal = {
            name: 'any_name',
            description: '',
            breed_id: 'any_id',
            type_id: 'any_type',
            sex: 'any_sex',
            isPuppy: false,
            isAdopt: false,
        };

        await expect(sut.execute(animal)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });

    it('should not be able to create a animal, if breed is not provided', async () => {
        const { sut } = makeSut();
        const animal = {
            name: 'any_name',
            description: 'any_descirption',
            breed_id: '',
            type_id: 'any_type',
            sex: 'any_sex',
            isPuppy: false,
            isAdopt: false,
        };

        await expect(sut.execute(animal)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });

    it('should not be able to create a animal, if sex is not provided', async () => {
        const { sut } = makeSut();
        const animal = {
            name: 'any_name',
            description: 'any_descirption',
            breed_id: 'any_bredd',
            type_id: 'any_type',
            sex: '',
            isPuppy: false,
            isAdopt: false,
        };

        await expect(sut.execute(animal)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });

    it('should not be able to create a animal, if type is not provided', async () => {
        const { sut } = makeSut();
        const animal = {
            name: 'any_name',
            description: 'any_descirption',
            breed_id: 'any_bredd',
            type_id: '',
            sex: 'any_sex',
            isPuppy: false,
            isAdopt: false,
        };

        await expect(sut.execute(animal)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });

    it('should not be able to register a animal already adopting', async () => {
        const { sut } = makeSut();
        const animal = {
            name: 'any_name',
            description: 'any_descirption',
            breed_id: 'any_breed',
            type_id: 'any_type',
            sex: 'any_sex',
            isPuppy: false,
            isAdopt: true,
        };

        await expect(sut.execute(animal)).rejects.toEqual(
            new AppError('Does not register a animal already adopting'),
        );
    });

    it('should not be able to create a animal, if the animal already register', async () => {
        const { sut } = makeSut();
        const animal = {
            name: 'any_name',
            description: 'any_descirption',
            breed_id: 'any_breed',
            type_id: 'any_type',
            sex: 'any_sex',
            isPuppy: false,
            isAdopt: false,
        };

        await expect(sut.execute(animal)).rejects.toEqual(
            new AppError('This animal already register, change name please!'),
        );
    });

    it('should not be able to create a animal, if the breed is not exists', async () => {
        const { sut, breedsRepositoryStub } = makeSut();
        jest.spyOn(breedsRepositoryStub, 'findById').mockReturnValueOnce(
            undefined,
        );
        const animal = {
            name: 'any_name',
            description: 'any_descirption',
            breed_id: 'any_breed_invalid',
            type_id: 'any_type',
            sex: 'any_sex',
            isPuppy: false,
            isAdopt: false,
        };

        await expect(sut.execute(animal)).rejects.toEqual(
            new AppError('This breed is not exists, set other breed!'),
        );
    });

    it('should be able to create a new Animalfor adopting', async () => {
        const { sut, animalsRepositoryStub } = makeSut();
        jest.spyOn(
            animalsRepositoryStub,
            'findByNameAndBreed',
        ).mockReturnValueOnce(undefined);

        const animal = {
            name: 'any_name',
            description: 'any_descirption',
            breed_id: 'any_breed',
            type_id: 'any_type',
            sex: 'any_sex',
            isPuppy: false,
            isAdopt: false,
        };

        const newAnimal = await sut.execute(animal);

        expect(newAnimal).toHaveProperty('id');
    });
});
