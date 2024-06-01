import connection from "../configuration/database.js";

// Crear o actualizar un método de pago
export const createOrUpdatePaymentMethod = async (req, res) => {
  const userId = req.user.userId;
  const { methodType, provider, accountNumber, expiry } = req.body;
  try {
    const [existingPaymentMethod] = await connection.query(
      "SELECT * FROM payment_method WHERE user_id = ?",
      [userId]
    );

    if (existingPaymentMethod.length > 0) {
      // Actualizar el método de pago existente
      const [result] = await connection.query(
        "UPDATE payment_method SET method_type = ?, provider = ?, account_number = ?, expiry = ? WHERE user_id = ?",
        [methodType, provider, accountNumber, expiry, userId]
      );
      return res.json({ message: "Payment method updated successfully" });
    } else {
      // Crear un nuevo método de pago
      const [result] = await connection.query(
        "INSERT INTO payment_method (user_id, method_type, provider, account_number, expiry) VALUES (?, ?, ?, ?, ?)",
        [userId, methodType, provider, accountNumber, expiry]
      );
      return res
        .status(201)
        .json({
          message: "Payment method created successfully",
          paymentMethodId: result.insertId,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating or updating payment method",
        error: error.message,
      });
  }
};

// Obtener el método de pago del usuario autenticado
export const getPaymentMethod = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [paymentMethods] = await connection.query(
      "SELECT * FROM payment_method WHERE user_id = ?",
      [userId]
    );
    if (paymentMethods.length === 0) {
      return res.status(404).json({ message: "No payment method found" });
    }
    res.json(paymentMethods[0]);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving payment method",
        error: error.message,
      });
  }
};

// Eliminar el método de pago del usuario autenticado
export const deletePaymentMethod = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [result] = await connection.query(
      "DELETE FROM payment_method WHERE user_id = ?",
      [userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    res.json({ message: "Payment method deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting payment method", error: error.message });
  }
};
