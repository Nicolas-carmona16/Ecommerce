import connection from "../configuration/database.js";

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
