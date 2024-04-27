import { User, Comment, Community, Like, Video } from "@prisma/client";

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
export type TVideoLike = Omit<Like, "communityId" | "commentId">;

export type TVideoComment = Omit<Comment, "communityId" | "commentId"> & TOwner & {};

export type TVideo = Video & {
    owner: TOwner;
    likes: TVideoLike[];
    comments: TVideoComment[];
};

export type TVideoCard = Omit<TVideo, "likes" | "comments"> & {};

export type TLike = Like & {};

export type TOwner = {
    id: string;
    name: string;
    username: string;
    image: string;
};

export type TUser = Omit<User, "password" | "emailVerified"> & {};
