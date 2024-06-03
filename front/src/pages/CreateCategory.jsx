import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/category",
        {
          category_name: categoryName,
        },
        {
          withCredentials: true,
        }
      );
      setMessage("Category created successfully!");
      setCategoryName("");
      navigate("/");
    } catch (error) {
      setMessage("Failed to create category");
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">Create Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryName"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Category
          </button>
        </div>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default CreateCategory;
