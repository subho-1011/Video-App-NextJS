import React from "react";
import { Card } from "../ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "lucide-react";
import { Separator } from "../ui/separator";

const SubscriptionSkeletonPage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
                <SubscriptionSkeletonCard />
                <SubscriptionSkeletonCard />
                <SubscriptionSkeletonCard />
                <SubscriptionSkeletonCard />
                <SubscriptionSkeletonCard />
            </div>
        </div>
    );
};

export default SubscriptionSkeletonPage;

const SubscriptionSkeletonCard = () => {
    return (
        <Card>
            <div className="flex p-4 justify-center items-center gap-3 h-fit py-12">
                <div className="h-16 w-16">
                    <Skeleton className="w-16 h-16 flex rounded-full" />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                    <Skeleton className="mx-2 w-1/2 h-8" />
                    <Skeleton className="mx-2 w-1/4 h-5" />
                </div>
            </div>
            <div className="bg-second flex flex-col rounded-b-md p-4 gap-3">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
            </div>
        </Card>
    );
};
