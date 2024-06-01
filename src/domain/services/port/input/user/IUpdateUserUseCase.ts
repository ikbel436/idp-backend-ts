import { User } from '../../../../models/User';
import { IUserUseCase } from './IUserUseCase';

export interface IUpdateUserUseCase  {
  execute(id: string, user: Partial<User>): Promise<User>;
}
