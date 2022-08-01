import { UseCase } from '@application/contracts/usecase';
import { AppError } from '@infra/shared/utils/app-error';
import { ICreateAnimalRequestDTO } from '../../dtos/create-animal-dtos';

class CreateAnimalUseCase extends UseCase<ICreateAnimalRequestDTO> {
    constructor() {
        super();
    }

    async perform(data: ICreateAnimalRequestDTO): Promise<any> {
        const { isAdopt } = data;

        if (isAdopt) {
            throw new AppError('Does not register a animal already adopting');
        }
    }

    async execute(data: ICreateAnimalRequestDTO): Promise<any> {
        const requiredFields = ['name', 'description', 'breed_id', 'sex'];

        this.validateRequiredFields(data, requiredFields);

        await this.perform(data);
    }
}

export { CreateAnimalUseCase };
