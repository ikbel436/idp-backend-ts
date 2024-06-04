import { IForgotPasswordUseCase } from '../port/input/user/IForgotPasswordUseCase';
import { IUserRepository } from '../port/output/IUserRepository';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<{ message: string; accessToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User with this email does not exist');
    }

    const accessToken = jwt.sign({ _id: user.id }, process.env.RESET_PWD_KEY as string, {
      expiresIn: '20m',
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: 'noreply@yourapp.com',
      to: email,
      subject: 'Account Activation Link',
      text: 'Account Activation Link',
      html: `<h2>Please click on the given link to activate your account</h2>
             <p>${process.env.CLIENT_URL}/resetpassword/${accessToken}</p>`,
    });

    user.resetLink = accessToken;
    await this.userRepository.update(user.id!, user);

    return {
      message: 'Email has been sent, kindly activate your account',
      accessToken,
    };
  }
}