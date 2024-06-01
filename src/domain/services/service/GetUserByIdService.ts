import { IGetUserByIdUseCase } from '../port/input/user/IGetUserByIdUseCase';
import { IUserRepository } from '../port/output/IUserRepository';
import { User } from '../../models/User';

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }
}
