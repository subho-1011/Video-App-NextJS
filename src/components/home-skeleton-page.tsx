import { HomeSkeletonVideoCard } from "./home-skeleton-video-card";

export const SkeletonPage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-y-6">
                {[...Array(6)].map((index) => (
                    <HomeSkeletonVideoCard key={index} />
                ))}
            </div>
        </div>
    );
};
