interface IEncryptProvider {
    hash(password: string, hashSalt: number): Promise<string>;
}

export { IEncryptProvider };
