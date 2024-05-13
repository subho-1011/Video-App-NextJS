import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterFormShema } from "@/lib/schemas";
import { register } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";

export const useUserRegisterForm = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof RegisterFormShema>>({
        resolver: zodResolver(RegisterFormShema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof RegisterFormShema>) => {
        setError("");
        setSuccess("");

        setIsLoading(true);
        register(data).then((res) => {
            if (res.error) {
                setError(res.error);
            }

            if (res.success) {
                setSuccess(res.success);
            }
        });
        setIsLoading(false);
    };

    return { form, error, success, isLoading, onSubmit };
};
