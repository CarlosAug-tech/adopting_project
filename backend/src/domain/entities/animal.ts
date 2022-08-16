interface IAnimal {
    id: string;
    name: string;
    description: string;
    breed_id: string;
    type_id: string;
    sex: string;
    isPuppy: boolean;
    isAdopt: boolean;
    created_at: Date;
}

export { IAnimal };
