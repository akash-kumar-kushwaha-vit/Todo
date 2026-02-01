import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uplodcloudinary = async (localfile) => {
    try {
        const response = await cloudinary.uploader.upload(localfile, {
            resource_type: "auto"
        })
        console.log("File uploaded successfully:", response.url)
        fs.unlinkSync(localfile)
        return response
    } catch (error) {
        try {
            if (fs.existsSync(localfile)) {
                fs.unlinkSync(localfile);
            }
        } catch (unlinkError) {
            console.error("Error deleting local file:", unlinkError);
        }
        console.error("Error uploading file to Cloudinary:", error)
        return null
    }
}
export default uplodcloudinary;