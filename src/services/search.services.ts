import axios from "axios";

export const searchVideosByQuery = async (query: string) => {
    try {
        const res = await axios.get(
            `/api/search?q=${encodeURIComponent(query)}`
        );
        const data = res.data;
        return data.videos || [];
    } catch (error) {
        console.error(error);
        return [];
    }
};
