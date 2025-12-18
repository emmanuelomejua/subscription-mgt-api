import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.withTransaction();

    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if(userExists){
            const error = new Error('User already exist');
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = User.create([{email, name, password: hashedPassword}], { session });

        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        res.status(201).json({
            success: true,
            message: 'User created successfully!'
        })
        
    } catch (error) {
        session.abortTransaction();
        session.endSession()
        next()
    }

}


export const signIn = async (req, res) => {

}


export const signOut = async (req, res) => {

}
