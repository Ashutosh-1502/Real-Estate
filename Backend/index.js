import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;
const DB_CONNECTION = process.env.DB_URL;

mongoose.connect(DB_CONNECTION)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(`Connection Failed : ${err}`))

app.use(express.json());
app.use(cookieParser({}))

app.use('/api/auth', authRouter);

app.use((err , req , res , next)=>{ 
    const statusCode = err.statusCode || 500;
    const message = (err?.errors?.username?.message || err?.errors?.email?.message||err.message || "Internal Server Error").toSting();
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})