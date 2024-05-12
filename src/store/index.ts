import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user-slice";
import videosSlice from "./features/videos-slice";
import videodataSlice from "./features/videodata-slice";
import commentsSlice from "./features/comments-slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            User: userSlice,
            Videos: videosSlice,
            VideoData: videodataSlice,
            Comments: commentsSlice,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
