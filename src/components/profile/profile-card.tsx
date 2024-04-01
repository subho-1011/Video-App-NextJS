"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAvatarFallback, useCurrentUser } from "@/hooks/user";
import { Separator } from "../ui/separator";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ProfileCard = () => {
    const user = useCurrentUser();
    const avatarFallback = useAvatarFallback();

    const userImage: string = user?.image ? user.image : "";

    return (
        <Card className="border-0 flex flex-col w-full justify-center items-center">
            <CardHeader>
                <h1 className="w-full tracking-wider text-2xl text-center">
                    Profile Info
                </h1>
            </CardHeader>
            <Card className="w-full lg:w-[800px]">
                <CardHeader className="w-full items-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost">
                                <DotsVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="flex w-full items-center justify-around space-x-6">
                    <div className="flex flex-col md:flex-row w-full items-center justify-center md:justify-around space-y-8">
                        <Card className=" flex rounded-full ring-2 ring-transparent w-32 h-32">
                            <Avatar className="flex w-full h-full">
                                <AvatarImage src={userImage}></AvatarImage>
                                <AvatarFallback>
                                    {avatarFallback}
                                </AvatarFallback>
                            </Avatar>
                        </Card>
                        <div className="flex flex-col space-y-3">
                            <div className="flex space-x-8">
                                <h1>Name</h1>
                                <p>{user?.name}</p>
                            </div>
                            <Separator />
                            <div className="flex space-x-8">
                                <h1>Email</h1>
                                <p>{user?.email}</p>
                            </div>
                            <Separator />
                        </div>
                    </div>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </Card>
    );
};
