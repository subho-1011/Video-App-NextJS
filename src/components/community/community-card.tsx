"use client";

import React from "react";
import Image from "next/image";

import { AvatarLogo } from "@/components/avatar-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { FaComment } from "react-icons/fa";
import { Heart, SendHorizonalIcon } from "lucide-react";

import { TCommunityDetails } from "@/types";
import { useCommunityLikedToggle } from "@/hooks/communities";

interface TCommunityCard extends TCommunityDetails {}

const CommunityCard = ({ id, likes, owner, text, imageUrl }: TCommunityCard) => {
    const [showComment, setShowComment] = React.useState(false);

    const { error, success, onLiked, isLiked, noOfLikes } = useCommunityLikedToggle(id, likes);

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <AvatarLogo image={owner.image!} />
                        <span>{owner.name}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>{text}</p>
                    {imageUrl && <CommunityImage image={imageUrl} />}
                    <div className="flex w-1/2 items-center justify-between mx-3">
                        <div className="flex gap-x-3 items-center">
                            <Button variant="ghost2" onClick={onLiked}>
                                {isLiked ? (
                                    <Heart className="w-6 h-6 fill-white" />
                                ) : (
                                    <Heart className="w-6 h-6 hover:fill-none" />
                                )}
                            </Button>
                            <span>{noOfLikes}</span>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <Button variant="ghost2" onClick={() => setShowComment(!showComment)}>
                                <FaComment className="w-6 h-6 hover:scale-105" />
                            </Button>
                            <span>10</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-y-3">
                    <PublishComment />
                    {showComment && <div>Comments</div>}
                </CardFooter>
            </Card>
        </>
    );
};

const PublishComment = () => {
    return (
        <div className="flex w-full space-x-3">
            <Input />
            <Button variant="ghost">
                <SendHorizonalIcon />
            </Button>
        </div>
    );
};

const CommunityImage = ({ image }: { image: string }) => {
    return (
        <Image
            src={image}
            alt="Community Image"
            width={500}
            height={300}
            className=" w-full object-cover border rounded-xl"
        />
    );
};

export default CommunityCard;
