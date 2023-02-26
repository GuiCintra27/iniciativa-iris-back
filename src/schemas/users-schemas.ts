import { CreateUserParams } from "@/services/users-service";
import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
  name: Joi.string().min(3).max(100).required(),
  birthDay: Joi.string().isoDate().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).required(),
});
