import { IUploadImageUseCase } from '../port/input/user/IUploadImageUseCase';
import { IUserRepository } from '../port/output/IUserRepository';
import { User } from '../../../domain/models/User';
import cloudinary from 'cloudinary';

export class UploadImageUseCase implements IUploadImageUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, file: any): Promise<{ url: string; user: User | null }> {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: `uploads/${userId}` },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(file.buffer);
    });

    const fileUrl = (result as any).secure_url;

    const updatedUser = await this.userRepository.update(
      userId,
      { image: fileUrl }
    );

    return {
      url: fileUrl,
      user: updatedUser,
    };
  }
}
