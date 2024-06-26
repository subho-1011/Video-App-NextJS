import { z } from "zod";
import axios from "axios";

import { RegisterFormShema } from "@/lib/schemas";

export const register = async (data: z.infer<typeof RegisterFormShema>) => {
    const validateData = RegisterFormShema.safeParse(data);
    if (!validateData.success) {
        return {
            error: validateData.error.message,
        };
    }

    try {
        const response = await axios.post(
            "/api/auth/register",
            validateData.data
        );

        if (response.status === 200) {
            return response.data;
        }
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        } else {
            return error.message;
        }
    }

    return {
        success: "Registered successfully",
    };
};
