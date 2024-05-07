import { Router } from 'express';
import user from "./v1/user.js";
import auth from "./v1/auth.js";
import video from "./v1/video.js"; // Corrected import path

const router = Router();

router.use("/v1", user);
router.use("/v1", auth);
router.use("/v1", video);

export default router;
