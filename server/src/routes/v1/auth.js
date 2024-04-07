import { Router } from "express"
import { signup, signin } from "../../controllers/auth.js"

const router = Router()

//create user
router.post("/createUser", signup)

//sign in
router.post("/loginUser", signin)

//google auth

export default router;