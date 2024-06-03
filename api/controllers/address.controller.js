import connection from "../configuration/database.js";

// Crear o actualizar la dirección de envío
export const createOrUpdateAddress = async (req, res) => {
  const userId = req.user.userId;
  const { street, city, state, country, zipCode } = req.body;
  try {
    const [existingAddress] = await connection.query(
      "SELECT * FROM address WHERE user_id = ?",
      [userId]
    );

    if (existingAddress.length > 0) {
      // Actualizar la dirección existente
      const [result] = await connection.query(
        "UPDATE address SET street = ?, city = ?, state = ?, country = ?, zip_code = ? WHERE user_id = ?",
        [street, city, state, country, zipCode, userId]
      );
      return res.json({ message: "Address updated successfully" });
    } else {
      // Crear una nueva dirección
      const [result] = await connection.query(
        "INSERT INTO address (user_id, street, city, state, country, zip_code) VALUES (?, ?, ?, ?, ?, ?)",
        [userId, street, city, state, country, zipCode]
      );
      return res
        .status(201)
        .json({
          message: "Address created successfully",
          addressId: result.insertId,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating or updating address",
        error: error.message,
      });
  }
};

// Obtener la dirección del usuario autenticado
export const getAddress = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [addresses] = await connection.query(
      "SELECT * FROM address WHERE user_id = ?",
      [userId]
    );
    if (addresses.length === 0) {
      return res.status(404).json({ message: "No address found" });
    }
    res.json(addresses[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving address", error: error.message });
  }
};

// Eliminar la dirección de envío
export const deleteAddress = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [result] = await connection.query(
      "DELETE FROM address WHERE user_id = ?",
      [userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting address", error: error.message });
  }
};
