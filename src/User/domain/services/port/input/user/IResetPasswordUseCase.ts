import { IUserUseCase } from './IUserUseCase';

export interface IResetPasswordUseCase extends IUserUseCase {
  execute(resetLink: string, newPassword: string): Promise<string>;
}
