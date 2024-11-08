

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import locationRouter from './routes/locationRouter.js';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import { MongoClient } from 'mongodb';

dotenv.config();

const port = process.env.PORT || 5001;

const app = express();
const dbName = 'maxdovhusha';


app.use(cors({
    origin: [process.env.CLIENT_URL, 'https://imaginative-taiyaki-b18cc3.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization']
}));

app.options('/location', cors());

app.use(express.json({ limit: '10mb' }));
app.use('/user', userRouter);
app.use('/location', locationRouter);
app.get('/locations', async (req, res) => {
    const client = new MongoClient(process.env.MONGO_CONNECT);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('locations');

        const locations = await collection.find({}).toArray();
        res.json(locations);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching locations' });
        console.error(err);
    } finally {
        await client.close();
    }
});

app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }));
app.use((req, res) => res.status(404).json({ success: false, message: "Not found" }));

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT);
        app.listen(port, '0.0.0.0', () => console.log(`Server is listening on port ${port}`));

    } catch (error) {
        console.log(error);
    }
};

startServer();
