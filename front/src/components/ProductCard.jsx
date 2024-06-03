import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/api";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { loadCart } = useContext(CartContext);

  const price = parseFloat(product.price);
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await addToCart(product.product_id);
      loadCart();
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.product_id}`);
  };

  return (
    <div
      className="border rounded-lg shadow-md p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleProductClick}
    >
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded-lg transition-transform duration-300 hover:scale-110"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-700">{formattedPrice}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        + Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
