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

import { LoginButton } from "@/components/auth/login-button";
import { useAvatarFallback } from "@/hooks/user";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/utils";

export const UserButton = () => {
    const router = useRouter();
    const user = useAppSelector((state) => state.User.user);

    const fallback = useAvatarFallback();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="">
                        {fallback ? fallback : <FaUser className=" text-white" />}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {!user ? (
                    <LoginButton>
                        <DropdownMenuItem>Login</DropdownMenuItem>
                    </LoginButton>
                ) : (
                    <>
                        <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
                        <LogoutButton>
                            <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
                        </LogoutButton>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
