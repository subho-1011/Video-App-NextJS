"use client";

import { useAppDispatch } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonalIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addComment, addReplyComment } from "@/store/asyncThunkApi/comments.asyncthunkApi";

export const CommentInputForm = ({ videoId, rootCommentId }: { videoId?: string; rootCommentId?: string }) => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, reset } = useForm<{ text: string }>({
        defaultValues: {
            text: "",
        },
    });

    const onSubmit: SubmitHandler<{ text: string }> = (data) => {
        const text = data.text;
        console.log(data.text);

        if (rootCommentId) {
            // addReplyComment(data, rootCommentId);
            console.log("rootCommentId: ", rootCommentId);
            dispatch(addReplyComment({ text, commentId: rootCommentId }));
        } else {
            // addComment(data);
            if (!videoId) return;

            dispatch(addComment({ text, videoId }));
        }
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
