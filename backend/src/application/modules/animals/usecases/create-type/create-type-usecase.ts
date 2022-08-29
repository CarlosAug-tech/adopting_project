import { UseCase } from '@application/contracts/usecase';
import { ICreateTypeRequestDTO } from '../../dtos/create-type-dtos';

class CreateTypeUseCase extends UseCase<ICreateTypeRequestDTO> {
    async perform(data: ICreateTypeRequestDTO): Promise<any> {
        const { name } = data;
    }
}

export { CreateTypeUseCase };
