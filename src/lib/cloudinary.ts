import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

/**
 * Uploads an image to Cloudinary.
 * @param localFilePath The local file path of the image.
 * @param folder The target folder in Cloudinary.
 * @returns Promise<any> The Cloudinary upload response or null if there's an error.
 */
const uploadImageToCloudinary = async (
    localFilePath: string,
    folder: string
): Promise<any> => {
    try {
        if (!localFilePath) return null;

        // Upload image or video to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder,
            resource_type: "image",
        });

        // Delete local file after upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Handle errors
        console.error("Error uploading image:", error);

        // Delete local file if it exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

/**
 * Uploads an video to Cloudinary.
 * @param localFilePath The local file path of the video.
 * @param folder The target folder in Cloudinary.
 * @returns Promise<any> The Cloudinary upload response or null if there's an error.
 */
const uploadVideoToCloudinary = async (
    localFilePath: string,
    folder: string
): Promise<any> => {
    try {
        if (!localFilePath) return null;

        // Upload video or video to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder,
            resource_type: "video",
        });

        // Delete local file after upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Handle errors
        console.error("Error uploading video:", error);

        // Delete local file if it exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

// delete image file from cloudinary server
const deleteFileFromCloudinary = async (
    publicId: string,
    resourceType: "image" | "video"
) => {
    try {
        return await cloudinary.uploader.destroy(
            publicId,
            { resource_type: resourceType },
            (err, response) => {
                if (err) {
                    console.error("Error deleting image:", err);
                } else {
                    // console.log("Deleted image:", response);
                }
            }
        );
    } catch (error) {
        console.log("Error deleting file cloudinary");
    }
};

export {
    uploadImageToCloudinary,
    uploadVideoToCloudinary,
    deleteFileFromCloudinary,
    cloudinary,
};
