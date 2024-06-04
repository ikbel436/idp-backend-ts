import { IUpdateUserUseCase } from '../port/input/user/IUpdateUserUseCase';
import { IUserRepository } from '../port/output/IUserRepository';
import { User } from '../../models/User';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, user: Partial<User>): Promise<User> {
    return this.userRepository.update(id, user);
  }
}