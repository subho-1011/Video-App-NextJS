import { TComment } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    addComment,
    addReplyComment,
    fetchToggleCommentLike,
    fetchVideoComments,
} from "../asyncThunkApi/comments.asyncthunkApi";

type TCommentsState = {
    comments: TComment[] | null;
    commentsType: "video" | "community" | undefined;
    loading: boolean;
    error?: string;
};

const initialState: TCommentsState = {
    comments: null,
    commentsType: undefined,
    loading: false,
    error: undefined,
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        clearComments: (state) => {
            state.comments = null;
            state.commentsType = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideoComments.pending, (state) => {
                state.comments = null;
                state.commentsType = "video";
                state.loading = true;
            })
            .addCase(fetchVideoComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.commentsType = "video";
                state.loading = false;
            })
            .addCase(fetchVideoComments.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        builder.addCase(
            fetchToggleCommentLike.fulfilled,
            (state, action: PayloadAction<{ isLiked: boolean; commentId: string }>) => {
                if (!state.comments) {
                    state.error = "Failed to toggle comment like";
                    return;
                }

                state.comments = state.comments.map((comment) => {
                    if (comment.id === action.payload.commentId) {
                        const isLiked = action.payload.isLiked;
                        const likes = isLiked ? comment.likes + 1 : comment.likes - 1;

                        return { ...comment, isLiked, likes };
                    }

                    return comment;
                });
            }
        );

        builder.addCase(addComment.fulfilled, (state, action: PayloadAction<TComment>) => {
            state.comments = [action.payload, ...(state.comments || [])];
        });

        builder.addCase(
            addReplyComment.fulfilled,
            (state, action: PayloadAction<{ reply: TComment; commentId: string }>) => {
                if (!state.comments) {
                    state.error = "Failed to add reply comment";
                    return;
                }

                state.comments = state.comments.map((comment) => {
                    if (comment.id === action.payload.commentId) {
                        return {
                            ...comment,
                            replys: [...comment.replys, action.payload.reply],
                        };
                    }

                    return comment;
                });
            }
        );

        // clear store on change of video
    },
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
