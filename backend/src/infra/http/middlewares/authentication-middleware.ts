import { AppError } from '@infra/shared/utils/app-error';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export default async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is not provided', 403);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(token, 'any_token_secret') as IPayload;

        request.user = {
            id: user_id,
        };

        next();
    } catch (err) {
        throw new AppError('Token is invalid!');
    }
};
