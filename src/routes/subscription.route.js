import { Router } from "express";
import { createSubscription } from "../controllers/subscription.controller.js";
import auth from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.post('/', auth, createSubscription)


export default subscriptionRouter;
