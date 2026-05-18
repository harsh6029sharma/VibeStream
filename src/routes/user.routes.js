import {Router} from 'express'
import { loginUser, registerUser,logoutUser,refreshAccessToken, getUserChannelProfile, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getWatchHistory } from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/register").post(
    // here upload is the multer middleware which is used just before the controller
    upload.fields([
        {
            name:"avatar",
            maxCount: 1
        },
        {
            name:"coverImage",
            maxCount: 1
        }
    ]),
// here registerUser is the controller
registerUser)

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

// update avatar and cover image
router.route("/avatar").post(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").post(verifyJWT, upload.single("cover-image"), updateUserCoverImage)

// channel routes and watch history
router.route("/channel/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)


export default router