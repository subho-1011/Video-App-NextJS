import axios from "axios";

export const communityLikedToggle = async (communityId: string) => {
    try {
        const res = await axios.post(`/api/community/${communityId}/like-toggle`);

        return res.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) return error.response.data;
            return { error: "Network error" };
        }

        return { error: error.message };
    }

}

export const getCommunities = async () => {
    try {
        const res = await axios.get("/api/community");

        return res.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) return error.response.data;
            return { error: "Network error" };
        }

        return { error: error.message };
    }
};

export const postCommunity = async (text: string, image: File) => {
    try {
        const formData = new FormData();
        formData.set("text", text);
        formData.set("image", image);

        const res = await axios.post("/api/community/add-community", formData);

        return res.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) return error.response.data;
            return { error: "Network error" };
        }

        return { error: error.message };
    }
};
