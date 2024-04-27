import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user-slice";
import videosSlice from "./features/videos-slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            User: userSlice,
            Videos: videosSlice,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
