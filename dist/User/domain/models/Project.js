"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Project {
    constructor({ id, name, reference, description, provider, lien, backendDockerImage, frontendDockerImage, databaseType, createdAt, }) {
        this.id = id;
        this.name = name;
        this.reference = reference;
        this.description = description;
        this.provider = provider;
        this.lien = lien;
        this.backendDockerImage = backendDockerImage;
        this.frontendDockerImage = frontendDockerImage;
        this.databaseType = databaseType;
        this.createdAt = createdAt || new Date();
    }
}
exports.default = Project;
