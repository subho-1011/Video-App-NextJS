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
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Atleast one character Upper Case, Lower Case, Number and Spcial",
    }),
});

export const fileSchema = {
    image: z
        .custom<FileList>()
        .transform((file) => file.length > 0 && file.item(0))
        .refine((file) => !file || (!!file && file.size <= 3 * 1024 * 1024), {
            message: "File size must be less than 3MB",
        })
        .refine((file) => !file || (!!file && file.type.startsWith("image")), {
            message: "File type must be image",
        }),

    video: z
        .custom<FileList>()
        .transform((file) => file.length > 0 && file.item(0))
        .refine((file) => !file || (!!file && file.size <= 25 * 1024 * 1024), {
            message: "File size must be less than 25MB",
        })
        .refine((file) => !file || (!!file && file.type.startsWith("video")), {
            message: "File type must be video",
        }),
};

export const EditVideoSchema = z.object({
    title: z
        .string()
        .min(1, {
            message: "Title is required",
        })
        .trim(),
    description: z
        .string()
        .min(1, {
            message: "Description is required",
        })
        .trim(),
    tags: z.optional(z.array(z.string())),
    thumbnail: z.any(),
    video: z.any(),
    isPublished: z.boolean().default(true),
});

// TODO: Can add categories here
export const AddVideoSchema = z.object({
    title: z
        .string()
        .min(1, {
            message: "Title is required",
        })
        .trim(),
    description: z
        .string()
        .min(1, {
            message: "Description is required",
        })
        .trim(),
    tags: z.optional(z.array(z.string())),
    thumbnail: z.any().refine((files) => !!files && files.length > 0, {
        message: `Thumbnail is required`,
    }),
    video: z.any().refine((files) => !!files && files.length > 0, {
        message: `Video is required`,
    }),
    isPublished: z.boolean().default(true),
});
