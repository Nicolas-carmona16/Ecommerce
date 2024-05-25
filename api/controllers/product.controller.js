import connection from "../configuration/database.js";

export const getProducts = async (req, res) => {
  try {
    const [products] = await connection.query("SELECT * FROM product");
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const [products] = await connection.query(
      "SELECT * FROM product WHERE product_id = ?",
      [productId]
    );
    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(products[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, category_id, image_url } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO product (name, description, price, category_id, image_url) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, category_id, image_url]
    );
    res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, category_id, image_url } = req.body;
  try {
    const [result] = await connection.query(
      "UPDATE product SET name = ?, description = ?, price = ?, category_id = ?, image_url = ? WHERE product_id = ?",
      [name, description, price, category_id, image_url, productId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const [result] = await connection.query(
      "DELETE FROM product WHERE product_id = ?",
      [productId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

// Obtener productos por categoría ID
export const getProductsByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const [products] = await connection.query(
      "SELECT * FROM product WHERE category_id = ?",
      [categoryId]
    );
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};
