"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ExitIcon } from "@radix-ui/react-icons";
import { FaSearch } from "react-icons/fa";

const SearchInputForm = z.object({
    search: z.string(),
});

export const SearchBar = () => {
    const form = useForm<z.infer<typeof SearchInputForm>>({
        resolver: zodResolver(SearchInputForm),
        defaultValues: {
            search: "",
        },
    });

    const onChange = (data: z.infer<typeof SearchInputForm>) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onChange)}>
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <span className="flex h-12 px-3 relative">
                                    <Input
                                        {...field}
                                        size={56}
                                        type="text"
                                        placeholder="Search..."
                                        className="rounded-2xl h-full hover:ring-0 px-3"
                                    />
                                    <Button
                                        variant="outline"
                                        className="h-full right-0 mr-2.5 absolute rounded-2xl rounded-l-none px-3"
                                        type="submit"
                                    >
                                        <FaSearch className="w-6 h-6" />
                                    </Button>
                                </span>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
