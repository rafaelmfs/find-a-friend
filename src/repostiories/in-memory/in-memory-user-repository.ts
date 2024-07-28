import { User } from "@/interfaces/User";
import { RegisterUserParams, UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {
  private items: User[] = [];
  async register(data: RegisterUserParams) {
    const newUser = {
      ...data,
      id: data.id ?? Math.floor(Math.random()),
    };
    this.items.push(newUser);

    return newUser;
  }
  async findById(id: number) {
    const user = this.items.find((user) => user.id === id);
    return user ?? null;
  }
  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);
    return user ?? null;
  }
}
