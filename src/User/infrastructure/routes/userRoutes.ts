import { Router } from 'express';
import { MongooseUserRepository  } from '../adapter/MongooseUserRepository';
import { CreateUserUseCase } from '../../domain/services/service/CreateService';
import { GetAllUsersUseCase } from '../../domain/services/service/GetAllService';
import { GetUserByIdUseCase } from '../../domain/services/service/GetUserByIdService';
import { UpdateUserUseCase } from '../../domain/services/service/UpdateService';
import { DeleteUserUseCase } from '../../domain/services/service/DeleteUserService';
import { LoginService } from '../../domain/services/service/LoginService';
import { UserController } from '../controllers/UserController';

const router = Router();
const userRepository = new MongooseUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const loginUserUseCase = new LoginService(userRepository);
const userController = new UserController(
  createUserUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  loginUserUseCase
);

router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users', (req, res) => userController.getAllUsers(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));
router.post('/users/login', (req, res) => userController.loginUser(req, res));

export default router;
