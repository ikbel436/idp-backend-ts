import { ICreateUserUseCase } from '../port/input/user/ICreateUserUseCase';
import { IUserRepository } from '../port/output/IUserRepository';
import { User } from '../../models/User';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
