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
} from "../../controllers/video.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const router = Router();

router.post("/video", createVideo);
router.put("/video/:id", verifyToken, updateVideo);
router.delete("/video/:id", verifyToken, deleteVideo);
router.get("/video/:id", getVideo);
router.get("/trend", getTrends);
router.get("/videoRandom", getRandomVideos);
router.get("/subscribeVideo/:id", verifyToken, subscribe);
router.put("/view/:id", addView);
export default router;
