import { AppDataSource } from "../dataSource";
import { User } from "../models/User";

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(name: string, email: string, password: string, phone: string, address: string) {
    const user = new User(name, email, password, phone, address);
    return await this.userRepository.save(user);
  }

  async findAllUsers() {
    return await this.userRepository.find({});
  }

  async findUserById(id: number) {
    return await this.userRepository.findOne({ where: { id }});
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateUser(id: number, fieldsToUpdate: Partial<User>) {
    const user = await this.findUserById(id);
    if (!user) return null;

    Object.assign(user, fieldsToUpdate);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) return null;
    return await this.userRepository.remove(user);
  }
}
