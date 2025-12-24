import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    const subscription = await Subscription.create({
        ...req.body,
        user: req.user._id
    })

    res.status(201).json({ success: true, data: subscription })
}


export const getUserSubscription = async (req, res, next) => {
    if(req.user._id !== req.params.id){
        const err = new Error("User already exists");
        err.statusCode = 409;
        throw err;
    }
}

