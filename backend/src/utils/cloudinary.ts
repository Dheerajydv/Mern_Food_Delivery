import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    // api_key: process.env.CLOUDINARY_API_KEY!,
    // api_secret: process.env.CLOUDINARY_API_SECRET!,
    cloud_name: "dhz7abkkq",
    api_key: "393752891396517",
    api_secret: "HobM0Jxc1WMUt-CbLCOS6OlJId8",
});

const uploadOnCloudinary = async (localFilePath: string) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        });
        console.log("Uploading done");
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //removes the file from the server as the file upload got failed
        console.log(`Some error in upload on cloudinary function : ${error}`);
        return null;
    }
};

export { uploadOnCloudinary };
