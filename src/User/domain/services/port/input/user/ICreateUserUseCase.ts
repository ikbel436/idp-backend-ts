import {User} from '../../../../models/User';
import { IUserUseCase } from './IUserUseCase';

export interface ICreateUserUseCase extends IUserUseCase {
  execute(user: User): Promise<User>;
}
