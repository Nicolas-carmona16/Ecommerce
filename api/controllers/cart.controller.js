import connection from "../configuration/database.js";

// Obtener el carrito de compras del usuario autenticado
export const getCart = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [cartItems] = await connection.query(
      `SELECT p.product_id, p.image_url, p.price, cp.quantity
       FROM cart_product cp
       JOIN product p ON cp.product_id = p.product_id
       WHERE cp.cart_id = (SELECT cart_id FROM shopping_cart WHERE user_id = ? AND status = "active")`,
      [userId]
    );

    res.json(cartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cart", error: error.message });
  }
};

// Obtener la suma total del carrito de compras del usuario autenticado
export const getCartTotal = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [total] = await connection.query(
      'SELECT SUM(product.price * cart_product.quantity) AS total FROM cart_product JOIN product ON cart_product.product_id = product.product_id WHERE cart_product.cart_id = (SELECT cart_id FROM shopping_cart WHERE user_id = ? AND status = "active")',
      [userId]
    );
    res.json({ total: total[0].total });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cart total", error: error.message });
  }
};

// Agregar un producto al carrito de compras del usuario autenticado
export const addToCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;
  try {
    const [cart] = await connection.query(
      'SELECT cart_id FROM shopping_cart WHERE user_id = ? AND status = "active"',
      [userId]
    );

    let cartId;
    if (cart.length === 0) {
      const [result] = await connection.query(
        'INSERT INTO shopping_cart (user_id, status) VALUES (?, "active")',
        [userId]
      );
      cartId = result.insertId;
    } else {
      cartId = cart[0].cart_id;
    }

    const [existingProduct] = await connection.query(
      "SELECT * FROM cart_product WHERE cart_id = ? AND product_id = ?",
      [cartId, productId]
    );

    if (existingProduct.length > 0) {
      await connection.query(
        "UPDATE cart_product SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?",
        [quantity, cartId, productId]
      );
    } else {
      await connection.query(
        "INSERT INTO cart_product (cart_id, product_id, quantity) VALUES (?, ?, ?)",
        [cartId, productId, quantity]
      );
    }

    res.status(201).json({ message: "Product added to cart" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product to cart", error: error.message });
  }
};

// Actualizar la cantidad de un producto en el carrito de compras del usuario autenticado
export const updateCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const [cart] = await connection.query(
      'SELECT cart_id FROM shopping_cart WHERE user_id = ? AND status = "active"',
      [userId]
    );

    if (cart.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartId = cart[0].cart_id;

    const [result] = await connection.query(
      "UPDATE cart_product SET quantity = ? WHERE cart_id = ? AND product_id = ?",
      [quantity, cartId, productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
};

// Eliminar un producto del carrito de compras del usuario autenticado
export const deleteFromCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;
  try {
    const [cart] = await connection.query(
      'SELECT cart_id FROM shopping_cart WHERE user_id = ? AND status = "active"',
      [userId]
    );

    if (cart.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartId = cart[0].cart_id;

    // Buscar el producto en el carrito y obtener su cantidad actual
    const [productInCart] = await connection.query(
      "SELECT quantity FROM cart_product WHERE cart_id = ? AND product_id = ?",
      [cartId, productId]
    );

    if (productInCart.length === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const currentQuantity = productInCart[0].quantity;

    if (currentQuantity > 1) {
      // Si hay más de una instancia del producto, reducir la cantidad en 1
      await connection.query(
        "UPDATE cart_product SET quantity = quantity - 1 WHERE cart_id = ? AND product_id = ?",
        [cartId, productId]
      );
    } else {
      // Si solo hay una instancia del producto, eliminarlo del carrito
      await connection.query(
        "DELETE FROM cart_product WHERE cart_id = ? AND product_id = ?",
        [cartId, productId]
      );
    }

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({
      message: "Error removing product from cart",
      error: error.message,
    });
  }
};

// Vaciar el carrito de compras del usuario autenticado
export const clearCart = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [cart] = await connection.query(
      'SELECT cart_id FROM shopping_cart WHERE user_id = ? AND status = "active"',
      [userId]
    );

    if (cart.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartId = cart[0].cart_id;

    await connection.query("DELETE FROM cart_product WHERE cart_id = ?", [
      cartId,
    ]);

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error clearing cart", error: error.message });
  }
};

// Obtener el resumen del pedido del usuario autenticado
export const getOrderSummary = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [cartItems] = await connection.query(
      'SELECT product.product_id, product.name, product.price, cart_product.quantity, (product.price * cart_product.quantity) AS total_price FROM cart_product JOIN product ON cart_product.product_id = product.product_id WHERE cart_product.cart_id = (SELECT cart_id FROM shopping_cart WHERE user_id = ? AND status = "active")',
      [userId]
    );

    const [total] = await connection.query(
      'SELECT SUM(product.price * cart_product.quantity) AS total FROM cart_product JOIN product ON cart_product.product_id = product.product_id WHERE cart_product.cart_id = (SELECT cart_id FROM shopping_cart WHERE user_id = ? AND status = "active")',
      [userId]
    );

    res.json({ items: cartItems, total: total[0].total });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving order summary",
      error: error.message,
    });
  }
};

// Obtener la cantidad de productos en el carrito del usuario autenticado
export const getCartItemCount = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const [rows] = await connection.query(
      `
      SELECT SUM(cart_product.quantity) AS itemCount 
      FROM cart_product 
      INNER JOIN shopping_cart ON cart_product.cart_id = shopping_cart.cart_id 
      WHERE shopping_cart.user_id = ? AND shopping_cart.status = 'active'
    `,
      [userId]
    );
    const itemCount = rows[0].itemCount || 0;
    res.json({ itemCount });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving cart item count",
        error: error.message,
      });
  }
};
