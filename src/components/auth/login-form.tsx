"use client";

import { CardWrapper } from "./auth-card-wrapper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

import { useLoginForm } from "@/hooks/form/useLoginForm";
import { Suspense } from "react";

export const LoginForm = () => {
    const { form, error, success, isPending, onSubmit } = useLoginForm();

    return (
        <Suspense>
            <CardWrapper
                headerLabel="Welcome back"
                backButtonLabel="Don`t have an account"
                backButtonHref="/auth/register"
                showSocial
            >
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="mr.chandragupta@gmail.com"
                                                type="email"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="********"
                                                type="password"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormError message={error} />
                            <FormSuccess message={success} />
                        </div>
                        <Button
                            className="w-full"
                            size="lg"
                            type="submit"
                            disabled={isPending}
                        >
                            Sign In
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </Suspense>
    );
};
