import { IResetPasswordUseCase } from '../port/input/user/IResetPasswordUseCase';
import { IUserRepository } from '../port/output/IUserRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(resetLink: string, newPassword: string): Promise<string> {
    const decoded = jwt.verify(resetLink, process.env.RESET_PWD_KEY as string) as { _id: string };
    const user = await this.userRepository.findOne({ resetLink });

    if (!user) {
      throw new Error('User with this token does not exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    user.resetLink = '';

    await this.userRepository.save(user);

    return 'Your password has been changed';
  }
}
