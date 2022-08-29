import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTypeUseCase } from './create-type-usecase';

class CreateTypeController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;

        const createTypeUseCase = container.resolve(CreateTypeUseCase);

        const type = await createTypeUseCase.execute({
            name,
        });

        return response.status(200).json(type);
    }
}

export { CreateTypeController };
