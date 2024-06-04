import { IDeleteUserUseCase } from '../port/input/user/IDeleteUserUseCase';
import { IUserRepository } from '../port/output/IUserRepository';

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
