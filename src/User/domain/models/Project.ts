interface CreatedAt {
    type: Date;
    default: Date;
}

interface ProjectProps {
    id: string;
    name: string;
    reference: string;
    description: string;
    provider: string;
    lien: string;
    backendDockerImage: string;
    frontendDockerImage: string;
    databaseType: string;
    createdAt: CreatedAt;
 
}

export default class Project {
    id: string;
    name: string;
    reference: string;
    description: string;
    provider: string;
    lien: string;
    backendDockerImage: string;
    frontendDockerImage: string;
    databaseType: string;
    createdAt: CreatedAt;
    constructor({
        id,
        name,
        reference,
        description,
        provider,
        lien,
        backendDockerImage,
        frontendDockerImage,
        databaseType,
        createdAt,
      
    }: ProjectProps) {
        this.id = id;
        this.name = name;
        this.reference=reference;
        this.description = description;
        this.provider = provider;
        this.lien = lien;
        this.backendDockerImage = backendDockerImage;
        this.frontendDockerImage = frontendDockerImage;
        this.databaseType = databaseType;
        this.createdAt = createdAt || new Date();
    
    }
}

