"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { SendHorizonalIcon, ThumbsUpIcon, User2Icon } from "lucide-react";

import { useCurrentUser } from "@/hooks/user";

import { editComments, toggleLikedAComment } from "@/services/comments.services";
import { AvatarLogo } from "./avatar-card";

export const CommentCard = ({
    comment,
    userId,
    onDelete,
    onEdit,
    onToggleLiked,
}: {
    comment: TVideoComment;
    userId?: string;
    onDelete: (comment: TVideoComment) => void;
    onEdit: (comment: TVideoComment, text: string) => void;
    onToggleLiked: (comment: TVideoComment) => void;
}) => {
    const user = useCurrentUser();

    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [onEditComment, setOnEditComment] = useState<boolean>(false);

    useEffect(() => {
        if (!userId) setIsEditable(false);

        if (comment.owner.id === userId) {
            setIsEditable(true);
        }
    }, [comment.owner.id, userId]);

    const { register, handleSubmit, reset } = useForm<{ text: string }>({
        defaultValues: {
            text: comment.text || "",
        },
    });

    const onSubmit: SubmitHandler<{ text: string }> = (data) => {
        console.log(data);
        onEdit(comment, data.text);

        editComments(comment.id, data.text)
            .then((res) => {
                console.log(res);
                reset();
            })
            .catch((err) => {
                console.log(err);
            });

        setOnEditComment(false);
    };

    const onClickEdit = () => {
        if (!user) return;

        if (user.id === comment.owner.id) {
            setOnEditComment(true);
        }
    };

    return (
        <CardContent className="p-1 py-2">
            <div className="flex">
                <AvatarLogo image={comment.owner.image} />
                <div className="flex flex-col w-full gap-y-2 ml-4">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <h1 className="text-muted-foreground text-md">@{comment.owner.username}</h1>
                        </div>
                        {isEditable && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    {/* <button className="px-2">
                                </button> */}
                                    <div className="px-3">
                                        <DotsVerticalIcon />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={onClickEdit}>edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={(event) => onDelete(comment)}>delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                    <div>
                        {!onEditComment ? (
                            <p>{comment.text}</p>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex gap-3 justify-end items-end">
                                    <Textarea
                                        className="disabled:min-h-fit p-0 text-base disabled:opacity-100 cursor-auto border-none disabled:cursor-auto disabled:text-base"
                                        // defaultValue={comment.text}
                                        {...register("text", { maxLength: 100 })}
                                    />
                                    <Button size="sm" variant="ghost" type="submit">
                                        <SendHorizonalIcon />
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="flex gap-x-8 text-primary/60">
                        <Button variant="ghost2" className="flex gap-2" onClick={() => onToggleLiked(comment)}>
                            {comment.owner.id === useCurrentUser()?.id && comment.isLiked ? (
                                <ThumbsUpIcon className=" fill-current" />
                            ) : (
                                <ThumbsUpIcon />
                            )}
                            <span>{comment.likes}</span>
                        </Button>
                        <Button variant="link" className="">
                            reply
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    );
};
