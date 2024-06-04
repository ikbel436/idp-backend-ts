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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseUserRepository = void 0;
const UserEntity_1 = __importDefault(require("../entity/UserEntity"));
class MongooseUserRepository {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = new UserEntity_1.default(user);
            yield createdUser.save();
            return createdUser.toObject();
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return UserEntity_1.default.find().exec();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserEntity_1.default.findById(id).exec();
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield UserEntity_1.default.findByIdAndUpdate(id, user, { new: true }).exec();
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser.toObject();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserEntity_1.default.findByIdAndDelete(id).exec();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Searching for user with email: ${email}`);
            const userEntity = yield UserEntity_1.default.findOne({ email: email.toLowerCase() }).exec();
            console.log(`Query result: ${JSON.stringify(userEntity)}`);
            return userEntity ? userEntity.toObject() : null;
        });
    }
}
exports.MongooseUserRepository = MongooseUserRepository;
