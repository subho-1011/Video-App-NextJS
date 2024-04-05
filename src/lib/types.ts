import { db } from "./db";

export type IVideoCard = {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    duration: number;
    views: number;
    likes?: number;
    createdAt: Date;
    owner: {
        id: string;
        name: string;
        username: string;
        email: string;
        image: string;
    };
};

export type IFullVideoDetails = {
    id: string;
    title: string;
    slug: string;
    description: string;
    views: number;
    isLiked: boolean;
    likes: number;
    isSubscribed: boolean;
    subscribers: number;
    createdAt: Date;
    owner: {
        id: string;
        name: string;
        username: string;
        image: string;
    };
};