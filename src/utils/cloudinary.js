import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


const uploadOnCloudinary = async (localFilePath) => {
    try {
        // if localfile path does not exist then return null
        if (!localFilePath) return null

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        // if exist then upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })

        // file uploaded on cloudinary successfully
       
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        console.error("Cloudinary upload error: ", error)
        
        fs.unlinkSync(localFilePath)
        return null
    }
}

export { uploadOnCloudinary }