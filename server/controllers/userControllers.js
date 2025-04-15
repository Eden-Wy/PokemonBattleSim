import User from "../schemas/userSchema.js";
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
  try {
    const newUser = await User.create(req.body);
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
