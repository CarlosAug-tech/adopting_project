import { UsersRepository } from '@infra/database/typeorm/repositories/users-repository';
import { AppError } from '@infra/shared/utils/app-error';
import { NextFunction, Request, Response } from 'express';

async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const usersRepository = new UsersRepository();
    const { id } = request.user;

    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppError("User isn't admin", 401);
    }

    return next();
}

export default ensureAdmin;
