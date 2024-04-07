import User from "../models/user.js";
import { errorHandler } from "../utils/errorHandling.js";
import { status } from "../utils/statuses.js";

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    const message = allUsers.length === 0 ? "No users in base" : "All users";
    return res.status(200).json({ message, users: allUsers });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(status.notFound)
        .json({ message: "No user with this ID" });
    }

    return res.status(status.success).json({ message: "User found", user });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.status(status.notFound).json({ message: "User not found" });
    }

    return res
      .status(status.success)
      .json({ message: "User successfully updated", updateUser });
  } catch (error) {
    next(errorHandler(404, error.message));
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  //if you wount delete only your account you can use the following line code if(req.params.id === req.body.id){then trycatch block of code}
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(status.notFound)
        .json({ message: "User does not exist in database" });
    }

    return res
      .status(status.success)
      .json({ message: "User deleted successfully" });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

const subscribe = async (req, res, next) => {
  const userId = req.user.id;
  const targetUserId = req.params.id;
  
  try {
    // Dodavanje korisnika u listu pretplaćenih korisnika
    await User.findByIdAndUpdate(userId, {
      $push: { subscribedUser: targetUserId },
    });

    // Povećavanje broja pretplatnika ciljanog korisnika
    await User.findByIdAndUpdate(targetUserId, {
      $inc: { subscribe: 1 },
    });

    // Uspješna pretplata
    return res.status(status.success).json({ message: "Subscription Successful" });
  } catch (error) {
    // Greška u pretplati
    return next(errorHandler(500, error.message));
  }
};

const unSubscribe = async (req, res, next) => {
  const userId = req.user.id;
  const targetUserId = req.params.id;
  
  try {
    // Dodavanje korisnika u listu pretplaćenih korisnika
    await User.findByIdAndUpdate(userId, {
      $pull: { subscribedUser: targetUserId },
    });

    // Povećavanje broja pretplatnika ciljanog korisnika
    await User.findByIdAndUpdate(targetUserId, {
      $inc: { subscribe: -1 },
    });

    // Uspješna pretplata
    return res.status(status.success).json({ message: "Unsubscription Successful" });
  } catch (error) {
    // Greška u pretplati
    return next(errorHandler(500, error.message));
  }
};

const like = async() => {}
const unLike = async() => {}

export { getUsers, getUser, updateUser, deleteUser, subscribe, unSubscribe, like, unLike };
