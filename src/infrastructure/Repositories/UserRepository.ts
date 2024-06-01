import { IUserRepository } from '../../domain/services/port/output/IUserRepository';
import { User } from '../../domain/models/User';

export class UserRepository implements IUserRepository {
  private users: User[] = [];
  private nextId = 1;

  async create(user: User): Promise<User> {
    user.id = this.nextId.toString();
    this.nextId++;
    this.users.push(user);
    return user;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: string): Promise<User> {
    if (!id) throw new Error('Invalid id');
    const user = this.users.find(user => user.id === id);
    if (!user) throw new Error('User not found');
    return user;
}

  async update(id: string, user: Partial<User>): Promise<User> {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user };
      return this.users[index];
    }
    throw new Error('Entity not found');
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return;
    }
    throw new Error('Entity not found');
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }
}
