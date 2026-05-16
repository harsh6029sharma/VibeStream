import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'


// register user controller
const registerUser = asyncHandler( async(req,res)=>{
    // 1. first take the user input like username,email,password,fullname,password,avatar,image
    // 2.validation 
    // 3.check if the user already exist or not: username, email
    // 4.check for the images and check for the avatar

    // user input destructuring from the req.body
    const {fullName,email,username, password} = req.body

    // validation
    if (
        [fullName,email,username, password].some( field => field?.trim() === "" )
    )
    {
        throw new ApiError(400,"All fields are required")
    }

    // check if the user already exist or not 
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already existed")
    }

    // check for the avatar and images
    // find the local path of avatar 
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    console.log(avatarLocalPath);

    console.log(avatarLocalPath)
    
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    console.log(avatar);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    
    // create user and save in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // to remove the password and refreshToken to get in response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully!")
    )

} )

export {
    registerUser,
}