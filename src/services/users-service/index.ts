import userRepository from "@/repositories/user-repository";
import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "./errors";

export async function createUser({ email, name, birthDay, password }: CreateUserParams): Promise<users> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  
  const user = await userRepository.create({
    email,
    name,
    birthDay,
    password: hashedPassword,
  });

  return user;
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<users, "email" | "name" | "birthDay" | "password">;

const userService = {
  createUser,
};

export * from "./errors";
export default userService;
