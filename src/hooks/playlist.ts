import { useEffect, useState } from "react";
import { getPlaylists, TPlaylistWithVideos } from "@/services/playlists.services";

export const useGetAllPlaylists = () => {
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [playlists, setPlaylists] = useState<TPlaylistWithVideos[]>();

    useEffect(() => {
        getPlaylists().then((res) => {
            if (res.error) setError(res.error);

            if (res.success) {
                setPlaylists(res.data?.playlists);

                setSuccess(res.message);
            }
        });
    }, []);

    return {
        error,
        success,
        playlists,
    };
};
