// import express from 'express';
// import dotenv from 'dotenv'
// import locationRouter from './routes/locationRouter.js';
// dotenv.config();

// const port = process.env.PORT || 5001;

// const app = express();

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
//     res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
//     next();
// })



// app.use(express.json({ limit: '10mb' }));
// app.use('/location', locationRouter);

// app.use('/', (req, res) => res.json({ message: 'Welcome to our API' }));
// app.use((req, res) => res.status(404).json({ success: false, message: "Not found" }));

// const startServer = async () => {
//     try {
//         // our connection to mongoDB database
//         app.listen(port, () => console.log(`Server is listening on port ${port}`));

//     } catch (error) {
//         console.log(error);
//     }
// };

// startServer();

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import locationRouter from './routes/locationRouter.js';

dotenv.config();

const port = process.env.PORT || 5001;

const app = express();

// Fix CORS issue by allowing the frontend origin
app.use(cors({
    origin: process.env.CLIENT_URL, // e.g., 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization']
}));

app.options('/location', cors());

app.use(express.json({ limit: '10mb' }));

app.use('/location', locationRouter);

app.use('/', (req, res) => res.json({ message: 'Welcome to our API' }));
app.use((req, res) => res.status(404).json({ success: false, message: "Not found" }));

const startServer = async () => {
    try {
        // Listen to the server on the specified port
        app.listen(port, () => console.log(`Server is listening on port ${port}`));

    } catch (error) {
        console.log(error);
    }
};

startServer();
