"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ExitIcon } from "@radix-ui/react-icons";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { searchAll } from "@/actions/search";
import { TVideo } from "@/types";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type SearchInput = {
    search: string;
};

export const SearchBar = () => {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");
    const [videos, setVideos] = useState<TVideo[]>([]);

    const {
        register,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchInput>();

    const onSubmit: SubmitHandler<SearchInput> = (data) => {
        onClick();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeout(() => {
            setSearch(e.target.value);
        }, 1000);
    };

    useEffect(() => {
        if (!search || search.length < 3) return setVideos([]);

        searchAll(search).then((res) => {
            if (res) setVideos(res);
        });
    }, [search]);

    const onClick = () => {
        router.push(`/search/${search}`);

        setVideos([]);
        reset();
    };

    return (
        <div className=" relative">
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <span className="flex h-12 px-3 relative">
                    <Input
                        {...register("search")}
                        size={56}
                        type="text"
                        placeholder="Search..."
                        className="rounded-2xl h-full hover:ring-0 px-3"
                        onChange={onChange}
                    />
                    <Button
                        variant="outline"
                        className="h-full right-0 mr-2.5 absolute rounded-2xl rounded-l-none px-3"
                        type="submit"
                    >
                        <FaSearch className="w-6 h-6" />
                    </Button>
                </span>
            </form>

            {videos.length > 0 && (
                <Card className="w-full bg-transparent/75 absolute z-50">
                    {videos.slice(0, 7).map((video) => (
                        <div
                            key={video.id}
                            className="flex items-center mr-[10%] gap-2 w-full rounded-lg  py-3 px-3 border-b hover:bg-secondary"
                            onClick={onClick}
                        >
                            <p className="line-clamp-1">{video.title.split(" ").splice(0, 4).join(" ")}</p>
                        </div>
                    ))}
                </Card>
            )}
        </div>
    );
};
