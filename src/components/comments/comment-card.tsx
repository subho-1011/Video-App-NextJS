"use client";

import { TComment } from "@/types";
import { ThumbsUpIcon } from "lucide-react";
import { FaComments } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AvatarCard } from "@/components/avatar-card";
import { Separator } from "@/components/ui/separator";
import { useCommentCard } from "@/hooks/comments.hooks";
import { CommentInputForm } from "@/components/comments/comment-input-form";

export const CommentCard = ({ id, text, owner, likes, isLiked, replys }: TComment) => {
    const { showReplyForm, showSubComments, onToggleLike, onToggleReply, onToggleSubComments } = useCommentCard(id);

    return (
        <section className="flex flex-col gap-1">
            <AvatarCard {...owner} />
            <div className="ml-[3.75rem]">
                <p>{text}</p>
                <div className=" text-primary/60">
                    <div className="flex gap-12">
                        <span className="flex items-center">
                            <Button size="icon" variant="ghost2" onClick={onToggleLike}>
                                {isLiked ? <ThumbsUpIcon className="fill-current" /> : <ThumbsUpIcon />}
                            </Button>
                            {likes}
                        </span>
                        <span className="flex items-center">
                            <Button size="icon" variant="ghost2" className="space-x-3" onClick={onToggleSubComments}>
                                <FaComments />
                                <span>{replys ? replys.length : 0}</span>
                            </Button>
                        </span>
                        <Button variant="link" onClick={onToggleReply}>
                            <span>reply</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-3 ml-12">
                {showReplyForm && <CommentInputForm rootCommentId={id} />}
                {showSubComments && (
                    <div className="mt-3">
                        {replys &&
                            replys.length > 0 &&
                            replys.map((reply) => <CommentCard key={reply.id} {...reply} />)}
                    </div>
                )}
            </div>
            <Separator />
        </section>
    );
};
