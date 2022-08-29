import { ITypesRepository } from '@application/modules/animals/repositories/types-repository';
import { CreateTypeUseCase } from '@application/modules/animals/usecases/create-type/create-type-usecase';
import { IType } from '@domain/entities/type';
import { AppError } from '@infra/shared/utils/app-error';

const makeTypesRepositoryStub = (): ITypesRepository => {
    class TypesRepositoryStub implements ITypesRepository {
        findByName(name: string): Promise<IType> {
            const type = {
                id: 'any_id',
                name: 'any_name',
                created_at: new Date(),
            };

            return new Promise(resolve => resolve(type));
        }
    }

    return new TypesRepositoryStub();
};

interface ISutTypes {
    typesReposityStub: ITypesRepository;
    sut: CreateTypeUseCase;
}

const makeSut = (): ISutTypes => {
    const typesReposityStub = makeTypesRepositoryStub();
    const sut = new CreateTypeUseCase(typesReposityStub);

    return {
        typesReposityStub,
        sut,
    };
};

describe('Create Type UseCase', () => {
    it('should not be able to create a type, if the name field is not provided', async () => {
        const { sut } = makeSut();
        const type = {
            name: '',
        };

        await expect(sut.execute(type)).rejects.toEqual(
            new AppError('This field is required!'),
        );
    });

    it('should not be able to create a type, if a type with same name already was register', async () => {
        const { sut } = makeSut();
        const type = {
            name: 'any_name_already_register',
        };

        await expect(sut.execute(type)).rejects.toEqual(
            new AppError('This type already register'),
        );
    });
});
