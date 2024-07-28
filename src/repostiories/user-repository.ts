import { User } from "@/interfaces/User";

export interface RegisterUserParams {
  email: string;
  password_hash: string;
  id?: number;
}

export interface UserRepository {
  register: (data: RegisterUserParams) => Promise<User>;
  findById: (id: number) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
}
