import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import cartRouter from "./routes/cart.route.js"
import addressRouter from "./routes/address.route.js"
import paymentMethodRouter from "./routes/paymentMethod.route.js";

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
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/payment-method", paymentMethodRouter);
