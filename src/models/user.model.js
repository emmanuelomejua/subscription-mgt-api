import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minLength: 2,
        maxLength: 2
    }
})

const User = model('User', userSchema);

export default User;
