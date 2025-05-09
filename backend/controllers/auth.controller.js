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
