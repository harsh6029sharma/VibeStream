import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // if localfile path does not exist then return null
        if (!localFilePath) return null


        // if exist then upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })

        // file uploaded on cloudinary successfully
        console.log("file uploaded on successfully : ",response.url)

        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }
        return response

    } catch (error) {
        // as the operatiojn got failed 
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }
        return null
    }
}

export {uploadOnCloudinary}