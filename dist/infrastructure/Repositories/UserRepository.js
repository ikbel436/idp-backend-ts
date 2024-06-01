"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.id = this.nextId.toString();
            this.nextId++;
            this.users.push(user);
            return user;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error('Invalid id');
            const user = this.users.find(user => user.id === id);
            if (!user)
                throw new Error('User not found');
            return user;
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.users.findIndex(user => user.id === id);
            if (index !== -1) {
                this.users[index] = Object.assign(Object.assign({}, this.users[index]), user);
                return this.users[index];
            }
            throw new Error('Entity not found');
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.users.findIndex(user => user.id === id);
            if (index !== -1) {
                this.users.splice(index, 1);
                return;
            }
            throw new Error('Entity not found');
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find(user => user.email === email) || null;
        });
    }
}
exports.UserRepository = UserRepository;
