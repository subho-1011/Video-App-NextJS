import { User, Comment, Community, Like } from "@prisma/client";

// For Dashboard Types and Interfaces
export type TChannel = Omit<User, "password" | "emailVerified" | "watchHistory"> & {
    subscribers: number;
    isSubscribed: boolean;
    videos: number;
};


// For Community Types and Interfaces 
export type TCommunityComment = Omit<Comment, "videoId" | "commentId"> & {};

export type TCommunityLike = Omit<Like, "videoId" | "commentId">;

export type TCommunityDetails = Community & {
    owner: TOwner;
    likes: TCommunityLike[];
    comments: TCommunityComment[];
};

//
export type TLike = Like & {};

export type TOwner = Omit<TUser, "email" | "emailVerified" | "watchHistory" | "createAt"> & {};

export type TUser = Omit<User, "password"> & {};

type TVideoComment = {
    id: string;
    text: string;
    videoId: string;
    owner: TOwner;
    createdAt: Date;
    isLiked: boolean;
    likes: number;
};
