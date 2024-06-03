import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../services/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loadCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.product_id);
      loadCart();
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/product/${id}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleUpdateProduct = () => {
    navigate(`/update-product/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-64 h-64 object-cover mb-4 md:mb-0 md:mr-6 rounded-lg"
        />
        <div>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4 text-red-600">{formattedPrice}</p>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            + Add to Cart
          </button>
          {user && user.role === 1 && (
            <div className="mt-4">
              <button
                onClick={handleUpdateProduct}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors mr-2"
              >
                Update Product
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
