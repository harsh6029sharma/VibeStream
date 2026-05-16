import {Router} from 'express'
import { loginUser, registerUser } from '../controllers/user.controller.js'
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

router.route("/logout", verifyJWT, logoutUser)

export default router