import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticationUserUseCase } from './authentication-user-usecase';

class AuthenticationUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticationUserUseCase = container.resolve(
            AuthenticationUserUseCase,
        );

        const authResponse = await authenticationUserUseCase.execute({
            email,
            password,
        });

        return response.status(200).json(authResponse);
    }
}

export { AuthenticationUserController };
