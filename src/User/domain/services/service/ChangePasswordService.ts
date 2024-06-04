import { IChangePasswordUseCase } from '../port/input/user/IChangePasswordUseCase';
import { IUserRepository } from '../port/output/IUserRepository';
import { User } from '../../../domain/models/User';
import bcrypt from 'bcryptjs';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, currentPassword: string, newPassword: string): Promise<User | null> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password!);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await this.userRepository.update(
      userId,
      { password: hashedNewPassword }
    );

    return updatedUser;
  }
}
