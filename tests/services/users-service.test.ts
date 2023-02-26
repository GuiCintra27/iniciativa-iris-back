import { init } from "@/app";
import { prisma } from "@/config";
import userService, { duplicatedEmailError } from "@/services/users-service";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { createUser as createUserSeed } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("createUser", () => {
  const validBody = {
    email: faker.internet.email(),
    password: faker.internet.password(6),
    birthDay: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
    name: faker.name.fullName()
  };

  it("should throw duplicatedUserError if there is a user with given email", async () => {
    const existingUser = await createUserSeed();

    try {
      await userService.createUser({
        email: existingUser.email,
        password: faker.internet.password(6),
        birthDay: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
        name: faker.name.fullName()
      });
      fail("should throw duplicatedUserError");
    } catch (error) {
      expect(error).toEqual(duplicatedEmailError());
    }
  });

  it("should create user when given email is unique", async () => {
    const user = await userService.createUser(validBody);

    const dbUser = await prisma.users.findUnique({
      where: {
        email: validBody.email
      },
    });
    
    expect(user).toEqual(
      expect.objectContaining({
        id: dbUser.id,
        email: dbUser.email,
      }),
    );
  });

  it("should hash user password", async () => {
    const dbUser = await prisma.users.findUnique({
      where: {
        email: validBody.email,
      },
    });
    
    expect(dbUser.password).not.toBe(validBody.password);
    expect(await bcrypt.compare(validBody.password, dbUser.password)).toBe(true);
  });
});
