"use client";

import React from "react";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useCommunityForm } from "@/hooks/communities";
import { TCommunityDetails } from "@/types";
import { Loader2Icon } from "lucide-react";

export const AddCommunityForm = ({
    handleAddCommunity,
}: {
    handleAddCommunity: (newCommunity: TCommunityDetails) => void;
}) => {
    const { isLoading, register, handleSubmit, onSubmit } = useCommunityForm(handleAddCommunity);

    return (
        <Card className="flex flex-col w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="my-3 space-y-3">
                    <Label className="text-lg font-semibold">Create a post</Label>
                    <div className="flex gap-x-3">
                        <Input type="text" className="w-3/4" placeholder="What's on your mind?" {...register("text")} />
                        <Input type="file" className="w-1/4" {...register("image")} />
                    </div>
                    <Button type="submit" className="space-x-3" disabled={isLoading}>
                        {isLoading && <Loader2Icon className="animate-spin" />}
                        <span>Post</span>
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
};
