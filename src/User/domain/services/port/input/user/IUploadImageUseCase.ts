import { IUserUseCase } from './IUserUseCase';
import {User} from '../../../../models/User';

export interface IUploadImageUseCase extends IUserUseCase {
  execute(userId: string, file: any): Promise<{ url: string; user: User | null }>;
}
