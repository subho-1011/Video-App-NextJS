"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { fetchAllVideos, fetchAVideoData } from "@/store/asyncThunkApi/videos.asyncthunkApi";
import { useSearchParams } from "next/navigation";
import { useCurrentUser } from "./user";
import { clearVideoData } from "@/store/features/videodata-slice";

export const useGetAVideoData = () => {
    const serachParams = useSearchParams();
    const dispatch = useAppDispatch();
    const currUser = useCurrentUser();

    const videoId = serachParams.get("v");

    const isLoading = useAppSelector((state) => state.VideoData.loading);
    const error = useAppSelector((state) => state.VideoData.error);
    const video = useAppSelector((state) => state.VideoData.video);

    useEffect(() => {
        return () => {
            dispatch(clearVideoData());
        };
    }, [dispatch]);

    useEffect(() => {
        if (videoId) {
            dispatch(fetchAVideoData(videoId));
        }
    }, [dispatch, videoId]);

    const isLiked = video ? video.likes.some((like) => like.ownerId === currUser?.id) : false;

    return { isLoading, error, video, isLiked };
};

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
