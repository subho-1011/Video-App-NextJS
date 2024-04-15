import React from "react";
import { Card, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { AspectRatio } from "./ui/aspect-ratio";

export const HomeSkeletonVideoCard = () => {
    return (
        <Card className="border-0 space-y-3">
            <Card>
                <AspectRatio ratio={16 / 9}>
                    <Skeleton className="h-full w-full" />
                </AspectRatio>
            </Card>
            <CardFooter className="flex gap-4">
                <div className="flex items-end justify-end">
                    <Skeleton className="w-10 h-10 rounded-full" />
                </div>
                <div className="flex flex-col w-full gap-1.5">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-1/2 h-3" />
                    <Skeleton className="w-1/3 h-3" />
                </div>
            </CardFooter>
        </Card>
    );
};
