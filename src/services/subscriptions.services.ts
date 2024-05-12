import axios from "axios";

export const toggleSubscription = async (channelId: string) => {
    try {
        const res = await axios.post(`/api/subscriptions/toggle-subscription?c=${channelId}`);

        return res.data.data;
    } catch (error: any) {
        console.error("Error in toggle subscription: " + error.message);
        throw error;
    }
};
