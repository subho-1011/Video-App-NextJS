"use client";

import { useComments } from "@/hooks/comments.hooks";
import { AvatarCard } from "@/components/avatar-card";
import { Separator } from "@/components/ui/separator";
import { CommentCard } from "@/components/comments/comment-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CommentInputForm } from "@/components/comments/comment-input-form";

export default function VideoCommentsPage() {
    const { videoId, user, comments } = useComments();

    return (
        <>
            <div className="flex flex-col gap-4 w-full px-2">
                <h1 className="text-2xl ml-3">{comments?.length} Comments</h1>
                <Card className="">
                    <CardHeader>
                        {user && (
                            <>
                                <AvatarCard {...{ name: user.name!, image: user.image!, username: user.username! }} />
                                <CommentInputForm videoId={videoId!} />
                            </>
                        )}
                    </CardHeader>
                    <Separator />
                    <CardContent className="space-y-3 my-3">
                        {comments && comments.map((comment) => <CommentCard key={comment.id} {...comment} />)}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
