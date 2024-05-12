"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Podcast } from "lucide-react";
import { RiVideoAddLine } from "react-icons/ri";

const items = [
    {
        label: "Add video",
        icon: <RiVideoAddLine size={24} />,
        route: "/videos/add-video",
    },
    {
        label: "Add community",
        icon: <Podcast size={24} />,
        route: "/community/add-community",
    },
];

const FloatButton: React.FC = () => {
    const router = useRouter();

    const [isHovered, setIsHovered] = React.useState(false);

    const onEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        setIsHovered(!isHovered);

        if (!isHovered) {
            document.addEventListener("click", () => setIsHovered(false), { once: true });
        }
    };

    return (
        <div className="fixed bottom-5 right-5">
            <Button
                className="flex w-16 h-16 rounded-full items-center justify-center text-3xl"
                variant="secondary"
                onClick={onEvent}
            >
                +
            </Button>
            {isHovered && (
                <div className="absolute flex flex-col items-end bottom-16 right-0 mb-3 space-y-3 shadow-lg rounded-lg">
                    {items.map((item, index) => (
                        <Button
                            key={index}
                            className="flex h-16 rounded-full space-x-3"
                            variant="secondary"
                            onClick={() => router.push(`${item.route}`)}
                        >
                            <span>{item.label}</span>
                            {item.icon}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FloatButton;
