import { IEncryptProvider } from '@application/providers/contracts/encrypt-provider';
import { hash } from 'bcrypt';

class BcryptProvider implements IEncryptProvider {
    async hash(password: string, hashSalt: number): Promise<string> {
        const passwordHash = await hash(password, hashSalt);

        return passwordHash;
    }
}

export { BcryptProvider };
