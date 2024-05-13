import { z } from "zod";
import { login } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "@/lib/schemas";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof LoginFormSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(data).then((res) => {
                if (res.error) {
                    setError(res.error);
                }

                if (res.success) {
                    setSuccess(res.success);
                }
            });
        });
    };

    return {
        form,
        error,
        success,
        isPending,
        onSubmit,
    };
};
