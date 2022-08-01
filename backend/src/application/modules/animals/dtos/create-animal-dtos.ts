interface ICreateAnimalRequestDTO {
    name: string;
    description: string;
    breed_id: string;
    isPuppy: boolean;
    isAdopt: boolean;
}

export { ICreateAnimalRequestDTO };
