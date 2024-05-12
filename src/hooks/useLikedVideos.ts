import { TVideoCard } from "@/types";
import { useEffect, useState } from "react";
import { getLikedVideos } from "@/services/video.services";

export const useLikedVideos = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const [videos, setVideos] = useState<TVideoCard[]>();

    useEffect(() => {
        setIsLoading(true);

        getLikedVideos()
            .then((res) => {
                console.log(res.data);

                if (res.success) {
                    setSuccess(res.success);
                    setVideos(res.data);
                }

                if (res.error) {
                    setError(res.error);
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    return { isLoading, error, success, videos };
};
