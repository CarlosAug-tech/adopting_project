import { BcryptProvider } from '@infra/container/providers/EncryptProvider/bcrypt-provider';

jest.mock('bcrypt');
const bcrypt = require('bcrypt');

const hashSalt = 12;

bcrypt.compare.mockReturnValue(true);

describe('Bcrypt Provider', () => {
    it('shoudl be able to compare password with password_hash', async () => {
        const sut = new BcryptProvider();

        const hashPassword = await bcrypt.hash('any_password', hashSalt);
        const isPasswordMatch = await sut.compare('any_password', hashPassword);

        expect(isPasswordMatch).toBe(true);
    });

    it('should be able to hashed a password', async () => {
        const sut = new BcryptProvider();

        const hashPassword = await sut.hash('any_password', hashSalt);
        const isPasswordMatch = await bcrypt.compare(
            'any_password',
            hashPassword,
        );

        expect(isPasswordMatch).toBe(true);
    });
});
