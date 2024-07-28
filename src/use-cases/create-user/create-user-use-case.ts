import { User } from "@/interfaces/User";
import { UserRepository } from "@/repostiories/user-repository";
import { hash } from "bcryptjs";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";

interface CreateUserUseCaseRequest {
  email: string;
  password: string;
  id?: number;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  private async checkIfEmailAlreadyExists(email: string): Promise<void> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }
  }

  async execute(
    data: CreateUserUseCaseRequest
  ): Promise<CreateUserUseCaseResponse> {
    await this.checkIfEmailAlreadyExists(data.email);

    const hashedPassword = await hash(data.password, 6);
    const user = await this.userRepository.register({
      email: data.email,
      password_hash: hashedPassword,
      id: data.id,
    });

    return {
      user,
    };
  }
}
