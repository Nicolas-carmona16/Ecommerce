import React, { useEffect, useState } from "react";
import EcommerceInfo from "../components/EcommerceInfo";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { fetchProducts, fetchProductsByCategory } from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); // Puedes ajustar el número de productos por página

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        const sortedProducts = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        setError("Failed to load products");
      }
    };

    const loadCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
        setError("Failed to load categories");
      }
    };

    loadProducts();
    loadCategories();
  }, []);

  const handleSelectCategory = async (categoryId) => {
    try {
      let data;
      if (categoryId) {
        data = await fetchProductsByCategory(categoryId);
      } else {
        data = await fetchProducts();
      }
      const sortedProducts = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setProducts(sortedProducts);
      setCurrentPage(1); // Reset page to 1 when category changes
    } catch (error) {
      console.error("Error loading products by category:", error);
      setError("Failed to load products");
    }
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <EcommerceInfo />
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">Our Products</h2>
        {error && <p className="text-red-500">{error}</p>}
        <CategoryFilter
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center mt-6">
        {pageNumbers.map(number => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 rounded ${currentPage === number ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Home;
