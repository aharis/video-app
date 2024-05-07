import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  subscribe,
  unSubscribe,
  updateUser,
} from "../../controllers/user.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const router = Router();

router.get("/getAllUsers", getUsers);
router.get("/getUser/:id", getUser);
router.put("/updateUser/:id", verifyToken, updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/subscribe/:id", verifyToken, subscribe)
router.put("/unSubscribe/:id", verifyToken, unSubscribe)

export default router;
