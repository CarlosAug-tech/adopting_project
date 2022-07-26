interface ICreateAnimalRequestDTO {
    name: string;
    description: string;
    breed_id: string;
    type_id: string;
    sex: string;
    isPuppy: boolean;
    isAdopt: boolean;
}

export { ICreateAnimalRequestDTO };
