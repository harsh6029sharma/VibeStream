import {asyncHandler} from '../utils/asyncHandler.js'

// register user controller
const registerUser = asyncHandler( async(req,res)=>{
    res.status(200).json({
        message:"ok"
    })
} )

export {
    registerUser,
}