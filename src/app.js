import express from 'express';

import { PORT } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Server is active!!!')
})


app.listen(PORT, () => {
    console.log(`Server is active on port ${PORT}`)
})

