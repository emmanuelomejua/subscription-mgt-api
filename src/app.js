import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { PORT } from './config/env.js';


// **ROUTES IMPORT** /
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import subscriptionRouter from './routes/subscription.route.js';
import connectDB from './database/database.js';
import errorMiddleware from './middlewares/err.middleware.js';
import adjectMiddleware from './middlewares/arrject.middlewar.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '50mb'}))
app.use(cookieParser());
app.use(morgan('common'));
app.use(adjectMiddleware)

app.get('/', (req, res) => {
    res.send('Server is active!!!')
})


/****
 * Routes Uses
 */
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware)


app.listen(PORT, async () => {
    console.log(`Server is active on port ${PORT}`);

    await connectDB()
})

