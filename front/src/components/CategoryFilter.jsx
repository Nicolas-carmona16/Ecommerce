import React from "react";

const CategoryFilter = ({ categories, onSelectCategory }) => {
  return (
    <div className="mb-6">
      <select
        className="p-2 border rounded-lg"
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
