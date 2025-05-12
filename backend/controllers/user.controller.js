import { doHash } from "../utils/hashing.js";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "User route is working",
  });
};

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { id } = req.user;
  //   const { username, email, password } = req.body;

  if (userId !== id) {
    return next(errorHandler(403, "You can only update your account!"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters!"));
    }
    req.body.password = doHash(req.body.password);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters!")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username must not include spaces!"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be in lowercase!"));
    }
    if (!req.body.username.match(/^[a-z0-9]+$/)) {
      return next(
        errorHandler(
          400,
          "Username must only include lowercase letters and numbers!"
        )
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    // make sure to remove the password from the response
    updatedUser.password = undefined;

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
  // console.log(req.user)
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this account!")
    );
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    return res
      .clearCookie("access_token")
      .json({ message: "User logged out successfully!" });
  } catch (error) {
    next(error);
  }
};
