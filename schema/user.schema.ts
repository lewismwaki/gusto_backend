import { object, string, z, number } from "zod";

export const CreateUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),

    username: string({
      required_error: "Username is required",
    }),

    phoneNumber: number({
      required_error: "Phone Number is required",
    }),

    password: string({
      required_error: "Password is required",
    }).min(6),
  }),
});

export const LoginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),

    password: string({
      required_error: "Password is required",
    }).min(6),
  }),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>["body"];
export type LoginUserType = z.infer<typeof LoginUserSchema>["body"];
