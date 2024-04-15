type TOwner = {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
};

type TVideoComment = {
    id: string;
    text: string;
    videoId: string;
    owner: TOwner;
    createdAt: Date;
    isLiked: boolean;
    likes: number;
};
