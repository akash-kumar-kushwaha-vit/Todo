import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ UPLOAD IMAGE
export const uploadCloudinary = async (localFilePath, folder = "profile_pics") => {
    try {
        if (!localFilePath) return null;

        const result = await cloudinary.uploader.upload(localFilePath, {
            folder,
            resource_type: "image",
        });

        // delete local file
        fs.unlinkSync(localFilePath);

        return {
            url: result.secure_url,
            public_id: result.public_id,
        };

    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

// ❌ DELETE IMAGE
export const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) return;

        await cloudinary.uploader.destroy(public_id);
        console.log("Old image deleted:", public_id);
    } catch (error) {
        console.error("Cloudinary Delete Error:", error);
    }
};
