import { IUserRepository } from '../../domain/services/port/output/IUserRepository';
import { User } from '../../domain/models/User';
import UserEntity from '../entity/UserEntity';

export class MongooseUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const createdUser = new UserEntity(user);
    await createdUser.save();
    return createdUser.toObject() as User;
  }

  async getAll(): Promise<User[]> {
    return UserEntity.find().exec() as unknown as User[];
  }

  async getById(id: string): Promise<User> {
    return UserEntity.findById(id).exec() as unknown as User;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await UserEntity.findByIdAndUpdate(id, user, { new: true }).exec();
    if (!updatedUser) {
        throw new Error('User not found');
      }
    return updatedUser.toObject() as User ;
  }

  async delete(id: string): Promise<void> {
    await UserEntity.findByIdAndDelete(id).exec();
  }
  async findByEmail(email: string): Promise<User | null> {
    console.log(`Searching for user with email: ${email}`);
    const userEntity = await UserEntity.findOne({ email: email.toLowerCase() }).exec();
    console.log(`Query result: ${JSON.stringify(userEntity)}`);
    return userEntity? (userEntity.toObject() as User) : null;
  }
  
  
}
