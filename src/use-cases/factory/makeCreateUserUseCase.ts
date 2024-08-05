import { PrismaUsersRepository } from "@/repostiories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../create-user/create-user-use-case";

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  return createUserUseCase;
}
