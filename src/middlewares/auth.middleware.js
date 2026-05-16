import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from 'jsonwebtoken'


// this function is used to verify that the user is authenticated or not
export const verifyJWT = asyncHandler( async (req, _ ,next)=> {
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log("token: ",token);
        
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }

        // decode the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user

        next()


    }catch(error){

        throw new ApiError(401, error?.message || "Invalid access token")
    }
} )