"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { fetchAllVideos } from "@/store/asyncThunkApi/videos";

export const useGetVideos = () => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state) => state.Videos.loading);
    const videos = useAppSelector((state) => state.Videos.videos);
    const error = useAppSelector((state) => state.Videos.error);

    useEffect(() => {
        dispatch(fetchAllVideos());
    }, [dispatch]);

    return { isLoading, videos, error };
};
