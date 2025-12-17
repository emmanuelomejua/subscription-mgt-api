import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is a required field'],
        unique: true,
        trim: true,
        minLength: 2,
        maxLength: 155,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6,
        maxLength: 200,
        select: false
    }
}, { timestamps: true })

const User = model('User', userSchema);

export default User;
