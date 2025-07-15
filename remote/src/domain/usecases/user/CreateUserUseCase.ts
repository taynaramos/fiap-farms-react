import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

function generateTempPassword(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pass = '';
  for (let i = 0; i < length; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
  return pass;
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user: User): Promise<string> {
    const tempPassword = generateTempPassword();
    await this.userRepository.create(user, tempPassword);
    return tempPassword;
  }
} 