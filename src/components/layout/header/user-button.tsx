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
import { useCurrentUser } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export const UserButton = () => {
    const router = useRouter();
    const user = useCurrentUser();

    const fallback = user?.name
        ?.split(" ")
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="">
                        {fallback ? (
                            fallback
                        ) : (
                            <FaUser className=" text-white" />
                        )}
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
                        <DropdownMenuItem
                            onClick={() => router.push("/profile")}
                        >
                            Profile
                        </DropdownMenuItem>
                        <LogoutButton>
                            <DropdownMenuItem className="cursor-pointer">
                                Logout
                            </DropdownMenuItem>
                        </LogoutButton>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
