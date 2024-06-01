export interface CreateUserDTO {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    address?: string;
    birthDate?: Date;
    codePostal?: string;
    country?: string;
    city?: string;
    role?: string;
  }