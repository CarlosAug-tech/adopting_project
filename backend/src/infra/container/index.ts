import { container } from 'tsyringe';

import { IUsersRepository } from '@application/modules/accounts/repositories/users-repository';
import { UsersRepository } from '@infra/database/typeorm/repositories/users-repository';

import './providers';
import { IAnimalsRepository } from '@application/modules/animals/repositories/animals-repository';
import { AnimalsRepository } from '@infra/database/typeorm/repositories/animals-repository';
import { IBreedsRepository } from '@application/modules/animals/repositories/breeds-repository';
import { BreedsRepository } from '@infra/database/typeorm/repositories/breeds-repository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IAnimalsRepository>(
    'AnimalsRepository',
    AnimalsRepository,
);

container.registerSingleton<IBreedsRepository>(
    'BreedsRepository',
    BreedsRepository,
);
