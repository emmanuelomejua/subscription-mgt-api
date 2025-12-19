import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {

    const users = await User.find();

    res.status(200).json({ success: true, data: users })

}


export const getUser = async (req, res) => {

    const user = await User.findOne(req.params.id).select('-password');

    if(!user){
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ success: false, data: user})

}
