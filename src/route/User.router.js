import { Router } from "express"
import { fetchuser, login, logout, refreshAccsessToken, register, updateAvtar } from "../controller/User.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js"

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avtar",
            maxCount: 1
        }
    ]),
    register
);
router.route("/login").post(login);
router.route("/logout").get(verifyJwt, logout);
router.route("/refreshToken").get(refreshAccsessToken);
router.route("/userdata").get(verifyJwt, fetchuser);
router.route("/updatepic").post(verifyJwt,
    upload.fields([
        {
            name: "avtar",
            maxCount: 1
        }
    ]),
    updateAvtar
)


export default router;