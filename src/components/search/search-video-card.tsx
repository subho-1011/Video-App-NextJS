import { timeInterval } from "@/lib/utils";
import { AvatarCard } from "../avatar-card";
import { Card } from "../ui/card";
import { ThumbnailCard } from "../video";
import { TVideo } from "@/types";

export const SearchVideoCard = ({ video }: { video: TVideo }) => {
    return (
        <div className="w-full md:max-w-xl flex">
            <Card className="w-1/2">
                {/* thumbnail */}
                <ThumbnailCard
                    id={video.id}
                    slug={video.slug}
                    thumbnail={video.thumbnail}
                />
            </Card>
            <div className="w-1/2">
                <div className="flex flex-col justify-between h-full p-3">
                    <h2 className="text-lg font-semibold line-clamp-2">
                        {video.title}
                    </h2>
                    <div className="flex justify-between items-center mt-3">
                        <div className="flex flex-col justify-start space-y-2">
                            <AvatarCard
                                image={video?.owner?.image!}
                                name={video.owner.name!}
                                username={video.owner.username!}
                            />
                            <span className="text-sm text-gray-500">
                                {timeInterval(video.createdAt)} ago
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
