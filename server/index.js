

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
//     res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
//     next();
// })


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import locationRouter from './routes/locationRouter.js';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';

dotenv.config();

const port = process.env.PORT || 5001;

const app = express();


app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization']
}));

app.options('/location', cors());

app.use(express.json({ limit: '10mb' }));
app.use('/user', userRouter);
app.use('/location', locationRouter);

app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }));
app.use((req, res) => res.status(404).json({ success: false, message: "Not found" }));

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT);
        app.listen(port, () => console.log(`Server is listening on port ${port}`));

    } catch (error) {
        console.log(error);
    }
};

startServer();
