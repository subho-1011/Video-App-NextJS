import axios from "axios";

export const getDashboardInfo = async () => {
    try {
        const res = await axios.get("/api/dashboard");

        return res.data;
    } catch (error: any) {
        if (error.response) return error.response.data;

        return error.message;
    }
};

export const getChannelInfo = async (username: string) => {
    try {
        const res = await axios.get(`/api/dashboard/channels/${username}`);

        return res.data;
    } catch (error: any) {
        if (error.response) return error.response.data;

        return error.message;
    }
};
