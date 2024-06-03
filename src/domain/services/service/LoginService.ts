import { ILoginUserUseCase } from '../port/input/user/ILoginUserUseCase';
import { IUserRepository } from '../port/output/IUserRepository';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const config = require('config');
const secretOrkey = config.get('secretOrKey');

export class LoginService implements ILoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ token: string, user: User }> {
    console.log('Login attempt with email:', email);

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      console.error('User not found:', email);
      throw new Error('Email incorrect');
    }
    console.log('User found:', user);

    if (typeof password !== 'string' || typeof user.password !== 'string') {
      console.error('Password type mismatch');
      throw new Error('Password must be a string');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password mismatch');
      throw new Error('Email or password incorrect');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      address: user.address,
      birthDate: user.birthDate,
      codePostal: user.codePostal,
      country: user.country,
    };

    const token = jwt.sign(payload, secretOrkey);
    console.log('Token generated:', token);
    return { token, user };
  }
}