import connection from "../configuration/database.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await connection.query(
      "SELECT user_id, name, lastname, email, role_id FROM user"
    );
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [users] = await connection.query(
      "SELECT user_id, name, lastname, email, role_id FROM user WHERE user_id = ?",
      [userId]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(users[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user profile", error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const { name, lastname, email, password } = req.body;

  try {
    let updateFields = [];
    let updateValues = [];

    if (name) {
      updateFields.push("name = ?");
      updateValues.push(name);
    }

    if (lastname) {
      updateFields.push("lastname = ?");
      updateValues.push(lastname);
    }

    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push("password = ?");
      updateValues.push(hashedPassword);
    }

    updateValues.push(userId);

    const [result] = await connection.query(
      `UPDATE user SET ${updateFields.join(", ")} WHERE user_id = ?`,
      updateValues
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User profile updated successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ message: "Email is already used" });
    } else {
      res
        .status(500)
        .json({ message: "Error updating user profile", error: error.message });
    }
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [result] = await connection.query(
      "DELETE FROM user WHERE user_id = ?",
      [userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

export const adminUpdateUserProfile = async (req, res) => {
  const userId = req.params.id;
  const { name, lastname, email, password, role_id } = req.body;

  try {
    let updateFields = [];
    let updateValues = [];

    if (name) {
      updateFields.push("name = ?");
      updateValues.push(name);
    }

    if (lastname) {
      updateFields.push("lastname = ?");
      updateValues.push(lastname);
    }

    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push("password = ?");
      updateValues.push(hashedPassword);
    }

    if (role_id) {
      updateFields.push("role_id = ?");
      updateValues.push(role_id);
    }

    updateValues.push(userId);

    const [result] = await connection.query(
      `UPDATE user SET ${updateFields.join(", ")} WHERE user_id = ?`,
      updateValues
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User profile updated successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ message: "Email is already used" });
    } else {
      res
        .status(500)
        .json({ message: "Error updating user profile", error: error.message });
    }
  }
};

export const adminDeleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const [result] = await connection.query(
      "DELETE FROM user WHERE user_id = ?",
      [userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
