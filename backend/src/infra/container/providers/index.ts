import { container } from 'tsyringe';

import { IEncryptProvider } from '@application/providers/contracts/encrypt-provider';
import { BcryptProvider } from './EncryptProvider/bcrypt-provider';

container.registerSingleton<IEncryptProvider>('BcryptProvider', BcryptProvider);
