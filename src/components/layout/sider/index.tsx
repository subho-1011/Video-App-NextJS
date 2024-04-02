"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DashboardIcon } from "@radix-ui/react-icons";
import {
    HistoryIcon,
    Home,
    LogOut,
    MenuIcon,
    PlaySquare,
    ThumbsUpIcon,
    TvIcon,
    User2Icon,
    Users2Icon,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
                <Button variant="ghost" className="" onClick={() => setIsOpen(!isOpen)}>
                    <MenuIcon />
                </Button>
                <nav className="w-full">
                    <Link href="/home">
                        <Button
                            variant={pathname === "/home" || pathname === "/" ? "navActive" : "ghost"}
                            className="w-full"
                        >
                            <div className="flex w-full gap-2 font-normal left-0 items-center">
                                <Home className="h-4 w-4" />
                                {isOpen && "Home"}
                            </div>
                            <div className="w-full"></div>
                        </Button>
                    </Link>
                </nav>
                <nav className="w-full">
                    <Link href="/dashboard">
                        <Button variant={pathname === "/dashboard" ? "navActive" : "ghost"} className="w-full">
                            <div className="flex w-full gap-2 font-normal left-0 items-center">
                                <DashboardIcon className="h-4 w-4" />
                                {isOpen && "Dashboard"}
                            </div>
                            <div className="w-full"></div>
                        </Button>
                    </Link>
                </nav>
                <Separator />
                <nav className="w-full">
                    <Link href="/history">
                        <Button variant={pathname === "/history" ? "navActive" : "ghost"} className="w-full">
                            <div className="flex w-full gap-2 font-normal left-0 items-center">
                                <HistoryIcon className="h-4 w-4" />
                                {isOpen && "History"}
                            </div>
                            <div className="w-full"></div>
                        </Button>
                    </Link>
                </nav>
                <nav className="w-full">
                    <Link href="/liked-videos">
                        <Button variant={pathname === "/liked-videos" ? "navActive" : "ghost"} className="w-full">
                            <div className="flex w-full gap-2 font-normal left-0 items-center">
                                <ThumbsUpIcon className="h-4 w-4" />
                                {isOpen && "Liked Videos"}
                            </div>
                            <div className="w-full"></div>
                        </Button>
                    </Link>
                </nav>
                <nav className="w-full">
                    <Link href="/subscriptions">
                        <Button variant={pathname === "/subscriptions" ? "navActive" : "ghost"} className="w-full">
                            <div className="flex w-full gap-2 font-normal left-0 items-center">
                                <TvIcon className="h-4 w-4" />
                                {isOpen && "Subscriptions"}
                            </div>
                            <div className="w-full"></div>
                        </Button>
                    </Link>
                </nav>
                <nav className="w-full">
                    <Link href="/playlists">
                        <Button variant={pathname === "/playlists" ? "navActive" : "ghost"} className="w-full">
                            <div className="flex w-full gap-2 font-normal left-0 items-center">
                                <PlaySquare className="h-4 w-4" />
                                {isOpen && "Playlists"}
                            </div>
                            <div className="w-full"></div>
                        </Button>
                    </Link>
                </nav>
                <nav className="w-full">
                    <Link href="/community">
                        <Button variant={pathname === "/community" ? "navActive" : "ghost"} className="w-full">
                            <div className="flex w-full gap-2 font-normal left-0 items-center">
                                <Users2Icon className="h-4 w-4" />
                                {isOpen && "Community"}
                            </div>
                            <div className="w-full"></div>
                        </Button>
                    </Link>
                </nav>
                <Separator />
                <nav className="w-full">
                    <Link href="/profile">
                        <Button variant={pathname === "/profile" ? "navActive" : "ghost"} className="w-full">
                            <div className="flex w-full gap-2 font-normal left-0 items-center">
                                <User2Icon className="h-4 w-4" />
                                {isOpen && "Profile"}
                            </div>
                            <div className="w-full"></div>
                        </Button>
                    </Link>
                </nav>
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
