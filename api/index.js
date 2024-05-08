import express from 'express';
import authRouter from './routes/auth.route.js';

const app = express();

//Middleware for JSON parsing
app.use(express.json());

// RUN SERVER
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Routes
app.use('/api/auth', authRouter);