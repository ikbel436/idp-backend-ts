import { IRemoveImageUseCase } from '../port/input/user/IRemoveImageUseCase';
import { IUserRepository } from '../port/output/IUserRepository';
import { User } from '../../../domain/models/User';
import cloudinary from 'cloudinary';

export class RemoveImageUseCase implements IRemoveImageUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User | null> {
    const user = await this.userRepository.getById(userId);

    if (!user || !user.image) {
      throw new Error('User or image not found');
    }

    await cloudinary.v2.uploader.destroy(user.image);

    user.image = '';
    await this.userRepository.save(user);

    return user;
  }
}
