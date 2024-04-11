import axios from "axios";

export const editComments = async (commentId: string, text: string) => {
    const formData = new FormData();
    formData.append("text", text);

    try {
        const endpoint = `/api/comments?commentId=${commentId}`;
        const res = await axios.patch(endpoint, formData);

        return res.data;
    } catch (error: any) {
        console.error(error.response);
        if (error.response) return error.response.data;

        return error.message;
    }
};

export const toggleLikedAComment = async (commentId: string) => {
    try {
        const endpoint = `/api/comments/${commentId}/toggle-like`;
        const res = await axios.post(endpoint);

        return res.data;
    } catch (error: any) {
        if (error.response) return error.response.data;

        return error.message;
    }
};

export const deleteComment = async (commentId: string) => {
    try {
        const res = await axios.delete(`/api/comments?commentId=${commentId}`);

        return res.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }

        return error.message;
    }
};

export const getAllVideoComments = async (videoId: string) => {
    try {
        const res = await axios.get(`/api/videos/${videoId}/comments`);

        return res.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }

        return error.message;
    }
};

export const addVideoComment = async (videoId: string, data: { text: string }) => {
    try {
        const res = await axios.post(`/api/videos/${videoId}/comments`, data);

        return res.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }

        return error.message;
    }
};
