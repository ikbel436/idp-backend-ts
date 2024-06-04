import { Router } from 'express';
import { MongooseUserRepository  } from '../adapter/MongooseUserRepository';
import { CreateUserUseCase } from '../../domain/services/service/CreateService';
import { GetAllUsersUseCase } from '../../domain/services/service/GetAllService';
import { GetUserByIdUseCase } from '../../domain/services/service/GetUserByIdService';
import { UpdateUserUseCase } from '../../domain/services/service/UpdateService';
import { DeleteUserUseCase } from '../../domain/services/service/DeleteUserService';
import { LoginService } from '../../domain/services/service/LoginService';
import { UserController } from '../controllers/UserController';
import { AuthorizeRolesUseCase } from '../../domain/services/service/AuthorizeRolesService';
import { ForgotPasswordUseCase } from '../../domain/services/service/ForgotPasswordService';
import { ResetPasswordUseCase } from '../../domain/services/service/ResetPasswordService';
import { UploadImageUseCase } from '../../domain/services/service/UploadImageService';
import { GetImageUseCase } from '../../domain/services/service/GetImageService';
import { RemoveImageUseCase } from '../../domain/services/service/RemoveImageService';
import { ChangePasswordUseCase } from '../../domain/services/service/ChangePasswordService';

const router = Router();
const userRepository = new MongooseUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const loginUserUseCase = new LoginService(userRepository);
const authorizeRolesUseCase = new AuthorizeRolesUseCase(userRepository);
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository);
const resetPasswordUseCase = new ResetPasswordUseCase(userRepository);
const uploadImageUseCase = new UploadImageUseCase(userRepository);
const getImageUseCase = new GetImageUseCase(userRepository);
const removeImageUseCase = new RemoveImageUseCase(userRepository);
const changePasswordUseCase = new ChangePasswordUseCase(userRepository);


const userController = new UserController(
  createUserUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  loginUserUseCase,
  authorizeRolesUseCase,
  forgotPasswordUseCase,
  resetPasswordUseCase,
  uploadImageUseCase,
  getImageUseCase,
  removeImageUseCase,
  changePasswordUseCase

);

router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users', (req, res) => userController.getAllUsers(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));
router.post('/users/login', (req, res) => userController.loginUser(req, res));
router.post("/forgot", (req, res) =>userController.forgotPassword(req, res));
router.post("/reset", (req, res) =>userController.resetPassword(req, res));
router.get("/image/:userId/:imageName", (req, res) =>userController.getImage(req, res));

router.delete("/remove/:userId", (req, res) =>userController.removeImage(req, res));
export default router;
