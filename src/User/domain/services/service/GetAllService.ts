import { IGetAllUsersUseCase } from '../port/input/user/IGetAllUsersUseCase';
import { IUserRepository } from '../port/output/IUserRepository';
import { User } from '../../models/User';

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
