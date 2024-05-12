import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "@/types";

interface IUserState {
    user: TUser | undefined;
    initialized: boolean;
    loading?: boolean;
    error?: string;
}

const initialState: IUserState = {
    user: undefined,
    initialized: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initialize: (state) => {
            state.initialized = true;
        },

        setUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
        },

        loginUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
        },

        logoutUser: (state) => {
            state.user = undefined;
        },

        updateUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
        },
    },
});

export const { initialize, setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
