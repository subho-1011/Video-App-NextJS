"use client";

import * as z from "zod";

import React, { useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { AddVideoSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { addVideo } from "@/services/video.services";

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

const AddVideoForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const [thumbnail, setThumbnail] = useState<File | undefined>();
    const [video, setVideo] = useState<File>();

    const form = useForm<z.infer<typeof AddVideoSchema>>({
        resolver: zodResolver(AddVideoSchema),
        defaultValues: {
            title: "",
            description: "",
            tags: [],
            thumbnail: undefined,
            video: undefined,
            isPublished: true,
        },
    });

    const onSubmit = (data: z.infer<typeof AddVideoSchema>) => {
        setError("");
        setSuccess("");
        setIsLoading(true);

        const formData = new FormData();
        formData.set("title", data.title);
        formData.set("description", data.description);
        formData.append("isPublished", String(data.isPublished));

        if (!thumbnail) {
            setError("Please provide a thumbnail");
            setIsLoading(false);
            return;
        }
        formData.set("thumbnail", thumbnail);

        if (!video) {
            setError("Please provide a video");
            setIsLoading(false);
            return;
        }
        formData.set("video", video);

        addVideo(formData)
            .then((res) => {
                if (res.success) {
                    setSuccess(res.success);
                }

                if (res.error) {
                    setError(res.error);
                }
                setThumbnail(undefined);
                setVideo(undefined);
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
                                        <Textarea {...field} placeholder="Enter Title" disabled={isLoading} />
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
                                        <Textarea {...field} placeholder="Enter Description" disabled={isLoading} />
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
                                                            disabled={isLoading}
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
                                    <FormControl className="w-full">
                                        <Card className="border-dashed w-full md:w-[400px]">
                                            <AspectRatio ratio={16 / 9}>
                                                <div className="flex h-full items-center justify-center">
                                                    <Input
                                                        {...field}
                                                        type="file"
                                                        accept="video/*"
                                                        className="w-fit"
                                                        placeholder="Video"
                                                        onChange={(e) => {
                                                            field.onChange(e.target.value);
                                                            setVideo(e.target.files![0]);
                                                        }}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </AspectRatio>
                                        </Card>
                                    </FormControl>
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
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={isLoading}
                                        />
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

export default AddVideoForm;
