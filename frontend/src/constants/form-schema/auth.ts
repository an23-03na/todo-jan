import z from "zod";

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
  );

export const registerFormSchema = z
  .object({
    name: z.string().min(2, "Minimum 2 symbol"),
    email: z.email("Enter valid email"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ["confirmPassword"],
    message: "Enter correct password",
  });

export const loginFormSchema = z.object({
  email: z.email("Enter valid email"),
  password: passwordSchema,
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
