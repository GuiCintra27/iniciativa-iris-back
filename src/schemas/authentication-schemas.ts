import { SignInParams } from "@/services";
import Joi from "joi";

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).required(),
});
