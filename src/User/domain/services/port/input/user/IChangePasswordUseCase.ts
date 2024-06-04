import { IUserUseCase } from './IUserUseCase';
import { User } from '../../../../models/User';

export interface IChangePasswordUseCase extends IUserUseCase {
  execute(userId: string, currentPassword: string, newPassword: string): Promise<User | null>;
}
