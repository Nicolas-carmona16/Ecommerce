import connection from "../configuration/database.js";

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const [categories] = await connection.query("SELECT * FROM category");
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving categories", error: error.message });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const [categories] = await connection.query(
      "SELECT * FROM category WHERE category_id = ?",
      [categoryId]
    );
    if (categories.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(categories[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving category", error: error.message });
  }
};

// Crear una nueva categoría
export const createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO category (category_name) VALUES (?)",
      [category_name]
    );
    res
      .status(201)
      .json({
        message: "Category created successfully",
        categoryId: result.insertId,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { category_name } = req.body;
  try {
    const [result] = await connection.query(
      "UPDATE category SET category_name = ? WHERE category_id = ?",
      [category_name, categoryId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const [result] = await connection.query(
      "DELETE FROM category WHERE category_id = ?",
      [categoryId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};
