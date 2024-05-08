import express from "express";

const app = express();

//Middleware for JSON parsing
app.use(express.json());

// RUN SERVER
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Routes
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});
