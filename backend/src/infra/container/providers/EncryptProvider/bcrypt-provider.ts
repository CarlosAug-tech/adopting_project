import { IEncryptProvider } from '@application/providers/contracts/encrypt-provider';
import { compare, hash } from 'bcrypt';

class BcryptProvider implements IEncryptProvider {
    async hash(password: string, hashSalt: number): Promise<string> {
        const passwordHash = await hash(password, hashSalt);

        return passwordHash;
    }

    async compare(password: string, password_hash: string): Promise<boolean> {
        const passwordIsMatch = await compare(password, password_hash);

        return passwordIsMatch;
    }
}

export { BcryptProvider };
