import * as z from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const RegisterFormShema = z.object({
    email: z.string().email().toLowerCase().trim(),
    name: z
        .string()
        .min(1, {
            message: "name is required",
        })
        .trim(),
    username: z
        .string()
        .toLowerCase()
        .trim()
        .min(4, {
            message: "Username is atlest 4 characters",
        })
        .max(8, {
            message: "Maximun 8 characters",
        })
        .trim(),
    password: z
        .string()
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            {
                message:
                    "Atleast one character Upper Case, Lower Case, Number and Spcial",
            }
        ),
});
