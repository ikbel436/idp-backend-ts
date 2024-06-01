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
exports.UserController = void 0;
class UserController {
    constructor(createUserUseCase, getAllUsersUseCase, getUserByIdUseCase, updateUserUseCase, deleteUserUseCase, loginUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserDTO = req.body;
                const user = yield this.createUserUseCase.execute(createUserDTO);
                res.status(201).json(user);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getAllUsersUseCase.execute();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getUserByIdUseCase.execute(req.params.id);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.updateUserUseCase.execute(req.params.id, req.body);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.deleteUserUseCase.execute(req.params.id);
                res.status(204).json();
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginUserDTO = req.body;
                const result = yield this.loginUserUseCase.execute(loginUserDTO.email, loginUserDTO.password);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
