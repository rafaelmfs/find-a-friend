import { User } from "@/interfaces/User";
import { prisma } from "@/lib/prisma";
import { RegisterUserParams, UserRepository } from "../user-repository";

export class PrismaUsersRepository implements UserRepository {
  async register(data: RegisterUserParams): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password_hash: data.password_hash,
      },
    });

    return newUser;
  }
  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
