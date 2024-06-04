export interface IUserUseCase {
  execute(...args: any[]): Promise<any>;
}