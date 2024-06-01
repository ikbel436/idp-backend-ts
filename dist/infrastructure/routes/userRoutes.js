"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRepository_1 = require("../Repositories/UserRepository");
const CreateService_1 = require("../../domain/services/service/CreateService");
const GetAllService_1 = require("../../domain/services/service/GetAllService");
const GetUserByIdService_1 = require("../../domain/services/service/GetUserByIdService");
const UpdateService_1 = require("../../domain/services/service/UpdateService");
const DeleteUserService_1 = require("../../domain/services/service/DeleteUserService");
const LoginService_1 = require("../../domain/services/service/LoginService");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
const userRepository = new UserRepository_1.UserRepository();
const createUserUseCase = new CreateService_1.CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllService_1.GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdService_1.GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateService_1.UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserService_1.DeleteUserUseCase(userRepository);
const loginUserUseCase = new LoginService_1.LoginService(userRepository);
const userController = new UserController_1.UserController(createUserUseCase, getAllUsersUseCase, getUserByIdUseCase, updateUserUseCase, deleteUserUseCase, loginUserUseCase);
router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users', (req, res) => userController.getAllUsers(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));
router.post('/users/login', (req, res) => userController.loginUser(req, res));
exports.default = router;
