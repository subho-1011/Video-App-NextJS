"use client";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const AuthCardSocial = () => {
    const onClick = (provider: "google" | "github") => {
        console.log(provider);
    };

    return (
        <div className="flex w-full items-center gap-x-2">
            <Button
                className="w-full"
                size="lg"
                variant="outline"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                className="w-full"
                size="lg"
                variant="outline"
                onClick={() => onClick("github")}
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    );
};
