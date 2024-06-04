import { IUserUseCase } from './IUserUseCase';

export interface IDeleteUserUseCase extends IUserUseCase {
  execute(id: string): Promise<void>;
}
