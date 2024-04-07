import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/user.js";

const router = Router();

router.get("/getAllUsers", getUsers);
router.get("/getUser/:id", getUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
