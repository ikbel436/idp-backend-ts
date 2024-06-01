import Project from "./Project";

interface Image {
    public_id: string;
    url: string;
}


export class User {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    address?: string;
    birthDate?: Date;
    codePostal?: string;
    country?: string;
    city?: string;
    role?: string;
    createdAt?: Date;
    image?: string;
    fonction?: string;
    myProject?: string[];
    resetLink?: string;
    status?: string;
    description?: string;
  
    constructor(props: UserProps) {
      Object.assign(this, props);
    }
  }
  
  export interface UserProps {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    address: string;
    birthDate: Date;
    codePostal: string;
    country: string;
    city: string;
    role: string;
    createdAt?: Date;
    image?: string;
    fonction?: string;
    myProject?: string[];
    resetLink?: string;
    status?: string;
    description?: string;
  }
