import { User } from '../../../../models/User'
import { IUserUseCase } from './IUserUseCase';

export interface ILoginUserUseCase  {
  execute(email: string, password: string): Promise<{ token: string, user: User }>;
}
