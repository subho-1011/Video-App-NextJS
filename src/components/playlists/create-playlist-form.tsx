"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { PlaylistForm } from "@/lib/schemas";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Plus } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { createPlaylist } from "@/services/playlists.services";
import { DialogClose } from "../ui/dialog";

import { useCurrentUser } from "@/hooks/user";
import { useRouter } from "next/navigation";

export const CreatePlaylistForm = () => {
    const user = useCurrentUser();
    const router = useRouter();

    const [urls, setUrls] = useState<string[]>([]);
    const [url, setUrl] = useState<string>("");

    const form = useForm<z.infer<typeof PlaylistForm>>({
        resolver: zodResolver(PlaylistForm),
        defaultValues: {
            title: "",
            description: "",
            videoUrls: undefined,
            privacy: "private",
        },
    });

    const onCreateNewPlaylist = async (data: z.infer<typeof PlaylistForm>) => {
        if (!user) {
            router.push("/auth/login");
            return;
        }

        data.videoUrls = urls;

        const res = await createPlaylist(data);
        if (res.error) {
            console.log(res.error);
            return;
        }

        setUrls([]);
        setUrl("");
        form.reset();
    };

    const onAddUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!url) return;

        setUrls([...urls, url]);
        setUrl("");
    };

    const onDeleteUrl = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();

        setUrls(urls.filter((_, i) => i !== index));
    };

    return (
        <Form {...form}>
            <form className="" onSubmit={form.handleSubmit(onCreateNewPlaylist)}>
                <div className="mb-4 space-y-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter title" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mb-4 space-y-2">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Enter description" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mb-4 space-y-2">
                    <FormField
                        control={form.control}
                        name={`videoUrls`}
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Video Url</FormLabel>
                                    <FormControl>
                                        <>
                                            {urls &&
                                                urls.map((text, index) => (
                                                    <span className="flex gap-3" key={index}>
                                                        <>
                                                            <Input placeholder="Enter url" value={text} readOnly />
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={(e) => onDeleteUrl(e, index)}
                                                            >
                                                                <MdDeleteForever className="h-5 w-5 fill-red-700" />
                                                            </Button>
                                                        </>
                                                    </span>
                                                ))}
                                            <span className="flex gap-3">
                                                <Input
                                                    placeholder="Enter url"
                                                    value={url}
                                                    type="url"
                                                    onChange={(e) => {
                                                        setUrl(e.target.value);
                                                    }}
                                                />
                                                <Button variant="outline" size="icon" onClick={(e) => onAddUrl(e)}>
                                                    <Plus />
                                                </Button>
                                            </span>
                                        </>
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </div>
                <div className="mb-4 space-y-2">
                    <FormField
                        control={form.control}
                        name="privacy"
                        render={({ field }) => (
                            <FormItem className="flex justify-between items-center">
                                <FormLabel>Privacy</FormLabel>
                                <FormControl>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-32 px-2 py-2 flex justify-between">
                                                {field.value}
                                                <IoIosArrowDown />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuRadioGroup value={field.value} onValueChange={field.onChange}>
                                                <DropdownMenuRadioItem value="public">public</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="private">private</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <DialogClose type="submit">
                    <Button>
                        <span>Create</span>
                    </Button>
                </DialogClose>
            </form>
        </Form>
    );
};
