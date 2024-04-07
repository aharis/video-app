import { Router } from 'express';
import user from "./v1/user.js"
import auth from "./v1/auth.js"

const router = Router();
router.use("/v1", user)
router.use("/v1", auth)

export default router;