import { Router } from "express";
import {
  addView,
  createVideo,
  deleteVideo,
  getRandomVideos,
  getTrends,
  getVideo,
  subscribe,
  updateVideo,
} from "../../controllers/video.js"; // Assuming 'video.js' is located in the 'controllers' directory
import { verifyToken } from "../../middlewares/verifyToken.js";

const router = Router();

router.post("/video", verifyToken, createVideo);
router.put("/video/:id", verifyToken, updateVideo);
router.delete("/video/:id", verifyToken, deleteVideo);
router.get("/video/id", getVideo);
router.get("/trend/:id", getTrends);
router.get("/videoRandom", getRandomVideos);
router.put("/subscribeVideo", subscribe);
export default router;
