import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../domain/services/service/CreateService';
import { GetAllUsersUseCase } from '../../domain/services/service/GetAllService';
import { GetUserByIdUseCase } from '../../domain/services/service/GetUserByIdService';
import { UpdateUserUseCase } from '../../domain/services/service/UpdateService';
import { DeleteUserUseCase } from '../../domain/services/service/DeleteUserService';
import { LoginService } from '../../domain/services/service/LoginService';
import { CreateUserDTO } from '../DTO/user/CreateUserDTO';
import { LoginUserDTO } from '../DTO/user/LoginUserDTO';
import { AuthorizeRolesUseCase } from '../../domain/services/service/AuthorizeRolesService';
import { ForgotPasswordUseCase } from '../../domain/services/service/ForgotPasswordService';
import { ResetPasswordUseCase } from '../../domain/services/service/ResetPasswordService';
import { UploadImageUseCase } from '../../domain/services/service/UploadImageService';
import { GetImageUseCase } from '../../domain/services/service/GetImageService';
import { RemoveImageUseCase } from '../../domain/services/service/RemoveImageService';
import { ChangePasswordUseCase } from '../../domain/services/service/ChangePasswordService';
import { ForgotPasswordDTO } from '../DTO/user/ForgotPasswordDTO';
import { ResetPasswordDTO } from '../DTO/user/ResetPasswordDTO';


export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private loginUserUseCase: LoginService,
    private authorizeRolesUseCase: AuthorizeRolesUseCase,
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
    private uploadImageUseCase: UploadImageUseCase,
    private getImageUseCase: GetImageUseCase,
    private removeImageUseCase: RemoveImageUseCase,
    private changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  authorizeRoles(...roles: string[]) {
    return this.authorizeRolesUseCase.execute(...roles);
  }
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const forgotPasswordDTO: ForgotPasswordDTO = req.body;
      const response = await this.forgotPasswordUseCase.execute(forgotPasswordDTO.email);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
  
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const resetPasswordDTO: ResetPasswordDTO = req.body;
      const message = await this.resetPasswordUseCase.execute(resetPasswordDTO.resetLink, resetPasswordDTO.newPass);
      res.status(200).json({ message });
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }
  // async uploadImage(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { userId } = req.params;
  //     const response = await this.uploadImageUseCase.execute(userId, req.file);
  //     res.json(response);
  //   } catch (error) {
  //     res.status(500).json({ status: 'error', message: (error as Error).message });
  //   }
  // }
  async getImage(req: Request, res: Response): Promise<void> {
    try {
      const { userId, imageName } = req.params;
      const imageUrl = await this.getImageUseCase.execute(userId, imageName);
      res.json({ status: 'ok', success: true, url: imageUrl });
    } catch (error) {
      res.status(500).json({ status: 'error', message: (error as Error).message });
    }
  }
  async removeImage(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await this.removeImageUseCase.execute(userId);
      res.json({ status: 'ok', success: true, message: 'Image removed', user });
    } catch (error) {
      res.status(500).json({ status: 'error', message: (error as Error).message });
    }
  }
  // async changePassword(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { currentPassword, newPassword } = req.body;
  //     const userId = req.user.id;
  //     const user = await this.changePasswordUseCase.execute(userId, currentPassword, newPassword);
  //     res.status(200).json({ msg: 'Password successfully changed', user });
  //   } catch (error) {
  //     res.status(500).json({ msg: 'Internal server error', error: (error as Error).message });
  //   }
  // }
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
