import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/category/${id}`, {
        withCredentials: true,
      });
      setCategories(
        categories.filter((category) => category.category_id !== id)
      );
      setMessage("Category deleted successfully");
    } catch (error) {
      setMessage("Failed to delete category");
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">Manage Categories</h1>
      {message && <p className="mt-4 text-red-500">{message}</p>}
      <ul>
        {categories.map((category) => (
          <li
            key={category.category_id}
            className="flex justify-between items-center mb-4"
          >
            <span>{category.category_name}</span>
            <button
              onClick={() => handleDeleteCategory(category.category_id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
