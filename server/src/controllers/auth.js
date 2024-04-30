import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { errorHandler } from "../utils/errorHandling.js";
import { errorMiddleware } from "../middlewares/errorMidlleware.js";

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Provjera postoji li već korisnik s istim emailom
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    // Hashiranje lozinke
    const hashedPassword = await bcrypt.hash(password, 10);

    // Stvaranje novog korisnika
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(200).json({ message: "User has been created", newUser });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorMiddleware(404, "User not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(errorMiddleware(400, "Wrong credentials"));
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: userPassword, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others); // Sending only user data without password
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
