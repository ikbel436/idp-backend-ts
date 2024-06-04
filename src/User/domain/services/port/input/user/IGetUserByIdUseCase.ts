import { User } from '../../../../models/User';
import { IUserUseCase } from './IUserUseCase';

export interface IGetUserByIdUseCase extends IUserUseCase {
  execute(id: string): Promise<User>;
}
