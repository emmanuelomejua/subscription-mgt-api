import express from 'express';

import { PORT } from './config/env.js';


// **ROUTES IMPORT** /
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import subscriptionRouter from './routes/subscription.route.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({limit: '50mb'}))

app.get('/', (req, res) => {
    res.send('Server is active!!!')
})


/****
 * Routes Uses
 */
app.use('api/v1/auth', authRouter);
app.use('api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter)


app.listen(PORT, () => {
    console.log(`Server is active on port ${PORT}`)
})

