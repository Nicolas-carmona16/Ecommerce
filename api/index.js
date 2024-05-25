import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

// Configurar CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Permitir solicitudes desde localhost:3000
    credentials: true, // Permitir el envío de cookies y encabezados de autenticación
  })
);

//Middleware for JSON parsing
app.use(express.json());
app.use(cookieParser());

// RUN SERVER
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
