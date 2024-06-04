import { IUserUseCase } from './IUserUseCase';

export interface IGetImageUseCase extends IUserUseCase {
  execute(userId: string, imageName: string): Promise<string>;
}
