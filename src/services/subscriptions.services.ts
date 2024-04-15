import axios from "axios";

export const getSubscribedChannels = async (userId: string) => {
    try {
        const res = await axios.get(`/api/subscriptions?u=${userId}`);

        return res.data;
    } catch (error: any) {
        console.error("Error in getSubscribedChannels: " + error.message);
        throw error;
    }
};

export const toggleSubscription = async (channelId: string) => {
    try {
        const res = await axios.post(`/api/subscriptions/toggle-subscription?c=${channelId}`);

        return res.data.data;
    } catch (error: any) {
        console.error("Error in toggle subscription: " + error.message);
        throw error;
    }
};
