import { z } from "zod";
import { UserStatus } from "./user.constant";

const UserValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be String" })
    .max(20, { message: "password can not not be more than 20 characters" })
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({ status: z.enum(UserStatus as [string, ...string[]]) }),
});

export const UserValidation = {
  UserValidationSchema,
  changeStatusValidationSchema,
};
