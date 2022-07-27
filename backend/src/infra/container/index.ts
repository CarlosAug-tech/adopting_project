import { container } from 'tsyringe';

import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { UsersRepository } from '@infra/database/typeorm/repositories/users-repository';

import './providers';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
