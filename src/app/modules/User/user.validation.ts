import { z } from "zod";

const UserValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be String" })
    .max(20, { message: "password can not not be more than 20 characters" })
    .optional(),

 
});
export const UserValidation = {
  UserValidationSchema,
};
