import User from "../schemas/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import { CustomError } from "../utils/errorHandler.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(new CustomError("Error fetching users", 500));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(new CustomError("Error fetching user", 500));
  }
};

export const createUser = async (req, res, next) => {
    console.log("Creating user with data:", req.body);
    const { user_name, user_email, user_password } = req.body;
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const newUser = new User({
      user_name,
      user_email,
      user_password: hashedPassword, 
    })
    try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(new CustomError("Error creating user", 500));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_name, user_email, user_password } = req.body;
    await User.update({ user_name, user_email, user_password }, { where: { id } });
    const updatedUser = await User.findById(id);
    if (!updatedUser) {
      return next(new CustomError("User not found", 404));
    }
    res.status(201).json(updatedUser);
  } catch (error) {
    next(new CustomError("Error updating user", 500));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    await User.destroy({ where: { id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(new CustomError("Error deleting user", 500));
  }
};


export const loginUser = asyncHandler(async (req, res) => {
  const { user_email , user_password } = req.body;
  const user = await User.findOne({ user_email });

  if (!user) {
    throw new CustomError('Invalid email or password', 401);
  }

  const isMatch = await bcrypt.compare(user_password, user.user_password);
  if (!isMatch) {
    throw new CustomError('Invalid email or password', 401);
  }

  const token = jwt.sign(
    {
      id: user._id,
      user_name: user.user_name,
      user_email: user.user_email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user._id,
      user_name: user.user_name,
      user_email: user.user_email,
    },
  });
});

// User Logout
export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

// Check Session
export const checkSession = (req, res) => {
  if (req.user) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
};