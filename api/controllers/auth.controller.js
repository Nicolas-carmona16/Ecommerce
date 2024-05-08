import bcrypt from "bcryptjs";
import connection from "../configuration/database.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  const role_id = 2; // Assigns the role_id of 'customer' predefined
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [results] = await connection.query(
      `INSERT INTO user (name, lastname, email, password, role_id) VALUES (?, ?, ?, ?, ?)`,
      [name, lastname, email, hashedPassword, role_id]
    );

    res.status(201).json({
      message: "User created successfully!",
      userId: results.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ message: "Email is alredy used" });
    } else {
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await connection.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );


    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // En producción, enviar solo sobre HTTPS
      maxAge: 3600000 // Tiempo de vida de la cookie en milisegundos
    });

    res.status(200).json({ message: "successful login" });
  } catch (error) {
    res.status(500).json({ message: "failed to login", error: error.message });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "signed out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to log out.", error: error.message })
  }
}