import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllPlaylists } from "@/hooks/playlist";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const AddVideoInPlaylistFormSchema = z.object({
    playlistId: z.string().optional(),
    newPlaylist: z.object({
        title: z.string(),
        privacy: z.string().default("private"),
    }),
});

// TODO: NOT WORKING
// FIXME: NOT WORKING
export const AddVideoInPlaylistForm = () => {
    // get user all playlists
    const { playlists } = useGetAllPlaylists();

    const form = useForm<z.infer<typeof AddVideoInPlaylistFormSchema>>({
        resolver: zodResolver(AddVideoInPlaylistFormSchema),
        defaultValues: {
            playlistId: undefined,
            newPlaylist: {
                title: "",
                privacy: "private",
            },
        },
    });

    const onSubmit = (data: z.infer<typeof AddVideoInPlaylistFormSchema>) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full gap-y-3">
                    <FormField
                        control={form.control}
                        name="newPlaylist.privacy"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select {...field}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {playlists?.map((playlist) => (
                                                    <span key={playlist.id}>
                                                        <SelectItem value={playlist.id}>{playlist.title}</SelectItem>
                                                    </span>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="text-center">Or</div>
                    <FormField
                        control={form.control}
                        name="newPlaylist.title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type="text" placeholder="Playlist name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPlaylist.privacy"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select {...field}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="private">Private</SelectItem>
                                            <SelectItem value="public">Public</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Add
                    </Button>
                </div>
            </form>
        </Form>
    );
};
