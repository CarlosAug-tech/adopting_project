import { ICreateAnimalRequestDTO } from '@application/modules/animals/dtos/create-animal-dtos';
import { IAnimalsRepository } from '@application/modules/animals/repositories/animals-repository';
import { CreateAnimalUseCase } from '@application/modules/animals/usecases/create-animal/create-animal-usecase';
import { IAnimal } from '@domain/entities/animal';
import { AppError } from '@infra/shared/utils/app-error';

const makeAnimalsRepositoryStub = (): IAnimalsRepository => {
    class AnimalsRepositoryStub implements IAnimalsRepository {
        create(data: ICreateAnimalRequestDTO): Promise<IAnimal> {
            const animal = {
                id: 'any_id',
                name: 'any_name',
                description: 'any_descirption',
                breed_id: 'any_breed',
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

interface ISutTypes {
    animalsRepositoryStub: IAnimalsRepository;
    sut: CreateAnimalUseCase;
}

const makeSut = (): ISutTypes => {
    const animalsRepositoryStub = makeAnimalsRepositoryStub();
    const sut = new CreateAnimalUseCase(animalsRepositoryStub);

    return { sut, animalsRepositoryStub };
};

describe('Create Animal UseCase', () => {
    it('should not be able to create a animal, if name is not provided', async () => {
        const { sut } = makeSut();
        const animal = {
            name: '',
            description: 'any_descrption',
            breed_id: 'any_id',
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
            sex: '',
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
            sex: 'any_sex',
            isPuppy: false,
            isAdopt: false,
        };

        await expect(sut.execute(animal)).rejects.toEqual(
            new AppError('This animal already register, change name please!'),
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
            sex: 'any_sex',
            isPuppy: false,
            isAdopt: false,
        };

        const newAnimal = await sut.execute(animal);

        expect(newAnimal).toHaveProperty('id');
    });
});
