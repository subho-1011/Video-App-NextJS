"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DashboardIcon } from "@radix-ui/react-icons";
import {
    HeartIcon,
    HistoryIcon,
    Home,
    LogOut,
    MenuIcon,
    PlaySquare,
    ThumbsUpIcon,
    User2Icon,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

const navItems = [
    {
        label: "Home",
        href: "/",
        Icon: Home,
    },
    {
        label: "dashboard",
        href: "/dashboard",
        Icon: DashboardIcon,
    },
    {
        label: "Profile",
        href: "/profile",
        Icon: User2Icon,
    },
    {
        label: "History",
        href: "/history",
        Icon: HistoryIcon,
    },
    {
        label: "Liked Videos",
        href: "/liked-videos",
        Icon: ThumbsUpIcon,
    },
    {
        label: "community",
        href: "/community",
        Icon: HeartIcon,
    },
    {
        label: "Playlists",
        href: "/playlists",
        Icon: PlaySquare,
    },
];

const Sider = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(true);

    useEffect(() => {
        window.addEventListener("resize", () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 1024) setIsOpen(false);

            setIsOpen(true);

            if (pathname.startsWith("/watch") || pathname.startsWith("/auth"))
                setIsOpen(false);
        });
    }, [pathname]);

    return (
        <aside className="min-h-screen border-r hidden sm:flex">
            <div className="flex flex-col w-full h-fit p-3 items-start space-y-2">
                <Button
                    variant="ghost"
                    className=""
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <MenuIcon />
                </Button>
                {navItems.map((item) => (
                    <Button
                        variant={pathname === item.href ? "navActive" : "ghost"}
                        key={item.label}
                        className="w-full"
                        onClick={() => (window.location.href = item.href)}
                    >
                        <div className="flex w-full gap-2 font-normal left-0 items-center">
                            <item.Icon className="h-4 w-4" />
                            {isOpen && item.label}
                        </div>
                        <div className="w-full"></div>
                    </Button>
                ))}
                <Button variant="ghost" className="w-full">
                    <div className="flex w-full">
                        <LogoutButton>
                            <span className="flex gap-2 font-normal items-center">
                                <LogOut className="h-4 w-4" />
                                {isOpen && "LogOut"}
                            </span>
                        </LogoutButton>
                    </div>
                </Button>
            </div>
        </aside>
    );
};

export default Sider;
