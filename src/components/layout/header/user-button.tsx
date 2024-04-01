"use client";

import { FaUser } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogoutButton } from "@/components/auth/logout-button";

import { ExitIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";

export const UserButton = () => {
    const session = useSession();
    const user = session.data?.user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="">
                        <FaUser className=" text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <LogoutButton>
                    <DropdownMenuItem className="cursor-pointer">
                        <ExitIcon className=" h-4 w-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
