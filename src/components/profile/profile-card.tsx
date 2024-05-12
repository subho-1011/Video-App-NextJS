"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/user";
import { Separator } from "../ui/separator";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User2Icon } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import axios from "axios";
import { useAppDispatch } from "@/lib/utils";
import { updateUser } from "@/store/features/user-slice";
import { FaSpinner } from "react-icons/fa";

export const ProfileCard = () => {
    const user = useCurrentUser();
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
                        <DropdownMenuTrigger asChild>
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
                        <AvatarCard />
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

const AvatarCard = () => {
    const dispatch = useAppDispatch();

    const [isPending, startTransition] = useTransition();
    const user = useCurrentUser();
    const userImage: string = user?.image ? user.image : "";

    const [file, setFile] = useState<File>();

    const onClickChange = async () => {
        startTransition(async () => {
            if (!file) return;
            const formData = new FormData();
            formData.append("avatar", file);

            const response = await axios.patch("/api/auth/avatar", formData);

            if (response.data.error) {
                console.error(response.data.error);
                return;
            }

            const user = response.data.data;

            dispatch(updateUser(user));
        });
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    {isPending ? (
                        <>
                            <FaSpinner className="animate-spin w-10 h-10" />
                        </>
                    ) : (
                        <Card className=" flex rounded-full ring-2 ring-transparent w-32 h-32">
                            <Avatar className="flex w-full h-full">
                                <AvatarImage src={userImage}></AvatarImage>
                                <AvatarFallback>
                                    <User2Icon className="w-16 h-16" />
                                </AvatarFallback>
                            </Avatar>
                        </Card>
                    )}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <h1>Change Avatar</h1>
                    </DialogHeader>
                    <div className="flex gap-3">
                        <Input
                            type="file"
                            onChange={(e) => {
                                if (e.target.files) setFile(e.target.files[0]);
                            }}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose onClick={onClickChange} asChild>
                            <Button>Save</Button>
                        </DialogClose>
                        <Button>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
