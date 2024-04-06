"use client";

import * as z from "zod";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { EditVideoSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { editVideo, videoData } from "@/services/video.services";

import CardWrapper from "@/app/(root)/videos/_components/card-wrapper";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

import { RiCloseFill } from "react-icons/ri";
import { FaSpinner } from "react-icons/fa";
import { IFullVideoDetails } from "@/lib/types";
import { useCurrentUser } from "@/hooks/user";

const EditVideoForm = ({ videoId }: { videoId: string }) => {
    const user = useCurrentUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const [video, setVideo] = useState<IFullVideoDetails>();

    const [thumbnail, setThumbnail] = useState<File | undefined>();

    useEffect(() => {
        videoData(videoId).then((res) => {
            setVideo(res.data);
        });
    }, [videoId]);

    const form = useForm<z.infer<typeof EditVideoSchema>>({
        resolver: zodResolver(EditVideoSchema),
        defaultValues: {
            title: video?.title,
            description: video?.description,
            tags: [],
            thumbnail: undefined,
            video: undefined,
            isPublished: true,
        },
    });

    const onSubmit = (data: z.infer<typeof EditVideoSchema>) => {
        if (!video?.id) return;

        if (video?.owner.id !== user?.id) {
            console.log("You are not the owner of this video");
            return;
        }

        setError(undefined);
        setSuccess(undefined);
        setIsLoading(true);

        const formData = new FormData();
        formData.set("title", data.title);
        formData.set("description", data.description);

        if (!thumbnail) {
            setError("Please provide a thumbnail");
            setIsLoading(false);
            return;
        }
        formData.set("thumbnail", thumbnail);

        editVideo(formData, video?.id)
            .then((res) => {
                console.log(res);
                if (res.success) {
                    setSuccess(res.success);
                }

                if (res.error) {
                    setError(res.error);
                }
                setThumbnail(undefined);
            })
            .catch(() => {
                setError("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
                form.reset();
            });
    };

    return (
        <CardWrapper headerLabel="Add new video">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            defaultValue={video?.title}
                                            placeholder="Enter Title"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            defaultValue={video?.description}
                                            placeholder="Enter Description"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <Card className="m-0 p-0 border-dashed w-full sm:w-[400px]">
                                        <AspectRatio
                                            ratio={16 / 9}
                                            className="relative w-full flex items-center justify-center"
                                        >
                                            {thumbnail ? (
                                                <>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="absolute flex right-0 top-0"
                                                        onClick={() => {
                                                            setThumbnail(undefined);
                                                            field.onChange(undefined);
                                                        }}
                                                        disabled={isLoading}
                                                    >
                                                        <RiCloseFill className="h-5 w-5" />
                                                    </Button>
                                                    <Image
                                                        src={URL.createObjectURL(thumbnail)}
                                                        alt="thumbnail"
                                                        width="400"
                                                        height="400"
                                                        className="h-full object-cover"
                                                    />
                                                </>
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    <FormControl className="w-full">
                                                        <Input
                                                            {...field}
                                                            type="file"
                                                            accept="image/*"
                                                            className="w-fit"
                                                            placeholder="Thumbnail"
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                                setThumbnail(e.target.files![0]);
                                                            }}
                                                            disabled
                                                        />
                                                    </FormControl>
                                                </div>
                                            )}
                                        </AspectRatio>
                                    </Card>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="video"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video</FormLabel>
                                    <Card className="m-0 p-0 border-dashed w-full sm:w-[400px]">
                                        <AspectRatio
                                            ratio={16 / 9}
                                            className="relative w-full flex items-center justify-center"
                                        >
                                            {thumbnail ? (
                                                <>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="absolute flex right-0 top-0"
                                                        onClick={() => {
                                                            setThumbnail(undefined);
                                                            field.onChange(undefined);
                                                        }}
                                                        disabled={isLoading}
                                                    >
                                                        <RiCloseFill className="h-5 w-5" />
                                                    </Button>
                                                    <Image
                                                        src={URL.createObjectURL(thumbnail)}
                                                        alt="thumbnail"
                                                        width="400"
                                                        height="400"
                                                        className="h-full object-cover"
                                                    />
                                                </>
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    <FormControl className="w-full">
                                                        <Input
                                                            {...field}
                                                            type="file"
                                                            accept="image/*"
                                                            className="w-fit"
                                                            placeholder="Thumbnail"
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                                setThumbnail(e.target.files![0]);
                                                            }}
                                                            disabled
                                                        />
                                                    </FormControl>
                                                </div>
                                            )}
                                        </AspectRatio>
                                    </Card>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isPublished"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Published</FormLabel>
                                        <FormDescription>
                                            If true it will be published, if false it will not available in public
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <div className=" space-x-6">
                        <Button size="lg" type="submit" disabled={isLoading}>
                            {isLoading && (
                                <span className="mr-3 animate-spin">
                                    <FaSpinner />
                                </span>
                            )}
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default EditVideoForm;
