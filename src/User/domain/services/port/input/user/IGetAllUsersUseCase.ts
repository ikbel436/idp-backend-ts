import { User } from '../../../../models/User';
import { IUserUseCase } from './IUserUseCase';

export interface IGetAllUsersUseCase extends IUserUseCase {
  execute(): Promise<User[]>;
}