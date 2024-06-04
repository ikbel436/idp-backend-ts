import { IUserUseCase } from './IUserUseCase';
import { User } from '../../../../models/User';

export interface IRemoveImageUseCase extends IUserUseCase {
  execute(userId: string): Promise<User | null>;
}
