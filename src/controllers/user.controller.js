import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {

    const users = await User.find();

    res.status(200).json({ success: true, data: users })

}


export const getUser = async (req, res) => {

    const { id } = req.params;

    const user = await User.findById(id);

    if(!user){
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ success: true, data: user})

}


export const updateUser = async (req, res) => {

}

