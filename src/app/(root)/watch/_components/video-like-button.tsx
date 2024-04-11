"use client";

import { FaThumbsUp } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export const VideoLikeButton = ({
    isLiked,
    likes,
    isOwner,
    onToggleLikeButton,
}: {
    isLiked: boolean;
    likes: number;
    isOwner: boolean;
    onToggleLikeButton: () => void;
}) => {
    return (
        <Button
            variant={isOwner && !!isLiked ? "navActive" : "secondary"}
            size="lg"
            className="gap-x-2"
            onClick={onToggleLikeButton}
        >
            {isOwner && isLiked ? <FaThumbsUp size={16} className="fill-current" /> : <FaThumbsUp size={16} />}
            <span> | </span>
            <span>{likes}</span>
        </Button>
    );
};
