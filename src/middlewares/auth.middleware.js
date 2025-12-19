import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

const auth = async (req, res, next) => {
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         token = req.headers.authorization.split(' ')[1]
        }
        
        if(!token) return res.status(401).json({ message: 'Unauthorized' });

        const decodedToken = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decodedToken.userId);

        if(!user) return res.status(401).json({ message: 'Token not valid or expired' });

        req.user = user

        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message })
    }
}

export default auth;
