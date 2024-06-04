import { IGetImageUseCase } from '../port/input/user/IGetImageUseCase';
import { IUserRepository } from '../port/output/IUserRepository';

export class GetImageUseCase implements IGetImageUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, imageName: string): Promise<string> {
    const user = await this.userRepository.getById(userId);

    if (!user || !user.image) {
      throw new Error('Image not found');
    }

    return user.image;
  }
}
