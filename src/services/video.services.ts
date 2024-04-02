import axios from "axios";

export const addVideo = async (formData: any) => {
    console.log(formData);

    try {
        const res = await axios.post(`/api/videos/add-video`, formData);

        return res.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
    }
};
