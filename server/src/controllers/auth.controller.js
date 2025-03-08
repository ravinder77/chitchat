import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';
import crypto from 'crypto';
import { sendEmail } from '../lib/sendEmail.js';

const signupSchema = z.object({
  fullName: z.string().min(3, 'Fullname must be at least 3 characters long.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    //validate the req body
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const { fullName, email, password } = result.data;

    if (!fullName || !password || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //generate token
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        id: newUser._id,
        fullName,
        email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: 'Failed to create user' });
    }

    // send token through http only cookie
  } catch (error) {
    console.error('Error in signup controller', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const { email, password } = result.data;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user && isPasswordCorrect) {
      generateToken(user._id, res);

      return res.status(200).json({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in login controller', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('error in logout controller', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: 'Profile picture is required.' });
    }

    const uploadedImage = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadedImage.secure_url },
      { new: true }
    );

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error('Error in updateProfile controller', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log('Error in checkAuth controller', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Reset link will be sent to registered email.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins from now

    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(
      email,
      'Reset Password',
      `Click the link below to reset your password: ${resetLink}`
    );

    return res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error('Error in forgot password route', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long.' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    await sendEmail(
      user.email,
      'Password Reset Successfull',
      `Your password has been successfully reset. You can now log in with your new password.`
    );

    res.status(200).json({
      message: 'Password reset successful. A confirmation email has been sent',
    });
  } catch (error) {
    console.error('Error reseting password', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
