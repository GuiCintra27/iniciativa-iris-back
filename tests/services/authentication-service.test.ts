import { init } from "@/app";
import authenticationService, { invalidCredentialsError } from "@/services/authentication-service";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("signIn", () => {
  const generateParams = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(6),
  });

  it("should throw InvalidCredentialError if there is no user for given email", async () => {
    const params = generateParams();

    try {
      await authenticationService.signIn(params);
      fail("should throw InvalidCredentialError");
    } catch (error) {
      expect(error).toEqual(invalidCredentialsError());
    }
  });

  it("should throw InvalidCredentialError if given password is invalid", async () => {
    const params = generateParams();
    await createUser({
      email: params.email,
      password: "invalid-password",
    });

    try {
      await authenticationService.signIn(params);
      fail("should throw InvalidCredentialError");
    } catch (error) {
      expect(error).toEqual(invalidCredentialsError());
    }
  });

  describe("when email and password are valid", () => {
    it("should return user data if given email and password are valid", async () => {
      const params = generateParams();
      const user = await createUser(params);

      const { user: signInUser } = await authenticationService.signIn(params);
      expect(user).toEqual(
        expect.objectContaining({
          id: signInUser.id,
          email: signInUser.email,
        }),
      );
    });
  });
});
