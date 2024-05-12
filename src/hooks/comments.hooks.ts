import { useCurrentUser } from "@/hooks/user";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { clearComments } from "@/store/features/comments-slice";
import { fetchToggleCommentLike, fetchVideoComments } from "@/store/asyncThunkApi/comments.asyncthunkApi";

export const useCommentCard = (id: string) => {
    const dispatch = useAppDispatch();
    const [showSubComments, setShowSubComments] = useState<boolean>(false);
    const [showReplyForm, setShowReplyForm] = useState<boolean>(false);

    const onToggleLike = () => {
        dispatch(fetchToggleCommentLike({ commentId: id }));
    };

    const onToggleReply = () => {
        setShowReplyForm(!showReplyForm);
    };

    const onToggleSubComments = () => {
        setShowSubComments(!showSubComments);
    };

    return {
        showSubComments,
        showReplyForm,
        onToggleLike,
        onToggleReply,
        onToggleSubComments,
    };
};

export const useComments = () => {
    const user = useCurrentUser();
    const comments = useAppSelector((state) => state.Comments.comments);

    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const videoId = searchParams.get("v");

    const fetchComments = useMemo(() => {
        return (videoId: string) => {
            dispatch(fetchVideoComments({ videoId }));
        };
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearComments());
        };
    }, [dispatch]);

    useEffect(() => {
        if (videoId) {
            fetchComments(videoId);
        }
    }, [videoId, fetchComments]);

    return {
        user,
        videoId,
        comments,
        fetchComments,
    };
};
