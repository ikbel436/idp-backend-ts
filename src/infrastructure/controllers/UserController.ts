import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../domain/services/service/CreateService';
import { GetAllUsersUseCase } from '../../domain/services/service/GetAllService';
import { GetUserByIdUseCase } from '../../domain/services/service/GetUserByIdService';
import { UpdateUserUseCase } from '../../domain/services/service/UpdateService';
import { DeleteUserUseCase } from '../../domain/services/service/DeleteUserService';
import { LoginService } from '../../domain/services/service/LoginService';
import { CreateUserDTO } from '../DTO/user/CreateUserDTO';
import { LoginUserDTO } from '../DTO/user/LoginUserDTO';


export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private loginUserUseCase: LoginService
  ) {}


  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const createUserDTO: CreateUserDTO = req.body;
      const user = await this.createUserUseCase.execute(createUserDTO);
      res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getAllUsersUseCase.execute();
      res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.getUserByIdUseCase.execute(req.params.id);
      res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.updateUserUseCase.execute(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await this.deleteUserUseCase.execute(req.params.id);
      res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      console.log('Login request received:', req.body);
      const loginUserDTO: LoginUserDTO = req.body;
      const result = await this.loginUserUseCase.execute(loginUserDTO.email, loginUserDTO.password);
      res.status(200).json(result);
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
