import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

const app = express();

//Middleware for JSON parsing
app.use(express.json());
app.use(cookieParser());

// RUN SERVER
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)