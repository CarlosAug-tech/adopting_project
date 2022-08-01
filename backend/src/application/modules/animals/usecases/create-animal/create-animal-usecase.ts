import { UseCase } from '@application/contracts/usecase';
import { ICreateAnimalRequestDTO } from '../../dtos/create-animal-dtos';

class CreateAnimalUseCase extends UseCase<ICreateAnimalRequestDTO> {
    constructor() {
        super();
    }

    async perform(data: ICreateAnimalRequestDTO): Promise<any> {}

    async execute(data: ICreateAnimalRequestDTO): Promise<any> {
        const requiredFields = ['name', 'description', 'breed_id'];

        this.validateRequiredFields(data, requiredFields);
    }
}

export { CreateAnimalUseCase };
