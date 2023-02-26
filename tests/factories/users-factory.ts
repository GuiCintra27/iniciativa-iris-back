import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { users as User } from "@prisma/client";
import { prisma } from "@/config";

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.users.create({
    data: {
      email: params.email || faker.internet.email(),
      name: faker.name.fullName(),
      birthDay: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
      password: hashedPassword,
    },
  });
}
