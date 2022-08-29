import { UseCase } from '@application/contracts/usecase';
import { AppError } from '@infra/shared/utils/app-error';
import { ICreateTypeRequestDTO } from '../../dtos/create-type-dtos';
import { ITypesRepository } from '../../repositories/types-repository';

class CreateTypeUseCase extends UseCase<ICreateTypeRequestDTO> {
    constructor(private typesRepository: ITypesRepository) {
        super();
    }

    async perform(data: ICreateTypeRequestDTO): Promise<any> {
        const { name } = data;

        const typeExists = await this.typesRepository.findByName(name);

        if (typeExists) {
            throw new AppError('This type already register');
        }

        const type = await this.typesRepository.create({ name });

        return type;
    }
}

export { CreateTypeUseCase };
