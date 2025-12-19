import { Router } from "express";

import auth from "../middlewares/auth.middleware.js";

import { getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/:id', auth, getUser);

userRouter.get('/', getAllUsers);

userRouter.patch('/:id', updateUser);

export default userRouter;

