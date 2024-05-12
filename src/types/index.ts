import { User, Comment, Community, Like, Video, Subscription } from "@prisma/client";

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

// For Video Types and Interfaces
export type TVideoLike = {
    id: string;
    ownerId: string;
};

export type TComment = {
    id: string;
    text: string;
    createdAt: Date;
    owner: TOwner;
    likes: number;
    isLiked: boolean;
    replys: TComment[];
};

export type TVideo = Video & {
    owner: TOwner & {
        subscribers: number;
        isSubscribed: boolean;
    };
    likes: TVideoLike[];
    comments: TComment[];
};

export type TVideoCard = Omit<TVideo, "likes" | "comments"> & {};

export type TLike = Like & {};

export type TOwner = {
    id: string;
    name: string;
    username: string;
    image: string;
};

// export type TComment = Comment & {
//     owner: TOwner;
// };

export type TUser = Omit<User, "password" | "emailVerified"> & {};
