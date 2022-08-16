import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAnimalUseCase } from './create-animal-usecase';

class CreateAnimalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description, sex, breed_id, type_id, isPuppy, isAdopt } =
            request.body;

        const createAnimalUseCase = container.resolve(CreateAnimalUseCase);

        const animal = await createAnimalUseCase.execute({
            name,
            description,
            sex,
            breed_id,
            type_id,
            isPuppy,
            isAdopt,
        });

        return response.status(201).json(animal);
    }
}

export { CreateAnimalController };
