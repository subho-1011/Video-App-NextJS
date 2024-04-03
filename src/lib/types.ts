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
    createAt: Date;
    owner: {
        id: string;
        name: string;
        username: string;
        email: string;
        image: string;
    };
};
