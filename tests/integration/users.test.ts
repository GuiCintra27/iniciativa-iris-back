import app, { init } from "@/app";
import { prisma } from "@/config";
import { duplicatedEmailError } from "@/services/users-service";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /users", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/users");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/users").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(6),
      name: faker.name.fullName(),
      birthDay: new Date(faker.date.birthdate({ min: 18, max: 65, mode: "age" })),
    });

    it("should respond with status 409 when there is an user with given email", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post("/users").send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
      expect(response.body).toEqual(duplicatedEmailError());
    });

    it("should respond with status 201 when given email is unique", async () => {
      const body = generateValidBody();

      const response = await server.post("/users").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
    });

    it("should not return user password on body", async () => {
      const body = generateValidBody();

      const response = await server.post("/users").send(body);

      expect(response.body).not.toHaveProperty("password");
    });

    it("should save user on db", async () => {
      const body = generateValidBody();

      await server.post("/users").send(body);

      const user = await prisma.users.findUnique({
        where: { email: body.email },
      });
      
      expect(user).toEqual(
        expect.objectContaining({
          email: body.email,
          name: body.name
        }),
      );
    });
  });
});