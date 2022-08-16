import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateBreedUseCase } from './create-breed-usecase';

class CreateBreedController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const createBreedUseCase = container.resolve(CreateBreedUseCase);

        const breed = await createBreedUseCase.execute({
            name,
            description,
        });

        return response.status(201).json(breed);
    }
}

export { CreateBreedController };
