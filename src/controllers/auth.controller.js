import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    let createdUser;

    await session.withTransaction(async () => {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        const err = new Error("All fields are required");
        err.statusCode = 400;
        throw err;
      }

      const userExists = await User.findOne({ email }).session(session);
      if (userExists) {
        const err = new Error("User already exists");
        err.statusCode = 409;
        throw err;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [user] = await User.create(
        [{ name, email, password: hashedPassword }],
        { session }
      );

      createdUser = user;
    });

    // 🔐 Remove password before sending response
    createdUser.password = undefined;

    const token = jwt.sign(
      { userId: createdUser._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: {
        token,
        user: createdUser,
      },
    });

  } catch (error) {
    next(error); // ✅ let Express handle it
  } finally {
    session.endSession();
  }
};



export const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
        success: true,
        message: 'Signed in successfully!',
        data: { token, user }
    })
}


export const signOut = async (req, res) => {

}
