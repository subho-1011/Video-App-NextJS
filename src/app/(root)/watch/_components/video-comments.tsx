"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";

import { CommentCard } from "@/components/comment-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { SendHorizonalIcon } from "lucide-react";

import { useCurrentUser } from "@/hooks/user";

import {
    addVideoComment,
    deleteComment,
    editComments,
    getAllVideoComments,
    toggleLikedAComment,
} from "@/services/comments.services";
import { AvatarCard } from "@/components/avatar-card";

const VideoComments = () => {
    const user = useCurrentUser();
    const searchParams = useSearchParams();
    const videoId = searchParams.get("v");

    const [comments, setComments] = useState<TVideoComment[]>([]);

    useEffect(() => {
        if (!videoId) return;

        getAllVideoComments(videoId).then((res) => {
            if (res.success) setComments(res.data.comments);
        });
    }, [videoId]);

    const totalComments = comments?.length;

    const onDelete = (comment: TVideoComment) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            deleteComment(comment.id)
                .then((res) => {
                    if (res.success) {
                        setComments(comments.filter((c) => c.id !== comment.id));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    if (!videoId) {
        return null;
    }

    const onAddComment = (data: { text: string }) => {
        addVideoComment(videoId, data)
            .then((res) => {
                console.log(res);

                if (res.success) {
                    setComments([res.data.comment, ...comments]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onEdit = (comment: TVideoComment, text: string) => {
        editComments(comment.id, text)
            .then((res) => {
                if (res.success) {
                    setComments(comments.map((c) => (c.id === comment.id ? res.data.comment : c)));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onToggleLike = (comment: TVideoComment) => {
        toggleLikedAComment(comment.id)
            .then((res) => {
                console.log(res);

                if (res.success) {
                    setComments(
                        comments.map((c) =>
                            c.id === comment.id ? { ...c, isLiked: res.isLiked, likes: res.likes } : c
                        )
                    );
                }
            })
            .catch(() => {
                console.log("Something went wrong");
            });
    };

    return (
        <div className="flex flex-col gap-4 w-full px-2">
            <h1 className="text-2xl ml-3">{totalComments} Comments</h1>
            <Card className="">
                <CardHeader>
                    {user && (
                        <>
                            <AvatarCard image={user?.image!} name={user.name!} />
                            <InputForm onAddComment={(data) => onAddComment(data)} />
                        </>
                    )}
                </CardHeader>
                <Separator />
                <CardContent className="space-y-3">
                    {comments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            userId={user?.id}
                            onDelete={() => onDelete(comment)}
                            onEdit={(comment, text) => onEdit(comment, text)}
                            onToggleLiked={() => onToggleLike(comment)}
                        />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default VideoComments;

export const InputForm = ({ onAddComment }: { onAddComment: (data: { text: string }) => void }) => {
    const { register, handleSubmit, reset } = useForm<{ text: string }>({
        defaultValues: {
            text: "",
        },
    });

    const onSubmit: SubmitHandler<{ text: string }> = (data) => {
        onAddComment(data);
        reset();
    };

    return (
        <div className="flex ml-12 mt-2 gap-2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
                <Input
                    className=" focus-visible:ring-0 focus-visible:ring-offset-0 disabled:border-0 disabled:cursor-auto border-0 border-b-2 rounded-none"
                    placeholder="write something . . ."
                    {...register("text", { maxLength: 100 })}
                />
                <Button variant="ghost" type="submit">
                    <SendHorizonalIcon />
                </Button>
            </form>
        </div>
    );
};
