import { IAuthorizeRolesUseCase } from '../port/input/user/IAuthorizeRolesUseCase';
import { IUserRepository } from '../port/output/IUserRepository';

export class AuthorizeRolesUseCase implements IAuthorizeRolesUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(...roles: string[]) {
    return async (req: any, res: any, next: any) => {
      try {
        const user = await this.userRepository.getById(req.params.id);
        if (user && !roles.includes(user.role!)) {
          return res.status(403).json({
            msg: `Role (${user.role}) is not allowed to access this resource`,
          });
        }
        next();
      } catch (error) {
        res.status(500).json({ msg: (error as Error).message });
      }
    };
  }
}
