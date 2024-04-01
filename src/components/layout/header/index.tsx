"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { SearchBar } from "@/components/layout/header/search-bar";
import { UserButton } from "@/components/layout/header/user-button";

const Header = () => {
    return (
        <header className="w-full border-b p-3">
            <div className="w-full flex px-3 md:px-8 lg:px-16 items-center justify-between">
                <h1 className=" text-2xl font-semibold tracking-wider">
                    VideoApp
                </h1>
                <span className="hidden md:flex">
                    <SearchBar />
                </span>
                <div className="flex mr-4 space-x-3 items-center justify-center">
                    <ModeToggle />
                    <UserButton />
                </div>
            </div>
            <div className="md:hidden mt-3 md:m-0">
                <SearchBar />
            </div>
        </header>
    );
};

export default Header;
