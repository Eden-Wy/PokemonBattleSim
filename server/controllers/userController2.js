import User from '../schemas/userSchema.js';
import { CustomError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Extra stuff from Bashar
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { bucket } from '../config/firebase.js';
// End of extra stuff

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Get user by ID
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  res.status(200).json(user);
});

// Create a new user
export const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const image = req.file;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  let uploadedImageUrl = '';
  try {
    let blob;
    let buffer;
    let contentType = 'image/png'; // Default content type

    // creating image to upload to firebase storage
    if (image) {
      contentType = image.mimetype; // Use the actual mimetype
      blob = bucket.file(
        `images/${name}/user/${Date.now()}_${image.originalname}`
      );
      buffer = image.buffer;
    }

    if (blob) {
      const blobStream = blob.createWriteStream({
        metadata: { contentType },
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', (err) =>
          reject(new CustomError(`Image upload failed: ${err.message}`, 500))
        );
        blobStream.on('finish', resolve);
        blobStream.end(buffer);
      });

      const signedUrl = await blob.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });
      uploadedImageUrl = signedUrl[0];
      console.log(uploadedImageUrl);
      newUser.image = uploadedImageUrl;
      console.log(newUser);
    }

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error saving user:', error);
    return next(
      new CustomError(`Failed to create user: ${error.message}`, 500)
    );
  }
});

// Update user by ID
export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new CustomError('User not found', 404);
  }

  res.status(200).json(updatedUser);
});

// Delete user by ID
export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new CustomError('User not found', 404);
  }

  res.status(204).json({ message: 'User deleted successfully' });
});

// User Login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError('Invalid email or password', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError('Invalid email or password', 401);
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
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
      name: user.name,
      email: user.email,
      role: user.role,
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