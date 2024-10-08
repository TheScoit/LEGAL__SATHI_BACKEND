import express from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import cors from 'cors';
import messageRouter from './router/messageRouter.js'
import {errorMiddleware} from './middlewares/errorMiddleware.js'
import userRouter from './router/userRouter.js'
import appointmentRouter from './router/appointmentRouter.js'
import axios from 'axios'
const app = express();
config({path:"./config/config.env"})


app.use(cors({
    origin:["https://lawsuit-rambos-projects-a1065a11.vercel.app","https://legal-sathi-dashboard.vercel.app"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
    })
);

app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointment",appointmentRouter);

dbConnection();




app.use(errorMiddleware);
export default app;
