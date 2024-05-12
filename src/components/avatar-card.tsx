import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User2Icon } from "lucide-react";

export const AvatarCard = ({ image, name, username }: { image: string; name: string; username?: string }) => {
    return (
        <div className="flex items-center gap-x-3">
            <Avatar className="w-12 h-12">
                <AvatarImage src={image}></AvatarImage>
                <AvatarFallback>
                    <User2Icon />
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <h1>{name}</h1>
                {username && <p className="text-primary/60">@{username}</p>}
            </div>
        </div>
    );
};

export const AvatarLogo = ({ image }: { image: string }) => {
    return (
        <Avatar className="w-12 h-12">
            <AvatarImage src={image}></AvatarImage>
            <AvatarFallback>
                <User2Icon />
            </AvatarFallback>
        </Avatar>
    );
};
