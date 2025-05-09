import User from "../models/user.model.js";
import { doHash, compareHash, hmacProcess } from "../utils/hashing.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  // signup logic
  const { username, email, password } = req.body; // destructure the request body
  try {
    // check if all fields are provided
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "Please provide all fields!"));
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });

    // if user exists, send a response
    if (existingUser) {
      return next(errorHandler(401, "User already exists!"));
    }

    // hash the password
    const hashedPassword = doHash(password, 10);

    // create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // save the user to the database
    const result = await newUser.save();

    // make the password undefined before sending a response
    result.password = undefined;

    // send a response
    return res
      .status(201)
      .json({ success: true, message: "User created successfully!", result });
  } catch (error) {
    // handle errors
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body; // destructure the request body

  try {
    // check if all fields are provided
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "Please provide all fields!"));
    }

    // check if user exists
    const existingUser = await User.findOne({ email });

    // if user does not exist, send a response
    if (!existingUser) {
      return next(errorHandler(401, "User does not exist!"));
    }

    // check if password is correct
    const isMatch = compareHash(password, existingUser.password);

    // if password is incorrect, send a response
    if (!isMatch) {
      return next(errorHandler(401, "Invalid credentials!"));
    }

    // create a token
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // make the password undefined before sending a response
    const { password: hashedPassword, ...user } = existingUser._doc;
    // create a cookie
    // set the cookie in the response
    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      })
      .json({
        success: true,
        message: "User logged in successfully!",
        user,
      });
  } catch (error) {
    // handle errors
    next(error);
  }
};
