interface IEncryptProvider {
    hash(password: string, hashSalt: number): Promise<string>;
    compare(password: string, password_hash: string): Promise<boolean>;
}

export { IEncryptProvider };
