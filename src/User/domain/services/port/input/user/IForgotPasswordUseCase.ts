import { IUserUseCase } from './IUserUseCase';

export interface IForgotPasswordUseCase extends IUserUseCase {
  execute(email: string): Promise<{ message: string; accessToken: string }>;
}
