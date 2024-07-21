import { User } from "@/interfaces/User";

export interface RegisterUserParams {
  email: string;
  password_hash: string;
  id?: string;
}

export interface UserRepository {
  register: (data: RegisterUserParams) => Promise<User>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
}
