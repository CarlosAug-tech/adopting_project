interface ICreateUserRequestDTO {
    name: string;
    email: string;
    password: string;
}

interface ICreateUserResponseDTO {
    id: string;
    name: string;
    email: string;
    created_at: string;
}

export { ICreateUserRequestDTO, ICreateUserResponseDTO };
