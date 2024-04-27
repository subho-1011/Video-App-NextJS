import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import userSlice from "./features/user-slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            User: userSlice,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
