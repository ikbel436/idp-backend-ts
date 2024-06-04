import { IUserUseCase } from './IUserUseCase';

export interface IAuthorizeRolesUseCase  {
  execute(...roles: string[]): (req: any, res: any, next: any) => Promise<void>;
}
