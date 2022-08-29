import { CreateTypeUseCase } from '@application/modules/animals/usecases/create-type/create-type-usecase';
import { AppError } from '@infra/shared/utils/app-error';

interface ISutTypes {
    sut: CreateTypeUseCase;
}

const makeSut = (): ISutTypes => {
    const sut = new CreateTypeUseCase();

    return {
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
});
